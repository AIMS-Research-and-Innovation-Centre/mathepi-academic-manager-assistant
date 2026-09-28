(() => {
  const validRoles = new Set([
    "super-admin",
    "manager",
    "centre-coordinator",
    "head-tutor",
    "lecturer",
    "tutor",
    "student",
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

  function rolesFromClaims(claims = {}) {
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
        createUserWithEmailAndPassword,
        getAuth,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut,
      } = authModule;
      const app = initializeApp(config);
      const auth = getAuth(app);

      authState.createAccount = (email, password) => {
        if (!allowedEmail(email)) return Promise.reject(new Error("Use an approved MathEpi account email."));
        return createUserWithEmailAndPassword(auth, email, password);
      };
      authState.signIn = (email, password) => {
        if (!allowedEmail(email)) return Promise.reject(new Error("Use an approved MathEpi account email."));
        return signInWithEmailAndPassword(auth, email, password);
      };
      authState.signOut = () => signOut(auth);

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          publish("ready", { user: null, error: authState.error || null });
          return;
        }
        if (!allowedEmail(firebaseUser.email)) {
          const message = "This email is not approved for MathEpi access.";
          publish("ready", { user: null, error: message });
          await signOut(auth);
          return;
        }
        const token = await firebaseUser.getIdTokenResult();
        const roles = rolesFromClaims(token.claims);
        const role = roles[0];
        publish("ready", {
          error: null,
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email,
            role,
            roles,
          },
        });
        if (typeof window.setAuthenticatedRoles === "function") window.setAuthenticatedRoles(roles);
        else if (typeof window.setAuthenticatedRole === "function") window.setAuthenticatedRole(role);
      });
    } catch (error) {
      publish("error", { error: error.message || "Firebase login could not start." });
    }
  }

  const config = window.MATHEPI_FIREBASE_CONFIG;
  if (isConfigured(config)) startFirebaseAuth(config);
  else publish("unconfigured", { error: null });
})();
