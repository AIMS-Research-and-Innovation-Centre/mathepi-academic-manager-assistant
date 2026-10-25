const MATHEPI = {
  spreadsheetName: "MathEpi Academic Operations",
  rootFolderName: "MathEpi Academic Operations",
  properties: {
    spreadsheetId: "MATHEPI_SPREADSHEET_ID",
    driveRootFolderId: "MATHEPI_DRIVE_ROOT_FOLDER_ID",
    calendarId: "MATHEPI_PROGRAMME_CALENDAR_ID",
  },
  calendarName: "MathEpi 2026-2027 Programme",
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
  "ItTickets",
  "TicketHistory",
  "Notifications",
];

const TAB_HEADERS = {
  AppState: ["key", "json", "updated_at"],
  CfaStatuses: ["id", "status", "updated_at"],
  TicketHistory: ["event_id", "ticket_id", "event", "actor_email", "detail", "created_at"],
  PiQuestions: ["id", "question", "audience", "asked_by", "asked_at", "status", "answer", "answered_by", "answered_at", "published"],
  Notifications: ["notification_id", "recipient_email", "recipient_role", "title", "message", "type", "ticket_id", "read", "created_at"],
  ItTickets: ["id", "ticketRef", "requester_email", "requesterId", "title", "category", "urgency", "status", "visibility", "assignedTo", "date", "summary", "affectedArea", "device", "resolutionSummary", "created_at", "updated_at"],
  LecturerApplications: [
    "application_id", "submitted_at", "recovery_status", "email", "title", "applicant",
    "gender", "affiliation", "designation", "address", "country_of_residence",
    "nationality", "dial_code", "phone", "phone_full", "whatsapp_registered",
    "whatsapp_contact_consent", "applying_with_contact", "contact_details",
    "highest_qualification", "awarding_institution", "year_awarded",
    "publication_count", "orcid", "google_scholar", "scopus_author_id",
    "research_areas", "first_host", "second_host", "selected_course_id",
    "selected_course_title", "course", "block", "availability",
    "course_plan_text", "course_plan_json", "taught_similar_course",
    "teaching_records_text", "teaching_records_json", "passport_file_name",
    "passport_drive_url", "additional_comments", "alumni", "alumni_centre",
    "alumni_program", "alumni_year", "heard_about_aims", "heard_other",
    "certified_true", "accepted_terms", "full_application_json",
  ],
  LecturerReviewDecisions: [
    "decision_id", "application_id", "email", "applicant", "course_id", "course_title",
    "decision", "notes", "decided_by", "updated_at",
  ],
  TutorialFellowApplications: [
    "application_id", "submitted_at", "title", "email", "applicant", "gender", "phone",
    "has_whatsapp", "contact_whatsapp", "nationality", "country_of_residence", "address",
    "affiliation", "designation", "phd_field", "phd_completion", "thesis_title_explainer",
    "research_area", "teaching_experience", "tutoring_experience", "mentoring_experience",
    "research_experience", "research_plan", "availability", "residence_ready", "teaching_gap_ready",
    "english_communication", "aims_alumni", "aims_centre", "aims_programme_year",
    "passport_file_name", "passport_drive_url", "phd_certificate_file_name", "phd_certificate_drive_url",
    "reference_1_json", "reference_2_json", "reference_3_json", "full_application_json",
  ],
  Reviewers: [
    "reviewer_email", "name", "role", "status", "assigned_call", "created_at", "updated_at",
  ],
  ReviewAssignments: [
    "assignment_id", "application_id", "reviewer_email", "call_id", "status", "created_at", "updated_at",
  ],
  ReviewScores: [
    "score_id", "application_id", "reviewer_email", "reviewer_name", "teaching_score",
    "research_score", "weighted_score", "eligibility_decision", "recommendation",
    "course_verdicts_json", "machine_score_json", "reason", "updated_at",
  ],
  ReviewAnalyses: [
    "analysis_id", "application_id", "applicant_code", "reviewer_email", "reviewer_name", "stage",
    "teaching_score", "research_score", "weighted_score", "score_details_json",
    "component_verdicts_json", "eligibility_text", "best_fit_text", "delivery_text",
    "teaching_text", "research_text", "kemri_aims_text", "gaps_text",
    "interview_questions_text", "general_comment", "analysis_json", "updated_at",
  ],
  ReviewNotes: [
    "note_id", "application_id", "author_email", "author_name", "stage", "note",
    "status", "created_at", "edited_at", "edited_by", "withdrawn_at",
  ],
  ReviewStages: ["application_id", "stage", "decision", "updated_by", "updated_at"],
  ReviewConfig: ["key", "json", "updated_at"],
  ReviewAudit: [
    "audit_id", "timestamp", "reviewer_email", "reviewer_name", "action",
    "application_id", "old_value_json", "new_value_json", "reason",
  ],
  CalendarSyncEvents: ["sync_key", "event_id", "fingerprint", "event_date", "updated_at"],
  DriveDocuments: ["document_id", "type", "related_id", "file_name", "drive_file_id", "url", "created_at"],
};

DATASET_TABS.forEach((tab) => {
  TAB_HEADERS[tab] = ["record_id", "json", "updated_at"];
});

