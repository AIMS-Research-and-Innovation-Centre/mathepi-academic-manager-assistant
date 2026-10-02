const PROGRAMME_CALENDAR_TRIGGER = "syncProgrammeCalendarFromSheets";
const PROGRAMME_CALENDAR_TIMEZONE = "Africa/Kigali";

function syncProgrammeCalendar(payload) {
  const spreadsheet = getOrCreateSpreadsheet();
  ensureSheets(spreadsheet);
  if (payload && payload.datasets) writeDatasets(spreadsheet, payload.datasets);
  return syncProgrammeCalendarData(payload && payload.datasets, spreadsheet);
}

function syncProgrammeCalendarFromSheets() {
  return syncProgrammeCalendarData(null, getOrCreateSpreadsheet());
}

function tryProgrammeCalendarSync(payload, spreadsheet) {
  try {
    return syncProgrammeCalendarData(payload && payload.datasets, spreadsheet);
  } catch (error) {
    return { ok: false, error: error && error.message ? error.message : String(error) };
  }
}

function getProgrammeCalendarStatus() {
  const props = PropertiesService.getScriptProperties();
  const calendarId = props.getProperty(MATHEPI.properties.calendarId) || "";
  const calendar = calendarId ? CalendarApp.getCalendarById(calendarId) : null;
  return {
    ok: true,
    connected: !!calendar,
    calendarId: calendar ? calendar.getId() : "",
    calendarName: calendar ? calendar.getName() : MATHEPI.calendarName,
    calendarUrl: calendar ? programmeCalendarUrl(calendar.getId()) : "",
    lastSyncedAt: props.getProperty("MATHEPI_PROGRAMME_CALENDAR_SYNCED_AT") || "",
    eventCount: Number(props.getProperty("MATHEPI_PROGRAMME_CALENDAR_EVENT_COUNT") || 0),
  };
}

function syncProgrammeCalendarData(datasets, spreadsheet) {
  const data = datasets || {
    CalendarBlocks: readJsonRecords(getSheet(spreadsheet, "CalendarBlocks")),
    Courses: readJsonRecords(getSheet(spreadsheet, "Courses")),
    Sessions: readJsonRecords(getSheet(spreadsheet, "Sessions")),
    StudyGroupMeetings: readJsonRecords(getSheet(spreadsheet, "StudyGroupMeetings")),
  };
  const blocks = data.CalendarBlocks || [];
  const courses = data.Courses || [];
  const sessions = data.Sessions || [];
  const groupMeetings = data.StudyGroupMeetings || [];
  if (!blocks.length || !courses.length) throw new Error("Calendar blocks and courses must be synced before creating Google Calendar events.");

  const calendar = getOrCreateProgrammeCalendar();
  removeProgrammeCalendarTriggers_();
  const ledgerSheet = getSheet(spreadsheet, "CalendarSyncEvents");
  ensureSheetHeaders(ledgerSheet, TAB_HEADERS.CalendarSyncEvents);
  const existing = readCalendarSyncLedger(ledgerSheet);
  const desired = buildProgrammeCalendarEvents(blocks, courses, sessions, groupMeetings);
  clearProgrammeCalendarEvents_(calendar);
  const retained = {};
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  desired.forEach((item) => {
    const event = createProgrammeCalendarEvent(calendar, item);
    retained[item.sync_key] = {
      sync_key: item.sync_key,
      event_id: event.getId(),
      fingerprint: item.fingerprint,
      event_date: item.event_date,
      updated_at: new Date().toISOString(),
    };
    created += 1;
  });

  let removed = 0;
  Object.keys(existing).forEach((key) => {
    if (retained[key]) return;
    deleteCalendarEvent(calendar, existing[key].event_id);
    removed += 1;
  });
  writeCalendarSyncLedger(ledgerSheet, Object.keys(retained).sort().map((key) => retained[key]));

  const syncedAt = new Date().toISOString();
  const props = PropertiesService.getScriptProperties();
  props.setProperty("MATHEPI_PROGRAMME_CALENDAR_SYNCED_AT", syncedAt);
  props.setProperty("MATHEPI_PROGRAMME_CALENDAR_EVENT_COUNT", String(desired.length));
  return {
    ok: true,
    connected: true,
    calendarId: calendar.getId(),
    calendarName: calendar.getName(),
    calendarUrl: programmeCalendarUrl(calendar.getId()),
    lastSyncedAt: syncedAt,
    eventCount: desired.length,
    created: created,
    updated: updated,
    removed: removed,
    unchanged: unchanged,
  };
}

