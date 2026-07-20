function requestReviewerOtp(payload) {
  payload = payload || {};
  const email = normalizeEmailAddress(payload.email);
  requireActiveReviewer(email);
  return requestEmailOtp({ email, purpose: "tf-reviewer" });
}

function verifyReviewerOtp(payload) {
  payload = payload || {};
  const email = normalizeEmailAddress(payload.email);
  const reviewer = requireActiveReviewer(email);
  const result = verifyEmailOtp({ email, code: payload.code, purpose: "tf-reviewer" });
  if (!result.ok) return result;
  return {
    ok: true,
    email,
    sessionToken: result.verificationToken,
    expiresInSeconds: result.expiresInSeconds,
    reviewer,
  };
}

function getReviewerSession(payload) {
  const reviewer = requireReviewerSession(payload || {});
  return { ok: true, reviewer };
}

function listReviewApplicants(payload) {
  const reviewer = requireReviewerSession(payload || {});
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applications = readTutorialReviewApplications(spreadsheet);
  const assignments = readSheetObjects(getSheet(spreadsheet, "ReviewAssignments"));
  const visibleApplications = filterReviewApplicationsForReviewer(applications, assignments, reviewer);
  return {
    ok: true,
    reviewer,
    applications: visibleApplications,
    scores: readSheetObjects(getSheet(spreadsheet, "ReviewScores")),
    notes: readSheetObjects(getSheet(spreadsheet, "ReviewNotes")),
    stages: readSheetObjects(getSheet(spreadsheet, "ReviewStages")),
    assignments,
    config: reviewConfig(spreadsheet),
    reviewers: reviewerCanManage(reviewer) ? readSheetObjects(getSheet(spreadsheet, "Reviewers")) : [],
    syncedAt: new Date().toISOString(),
  };
}

function saveReviewScore(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  const reason = String(payload.reason || "").trim();
  if (!reason) throw new Error("A reason is required before saving score revisions.");
  const scoreId = applicationId + "::" + reviewer.email;
  const sheet = getSheet(spreadsheet, "ReviewScores");
  const before = findSheetObject(sheet, scoreId);
  const teaching = clampScore(payload.teachingScore);
  const research = clampScore(payload.researchScore);
  const row = {
    score_id: scoreId,
    application_id: applicationId,
    reviewer_email: reviewer.email,
    reviewer_name: reviewer.name || reviewer.email,
    teaching_score: teaching,
    research_score: research,
    weighted_score: Math.round(teaching * 0.7 + research * 0.3),
    eligibility_decision: String(payload.eligibilityDecision || ""),
    recommendation: String(payload.recommendation || ""),
    course_verdicts_json: JSON.stringify(payload.courseVerdicts || {}),
    machine_score_json: JSON.stringify(payload.machineScore || {}),
    reason,
    updated_at: new Date().toISOString(),
  };
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, "saveReviewScore", applicationId, before, row, reason);
  return { ok: true, score: row };
}

function saveEligibilityDecision(payload) {
  payload = payload || {};
  payload.reason = payload.reason || "Eligibility decision updated.";
  return saveReviewScore(payload);
}

function saveReviewNote(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  const noteText = String(payload.note || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  if (!noteText) throw new Error("A note cannot be empty.");
  const sheet = getSheet(spreadsheet, "ReviewNotes");
  const noteId = String(payload.noteId || Utilities.getUuid());
  const before = findSheetObject(sheet, noteId);
  const now = new Date().toISOString();
  const row = Object.assign(
    {
      note_id: noteId,
      application_id: applicationId,
      author_email: reviewer.email,
      author_name: reviewer.name || reviewer.email,
      stage: String(payload.stage || "All applicants"),
      status: "Active",
      created_at: now,
      withdrawn_at: "",
    },
    before || {},
    {
      note: noteText,
      edited_at: before ? now : "",
      edited_by: before ? reviewer.email : "",
    },
  );
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, before ? "editReviewNote" : "saveReviewNote", applicationId, before, row, "");
  return { ok: true, note: row };
}

function withdrawReviewNote(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const sheet = getSheet(spreadsheet, "ReviewNotes");
  const noteId = String(payload.noteId || "");
  const before = findSheetObject(sheet, noteId);
  if (!before) throw new Error("Review note not found.");
  if (before.author_email !== reviewer.email && !reviewerCanManage(reviewer)) {
    throw new Error("Only the author or a review manager can withdraw this note.");
  }
  const row = Object.assign({}, before, {
    status: "Withdrawn",
    edited_at: new Date().toISOString(),
    edited_by: reviewer.email,
    withdrawn_at: new Date().toISOString(),
  });
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, "withdrawReviewNote", before.application_id, before, row, String(payload.reason || ""));
  return { ok: true, note: row };
}

