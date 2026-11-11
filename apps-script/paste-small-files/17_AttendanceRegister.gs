const ATTENDANCE_EDIT_ROLES = ["class-representative", "tutor"];
const ATTENDANCE_STAFF_ROLES = ["super-admin", "manager", "centre-coordinator", "head-tutor"];
const ATTENDANCE_STATUSES = ["Present", "Late", "Absent", "Excused absence", "Approved leave", "Not scheduled"];

function attendanceContext_(payload) {
  return portalSessionContext_(payload && payload.token);
}

function attendanceHasRole_(context, roles) {
  return (context.roles || []).some(function (role) { return roles.indexOf(role) >= 0; });
}

function attendanceRole_(context) {
  return (context.roles || []).filter(function (role) { return ATTENDANCE_EDIT_ROLES.concat(ATTENDANCE_STAFF_ROLES).indexOf(role) >= 0; })[0] || (context.roles || [])[0] || "student";
}

function attendanceKey_(date, period) {
  const value = String(date || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("Choose a valid attendance date.");
  if (["Morning", "Afternoon"].indexOf(period) < 0) throw new Error("Choose Morning or Afternoon.");
  return value + "::" + period;
}

function attendanceFind_(rows, id) {
  return rows.findIndex(function (row) { return row.id === id; });
}

function attendanceAudit_(spreadsheet, context, action, registerId, detail) {
  leaveAppend_(getSheet(spreadsheet, "AttendanceAudit"), { id: "attendance-audit-" + Utilities.getUuid(), registerId: registerId, action: action, actor_email: context.email, actor_role: attendanceRole_(context), detail: detail || "", created_at: new Date().toISOString() });
}

function attendanceApprovedLeave_(leaveRows, email, date, period) {
  return leaveRows.some(function (leave) {
    if (leave.status !== "Approved" || normalizeEmailAddress(leave.requester_email) !== normalizeEmailAddress(email)) return false;
    if (date < leave.startDate || date > leave.endDate) return false;
    return leave.dayPortion === "Whole day" || (period === "Morning" && leave.dayPortion === "Morning only") || (period === "Afternoon" && leave.dayPortion === "Afternoon only");
  });
}

function attendanceSeedEntries_(spreadsheet, registerId, date, period) {
  const students = readJsonRecords(getSheet(spreadsheet, "Students"));
  const leaveRows = readJsonRecords(getSheet(spreadsheet, "LeaveRequests"));
  return students.map(function (student) {
    const approvedLeave = attendanceApprovedLeave_(leaveRows, student.email, date, period);
    return { id: registerId + "::" + (student.id || student.email), registerId: registerId, studentId: student.id || "", student_email: student.email || "", studentName: student.name || student.email || "Student", status: approvedLeave ? "Approved leave" : "Present", arrivalTime: "", note: "", updatedAt: new Date().toISOString() };
  });
}

function attendanceActiveLock_(rows, registerId) {
  const now = Date.now();
  return rows.filter(function (row) { return row.registerId === registerId && new Date(row.expiresAt).getTime() > now; })[0] || null;
}

function attendancePublicLock_(lock) {
  return lock ? { id: lock.id, registerId: lock.registerId, lockedByEmail: lock.lockedByEmail, lockedByRole: lock.lockedByRole, lockedAt: lock.lockedAt, expiresAt: lock.expiresAt } : null;
}

function getAttendanceRegister(payload) {
  const context = attendanceContext_(payload);
  const key = attendanceKey_(payload.date, payload.period);
  const spreadsheet = getOrCreateSpreadsheet(); ensureSheets(spreadsheet);
  const registers = readJsonRecords(getSheet(spreadsheet, "AttendanceRegisters"));
  const register = registers.filter(function (row) { return row.id === key; })[0] || { id: key, reference: "ATT-" + payload.date.replace(/-/g, "") + "-" + payload.period.toUpperCase().slice(0, 2), date: payload.date, period: payload.period, workflowStatus: "Not started", classRepresentativeEmail: "", tutorEmail: "", createdAt: "", updatedAt: "" };
  let entries = readJsonRecords(getSheet(spreadsheet, "AttendanceEntries")).filter(function (row) { return row.registerId === key; });
  if (!entries.length) entries = attendanceSeedEntries_(spreadsheet, key, payload.date, payload.period);
  const elevated = attendanceHasRole_(context, ATTENDANCE_EDIT_ROLES.concat(ATTENDANCE_STAFF_ROLES));
  if (!elevated) entries = entries.filter(function (row) { return normalizeEmailAddress(row.student_email) === normalizeEmailAddress(context.email); });
  const lock = attendanceActiveLock_(readJsonRecords(getSheet(spreadsheet, "AttendanceLocks")), key);
  return { ok: true, register: register, entries: entries, lock: attendancePublicLock_(lock) };
}

function acquireAttendanceLock(payload) {
  const context = attendanceContext_(payload);
  if (!attendanceHasRole_(context, ATTENDANCE_EDIT_ROLES)) throw new Error("Only an assigned Class Representative or Tutor can edit attendance.");
  const role = attendanceRole_(context);
  const key = attendanceKey_(payload.date, payload.period);
  const lockGuard = LockService.getScriptLock(); lockGuard.waitLock(20000);
  try {
    const spreadsheet = getOrCreateSpreadsheet(); ensureSheets(spreadsheet);
    const registerSheet = getSheet(spreadsheet, "AttendanceRegisters");
    const registers = readJsonRecords(registerSheet);
    let register = registers.filter(function (row) { return row.id === key; })[0];
    if (!register) {
      register = { id: key, reference: "ATT-" + payload.date.replace(/-/g, "") + "-" + payload.period.toUpperCase().slice(0, 2), date: payload.date, period: payload.period, workflowStatus: "Not started", classRepresentativeEmail: "", tutorEmail: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      registers.push(register); writeJsonRecords(registerSheet, registers);
      writeJsonRecords(getSheet(spreadsheet, "AttendanceEntries"), readJsonRecords(getSheet(spreadsheet, "AttendanceEntries")).concat(attendanceSeedEntries_(spreadsheet, key, payload.date, payload.period)));
    }
    if (role === "class-representative") {
      if (register.classRepresentativeEmail && normalizeEmailAddress(register.classRepresentativeEmail) !== normalizeEmailAddress(context.email)) throw new Error("Another Class Representative is assigned to this register.");
      if (["Awaiting Tutor confirmation", "Tutor draft", "Submitted"].indexOf(register.workflowStatus) >= 0) throw new Error("The Class Representative stage is already complete.");
      register.classRepresentativeEmail = context.email;
    } else {
      if (register.tutorEmail && normalizeEmailAddress(register.tutorEmail) !== normalizeEmailAddress(context.email)) throw new Error("Another Tutor is assigned to this register.");
      if (register.workflowStatus !== "Awaiting Tutor confirmation" && register.workflowStatus !== "Tutor draft") throw new Error("The Class Representative must submit this register first.");
      register.tutorEmail = context.email;
    }
    register.updatedAt = new Date().toISOString(); writeJsonRecords(registerSheet, registers);
    const lockSheet = getSheet(spreadsheet, "AttendanceLocks");
    let locks = readJsonRecords(lockSheet).filter(function (row) { return new Date(row.expiresAt).getTime() > Date.now(); });
    const active = attendanceActiveLock_(locks, key);
    if (active && normalizeEmailAddress(active.lockedByEmail) !== normalizeEmailAddress(context.email)) throw new Error("This register is currently being edited by " + active.lockedByEmail + ".");
    locks = locks.filter(function (row) { return row.registerId !== key; });
    const now = new Date(); const expires = new Date(now.getTime() + 5 * 60 * 1000);
    const lock = { id: "attendance-lock-" + Utilities.getUuid(), registerId: key, lockedByEmail: context.email, lockedByRole: role, lockedAt: now.toISOString(), expiresAt: expires.toISOString() };
    locks.push(lock); writeJsonRecords(lockSheet, locks); attendanceAudit_(spreadsheet, context, "lock-acquired", key, role);
    return { ok: true, lock: attendancePublicLock_(lock) };
  } finally { lockGuard.releaseLock(); }
}

function attendanceRequireLock_(spreadsheet, context, payload) {
  const locks = readJsonRecords(getSheet(spreadsheet, "AttendanceLocks"));
  const lock = locks.filter(function (row) { return row.id === payload.lockId && normalizeEmailAddress(row.lockedByEmail) === normalizeEmailAddress(context.email) && new Date(row.expiresAt).getTime() > Date.now(); })[0];
  if (!lock) throw new Error("Your editing lock expired. Reopen the register before saving.");
  return lock;
}

function attendanceSave_(payload, submitMode) {
  const context = attendanceContext_(payload); const role = attendanceRole_(context);
  if (ATTENDANCE_EDIT_ROLES.indexOf(role) < 0) throw new Error("Your role cannot edit attendance.");
  const key = attendanceKey_(payload.date, payload.period);
  const guard = LockService.getScriptLock(); guard.waitLock(20000);
  try {
    const spreadsheet = getOrCreateSpreadsheet(); attendanceRequireLock_(spreadsheet, context, payload);
    const allEntries = readJsonRecords(getSheet(spreadsheet, "AttendanceEntries"));
    const incoming = Array.isArray(payload.entries) ? payload.entries : [];
    incoming.forEach(function (entry) {
      const index = allEntries.findIndex(function (row) { return row.registerId === key && (row.studentId || row.student_email) === (entry.studentId || entry.student_email); });
      if (index < 0) return;
      if (allEntries[index].status === "Approved leave") return;
      const status = ATTENDANCE_STATUSES.indexOf(entry.status) >= 0 ? entry.status : "Present";
      allEntries[index].status = status; allEntries[index].arrivalTime = String(entry.arrivalTime || "").slice(0, 5); allEntries[index].note = String(entry.note || "").trim().slice(0, 240); allEntries[index].updatedAt = new Date().toISOString();
    });
    writeJsonRecords(getSheet(spreadsheet, "AttendanceEntries"), allEntries);
    const registerSheet = getSheet(spreadsheet, "AttendanceRegisters"); const registers = readJsonRecords(registerSheet); const index = attendanceFind_(registers, key);
    if (index < 0) throw new Error("Attendance register not found.");
    if (submitMode === "class-representative") { if (role !== "class-representative") throw new Error("Only the assigned Class Representative can complete this stage."); registers[index].workflowStatus = "Awaiting Tutor confirmation"; registers[index].classRepresentativeSubmittedAt = new Date().toISOString(); }
    else if (submitMode === "tutor") { if (role !== "tutor") throw new Error("Only the assigned Tutor can submit the final register."); registers[index].workflowStatus = "Submitted"; registers[index].tutorSubmittedAt = new Date().toISOString(); }
    else registers[index].workflowStatus = role === "tutor" ? "Tutor draft" : "Class Representative draft";
    registers[index].updatedAt = new Date().toISOString(); writeJsonRecords(registerSheet, registers);
    attendanceAudit_(spreadsheet, context, submitMode ? "register-submitted-" + submitMode : "draft-saved", key, registers[index].workflowStatus);
    if (submitMode) releaseAttendanceLock({ token: payload.token, lockId: payload.lockId });
    return { ok: true, register: registers[index] };
  } finally { guard.releaseLock(); }
}

function saveAttendanceDraft(payload) { return attendanceSave_(payload, ""); }
function submitClassRepresentativeRegister(payload) { return attendanceSave_(payload, "class-representative"); }
function submitTutorRegister(payload) { return attendanceSave_(payload, "tutor"); }

function refreshAttendanceLock(payload) {
  const context = attendanceContext_(payload); const spreadsheet = getOrCreateSpreadsheet(); const sheet = getSheet(spreadsheet, "AttendanceLocks"); const rows = readJsonRecords(sheet); const index = rows.findIndex(function (row) { return row.id === payload.lockId && normalizeEmailAddress(row.lockedByEmail) === normalizeEmailAddress(context.email); });
  if (index < 0) throw new Error("Attendance lock not found."); rows[index].expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); writeJsonRecords(sheet, rows); return { ok: true, lock: attendancePublicLock_(rows[index]) };
}

function releaseAttendanceLock(payload) {
  const context = attendanceContext_(payload); const spreadsheet = getOrCreateSpreadsheet(); const sheet = getSheet(spreadsheet, "AttendanceLocks"); const rows = readJsonRecords(sheet); const keep = rows.filter(function (row) { return !(row.id === payload.lockId && normalizeEmailAddress(row.lockedByEmail) === normalizeEmailAddress(context.email)); }); writeJsonRecords(sheet, keep); return { ok: true };
}

function reopenAttendanceRegister(payload) {
  const context = attendanceContext_(payload); if (!attendanceHasRole_(context, ["super-admin", "manager", "centre-coordinator"])) throw new Error("Your role cannot reopen attendance registers.");
  const reason = String(payload.reason || "").trim().slice(0, 500); if (!reason) throw new Error("A reopening reason is required."); const spreadsheet = getOrCreateSpreadsheet(); const sheet = getSheet(spreadsheet, "AttendanceRegisters"); const rows = readJsonRecords(sheet); const index = attendanceFind_(rows, payload.id); if (index < 0) throw new Error("Attendance register not found."); rows[index].workflowStatus = "Reopened"; rows[index].updatedAt = new Date().toISOString(); writeJsonRecords(sheet, rows); attendanceAudit_(spreadsheet, context, "register-reopened", payload.id, reason); return { ok: true, register: rows[index] };
}