function doGet(e) {
  try {
    const action = e && e.parameter && e.parameter.action;
    if (action) {
      throw new Error("API actions must use POST. Sensitive payloads and session tokens are not accepted in URLs.");
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

function apiPost(request) {
  const action = request && request.action;
  const payload = (request && request.payload) || {};
  authorizePortalAction_(action, payload);
  if (action === "createItTicket") return createItTicket(payload);
  if (action === "listItTickets") return listItTickets(payload);
  if (action === "updateItTicket") return updateItTicket(payload);
  if (action === "listNotifications") return listNotifications(payload);
  if (action === "markNotificationRead") return markNotificationRead(payload);
  if (action === "piSubmitQuestion") return piSubmitQuestion(payload);
  if (action === "piListQuestions") return piListQuestions(payload);
  if (action === "piAnswerQuestion") return piAnswerQuestion(payload);
  if (action === "piListFaq") return piListFaq(payload);
  if (action === "setupWorkspace") return setupWorkspace(payload);
  if (action === "saveSnapshot") return saveSnapshot(payload);
  if (action === "getBootstrap") return getBootstrap(payload);
  if (action === "syncProgrammeCalendar") return syncProgrammeCalendar(payload);
  if (action === "getProgrammeCalendarStatus") return getProgrammeCalendarStatus();
  if (action === "updateCfaStatus") return updateCfaStatus(payload);
  if (action === "getCfaStatus") return getCfaStatus(payload);
  if (action === "diagnoseEmailOtp") return diagnoseEmailOtp(payload);
  if (action === "requestEmailOtp") return requestEmailOtp(payload);
  if (action === "verifyEmailOtp") return verifyEmailOtp(payload);
  if (action === "requestPortalAccessOtp") return requestPortalAccessOtp(payload);
  if (action === "verifyPortalAccessOtp") return verifyPortalAccessOtp(payload);
  if (action === "establishGooglePortalAccess") return establishGooglePortalAccess(payload);
  if (action === "getPortalAccessSession") return getPortalAccessSession(payload);
  if (action === "revokePortalSession") return revokePortalSession(payload);
  if (action === "listPortalAccessRequests") return listPortalAccessRequests(payload);
  if (action === "decidePortalAccess") return decidePortalAccess(payload);
  if (action === "listPortalAccessUsers") return listPortalAccessUsers(payload);
  if (action === "updatePortalUserAccess") return updatePortalUserAccess(payload);
  if (action === "requestReviewerOtp") return requestReviewerOtp(payload);
  if (action === "verifyReviewerOtp") return verifyReviewerOtp(payload);
  if (action === "getReviewerSession") return getReviewerSession(payload);
  if (action === "listReviewApplicants") return listReviewApplicants(payload);
  if (action === "saveReviewScore") return saveReviewScore(payload);
  if (action === "saveReviewAnalysis") return saveReviewAnalysis(payload);
  if (action === "submitPanelReview") return submitPanelReview(payload);
  if (action === "saveReviewNote") return saveReviewNote(payload);
  if (action === "withdrawReviewNote") return withdrawReviewNote(payload);
  if (action === "updateReviewStage") return updateReviewStage(payload);
  if (action === "saveEligibilityDecision") return saveEligibilityDecision(payload);
  if (action === "exportReviewAudit") return exportReviewAudit(payload);
  if (action === "listLecturerReviewData") return listLecturerReviewData(payload);
  if (action === "listReviewStaffingAssignments") return listReviewStaffingAssignments(payload);
  if (action === "saveLecturerReviewDecision") return saveLecturerReviewDecision(payload);
  if (action === "submitLecturerApplication") return submitLecturerApplication(payload);
  if (action === "recoverLecturerApplication") return recoverLecturerApplication(payload);
  if (action === "backfillLecturerApplicationColumns") return backfillLecturerApplicationColumns(payload);
  if (action === "submitTutorialFellowApplication") return submitTutorialFellowApplication(payload);
  throw new Error("Unknown action: " + action);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
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
  const calendarSync = getProgrammeCalendarStatus();
  return {
    ok: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    spreadsheetUrl: spreadsheet.getUrl(),
    driveRootFolderId: rootFolder.getId(),
    driveRootUrl: rootFolder.getUrl(),
    tabsUpdated,
    calendarSync,
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
  const calendarSync = getProgrammeCalendarStatus();
  return { ok: true, tabsUpdated, spreadsheetUrl: spreadsheet.getUrl(), driveRootUrl: rootFolder.getUrl(), calendarSync };
}

function getBootstrap(payload) {
  const context = requirePermission_(payload && payload.token, "workspace.read");
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const datasets = roleFilteredBootstrap_(spreadsheet, context);
  const snapshots = readSheetObjects(getSheet(spreadsheet, "AppState"));
  const latest = snapshots.filter(function (row) { return row.key === "latest_snapshot"; })[0];
  let viewPermissions = null;
  if (portalHasPermission_(context, "workspace.write")) {
    try { viewPermissions = latest && latest.json ? JSON.parse(latest.json).viewPermissions || null : null; } catch (error) {}
  }
  return {
    ok: true,
    datasets,
    cfaStatuses: readCfaStatuses(spreadsheet),
    viewPermissions: viewPermissions,
    allowedViews: portalAllowedViewsForRoles_(context.roles),
    permissions: portalPermissionsForRoles_(context.roles),
    spreadsheetId: portalHasPermission_(context, "workspace.write") ? spreadsheet.getId() : "",
    spreadsheetUrl: portalHasPermission_(context, "workspace.write") ? spreadsheet.getUrl() : "",
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

function submitLecturerApplication(payload) {
  return saveLecturerApplication_(payload || {}, false);
}

function recoverLecturerApplication(payload) {
  return saveLecturerApplication_(payload || {}, true);
}

function listLecturerReviewData(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applications = readSheetObjects(getSheet(spreadsheet, "LecturerApplications")).filter((row) => {
    return row.application_id || row.email || row.applicant || row.course || row.selected_course_id;
  });
  return {
    ok: true,
    applications,
    decisions: readSheetObjects(getSheet(spreadsheet, "LecturerReviewDecisions")),
    courses: readJsonRecords(getSheet(spreadsheet, "Courses")),
    blocks: readJsonRecords(getSheet(spreadsheet, "CalendarBlocks")),
    cfaStatuses: readCfaStatuses(spreadsheet),
    syncedAt: new Date().toISOString(),
  };
}

function listReviewStaffingAssignments(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const lecturerAssignments = readSheetObjects(getSheet(spreadsheet, "LecturerReviewDecisions"))
    .filter((row) => ["Approved", "Consider"].indexOf(normalizeLecturerReviewDecision_(row.decision)) >= 0)
    .map((row) => ({
      applicationId: String(row.application_id || ""),
      name: String(row.applicant || "").trim(),
      courseCode: String(row.course_id || "").trim().toUpperCase(),
      role: "Lecturer",
      status: normalizeLecturerReviewDecision_(row.decision),
      updatedAt: String(row.updated_at || ""),
    }))
    .filter((row) => row.name && row.courseCode);

  const applicationById = {};
  readSheetObjects(getSheet(spreadsheet, "TutorialFellowApplications")).forEach((row) => {
    applicationById[String(row.application_id || "")] = row;
  });
  const decisionIds = {};
  readSheetObjects(getSheet(spreadsheet, "ReviewStages")).forEach((row) => {
    if (String(row.stage || "").trim() === "Decision" && !/reject|do not/i.test(String(row.decision || ""))) decisionIds[String(row.application_id || "")] = row;
  });
  const latestScores = {};
  readSheetObjects(getSheet(spreadsheet, "ReviewScores")).forEach((row) => {
    const id = String(row.application_id || "");
    if (decisionIds[id] && (!latestScores[id] || String(row.updated_at || "") > String(latestScores[id].updated_at || ""))) latestScores[id] = row;
  });
  const tutorAssignments = [];
  Object.keys(latestScores).forEach((applicationId) => {
    const score = latestScores[applicationId];
    if (/do not progress|reject/i.test(String(score.eligibility_decision || score.recommendation || ""))) return;
    const verdicts = parseJsonSafe(score.course_verdicts_json, {});
    const application = applicationById[applicationId] || {};
    Object.keys(verdicts || {}).forEach((courseCode) => {
      if (verdicts[courseCode] !== "Can tutor" && verdicts[courseCode] !== "Can lecture") return;
      tutorAssignments.push({ applicationId, name: String(application.applicant || "").trim(), courseCode: String(courseCode || "").trim().toUpperCase(), role: "Tutor", status: "Decision", updatedAt: String(score.updated_at || decisionIds[applicationId].updated_at || "") });
    });
  });
  return { ok: true, lecturerAssignments, tutorAssignments, syncedAt: new Date().toISOString() };
}

function saveLecturerReviewDecision(payload) {
  payload = payload || {};
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  const email = String(payload.email || "").trim();
  const courseId = String(payload.courseId || "").trim();
  if (!applicationId && !email) throw new Error("Application id or applicant email is required.");
  if (!courseId) throw new Error("Course id is required.");
  const decision = normalizeLecturerReviewDecision_(payload.decision);
  const row = {
    decision_id: lecturerReviewDecisionId_(applicationId, email, courseId),
    application_id: applicationId,
    email,
    applicant: String(payload.applicant || "").trim(),
    course_id: courseId,
    course_title: String(payload.courseTitle || "").trim(),
    decision,
    notes: String(payload.notes || "").trim(),
    decided_by: String(payload.decidedBy || "").trim(),
    updated_at: new Date().toISOString(),
  };
  upsertRows(getSheet(spreadsheet, "LecturerReviewDecisions"), [row]);
  return { ok: true, decision: row };
}

function normalizeLecturerReviewDecision_(value) {
  const text = String(value || "").trim().toLowerCase();
  if (text === "approved" || text === "approve") return "Approved";
  if (text === "rejected" || text === "reject") return "Rejected";
  if (text === "consider") return "Consider";
  return "Pending";
}

function lecturerReviewDecisionId_(applicationId, email, courseId) {
  return [applicationId || email, courseId].map((part) => String(part || "").trim().toLowerCase()).join("::");
}

function saveLecturerApplication_(payload, recovered) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);

  const application = payload.application || {};
  requireEmailVerification(payload.emailVerification, application.email, "lecturer");
  const submittedAt = application.submittedAt || new Date().toISOString();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error("Another application is being processed. Please wait a moment and try again.");
  try {
  const duplicate = findDuplicateLecturerApplication_(spreadsheet, application);
  if (duplicate) {
    return {
      ok: true,
      success: true,
      alreadyExists: true,
      recovered: !!recovered,
      applicationId: duplicate.application_id || "",
      driveUrl: duplicate.passport_drive_url || "",
      driveFileUrl: duplicate.passport_drive_url || "",
      sheetRow: duplicate.sheetRow || "",
    };
  }

  const passport = payload.passportFile;
  if (!passport || !passport.dataBase64) {
    throw new Error("Passport biodata page upload is required before the lecturer application can be received by AIMS.");
  }

  const applicationId = makeLecturerApplicationReference_(submittedAt);
  const folder = getOrCreateNestedFolder(rootFolder, ["CFA", "Lecturer Applications", applicationId]);
  const validatedPassport = validateApplicationFile_(passport, {
    label: "Passport biodata page",
    required: true,
    maxBytes: 5 * 1024 * 1024,
    allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png"],
  });
  const blob = Utilities.newBlob(validatedPassport.bytes, validatedPassport.mimeType, applicationId + "-passport" + validatedPassport.extension);
  const file = folder.createFile(blob);
  const driveFileUrl = file.getUrl();
  const driveFileId = file.getId();

  appendRows(getSheet(spreadsheet, "DriveDocuments"), [
    {
      document_id: Utilities.getUuid(),
      type: "Lecturer passport biodata page",
      related_id: applicationId,
      file_name: validatedPassport.safeName,
      drive_file_id: driveFileId,
      url: driveFileUrl,
      created_at: submittedAt,
    },
  ]);

  const sheet = getSheet(spreadsheet, "LecturerApplications");
  const row = lecturerApplicationRow_(payload, application, passport, {
    applicationId,
    submittedAt,
    recovered,
    driveFileUrl,
  });
  const sheetRow = appendLecturerApplicationRow_(sheet, row);

  return {
    ok: true,
    success: true,
    alreadyExists: false,
    recovered: !!recovered,
    applicationId,
    driveUrl: driveFileUrl,
    driveFileUrl,
    driveFileId,
    sheetRow,
  };
  } finally {
    lock.releaseLock();
  }
}

function appendLecturerApplicationRow_(sheet, row) {
  const headers = getHeaders(sheet);
  if (!headers.length) throw new Error("LecturerApplications is missing its header row.");
  sheet.appendRow(headers.map((header) => safeSheetValue_(row[header])));
  return sheet.getLastRow();
}

function lecturerApplicationRow_(payload, application, passport, saved) {
  const state = payload.state || {};
  const lecturer = state.lecturer || {};
  const academic = state.academic || {};
  const host = state.host || {};
  const selection = state.selection || {};
  const plan = state.plan || {};
  const experience = state.experience || {};
  const confirm = state.confirm || {};
  const courseParts = splitLecturerCourse_(application.course || selection.courseId || "");
  const planRows = Array.isArray(plan.rows) ? plan.rows : [];
  const teachingRows = Array.isArray(experience.items) ? experience.items : [];
  const heard = Array.isArray(confirm.heard) ? confirm.heard.join("; ") : String(confirm.heard || "");
  const phone = lecturer.phone || application.phone || "";
  const dialCode = lecturer.dialCode || "";
  return {
    application_id: saved.applicationId,
    submitted_at: saved.submittedAt,
    recovery_status: saved.recovered ? "Recovered" : "Submitted",
    email: application.email || state.email || "",
    title: lecturer.title || "",
    applicant: application.applicant || [lecturer.title, lecturer.name].filter(Boolean).join(" "),
    gender: lecturer.gender || "",
    affiliation: application.affiliation || lecturer.affiliation || "",
    designation: application.designation || lecturer.designation || "",
    address: lecturer.address || "",
    country_of_residence: lecturer.countryResidence || "",
    nationality: lecturer.nationality || "",
    dial_code: dialCode,
    phone,
    phone_full: [dialCode, phone].filter(Boolean).join(" "),
    whatsapp_registered: lecturer.whatsapp || "",
    whatsapp_contact_consent: lecturer.whatsappConsent || "",
    applying_with_contact: lecturer.coLecturer || "",
    contact_details: lecturer.coDetails || "",
    highest_qualification: academic.highest || "",
    awarding_institution: academic.institution || "",
    year_awarded: academic.year || "",
    publication_count: academic.publicationCount || "",
    orcid: academic.orcid || "",
    google_scholar: academic.scholar || "",
    scopus_author_id: academic.scopus || "",
    research_areas: academic.researchAreas || "",
    first_host: application.firstHost || host.firstHost || "",
    second_host: application.secondHost || host.secondHost || "",
    selected_course_id: courseParts.id,
    selected_course_title: courseParts.title,
    course: application.course || selection.courseId || "",
    block: application.block || "",
    availability: application.availability || lecturerApplicationAvailability_(selection, application),
    course_plan_text: lecturerPlanText_(planRows),
    course_plan_json: JSON.stringify(planRows),
    taught_similar_course: experience.taught || "",
    teaching_records_text: lecturerTeachingRecordsText_(teachingRows),
    teaching_records_json: JSON.stringify(teachingRows),
    passport_file_name: passport.name || application.passport || "",
    passport_drive_url: saved.driveFileUrl || "",
    additional_comments: confirm.comments || "",
    alumni: application.alumni || confirm.alumni || "",
    alumni_centre: confirm.alumniCentre || "",
    alumni_program: confirm.alumniProgram || "",
    alumni_year: confirm.alumniYear || "",
    heard_about_aims: heard,
    heard_other: confirm.heardOther || "",
    certified_true: lecturerYesNo_(confirm.certify),
    accepted_terms: lecturerYesNo_(confirm.terms),
    full_application_json: JSON.stringify(state),
  };
}

function lecturerApplicationAvailability_(selection, application) {
  if (application.availability) return application.availability;
  const availability = selection && selection.availability;
  if (!availability || typeof availability !== "object") return "";
  const keys = Object.keys(availability);
  return keys.length ? availability[keys[0]] : "";
}

function splitLecturerCourse_(value) {
  const text = String(value || "");
  const match = text.match(/^([A-Z]{2,4}\d{1,3})\s*-\s*(.+)$/);
  return { id: match ? match[1] : text, title: match ? match[2] : "" };
}

function lecturerPlanText_(rows) {
  if (!rows || !rows.length) return "";
  return rows.map((row, index) => {
    row = Array.isArray(row) ? row : [];
    return [
      "Module " + (index + 1) + ": " + (row[0] || ""),
      "Topic / focus: " + (row[1] || ""),
      "Learning objectives: " + (row[2] || ""),
      "Practical activities: " + (row[3] || ""),
      "Assessment strategy / notes: " + (row[4] || ""),
    ].join("\n");
  }).join("\n\n");
}

function lecturerTeachingRecordsText_(items) {
  if (!items || !items.length) return "";
  return items.map((item, index) => [
    "Record " + (index + 1) + ": " + (item.courseTitle || ""),
    "Institution: " + (item.institution || ""),
    "Level: " + (item.level || ""),
    "Year: " + (item.year || ""),
    "Mode: " + (item.mode || ""),
    "Times delivered: " + (item.times || ""),
  ].join("\n")).join("\n\n");
}

function lecturerYesNo_(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return String(value || "");
}

function backfillLecturerApplicationColumns() {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const sheet = getSheet(spreadsheet, "LecturerApplications");
  ensureSheetHeaders(sheet, TAB_HEADERS.LecturerApplications);
  const headers = getHeaders(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { ok: true, updatedRows: 0 };
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  let updatedRows = 0;
  const updated = values.map((rowValues) => {
    const existing = {};
    headers.forEach((header, index) => {
      existing[header] = rowValues[index];
    });
    const state = parseLecturerJsonSafe_(existing.full_application_json, {});
    const lecturer = state.lecturer || {};
    const application = {
      email: existing.email || state.email || "",
      applicant: existing.applicant || [lecturer.title, lecturer.name].filter(Boolean).join(" "),
      affiliation: existing.affiliation || lecturer.affiliation || "",
      designation: existing.designation || lecturer.designation || "",
      firstHost: existing.first_host || (state.host && state.host.firstHost) || "",
      secondHost: existing.second_host || (state.host && state.host.secondHost) || "",
      course: existing.course || (state.selection && state.selection.courseId) || "",
      block: existing.block || "",
      availability: existing.availability || "",
      passport: existing.passport_file_name || "",
      alumni: existing.alumni || (state.confirm && state.confirm.alumni) || "",
    };
    const enriched = lecturerApplicationRow_(
      { state },
      application,
      { name: existing.passport_file_name || "" },
      {
        applicationId: existing.application_id || "",
        submittedAt: existing.submitted_at || "",
        recovered: String(existing.recovery_status || "").toLowerCase() === "recovered",
        driveFileUrl: existing.passport_drive_url || "",
      },
    );
    const next = headers.map((header) => {
      const value = enriched[header];
      return value === undefined || value === "" ? existing[header] || "" : value;
    });
    if (JSON.stringify(next) !== JSON.stringify(rowValues)) updatedRows += 1;
    return next;
  });
  sheet.getRange(2, 1, updated.length, headers.length).setValues(updated);
  return { ok: true, updatedRows };
}

function parseLecturerJsonSafe_(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function findDuplicateLecturerApplication_(spreadsheet, application) {
  const email = normalizeLecturerDuplicateValue_(application.email);
  const course = normalizeLecturerDuplicateValue_(application.course);
  const submittedAt = normalizeLecturerDuplicateValue_(application.submittedAt);
  if (!email || !course || !submittedAt) return null;
  const sheet = getSheet(spreadsheet, "LecturerApplications");
  const headers = getHeaders(sheet);
  if (!headers.length || sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  for (let i = 0; i < rows.length; i += 1) {
    const object = { sheetRow: i + 2 };
    headers.forEach((header, index) => {
      object[header] = rows[i][index];
    });
    if (
      normalizeLecturerDuplicateValue_(object.email) === email &&
      normalizeLecturerDuplicateValue_(object.course) === course &&
      normalizeLecturerDuplicateValue_(object.submitted_at) === submittedAt
    ) {
      return object;
    }
  }
  return null;
}

function normalizeLecturerDuplicateValue_(value) {
  return String(value || "").trim().toLowerCase();
}

function makeLecturerApplicationReference_(submittedAt) {
  const date = new Date(submittedAt || new Date().toISOString());
  const year = Number.isFinite(date.getTime()) ? date.getFullYear() : new Date().getFullYear();
  const number = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return "MATHEPI-" + year + "-" + number;
}

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(MATHEPI.properties.spreadsheetId);
  if (existingId) {
    try {
      return openSpreadsheetWithRetry_(existingId);
    } catch (e) {
      if (!isMissingGoogleFileError_(e)) throw e;
      props.deleteProperty(MATHEPI.properties.spreadsheetId);
    }
  }
  const rootFolder = getOrCreateRootFolder();
  const spreadsheet = SpreadsheetApp.create(MATHEPI.spreadsheetName);
  try {
    DriveApp.getFileById(spreadsheet.getId()).moveTo(rootFolder);
  } catch (moveError) {}
  props.setProperty(MATHEPI.properties.spreadsheetId, spreadsheet.getId());
  return spreadsheet;
}

function openSpreadsheetWithRetry_(spreadsheetId) {
  let lastError = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      spreadsheet.getName();
      return spreadsheet;
    } catch (error) {
      lastError = error;
      if (isMissingGoogleFileError_(error)) throw error;
      if (attempt < 2) Utilities.sleep(1500 * (attempt + 1));
    }
  }
  throw new Error("Google Drive temporarily timed out while opening the MathEpi spreadsheet. Wait 30 seconds and run the function again. Original error: " + (lastError && lastError.message ? lastError.message : lastError));
}

function isMissingGoogleFileError_(error) {
  return /not found|does not exist|invalid argument|permission|access denied/i.test(String(error && error.message ? error.message : error));
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
    const values = headers.map((header) => safeSheetValue_(object[header]));
    if (key && existing[key]) sheet.getRange(existing[key], 1, 1, headers.length).setValues([values]);
    else sheet.appendRow(values);
  });
}

function appendRows(sheet, objects) {
  if (!objects || !objects.length) return;
  const headers = getHeaders(sheet);
  if (!headers.length) throw new Error("Sheet " + sheet.getName() + " is missing its header row.");
  objects.forEach((object) => sheet.appendRow(headers.map((header) => safeSheetValue_(object[header]))));
}

function safeSheetValue_(value) {
  if (value === null || value === undefined) return "";
  if (typeof value !== "string") return value;
  // Google Sheets treats these prefixes as formulas, even when the value came
  // from an application or reviewer text field.
  return /^[\s\u0000-\u001f]*[=+\-@]/.test(value) ? "'" + value : value;
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

function submitTutorialFellowApplication(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  const rootFolder = getOrCreateRootFolder();
  ensureSheets(spreadsheet);
  ensureDriveFolders(rootFolder);

  const application = payload.application || {};
  requireEmailVerification(payload.emailVerification, application.email, "tutorial-fellow");
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error("Another application is being processed. Please wait a moment and try again.");
  try {
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

  return { ok: true, success: true, applicationId, passportDriveUrl: passport.url || "", phdCertificateDriveUrl: phdCertificate.url || "" };
  } finally {
    lock.releaseLock();
  }
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
  const isCertificate = /certificate/i.test(type);
  const validated = validateApplicationFile_(filePayload, {
    label: type,
    required: false,
    maxBytes: 5 * 1024 * 1024,
    allowedMimeTypes: isCertificate ? ["application/pdf"] : ["application/pdf", "image/jpeg", "image/png"],
  });
  const blob = Utilities.newBlob(validated.bytes, validated.mimeType, applicationId + (isCertificate ? "-phd-certificate" : "-passport") + validated.extension);
  const file = folder.createFile(blob);
  appendRows(getSheet(spreadsheet, "DriveDocuments"), [
    {
      document_id: Utilities.getUuid(),
      type,
      related_id: applicationId,
      file_name: validated.safeName,
      drive_file_id: file.getId(),
      url: file.getUrl(),
      created_at: submittedAt,
    },
  ]);
  return { id: file.getId(), url: file.getUrl() };
}

function validateApplicationFile_(filePayload, options) {
  options = options || {};
  const label = String(options.label || "Application file");
  if (!filePayload || !filePayload.dataBase64) {
    if (options.required) throw new Error(label + " is required.");
    return null;
  }
  const base64 = String(filePayload.dataBase64 || "").replace(/\s/g, "");
  const maxBytes = Number(options.maxBytes || 5 * 1024 * 1024);
  if (!base64 || base64.length > Math.ceil(maxBytes * 4 / 3) + 8) throw new Error(label + " must be 5 MB or smaller.");
  let bytes;
  try { bytes = Utilities.base64Decode(base64); } catch (error) { throw new Error(label + " is not a valid encoded file."); }
  if (!bytes.length || bytes.length > maxBytes) throw new Error(label + " must be 5 MB or smaller.");

  const unsigned = bytes.slice(0, 8).map(function (value) { return value < 0 ? value + 256 : value; });
  const isPdf = unsigned[0] === 0x25 && unsigned[1] === 0x50 && unsigned[2] === 0x44 && unsigned[3] === 0x46 && unsigned[4] === 0x2d;
  const isJpeg = unsigned[0] === 0xff && unsigned[1] === 0xd8 && unsigned[2] === 0xff;
  const isPng = unsigned[0] === 0x89 && unsigned[1] === 0x50 && unsigned[2] === 0x4e && unsigned[3] === 0x47 && unsigned[4] === 0x0d && unsigned[5] === 0x0a && unsigned[6] === 0x1a && unsigned[7] === 0x0a;
  const detectedMime = isPdf ? "application/pdf" : isJpeg ? "image/jpeg" : isPng ? "image/png" : "";
  if (!detectedMime || (options.allowedMimeTypes || []).indexOf(detectedMime) < 0) throw new Error(label + " must be an allowed PDF, JPEG, or PNG file.");
  const extension = detectedMime === "application/pdf" ? ".pdf" : detectedMime === "image/png" ? ".png" : ".jpg";
  const originalName = String(filePayload.name || label).replace(/[\r\n]/g, " ").slice(0, 180);
  return { bytes: bytes, mimeType: detectedMime, extension: extension, safeName: originalName };
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
    subject: "Your MathEpi application verification code",
    body: "Your MathEpi application verification code is: " + code + "\n\nThis code expires in 10 minutes. If you did not request it, you can ignore this email.",
    name: "MathEpi Academic Operations",
    noReply: true,
    htmlBody:
      "<p>Your MathEpi application verification code is:</p>" +
      "<p style=\"font-size:24px;font-weight:700;letter-spacing:3px;\">" + code + "</p>" +
      "<p>This code expires in 10 minutes. If you did not request it, you can ignore this email.</p>",
  });
  return "MailApp";
}

function requestEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const cache = CacheService.getScriptCache();
    const rateKey = emailOtpCacheKey("rate", purpose, email);
    const requestLock = LockService.getScriptLock();
    if (!requestLock.tryLock(5000)) {
      return { ok: false, error: "An OTP request is already being processed. Please wait 30 seconds." };
    }
    try {
      if (cache.get(rateKey)) {
        return { ok: false, error: "Please wait 30 seconds before requesting another code." };
      }
      cache.put(rateKey, "pending", 30);
    } finally {
      requestLock.releaseLock();
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

    let senderMode;
    try {
      senderMode = sendEmailOtpMessage(email, code);
    } catch (sendError) {
      cache.remove(rateKey);
      throw sendError;
    }
    cache.put(emailOtpCacheKey("challenge", purpose, email), JSON.stringify(challenge), expiresInSeconds);
    cache.put(rateKey, "sent", 30);
    return {
      ok: true,
      email,
      expiresInSeconds,
      remainingDailyQuota: Math.max(0, remainingDailyQuota - 1),
      senderMode,
      deliveryHint: "OTP sent. Check your inbox and spam folder.",
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
  const visibleIds = {};
  visibleApplications.forEach(function (application) { visibleIds[application.applicationId] = true; });
  const filterVisible = function (rows) { return reviewerCanManage(reviewer) ? rows : rows.filter(function (row) { return !!visibleIds[row.application_id]; }); };
  return {
    ok: true,
    reviewer,
    applications: visibleApplications,
    scores: filterVisible(readReviewSheetObjects(spreadsheet, "ReviewScores")),
    analyses: filterVisible(readReviewSheetObjects(spreadsheet, "ReviewAnalyses")),
    notes: filterVisible(readReviewSheetObjects(spreadsheet, "ReviewNotes")),
    stages: filterVisible(readReviewSheetObjects(spreadsheet, "ReviewStages")),
    assignments: reviewerCanManage(reviewer) ? assignments : assignments.filter(function (row) {
      const email = row.reviewer_email || row.email;
      return email && normalizeEmailAddress(email) === reviewer.email;
    }),
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
  requireReviewerApplicationAccess_(spreadsheet, reviewer, applicationId);
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
  requireReviewerApplicationAccess_(spreadsheet, reviewer, applicationId);
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

function submitPanelReview(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  requireReviewerApplicationAccess_(spreadsheet, reviewer, applicationId);
  const reason = String(payload.reason || "").trim();
  if (!reason) throw new Error("A reason is required before submitting a review.");
  const now = new Date().toISOString();
  const auditRows = [];

  const scoreId = applicationId + "::" + reviewer.email;
  const scoreSheet = getSheet(spreadsheet, "ReviewScores");
  const beforeScore = findSheetObject(scoreSheet, scoreId);
  const teaching = clampScore(payload.teachingScore);
  const research = clampScore(payload.researchScore);
  const scoreRow = {
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
    updated_at: now,
  };
  upsertRows(scoreSheet, [scoreRow]);
  auditRows.push({
    audit_id: Utilities.getUuid(),
    timestamp: now,
    reviewer_email: reviewer.email,
    reviewer_name: reviewer.name || reviewer.email,
    action: "saveReviewScore",
    application_id: applicationId,
    old_value_json: JSON.stringify(beforeScore || {}),
    new_value_json: JSON.stringify(scoreRow),
    reason,
  });

  const noteText = String(payload.note || "").trim();
  if (!noteText) throw new Error("A note cannot be empty.");
  const noteSheet = getSheet(spreadsheet, "ReviewNotes");
  const noteId = String(payload.noteId || applicationId + "::" + reviewer.email + "::panel-note");
  const beforeNote = findSheetObject(noteSheet, noteId);
  const beforeAuthorEmail = beforeNote && beforeNote.author_email ? normalizeEmailAddress(beforeNote.author_email) : "";
  const beforeAuthorName = String(beforeNote && beforeNote.author_name || "");
  if (
    beforeNote &&
    !reviewerCanManage(reviewer) &&
    ((beforeAuthorEmail && beforeAuthorEmail !== reviewer.email) || (!beforeAuthorEmail && beforeAuthorName && beforeAuthorName !== reviewer.name))
  ) {
    throw new Error("Only the author or a review manager can edit this note.");
  }
  const noteRow = Object.assign(
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
    beforeNote || {},
    {
      note: noteText,
      edited_at: beforeNote ? now : "",
      edited_by: beforeNote ? reviewer.email : "",
    },
  );
  upsertRows(noteSheet, [noteRow]);
  auditRows.push({
    audit_id: Utilities.getUuid(),
    timestamp: now,
    reviewer_email: reviewer.email,
    reviewer_name: reviewer.name || reviewer.email,
    action: beforeNote ? "editReviewNote" : "saveReviewNote",
    application_id: applicationId,
    old_value_json: JSON.stringify(beforeNote || {}),
    new_value_json: JSON.stringify(noteRow),
    reason: "",
  });

  const formalStage = String(payload.formalStage || payload.stageToMove || "").trim();
  let stageRow = null;
  if (formalStage) {
    if (!reviewerCanManage(reviewer)) throw new Error("Only Cecil or a review manager can update the formal review stage.");
    const stageSheet = getSheet(spreadsheet, "ReviewStages");
    const beforeStage = findSheetObject(stageSheet, applicationId);
    stageRow = {
      application_id: applicationId,
      stage: reviewStageLabel(formalStage),
      decision: String(payload.decision || ""),
      updated_by: reviewer.email,
      updated_at: now,
    };
    upsertRows(stageSheet, [stageRow]);
    auditRows.push({
      audit_id: Utilities.getUuid(),
      timestamp: now,
      reviewer_email: reviewer.email,
      reviewer_name: reviewer.name || reviewer.email,
      action: "updateReviewStage",
      application_id: applicationId,
      old_value_json: JSON.stringify(beforeStage || {}),
      new_value_json: JSON.stringify(stageRow),
      reason: String(payload.stageReason || "Review manager submitted review and moved official stage to " + formalStage + "."),
    });
  }
  appendRows(getSheet(spreadsheet, "ReviewAudit"), auditRows);
  return {
    ok: true,
    score: scoreRow,
    note: noteRow,
    stage: stageRow,
  };
}

function saveReviewNote(payload) {
  payload = payload || {};
  const reviewer = requireReviewerSession(payload);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const applicationId = String(payload.applicationId || "").trim();
  const noteText = String(payload.note || "").trim();
  if (!applicationId) throw new Error("Application id is required.");
  requireReviewerApplicationAccess_(spreadsheet, reviewer, applicationId);
  if (!noteText) throw new Error("A note cannot be empty.");
  const sheet = getSheet(spreadsheet, "ReviewNotes");
  const noteId = String(payload.noteId || Utilities.getUuid());
  const before = findSheetObject(sheet, noteId);
  const beforeAuthorEmail = before && before.author_email ? normalizeEmailAddress(before.author_email) : "";
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
  requireReviewerApplicationAccess_(spreadsheet, reviewer, before.application_id);
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
  const reviewer = findReviewerInSpreadsheet_(spreadsheet, target);
  if (reviewer) return reviewer;

  const discovered = findReviewerInNamedSpreadsheet_(target, spreadsheet.getId());
  if (discovered) return discovered.reviewer;

  return null;
}

function findReviewerInSpreadsheet_(spreadsheet, target) {
  try {
    return readReviewSheetObjects(spreadsheet, "Reviewers").find((row) => {
      const rowEmail = row.reviewer_email || row.email;
      return rowEmail && normalizeEmailAddress(rowEmail) === target;
    }) || null;
  } catch (error) {
    return null;
  }
}

function findReviewerInNamedSpreadsheet_(target, currentSpreadsheetId) {
  const files = DriveApp.getFilesByName(MATHEPI.spreadsheetName);
  while (files.hasNext()) {
    const file = files.next();
    if (String(file.getId()) === String(currentSpreadsheetId)) continue;
    if (file.getMimeType && file.getMimeType() !== MimeType.GOOGLE_SHEETS) continue;
    try {
      const spreadsheet = SpreadsheetApp.openById(file.getId());
      const reviewer = findReviewerInSpreadsheet_(spreadsheet, target);
      if (reviewer) {
        PropertiesService.getScriptProperties().setProperty(MATHEPI.properties.spreadsheetId, spreadsheet.getId());
        return { spreadsheet, reviewer };
      }
    } catch (error) {}
  }
  return null;
}

function reviewerCanManage(reviewer) {
  const role = String(reviewer && reviewer.role || "").toLowerCase();
  return role === "academic manager" ||
    role === "review manager" ||
    role === "manager" ||
    role === "admin" ||
    role === "super admin" ||
    role === "chair";
}

function requireReviewerApplicationAccess_(spreadsheet, reviewer, applicationId) {
  const applications = readTutorialReviewApplications(spreadsheet);
  if (!applications.some(function (application) { return application.applicationId === applicationId; })) throw new Error("Application not found.");
  if (reviewerCanManage(reviewer)) return true;
  const assignments = readReviewSheetObjects(spreadsheet, "ReviewAssignments");
  const visible = filterReviewApplicationsForReviewer(applications, assignments, reviewer);
  if (!visible.some(function (application) { return application.applicationId === applicationId; })) throw new Error("You are not assigned to review this application.");
  return true;
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

const PROGRAMME_CALENDAR_TRIGGER = "syncProgrammeCalendarFromSheets";
const PROGRAMME_CALENDAR_TIMEZONE = "Africa/Kigali";

function syncProgrammeCalendar(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  if (payload && payload.datasets) writeDatasets(spreadsheet, payload.datasets);
  return syncProgrammeCalendarData(payload && payload.datasets, spreadsheet);
}

function syncProgrammeCalendarFromSheets() {
  return syncProgrammeCalendarData(null, getOrCreateSpreadsheet());
}

function tryProgrammeCalendarSync(payload, spreadsheet) {
  try {
    return syncProgrammeCalendarData(payload && payload.datasets, spreadsheet);
  } catch (error) {
    return { ok: false, error: error && error.message ? error.message : String(error) };
  }
}

function getProgrammeCalendarStatus() {
  const props = PropertiesService.getScriptProperties();
  const calendarId = props.getProperty(MATHEPI.properties.calendarId) || "";
  const calendar = calendarId ? CalendarApp.getCalendarById(calendarId) : null;
  return {
    ok: true,
    connected: !!calendar,
    calendarId: calendar ? calendar.getId() : "",
    calendarName: calendar ? calendar.getName() : MATHEPI.calendarName,
    calendarUrl: calendar ? programmeCalendarUrl(calendar.getId()) : "",
    lastSyncedAt: props.getProperty("MATHEPI_PROGRAMME_CALENDAR_SYNCED_AT") || "",
    eventCount: Number(props.getProperty("MATHEPI_PROGRAMME_CALENDAR_EVENT_COUNT") || 0),
  };
}

function syncProgrammeCalendarData(datasets, spreadsheet) {
  const data = datasets || {
    CalendarBlocks: readJsonRecords(getSheet(spreadsheet, "CalendarBlocks")),
    Courses: readJsonRecords(getSheet(spreadsheet, "Courses")),
    Sessions: readJsonRecords(getSheet(spreadsheet, "Sessions")),
    StudyGroupMeetings: readJsonRecords(getSheet(spreadsheet, "StudyGroupMeetings")),
  };
  const blocks = data.CalendarBlocks || [];
  const courses = data.Courses || [];
  const sessions = data.Sessions || [];
  const groupMeetings = data.StudyGroupMeetings || [];
  if (!blocks.length || !courses.length) throw new Error("Calendar blocks and courses must be synced before creating Google Calendar events.");

  const calendar = getOrCreateProgrammeCalendar();
  removeProgrammeCalendarTriggers_();
  const ledgerSheet = getSheet(spreadsheet, "CalendarSyncEvents");
  ensureSheetHeaders(ledgerSheet, TAB_HEADERS.CalendarSyncEvents);
  const existing = readCalendarSyncLedger(ledgerSheet);
  const desired = buildProgrammeCalendarEvents(blocks, courses, sessions, groupMeetings);
  clearProgrammeCalendarEvents_(calendar);
  const retained = {};
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  desired.forEach((item) => {
    const event = createProgrammeCalendarEvent(calendar, item);
    retained[item.sync_key] = {
      sync_key: item.sync_key,
      event_id: event.getId(),
      fingerprint: item.fingerprint,
      event_date: item.event_date,
      updated_at: new Date().toISOString(),
    };
    created += 1;
  });

  let removed = 0;
  Object.keys(existing).forEach((key) => {
    if (retained[key]) return;
    deleteCalendarEvent(calendar, existing[key].event_id);
    removed += 1;
  });
  writeCalendarSyncLedger(ledgerSheet, Object.keys(retained).sort().map((key) => retained[key]));

  const syncedAt = new Date().toISOString();
  const props = PropertiesService.getScriptProperties();
  props.setProperty("MATHEPI_PROGRAMME_CALENDAR_SYNCED_AT", syncedAt);
  props.setProperty("MATHEPI_PROGRAMME_CALENDAR_EVENT_COUNT", String(desired.length));
  return {
    ok: true,
    connected: true,
    calendarId: calendar.getId(),
    calendarName: calendar.getName(),
    calendarUrl: programmeCalendarUrl(calendar.getId()),
    lastSyncedAt: syncedAt,
    eventCount: desired.length,
    created: created,
    updated: updated,
    removed: removed,
    unchanged: unchanged,
  };
}

function getOrCreateProgrammeCalendar() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(MATHEPI.properties.calendarId);
  if (existingId) {
    const existing = CalendarApp.getCalendarById(existingId);
    if (existing) return existing;
    props.deleteProperty(MATHEPI.properties.calendarId);
  }
  const matches = CalendarApp.getCalendarsByName(MATHEPI.calendarName);
  const calendar = matches.length ? matches[0] : CalendarApp.createCalendar(MATHEPI.calendarName, {
    summary: "Live teaching timetable for the MathEpi 2026-2027 programme.",
    timeZone: PROGRAMME_CALENDAR_TIMEZONE,
  });
  props.setProperty(MATHEPI.properties.calendarId, calendar.getId());
  return calendar;
}

function ensureProgrammeCalendarTrigger() {
  const exists = ScriptApp.getProjectTriggers().some((trigger) => trigger.getHandlerFunction() === PROGRAMME_CALENDAR_TRIGGER);
  if (!exists) ScriptApp.newTrigger(PROGRAMME_CALENDAR_TRIGGER).timeBased().everyMinutes(15).create();
}

function removeProgrammeCalendarTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === PROGRAMME_CALENDAR_TRIGGER) ScriptApp.deleteTrigger(trigger);
  });
}

