/* =========================================================
   VITALLOOP — DONOR REGISTRATION ENGINE
   Demo / Prototype Version
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.querySelector("#donor-form") ||
    document.querySelector("form[data-donor-form]") ||
    document.querySelector("form");

  if (!form) return;


  /* ---------- FIELD HELPER ---------- */

  function getField(...selectors) {

    for (const selector of selectors) {

      const element =
        document.querySelector(selector);

      if (element) return element;

    }

    return null;
  }


  const name = getField(
    "#donor-name",
    "#donorName",
    '[name="donorName"]',
    '[name="donor_name"]',
    '[name="name"]'
  );


  const bloodGroup = getField(
    "#blood-group",
    "#bloodGroup",
    '[name="bloodGroup"]',
    '[name="blood_group"]'
  );


  const city = getField(
    "#city",
    "#location",
    '[name="city"]',
    '[name="location"]'
  );


  const availability = getField(
    "#availability",
    '[name="availability"]'
  );


  const phone = getField(
    "#phone",
    "#mobile",
    '[name="phone"]',
    '[name="mobile"]'
  );


  const consent = getField(
    "#eligibility",
    "#consent",
    "#donor-consent",
    '[name="eligibility"]',
    '[name="consent"]'
  );


  /* ---------- RESULT AREA ---------- */

  let resultBox =
    document.querySelector("#donor-result");

  if (!resultBox) {

    resultBox =
      document.createElement("div");

    resultBox.id = "donor-result";
    resultBox.className = "mt-2";

    form.insertAdjacentElement(
      "afterend",
      resultBox
    );

  }


  /* ---------- DONOR ID ---------- */

  function generateDonorId() {

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    return `VL-DN-${time}-${random}`;

  }


  /* ---------- STORAGE ---------- */

  function getDonors() {

    try {

      const saved =
        localStorage.getItem(
          "vitalloop_demo_donors"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    } catch (error) {

      console.error(error);

      return [];

    }

  }


  function saveDonor(donor) {

    const donors =
      getDonors();

    donors.push(donor);

    localStorage.setItem(
      "vitalloop_demo_donors",
      JSON.stringify(donors)
    );

  }


  /* ---------- VALIDATION ---------- */

  function validate() {

    let valid = true;


    form.querySelectorAll(
      "[required]"
    ).forEach(field => {

      if (!String(field.value || "").trim()) {

        field.classList.add(
          "field-error"
        );

        valid = false;

      } else {

        field.classList.remove(
          "field-error"
        );

      }

    });


    if (
      bloodGroup &&
      !bloodGroup.value
    ) {

      bloodGroup.classList.add(
        "field-error"
      );

      valid = false;

    }


    if (
      consent &&
      (
        (
          consent.type === "checkbox" &&
          !consent.checked
        ) ||
        (
          consent.type !== "checkbox" &&
          !consent.value
        )
      )
    ) {

      consent.classList.add(
        "field-error"
      );

      valid = false;

    }


    return valid;

  }


  /* ---------- SUBMIT ---------- */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!validate()) {

        resultBox.innerHTML = `

          <div class="alert alert-warning">

            Please complete the required fields
            and confirm the eligibility acknowledgement.

          </div>

        `;

        resultBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        return;

      }


      const donorId =
        generateDonorId();


      const donor = {

        donorId: donorId,

        name:
          name
            ? name.value.trim()
            : "",

        bloodGroup:
          bloodGroup
            ? bloodGroup.value.trim()
            : "",

        city:
          city
            ? city.value.trim()
            : "",

        availability:
          availability
            ? availability.value.trim()
            : "",

        phone:
          phone
            ? phone.value.trim()
            : "",

        registeredAt:
          new Date().toISOString(),

        status:
          "Demo Registration"

      };


      /* Save locally */

      saveDonor(donor);


      /* Confirmation */

      resultBox.innerHTML = `

        <div class="alert alert-success">

          <strong>
            Donor registration completed.
          </strong>

          <br><br>

          Demo Donor ID:

          <strong>
            ${escapeHTML(donorId)}
          </strong>

          <br><br>

          Thank you for supporting voluntary
          blood donation.

        </div>


        <div class="alert alert-warning">

          <strong>Prototype notice:</strong>

          Your registration is stored only in
          this browser for demonstration.

          It is not sent to a real blood centre
          or patient.

        </div>


        <div class="alert alert-info">

          Actual blood donation must take place
          through an authorized blood centre or
          healthcare facility after required
          medical screening and testing.

        </div>

      `;


      resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });


      form.reset();

    }
  );


  /* ---------- HTML ESCAPE ---------- */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

});
