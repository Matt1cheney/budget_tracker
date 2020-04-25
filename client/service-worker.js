const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/css/style.css",
  "/dist/db.bundle.js",
  "/dist/index.bundle.js",
  "/dist/assets/icons/icon_16x16.f13d304f6baad8fd2a56b08030304d1c.png",
  "/dist/assets/icons/icon_32x32.f84727b32c4c977917f161928f2ed814.png",
  "/dist/assets/icons/icon_192x192.02a96ee9333ecac4c6c5cf4429cf5022.png",
  "/dist/assets/icons/icon_512x512.0a99d4bb86ed2713f48eedb8f3ec7cf3.png",
  
];


const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});