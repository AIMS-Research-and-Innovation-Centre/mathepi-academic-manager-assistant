function requireEmailVerification(verification, email, purpose) {
  const verifiedEmail = normalizeEmailAddress(email);
  const token = verification && verification.token;
  if (!token) throw new Error("Email verification is required before this application can be submitted.");
  const raw = CacheService.getScriptCache().get(emailOtpCacheKey("verified", purpose, token));
  if (!raw) throw new Error("Email verification has expired. Please verify your email again.");
  const record = JSON.parse(raw);
  if (record.email !== verifiedEmail || record.purpose !== purpose) {
    throw new Error("Email verification does not match this application.");
  }
  return record;
}

function normalizeEmailAddress(email) {
  const value = String(email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("A valid email address is required.");
  return value;
}

function otpPurpose(payload) {
  const value = String((payload && payload.purpose) || "tutorial-fellow").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return value || "tutorial-fellow";
}

function emailOtpCacheKey(prefix, purpose, value) {
  return ["mathepi", "otp", prefix, purpose, Utilities.base64EncodeWebSafe(String(value)).replace(/=+$/g, "")].join(":").slice(0, 240);
}

function emailOtpHash(email, purpose, code) {
  const secret = emailOtpSecret();
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [email, purpose, code, secret].join("|"));
  return Utilities.base64EncodeWebSafe(bytes);
}

function emailOtpSecret() {
  const props = PropertiesService.getScriptProperties();
  const key = "MATHEPI_EMAIL_OTP_SECRET";
  let secret = props.getProperty(key);
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid();
    props.setProperty(key, secret);
  }
  return secret;
}