function getOrCreateProgrammeCalendar() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(MATHEPI.properties.calendarId);
  if (existingId) {
    const existing = CalendarApp.getCalendarById(existingId);
    if (existing) return existing;
    props.deleteProperty(MATHEPI.properties.calendarId);
  }
  const matches = CalendarApp.getCalendarsByName(MATHEPI.calendarName);
  const calendar = matches.length ? matches[0] : CalendarApp.createCalendar(MATHEPI.calendarName, {
    summary: "Live teaching timetable for the MathEpi 2026-2027 programme.",
    timeZone: PROGRAMME_CALENDAR_TIMEZONE,
  });
  props.setProperty(MATHEPI.properties.calendarId, calendar.getId());
  return calendar;
}

function ensureProgrammeCalendarTrigger() {
  const exists = ScriptApp.getProjectTriggers().some((trigger) => trigger.getHandlerFunction() === PROGRAMME_CALENDAR_TRIGGER);
  if (!exists) ScriptApp.newTrigger(PROGRAMME_CALENDAR_TRIGGER).timeBased().everyMinutes(15).create();
}

function removeProgrammeCalendarTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === PROGRAMME_CALENDAR_TRIGGER) ScriptApp.deleteTrigger(trigger);
  });
}

function clearProgrammeCalendarEvents_(calendar) {
  const start = new Date("2025-01-01T00:00:00Z");
  const end = new Date("2029-12-31T23:59:59Z");
  calendar.getEvents(start, end).forEach(function (event) { event.deleteEvent(); });
}

function buildProgrammeCalendarEvents(blocks, courses, sessions, groupMeetings) {
  const blockMap = {};
  const courseMap = {};
  blocks.forEach((block) => { blockMap[String(block.id || block.block_id || "")] = block; });
  courses.forEach((course) => { courseMap[String(course.code || course.id || "").toUpperCase()] = course; });
  const events = [];

  sessions.forEach((session) => {
    const block = blockMap[String(session.blockId || session.block_id || "")];
    const code = String(session.courseCode || session.course_code || "").toUpperCase();
    const course = courseMap[code];
    if (!block || !course || !block.start || !block.end || !session.day || !session.time) return;
    const deliveryStart = course.deliveryStart || course.delivery_start || block.start;
    const deliveryEnd = course.deliveryEnd || course.delivery_end || block.end;
    datesForWeekday(deliveryStart, deliveryEnd, session.day).forEach((date) => {
      const start = dateAtTime(date, session.time);
      const end = new Date(start.getTime() + Number(session.duration || 2) * 60 * 60 * 1000);
      const lecturers = course.lecturerName || "To be confirmed";
      const alternates = course.alternateLecturerName || "";
      const tutors = (course.reviewTutorNames || []).join(", ");
      const description = [
        course.outcomes || course.description || "",
        "Lecturer: " + lecturers,
        alternates ? "Alternate: " + alternates : "",
        tutors ? "Tutor(s): " + tutors : "",
        "Block: " + (block.title || block.id || ""),
        "Synced automatically from the MathEpi Academic Manager.",
      ].filter(Boolean).join("\n\n");
      const item = {
        sync_key: "session::" + String(session.id || code + "-" + session.day + "-" + session.time) + "::" + formatProgrammeDate(date),
        title: code + " " + course.title + " - " + (session.type || "Class"),
        start: start,
        end: end,
        location: session.room || "",
        description: description,
        event_date: formatProgrammeDate(date),
        all_day: false,
      };
      item.fingerprint = programmeCalendarFingerprint(item);
      events.push(item);
    });
  });

  blocks.filter((block) => block.kind && block.kind !== "teaching").forEach((block) => {
    if (!block.start || !block.end) return;
    const item = {
      sync_key: "block::" + String(block.id || block.title),
      title: block.title || "MathEpi programme milestone",
      start: programmeDate(block.start),
      end: addProgrammeDays(programmeDate(block.end), 1),
      location: "",
      description: [block.note || "", "Synced automatically from the MathEpi Academic Manager."].filter(Boolean).join("\n\n"),
      event_date: String(block.start),
      all_day: true,
    };
    item.fingerprint = programmeCalendarFingerprint(item);
    events.push(item);
  });
  (groupMeetings || []).filter((meeting) => meeting.date && meeting.time && meeting.status !== "Cancelled").forEach((meeting) => {
    const start = dateAtTime(programmeDate(meeting.date), meeting.time);
    const end = new Date(start.getTime() + Number(meeting.duration || 90) * 60 * 1000);
    const item = {
      sync_key: "study-group::" + String(meeting.id || meeting.groupId + "-" + meeting.date + "-" + meeting.time),
      title: "Study group: " + String(meeting.title || meeting.courseCode || "MathEpi"),
      start: start,
      end: end,
      location: meeting.location || "",
      description: [meeting.objective || "", meeting.courseCode ? "Course: " + meeting.courseCode : "", "Created from the MathEpi Study Groups workspace."].filter(Boolean).join("\n\n"),
      event_date: formatProgrammeDate(start),
      all_day: false,
    };
    item.fingerprint = programmeCalendarFingerprint(item);
    events.push(item);
  });
  return events;
}

