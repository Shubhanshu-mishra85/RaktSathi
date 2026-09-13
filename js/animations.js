/* =========================================================
   RAKTSATHI LOADING ANIMATION
   Blood Drop Loader
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     HIDE LOADER
     ======================================================= */

  function hideLoader() {

    const loader =
      document.getElementById("raktsathi-loader");

    if (!loader) return;

    loader.classList.add("loader-hidden");


    setTimeout(function () {

      if (loader && loader.parentNode) {

        loader.parentNode.removeChild(loader);

      }

    }, 650);

  }


  /* =======================================================
     CREATE LOADER
     ======================================================= */

  function createLoader() {

    /* Prevent duplicate loader */

    if (
      document.getElementById("raktsathi-loader")
    ) {
      return;
    }


    const loader =
      document.createElement("div");


    loader.id =
      "raktsathi-loader";


    loader.setAttribute(
      "aria-label",
      "RaktSathi loading"
    );


    loader.setAttribute(
      "role",
      "status"
    );


    loader.innerHTML = `

      <div class="loader-content">

        <!-- Blood Drop -->

        <div class="blood-drop-loader">

          <div class="blood-drop"></div>

        </div>


        <!-- Brand -->

        <div class="loader-brand">

          <span>Rakt</span>Sathi

        </div>


        <!-- Loading Text -->

        <p class="loader-text">

          Connecting People. Supporting Care.

        </p>


        <!-- Loading Dots -->

        <div
          class="loader-dots"
          aria-hidden="true"
        >

          <span></span>

          <span></span>

          <span></span>

        </div>

      </div>

    `;


    document.body.prepend(loader);

  }


  /* =======================================================
     START LOADER
     ======================================================= */

  if (document.body) {

    createLoader();

  } else {

    document.addEventListener(
      "DOMContentLoaded",
      createLoader
    );

  }


  /* =======================================================
     PAGE FULLY LOADED
     ======================================================= */

  window.addEventListener(
    "load",
    function () {

      /*
       Small delay so the animation
       looks smooth instead of disappearing instantly.
      */

      setTimeout(
        hideLoader,
        650
      );

    }
  );


  /* =======================================================
     SAFETY FALLBACK
     ======================================================= */

  /*
    If something takes too long to load,
    loader automatically disappears
    after 5 seconds.
  */

  setTimeout(
    hideLoader,
    5000
  );


})();
