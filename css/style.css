/* =========================================================
   RaktSathi
   Intelligent Blood Emergency Coordination Network
   Premium Responsive Styles
   ========================================================= */

:root {
  --primary: #b5121b;
  --primary-dark: #7f0d14;
  --primary-light: #e63946;

  --dark: #0b0f14;
  --dark-2: #111820;
  --dark-3: #18212b;

  --white: #ffffff;
  --text: #17202a;
  --muted: #68727d;

  --border: rgba(255, 255, 255, 0.12);
  --light-border: #e5e8ec;

  --surface: #ffffff;
  --surface-soft: #f6f8fa;

  --shadow:
    0 15px 45px rgba(0, 0, 0, 0.08);

  --radius: 18px;
  --radius-small: 10px;

  --transition:
    0.3s ease;
}


/* =========================================================
   RESET
   ========================================================= */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  background: var(--surface-soft);
  color: var(--text);

  line-height: 1.6;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}


/* =========================================================
   CONTAINER
   ========================================================= */

.container {
  width: min(1180px, 92%);
  margin: 0 auto;
}


/* =========================================================
   HEADER
   ========================================================= */

header,
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;

  background:
    rgba(11, 15, 20, 0.94);

  backdrop-filter: blur(14px);

  border-bottom:
    1px solid var(--border);
}

header .container,
.site-header .container {
  min-height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}


/* =========================================================
   LOGO
   ========================================================= */

.logo,
.brand {
  display: flex;
  align-items: center;
  gap: 10px;

  font-weight: 800;
  font-size: 1.35rem;

  color: var(--white);
}

.logo img,
.brand img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.logo span,
.brand span {
  color: var(--primary-light);
}


/* =========================================================
   NAVIGATION
   ========================================================= */

nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

nav a {
  position: relative;

  color: #dce2e7;

  font-size: 0.92rem;
  font-weight: 600;

  transition:
    color var(--transition);
}

nav a:hover {
  color: var(--white);
}

nav a::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: -7px;

  width: 0;
  height: 2px;

  background: var(--primary-light);

  transition:
    width var(--transition);
}

nav a:hover::after {
  width: 100%;
}


/* =========================================================
   MENU TOGGLE
   ========================================================= */

.menu-toggle {
  display: none;

  width: 42px;
  height: 42px;

  border: 1px solid var(--border);
  border-radius: 10px;

  background: transparent;
  color: var(--white);

  cursor: pointer;
}


/* =========================================================
   HERO
   ========================================================= */

.hero {
  position: relative;

  min-height: 650px;

  display: flex;
  align-items: center;

  padding: 90px 0;

  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(181, 18, 27, 0.28),
      transparent 35%
    ),

    radial-gradient(
      circle at 10% 80%,
      rgba(230, 57, 70, 0.12),
      transparent 30%
    ),

    var(--dark);

  color: var(--white);

  overflow: hidden;
}

.hero::before {
  content: "";

  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(
      rgba(255,255,255,0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,0.025) 1px,
      transparent 1px
    );

  background-size: 50px 50px;

  pointer-events: none;
}

.hero .container {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 780px;
}

.hero-badge {
  display: inline-flex;

  padding: 8px 14px;

  margin-bottom: 20px;

  border:
    1px solid rgba(230, 57, 70, 0.45);

  border-radius: 999px;

  background:
    rgba(181, 18, 27, 0.12);

  color: #ffb5ba;

  font-size: 0.78rem;
  font-weight: 800;

  letter-spacing: 0.08em;
}

.hero h1 {
  font-size:
    clamp(2.5rem, 6vw, 5rem);

  line-height: 1.03;

  letter-spacing: -0.04em;

  margin-bottom: 24px;
}

.hero h1 span {
  color: #ff4d5a;
}

.hero p {
  max-width: 720px;

  color: #c5cdd4;

  font-size:
    clamp(1rem, 2vw, 1.2rem);

  margin-bottom: 32px;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.btn {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  min-height: 46px;

  padding: 11px 20px;

  border: 1px solid transparent;
  border-radius: 10px;

  cursor: pointer;

  font-weight: 750;

  transition:
    transform var(--transition),
    box-shadow var(--transition),
    background var(--transition),
    border-color var(--transition);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background:
    linear-gradient(
      135deg,
      var(--primary-light),
      var(--primary)
    );

  color: var(--white);

  box-shadow:
    0 10px 28px
    rgba(181, 18, 27, 0.25);
}

.btn-primary:hover {
  box-shadow:
    0 14px 34px
    rgba(181, 18, 27, 0.35);
}

.btn-secondary {
  background: transparent;

  color: inherit;

  border-color:
    rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background:
    rgba(255, 255, 255, 0.08);
}

.btn-danger {
  background: #b5121b;
  color: #fff;
}


/* =========================================================
   HERO ACTIONS
   ========================================================= */

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}


