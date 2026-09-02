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
  const submittedAt = application.submittedAt || new Date().toISOString();
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
  const bytes = Utilities.base64Decode(passport.dataBase64);
  const blob = Utilities.newBlob(bytes, passport.mimeType || "application/octet-stream", passport.name || "passport");
  const file = folder.createFile(blob);
  const driveFileUrl = file.getUrl();
  const driveFileId = file.getId();

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
}

function appendLecturerApplicationRow_(sheet, row) {
  const headers = getHeaders(sheet);
  if (!headers.length) throw new Error("LecturerApplications is missing its header row.");
  sheet.appendRow(headers.map((header) => row[header] || ""));
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
