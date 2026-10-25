const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("programme dates match the approved 2026/27 calendar", () => {
  const app = read("app.js");
  assert.match(app, /"start": "2026-10-26"/);
  assert.match(app, /"end": "2027-05-14"/);
  assert.match(app, /"start": "2027-05-31"/);
  assert.match(app, /MES02: \{ lecturerName: "Prof\. Faraimunashe Chirove"/);
  assert.match(app, /MEE04: \{ lecturerName: "Prof\. Aklilu Zeleke"/);
});

test("review authorization is enforced for every applicant record", () => {
  const reviews = read("apps-script/paste-small-files/10_TutorialFellowReviews.gs");
  assert.match(reviews, /function requireReviewerApplicationAccess_/);
  assert.match(reviews, /scores: filterVisible/);
  assert.match(reviews, /analyses: filterVisible/);
  assert.match(reviews, /notes: filterVisible/);
  assert.doesNotMatch(reviews, /identity\.indexOf\("cecil"\)/);
});

test("application submissions enforce identity, file, and spreadsheet safety", () => {
  const lecturer = read("apps-script/paste-small-files/04_LecturerApplications.gs");
  const tutorial = read("apps-script/paste-small-files/07_TutorialFellowApplications.gs");
  const records = read("apps-script/paste-small-files/06_Records.gs");
  assert.match(lecturer, /requireEmailVerification\(payload\.emailVerification, application\.email, "lecturer"\)/);
  assert.match(lecturer, /validateApplicationFile_/);
  assert.match(tutorial, /function validateApplicationFile_/);
  assert.match(tutorial, /maxBytes: 5 \* 1024 \* 1024/);
  assert.match(records, /function safeSheetValue_/);
});

test("review portal credentials are sent in POST bodies", () => {
  const routes = read("apps-script/paste-small-files/01_Routes.gs");
  const tfReviews = read("tf-reviews/index.html");
  const lecturerReviews = read("lecturer-reviews/index.html");
  const app = read("app.js");
  assert.match(tfReviews, /method: "POST"/);
  assert.match(lecturerReviews, /method: "POST"/);
  assert.doesNotMatch(tfReviews, /"payload=" \+ encodeURIComponent/);
  assert.doesNotMatch(lecturerReviews, /script\.src = endpoint/);
  assert.doesNotMatch(app, /return googleJsonpApi\(endpoint, action, payload\)/);
  assert.match(routes, /API actions must use POST/);
});

test("Tutorial Fellow submission only shows success after backend confirmation", () => {
  const form = read("cfa/tutorial-fellow-application.html");
  assert.match(form, /result\.success !== true/);
  assert.match(form, /We could not deliver your application to AIMS/);
  assert.match(form, /successfully received by AIMS/);
});

test("operational routes enforce approved roles", () => {
  const routes = read("apps-script/paste-small-files/01_Routes.gs");
  const access = read("apps-script/paste-small-files/12_PortalAccess.gs");
  const authorization = read("apps-script/paste-small-files/15_Authorization.gs");
  assert.match(routes, /authorizePortalAction_\(action, payload\)/);
  assert.match(authorization, /requirePermission_\(payload && payload\.token/);
  assert.match(authorization, /roleFilteredBootstrap_/);
  assert.match(access, /status !== "approved"/);
  assert.match(access, /Your assigned role cannot perform this action/);
});

test("production UI exposes installation, offline, and accessible status feedback", () => {
  const app = read("app.js");
  assert.match(app, /Install MathEpi/);
  assert.match(app, /Offline\. Live changes will not save/);
  assert.match(app, /aria-live="polite"/);
  assert.doesNotMatch(app, /<h2>Email Accounts<\/h2>/);
});

test("role access is summarized and backend enforced", () => {
  const app = read("app.js");
  assert.match(app, /\{ id: "students", label: "Students"/);
  assert.match(app, /function renderStudents\(\)/);
  assert.match(app, /<h2>Role access policy<\/h2>/);
  assert.match(app, /Backend enforced/);
  assert.match(app, /You do not have access to that protected area/);
  assert.doesNotMatch(app, /safeStorageSet\("mathepi-people"/);
  assert.doesNotMatch(app, /safeStorageSet\("mathepi-students"/);
  assert.match(app, /<th>Edit data<\/th>/);
});

test("ticket notifications and study-group calendar integration are wired", () => {
  const app = read("app.js");
  const routes = read("apps-script/paste-small-files/01_Routes.gs");
  const calendar = read("apps-script/paste-small-files/11_ProgrammeCalendar.gs");
  assert.match(app, /IT-\$\{new Date\(\)\.getFullYear\(\)\}/);
  assert.match(app, /function notificationsDrawer/);
  assert.match(app, /studyGroupMeetings\.unshift/);
  assert.match(routes, /createItTicket/);
  assert.match(calendar, /study-group::/);
});

test("Pi community answers are wired and role-gated", () => {
  const app = read("app.js");
  const routes = read("apps-script/paste-small-files/01_Routes.gs");
  const pi = read("apps-script/paste-small-files/14_PiKnowledge.gs");
  for (const action of ["piSubmitQuestion", "piListQuestions", "piAnswerQuestion", "piListFaq"]) {
    assert.match(routes, new RegExp(`action === "${action}"`));
    assert.match(app, new RegExp(`"${action}"`));
  }
  assert.match(pi, /function piSubmitQuestion[\s\S]*?portalRequireRoles_\(payload\.token, \[\]\)/);
  assert.match(pi, /function piAnswerQuestion[\s\S]*?portalRequireRoles_\(payload\.token, PI_ANSWER_ROLES\)/);
  assert.match(read("sw.js"), /KEEP_CACHES = \["transformers-cache"\]/);
});