function clearProgrammeCalendarEvents_(calendar) {
  const start = new Date("2025-01-01T00:00:00Z");
  const end = new Date("2029-12-31T23:59:59Z");
  calendar.getEvents(start, end).forEach(function (event) { event.deleteEvent(); });
}

const PROGRAMME_COURSE_DELIVERY_WINDOWS = {
  MES01: { start: "2026-10-26", end: "2026-11-13" },
  MES06: { start: "2026-10-26", end: "2026-11-10" },
  MES05: { start: "2026-11-11", end: "2026-11-27" },
  MES03: { start: "2026-11-16", end: "2026-11-27" },
};

function buildProgrammeCalendarEvents(blocks, courses, sessions, groupMeetings) {
  const blockMap = {};
  const courseMap = {};
  blocks.forEach((block) => { blockMap[String(block.id || block.block_id || "")] = block; });
  courses.forEach((course) => { courseMap[String(course.code || course.id || "").toUpperCase()] = course; });
  const events = [];

  sessions.forEach((session) => {
    const block = blockMap[String(session.blockId || session.block_id || "")];
    const code = String(session.courseCode || session.course_code || "").toUpperCase();
    const course = courseMap[code];
    if (!block || !course || !block.start || !block.end || !session.day || !session.time) return;
    const fixedWindow = PROGRAMME_COURSE_DELIVERY_WINDOWS[code] || {};
    const deliveryStart = fixedWindow.start || course.deliveryStart || course.delivery_start || block.start;
    const deliveryEnd = fixedWindow.end || course.deliveryEnd || course.delivery_end || block.end;
    datesForWeekday(deliveryStart, deliveryEnd, session.day).forEach((date) => {
      const start = dateAtTime(date, session.time);
      const end = new Date(start.getTime() + Number(session.duration || 2) * 60 * 60 * 1000);
      const lecturers = course.lecturerName || "To be confirmed";
      const alternates = course.alternateLecturerName || "";
      const tutors = (course.reviewTutorNames || []).join(", ");
      const description = [
        course.outcomes || course.description || "",
        "Lecturer: " + lecturers,
        alternates ? "Alternate: " + alternates : "",
        tutors ? "Tutor(s): " + tutors : "",
        "Block: " + (block.title || block.id || ""),
        "Synced automatically from the MathEpi Academic Manager.",
      ].filter(Boolean).join("\n\n");
      const item = {
        sync_key: "session::" + String(session.id || code + "-" + session.day + "-" + session.time) + "::" + formatProgrammeDate(date),
        title: code + " " + course.title + " - " + (session.type || "Class"),
        start: start,
        end: end,
        location: session.room || "",
        description: description,
        event_date: formatProgrammeDate(date),
        all_day: false,
      };
      item.fingerprint = programmeCalendarFingerprint(item);
      events.push(item);
    });
  });

  blocks.filter((block) => block.kind && block.kind !== "teaching").forEach((block) => {
    if (!block.start || !block.end) return;
    const item = {
      sync_key: "block::" + String(block.id || block.title),
      title: block.title || "MathEpi programme milestone",
      start: programmeDate(block.start),
      end: addProgrammeDays(programmeDate(block.end), 1),
      location: "",
      description: [block.note || "", "Synced automatically from the MathEpi Academic Manager."].filter(Boolean).join("\n\n"),
      event_date: String(block.start),
      all_day: true,
    };
    item.fingerprint = programmeCalendarFingerprint(item);
    events.push(item);
  });
  (groupMeetings || []).filter((meeting) => meeting.date && meeting.time && meeting.status !== "Cancelled").forEach((meeting) => {
    const start = dateAtTime(programmeDate(meeting.date), meeting.time);
    const end = new Date(start.getTime() + Number(meeting.duration || 90) * 60 * 1000);
    const item = {
      sync_key: "study-group::" + String(meeting.id || meeting.groupId + "-" + meeting.date + "-" + meeting.time),
      title: "Study group: " + String(meeting.title || meeting.courseCode || "MathEpi"),
      start: start,
      end: end,
      location: meeting.location || "",
      description: [meeting.objective || "", meeting.courseCode ? "Course: " + meeting.courseCode : "", "Created from the MathEpi Study Groups workspace."].filter(Boolean).join("\n\n"),
      event_date: formatProgrammeDate(start),
      all_day: false,
    };
    item.fingerprint = programmeCalendarFingerprint(item);
    events.push(item);
  });
  return events;
}

