const PORTAL_ROLE_PERMISSIONS = {
  "super-admin": ["*"],
  manager: ["workspace.read", "workspace.write", "applications.read", "applications.manage", "applications.export", "reviews.read-all", "reviews.manage", "reviews.export", "staffing.read", "people.read", "students.read-all", "support.read-all", "access.manage", "audit.read"],
  reviewer: ["reviews.read-assigned", "reviews.write-assigned"],
  "centre-coordinator": ["workspace.read", "staffing.read", "people.read"],
  "head-tutor": ["workspace.read", "staffing.read", "people.read", "students.read-all"],
  lecturer: ["workspace.read", "people.read", "records.read-own"],
  tutor: ["workspace.read", "people.read", "records.read-own"],
  student: ["workspace.read", "records.read-own"],
  "aims-ric-support": ["workspace.read", "records.read-own"],
  "support-counsellor": ["workspace.read", "support.read-assigned", "students.read-minimal"],
  "it-support": ["workspace.read", "it.read-assigned"],
  viewer: ["workspace.read"],
};

const PORTAL_ROLE_VIEWS = {
  "super-admin": ["dashboard", "calendar", "planner", "groups", "courses", "people", "students", "cfa", "lecturer-reviews", "tf-reviews", "appointments", "support", "contact", "timesheets", "tasks", "google", "access"],
  manager: ["dashboard", "calendar", "courses", "people", "students", "cfa", "lecturer-reviews", "tf-reviews", "appointments", "groups", "support", "contact", "timesheets", "tasks", "google", "access"],
  reviewer: ["dashboard", "tf-reviews"],
  "centre-coordinator": ["dashboard", "calendar", "courses", "people", "appointments", "tasks"],
  "head-tutor": ["dashboard", "calendar", "courses", "people", "students", "appointments", "groups", "timesheets", "tasks"],
  lecturer: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "contact"],
  tutor: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "timesheets", "tasks"],
  student: ["dashboard", "calendar", "planner", "groups", "courses", "appointments", "support"],
  "aims-ric-support": ["dashboard", "calendar", "planner", "groups", "courses", "appointments", "support"],
  "support-counsellor": ["dashboard", "appointments", "support"],
  "it-support": ["dashboard", "appointments", "support", "tasks"],
  viewer: ["dashboard", "calendar", "courses"],
};

const PORTAL_DATASET_POLICY = {
  CalendarBlocks: ["workspace.read"],
  Courses: ["workspace.read"],
  Sessions: ["workspace.read"],
  People: ["people.read", "workspace.read"],
  Students: ["students.read-all", "students.read-minimal", "records.read-own"],
  Timesheets: ["workspace.write", "records.read-own", "staffing.read"],
  Tasks: ["workspace.write", "records.read-own", "staffing.read", "it.read-assigned"],
  StudentPlanner: ["workspace.write", "records.read-own"],
  StudentTodos: ["workspace.write", "records.read-own"],
  PlannerTasks: ["workspace.write", "records.read-own"],
  StudyGroups: ["workspace.write", "records.read-own"],
  StudyGroupMembers: ["workspace.write", "records.read-own"],
  StudyGroupInvitations: ["workspace.write", "records.read-own"],
  StudyGroupActivities: ["workspace.write", "records.read-own"],
  StudyGroupMeetings: ["workspace.write", "records.read-own"],
  StudyGroupTaskAssignments: ["workspace.write", "records.read-own"],
  Appointments: ["workspace.write", "records.read-own", "staffing.read", "support.read-assigned", "it.read-assigned"],
  Availability: ["workspace.write", "records.read-own", "staffing.read"],
  SupportRequests: ["workspace.write", "records.read-own", "support.read-all", "support.read-assigned"],
  ItTickets: ["workspace.write", "records.read-own", "it.read-assigned"],
  TicketHistory: ["workspace.write", "records.read-own", "it.read-assigned"],
  Notifications: ["workspace.write", "records.read-own"],
};

