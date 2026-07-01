function authorizeEmailOtp() {
  return MailApp.getRemainingDailyQuota();
}

function requestEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const cache = CacheService.getScriptCache();
    const rateKey = emailOtpCacheKey("rate", purpose, email);
    if (cache.get(rateKey)) {
      return { ok: false, error: "Please wait about one minute before requesting another code." };
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresInSeconds = 10 * 60;
    const challenge = {
      email,
      purpose,
      codeHash: emailOtpHash(email, purpose, code),
      attempts: 0,
      expiresAt: Date.now() + expiresInSeconds * 1000,
    };

    cache.put(emailOtpCacheKey("challenge", purpose, email), JSON.stringify(challenge), expiresInSeconds);
    cache.put(rateKey, "1", 60);
    MailApp.sendEmail({
      to: email,
      subject: "Your MathEpi application verification code",
      body: "Your MathEpi application verification code is: " + code +
        "\n\nThis code expires in 10 minutes. If you did not request it, you can ignore this email.",
    });
    return { ok: true, email, expiresInSeconds };
  } catch (error) {
    return emailOtpErrorResponse(error);
  }
}

function verifyEmailOtp(payload) {
  try {
    payload = payload || {};
    const email = normalizeEmailAddress(payload.email);
    const purpose = otpPurpose(payload);
    const code = String(payload.code || "").trim();
    if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit verification code.");

    const cache = CacheService.getScriptCache();
    const challengeKey = emailOtpCacheKey("challenge", purpose, email);
    const rawChallenge = cache.get(challengeKey);
    if (!rawChallenge) throw new Error("This verification code has expired. Request a new code.");

    const challenge = JSON.parse(rawChallenge);
    const remainingSeconds = Math.max(1, Math.ceil((challenge.expiresAt - Date.now()) / 1000));
    if (remainingSeconds <= 1) {
      cache.remove(challengeKey);
      throw new Error("This verification code has expired. Request a new code.");
    }
    if (challenge.attempts >= 5) {
      cache.remove(challengeKey);
      throw new Error("Too many verification attempts. Request a new code.");
    }
    if (challenge.codeHash !== emailOtpHash(email, purpose, code)) {
      challenge.attempts += 1;
      cache.put(challengeKey, JSON.stringify(challenge), remainingSeconds);
      throw new Error("The verification code is incorrect.");
    }

    const token = Utilities.getUuid() + "-" + Utilities.getUuid();
    const verified = { email, purpose, verifiedAt: new Date().toISOString() };
    cache.remove(challengeKey);
    cache.put(emailOtpCacheKey("verified", purpose, token), JSON.stringify(verified), 6 * 60 * 60);
    return { ok: true, email, verificationToken: token, expiresInSeconds: 6 * 60 * 60 };
  } catch (error) {
    return emailOtpErrorResponse(error);
  }
}

function emailOtpErrorResponse(error) {
  return { ok: false, error: error && error.message ? error.message : String(error || "Email verification failed.") };
}
