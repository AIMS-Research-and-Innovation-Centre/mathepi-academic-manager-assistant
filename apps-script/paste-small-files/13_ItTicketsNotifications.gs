function createItTicket(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  const ticket = Object.assign({}, payload.ticket || {});
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ticketSheet = getSheet(spreadsheet, "ItTickets");
    const sequence = Math.max(1, ticketSheet.getLastRow());
    ticket.ticketRef = "IT-" + new Date().getFullYear() + "-" + String(sequence).padStart(4, "0");
    ticket.id = String(ticket.id || "sup-" + Date.now());
    ticket.requester_email = session.email;
    ticket.visibility = "technical";
    ticket.status = "New";
    ticket.created_at = ticket.created_at || new Date().toISOString();
    upsertRows(ticketSheet, [ticket]);
  } finally {
    lock.releaseLock();
  }
  appendTicketEvent_(spreadsheet, ticket.id, "Created", session.email, ticket.title || "");
  appendTicketNotification_(spreadsheet, session.email, "", "Ticket submitted", (ticket.ticketRef || ticket.id) + " was submitted.", "success", ticket.id);
  appendTicketNotification_(spreadsheet, "", "it-support", "New IT ticket", (ticket.ticketRef || ticket.id) + ": " + (ticket.title || "Technical issue"), ticket.urgency === "Critical" ? "critical" : "info", ticket.id);
  return { ok: true, ticket: ticket };
}

function listItTickets(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  const canManage = roles.some(function (role) { return ["super-admin", "manager", "it-support", "aims-ric-support"].indexOf(role) >= 0; });
  const rows = readSheetObjects(getSheet(getOrCreateSpreadsheet(), "ItTickets"));
  return { ok: true, tickets: canManage ? rows : rows.filter(function (row) { return normalizeEmailAddress(row.requester_email) === session.email; }) };
}

function updateItTicket(payload) {
  const session = portalRequireRoles_(payload && payload.token, ["super-admin", "manager", "it-support", "aims-ric-support"]);
  const spreadsheet = getOrCreateSpreadsheet();
  const ticket = Object.assign({}, payload.ticket || {});
  if (!ticket.id) throw new Error("Ticket id is required.");
  if (["Resolved", "Closed"].indexOf(ticket.status) >= 0 && !String(ticket.resolutionSummary || "").trim()) throw new Error("A resolution summary is required.");
  ticket.updated_at = new Date().toISOString();
  upsertRows(getSheet(spreadsheet, "ItTickets"), [ticket]);
  appendTicketEvent_(spreadsheet, ticket.id, "Status changed to " + ticket.status, session.email, ticket.resolutionSummary || "");
  appendTicketNotification_(spreadsheet, ticket.requester_email || "", "", (ticket.ticketRef || ticket.id) + ": " + ticket.status, ticket.resolutionSummary || "Your ticket was updated.", ticket.status === "Resolved" ? "success" : "info", ticket.id);
  return { ok: true, ticket: ticket };
}

function listNotifications(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const roles = JSON.parse(session.access.roles_json || "[]");
  const rows = readSheetObjects(getSheet(getOrCreateSpreadsheet(), "Notifications"));
  return { ok: true, notifications: rows.filter(function (row) { return normalizeEmailAddress(row.recipient_email) === session.email || (row.recipient_role && roles.indexOf(row.recipient_role) >= 0); }) };
}

function markNotificationRead(payload) {
  const session = portalRequireRoles_(payload && payload.token, []);
  const spreadsheet = getOrCreateSpreadsheet();
  const rows = listNotifications(payload).notifications;
  const row = rows.filter(function (item) { return item.notification_id === payload.notificationId; })[0];
  if (!row) throw new Error("Notification not found.");
  row.read = true;
  row.read_at = new Date().toISOString();
  row.read_by = session.email;
  upsertRows(getSheet(spreadsheet, "Notifications"), [row]);
  return { ok: true };
}

function appendTicketEvent_(spreadsheet, ticketId, event, actor, detail) {
  upsertRows(getSheet(spreadsheet, "TicketHistory"), [{ event_id: Utilities.getUuid(), ticket_id: ticketId, event: event, actor_email: actor, detail: detail, created_at: new Date().toISOString() }]);
}

function appendTicketNotification_(spreadsheet, email, role, title, message, type, ticketId) {
  upsertRows(getSheet(spreadsheet, "Notifications"), [{ notification_id: Utilities.getUuid(), recipient_email: email, recipient_role: role, title: title, message: message, type: type, ticket_id: ticketId, read: false, created_at: new Date().toISOString() }]);
}
