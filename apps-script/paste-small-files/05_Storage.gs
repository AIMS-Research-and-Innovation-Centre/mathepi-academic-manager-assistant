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