function createProgrammeCalendarEvent(calendar, item) {
  if (item.all_day) return calendar.createAllDayEvent(item.title, item.start, item.end, { description: item.description });
  return calendar.createEvent(item.title, item.start, item.end, { description: item.description, location: item.location });
}

function calendarEventExists(calendar, eventId) {
  if (!eventId) return false;
  try { return !!calendar.getEventById(eventId); } catch (error) { return false; }
}

function deleteCalendarEvent(calendar, eventId) {
  if (!eventId) return;
  try {
    const event = calendar.getEventById(eventId);
    if (event) event.deleteEvent();
  } catch (error) {}
}

function readCalendarSyncLedger(sheet) {
  const rows = readSheetObjects(sheet);
  const result = {};
  rows.forEach((row) => { if (row.sync_key) result[row.sync_key] = row; });
  return result;
}

function writeCalendarSyncLedger(sheet, rows) {
  clearBody(sheet);
  if (!rows.length) return;
  const headers = TAB_HEADERS.CalendarSyncEvents;
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows.map((row) => headers.map((header) => row[header] || "")));
}

function datesForWeekday(startValue, endValue, dayName) {
  const target = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(String(dayName));
  if (target < 0) return [];
  const current = programmeDate(startValue);
  const end = programmeDate(endValue);
  while (current.getDay() !== target && current <= end) current.setDate(current.getDate() + 1);
  const dates = [];
  while (current <= end) {
    dates.push(new Date(current.getTime()));
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

function programmeDate(value) {
  const parts = String(value).slice(0, 10).split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function dateAtTime(date, time) {
  const parts = String(time).split(":").map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), parts[0] || 0, parts[1] || 0, 0, 0);
}

function addProgrammeDays(date, days) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

function formatProgrammeDate(date) {
  return Utilities.formatDate(date, PROGRAMME_CALENDAR_TIMEZONE, "yyyy-MM-dd");
}

function programmeCalendarFingerprint(item) {
  const raw = [item.title, item.start.toISOString(), item.end.toISOString(), item.location, item.description, item.all_day].join("|");
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw)).replace(/=+$/, "");
}

function programmeCalendarUrl(calendarId) {
  return "https://calendar.google.com/calendar/u/0?cid=" + encodeURIComponent(calendarId);
}