/* =========================================================
   SECTION
   ========================================================= */

section {
  padding: 80px 0;
}

.section-heading {
  max-width: 720px;

  margin-bottom: 42px;
}

.section-heading h2 {
  font-size:
    clamp(2rem, 4vw, 3rem);

  line-height: 1.1;

  margin-bottom: 14px;
}

.section-heading p {
  color: var(--muted);
}


/* =========================================================
   GRID
   ========================================================= */

.grid {
  display: grid;
  gap: 22px;
}

.grid-2 {
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
}

.grid-4 {
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
}


/* =========================================================
   CARDS
   ========================================================= */

.card,
.service-card,
.feature-card,
.innovation-card,
.blood-centre-card {
  background: var(--surface);

  border:
    1px solid var(--light-border);

  border-radius: var(--radius);

  padding: 26px;

  box-shadow: var(--shadow);

  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.card:hover,
.service-card:hover,
.feature-card:hover,
.innovation-card:hover,
.blood-centre-card:hover,
.card.is-hovered,
.service-card.is-hovered,
.feature-card.is-hovered,
.innovation-card.is-hovered,
.blood-centre-card.is-hovered {
  transform: translateY(-6px);

  box-shadow:
    0 22px 55px
    rgba(0, 0, 0, 0.12);

  border-color:
    rgba(181, 18, 27, 0.25);
}

.card h3,
.service-card h3,
.feature-card h3,
.innovation-card h3,
.blood-centre-card h3 {
  margin-bottom: 9px;

  font-size: 1.2rem;
}

.card p,
.service-card p,
.feature-card p,
.innovation-card p {
  color: var(--muted);
}


/* =========================================================
   SERVICE ICON
   ========================================================= */

.service-icon,
.feature-icon {
  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  margin-bottom: 18px;

  border-radius: 14px;

  background:
    rgba(181, 18, 27, 0.09);

  color: var(--primary);

  font-size: 1.4rem;
}


/* =========================================================
   WORKFLOW
   ========================================================= */

.workflow {
  display: grid;

  grid-template-columns:
    repeat(5, minmax(0, 1fr));

  gap: 14px;

  margin-top: 30px;
}

.workflow-step,
.step {
  position: relative;

  padding: 20px;

  border:
    1px solid var(--light-border);

  border-radius: 14px;

  background: var(--surface);

  text-align: center;
}

.step-number {
  width: 36px;
  height: 36px;

  display: grid;
  place-items: center;

  margin: 0 auto 10px;

  border-radius: 50%;

  background: var(--primary);

  color: var(--white);

  font-weight: 800;
}

.workflow-step.completed {
  border-color:
    rgba(181, 18, 27, 0.35);
}


/* =========================================================
   FORMS
   ========================================================= */

form {
  width: 100%;
}

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 7px;
}

.form-group.full {
  grid-column: 1 / -1;
}

label {
  font-size: 0.9rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;

  padding: 12px 14px;

  border:
    1px solid var(--light-border);

  border-radius: 10px;

  background: var(--white);

  color: var(--text);

  outline: none;

  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--primary);

  box-shadow:
    0 0 0 3px
    rgba(181, 18, 27, 0.1);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 22px;
}


/* =========================================================
   MESSAGES
   ========================================================= */

.request-message,
.search-message,
.location-message,
.tracking-message {
  margin-top: 20px;

  padding: 15px 18px;

  border-radius: 12px;

  border: 1px solid var(--light-border);

  background: var(--surface-soft);
}

.request-message.success,
.search-message.success,
.location-message.success {
  border-color: #9bd4ae;
  background: #f1fbf4;
}

.request-message.error,
.search-message.error,
.location-message.error,
.tracking-message.error {
  border-color: #e6a2a7;
  background: #fff3f4;
}

.location-message.loading {
  background: #f4f6f8;
}

.location-message.info {
  background: #f5f7fa;
}


/* =========================================================
   BLOOD CENTRE
   ========================================================= */

.blood-centre-card {
  display: flex;
  flex-direction: column;

  gap: 12px;
}

.centre-badge {
  display: inline-flex;

  width: fit-content;

  padding: 5px 10px;

  border-radius: 999px;

  background:
    rgba(181, 18, 27, 0.09);

  color: var(--primary);

  font-size: 0.72rem;
  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.04em;
}

.centre-info p {
  margin-bottom: 5px;
}

.centre-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 8px;
}

.verification-note {
  padding-top: 12px;

  border-top:
    1px solid var(--light-border);

  color: var(--muted);

  font-size: 0.82rem;
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
  padding: 45px 20px;

  border:
    1px dashed #ccd2d8;

  border-radius: var(--radius);

  text-align: center;

  background: var(--white);
}

.empty-state h3 {
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--muted);
}


/* =========================================================
   STATS
   ========================================================= */

.stats {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 18px;
}

