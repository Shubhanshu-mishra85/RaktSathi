/* =========================================
   VITALLOOP - PROFESSIONAL ANIMATIONS
   Blood Resource Network
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------
       PAGE LOAD ANIMATION
    -------------------------------- */

    document.body.classList.add("vl-page-ready");


    /* -------------------------------
       SCROLL REVEAL
    -------------------------------- */

    const revealElements = document.querySelectorAll(
        ".card, .feature-card, .blood-card, .resource-card, " +
        ".step, .section, .hero-content, .hero-card, " +
        ".education-card, .camp-card, .info-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("vl-reveal-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element, index) {

            element.classList.add("vl-reveal");

            element.style.transitionDelay =
                Math.min(index * 0.04, 0.35) + "s";

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("vl-reveal-visible");

        });

    }


    /* -------------------------------
       NUMBER COUNTER ANIMATION
    -------------------------------- */

    const counters = document.querySelectorAll(
        "[data-counter]"
    );

    function animateCounter(element) {

        const target =
            parseInt(element.getAttribute("data-counter"), 10);

        if (isNaN(target)) {
            return;
        }

        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                Math.floor(target * eased);

            element.textContent =
                value.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent =
                    target.toLocaleString();

            }

        }

        requestAnimationFrame(updateCounter);
    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.6
                }
            );

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    }


    /* -------------------------------
       BUTTON PRESS EFFECT
    -------------------------------- */

    const buttons =
        document.querySelectorAll(
            "button, .btn, .button, a.btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("vl-button-click");

            setTimeout(function () {

                button.classList.remove("vl-button-click");

            }, 180);

        });

    });


    /* -------------------------------
       CARD HOVER EFFECT
    -------------------------------- */

    const cards =
        document.querySelectorAll(
            ".card, .feature-card, .blood-card, " +
            ".resource-card, .camp-card, .education-card"
        );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.classList.add("vl-card-hover");

        });

        card.addEventListener("mouseleave", function () {

            card.classList.remove("vl-card-hover");

        });

    });


    /* -------------------------------
       ACTIVE NAVIGATION
    -------------------------------- */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navLinks =
        document.querySelectorAll(
            "nav a, header a"
        );

    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add(
                "vl-active-link"
            );

        }

    });


    /* -------------------------------
       BACK TO TOP BUTTON
    -------------------------------- */

    const topButton =
        document.querySelector(
            "#backToTop"
        );

    if (topButton) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    topButton.classList.add(
                        "vl-top-visible"
                    );

                } else {

                    topButton.classList.remove(
                        "vl-top-visible"
                    );

                }

            }
        );

        topButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* -------------------------------
       SMOOTH INTERNAL LINKS
    -------------------------------- */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

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

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* -------------------------------
       PARALLAX HERO EFFECT
    -------------------------------- */

    const hero =
        document.querySelector(
            ".hero, .hero-section"
        );

    if (hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scroll =
                    window.scrollY;

                if (scroll < 800) {

                    hero.style.backgroundPosition =
                        "center " +
                        (scroll * 0.15) +
                        "px";

                }

            }
        );

    }


    /* -------------------------------
       FLOATING MEDICAL PULSE
    -------------------------------- */

    const pulseElements =
        document.querySelectorAll(
            ".pulse, .heartbeat, .live-indicator"
        );

    pulseElements.forEach(function (element) {

        element.classList.add(
            "vl-pulse-animation"
        );

    });


    /* -------------------------------
       REDUCE MOTION ACCESSIBILITY
    -------------------------------- */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reduceMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

        document
            .querySelectorAll(
                ".vl-reveal"
            )
            .forEach(function (element) {

                element.classList.add(
                    "vl-reveal-visible"
                );

            });

    }


    /* -------------------------------
       CONNECTION STATUS
    -------------------------------- */

    function updateConnectionStatus() {

        const status =
            document.querySelector(
                "#connectionStatus"
            );

        if (!status) {
            return;
        }

        if (navigator.onLine) {

            status.textContent =
                "Online";

            status.classList.remove(
                "offline"
            );

            status.classList.add(
                "online"
            );

        } else {

            status.textContent =
                "Offline";

            status.classList.remove(
                "online"
            );

            status.classList.add(
                "offline"
            );

        }

    }

    updateConnectionStatus();

    window.addEventListener(
        "online",
        updateConnectionStatus
    );

    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    /* -------------------------------
       CONSOLE BRAND MESSAGE
    -------------------------------- */

    console.log(
        "%cVitalLoop",
        "font-size:22px;font-weight:700;"
    );

    console.log(
        "Your Complete Healthcare Journey"
    );

});