function createProgrammeCalendarEvent(calendar, item) {
  if (item.all_day) return calendar.createAllDayEvent(item.title, item.start, item.end, { description: item.description });
  return calendar.createEvent(item.title, item.start, item.end, { description: item.description, location: item.location });
}

function calendarEventExists(calendar, eventId) {
  if (!eventId) return false;
  try { return !!calendar.getEventById(eventId); } catch (error) { return false; }
}

function deleteCalendarEvent(calendar, eventId) {
  if (!eventId) return;
  try {
    const event = calendar.getEventById(eventId);
    if (event) event.deleteEvent();
  } catch (error) {}
}

function readCalendarSyncLedger(sheet) {
  const rows = readSheetObjects(sheet);
  const result = {};
  rows.forEach((row) => { if (row.sync_key) result[row.sync_key] = row; });
  return result;
}

function writeCalendarSyncLedger(sheet, rows) {
  clearBody(sheet);
  if (!rows.length) return;
  const headers = TAB_HEADERS.CalendarSyncEvents;
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows.map((row) => headers.map((header) => row[header] || "")));
}

function datesForWeekday(startValue, endValue, dayName) {
  const target = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(String(dayName));
  if (target < 0) return [];
  const current = programmeDate(startValue);
  const end = programmeDate(endValue);
  while (current.getDay() !== target && current <= end) current.setDate(current.getDate() + 1);
  const dates = [];
  while (current <= end) {
    dates.push(new Date(current.getTime()));
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

function programmeDate(value) {
  const parts = String(value).slice(0, 10).split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function dateAtTime(date, time) {
  const parts = String(time).split(":").map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), parts[0] || 0, parts[1] || 0, 0, 0);
}

function addProgrammeDays(date, days) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

function formatProgrammeDate(date) {
  return Utilities.formatDate(date, PROGRAMME_CALENDAR_TIMEZONE, "yyyy-MM-dd");
}

function programmeCalendarFingerprint(item) {
  const raw = [item.title, item.start.toISOString(), item.end.toISOString(), item.location, item.description, item.all_day].join("|");
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw)).replace(/=+$/, "");
}