function updateReviewStage(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  const sheet = getSheet(spreadsheet, "ReviewStages");
  const before = findSheetObject(sheet, applicationId);
  const row = {
    application_id: applicationId,
    stage: reviewStageLabel(payload.stage),
    decision: String(payload.decision || ""),
    updated_by: reviewer.email,
    updated_at: new Date().toISOString(),
  };
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, "updateReviewStage", applicationId, before, row, String(payload.reason || ""));
  return { ok: true, stage: row };
}

function exportReviewAudit(payload) {
  const reviewer = requireReviewerSession(payload || {});
  if (!reviewerCanManage(reviewer)) throw new Error("Only review managers can export the full audit trail.");
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  return {
    ok: true,
    exportedAt: new Date().toISOString(),
    applications: readTutorialReviewApplications(spreadsheet),
    scores: readSheetObjects(getSheet(spreadsheet, "ReviewScores")),
    notes: readSheetObjects(getSheet(spreadsheet, "ReviewNotes")),
    stages: readSheetObjects(getSheet(spreadsheet, "ReviewStages")),
    audit: readSheetObjects(getSheet(spreadsheet, "ReviewAudit")),
  };
}

function requireReviewerSession(payload) {
  payload = payload || {};
  const email = normalizeEmailAddress(payload.reviewerEmail || payload.email);
  const token = String(payload.sessionToken || payload.token || "");
  if (!token) throw new Error("Reviewer verification is required.");
  const raw = CacheService.getScriptCache().get(emailOtpCacheKey("verified", "tf-reviewer", token));
  if (!raw) throw new Error("Reviewer session expired. Verify your email again.");
  const record = JSON.parse(raw);
  if (record.email !== email || record.purpose !== "tf-reviewer") {
    throw new Error("Reviewer session does not match this account.");
  }
  return requireActiveReviewer(email);
}

function requireActiveReviewer(email) {
  const reviewer = findReviewerByEmail(email);
  if (!reviewer) throw new Error("This email is not registered as a Tutorial Fellow reviewer.");
  if (String(reviewer.status || "Active").toLowerCase() !== "active") {
    throw new Error("This reviewer account is not active.");
  }
  const assigned = String(reviewer.assigned_call || reviewer.assignedCall || "tutorial-fellow").toLowerCase();
  if (assigned && assigned !== "all" && assigned !== "tutorial-fellow" && assigned !== "tutorial fellows") {
    throw new Error("This reviewer is not assigned to the Tutorial Fellow call.");
  }
  return {
    email: normalizeEmailAddress(reviewer.reviewer_email || reviewer.email),
    name: reviewer.name || reviewer.reviewer_email || reviewer.email,
    role: reviewer.role || "Reviewer",
    status: reviewer.status || "Active",
    assignedCall: reviewer.assigned_call || "tutorial-fellow",
  };
}

function findReviewerByEmail(email) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const target = normalizeEmailAddress(email);
  return readSheetObjects(getSheet(spreadsheet, "Reviewers")).find((row) => {
    const rowEmail = row.reviewer_email || row.email;
    return rowEmail && normalizeEmailAddress(rowEmail) === target;
  });
}

function reviewerCanManage(reviewer) {
  const role = String(reviewer && reviewer.role || "").toLowerCase();
  return role === "academic manager" || role === "manager" || role === "admin" || role === "super admin" || role === "chair";
}

function filterReviewApplicationsForReviewer(applications, assignments, reviewer) {
  if (reviewerCanManage(reviewer)) return applications;
  const activeAssignments = assignments.filter((row) => String(row.status || "Active").toLowerCase() !== "inactive");
  if (!activeAssignments.length) return applications;
  const assignedIds = {};
  activeAssignments.forEach((row) => {
    const email = row.reviewer_email || row.email;
    if (email && normalizeEmailAddress(email) === reviewer.email) {
      assignedIds[row.application_id] = true;
    }
  });
  if (!Object.keys(assignedIds).length) return [];
  return applications.filter((app) => assignedIds[app.applicationId]);
}

function readTutorialReviewApplications(spreadsheet) {
  const rows = readSheetObjects(getSheet(spreadsheet, "TutorialFellowApplications"));
  return rows
    .map((row) => normalizeTutorialReviewApplication(row))
    .filter((app) => app.applicant);
}

