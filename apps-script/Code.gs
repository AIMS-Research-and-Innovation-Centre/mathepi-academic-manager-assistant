const MATHEPI = {
  spreadsheetName: "MathEpi Academic Operations",
  rootFolderName: "MathEpi Academic Operations",
  properties: {
    spreadsheetId: "MATHEPI_SPREADSHEET_ID",
    driveRootFolderId: "MATHEPI_DRIVE_ROOT_FOLDER_ID",
  },
  defaultCfaStatuses: {
    lecturers: "Open",
    tutors: "Open",
    "head-tutor": "Closed",
  },
};

const DATASET_TABS = [
  "CalendarBlocks",
  "Courses",
  "People",
  "Sessions",
  "Timesheets",
  "Tasks",
  "StudentPlanner",
  "StudentTodos",
  "PlannerTasks",
  "Students",
  "StudyGroups",
  "StudyGroupMembers",
  "StudyGroupInvitations",
  "StudyGroupActivities",
  "StudyGroupMeetings",
  "StudyGroupTaskAssignments",
  "Appointments",
  "Availability",
  "SupportRequests",
];

const TAB_HEADERS = {
  AppState: ["key", "json", "updated_at"],
  CfaStatuses: ["id", "status", "updated_at"],
  LecturerApplications: [
    "application_id",
    "submitted_at",
    "email",
    "applicant",
    "affiliation",
    "designation",
    "first_host",
    "second_host",
    "course",
    "block",
    "availability",
    "passport_file_name",
    "passport_drive_url",
    "alumni",
    "full_application_json",
  ],
  TutorialFellowApplications: [
    "application_id",
    "submitted_at",
    "title",
    "email",
    "applicant",
    "gender",
    "phone",
    "has_whatsapp",
    "contact_whatsapp",
    "nationality",
    "country_of_residence",
    "address",
    "affiliation",
    "designation",
    "phd_field",
    "phd_completion",
    "thesis_title_explainer",
    "research_area",
    "teaching_experience",
    "tutoring_experience",
    "mentoring_experience",
    "research_experience",
    "research_plan",
    "availability",
    "residence_ready",
    "teaching_gap_ready",
    "english_communication",
    "aims_alumni",
    "aims_centre",
    "aims_programme_year",
    "passport_file_name",
    "passport_drive_url",
    "phd_certificate_file_name",
    "phd_certificate_drive_url",
    "reference_1_json",
    "reference_2_json",
    "reference_3_json",
    "full_application_json",
  ],
  Reviewers: [
    "reviewer_email",
    "name",
    "role",
    "status",
    "assigned_call",
    "created_at",
    "updated_at",
  ],
  ReviewAssignments: [
    "assignment_id",
    "application_id",
    "reviewer_email",
    "call_id",
    "status",
    "created_at",
    "updated_at",
  ],
  ReviewScores: [
    "score_id",
    "application_id",
    "reviewer_email",
    "reviewer_name",
    "teaching_score",
    "research_score",
    "weighted_score",
    "eligibility_decision",
    "recommendation",
    "course_verdicts_json",
    "machine_score_json",
    "reason",
    "updated_at",
  ],
  ReviewAnalyses: [
    "analysis_id",
    "application_id",
    "applicant_code",
    "reviewer_email",
    "reviewer_name",
    "stage",
    "teaching_score",
    "research_score",
    "weighted_score",
    "score_details_json",
    "component_verdicts_json",
    "eligibility_text",
    "best_fit_text",
    "delivery_text",
    "teaching_text",
    "research_text",
    "kemri_aims_text",
    "gaps_text",
    "interview_questions_text",
    "general_comment",
    "analysis_json",
    "updated_at",
  ],
  ReviewNotes: [
    "note_id",
    "application_id",
    "author_email",
    "author_name",
    "stage",
    "note",
    "status",
    "created_at",
    "edited_at",
    "edited_by",
    "withdrawn_at",
  ],
  ReviewStages: [
    "application_id",
    "stage",
    "decision",
    "updated_by",
    "updated_at",
  ],
  ReviewConfig: ["key", "json", "updated_at"],
  ReviewAudit: [
    "audit_id",
    "timestamp",
    "reviewer_email",
    "reviewer_name",
    "action",
    "application_id",
    "old_value_json",
    "new_value_json",
    "reason",
  ],
  DriveDocuments: ["document_id", "type", "related_id", "file_name", "drive_file_id", "url", "created_at"],
};