function programmeCalendarUrl(calendarId) {
  return "https://calendar.google.com/calendar/u/0?cid=" + encodeURIComponent(calendarId);
}

const PORTAL_ADMIN_EMAIL = "couma@aimsric.org";
const PORTAL_ROLES = ["manager", "centre-coordinator", "head-tutor", "lecturer", "tutor", "student", "aims-ric-support", "support-counsellor", "it-support", "viewer"];
const PORTAL_FIREBASE_API_KEY = "AIzaSyA_7_wqSyIk5cIShXN0wet3jEncNqwrThE";

function establishGooglePortalAccess(payload) {
  payload = payload || {};
  const identity = payload.googleAccessToken
    ? portalVerifyGoogleAccessToken_(payload.googleAccessToken)
    : portalVerifyFirebaseGoogleToken_(payload.idToken);
  const email = portalAllowedEmail_(identity.email);
  let record = portalStoredAccess_(email);
  if (!record) {
    const admin = email === PORTAL_ADMIN_EMAIL;
    const requestedRole = admin ? "manager" : portalRole_(payload.requestedRole);
    const roles = admin ? ["super-admin", "manager"] : [];
    record = { email: email, requested_role: requestedRole, roles_json: JSON.stringify(roles), status: admin ? "approved" : "pending", requested_at: new Date().toISOString(), decided_at: admin ? new Date().toISOString() : "", decided_by: admin ? email : "" };
    portalStoreAccess_(record);
  }
  const token = Utilities.getUuid() + Utilities.getUuid();
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000);
  portalStoreSession_(token, email, expires);
  const result = portalSessionResult_(record, token, expires);
  result.provider = "google";
  result.displayName = identity.displayName;
  return result;
}

