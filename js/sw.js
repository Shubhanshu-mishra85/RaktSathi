/* =========================================================
   RAKTSATHI SERVICE WORKER
   Version: 1.2.0
   ========================================================= */

const CACHE_NAME = "raktsathi-v1.2.0";


const CORE_ASSETS = [

  "./",

  "./index.html",

  "./about.html",

  "./find-blood.html",

  "./blood-request.html",

  "./emergency.html",

  "./donor.html",

  "./camps.html",

  "./blood-education.html",

  "./assistant.html",

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


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener(
  "install",
  function (event) {

    event.waitUntil(

      caches.open(CACHE_NAME)

        .then(function (cache) {

          return cache.addAll(CORE_ASSETS);

        })

        .then(function () {

          return self.skipWaiting();

        })

    );

  }
);


/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener(
  "activate",
  function (event) {

    event.waitUntil(

      caches.keys()

        .then(function (cacheNames) {

          return Promise.all(

            cacheNames

              .filter(function (cacheName) {

                return (
                  cacheName.startsWith("raktsathi-") &&
                  cacheName !== CACHE_NAME
                );

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

  }
);


/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener(
  "fetch",
  function (event) {

    const request =
      event.request;


    /*
      HTML navigation:
      Network first → Cache fallback
    */

    if (
      request.mode === "navigate" ||
      request.destination === "document"
    ) {

      event.respondWith(

        fetch(request)

          .then(function (response) {

            return response;

          })

          .catch(function () {

            return caches.match(
              "./index.html"
            );

          })

      );

      return;

    }


    /*
      Static files:
      Cache first → Network fallback
    */

    event.respondWith(

      caches.match(request)

        .then(function (cachedResponse) {

          if (cachedResponse) {

            return cachedResponse;

          }


          return fetch(request)

            .then(function (networkResponse) {

              /*
                Cache only successful
                same-origin responses.
              */

              if (
                networkResponse &&
                networkResponse.status === 200 &&
                networkResponse.type === "basic"
              ) {

                const responseClone =
                  networkResponse.clone();


                caches.open(CACHE_NAME)

                  .then(function (cache) {

                    cache.put(
                      request,
                      responseClone
                    );

                  });

              }


              return networkResponse;

            });

        })

    );

  }
);
