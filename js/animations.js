/* =========================================================
   RaktSathi - Premium UI Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initCounterAnimations();
  initSmoothScrolling();
  initCardHoverEffects();
});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {
  const elements = document.querySelectorAll(
    ".reveal, .fade-up, .animate-on-scroll, " +
    ".service-card, .feature-card, .step, .innovation-card"
  );

  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

  elements.forEach(element => {
    observer.observe(element);
  });
}


/* =========================================================
   NUMBER COUNTERS
   ========================================================= */

function initCounterAnimations() {
  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(counter => {
      counter.textContent =
        counter.dataset.counter;
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          animateCounter(entry.target);

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.5
      }
    );

  counters.forEach(counter => {
    observer.observe(counter);
  });
}


function animateCounter(element) {
  const target =
    Number(element.dataset.counter);

  if (!Number.isFinite(target)) return;

  const duration = 1200;
  const startTime = performance.now();

  function update(currentTime) {
    const progress =
      Math.min(
        (currentTime - startTime) /
        duration,
        1
      );

    const eased =
      1 - Math.pow(1 - progress, 3);

    const currentValue =
      Math.floor(target * eased);

    element.textContent =
      currentValue.toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScrolling() {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      );
    });
}


/* =========================================================
   CARD HOVER EFFECTS
   ========================================================= */

function initCardHoverEffects() {
  const cards =
    document.querySelectorAll(
      ".service-card, .feature-card, " +
      ".innovation-card, .blood-centre-card"
    );

  cards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {
        card.classList.add(
          "is-hovered"
        );
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.classList.remove(
          "is-hovered"
        );
      }
    );
  });
});


/* =========================================================
   REDUCE MOTION SUPPORT
   ========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

if (prefersReducedMotion.matches) {
  document.documentElement.classList.add(
    "reduce-motion"
  );
}
