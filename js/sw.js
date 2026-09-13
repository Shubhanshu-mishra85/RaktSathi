/* =========================================================
   RaktSathi - Service Worker
   Intelligent Blood Emergency Coordination Network
   ========================================================= */

const CACHE_NAME = "raktsathi-v1.1.0";

const CORE_FILES = [
  "./",
  "./index.html",
  "./about.html",
  "./emergency.html",
  "./find-blood.html",
  "./blood-request.html",
  "./donor.html",
  "./camps.html",
  "./blood-education.html",
  "./assistant.html",
  "./medicine.html",

  "./manifest.json",
  "./raktsathi-logo.png",

  "./css/style.css",

  "./js/app.js",
  "./js/animations.js",
  "./js/assistant.js",
  "./js/map.js",
  "./js/request.js",
  "./js/search.js",

  "./data/blood-centres.json",
  "./camps.json"
];


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())
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
              name => name !== CACHE_NAME
            )
            .map(
              name => caches.delete(name)
            )

        );

      })
      .then(() => self.clients.claim())

  );

});


/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener("fetch", event => {

  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  /*
   * Navigation requests:
   * Network first, cached page as fallback.
   */

  if (request.mode === "navigate") {

    event.respondWith(

      fetch(request)
        .then(response => {

          const copy =
            response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(
                request,
                copy
              );
            });

          return response;

        })
        .catch(() => {

          return caches.match(
            "./index.html"
          );

        })

    );

    return;
  }


  /*
   * Static resources:
   * Cache first, then network.
   */

  event.respondWith(

    caches.match(request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {

            if (
              response &&
              response.status === 200 &&
              response.type === "basic"
            ) {

              const copy =
                response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    request,
                    copy
                  );

                });

            }

            return response;

          });

      })
      .catch(() => {

        return new Response(
          "RaktSathi is currently offline.",
          {
            status: 503,
            headers: {
              "Content-Type":
                "text/plain; charset=utf-8"
            }
          }
        );

      })

  );

});
