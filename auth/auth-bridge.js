(() => {
  const validRoles = new Set([
    "super-admin",
    "manager",
    "centre-coordinator",
    "head-tutor",
    "lecturer",
    "tutor",
    "student",
    "aims-ric-support",
    "support-counsellor",
    "it-support",
    "viewer",
  ]);

  const authState = {
    status: "unconfigured",
    provider: "firebase",
    user: null,
    error: null,
    async createAccount() {
      throw new Error("Firebase email/password login is not configured yet.");
    },
    async signIn() {
      throw new Error("Firebase email/password login is not configured yet.");
    },
    async signInWithGoogle() {
      throw new Error("Google sign-in is not configured yet.");
    },
    async resetPassword() {
      throw new Error("Firebase email/password login is not configured yet.");
    },
    async signOut() {},
  };

  window.mathepiAuth = authState;

  function publish(status, patch = {}) {
    Object.assign(authState, patch, { status });
    window.dispatchEvent(new CustomEvent("mathepi-auth-changed", { detail: authState }));
    if (typeof window.render === "function") window.render();
  }

  function isConfigured(config) {
    return !!(
      config &&
      config.apiKey &&
      config.projectId &&
      config.appId &&
      !String(config.apiKey).startsWith("PASTE_") &&
      !String(config.projectId).startsWith("PASTE_") &&
      !String(config.appId).startsWith("PASTE_")
    );
  }

  function rolesFromClaims(claims = {}, email = "") {
    if (String(email).trim().toLowerCase() === "couma@aimsric.org") return ["super-admin", "manager"];
    const claimed = Array.isArray(claims.roles) ? claims.roles : [];
    const legacy = claims.role || claims.mathepiRole || claims.mathepi_role;
    const roles = [...new Set([...claimed, legacy].filter((role) => validRoles.has(role)))];
    return roles.length ? roles : ["viewer"];
  }

  function allowedEmail(email) {
    const domains = Array.isArray(window.MATHEPI_ALLOWED_EMAIL_DOMAINS)
      ? window.MATHEPI_ALLOWED_EMAIL_DOMAINS
      : ["aimsric.org"];
    const normalized = String(email || "").trim().toLowerCase();
    const emails = Array.isArray(window.MATHEPI_ALLOWED_EMAILS)
      ? window.MATHEPI_ALLOWED_EMAILS.map((item) => String(item).trim().toLowerCase())
      : [];
    return emails.includes(normalized) || domains.some((domain) => normalized.endsWith(`@${String(domain).trim().toLowerCase()}`));
  }

  window.mathepiEmailAllowed = allowedEmail;

  async function startFirebaseAuth(config) {
    publish("loading", { error: null });
    try {
      const [{ initializeApp }, authModule] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
      ]);
      const {
        browserLocalPersistence,
        getAuth,
        getRedirectResult,
        GoogleAuthProvider,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup,
        signInWithRedirect,
        signOut,
      } = authModule;
      const app = initializeApp(config);
      const auth = getAuth(app);
      await setPersistence(auth, browserLocalPersistence);
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: "select_account", hd: "aimsric.org" });

      authState.signInWithGoogle = async () => {
        try {
          publish("loading", { error: null });
          return await signInWithPopup(auth, googleProvider);
        } catch (error) {
          if (["auth/popup-blocked", "auth/operation-not-supported-in-this-environment"].includes(error?.code)) {
            return signInWithRedirect(auth, googleProvider);
          }
          publish("ready", { error: error?.message || "Google sign-in failed." });
          throw error;
        }
      };
      authState.signOut = () => signOut(auth);
      try {
        await getRedirectResult(auth);
      } catch (error) {
        publish("ready", { error: error?.message || "Google sign-in could not return to MathEpi." });
      }

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          publish("ready", { user: null, error: authState.error || null });
          return;
        }
        try {
          if (!allowedEmail(firebaseUser.email)) {
            const message = "This email is not approved for MathEpi access.";
            publish("ready", { user: null, error: message });
            await signOut(auth);
            return;
          }
          const token = await firebaseUser.getIdTokenResult(false);
          const roles = rolesFromClaims(token.claims, firebaseUser.email).filter((role) => role !== "viewer");
          const role = roles[0] || null;
          publish("ready", {
            error: null,
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email,
              idToken: token.token,
              role,
              roles,
            },
          });
          if (typeof window.handleFirebaseAuthChanged === "function") window.handleFirebaseAuthChanged(authState.user);
        } catch (error) {
          publish("ready", {
            user: null,
            error: error?.code === "auth/network-request-failed"
              ? "Google signed you in, but Firebase could not finish verification. Check your connection and try again."
              : error?.message || "Google sign-in could not be verified.",
          });
        }
      });
    } catch (error) {
      publish("error", { error: error.message || "Firebase login could not start." });
    }
  }

  const config = window.MATHEPI_FIREBASE_CONFIG;
  if (isConfigured(config)) startFirebaseAuth(config);
  else publish("unconfigured", { error: null });
})();