function normalizeTutorialReviewApplication(row) {
  const full = parseJsonSafe(row.full_application_json, {});
  const references = [row.reference_1_json, row.reference_2_json, row.reference_3_json].map((value) => parseJsonSafe(value, {}));
  return {
    applicationId: row.application_id || "",
    submittedAt: row.submitted_at || "",
    title: row.title || fieldFromJson(full, ["details", "title"]) || "",
    applicant: row.applicant || fieldFromJson(full, ["details", "name"]) || "",
    gender: row.gender || fieldFromJson(full, ["details", "gender"]) || "",
    email: row.email || fieldFromJson(full, ["details", "email"]) || "",
    phone: row.phone || fieldFromJson(full, ["details", "phone"]) || "",
    nationality: row.nationality || fieldFromJson(full, ["details", "nationality"]) || "",
    country: row.country_of_residence || fieldFromJson(full, ["details", "country"]) || "",
    affiliation: row.affiliation || fieldFromJson(full, ["details", "affiliation"]) || "",
    designation: row.designation || fieldFromJson(full, ["details", "designation"]) || "",
    phdField: row.phd_field || fieldFromJson(full, ["phd", "field"]) || "",
    phdCompletion: row.phd_completion || fieldFromJson(full, ["phd", "completionDate"]) || "",
    thesisTitleExplainer: row.thesis_title_explainer || fieldFromJson(full, ["phd", "thesisTitleExplainer"]) || "",
    researchArea: row.research_area || fieldFromJson(full, ["phd", "researchArea"]) || "",
    quantitativeBackground: fieldFromJson(full, ["experience", "quantitativeBackground"]) || "",
    appliedTrackRecord: fieldFromJson(full, ["experience", "appliedTrackRecord"]) || "",
    teachingExperience: row.teaching_experience || fieldFromJson(full, ["experience", "teachingExperience"]) || "",
    tutoringExperience: row.tutoring_experience || fieldFromJson(full, ["experience", "tutoringExperience"]) || "",
    mentoringExperience: row.mentoring_experience || fieldFromJson(full, ["experience", "mentoringExperience"]) || "",
    researchExperience: row.research_experience || fieldFromJson(full, ["experience", "researchExperience"]) || "",
    teachingSupport: fieldFromJson(full, ["experience", "teachingSupport"]) || "",
    researchPlan: row.research_plan || fieldFromJson(full, ["research", "plan"]) || "",
    careerGrowth: fieldFromJson(full, ["research", "careerGrowth"]) || "",
    availability: row.availability || fieldFromJson(full, ["commitment", "availability"]) || "",
    residenceReady: row.residence_ready || fieldFromJson(full, ["commitment", "residenceReady"]) || "",
    teachingGapReady: row.teaching_gap_ready || fieldFromJson(full, ["commitment", "teachingGapReady"]) || "",
    englishCommunication: row.english_communication || fieldFromJson(full, ["commitment", "englishCommunication"]) || "",
    aimsAlumni: row.aims_alumni || fieldFromJson(full, ["additional", "aimsAlumni"]) || "",
    aimsCentre: row.aims_centre || fieldFromJson(full, ["additional", "aimsCentre"]) || "",
    passport: row.passport_drive_url || row.passport_file_name || "",
    phdCertificate: row.phd_certificate_drive_url || row.phd_certificate_file_name || "",
    references,
    fullApplication: full,
    sourceRow: row,
  };
}

function fieldFromJson(object, path) {
  let current = object;
  for (let i = 0; i < path.length; i += 1) {
    if (!current || current[path[i]] === undefined || current[path[i]] === null) return "";
    current = current[path[i]];
  }
  return current;
}

function parseJsonSafe(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
}

function readSheetObjects(sheet) {
  const headers = getHeaders(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, headers.length).getValues().map((row) => {
    const object = {};
    headers.forEach((header, index) => {
      object[header] = row[index];
    });
    return object;
  });
}

function findSheetObject(sheet, key) {
  const headers = getHeaders(sheet);
  const keyHeader = headers[0];
  return readSheetObjects(sheet).find((row) => String(row[keyHeader]) === String(key)) || null;
}

function reviewStageLabel(value) {
  const allowed = ["All applicants", "Screened", "Shortlist", "Finalists", "Decision"];
  const stage = String(value || "All applicants");
  return allowed.indexOf(stage) >= 0 ? stage : "All applicants";
}

function reviewConfig(spreadsheet) {
  const rows = readSheetObjects(getSheet(spreadsheet, "ReviewConfig"));
  const config = {
    stages: ["All applicants", "Screened", "Shortlist", "Finalists", "Decision"],
    stageTargets: { "All applicants": 100, Screened: 85, Shortlist: 70, Finalists: 30, Decision: 10 },
    weights: { teaching: 70, research: 30 },
    eligibilityLabels: ["Progress strong", "Progress", "Review", "Do not progress"],
  };
  rows.forEach((row) => {
    if (row.key) config[row.key] = parseJsonSafe(row.json, row.json);
  });
  return config;
}

function appendReviewAudit(spreadsheet, reviewer, action, applicationId, before, after, reason) {
  appendRows(getSheet(spreadsheet, "ReviewAudit"), [
    {
      audit_id: Utilities.getUuid(),
      timestamp: new Date().toISOString(),
      reviewer_email: reviewer.email,
      reviewer_name: reviewer.name || reviewer.email,
      action,
      application_id: applicationId || "",
      old_value_json: JSON.stringify(before || {}),
      new_value_json: JSON.stringify(after || {}),
      reason: reason || "",
    },
  ]);
}

function clampScore(value) {
  const number = Math.round(Number(value || 0));
  return Math.max(0, Math.min(100, number));
}
