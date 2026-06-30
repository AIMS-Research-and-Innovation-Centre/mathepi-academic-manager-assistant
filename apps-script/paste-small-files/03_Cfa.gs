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
