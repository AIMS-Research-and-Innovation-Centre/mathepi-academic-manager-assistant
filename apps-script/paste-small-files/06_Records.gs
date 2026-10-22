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
