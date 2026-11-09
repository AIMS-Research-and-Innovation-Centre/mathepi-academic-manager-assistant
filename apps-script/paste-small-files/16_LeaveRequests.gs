function leaveRequestRoles_(context) {
  return (context && context.roles) || [];
}

function leaveHasRole_(context, allowed) {
  return leaveRequestRoles_(context).some(function (role) { return allowed.indexOf(role) >= 0; });
}

function leaveText_(value, maximum) {
  return String(value || "").trim().slice(0, maximum || 1000);
}

function leaveIsoDate_(value, label) {
  const text = leaveText_(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || isNaN(new Date(text + "T12:00:00Z").getTime())) throw new Error(label + " is invalid.");
  return text;
}

function leaveStudentName_(spreadsheet, email) {
  const rows = readJsonRecords(getSheet(spreadsheet, "Students"));
  const match = rows.filter(function (row) { return normalizeEmailAddress(row.email) === normalizeEmailAddress(email); })[0];
  return match && match.name ? String(match.name) : email;
}

function leaveAppend_(sheet, record) {
  sheet.appendRow([record.id, JSON.stringify(record), new Date().toISOString()]);
}

function leaveNotify_(spreadsheet, recipientEmail, recipientRole, title, message, leaveId) {
  const notification = {
    id: "leave-note-" + Utilities.getUuid(),
    notification_id: "leave-note-" + Utilities.getUuid(),
    recipient_email: recipientEmail || "",
    recipient_role: recipientRole || "",
    title: title,
    message: message,
    type: "info",
    ticket_id: leaveId,
    read: false,
    created_at: new Date().toISOString(),
  };
  leaveAppend_(getSheet(spreadsheet, "Notifications"), notification);
}

function createLeaveRequest(payload) {
  const context = portalSessionContext_(payload && payload.token);
  if (!leaveHasRole_(context, ["student"])) throw new Error("Only a signed-in student can submit a leave request.");
  const input = (payload && payload.request) || {};
  const startDate = leaveIsoDate_(input.startDate, "First day");
  const endDate = leaveIsoDate_(input.endDate, "Last day");
  if (endDate < startDate) throw new Error("The last day cannot be before the first day.");
  const dayPortion = leaveText_(input.dayPortion, 30);
  if (["Whole day", "Morning only", "Afternoon only"].indexOf(dayPortion) < 0) throw new Error("Choose a valid absence period.");
  const reasonCategory = leaveText_(input.reasonCategory, 80);
  const reasonDetails = leaveText_(input.reasonDetails, 1200);
  const continuityPlan = leaveText_(input.continuityPlan, 1000);
  if (!reasonCategory || reasonDetails.length < 10 || continuityPlan.length < 10) throw new Error("Provide a reason and a learning continuity plan.");

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    ensureSheets(spreadsheet);
    const sheet = getSheet(spreadsheet, "LeaveRequests");
    const sequence = sheet.getLastRow();
    const now = new Date().toISOString();
    const record = {
      id: "leave-" + Utilities.getUuid(),
      reference: "LV-" + new Date().getFullYear() + "-" + String(sequence).padStart(4, "0"),
      requester_email: context.email,
      studentName: leaveStudentName_(spreadsheet, context.email),
      startDate: startDate,
      endDate: endDate,
      dayPortion: dayPortion,
      reasonCategory: reasonCategory,
      reasonDetails: reasonDetails,
      continuityPlan: continuityPlan,
      contactDuringLeave: leaveText_(input.contactDuringLeave, 160),
      status: "Pending coordinator review",
      coordinatorDecision: "",
      coordinatorComment: "",
      coordinatorBy: "",
      coordinatorAt: "",
      managerDecision: "",
      managerComment: "",
      managerBy: "",
      managerAt: "",
      submittedAt: now,
      updatedAt: now,
    };
    leaveAppend_(sheet, record);
    leaveNotify_(spreadsheet, "", "centre-coordinator", "Leave request awaiting review", record.studentName + " submitted " + record.reference + ".", record.id);
    return { ok: true, request: record };
  } finally {
    lock.releaseLock();
  }
}

function decideLeaveRequest(payload) {
  const context = portalSessionContext_(payload && payload.token);
  const stage = leaveText_(payload && payload.stage, 20);
  const allowedRoles = stage === "manager" ? ["manager", "super-admin"] : ["centre-coordinator", "super-admin"];
  if (!leaveHasRole_(context, allowedRoles)) throw new Error("Your assigned role cannot make this leave decision.");
  const decision = leaveText_(payload && payload.decision, 40);
  if (["Approved", "Returned for changes", "Rejected"].indexOf(decision) < 0) throw new Error("Choose a valid decision.");
  const comment = leaveText_(payload && payload.comment, 800);
  if (!comment) throw new Error("Add a concise decision note.");

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = getSheet(spreadsheet, "LeaveRequests");
    const rows = readJsonRecords(sheet);
    const index = rows.findIndex(function (row) { return row.id === payload.id; });
    if (index < 0) throw new Error("Leave request not found.");
    const record = rows[index];
    const now = new Date().toISOString();
    if (stage === "coordinator") {
      if (record.status !== "Pending coordinator review") throw new Error("This request is no longer awaiting coordinator review.");
      record.coordinatorDecision = decision;
      record.coordinatorComment = comment;
      record.coordinatorBy = context.email;
      record.coordinatorAt = now;
      record.status = decision === "Approved" ? "Pending Academic Manager approval" : decision;
      if (decision === "Approved") leaveNotify_(spreadsheet, "", "manager", "Leave request awaiting final approval", record.studentName + " · " + record.reference, record.id);
    } else {
      if (record.status !== "Pending Academic Manager approval") throw new Error("This request is not ready for final approval.");
      record.managerDecision = decision;
      record.managerComment = comment;
      record.managerBy = context.email;
      record.managerAt = now;
      record.status = decision;
    }
    record.updatedAt = now;
    rows[index] = record;
    writeJsonRecords(sheet, rows);
    leaveNotify_(spreadsheet, record.requester_email, "student", "Leave request updated", record.reference + " is now " + record.status + ".", record.id);
    return { ok: true, request: record };
  } finally {
    lock.releaseLock();
  }
}

function withdrawLeaveRequest(payload) {
  const context = portalSessionContext_(payload && payload.token);
  if (!leaveHasRole_(context, ["student"])) throw new Error("Only the requesting student can withdraw this request.");
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = getSheet(spreadsheet, "LeaveRequests");
    const rows = readJsonRecords(sheet);
    const index = rows.findIndex(function (row) { return row.id === payload.id; });
    if (index < 0) throw new Error("Leave request not found.");
    const record = rows[index];
    if (normalizeEmailAddress(record.requester_email) !== normalizeEmailAddress(context.email)) throw new Error("You can withdraw only your own request.");
    if (["Approved", "Rejected", "Withdrawn"].indexOf(record.status) >= 0) throw new Error("This request can no longer be withdrawn.");
    record.status = "Withdrawn";
    record.updatedAt = new Date().toISOString();
    rows[index] = record;
    writeJsonRecords(sheet, rows);
    return { ok: true, request: record };
  } finally {
    lock.releaseLock();
  }
}
