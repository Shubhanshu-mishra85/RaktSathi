/* =========================================================
   RaktSathi - Service Worker
   PWA & Offline Support
   ========================================================= */

const CACHE_NAME = "raktsathi-v1.0.0";

const CORE_FILES = [
  "./",
  "./index.html",
  "./about.html",
  "./blood-education.html",
  "./blood-request.html",
  "./camps.html",
  "./donor.html",
  "./emergency.html",
  "./assistant.html",
  "./medicine.html",
  "./find-blood.html",

  "./css/style.css",

  "./js/app.js",
  "./js/animations.js",
  "./js/assistant.js",
  "./js/map.js",
  "./js/request.js",
  "./js/search.js",

  "./data/blood-centres.json",
  "./camps.json",

  "./manifest.json",
  "./raktsathi-logo.png"
];


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          CORE_FILES
        );

      })
      .then(() => {

        return self.skipWaiting();

      })
      .catch(error => {

        console.error(
          "RaktSathi cache installation failed:",
          error
        );

      })

  );
});


/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames
            .filter(
              name =>
                name !== CACHE_NAME
            )
            .map(
              name =>
                caches.delete(name)
            )

        );

      })
      .then(() => {

        return self.clients.claim();

      })

  );
});


/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener("fetch", event => {

  const request =
    event.request;

  /*
   * Only handle GET requests.
   */
  if (request.method !== "GET") {
    return;
  }


  event.respondWith(

    caches.match(request)
      .then(cachedResponse => {

        /*
         * Use cached version first.
         */
        if (cachedResponse) {
          return cachedResponse;
        }


        /*
         * Otherwise try the network.
         */
        return fetch(request)
          .then(networkResponse => {

            /*
             * Cache valid same-origin responses.
             */
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {

              const responseClone =
                networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    request,
                    responseClone
                  );

                });

            }

            return networkResponse;

          })
          .catch(() => {

            /*
             * Offline fallback.
             */
            return caches.match(
              "./index.html"
            );

          });

      })

  );
});
