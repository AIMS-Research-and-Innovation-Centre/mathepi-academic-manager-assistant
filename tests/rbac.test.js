const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.resolve(__dirname, "../apps-script/paste-small-files/15_Authorization.gs"), "utf8");
const context = {
  normalizeEmailAddress: (value) => String(value || "").trim().toLowerCase(),
  portalRequireRoles_: () => ({ email: "student@aimsric.org", access: { roles_json: '["student"]' }, expires: "2099-01-01" }),
  DATASET_TABS: [],
};
vm.createContext(context);
vm.runInContext(`${source}\nthis.rbac = { portalPermissionsForRoles_, portalAllowedViewsForRoles_, portalHasPermission_, filterDatasetRowsForSession_ };`, context);

test("students never receive application or review views", () => {
  const views = context.rbac.portalAllowedViewsForRoles_(["student"]);
  assert.equal(views.includes("cfa"), false);
  assert.equal(views.includes("lecturer-reviews"), false);
  assert.equal(views.includes("tf-reviews"), false);
});

test("centre coordinators cannot manage applications", () => {
  const permissions = context.rbac.portalPermissionsForRoles_(["centre-coordinator"]);
  assert.equal(permissions.includes("applications.read"), false);
  assert.equal(permissions.includes("reviews.read-all"), false);
});

test("personal records are filtered to the signed-in account", () => {
  const rows = [
    { id: "mine", owner_email: "student@aimsric.org" },
    { id: "other", owner_email: "other@aimsric.org" },
  ];
  const result = context.rbac.filterDatasetRowsForSession_("StudentPlanner", rows, { email: "student@aimsric.org", roles: ["student"] });
  assert.deepEqual(result.map((row) => row.id), ["mine"]);
});
