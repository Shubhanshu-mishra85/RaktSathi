/* =========================================================
   VITALLOOP — BLOOD REQUEST ENGINE
   Demo / Prototype Version
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.querySelector("#blood-request-form") ||
    document.querySelector("form[data-blood-request]") ||
    document.querySelector("form");

  if (!form) return;


  /* ---------------------------------------------------------
     FIELD FINDER
     Works with common IDs / names
     --------------------------------------------------------- */

  function getField(...selectors) {

    for (const selector of selectors) {

      const element = document.querySelector(selector);

      if (element) return element;

    }

    return null;
  }


  const patientName = getField(
    "#patient-name",
    "#patientName",
    '[name="patientName"]',
    '[name="patient_name"]'
  );


  const requesterName = getField(
    "#requester-name",
    "#requesterName",
    '[name="requesterName"]',
    '[name="requester_name"]'
  );


  const bloodGroup = getField(
    "#blood-group",
    "#bloodGroup",
    '[name="bloodGroup"]',
    '[name="blood_group"]'
  );


  const units = getField(
    "#units",
    "#blood-units",
    '[name="units"]',
    '[name="blood_units"]'
  );


  const hospital = getField(
    "#hospital",
    "#hospital-name",
    "#facility",
    '[name="hospital"]',
    '[name="facility"]'
  );


  const city = getField(
    "#city",
    "#location",
    '[name="city"]',
    '[name="location"]'
  );


  const urgency = getField(
    "#urgency",
    '[name="urgency"]'
  );


  const phone = getField(
    "#phone",
    "#mobile",
    '[name="phone"]',
    '[name="mobile"]'
  );


  /* ---------------------------------------------------------
     RESULT AREA
     --------------------------------------------------------- */

  let resultBox =
    document.querySelector("#request-result");

  if (!resultBox) {

    resultBox =
      document.createElement("div");

    resultBox.id = "request-result";

    resultBox.className = "mt-2";

    form.insertAdjacentElement(
      "afterend",
      resultBox
    );

  }


  /* ---------------------------------------------------------
     REQUEST ID
     --------------------------------------------------------- */

  function generateRequestId() {

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    return `VL-BR-${time}-${random}`;

  }


  /* ---------------------------------------------------------
     LOCAL STORAGE
     --------------------------------------------------------- */

  function getRequests() {

    try {

      const saved =
        localStorage.getItem(
          "vitalloop_blood_requests"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    } catch (error) {

      console.error(error);

      return [];

    }

  }


  function saveRequest(request) {

    const requests =
      getRequests();

    requests.push(request);

    localStorage.setItem(
      "vitalloop_blood_requests",
      JSON.stringify(requests)
    );

  }


  /* ---------------------------------------------------------
     VALIDATION
     --------------------------------------------------------- */

  function validateForm() {

    let valid = true;

    const requiredFields =
      form.querySelectorAll("[required]");


    requiredFields.forEach(field => {

      if (!String(field.value || "").trim()) {

        valid = false;

        field.classList.add(
          "field-error"
        );

      } else {

        field.classList.remove(
          "field-error"
        );

      }

    });


    if (bloodGroup && !bloodGroup.value) {
      valid = false;
      bloodGroup.classList.add("field-error");
    }


    if (units) {

      const number =
        Number(units.value);

      if (
        !Number.isFinite(number) ||
        number < 1 ||
        number > 20
      ) {

        valid = false;

        units.classList.add(
          "field-error"
        );

      }

    }


    return valid;

  }


  /* ---------------------------------------------------------
     LOAD DEMO RESOURCES
     --------------------------------------------------------- */

  async function findMatchingResources(
    requestedGroup,
    requestedCity
  ) {

    try {

      const response =
        await fetch(
          "data/resources.json"
        );

      if (!response.ok) {
        throw new Error(
          "Resource dataset unavailable"
        );
      }


      const data =
        await response.json();


      const resources =
        Array.isArray(data.resources)
          ? data.resources
          : [];


      const group =
        String(requestedGroup || "")
          .trim()
          .toLowerCase();


      const location =
        String(requestedCity || "")
          .trim()
          .toLowerCase();


      return resources.filter(resource => {

        const cityMatch =
          !location ||
          String(resource.city || "")
            .toLowerCase()
            .includes(location);


        const bloodMatch =
          Array.isArray(resource.bloodGroups) &&
          resource.bloodGroups.some(item => {

            return (
              String(item.group || "")
                .toLowerCase() === group
            );

          });


        return cityMatch && bloodMatch;

      });


    } catch (error) {

      console.warn(
        "Could not load demo resources:",
        error
      );

      return [];

    }

  }


  /* ---------------------------------------------------------
     DISPLAY MATCHES
     --------------------------------------------------------- */

  function displayMatches(
    matches,
    requestedGroup,
    requestedCity
  ) {

    if (!matches.length) {

      resultBox.innerHTML = `

        <div class="alert alert-info">

          <strong>Request created.</strong><br><br>

          No matching demo resource was found for
          <strong>
            ${escapeHTML(requestedGroup)}
          </strong>
          in
          <strong>
            ${escapeHTML(requestedCity || "the selected area")}
          </strong>.

          <br><br>

          This prototype does not represent
          real-time blood inventory.

        </div>

      `;

      return;

    }


    const cards =
      matches.map(resource => {

        return `

          <div class="card"
               style="padding:18px;margin-top:12px;">

            <h3>
              ${escapeHTML(resource.name)}
            </h3>

            <p class="text-muted">
              ${escapeHTML(resource.area || "")},
              ${escapeHTML(resource.city || "")}
            </p>

            <div class="resource-row">

              <span>Blood Group</span>

              <strong>
                ${escapeHTML(requestedGroup)}
              </strong>

            </div>

            <div class="resource-row">

              <span>Status</span>

              <strong class="limited">
                Demo — verify with centre
              </strong>

            </div>

          </div>

        `;

      }).join("");


    resultBox.innerHTML = `

      <div class="alert alert-success">

        <strong>
          Potential demo matches found
        </strong>

        <br>

        These are prototype resources only.
        Contact and verify availability with
        the authorized blood centre.

      </div>

      ${cards}

    `;

  }


  /* ---------------------------------------------------------
     SUBMIT
     --------------------------------------------------------- */

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!validateForm()) {

        resultBox.innerHTML = `

          <div class="alert alert-warning">

            Please complete all required
            information correctly.

          </div>

        `;

        resultBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        return;

      }


      const requestId =
        generateRequestId();


      const request = {

        requestId: requestId,

        patientName:
          patientName
            ? patientName.value.trim()
            : "",

        requesterName:
          requesterName
            ? requesterName.value.trim()
            : "",

        bloodGroup:
          bloodGroup
            ? bloodGroup.value.trim()
            : "",

        units:
          units
            ? Number(units.value)
            : 1,

        hospital:
          hospital
            ? hospital.value.trim()
            : "",

        city:
          city
            ? city.value.trim()
            : "",

        urgency:
          urgency
            ? urgency.value.trim()
            : "",

        phone:
          phone
            ? phone.value.trim()
            : "",

        createdAt:
          new Date().toISOString(),

        status:
          "Demo Request Created"

      };


      /* Save only in this browser for prototype */

      saveRequest(request);


      /* Show request confirmation */

      resultBox.innerHTML = `

        <div class="alert alert-success">

          <strong>
            Blood request created successfully.
          </strong>

          <br><br>

          Request ID:

          <strong>
            ${escapeHTML(requestId)}
          </strong>

          <br><br>

          Keep this ID for your prototype
          demonstration.

        </div>

        <div class="alert alert-warning">

          <strong>Important:</strong>

          VitalLoop is a discovery,
          matching and coordination layer.

          It does not collect, test, store,
          transport or issue blood.

          Final availability,
          compatibility and transfusion decisions
          remain with authorized blood centres
          and qualified healthcare professionals.

        </div>

      `;


      resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });


      /* Find matching demo resources */

      const matches =
        await findMatchingResources(
          request.bloodGroup,
          request.city
        );


      displayMatches(
        matches,
        request.bloodGroup,
        request.city
      );


      /* Reset form after successful save */

      form.reset();

    }
  );


  /* ---------------------------------------------------------
     ESCAPE HTML
     --------------------------------------------------------- */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

});