DATASET_TABS.forEach((tab) => {
  TAB_HEADERS[tab] = ["record_id", "json", "updated_at"];
});

function doGet(e) {
  try {
    const action = e && e.parameter && e.parameter.action;
    if (action) {
      const payload = e.parameter.payload ? JSON.parse(e.parameter.payload) : e.parameter;
      return routeResponse(apiPost({ action, payload }), e);
    }
    return HtmlService.createHtmlOutput(
      "<h1>MathEpi Apps Script Backend</h1><p>Deploy this Web App URL into the MathEpi portal Sheets & Drive settings.</p>",
    );
  } catch (error) {
    return routeResponse(routeErrorResponse(error), e);
  }
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    return jsonResponse(apiPost(parseRouteRequestBody(body)));
  } catch (error) {
    return jsonResponse(routeErrorResponse(error));
  }
}

function parseRouteRequestBody(body) {
  try {
    return JSON.parse(body || "{}");
  } catch (error) {
    throw new Error("The Apps Script backend could not read this request. Refresh the application page and try again.");
  }
}

function routeErrorResponse(error) {
  return { ok: false, error: error && error.message ? error.message : String(error || "Unknown Apps Script error.") };
}

function routeResponse(data, e) {
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) return jsonpResponse(callback, data);
  return jsonResponse(data);
}

function jsonpResponse(callback, data) {
  const name = String(callback || "");
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(name)) {
    return jsonResponse({ ok: false, error: "Invalid callback name." });
  }
  const body = `${name}(${JSON.stringify(data).replace(/</g, "\\u003c")});`;
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function apiPost(request) {
  const action = request && request.action;
  const payload = (request && request.payload) || {};
  if (action === "setupWorkspace") return setupWorkspace(payload);
  if (action === "saveSnapshot") return saveSnapshot(payload);
  if (action === "getBootstrap") return getBootstrap();
  if (action === "updateCfaStatus") return updateCfaStatus(payload);
  if (action === "getCfaStatus") return getCfaStatus(payload);
  if (action === "diagnoseEmailOtp") return diagnoseEmailOtp(payload);
  if (action === "requestEmailOtp") return requestEmailOtp(payload);
  if (action === "verifyEmailOtp") return verifyEmailOtp(payload);
  if (action === "requestReviewerOtp") return requestReviewerOtp(payload);
  if (action === "verifyReviewerOtp") return verifyReviewerOtp(payload);
  if (action === "getReviewerSession") return getReviewerSession(payload);
  if (action === "listReviewApplicants") return listReviewApplicants(payload);
  if (action === "saveReviewScore") return saveReviewScore(payload);
  if (action === "saveReviewAnalysis") return saveReviewAnalysis(payload);
  if (action === "saveReviewNote") return saveReviewNote(payload);
  if (action === "withdrawReviewNote") return withdrawReviewNote(payload);
  if (action === "updateReviewStage") return updateReviewStage(payload);
  if (action === "saveEligibilityDecision") return saveEligibilityDecision(payload);
  if (action === "exportReviewAudit") return exportReviewAudit(payload);
  if (action === "submitLecturerApplication") return submitLecturerApplication(payload);
  if (action === "submitTutorialFellowApplication") return submitTutorialFellowApplication(payload);
  throw new Error("Unknown action: " + action);
}

function setupWorkspace(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);
  writeDefaultCfaStatuses(spreadsheet);
  let tabsUpdated = 0;
  if (payload && payload.datasets) {
    tabsUpdated = writeDatasets(spreadsheet, payload.datasets);
    if (payload.cfaStatuses) writeCfaStatuses(spreadsheet, payload.cfaStatuses);
  }
  return {
    ok: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    spreadsheetUrl: spreadsheet.getUrl(),
    driveRootFolderId: rootFolder.getId(),
    driveRootUrl: rootFolder.getUrl(),
    tabsUpdated,
  };
}

function saveSnapshot(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);
  const tabsUpdated = writeDatasets(spreadsheet, payload.datasets || {});
  if (payload.cfaStatuses) writeCfaStatuses(spreadsheet, payload.cfaStatuses);
  upsertRows(getSheet(spreadsheet, "AppState"), [
    {
      key: "latest_snapshot",
      json: JSON.stringify(payload || {}),
      updated_at: new Date().toISOString(),
    },
  ]);
  return { ok: true, tabsUpdated, spreadsheetUrl: spreadsheet.getUrl(), driveRootUrl: rootFolder.getUrl() };
}

