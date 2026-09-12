/* =========================================================
   VITALLOOP — APP JAVASCRIPT
   Blood Resource Network
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PAGE FADE-IN ---------- */

  document.body.classList.add("page-loaded");


  /* ---------- SMOOTH INTERNAL LINKS ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (targetId && targetId !== "#") {

        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });

  });


  /* ---------- SCROLL REVEAL ANIMATION ---------- */

  const revealItems = document.querySelectorAll(
    ".card, .feature-card, .blood-card, .step, .camp-card, .education-card, .dashboard-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("reveal-visible");

            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(item => {
      item.classList.add("reveal-item");
      observer.observe(item);
    });

  }


  /* ---------- BUTTON LOADING EFFECT ---------- */

  document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function () {

      if (this.dataset.loading === "true") {
        return;
      }

      this.classList.add("button-clicked");

      setTimeout(() => {
        this.classList.remove("button-clicked");
      }, 250);

    });

  });


  /* ---------- CURRENT YEAR ---------- */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* ---------- ESC KEY FOR MODALS ---------- */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      document.querySelectorAll(".modal.active").forEach(modal => {
        modal.classList.remove("active");
      });

    }

  });


  /* ---------- MODAL CLOSE ---------- */

  document.querySelectorAll(".modal-close").forEach(button => {

    button.addEventListener("click", () => {

      const modal = button.closest(".modal");

      if (modal) {
        modal.classList.remove("active");
      }

    });

  });


  /* ---------- CLICK OUTSIDE MODAL ---------- */

  document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        modal.classList.remove("active");
      }

    });

  });


  /* ---------- SIMPLE COUNTER ANIMATION ---------- */

  const counters = document.querySelectorAll("[data-counter]");

  if ("IntersectionObserver" in window && counters.length) {

    const counterObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const element = entry.target;
          const target = Number(element.dataset.counter);

          if (Number.isNaN(target)) return;

          let current = 0;
          const duration = 1200;
          const steps = 50;
          const increment = target / steps;

          const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

              element.textContent = target.toLocaleString();
              clearInterval(timer);

            } else {

              element.textContent =
                Math.floor(current).toLocaleString();

            }

          }, duration / steps);

          counterObserver.unobserve(element);

        });

      },
      {
        threshold: 0.5
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* ---------- BACK TO TOP ---------- */

  const backTop = document.querySelector("[data-back-top]");

  if (backTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {
        backTop.classList.add("show");
      } else {
        backTop.classList.remove("show");
      }

    });

    backTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* ---------- DEMO NOTIFICATION ---------- */

  window.vitalLoopNotify = function(message, type = "info") {

    const oldNotification =
      document.querySelector(".vital-notification");

    if (oldNotification) {
      oldNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className =
      "vital-notification vital-" + type;

    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    setTimeout(() => {

      notification.classList.remove("show");

      setTimeout(() => {
        notification.remove();
      }, 300);

    }, 3500);

  };


  /* ---------- ONLINE / OFFLINE STATUS ---------- */

  function updateConnectionStatus() {

    if (!navigator.onLine) {

      window.vitalLoopNotify(
        "You are currently offline. Demo features may still work locally.",
        "warning"
      );

    }

  }

  window.addEventListener("offline", updateConnectionStatus);


  /* ---------- FORM PROTECTION ---------- */

  document.querySelectorAll("form").forEach(form => {

    form.addEventListener("submit", event => {

      const requiredFields =
        form.querySelectorAll("[required]");

      let valid = true;

      requiredFields.forEach(field => {

        if (!field.value.trim()) {

          valid = false;
          field.classList.add("field-error");

        } else {

          field.classList.remove("field-error");

        }

      });

      if (!valid) {

        event.preventDefault();

        window.vitalLoopNotify(
          "Please complete the required fields.",
          "warning"
        );

      }

    });

  });


  /* ---------- MOBILE TOUCH FEEDBACK ---------- */

  document.querySelectorAll(".card, .btn").forEach(element => {

    element.addEventListener("touchstart", () => {
      element.classList.add("touch-active");
    }, { passive: true });

    element.addEventListener("touchend", () => {
      element.classList.remove("touch-active");
    }, { passive: true });

  });

});


/* =========================================================
   DYNAMIC STYLE HELPERS
   ========================================================= */

const vitalLoopDynamicStyle = document.createElement("style");

vitalLoopDynamicStyle.textContent = `

  .page-loaded {
    animation: vitalPageIn 0.5s ease both;
  }

  @keyframes vitalPageIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .reveal-item {
    opacity: 0;
    transform: translateY(25px);
    transition:
      opacity 0.65s ease,
      transform 0.65s ease;
  }

  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .button-clicked {
    transform: scale(0.97) !important;
  }

  .field-error {
    border-color: #d32f2f !important;
    box-shadow:
      0 0 0 4px rgba(211, 47, 47, 0.08) !important;
  }

  .touch-active {
    transform: scale(0.99);
  }

  .vital-notification {
    position: fixed;
    top: 85px;
    right: 20px;
    z-index: 5000;

    max-width: 360px;

    padding: 14px 18px;

    border-radius: 12px;

    background: #17202a;
    color: white;

    font-size: 13px;
    font-weight: 600;

    box-shadow:
      0 15px 40px rgba(0,0,0,0.18);

    opacity: 0;
    transform: translateY(-15px);

    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .vital-notification.show {
    opacity: 1;
    transform: translateY(0);
  }

  .vital-success {
    border-left: 4px solid #168a45;
  }

  .vital-warning {
    border-left: 4px solid #ef8c00;
  }

  .vital-info {
    border-left: 4px solid #1565c0;
  }

  @media (max-width: 650px) {

    .vital-notification {
      left: 15px;
      right: 15px;
      top: 72px;
      max-width: none;
    }

  }

`;

document.head.appendChild(vitalLoopDynamicStyle);
