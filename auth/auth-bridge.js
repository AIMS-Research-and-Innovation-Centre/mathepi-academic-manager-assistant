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

  function roleFromClaims(claims = {}) {
    const role = claims.role || claims.mathepiRole || claims.mathepi_role || "viewer";
    return validRoles.has(role) ? role : "viewer";
  }

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

      authState.createAccount = (email, password) => createUserWithEmailAndPassword(auth, email, password);
      authState.signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
      authState.signOut = () => signOut(auth);

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          publish("ready", { user: null, error: null });
          return;
        }
        const token = await firebaseUser.getIdTokenResult(true);
        const role = roleFromClaims(token.claims);
        publish("ready", {
          error: null,
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email,
            role,
          },
        });
        if (typeof window.setAuthenticatedRole === "function") window.setAuthenticatedRole(role);
      });
    } catch (error) {
      publish("error", { error: error.message || "Firebase login could not start." });
    }
  }

  const config = window.MATHEPI_FIREBASE_CONFIG;
  if (isConfigured(config)) startFirebaseAuth(config);
  else publish("unconfigured", { error: null });
})();
