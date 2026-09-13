(function () {
  "use strict";

  function createLoader() {
    if (!document.body) return;
    if (document.getElementById("raktsathi-loader")) return;

    const loader = document.createElement("div");
    loader.id = "raktsathi-loader";

    loader.innerHTML = `
      <div class="rs-loader-scene">

        <div class="rs-drop-wrapper">
          <div class="rs-drop">
            <span class="rs-drop-shine"></span>
          </div>
        </div>

        <div class="rs-impact-shadow"></div>

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

        <div class="rs-ripple ripple-1"></div>
        <div class="rs-ripple ripple-2"></div>
        <div class="rs-ripple ripple-3"></div>

        <div class="rs-loader-brand">
          <div class="rs-logo-circle">
            <img src="raktsathi-new-logo.png" alt="RaktSathi">
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
    const loader = document.getElementById("raktsathi-loader");

    if (!loader) {
      document.documentElement.classList.remove("rs-loading");
      document.body.classList.remove("rs-loading");
      return;
    }

    loader.classList.add("rs-loader-exit");

    document.documentElement.classList.remove("rs-loading");
    document.body.classList.remove("rs-loading");

    setTimeout(function () {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }

      document.documentElement.classList.remove("rs-loading");
      document.body.classList.remove("rs-loading");
    }, 900);
  }

  function startLoader() {
    createLoader();

    /*
      Maximum 4.5 seconds.
      Iske baad loader forcefully remove ho jayega.
    */
    setTimeout(hideLoader, 4500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoader, {
      once: true
    });
  } else {
    startLoader();
  }

  window.addEventListener("load", function () {
    setTimeout(hideLoader, 1000);
  }, {
    once: true
  });

  /*
    Emergency fallback:
    Agar kisi bhi reason se JS/CSS animation stuck ho,
    6 seconds ke baad loader definitely remove hoga.
  */
  setTimeout(function () {
    hideLoader();
  }, 6000);

})();