function portalVerifyGoogleAccessToken_(accessToken) {
  accessToken = String(accessToken || "").trim();
  if (!accessToken) throw new Error("Google sign-in token is missing.");
  const response = UrlFetchApp.fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: "Bearer " + accessToken },
    muteHttpExceptions: true,
  });
  const data = JSON.parse(response.getContentText() || "{}");
  if (response.getResponseCode() !== 200 || !data.sub || !data.email) throw new Error("Google sign-in could not be verified.");
  if (data.email_verified !== true && data.email_verified !== "true") throw new Error("Your Google account email is not verified.");
  return { uid: String(data.sub), email: String(data.email), displayName: String(data.name || data.email) };
}

function portalVerifyFirebaseGoogleToken_(idToken) {
  idToken = String(idToken || "").trim();
  if (!idToken) throw new Error("Google sign-in token is missing.");
  const response = UrlFetchApp.fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" + encodeURIComponent(PORTAL_FIREBASE_API_KEY), {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ idToken: idToken }),
    muteHttpExceptions: true,
  });
  const data = JSON.parse(response.getContentText() || "{}");
  const user = data.users && data.users[0];
  if (response.getResponseCode() !== 200 || !user) throw new Error("Google sign-in could not be verified.");
  if (!user.emailVerified) throw new Error("Your Google account email is not verified.");
  const providers = user.providerUserInfo || [];
  if (!providers.some(function (provider) { return provider.providerId === "google.com"; })) throw new Error("Use Sign in with Google for MathEpi access.");
  return { uid: String(user.localId || ""), email: String(user.email || ""), displayName: String(user.displayName || user.email || "") };
}

function requestPortalAccessOtp(payload) {
  payload = payload || {};
  const email = portalAllowedEmail_(payload && payload.email);
  const requestedRole = portalRole_(payload.requestedRole);
  const result = requestEmailOtp({ email: email, purpose: "portal-access" });
  if (result && result.ok) result.requestedRole = requestedRole;
  return result;
}

function verifyPortalAccessOtp(payload) {
  payload = payload || {};
  const email = portalAllowedEmail_(payload.email);
  const requestedRole = portalRole_(payload.requestedRole);
  const verified = verifyEmailOtp({ email: email, code: payload.code, purpose: "portal-access" });
  if (!verified.ok) return verified;
  const sheet = portalSheet_("AccessRoles", ["email", "requested_role", "roles_json", "status", "requested_at", "decided_at", "decided_by"]);
  let record = portalFind_(sheet, email);
  if (!record) {
    const admin = email === PORTAL_ADMIN_EMAIL;
    const roles = admin ? ["super-admin", "manager"] : [];
    sheet.appendRow([email, requestedRole, JSON.stringify(roles), admin ? "approved" : "pending", new Date(), admin ? new Date() : "", admin ? email : ""]);
    record = { email: email, requested_role: requestedRole, roles_json: JSON.stringify(roles), status: admin ? "approved" : "pending" };
    portalSend_(email, "MathEpi account request received", admin
      ? "Your MathEpi administrator account is active."
      : "Your MathEpi account request has been received and is awaiting approval.");
  }
  const token = Utilities.getUuid() + Utilities.getUuid();
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000);
  portalStoreSession_(token, email, expires);
  portalSheet_("AccessSessions", ["token_hash", "email", "expires_at", "created_at"]).appendRow([portalHash_(token), email, expires, new Date()]);
  return portalSessionResult_(record, token, expires);
}

function getPortalAccessSession(payload) {
  const session = portalRequireSession_(payload && payload.token, false);
  return portalSessionResult_(session.access, payload.token, session.expires);
}

function listPortalAccessRequests(payload) {
  portalRequireSession_(payload && payload.token, true);
  return { ok: true, requests: portalStoredAccessRows_().filter(function (row) { return row.status === "pending"; }) };
}