function getBootstrap() {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const datasets = {};
  DATASET_TABS.forEach((tab) => {
    datasets[tab] = readJsonRecords(getSheet(spreadsheet, tab));
  });
  return {
    ok: true,
    datasets,
    cfaStatuses: readCfaStatuses(spreadsheet),
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
  };
}

function updateCfaStatus(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const id = payload.id || "lecturers";
  const status = payload.status === "Closed" ? "Closed" : "Open";
  upsertRows(getSheet(spreadsheet, "CfaStatuses"), [
    { id, status, updated_at: new Date().toISOString() },
  ]);
  return { ok: true, id, status };
}

function getCfaStatus(payload) {
  const id = (payload && payload.id) || "lecturers";
  const statuses = readCfaStatuses(getOrCreateSpreadsheet());
  return { ok: true, id, status: statuses[id] || MATHEPI.defaultCfaStatuses[id] || "Closed" };
}

function authorizeEmailOtp() {
  return MailApp.getRemainingDailyQuota();
}

function diagnoseEmailOtp(payload) {
  try {
    const remainingDailyQuota = MailApp.getRemainingDailyQuota();
    return {
      ok: true,
      emailService: "MailApp",
      remainingDailyQuota,
      message: remainingDailyQuota > 0
        ? "MailApp is authorized and has remaining email quota."
        : "MailApp is authorized, but the daily email quota is exhausted.",
    };
  } catch (error) {
    return emailOtpErrorResponse(error);
  }
}

function sendEmailOtpMessage(email, code) {
  MailApp.sendEmail({
    to: email,
    name: "MathEpi Academic Operations",
    subject: "Your MathEpi application verification code",
    body:
      "Your MathEpi application verification code is: " +
      code +
      "\n\nThis code expires in 10 minutes. If you did not request it, you can ignore this email.",
    htmlBody:
      "<p>Your MathEpi application verification code is:</p>" +
      "<p style=\"font-size:24px;font-weight:700;letter-spacing:3px;\">" + code + "</p>" +
      "<p>This code expires in 10 minutes. If you did not request it, you can ignore this email.</p>",
  });
  return "account";
}

function requestEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const cache = CacheService.getScriptCache();
    const rateKey = emailOtpCacheKey("rate", purpose, email);
    if (cache.get(rateKey)) {
      return { ok: false, error: "Please wait about 30 seconds before requesting another code." };
    }
    const remainingDailyQuota = MailApp.getRemainingDailyQuota();
    if (remainingDailyQuota < 1) {
      return { ok: false, error: "The Apps Script email quota is exhausted for today. Please try again tomorrow." };
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresInSeconds = 10 * 60;
    const challenge = {
      email,
      purpose,
      codeHash: emailOtpHash(email, purpose, code),
      attempts: 0,
      expiresAt: Date.now() + expiresInSeconds * 1000,
    };

    const senderMode = sendEmailOtpMessage(email, code);
    cache.put(emailOtpCacheKey("challenge", purpose, email), JSON.stringify(challenge), expiresInSeconds);
    cache.put(rateKey, "1", 30);
    return {
      ok: true,
      email,
      expiresInSeconds,
      remainingDailyQuota: Math.max(0, remainingDailyQuota - 1),
      senderMode,
      deliveryHint: "The code was accepted by Google MailApp. Check inbox, spam/junk, Promotions, and Updates. The sender may show the deploying Google account with the display name MathEpi Academic Operations.",
    };
  } catch (error) {
    return emailOtpErrorResponse(error);
  }
}

function verifyEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const code = String(payload.code || "").trim();
    if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit verification code.");

    const cache = CacheService.getScriptCache();
    const challengeKey = emailOtpCacheKey("challenge", purpose, email);
    const rawChallenge = cache.get(challengeKey);
    if (!rawChallenge) throw new Error("This verification code has expired. Request a new code.");

    const challenge = JSON.parse(rawChallenge);
    const remainingSeconds = Math.max(1, Math.ceil((challenge.expiresAt - Date.now()) / 1000));
    if (remainingSeconds <= 1) {
      cache.remove(challengeKey);
      throw new Error("This verification code has expired. Request a new code.");
    }
    if (challenge.attempts >= 5) {
      cache.remove(challengeKey);
      throw new Error("Too many verification attempts. Request a new code.");
    }
    if (challenge.codeHash !== emailOtpHash(email, purpose, code)) {
      challenge.attempts += 1;
      cache.put(challengeKey, JSON.stringify(challenge), remainingSeconds);
      throw new Error("The verification code is incorrect.");
    }

    const token = Utilities.getUuid() + "-" + Utilities.getUuid();
    const verified = { email, purpose, verifiedAt: new Date().toISOString() };
    cache.remove(challengeKey);
    cache.put(emailOtpCacheKey("verified", purpose, token), JSON.stringify(verified), 6 * 60 * 60);
    return { ok: true, email, verificationToken: token, expiresInSeconds: 6 * 60 * 60 };
  } catch (error) {
    return emailOtpErrorResponse(error);
  }
}

function emailOtpErrorResponse(error) {
  return { ok: false, error: error && error.message ? error.message : String(error || "Email verification failed.") };
}

function requireEmailVerification(verification, email, purpose) {
  const verifiedEmail = normalizeEmailAddress(email);
  const token = verification && verification.token;
  if (!token) throw new Error("Email verification is required before this application can be submitted.");
  const raw = CacheService.getScriptCache().get(emailOtpCacheKey("verified", purpose, token));
  if (!raw) throw new Error("Email verification has expired. Please verify your email again.");
  const record = JSON.parse(raw);
  if (record.email !== verifiedEmail || record.purpose !== purpose) {
    throw new Error("Email verification does not match this application.");
  }
  return record;
}

function normalizeEmailAddress(email) {
  const value = String(email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("A valid email address is required.");
  return value;
}

function otpPurpose(payload) {
  const value = String((payload && payload.purpose) || "tutorial-fellow").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return value || "tutorial-fellow";
}

function emailOtpCacheKey(prefix, purpose, value) {
  return ["mathepi", "otp", prefix, purpose, Utilities.base64EncodeWebSafe(String(value)).replace(/=+$/g, "")].join(":").slice(0, 240);
}

function emailOtpHash(email, purpose, code) {
  const secret = emailOtpSecret();
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [email, purpose, code, secret].join("|"));
  return Utilities.base64EncodeWebSafe(bytes);
}

function emailOtpSecret() {
  const props = PropertiesService.getScriptProperties();
  const key = "MATHEPI_EMAIL_OTP_SECRET";
  let secret = props.getProperty(key);
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid();
    props.setProperty(key, secret);
  }
  return secret;
}

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
  const assignments = readReviewSheetObjects(spreadsheet, "ReviewAssignments");
  const visibleApplications = filterReviewApplicationsForReviewer(applications, assignments, reviewer);
  return {
    ok: true,
    reviewer,
    applications: visibleApplications,
    scores: readReviewSheetObjects(spreadsheet, "ReviewScores"),
    analyses: readReviewSheetObjects(spreadsheet, "ReviewAnalyses"),
    notes: readReviewSheetObjects(spreadsheet, "ReviewNotes"),
    stages: readReviewSheetObjects(spreadsheet, "ReviewStages"),
    assignments,
    config: reviewConfig(spreadsheet),
    reviewers: reviewerCanManage(reviewer) ? readReviewSheetObjects(spreadsheet, "Reviewers") : [],
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
    machine_score_json: JSON.stringify(payload.initialScore || payload.machineScore || {}),
    reason,
    updated_at: new Date().toISOString(),
  };
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, "saveReviewScore", applicationId, before, row, reason);
  return { ok: true, score: row };
}

