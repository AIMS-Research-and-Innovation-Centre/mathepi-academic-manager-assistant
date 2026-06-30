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
