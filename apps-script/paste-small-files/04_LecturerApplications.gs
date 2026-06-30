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
