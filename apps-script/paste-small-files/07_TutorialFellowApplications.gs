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
