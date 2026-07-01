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
      return jsonResponse(apiPost({ action, payload }));
    }
    return HtmlService.createHtmlOutput(
      "<h1>MathEpi Apps Script Backend</h1><p>Deploy this Web App URL into the MathEpi portal Sheets & Drive settings.</p>",
    );
  } catch (error) {
    return jsonResponse(routeErrorResponse(error));
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

function requestEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const cache = CacheService.getScriptCache();
    const rateKey = emailOtpCacheKey("rate", purpose, email);
    if (cache.get(rateKey)) {
      return { ok: false, error: "Please wait about one minute before requesting another code." };
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

    cache.put(emailOtpCacheKey("challenge", purpose, email), JSON.stringify(challenge), expiresInSeconds);
    cache.put(rateKey, "1", 60);
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
    return {
      ok: true,
      email,
      expiresInSeconds,
      remainingDailyQuota: Math.max(0, remainingDailyQuota - 1),
      deliveryHint: "The code was accepted by Google MailApp. Check inbox, spam/junk, Promotions, and Updates. The sender is the Google account that deployed this Apps Script, shown as MathEpi Academic Operations.",
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
    const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (current.join("") !== headers.join("")) {
      sheet.clear();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
  });
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
  const headers = getHeaders(sheet);
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
  const headers = getHeaders(sheet);
  objects.forEach((object) => sheet.appendRow(headers.map((header) => object[header] || "")));
}

function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function clearBody(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, lastColumn).clearContent();
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
