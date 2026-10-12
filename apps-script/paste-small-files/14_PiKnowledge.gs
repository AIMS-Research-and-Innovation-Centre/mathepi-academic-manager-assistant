// Community-taught Pi.
//
// When Pi cannot answer, a signed-in user can send the question here. Staff
// answer it once in the Ask Pi tab; published answers are served back to every
// user's Pi, and the person who asked is notified. Only questions a user
// explicitly sends are stored.

const PI_ANSWER_ROLES = ["super-admin", "manager", "centre-coordinator", "head-tutor"];
const PI_DAILY_QUESTION_LIMIT = 10;

function piQuestionSheet_() {
  const spreadsheet = getOrCreateSpreadsheet();
  const sheet = getSheet(spreadsheet, "PiQuestions");
  ensureSheetHeaders(sheet, TAB_HEADERS.PiQuestions);
  return { spreadsheet: spreadsheet, sheet: sheet };
}

function piIso_(value) {
  if (value instanceof Date) return value.toISOString();
  return String(value || "");
}

function piPublished_(value) {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function piSubmitQuestion(payload) {
  payload = payload || {};
  const session = portalRequireRoles_(payload.token, []);
  const question = String(payload.question || "").replace(/\s+/g, " ").trim().slice(0, 500);
  if (question.length < 3) throw new Error("Write a question before sending it.");
  const context = piQuestionSheet_();
  const today = new Date().toISOString().slice(0, 10);
  const sentToday = readSheetObjects(context.sheet).filter(function (row) {
    return normalizeEmailAddress(row.asked_by) === session.email && piIso_(row.asked_at).slice(0, 10) === today;
  }).length;
  if (sentToday >= PI_DAILY_QUESTION_LIMIT) throw new Error("You have sent " + PI_DAILY_QUESTION_LIMIT + " questions today. Please try again tomorrow.");
  const record = {
    id: "piq-" + Utilities.getUuid(),
    question: question,
    audience: String(payload.audience || "").slice(0, 40),
    asked_by: session.email,
    asked_at: new Date().toISOString(),
    status: "open",
    answer: "",
    answered_by: "",
    answered_at: "",
    published: false,
  };
  upsertRows(context.sheet, [record]);
  appendTicketNotification_(context.spreadsheet, "", "manager", "New question for Pi", question, "info", record.id);
  return { ok: true, id: record.id };
}

function piListQuestions(payload) {
  portalRequireRoles_(payload && payload.token, PI_ANSWER_ROLES);
  const rows = readSheetObjects(piQuestionSheet_().sheet);
  return {
    ok: true,
    questions: rows
      .filter(function (row) { return row.status === "open"; })
      .map(function (row) { return { id: row.id, question: row.question, audience: row.audience, askedAt: piIso_(row.asked_at) }; }),
  };
}

function piAnswerQuestion(payload) {
  payload = payload || {};
  const session = portalRequireRoles_(payload.token, PI_ANSWER_ROLES);
  const publish = payload.publish === true;
  const answer = String(payload.answer || "").trim().slice(0, 2000);
  if (publish && answer.length < 10) throw new Error("Write an answer of at least a sentence before publishing.");
  const context = piQuestionSheet_();
  const row = readSheetObjects(context.sheet).filter(function (item) { return item.id === payload.id; })[0];
  if (!row) throw new Error("Question not found.");
  row.status = publish ? "published" : "closed";
  row.answer = publish ? answer : "";
  row.published = publish;
  row.answered_by = session.email;
  row.answered_at = new Date().toISOString();
  upsertRows(context.sheet, [row]);
  if (publish && row.asked_by) {
    appendTicketNotification_(context.spreadsheet, row.asked_by, "", "Pi has an answer for you", row.question + " - " + answer.slice(0, 300), "success", row.id);
  }
  return { ok: true };
}

function piListFaq(payload) {
  portalRequireRoles_(payload && payload.token, []);
  const rows = readSheetObjects(piQuestionSheet_().sheet);
  return {
    ok: true,
    faq: rows
      .filter(function (row) { return piPublished_(row.published) && String(row.answer || "").trim(); })
      .map(function (row) { return { id: row.id, question: row.question, answer: row.answer, answeredAt: piIso_(row.answered_at) }; }),
  };
}
