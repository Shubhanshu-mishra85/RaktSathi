/* =========================================================
   RaktSathi - Main Application Controller
   Intelligent Blood Emergency Coordination Network
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initPageAnimations();
  initEmergencyShortcuts();
  initRequestStatus();
});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuButton.classList.toggle("active");
    });
  }

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav) {
        nav.classList.remove("active");
      }

      if (menuButton) {
        menuButton.classList.remove("active");
      }
    });
  });
}


/* =========================================================
   PAGE ANIMATIONS
   ========================================================= */

function initPageAnimations() {
  const animatedElements = document.querySelectorAll(
    ".card, .service-card, .feature-card, .step, .hero-content"
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}


/* =========================================================
   EMERGENCY SHORTCUTS
   ========================================================= */

function initEmergencyShortcuts() {
  document.querySelectorAll("[data-emergency]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      window.location.href = "emergency.html";
    });
  });
}


/* =========================================================
   REQUEST STATUS
   ========================================================= */

function initRequestStatus() {
  const statusElements = document.querySelectorAll(
    "[data-request-status]"
  );

  if (!statusElements.length) return;

  const emergencyRequest =
    localStorage.getItem("raktSathiEmergencyRequest");

  const bloodRequest =
    localStorage.getItem("raktSathiBloodRequest");

  statusElements.forEach(element => {
    if (emergencyRequest || bloodRequest) {
      element.textContent = "Request Active";
      element.classList.add("active");
    } else {
      element.textContent = "No Active Request";
    }
  });
}


/* =========================================================
   RAKTSATHI REQUEST HELPERS
   ========================================================= */

function generateRequestId() {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  return `RS-${randomPart}`;
}


function saveRequest(key, requestData) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(requestData)
    );

    return true;
  } catch (error) {
    console.error("RaktSathi storage error:", error);
    return false;
  }
}


function getRequest(key) {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("RaktSathi request read error:", error);
    return null;
  }
}


/* =========================================================
   GLOBAL RAKTSATHI OBJECT
   ========================================================= */

window.RaktSathi = {
  generateRequestId,
  saveRequest,
  getRequest
};