function saveReviewAnalysis(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  const sheet = getSheet(spreadsheet, "ReviewAnalyses");
  const analysisId = applicationId + "::" + reviewer.email;
  const before = findSheetObject(sheet, analysisId);
  const teaching = clampScore(payload.teachingScore);
  const research = clampScore(payload.researchScore);
  const row = {
    analysis_id: analysisId,
    application_id: applicationId,
    applicant_code: String(payload.applicantCode || ""),
    reviewer_email: reviewer.email,
    reviewer_name: reviewer.name || reviewer.email,
    stage: reviewStageLabel(payload.stage || "All applicants"),
    teaching_score: teaching,
    research_score: research,
    weighted_score: Math.round(teaching * 0.7 + research * 0.3),
    score_details_json: JSON.stringify(payload.scoreDetails || {}),
    component_verdicts_json: JSON.stringify(payload.componentVerdicts || payload.courseVerdicts || {}),
    eligibility_text: String(payload.eligibilityText || ""),
    best_fit_text: String(payload.bestFitText || ""),
    delivery_text: String(payload.deliveryText || ""),
    teaching_text: String(payload.teachingText || ""),
    research_text: String(payload.researchText || ""),
    kemri_aims_text: String(payload.kemriAimsText || payload.kemriAimsRicText || ""),
    gaps_text: String(payload.gapsText || ""),
    interview_questions_text: String(payload.interviewQuestionsText || ""),
    general_comment: String(payload.generalComment || ""),
    analysis_json: JSON.stringify(payload.analysis || {}),
    updated_at: new Date().toISOString(),
  };
  upsertRows(sheet, [row]);
  appendReviewAudit(spreadsheet, reviewer, "saveReviewAnalysis", applicationId, before, row, String(payload.reason || ""));
  return { ok: true, analysis: row };
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
  const beforeAuthorEmail = normalizeEmailAddress(before && before.author_email || "");
  const beforeAuthorName = String(before && before.author_name || "");
  if (
    before &&
    !reviewerCanManage(reviewer) &&
    ((beforeAuthorEmail && beforeAuthorEmail !== reviewer.email) || (!beforeAuthorEmail && beforeAuthorName && beforeAuthorName !== reviewer.name))
  ) {
    throw new Error("Only the author or a review manager can edit this note.");
  }
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
  if (!reviewerCanManage(reviewer)) {
    throw new Error("Only Cecil or a review manager can update the formal review stage.");
  }
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
    scores: readReviewSheetObjects(spreadsheet, "ReviewScores"),
    analyses: readReviewSheetObjects(spreadsheet, "ReviewAnalyses"),
    notes: readReviewSheetObjects(spreadsheet, "ReviewNotes"),
    stages: readReviewSheetObjects(spreadsheet, "ReviewStages"),
    audit: readReviewSheetObjects(spreadsheet, "ReviewAudit"),
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
  return readReviewSheetObjects(spreadsheet, "Reviewers").find((row) => {
    const rowEmail = row.reviewer_email || row.email;
    return rowEmail && normalizeEmailAddress(rowEmail) === target;
  });
}

