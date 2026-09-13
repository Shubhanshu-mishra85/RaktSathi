/* =========================================================
   RAKTSATHI - SAFE SCROLL ANIMATIONS
   Content kabhi permanently hidden nahi hoga
   ========================================================= */

(function () {
  "use strict";

  function initAnimations() {

    const animatedElements = document.querySelectorAll(
      ".reveal, " +
      ".scroll-reveal, " +
      ".fade-in, " +
      ".fade-up, " +
      ".animate-on-scroll, " +
      "[data-animate], " +
      "[data-reveal]"
    );

    /* 
       IMPORTANT:
       Page load par saare elements visible rakho.
       Animation fail hone par bhi content disappear nahi hoga.
    */
    animatedElements.forEach(function (element) {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";
    });

    /* Optional smooth animation */
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /*
       Sirf halka reveal effect.
       Element pehle se visible rahega.
    */
    animatedElements.forEach(function (element) {

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

      element.style.opacity = "0";
      element.style.transform = "translateY(18px)";

      requestAnimationFrame(function () {
        setTimeout(function () {
          element.style.opacity = "1";
          element.style.visibility = "visible";
          element.style.transform = "translateY(0)";
        }, 50);
      });

    });
  }

  /* Start after DOM is ready */
  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initAnimations,
      { once: true }
    );

  } else {

    initAnimations();

  }

  /*
     FINAL SAFETY:
     Agar kisi animation/script ki wajah se element hidden
     reh gaya, 2 seconds ke baad sab visible.
  */
  setTimeout(function () {

    const elements = document.querySelectorAll(
      ".reveal, " +
      ".scroll-reveal, " +
      ".fade-in, " +
      ".fade-up, " +
      ".animate-on-scroll, " +
      "[data-animate], " +
      "[data-reveal]"
    );

    elements.forEach(function (element) {

      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";

    });

  }, 2000);

})();
