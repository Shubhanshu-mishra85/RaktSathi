/* =========================================================
   RaktSathi - Blood Request Controller
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initBloodRequestForm();
  initRequestTracking();
});


/* =========================================================
   BLOOD REQUEST FORM
   ========================================================= */

function initBloodRequestForm() {
  const form = document.getElementById("bloodRequestForm");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const requestId = generateRequestId();

    const request = {
      requestId: requestId,
      patientName: getValue("patientName"),
      phone: getValue("phone"),
      bloodGroup: getValue("bloodGroup"),
      component: getValue("component"),
      units: getValue("units"),
      requirementType: getValue("requirementType"),
      district: getValue("district"),
      facility: getValue("facility"),
      requiredDate: getValue("requiredDate"),
      additionalInfo: getValue("additionalInfo"),

      status: "Request Created",

      workflow: [
        "Request Created",
        "Resource Discovery",
        "Coordination",
        "Facility Verification",
        "Resolution"
      ],

      createdAt: new Date().toISOString()
    };


    /* Save prototype request locally */
    try {
      localStorage.setItem(
        "raktSathiBloodRequest",
        JSON.stringify(request)
      );
    } catch (error) {
      showMessage(
        "Request save nahi ho paya. Please try again.",
        "error"
      );
      return;
    }


    /* Success message */
    showMessage(
      `
      <strong>Request Created Successfully</strong><br><br>

      Your Request ID:
      <strong>${requestId}</strong>

      <br><br>

      Is Request ID ko future tracking ke liye save karke rakhein.

      <br><br>

      <small>
      Prototype mode: request data is currently stored on this device only.
      </small>
      `,
      "success"
    );

    form.reset();

    updateRequestStatus(request);
  });
}


/* =========================================================
   REQUEST TRACKING
   ========================================================= */

function initRequestTracking() {
  const trackingForm =
    document.getElementById("trackingForm");

  if (!trackingForm) return;

  trackingForm.addEventListener("submit", event => {
    event.preventDefault();

    const input =
      document.getElementById("trackingId");

    if (!input) return;

    const requestId =
      input.value.trim().toUpperCase();

    if (!requestId) {
      showTrackingMessage(
        "Please enter a valid Request ID.",
        "error"
      );
      return;
    }

    const request =
      getStoredRequest();

    if (!request) {
      showTrackingMessage(
        "No request found on this device.",
        "error"
      );
      return;
    }

    if (
      request.requestId.toUpperCase() !== requestId
    ) {
      showTrackingMessage(
        "Request ID match nahi hua.",
        "error"
      );
      return;
    }

    displayTrackingResult(request);
  });
}


/* =========================================================
   DISPLAY TRACKING RESULT
   ========================================================= */

function displayTrackingResult(request) {
  const result =
    document.getElementById("trackingResult");

  if (!result) return;

  result.innerHTML = `
    <div class="tracking-card">

      <div class="tracking-header">
        <span>Request ID</span>
        <strong>${escapeHTML(request.requestId)}</strong>
      </div>

      <div class="tracking-status">
        <span>Status</span>
        <strong>${escapeHTML(request.status)}</strong>
      </div>

      <div class="tracking-details">

        <p>
          <strong>Blood Group:</strong>
          ${escapeHTML(request.bloodGroup)}
        </p>

        <p>
          <strong>Component:</strong>
          ${escapeHTML(request.component)}
        </p>

        <p>
          <strong>Units:</strong>
          ${escapeHTML(request.units)}
        </p>

        <p>
          <strong>Requirement:</strong>
          ${escapeHTML(request.requirementType)}
        </p>

        <p>
          <strong>District:</strong>
          ${escapeHTML(request.district)}
        </p>

        <p>
          <strong>Healthcare Facility:</strong>
          ${escapeHTML(request.facility)}
        </p>

      </div>

      <div class="workflow">

        ${request.workflow.map((step, index) => `
          <div class="workflow-step ${
            index === 0 ? "completed" : ""
          }">

            <span class="step-number">
              ${index + 1}
            </span>

            <span>${escapeHTML(step)}</span>

          </div>
        `).join("")}

      </div>

      <p class="verification-note">
        Availability and final blood-resource coordination
        must be verified with the relevant authorized facility.
      </p>

    </div>
  `;

  result.classList.add("visible");
}


/* =========================================================
   STORAGE
   ========================================================= */

function getStoredRequest() {
  try {
    const emergencyRequest =
      localStorage.getItem(
        "raktSathiEmergencyRequest"
      );

    const bloodRequest =
      localStorage.getItem(
        "raktSathiBloodRequest"
      );

    if (bloodRequest) {
      return JSON.parse(bloodRequest);
    }

    if (emergencyRequest) {
      return JSON.parse(emergencyRequest);
    }

    return null;

  } catch (error) {
    console.error(
      "Unable to read request:",
      error
    );

    return null;
  }
}


/* =========================================================
   HELPERS
   ========================================================= */

function getValue(id) {
  const element =
    document.getElementById(id);

  return element
    ? element.value.trim()
    : "";
}


function generateRequestId() {
  const randomPart =
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

  return `RS-${randomPart}`;
}


function showMessage(message, type) {
  const container =
    document.getElementById("requestMessage");

  if (!container) {
    alert(
      message.replace(/<[^>]*>/g, "")
    );
    return;
  }

  container.innerHTML = message;
  container.className =
    `request-message ${type}`;

  container.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


function showTrackingMessage(message, type) {
  const result =
    document.getElementById("trackingResult");

  if (!result) {
    alert(message);
    return;
  }

  result.innerHTML = `
    <div class="tracking-message ${type}">
      ${escapeHTML(message)}
    </div>
  `;

  result.classList.add("visible");
}


function updateRequestStatus(request) {
  const status =
    document.querySelector(
      "[data-request-status]"
    );

  if (!status || !request) return;

  status.textContent =
    request.status;

  status.classList.add("active");
}


/* =========================================================
   BASIC HTML SAFETY
   ========================================================= */

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