function reviewerCanManage(reviewer) {
  const role = String(reviewer && reviewer.role || "").toLowerCase();
  const identity = String([reviewer && reviewer.name, reviewer && reviewer.email].filter(Boolean).join(" ")).toLowerCase();
  return role === "academic manager" ||
    role === "review manager" ||
    role === "manager" ||
    role === "admin" ||
    role === "super admin" ||
    role === "chair" ||
    identity.indexOf("cecil") >= 0;
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
  const rows = readReviewSheetObjects(spreadsheet, "TutorialFellowApplications");
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
  if (!headers.length) return [];
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

function readReviewSheetObjects(spreadsheet, name) {
  const sheet = getSheet(spreadsheet, name);
  const headers = ensureReviewSheetHeaders(sheet, TAB_HEADERS[name] || ["record_id"]);
  const lastRow = sheet.getLastRow();
  if (!headers.length || lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, headers.length).getValues().map((row) => {
    const object = {};
    headers.forEach((header, index) => {
      object[header] = row[index];
    });
    return object;
  });
}

function ensureReviewSheetHeaders(sheet, headers) {
  const expectedHeaders = (headers && headers.length ? headers : ["record_id"]).map(String);
  const lastColumn = sheet.getLastColumn();
  if (lastColumn < 1) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    sheet.setFrozenRows(1);
    return expectedHeaders;
  }

  const width = Math.max(lastColumn, expectedHeaders.length);
  const current = sheet.getRange(1, 1, 1, width).getValues()[0].map((value) => String(value || "").trim());
  if (!current.some(Boolean)) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    sheet.setFrozenRows(1);
    return expectedHeaders;
  }

  const present = {};
  current.forEach((header) => {
    if (header) present[header] = true;
  });
  const missing = expectedHeaders.filter((header) => !present[header]);
  if (missing.length) {
    sheet.getRange(1, lastColumn + 1, 1, missing.length).setValues([missing]);
  }
  if (sheet.getFrozenRows() < 1) sheet.setFrozenRows(1);
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map((value, index) => {
    const header = String(value || "").trim();
    return header || "column_" + (index + 1);
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
  const rows = readReviewSheetObjects(spreadsheet, "ReviewConfig");
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

function submitLecturerApplication(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);

  const application = payload.application || {};
  const applicationId = Utilities.getUuid();
  const submittedAt = application.submittedAt || new Date().toISOString();
  const passport = payload.passportFile;
  let driveFileUrl = "";
  let driveFileId = "";

  if (passport && passport.dataBase64) {
    const folder = getOrCreateNestedFolder(rootFolder, ["CFA", "Lecturer Applications", applicationId]);
    const bytes = Utilities.base64Decode(passport.dataBase64);
    const blob = Utilities.newBlob(bytes, passport.mimeType || "application/octet-stream", passport.name || "passport");
    const file = folder.createFile(blob);
    driveFileUrl = file.getUrl();
    driveFileId = file.getId();
    appendRows(getSheet(spreadsheet, "DriveDocuments"), [
      {
        document_id: Utilities.getUuid(),
        type: "Lecturer passport biodata page",
        related_id: applicationId,
        file_name: passport.name || application.passport || "",
        drive_file_id: driveFileId,
        url: driveFileUrl,
        created_at: submittedAt,
      },
    ]);
  }

  appendRows(getSheet(spreadsheet, "LecturerApplications"), [
    {
      application_id: applicationId,
      submitted_at: submittedAt,
      email: application.email || "",
      applicant: application.applicant || "",
      affiliation: application.affiliation || "",
      designation: application.designation || "",
      first_host: application.firstHost || "",
      second_host: application.secondHost || "",
      course: application.course || "",
      block: application.block || "",
      availability: application.availability || "",
      passport_file_name: application.passport || "",
      passport_drive_url: driveFileUrl,
      alumni: application.alumni || "",
      full_application_json: JSON.stringify(payload.state || {}),
    },
  ]);

  return { ok: true, applicationId, driveFileUrl, driveFileId };
}

function submitTutorialFellowApplication(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);

  const application = payload.application || {};
  requireEmailVerification(payload.emailVerification, application.email, "tutorial-fellow");
  const applicationId = Utilities.getUuid();
  const submittedAt = application.submittedAt || new Date().toISOString();
  const folder = getOrCreateNestedFolder(rootFolder, ["CFA", "Tutorial Fellow Applications", applicationId]);
  const passport = saveApplicationFile(spreadsheet, folder, payload.passportFile, applicationId, "Tutorial Fellow passport biodata page", submittedAt);
  const phdCertificate = saveApplicationFile(spreadsheet, folder, payload.phdCertificateFile, applicationId, "Tutorial Fellow PhD certificate", submittedAt);

  appendRows(getSheet(spreadsheet, "TutorialFellowApplications"), [
    {
      application_id: applicationId,
      submitted_at: submittedAt,
      title: application.title || "",
      email: application.email || "",
      applicant: application.applicant || "",
      gender: application.gender || "",
      phone: application.phone || "",
      has_whatsapp: application.hasWhatsApp || "",
      contact_whatsapp: application.contactWhatsApp || "",
      nationality: application.nationality || "",
      country_of_residence: application.country || "",
      address: application.address || "",
      affiliation: application.affiliation || "",
      designation: application.designation || "",
      phd_field: application.phdField || "",
      phd_completion: application.phdCompletion || "",
      thesis_title_explainer: application.thesisTitleExplainer || "",
      research_area: application.researchArea || "",
      teaching_experience: application.teachingExperience || "",
      tutoring_experience: application.tutoringExperience || "",
      mentoring_experience: application.mentoringExperience || "",
      research_experience: application.researchExperience || "",
      research_plan: application.researchPlan || "",
      availability: application.availability || "",
      residence_ready: application.residenceReady || "",
      teaching_gap_ready: application.teachingGapReady || "",
      english_communication: application.englishCommunication || "",
      aims_alumni: application.aimsAlumni || "",
      aims_centre: application.aimsCentre || "",
      aims_programme_year: application.aimsProgrammeYear || "",
      passport_file_name: application.passport || "",
      passport_drive_url: passport.url || "",
      phd_certificate_file_name: application.phdCertificate || "",
      phd_certificate_drive_url: phdCertificate.url || "",
      reference_1_json: JSON.stringify(referencePayload(application, 1)),
      reference_2_json: JSON.stringify(referencePayload(application, 2)),
      reference_3_json: JSON.stringify(referencePayload(application, 3)),
      full_application_json: JSON.stringify(payload.state || {}),
    },
  ]);

  return { ok: true, applicationId, passportDriveUrl: passport.url || "", phdCertificateDriveUrl: phdCertificate.url || "" };
}

