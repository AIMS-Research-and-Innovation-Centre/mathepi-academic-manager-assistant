function doGet(e) {
  try {
    const action = e && e.parameter && e.parameter.action;
    if (action) {
      const payload = e.parameter.payload ? JSON.parse(e.parameter.payload) : e.parameter;
      return jsonResponse(apiPost({ action, payload }));
    }
    return HtmlService.createHtmlOutput(
      "<h1>MathEpi Apps Script Backend</h1><p>Deploy this Web App URL into the MathEpi portal Sheets & Drive settings.</p>",
    );
  } catch (error) {
    return jsonResponse(routeErrorResponse(error));
  }
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    return jsonResponse(apiPost(parseRouteRequestBody(body)));
  } catch (error) {
    return jsonResponse(routeErrorResponse(error));
  }
}

function parseRouteRequestBody(body) {
  try {
    return JSON.parse(body || "{}");
  } catch (error) {
    throw new Error("The Apps Script backend could not read this request. Refresh the application page and try again.");
  }
}

function apiPost(request) {
  const action = request && request.action;
  const payload = (request && request.payload) || {};
  if (action === "setupWorkspace") return setupWorkspace(payload);
  if (action === "saveSnapshot") return saveSnapshot(payload);
  if (action === "getBootstrap") return getBootstrap();
  if (action === "updateCfaStatus") return updateCfaStatus(payload);
  if (action === "getCfaStatus") return getCfaStatus(payload);
  if (action === "requestEmailOtp") return requestEmailOtp(payload);
  if (action === "verifyEmailOtp") return verifyEmailOtp(payload);
  if (action === "submitLecturerApplication") return submitLecturerApplication(payload);
  if (action === "submitTutorialFellowApplication") return submitTutorialFellowApplication(payload);
  throw new Error("Unknown action: " + action);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function routeErrorResponse(error) {
  return { ok: false, error: error && error.message ? error.message : String(error || "Unknown Apps Script error.") };
}
