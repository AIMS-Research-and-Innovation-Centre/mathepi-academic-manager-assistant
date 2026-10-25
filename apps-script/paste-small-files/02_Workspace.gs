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
  const calendarSync = getProgrammeCalendarStatus();
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
  const calendarSync = getProgrammeCalendarStatus();
  return { ok: true, tabsUpdated, spreadsheetUrl: spreadsheet.getUrl(), driveRootUrl: rootFolder.getUrl(), calendarSync };
}

function getBootstrap(payload) {
  const context = requirePermission_(payload && payload.token, "workspace.read");
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const datasets = roleFilteredBootstrap_(spreadsheet, context);
  const snapshots = readSheetObjects(getSheet(spreadsheet, "AppState"));
  const latest = snapshots.filter(function (row) { return row.key === "latest_snapshot"; })[0];
  let viewPermissions = null;
  if (portalHasPermission_(context, "workspace.write")) {
    try { viewPermissions = latest && latest.json ? JSON.parse(latest.json).viewPermissions || null : null; } catch (error) {}
  }
  return {
    ok: true,
    datasets,
    cfaStatuses: readCfaStatuses(spreadsheet),
    viewPermissions: viewPermissions,
    allowedViews: portalAllowedViewsForRoles_(context.roles),
    permissions: portalPermissionsForRoles_(context.roles),
    spreadsheetId: portalHasPermission_(context, "workspace.write") ? spreadsheet.getId() : "",
    spreadsheetUrl: portalHasPermission_(context, "workspace.write") ? spreadsheet.getUrl() : "",
  };
}