function referencePayload(application, index) {
  return {
    title: application["ref" + index + "Title"] || "",
    name: application["ref" + index + "Name"] || "",
    affiliation: application["ref" + index + "Affiliation"] || "",
    designation: application["ref" + index + "Designation"] || "",
    role: application["ref" + index + "Role"] || "",
    email: application["ref" + index + "Email"] || "",
    phone: application["ref" + index + "Phone"] || "",
  };
}

function saveApplicationFile(spreadsheet, folder, filePayload, applicationId, type, submittedAt) {
  if (!filePayload || !filePayload.dataBase64) return {};
  const bytes = Utilities.base64Decode(filePayload.dataBase64);
  const blob = Utilities.newBlob(bytes, filePayload.mimeType || "application/octet-stream", filePayload.name || type);
  const file = folder.createFile(blob);
  appendRows(getSheet(spreadsheet, "DriveDocuments"), [
    {
      document_id: Utilities.getUuid(),
      type,
      related_id: applicationId,
      file_name: filePayload.name || "",
      drive_file_id: file.getId(),
      url: file.getUrl(),
      created_at: submittedAt,
    },
  ]);
  return { id: file.getId(), url: file.getUrl() };
}

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const rootFolder = getOrCreateRootFolder();
  const existingId = props.getProperty(MATHEPI.properties.spreadsheetId);
  if (existingId) {
    try {
      const spreadsheet = SpreadsheetApp.openById(existingId);
      try {
        DriveApp.getFileById(existingId).moveTo(rootFolder);
      } catch (moveError) {}
      return spreadsheet;
    } catch (e) {
      props.deleteProperty(MATHEPI.properties.spreadsheetId);
    }
  }
  const spreadsheet = SpreadsheetApp.create(MATHEPI.spreadsheetName);
  try {
    DriveApp.getFileById(spreadsheet.getId()).moveTo(rootFolder);
  } catch (moveError) {}
  props.setProperty(MATHEPI.properties.spreadsheetId, spreadsheet.getId());
  return spreadsheet;
}

function getOrCreateRootFolder() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(MATHEPI.properties.driveRootFolderId);
  if (existingId) {
    try {
      return DriveApp.getFolderById(existingId);
    } catch (e) {
      props.deleteProperty(MATHEPI.properties.driveRootFolderId);
    }
  }
  const folder = DriveApp.createFolder(MATHEPI.rootFolderName);
  props.setProperty(MATHEPI.properties.driveRootFolderId, folder.getId());
  return folder;
}

function ensureSheets(spreadsheet) {
  Object.keys(TAB_HEADERS).forEach((name) => {
    const sheet = getSheet(spreadsheet, name);
    const headers = TAB_HEADERS[name];
    ensureSheetHeaders(sheet, headers);
  });
}

function ensureSheetHeaders(sheet, headers) {
  const expectedHeaders = (headers && headers.length ? headers : ["record_id"]).map(String);
  const lastColumn = sheet.getLastColumn();
  if (lastColumn < 1) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    sheet.setFrozenRows(1);
    return expectedHeaders;
  }

  const width = Math.max(lastColumn, expectedHeaders.length);
  const current = sheet.getRange(1, 1, 1, width).getValues()[0].map((value) => String(value || "").trim());
  const hasHeaderRow = current.some(Boolean);
  if (!hasHeaderRow) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    sheet.setFrozenRows(1);
    return expectedHeaders;
  }

  const present = {};
  current.forEach((header) => {
    if (header) present[header] = true;
  });
  const missing = expectedHeaders.filter((header) => !present[header]);
  if (missing.length) {
    sheet.getRange(1, lastColumn + 1, 1, missing.length).setValues([missing]);
  }
  if (sheet.getFrozenRows() < 1) sheet.setFrozenRows(1);
  return getHeaders(sheet);
}

