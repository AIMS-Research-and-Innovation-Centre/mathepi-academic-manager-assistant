const CACHE_NAME = "mathepi-academic-manager-v32";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20",
  "./app.js?v=28",
  "./auth/firebase-config.js",
  "./auth/auth-bridge.js?v=17",
  "./manifest.webmanifest",
  "./assets/aims-ric-logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./cfa/lecturer-application.html?v=20260723-lecturer-sync",
  "./cfa/tutorial-fellow-application.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const isReviewPortal =
    url.pathname.endsWith("/tf-reviews/") ||
    url.pathname.endsWith("/tf-reviews/index.html") ||
    url.pathname.endsWith("/tf-reviews.html");

  if (isReviewPortal) {
    event.respondWith(fetch(request, { cache: "no-store" }));
    return;
  }

  const isAppShell =
    request.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/cfa/lecturer-application.html") ||
    url.pathname.endsWith("/cfa/tutorial-fellow-application.html") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/styles.css") ||
    url.pathname.endsWith("/sw.js");

  if (isAppShell) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    }),
  );
});