function listPortalAccessUsers(payload) {
  portalRequireSession_(payload && payload.token, true);
  const users = portalStoredAccessRows_().filter(function (row) { return row.status !== "pending"; }).map(function (row) {
    row.roles = JSON.parse(row.roles_json || "[]");
    return row;
  });
  return { ok: true, users: users };
}

function updatePortalUserAccess(payload) {
  payload = payload || {};
  const admin = portalRequireSession_(payload.token, true);
  const email = normalizeEmailAddress(payload.email);
  const role = portalRole_(payload.role);
  if (email === PORTAL_ADMIN_EMAIL && payload.active === false) throw new Error("The primary administrator account cannot be switched off.");
  const found = portalStoredAccess_(email);
  if (!found) throw new Error("Access record not found.");
  const active = payload.active === true || String(payload.active).toLowerCase() === "true";
  found.requested_role = role;
  found.roles_json = JSON.stringify(active ? [role] : []);
  found.status = active ? "approved" : "suspended";
  found.decided_at = new Date().toISOString();
  found.decided_by = admin.email;
  found.notification_id = Utilities.getUuid();
  found.notification_message = active
    ? "Your MathEpi access is active as " + role + "."
    : "Your MathEpi access has been switched off. Please contact the Academic Manager if you need access restored.";
  portalStoreAccess_(found);
  portalRevokeSessionsForEmail_(email);
  return { ok: true, email: email, status: found.status };
}

function decidePortalAccess(payload) {
  payload = payload || {};
  const admin = portalRequireSession_(payload.token, true);
  const email = normalizeEmailAddress(payload.email);
  const decision = String(payload.decision || "").toLowerCase();
  if (["approved", "rejected"].indexOf(decision) < 0) throw new Error("Choose Approve or Reject.");
  const role = portalRole_(payload.role);
  const found = portalStoredAccess_(email);
  if (!found) throw new Error("Access request not found.");
  found.requested_role = role;
  found.roles_json = JSON.stringify(decision === "approved" ? [role] : []);
  found.status = decision;
  found.decided_at = new Date().toISOString();
  found.decided_by = admin.email;
  found.notification_id = Utilities.getUuid();
  found.notification_message = decision === "approved"
    ? "Your MathEpi access has been approved as " + role + "."
    : "Your MathEpi access request was not approved. Please contact the Academic Manager.";
  portalStoreAccess_(found);
  portalRevokeSessionsForEmail_(email);
  return { ok: true, notificationId: found.notification_id };
}

function portalRequireSession_(token, adminOnly) {
  const session = portalStoredSession_(token);
  if (!session || new Date(session.expires_at).getTime() <= Date.now()) throw new Error("Your session has expired. Sign in with Google again.");
  const access = portalStoredAccess_(session.email);
  if (!access) throw new Error("Access record not found.");
  const roles = JSON.parse(access.roles_json || "[]");
  if (adminOnly && session.email !== PORTAL_ADMIN_EMAIL && roles.indexOf("super-admin") < 0 && roles.indexOf("manager") < 0) throw new Error("Administrator access is required.");
  return { email: session.email, access: access, expires: session.expires_at };
}

function portalRequireRoles_(token, allowedRoles) {
  const session = portalRequireSession_(token, false);
  if (session.access.status !== "approved") throw new Error("Approved MathEpi access is required.");
  const roles = JSON.parse(session.access.roles_json || "[]");
  if (allowedRoles && allowedRoles.length && !roles.some(function (role) { return allowedRoles.indexOf(role) >= 0; })) throw new Error("Your assigned role cannot perform this action.");
  return session;
}

function portalSessionResult_(record, token, expires) {
  const roles = JSON.parse(record.roles_json || "[]");
  return {
    ok: true,
    token: token,
    email: record.email,
    status: record.status,
    requestedRole: record.requested_role,
    roles: roles,
    permissions: portalPermissionsForRoles_(roles),
    allowedViews: portalAllowedViewsForRoles_(roles),
    expiresAt: expires,
    decidedAt: record.decided_at || "",
    notificationId: record.notification_id || "",
    notificationMessage: record.notification_message || "",
  };
}

function portalStore_() { return PropertiesService.getScriptProperties(); }
function portalAccessKey_(email) { return "portal_access_" + portalHash_(normalizeEmailAddress(email)); }
function portalSessionKey_(token) { return "portal_session_" + portalHash_(String(token || "")); }
function portalStoredAccess_(email) {
  const value = portalStore_().getProperty(portalAccessKey_(email));
  return value ? JSON.parse(value) : null;
}
function portalStoreAccess_(record) { portalStore_().setProperty(portalAccessKey_(record.email), JSON.stringify(record)); }
function portalStoredAccessRows_() {
  const properties = portalStore_().getProperties();
  return Object.keys(properties).filter(function (key) { return key.indexOf("portal_access_") === 0; }).map(function (key, index) {
    const record = JSON.parse(properties[key]);
    record._row = index + 1;
    return record;
  });
}
function portalStoreSession_(token, email, expires) {
  portalStore_().setProperty(portalSessionKey_(token), JSON.stringify({ email: email, expires_at: expires.toISOString(), created_at: new Date().toISOString() }));
}
function portalStoredSession_(token) {
  const value = portalStore_().getProperty(portalSessionKey_(token));
  return value ? JSON.parse(value) : null;
}

function portalAllowedEmail_(email) {
  email = normalizeEmailAddress(email);
  if (!/@aimsric\.org$/i.test(email)) throw new Error("Only an @aimsric.org email address can request MathEpi access.");
  return email;
}
function portalRole_(role) { role = String(role || "").trim(); if (PORTAL_ROLES.indexOf(role) < 0) throw new Error("Choose a valid role before requesting a code."); return role; }
function portalHash_(value) { return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)); }
function portalSheet_(name, headers) { const ss = getOrCreateSpreadsheet(); let sh = ss.getSheetByName(name); if (!sh) sh = ss.insertSheet(name); if (!sh.getLastRow()) sh.appendRow(headers); return sh; }
function portalRows_(sheet) { const values = sheet.getDataRange().getValues(); if (values.length < 2) return []; const heads = values[0]; return values.slice(1).map(function (row, i) { const out = {_row:i+2}; heads.forEach(function(h,j){out[h]=row[j];}); return out; }); }
function portalFind_(sheet, email) { return portalRows_(sheet).filter(function(row){return String(row.email).toLowerCase() === email;})[0] || null; }
function portalSend_(email, subject, message) { MailApp.sendEmail({to:email, subject:subject, body:message, name:"MathEpi Academic Operations", noReply:true}); }

function createItTicket(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const ticket = Object.assign({}, payload.ticket || {});
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ticketSheet = getSheet(spreadsheet, "ItTickets");
    const sequence = Math.max(1, ticketSheet.getLastRow());
    ticket.ticketRef = "IT-" + new Date().getFullYear() + "-" + String(sequence).padStart(4, "0");
    ticket.id = String(ticket.id || "sup-" + Date.now());
    ticket.requester_email = session.email;
    ticket.visibility = "technical";
    ticket.status = "New";
    ticket.created_at = ticket.created_at || new Date().toISOString();
    upsertRows(ticketSheet, [ticket]);
  } finally {
    lock.releaseLock();
  }
  appendTicketEvent_(spreadsheet, ticket.id, "Created", session.email, ticket.title || "");
  appendTicketNotification_(spreadsheet, session.email, "", "Ticket submitted", (ticket.ticketRef || ticket.id) + " was submitted.", "success", ticket.id);
  appendTicketNotification_(spreadsheet, "", "it-support", "New IT ticket", (ticket.ticketRef || ticket.id) + ": " + (ticket.title || "Technical issue"), ticket.urgency === "Critical" ? "critical" : "info", ticket.id);
  return { ok: true, ticket: ticket };
}

function listItTickets(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  const canManage = roles.some(function (role) { return ["super-admin", "manager", "it-support", "aims-ric-support"].indexOf(role) >= 0; });
  const rows = readSheetObjects(getSheet(getOrCreateSpreadsheet(), "ItTickets"));
  return { ok: true, tickets: canManage ? rows : rows.filter(function (row) { return normalizeEmailAddress(row.requester_email) === session.email; }) };
}

function updateItTicket(payload) {
  const session = portalRequireRoles_(payload && payload.token, ["super-admin", "manager", "it-support", "aims-ric-support"]);
  const spreadsheet = getOrCreateSpreadsheet();
  const ticket = Object.assign({}, payload.ticket || {});
  if (!ticket.id) throw new Error("Ticket id is required.");
  if (["Resolved", "Closed"].indexOf(ticket.status) >= 0 && !String(ticket.resolutionSummary || "").trim()) throw new Error("A resolution summary is required.");
  ticket.updated_at = new Date().toISOString();
  upsertRows(getSheet(spreadsheet, "ItTickets"), [ticket]);
  appendTicketEvent_(spreadsheet, ticket.id, "Status changed to " + ticket.status, session.email, ticket.resolutionSummary || "");
  appendTicketNotification_(spreadsheet, ticket.requester_email || "", "", (ticket.ticketRef || ticket.id) + ": " + ticket.status, ticket.resolutionSummary || "Your ticket was updated.", ticket.status === "Resolved" ? "success" : "info", ticket.id);
  return { ok: true, ticket: ticket };
}

function listNotifications(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  const rows = readSheetObjects(getSheet(getOrCreateSpreadsheet(), "Notifications"));
  return { ok: true, notifications: rows.filter(function (row) { return normalizeEmailAddress(row.recipient_email) === session.email || (row.recipient_role && roles.indexOf(row.recipient_role) >= 0); }) };
}

function markNotificationRead(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const spreadsheet = getOrCreateSpreadsheet();
  const rows = listNotifications(payload).notifications;
  const row = rows.filter(function (item) { return item.notification_id === payload.notificationId; })[0];
  if (!row) throw new Error("Notification not found.");
  row.read = true;
  row.read_at = new Date().toISOString();
  row.read_by = session.email;
  upsertRows(getSheet(spreadsheet, "Notifications"), [row]);
  return { ok: true };
}