function ensureDriveFolders(rootFolder) {
  [
    ["CFA", "Lecturer Applications"],
    ["CFA", "Tutorial Fellow Applications"],
    ["CFA", "Head Tutor Applications"],
    ["Courses"],
    ["Lecturer CVs"],
    ["Course Outlines"],
    ["Teaching Materials"],
    ["Assessments"],
    ["Meeting Notes"],
    ["Internship & Thesis"],
  ].forEach((path) => getOrCreateNestedFolder(rootFolder, path));
}

function getSheet(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function getOrCreateNestedFolder(root, path) {
  return path.reduce((folder, name) => {
    const matches = folder.getFoldersByName(name);
    return matches.hasNext() ? matches.next() : folder.createFolder(name);
  }, root);
}

function writeDatasets(spreadsheet, datasets) {
  let count = 0;
  DATASET_TABS.forEach((tab) => {
    if (Array.isArray(datasets[tab])) {
      writeJsonRecords(getSheet(spreadsheet, tab), datasets[tab]);
      count += 1;
    }
  });
  return count;
}

function writeJsonRecords(sheet, records) {
  clearBody(sheet);
  if (!records.length) return;
  const now = new Date().toISOString();
  const values = records.map((record, index) => [
    record.id || record.code || record.application_id || String(index + 1),
    JSON.stringify(record),
    now,
  ]);
  sheet.getRange(2, 1, values.length, 3).setValues(values);
}

function readJsonRecords(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet
    .getRange(2, 1, lastRow - 1, 3)
    .getValues()
    .map((row) => {
      try {
        return JSON.parse(row[1] || "{}");
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

function writeDefaultCfaStatuses(spreadsheet) {
  const existing = readCfaStatuses(spreadsheet);
  const merged = Object.assign({}, MATHEPI.defaultCfaStatuses, existing);
  writeCfaStatuses(spreadsheet, merged);
}

function writeCfaStatuses(spreadsheet, statuses) {
  const rows = Object.keys(statuses || {}).map((id) => ({
    id,
    status: statuses[id] === "Open" ? "Open" : "Closed",
    updated_at: new Date().toISOString(),
  }));
  upsertRows(getSheet(spreadsheet, "CfaStatuses"), rows);
}

function readCfaStatuses(spreadsheet) {
  const sheet = getSheet(spreadsheet, "CfaStatuses");
  const lastRow = sheet.getLastRow();
  const statuses = Object.assign({}, MATHEPI.defaultCfaStatuses);
  if (lastRow < 2) return statuses;
  sheet.getRange(2, 1, lastRow - 1, 3).getValues().forEach((row) => {
    if (row[0]) statuses[row[0]] = row[1] === "Open" ? "Open" : "Closed";
  });
  return statuses;
}

function upsertRows(sheet, objects) {
  if (!objects || !objects.length) return;
  const headers = getHeaders(sheet);
  if (!headers.length) throw new Error("Sheet " + sheet.getName() + " is missing its header row.");
  const lastRow = sheet.getLastRow();
  const existing = {};
  if (lastRow >= 2) {
    sheet.getRange(2, 1, lastRow - 1, 1).getValues().forEach((row, index) => {
      existing[row[0]] = index + 2;
    });
  }
  objects.forEach((object) => {
    const key = object[headers[0]];
    const values = headers.map((header) => object[header] || "");
    if (key && existing[key]) sheet.getRange(existing[key], 1, 1, headers.length).setValues([values]);
    else sheet.appendRow(values);
  });
}

function appendRows(sheet, objects) {
  if (!objects || !objects.length) return;
  const headers = getHeaders(sheet);
  if (!headers.length) throw new Error("Sheet " + sheet.getName() + " is missing its header row.");
  objects.forEach((object) => sheet.appendRow(headers.map((header) => object[header] || "")));
}

function getHeaders(sheet) {
  const expected = TAB_HEADERS[sheet.getName()] || ["record_id"];
  if (sheet.getLastColumn() < 1) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    sheet.setFrozenRows(1);
    return expected.slice();
  }
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map((value, index) => {
    const header = String(value || "").trim();
    return header || "column_" + (index + 1);
  });
  if (!headers.some((header) => header.indexOf("column_") !== 0)) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    sheet.setFrozenRows(1);
    return expected.slice();
  }
  return headers;
}

function clearBody(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, lastColumn).clearContent();
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
