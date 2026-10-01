const PORTAL_ADMIN_EMAIL = "couma@aimsric.org";
const PORTAL_ROLES = ["manager", "centre-coordinator", "head-tutor", "lecturer", "tutor", "student", "aims-ric-support", "support-counsellor", "it-support", "viewer"];
const PORTAL_FIREBASE_API_KEY = "AIzaSyA_7_wqSyIk5cIShXN0wet3jEncNqwrThE";

function establishGooglePortalAccess(payload) {
  payload = payload || {};
  const identity = payload.googleAccessToken
    ? portalVerifyGoogleAccessToken_(payload.googleAccessToken)
    : portalVerifyFirebaseGoogleToken_(payload.idToken);
  const email = portalAllowedEmail_(identity.email);
  let record = portalStoredAccess_(email);
  if (!record) {
    const admin = email === PORTAL_ADMIN_EMAIL;
    const requestedRole = admin ? "manager" : portalRole_(payload.requestedRole);
    const roles = admin ? ["super-admin", "manager"] : [];
    record = { email: email, requested_role: requestedRole, roles_json: JSON.stringify(roles), status: admin ? "approved" : "pending", requested_at: new Date().toISOString(), decided_at: admin ? new Date().toISOString() : "", decided_by: admin ? email : "" };
    portalStoreAccess_(record);
  }
  const token = Utilities.getUuid() + Utilities.getUuid();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  portalStoreSession_(token, email, expires);
  const result = portalSessionResult_(record, token, expires);
  result.provider = "google";
  result.displayName = identity.displayName;
  return result;
}

function portalVerifyGoogleAccessToken_(accessToken) {
  accessToken = String(accessToken || "").trim();
  if (!accessToken) throw new Error("Google sign-in token is missing.");
  const response = UrlFetchApp.fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: "Bearer " + accessToken },
    muteHttpExceptions: true,
  });
  const data = JSON.parse(response.getContentText() || "{}");
  if (response.getResponseCode() !== 200 || !data.sub || !data.email) throw new Error("Google sign-in could not be verified.");
  if (data.email_verified !== true && data.email_verified !== "true") throw new Error("Your Google account email is not verified.");
  return { uid: String(data.sub), email: String(data.email), displayName: String(data.name || data.email) };
}

function portalVerifyFirebaseGoogleToken_(idToken) {
  idToken = String(idToken || "").trim();
  if (!idToken) throw new Error("Google sign-in token is missing.");
  const response = UrlFetchApp.fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" + encodeURIComponent(PORTAL_FIREBASE_API_KEY), {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ idToken: idToken }),
    muteHttpExceptions: true,
  });
  const data = JSON.parse(response.getContentText() || "{}");
  const user = data.users && data.users[0];
  if (response.getResponseCode() !== 200 || !user) throw new Error("Google sign-in could not be verified.");
  if (!user.emailVerified) throw new Error("Your Google account email is not verified.");
  const providers = user.providerUserInfo || [];
  if (!providers.some(function (provider) { return provider.providerId === "google.com"; })) throw new Error("Use Sign in with Google for MathEpi access.");
  return { uid: String(user.localId || ""), email: String(user.email || ""), displayName: String(user.displayName || user.email || "") };
}

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
  return { ok: true, requests: portalStoredAccessRows_().filter(function (row) { return row.status === "pending"; }) };
}

function decidePortalAccess(payload) {
  payload = payload || {};
  const admin = portalRequireSession_(payload.token, true);
  const email = normalizeEmailAddress(payload.email);
  const decision = String(payload.decision || "").toLowerCase();
  if (["approved", "rejected"].indexOf(decision) < 0) throw new Error("Choose Approve or Reject.");
  const role = portalRole_(payload.role);
  const found = portalStoredAccess_(email);
  if (!found) throw new Error("Access request not found.");
  found.requested_role = role;
  found.roles_json = JSON.stringify(decision === "approved" ? [role] : []);
  found.status = decision;
  found.decided_at = new Date().toISOString();
  found.decided_by = admin.email;
  portalStoreAccess_(found);
  return { ok: true };
}

function portalRequireSession_(token, adminOnly) {
  const session = portalStoredSession_(token);
  if (!session || new Date(session.expires_at).getTime() <= Date.now()) throw new Error("Your session has expired. Sign in with Google again.");
  const access = portalStoredAccess_(session.email);
  if (!access) throw new Error("Access record not found.");
  if (adminOnly && session.email !== PORTAL_ADMIN_EMAIL) throw new Error("Administrator access is required.");
  return { email: session.email, access: access, expires: session.expires_at };
}

function portalSessionResult_(record, token, expires) {
  return { ok: true, token: token, email: record.email, status: record.status, requestedRole: record.requested_role, roles: JSON.parse(record.roles_json || "[]"), expiresAt: expires };
}

function portalStore_() { return PropertiesService.getScriptProperties(); }
function portalAccessKey_(email) { return "portal_access_" + portalHash_(normalizeEmailAddress(email)); }
function portalSessionKey_(token) { return "portal_session_" + portalHash_(String(token || "")); }
function portalStoredAccess_(email) {
  const value = portalStore_().getProperty(portalAccessKey_(email));
  return value ? JSON.parse(value) : null;
}
function portalStoreAccess_(record) { portalStore_().setProperty(portalAccessKey_(record.email), JSON.stringify(record)); }
function portalStoredAccessRows_() {
  const properties = portalStore_().getProperties();
  return Object.keys(properties).filter(function (key) { return key.indexOf("portal_access_") === 0; }).map(function (key, index) {
    const record = JSON.parse(properties[key]);
    record._row = index + 1;
    return record;
  });
}
function portalStoreSession_(token, email, expires) {
  portalStore_().setProperty(portalSessionKey_(token), JSON.stringify({ email: email, expires_at: expires.toISOString(), created_at: new Date().toISOString() }));
}
function portalStoredSession_(token) {
  const value = portalStore_().getProperty(portalSessionKey_(token));
  return value ? JSON.parse(value) : null;
}

function portalAllowedEmail_(email) {
  email = normalizeEmailAddress(email);
  if (!/@aimsric\.org$/i.test(email)) throw new Error("Only an @aimsric.org email address can request MathEpi access.");
  return email;
}
function portalRole_(role) { role = String(role || "").trim(); if (PORTAL_ROLES.indexOf(role) < 0) throw new Error("Choose a valid role before requesting a code."); return role; }
function portalHash_(value) { return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)); }
function portalSheet_(name, headers) { const ss = getOrCreateSpreadsheet(); let sh = ss.getSheetByName(name); if (!sh) sh = ss.insertSheet(name); if (!sh.getLastRow()) sh.appendRow(headers); return sh; }
function portalRows_(sheet) { const values = sheet.getDataRange().getValues(); if (values.length < 2) return []; const heads = values[0]; return values.slice(1).map(function (row, i) { const out = {_row:i+2}; heads.forEach(function(h,j){out[h]=row[j];}); return out; }); }
function portalFind_(sheet, email) { return portalRows_(sheet).filter(function(row){return String(row.email).toLowerCase() === email;})[0] || null; }
function portalSend_(email, subject, message) { MailApp.sendEmail({to:email, subject:subject, body:message, name:"MathEpi Academic Operations", noReply:true}); }