function appendTicketEvent_(spreadsheet, ticketId, event, actor, detail) {
  upsertRows(getSheet(spreadsheet, "TicketHistory"), [{ event_id: Utilities.getUuid(), ticket_id: ticketId, event: event, actor_email: actor, detail: detail, created_at: new Date().toISOString() }]);
}

function appendTicketNotification_(spreadsheet, email, role, title, message, type, ticketId) {
  upsertRows(getSheet(spreadsheet, "Notifications"), [{ notification_id: Utilities.getUuid(), recipient_email: email, recipient_role: role, title: title, message: message, type: type, ticket_id: ticketId, read: false, created_at: new Date().toISOString() }]);
}

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

const PORTAL_ROLE_PERMISSIONS = {
  "super-admin": ["*"],
  manager: ["workspace.read", "workspace.write", "applications.read", "applications.manage", "applications.export", "reviews.read-all", "reviews.manage", "reviews.export", "staffing.read", "people.read", "students.read-all", "support.read-all", "access.manage", "audit.read"],
  reviewer: ["reviews.read-assigned", "reviews.write-assigned"],
  "centre-coordinator": ["workspace.read", "staffing.read", "people.read"],
  "head-tutor": ["workspace.read", "staffing.read", "people.read", "students.read-all"],
  lecturer: ["workspace.read", "people.read", "records.read-own"],
  tutor: ["workspace.read", "people.read", "records.read-own"],
  student: ["workspace.read", "records.read-own"],
  "aims-ric-support": ["workspace.read", "records.read-own"],
  "support-counsellor": ["workspace.read", "support.read-assigned", "students.read-minimal"],
  "it-support": ["workspace.read", "it.read-assigned"],
  viewer: ["workspace.read"],
};

const PORTAL_ROLE_VIEWS = {
  "super-admin": ["dashboard", "calendar", "planner", "groups", "courses", "people", "students", "cfa", "lecturer-reviews", "tf-reviews", "appointments", "support", "contact", "timesheets", "tasks", "google", "access"],
  manager: ["dashboard", "calendar", "courses", "people", "students", "cfa", "lecturer-reviews", "tf-reviews", "appointments", "groups", "support", "contact", "timesheets", "tasks", "google", "access"],
  reviewer: ["dashboard", "tf-reviews"],
  "centre-coordinator": ["dashboard", "calendar", "courses", "people", "appointments", "tasks"],
  "head-tutor": ["dashboard", "calendar", "courses", "people", "students", "appointments", "groups", "timesheets", "tasks"],
  lecturer: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "contact"],
  tutor: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "timesheets", "tasks"],
  student: ["dashboard", "calendar", "planner", "groups", "courses", "appointments", "support"],
  "aims-ric-support": ["dashboard", "calendar", "planner", "groups", "courses", "appointments", "support"],
  "support-counsellor": ["dashboard", "appointments", "support"],
  "it-support": ["dashboard", "appointments", "support", "tasks"],
  viewer: ["dashboard", "calendar", "courses"],
};

const PORTAL_DATASET_POLICY = {
  CalendarBlocks: ["workspace.read"],
  Courses: ["workspace.read"],
  Sessions: ["workspace.read"],
  People: ["people.read", "workspace.read"],
  Students: ["students.read-all", "students.read-minimal", "records.read-own"],
  Timesheets: ["workspace.write", "records.read-own", "staffing.read"],
  Tasks: ["workspace.write", "records.read-own", "staffing.read", "it.read-assigned"],
  StudentPlanner: ["workspace.write", "records.read-own"],
  StudentTodos: ["workspace.write", "records.read-own"],
  PlannerTasks: ["workspace.write", "records.read-own"],
  StudyGroups: ["workspace.write", "records.read-own"],
  StudyGroupMembers: ["workspace.write", "records.read-own"],
  StudyGroupInvitations: ["workspace.write", "records.read-own"],
  StudyGroupActivities: ["workspace.write", "records.read-own"],
  StudyGroupMeetings: ["workspace.write", "records.read-own"],
  StudyGroupTaskAssignments: ["workspace.write", "records.read-own"],
  Appointments: ["workspace.write", "records.read-own", "staffing.read", "support.read-assigned", "it.read-assigned"],
  Availability: ["workspace.write", "records.read-own", "staffing.read"],
  SupportRequests: ["workspace.write", "records.read-own", "support.read-all", "support.read-assigned"],
  ItTickets: ["workspace.write", "records.read-own", "it.read-assigned"],
  TicketHistory: ["workspace.write", "records.read-own", "it.read-assigned"],
  Notifications: ["workspace.write", "records.read-own"],
};

function portalSessionContext_(token) {
  const session = portalRequireRoles_(token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  return { email: session.email, roles: roles, access: session.access, expires: session.expires };
}

function portalPermissionsForRoles_(roles) {
  const permissions = {};
  (roles || []).forEach(function (role) {
    (PORTAL_ROLE_PERMISSIONS[role] || []).forEach(function (permission) { permissions[permission] = true; });
  });
  return Object.keys(permissions);
}

function portalAllowedViewsForRoles_(roles) {
  const views = {};
  (roles || []).forEach(function (role) {
    (PORTAL_ROLE_VIEWS[role] || []).forEach(function (view) { views[view] = true; });
  });
  views.dashboard = true;
  return Object.keys(views);
}

function portalHasPermission_(context, permission) {
  const permissions = portalPermissionsForRoles_(context.roles);
  return permissions.indexOf("*") >= 0 || permissions.indexOf(permission) >= 0;
}

function requirePermission_(token, permission) {
  const context = portalSessionContext_(token);
  if (!portalHasPermission_(context, permission)) throw new Error("Your assigned role cannot access this protected area.");
  return context;
}

function authorizePortalAction_(action, payload) {
  const policy = {
    setupWorkspace: "workspace.write",
    saveSnapshot: "workspace.write",
    getBootstrap: "workspace.read",
    syncProgrammeCalendar: "workspace.write",
    getProgrammeCalendarStatus: "workspace.read",
    updateCfaStatus: "applications.manage",
    listLecturerReviewData: "applications.read",
    saveLecturerReviewDecision: "applications.manage",
    backfillLecturerApplicationColumns: "applications.manage",
    listReviewStaffingAssignments: "staffing.read",
    listPortalAccessRequests: "access.manage",
    decidePortalAccess: "access.manage",
    listPortalAccessUsers: "access.manage",
    updatePortalUserAccess: "access.manage",
  };
  return policy[action] ? requirePermission_(payload && payload.token, policy[action]) : null;
}

function roleFilteredBootstrap_(spreadsheet, context) {
  const datasets = {};
  DATASET_TABS.forEach(function (tab) {
    const permittedBy = PORTAL_DATASET_POLICY[tab] || [];
    if (!permittedBy.some(function (permission) { return portalHasPermission_(context, permission); })) {
      datasets[tab] = [];
      return;
    }
    const rows = readJsonRecords(getSheet(spreadsheet, tab));
    datasets[tab] = filterDatasetRowsForSession_(tab, rows, context);
  });
  return datasets;
}

function filterDatasetRowsForSession_(tab, rows, context) {
  if (portalHasPermission_(context, "workspace.write") || portalHasPermission_(context, "support.read-all")) return rows;
  if (tab === "People") return rows.map(redactPersonRecord_);
  if (tab === "Students") {
    if (portalHasPermission_(context, "students.read-all")) return rows.map(redactStudentRecord_);
    if (portalHasPermission_(context, "students.read-minimal")) return rows.map(function (row) { return { id: row.id || "", name: row.name || "", cohort: row.cohort || "", status: row.status || "" }; });
    return rows.filter(function (row) { return recordBelongsToSession_(row, context.email); }).map(redactStudentRecord_);
  }
  const publicTabs = ["CalendarBlocks", "Courses", "Sessions"];
  if (publicTabs.indexOf(tab) >= 0) return rows;
  if (portalHasPermission_(context, "staffing.read") && ["Timesheets", "Tasks", "Appointments", "Availability"].indexOf(tab) >= 0) return rows;
  return rows.filter(function (row) { return recordBelongsToSession_(row, context.email); });
}

function recordBelongsToSession_(record, email) {
  const target = normalizeEmailAddress(email);
  const emailKeys = ["email", "requester_email", "recipient_email", "student_email", "owner_email", "author_email", "created_by_email", "assigned_email"];
  return emailKeys.some(function (key) { return record[key] && String(record[key]).trim().toLowerCase() === target; });
}

function redactPersonRecord_(row) {
  return { id: row.id || "", name: row.name || "", kind: row.kind || "", affiliation: row.affiliation || "", reference: row.reference || "", expertise: row.expertise || "", status: row.status || "" };
}

function redactStudentRecord_(row) {
  return { id: row.id || "", name: row.name || "", email: row.email || "", cohort: row.cohort || "", status: row.status || "", interests: row.interests || [] };
}

function portalRevokeSessionsForEmail_(email) {
  const target = normalizeEmailAddress(email);
  const properties = portalStore_().getProperties();
  Object.keys(properties).forEach(function (key) {
    if (key.indexOf("portal_session_") !== 0) return;
    try {
      const session = JSON.parse(properties[key]);
      if (normalizeEmailAddress(session.email) === target) portalStore_().deleteProperty(key);
    } catch (error) {}
  });
  const sheet = portalSheet_("AccessSessions", ["token_hash", "email", "expires_at", "created_at"]);
  for (let row = sheet.getLastRow(); row >= 2; row -= 1) {
    if (String(sheet.getRange(row, 2).getValue() || "").trim().toLowerCase() === target) sheet.deleteRow(row);
  }
}

function revokePortalSession(payload) {
  const session = portalRequireSession_(payload && payload.token, false);
  portalRevokeSessionsForEmail_(session.email);
  return { ok: true };
}
