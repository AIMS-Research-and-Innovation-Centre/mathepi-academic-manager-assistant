function submitLecturerApplication(payload) {
  return saveLecturerApplication_(payload || {}, false);
}

function recoverLecturerApplication(payload) {
  return saveLecturerApplication_(payload || {}, true);
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
  const row = {
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
    passport_file_name: passport.name || application.passport || "",
    passport_drive_url: driveFileUrl,
    alumni: application.alumni || "",
    full_application_json: JSON.stringify(payload.state || {}),
  };
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