.stat {
  padding: 25px;

  border-radius: var(--radius);

  background: var(--dark);

  color: var(--white);

  border:
    1px solid var(--border);
}

.stat-number {
  display: block;

  margin-bottom: 5px;

  font-size: 2rem;

  font-weight: 850;

  color: #ff5965;
}

.stat-label {
  color: #c5cdd4;

  font-size: 0.9rem;
}


/* =========================================================
   DARK SECTION
   ========================================================= */

.dark-section {
  background: var(--dark);
  color: var(--white);
}

.dark-section .section-heading p {
  color: #adb7c0;
}

.dark-section .card,
.dark-section .feature-card,
.dark-section .innovation-card {
  background: var(--dark-2);

  border-color: var(--border);

  color: var(--white);
}

.dark-section .card p,
.dark-section .feature-card p,
.dark-section .innovation-card p {
  color: #aeb8c1;
}


/* =========================================================
   EMERGENCY CTA
   ========================================================= */

.emergency-cta {
  position: relative;

  padding: 45px;

  border-radius: 24px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #7f0d14,
      #b5121b
    );

  color: var(--white);

  box-shadow:
    0 25px 60px
    rgba(127, 13, 20, 0.25);
}

.emergency-cta h2 {
  font-size:
    clamp(1.8rem, 4vw, 2.7rem);

  margin-bottom: 10px;
}

.emergency-cta p {
  max-width: 700px;

  color: #ffdfe1;

  margin-bottom: 22px;
}


/* =========================================================
   TABLE
   ========================================================= */

.table-wrapper {
  width: 100%;
  overflow-x: auto;

  border-radius: var(--radius);

  box-shadow: var(--shadow);
}

table {
  width: 100%;

  border-collapse: collapse;

  background: var(--white);
}

th,
td {
  padding: 14px 16px;

  border-bottom:
    1px solid var(--light-border);

  text-align: left;
}

th {
  background: var(--dark);

  color: var(--white);

  font-size: 0.9rem;
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {
  padding: 50px 0 25px;

  background: var(--dark);

  color: #c4ccd3;
}

.footer-grid {
  display: grid;

  grid-template-columns:
    2fr 1fr 1fr;

  gap: 40px;

  padding-bottom: 35px;
}

footer h3,
footer h4 {
  color: var(--white);

  margin-bottom: 12px;
}

footer p {
  max-width: 500px;

  color: #9da8b1;
}

footer a {
  color: #b9c2c9;

  transition:
    color var(--transition);
}

footer a:hover {
  color: var(--white);
}

.footer-links {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.footer-bottom {
  padding-top: 22px;

  border-top:
    1px solid var(--border);

  font-size: 0.85rem;

  color: #89949d;
}


/* =========================================================
   SCROLL ANIMATIONS
   ========================================================= */

.reveal,
.fade-up,
.animate-on-scroll,
.service-card,
.feature-card,
.step,
.innovation-card {
  opacity: 0;

  transform:
    translateY(22px);

  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.reveal.visible,
.fade-up.visible,
.animate-on-scroll.visible,
.service-card.visible,
.feature-card.visible,
.step.visible,
.innovation-card.visible {
  opacity: 1;

  transform:
    translateY(0);
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

.reduce-motion *,
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-duration: 0.01ms !important;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {

  nav {
    gap: 14px;
  }

  .grid-4,
  .stats {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .grid-3 {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .workflow {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

  .footer-grid {
    grid-template-columns:
      1fr 1fr;
  }
}


@media (max-width: 700px) {

  header .container,
  .site-header .container {
    min-height: 64px;
  }

  .menu-toggle {
    display: grid;
    place-items: center;
  }

  nav {
    position: absolute;

    top: 64px;
    left: 0;
    right: 0;

    display: none;

    flex-direction: column;
    align-items: stretch;

    padding: 18px;

    background: var(--dark);

    border-bottom:
      1px solid var(--border);
  }

  nav.active {
    display: flex;
  }

  nav a {
    padding: 10px 5px;
  }

  .hero {
    min-height: 580px;

    padding: 70px 0;
  }

  section {
    padding: 60px 0;
  }

  .grid-2,
  .grid-3,
  .grid-4,
  .stats,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .workflow {
    grid-template-columns: 1fr;
  }

  .form-group.full {
    grid-column: auto;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .emergency-cta {
    padding: 30px 22px;
  }
}


@media (max-width: 480px) {

  .container {
    width: 91%;
  }

  .hero h1 {
    font-size: 2.45rem;
  }

  .hero-actions,
  .form-actions,
  .centre-actions {
    flex-direction: column;
  }

  .hero-actions .btn,
  .form-actions .btn,
  .centre-actions .btn {
    width: 100%;
  }

  .card,
  .service-card,
  .feature-card,
  .innovation-card,
  .blood-centre-card {
    padding: 21px;
  }
}
