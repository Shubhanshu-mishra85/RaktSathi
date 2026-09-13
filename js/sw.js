const CACHE_NAME = "raktsathi-v1.3.0";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./assistant.html",
  "./blood-education.html",
  "./blood-request.html",
  "./camps.html",
  "./donor.html",
  "./emergency.html",
  "./find-blood.html",
  "./medicine.html",

  "./manifest.json",

  "./raktsathi-new-logo.png",
  "./raktsathi-header-bg.png",

  "./css/style.css",

  "./js/app.js",
  "./js/animations.js",
  "./js/assistant.js",
  "./js/donor.js",
  "./js/map.js",
  "./js/nearby-centres.js",
  "./js/request.js",
  "./js/search.js",
  "./js/loader.js",

  "./data/blood-centres.json",
  "./camps.json"
];


// INSTALL
self.addEventListener("install", function (event) {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(function (cache) {

        return cache.addAll(CORE_ASSETS);

      })
      .then(function () {

        return self.skipWaiting();

      })

  );

});


// ACTIVATE
self.addEventListener("activate", function (event) {

  event.waitUntil(

    caches.keys()
      .then(function (cacheNames) {

        return Promise.all(

          cacheNames
            .filter(function (cacheName) {

              return cacheName !== CACHE_NAME;

            })
            .map(function (cacheName) {

              return caches.delete(cacheName);

            })

        );

      })
      .then(function () {

        return self.clients.claim();

      })

  );

});


// FETCH
self.addEventListener("fetch", function (event) {

  const request = event.request;

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }


  event.respondWith(

    fetch(request)

      .then(function (networkResponse) {

        // Save successful response
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type !== "opaque"
        ) {

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {

              cache.put(request, responseClone);

            });

        }

        return networkResponse;

      })

      .catch(function () {

        return caches.match(request);

      })

  );

});
