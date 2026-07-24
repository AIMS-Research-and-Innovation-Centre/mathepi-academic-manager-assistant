function doGet(e) {
  try {
    const action = e && e.parameter && e.parameter.action;
    if (action) {
      const payload = e.parameter.payload ? JSON.parse(e.parameter.payload) : e.parameter;
      return routeResponse(apiPost({ action, payload }), e);
    }
    return HtmlService.createHtmlOutput(
      "<h1>MathEpi Apps Script Backend</h1><p>Deploy this Web App URL into the MathEpi portal Sheets & Drive settings.</p>",
    );
  } catch (error) {
    return routeResponse(routeErrorResponse(error), e);
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
  if (action === "diagnoseEmailOtp") return diagnoseEmailOtp(payload);
  if (action === "requestEmailOtp") return requestEmailOtp(payload);
  if (action === "verifyEmailOtp") return verifyEmailOtp(payload);
  if (action === "requestReviewerOtp") return requestReviewerOtp(payload);
  if (action === "verifyReviewerOtp") return verifyReviewerOtp(payload);
  if (action === "getReviewerSession") return getReviewerSession(payload);
  if (action === "listReviewApplicants") return listReviewApplicants(payload);
  if (action === "saveReviewScore") return saveReviewScore(payload);
  if (action === "saveReviewAnalysis") return saveReviewAnalysis(payload);
  if (action === "saveReviewNote") return saveReviewNote(payload);
  if (action === "withdrawReviewNote") return withdrawReviewNote(payload);
  if (action === "updateReviewStage") return updateReviewStage(payload);
  if (action === "saveEligibilityDecision") return saveEligibilityDecision(payload);
  if (action === "exportReviewAudit") return exportReviewAudit(payload);
  if (action === "submitLecturerApplication") return submitLecturerApplication(payload);
  if (action === "recoverLecturerApplication") return recoverLecturerApplication(payload);
  if (action === "backfillLecturerApplicationColumns") return backfillLecturerApplicationColumns(payload);
  if (action === "submitTutorialFellowApplication") return submitTutorialFellowApplication(payload);
  throw new Error("Unknown action: " + action);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function routeErrorResponse(error) {
  return { ok: false, error: error && error.message ? error.message : String(error || "Unknown Apps Script error.") };
}

function routeResponse(data, e) {
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) return jsonpResponse(callback, data);
  return jsonResponse(data);
}

function jsonpResponse(callback, data) {
  const name = String(callback || "");
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(name)) {
    return jsonResponse({ ok: false, error: "Invalid callback name." });
  }
  const body = `${name}(${JSON.stringify(data).replace(/</g, "\\u003c")});`;
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