function portalSessionContext_(token) {
  const session = portalRequireRoles_(token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  return { email: session.email, roles: roles, access: session.access, expires: session.expires };
}

function portalPermissionsForRoles_(roles) {
  const permissions = {};
  (roles || []).forEach(function (role) {
    (PORTAL_ROLE_PERMISSIONS[role] || []).forEach(function (permission) { permissions[permission] = true; });
  });
  return Object.keys(permissions);
}

function portalAllowedViewsForRoles_(roles) {
  const views = {};
  (roles || []).forEach(function (role) {
    (PORTAL_ROLE_VIEWS[role] || []).forEach(function (view) { views[view] = true; });
  });
  views.dashboard = true;
  return Object.keys(views);
}

function portalHasPermission_(context, permission) {
  const permissions = portalPermissionsForRoles_(context.roles);
  return permissions.indexOf("*") >= 0 || permissions.indexOf(permission) >= 0;
}

function requirePermission_(token, permission) {
  const context = portalSessionContext_(token);
  if (!portalHasPermission_(context, permission)) throw new Error("Your assigned role cannot access this protected area.");
  return context;
}

function authorizePortalAction_(action, payload) {
  const policy = {
    setupWorkspace: "workspace.write",
    saveSnapshot: "workspace.write",
    getBootstrap: "workspace.read",
    syncProgrammeCalendar: "workspace.write",
    getProgrammeCalendarStatus: "workspace.read",
    updateCfaStatus: "applications.manage",
    listLecturerReviewData: "applications.read",
    saveLecturerReviewDecision: "applications.manage",
    backfillLecturerApplicationColumns: "applications.manage",
    listReviewStaffingAssignments: "staffing.read",
    listPortalAccessRequests: "access.manage",
    decidePortalAccess: "access.manage",
    listPortalAccessUsers: "access.manage",
    updatePortalUserAccess: "access.manage",
  };
  return policy[action] ? requirePermission_(payload && payload.token, policy[action]) : null;
}

function roleFilteredBootstrap_(spreadsheet, context) {
  const datasets = {};
  DATASET_TABS.forEach(function (tab) {
    const permittedBy = PORTAL_DATASET_POLICY[tab] || [];
    if (!permittedBy.some(function (permission) { return portalHasPermission_(context, permission); })) {
      datasets[tab] = [];
      return;
    }
    const rows = readJsonRecords(getSheet(spreadsheet, tab));
    datasets[tab] = filterDatasetRowsForSession_(tab, rows, context);
  });
  return datasets;
}

function filterDatasetRowsForSession_(tab, rows, context) {
  if (portalHasPermission_(context, "workspace.write") || portalHasPermission_(context, "support.read-all")) return rows;
  if (tab === "People") return rows.map(redactPersonRecord_);
  if (tab === "Students") {
    if (portalHasPermission_(context, "students.read-all")) return rows.map(redactStudentRecord_);
    if (portalHasPermission_(context, "students.read-minimal")) return rows.map(function (row) { return { id: row.id || "", name: row.name || "", cohort: row.cohort || "", status: row.status || "" }; });
    return rows.filter(function (row) { return recordBelongsToSession_(row, context.email); }).map(redactStudentRecord_);
  }
  const publicTabs = ["CalendarBlocks", "Courses", "Sessions"];
  if (publicTabs.indexOf(tab) >= 0) return rows;
  if (portalHasPermission_(context, "staffing.read") && ["Timesheets", "Tasks", "Appointments", "Availability"].indexOf(tab) >= 0) return rows;
  return rows.filter(function (row) { return recordBelongsToSession_(row, context.email); });
}

function recordBelongsToSession_(record, email) {
  const target = normalizeEmailAddress(email);
  const emailKeys = ["email", "requester_email", "recipient_email", "student_email", "owner_email", "author_email", "created_by_email", "assigned_email"];
  return emailKeys.some(function (key) { return record[key] && String(record[key]).trim().toLowerCase() === target; });
}

function redactPersonRecord_(row) {
  return { id: row.id || "", name: row.name || "", kind: row.kind || "", affiliation: row.affiliation || "", reference: row.reference || "", expertise: row.expertise || "", status: row.status || "" };
}

function redactStudentRecord_(row) {
  return { id: row.id || "", name: row.name || "", email: row.email || "", cohort: row.cohort || "", status: row.status || "", interests: row.interests || [] };
}

function portalRevokeSessionsForEmail_(email) {
  const target = normalizeEmailAddress(email);
  const properties = portalStore_().getProperties();
  Object.keys(properties).forEach(function (key) {
    if (key.indexOf("portal_session_") !== 0) return;
    try {
      const session = JSON.parse(properties[key]);
      if (normalizeEmailAddress(session.email) === target) portalStore_().deleteProperty(key);
    } catch (error) {}
  });
  const sheet = portalSheet_("AccessSessions", ["token_hash", "email", "expires_at", "created_at"]);
  for (let row = sheet.getLastRow(); row >= 2; row -= 1) {
    if (String(sheet.getRange(row, 2).getValue() || "").trim().toLowerCase() === target) sheet.deleteRow(row);
  }
}

function revokePortalSession(payload) {
  const session = portalRequireSession_(payload && payload.token, false);
  portalRevokeSessionsForEmail_(session.email);
  return { ok: true };
}
