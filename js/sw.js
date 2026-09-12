const CACHE_NAME = "vitalloop-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./about.html",
  "./blood-request.html",
  "./blood-education.html",
  "./camps.html",
  "./donor.html",
  "./css/style.css",
  "./js/app.js",
  "./js/search.js",
  "./js/request.js",
  "./js/donor.js",
  "./js/map.js",
  "./js/assistant.js",
  "./js/animations.js",
  "./data/resources.json",
  "./data/camps.json",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
      .catch(() => caches.match("./index.html"))
  );
});
