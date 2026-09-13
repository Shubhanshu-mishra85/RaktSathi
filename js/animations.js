(function () {
  "use strict";

  function createLoader() {
    if (document.getElementById("raktsathi-loader")) return;

    const loader = document.createElement("div");

    loader.id = "raktsathi-loader";

    loader.innerHTML = `
      <div class="rs-loader-scene">

        <!-- Falling Blood Drop -->
        <div class="rs-drop-wrapper">
          <div class="rs-drop">
            <span class="rs-drop-shine"></span>
          </div>
        </div>

        <!-- Impact Shadow -->
        <div class="rs-impact-shadow"></div>

        <!-- Blood Splash -->
        <div class="rs-splash">

          <span class="splash-drop splash-1"></span>
          <span class="splash-drop splash-2"></span>
          <span class="splash-drop splash-3"></span>
          <span class="splash-drop splash-4"></span>
          <span class="splash-drop splash-5"></span>
          <span class="splash-drop splash-6"></span>

          <div class="rs-splash-crown">
            <span></span>
          </div>

        </div>

        <!-- Ripple -->
        <div class="rs-ripple ripple-1"></div>
        <div class="rs-ripple ripple-2"></div>
        <div class="rs-ripple ripple-3"></div>

        <!-- Logo Reveal -->
        <div class="rs-loader-brand">

          <div class="rs-logo-circle">

            <img
              src="raktsathi-new-logo.png"
              alt="RaktSathi"
            >

          </div>

          <div class="rs-brand-name">
            <span>Rakt</span>Sathi
          </div>

          <div class="rs-loader-tagline">
            Connecting People. Supporting Care.
          </div>

          <div class="rs-loader-dots">
            <i></i>
            <i></i>
            <i></i>
          </div>

        </div>

      </div>
    `;

    document.body.prepend(loader);
  }


  function hideLoader() {

    const loader =
      document.getElementById("raktsathi-loader");

    if (!loader) return;

    loader.classList.add("rs-loader-exit");

    setTimeout(function () {

      if (loader) {
        loader.remove();
      }

    }, 900);
  }


  function startLoader() {

    createLoader();

    /*
      Minimum animation duration.
      Isse drop animation properly complete hogi.
    */

    setTimeout(function () {

      if (document.readyState === "complete") {
        hideLoader();
      }

    }, 3600);
  }


  /*
    Start as early as possible
  */

  if (document.body) {

    startLoader();

  } else {

    document.addEventListener(
      "DOMContentLoaded",
      startLoader
    );

  }


  /*
    Website fully loaded hone ke baad
    animation ko complete hone dete hain.
  */

  window.addEventListener("load", function () {

    setTimeout(function () {

      hideLoader();

    }, 3600);

  });


  /*
    Safety fallback
    */

  setTimeout(function () {

    hideLoader();

  }, 7000);

})();
