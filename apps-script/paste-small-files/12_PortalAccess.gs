const PORTAL_ADMIN_EMAIL = "couma@aimsric.org";
const PORTAL_ROLES = ["manager", "centre-coordinator", "head-tutor", "lecturer", "tutor", "student", "support-counsellor", "it-support", "viewer"];

function requestPortalAccessOtp(payload) {
  payload = payload || {};
  const email = portalAllowedEmail_(payload && payload.email);
  const requestedRole = portalRole_(payload.requestedRole);
  const result = requestEmailOtp({ email: email, purpose: "portal-access" });
  if (result && result.ok) result.requestedRole = requestedRole;
  return result;
}

function verifyPortalAccessOtp(payload) {
  payload = payload || {};
  const email = portalAllowedEmail_(payload.email);
  const requestedRole = portalRole_(payload.requestedRole);
  const verified = verifyEmailOtp({ email: email, code: payload.code, purpose: "portal-access" });
  if (!verified.ok) return verified;
  const sheet = portalSheet_("AccessRoles", ["email", "requested_role", "roles_json", "status", "requested_at", "decided_at", "decided_by"]);
  let record = portalFind_(sheet, email);
  if (!record) {
    const admin = email === PORTAL_ADMIN_EMAIL;
    const roles = admin ? ["super-admin", "manager"] : [];
    sheet.appendRow([email, requestedRole, JSON.stringify(roles), admin ? "approved" : "pending", new Date(), admin ? new Date() : "", admin ? email : ""]);
    record = { email: email, requested_role: requestedRole, roles_json: JSON.stringify(roles), status: admin ? "approved" : "pending" };
    portalSend_(email, "MathEpi account request received", admin
      ? "Your MathEpi administrator account is active."
      : "Your MathEpi account request has been received and is awaiting approval.");
  }
  const token = Utilities.getUuid() + Utilities.getUuid();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  portalSheet_("AccessSessions", ["token_hash", "email", "expires_at", "created_at"]).appendRow([portalHash_(token), email, expires, new Date()]);
  return portalSessionResult_(record, token, expires);
}

function getPortalAccessSession(payload) {
  const session = portalRequireSession_(payload && payload.token, false);
  return portalSessionResult_(session.access, payload.token, session.expires);
}

function listPortalAccessRequests(payload) {
  portalRequireSession_(payload && payload.token, true);
  const sheet = portalSheet_("AccessRoles", ["email", "requested_role", "roles_json", "status", "requested_at", "decided_at", "decided_by"]);
  return { ok: true, requests: portalRows_(sheet).filter(function (row) { return row.status === "pending"; }) };
}

function decidePortalAccess(payload) {
  payload = payload || {};
  const admin = portalRequireSession_(payload.token, true);
  const email = normalizeEmailAddress(payload.email);
  const decision = String(payload.decision || "").toLowerCase();
  if (["approved", "rejected"].indexOf(decision) < 0) throw new Error("Choose Approve or Reject.");
  const role = portalRole_(payload.role);
  const sheet = portalSheet_("AccessRoles", ["email", "requested_role", "roles_json", "status", "requested_at", "decided_at", "decided_by"]);
  const found = portalFind_(sheet, email);
  if (!found) throw new Error("Access request not found.");
  sheet.getRange(found._row, 2, 1, 6).setValues([[role, JSON.stringify(decision === "approved" ? [role] : []), decision, found.requested_at, new Date(), admin.email]]);
  portalSend_(email, decision === "approved" ? "Your MathEpi account is approved" : "MathEpi account request update",
    decision === "approved" ? "Your MathEpi account has been approved for the role: " + role + ". You can now open the app." : "Your MathEpi account request was not approved. Contact the Academic Manager if you need assistance.");
  return { ok: true };
}

function portalRequireSession_(token, adminOnly) {
  const hash = portalHash_(String(token || ""));
  const sessions = portalRows_(portalSheet_("AccessSessions", ["token_hash", "email", "expires_at", "created_at"]));
  const session = sessions.filter(function (row) { return row.token_hash === hash && new Date(row.expires_at).getTime() > Date.now(); })[0];
  if (!session) throw new Error("Your session has expired. Request a new email code.");
  const access = portalFind_(portalSheet_("AccessRoles", ["email", "requested_role", "roles_json", "status", "requested_at", "decided_at", "decided_by"]), session.email);
  if (!access) throw new Error("Access record not found.");
  if (adminOnly && session.email !== PORTAL_ADMIN_EMAIL) throw new Error("Administrator access is required.");
  return { email: session.email, access: access, expires: session.expires_at };
}

function portalSessionResult_(record, token, expires) {
  return { ok: true, token: token, email: record.email, status: record.status, requestedRole: record.requested_role, roles: JSON.parse(record.roles_json || "[]"), expiresAt: expires };
}

function portalAllowedEmail_(email) {
  email = normalizeEmailAddress(email);
  if (!/@aimsric\.org$/i.test(email) && ["blaise.tchapnda@aims.ac.rw", "marie.uwera@aims.ac.rw"].indexOf(email) < 0) throw new Error("This email is not approved for MathEpi access.");
  return email;
}
function portalRole_(role) { role = String(role || "").trim(); if (PORTAL_ROLES.indexOf(role) < 0) throw new Error("Choose a valid role before requesting a code."); return role; }
function portalHash_(value) { return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)); }
function portalSheet_(name, headers) { const ss = getOrCreateSpreadsheet(); let sh = ss.getSheetByName(name); if (!sh) sh = ss.insertSheet(name); if (!sh.getLastRow()) sh.appendRow(headers); return sh; }
function portalRows_(sheet) { const values = sheet.getDataRange().getValues(); if (values.length < 2) return []; const heads = values[0]; return values.slice(1).map(function (row, i) { const out = {_row:i+2}; heads.forEach(function(h,j){out[h]=row[j];}); return out; }); }
function portalFind_(sheet, email) { return portalRows_(sheet).filter(function(row){return String(row.email).toLowerCase() === email;})[0] || null; }
function portalSend_(email, subject, message) { MailApp.sendEmail({to:email, subject:subject, body:message, name:"MathEpi Academic Operations"}); }
