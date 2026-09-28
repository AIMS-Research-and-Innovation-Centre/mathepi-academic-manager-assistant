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
  const calendarSync = payload && payload.datasets ? tryProgrammeCalendarSync(payload, spreadsheet) : getProgrammeCalendarStatus();
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
  const calendarSync = tryProgrammeCalendarSync(payload, spreadsheet);
  return { ok: true, tabsUpdated, spreadsheetUrl: spreadsheet.getUrl(), driveRootUrl: rootFolder.getUrl(), calendarSync };
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
