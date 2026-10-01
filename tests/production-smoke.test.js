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
  assert.match(app, /MES02: \{ lecturerName: "Prof\. Blaise Tchapnda"/);
  assert.match(app, /MEE04: \{ lecturerName: "Prof\. Aklilu Zeleke"/);
});

test("operational routes enforce approved roles", () => {
  const routes = read("apps-script/paste-small-files/01_Routes.gs");
  const access = read("apps-script/paste-small-files/12_PortalAccess.gs");
  assert.match(routes, /managerActions/);
  assert.match(routes, /portalRequireRoles_\(payload\.token/);
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
