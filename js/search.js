/* =========================================================
   RaktSathi - Smart Resource Search
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initResourceSearch();
});


const DATA_URL = "data/blood-centres.json";


/* =========================================================
   INITIALIZE SEARCH
   ========================================================= */

function initResourceSearch() {
  const searchForm =
    document.getElementById("bloodSearchForm");

  if (!searchForm) return;

  loadBloodCentres();

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    performSearch();
  });

  document
    .querySelectorAll("#bloodGroup, #component, #district, #centre")
    .forEach(element => {
      element.addEventListener("change", performSearch);
    });
}


/* =========================================================
   LOAD BLOOD CENTRES
   ========================================================= */

async function loadBloodCentres() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Unable to load blood-centre data.");
    }

    const data = await response.json();

    window.raktSathiCentres =
      Array.isArray(data)
        ? data
        : data.centres || [];

    populateCentreFilter(
      window.raktSathiCentres
    );

    displayResults(
      window.raktSathiCentres
    );

  } catch (error) {
    console.error(
      "RaktSathi search error:",
      error
    );

    showSearchMessage(
      "Blood-centre data load nahi ho paya. Please try again.",
      "error"
    );
  }
}


/* =========================================================
   CENTRE FILTER
   ========================================================= */

function populateCentreFilter(centres) {
  const select =
    document.getElementById("centre");

  if (!select) return;

  const names = [
    ...new Set(
      centres
        .map(centre => centre.name)
        .filter(Boolean)
    )
  ];

  names.forEach(name => {
    const option =
      document.createElement("option");

    option.value = name;
    option.textContent = name;

    select.appendChild(option);
  });
}


/* =========================================================
   PERFORM SEARCH
   ========================================================= */

function performSearch() {
  const centres =
    window.raktSathiCentres || [];

  if (!centres.length) return;

  const bloodGroup =
    getValue("bloodGroup");

  const component =
    getValue("component");

  const district =
    getValue("district");

  const centre =
    getValue("centre");

  const results =
    centres.filter(item => {

      const groupMatch =
        !bloodGroup ||
        (
          Array.isArray(item.blood_groups) &&
          item.blood_groups.includes(bloodGroup)
        );

      const componentMatch =
        !component ||
        (
          Array.isArray(item.components) &&
          item.components.includes(component)
        );

      const districtMatch =
        !district ||
        String(item.district || "")
          .toLowerCase()
          .includes(district.toLowerCase());

      const centreMatch =
        !centre ||
        item.name === centre;

      return (
        groupMatch &&
        componentMatch &&
        districtMatch &&
        centreMatch
      );
    });

  displayResults(results);
}


/* =========================================================
   DISPLAY RESULTS
   ========================================================= */

function displayResults(results) {
  const container =
    document.getElementById("bloodResults");

  if (!container) return;

  if (!results.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No matching resource found</h3>
        <p>
          Try changing your blood group, component,
          district or centre filters.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    results.map(centre => {

      const mapsQuery =
        encodeURIComponent(
          centre.address ||
          `${centre.name}, ${centre.city}, ${centre.state}`
        );

      const groups =
        Array.isArray(centre.blood_groups)
          ? centre.blood_groups.join(", ")
          : "Information not available";

      const components =
        Array.isArray(centre.components)
          ? centre.components.join(", ")
          : "Information not available";

      return `
        <article class="blood-centre-card">

          <div class="centre-header">
            <div>
              <span class="centre-badge">
                ${escapeHTML(
                  centre.status ||
                  "Verification Required"
                )}
              </span>

              <h3>
                ${escapeHTML(
                  centre.name
                )}
              </h3>
            </div>
          </div>


          <div class="centre-info">

            <p>
              <strong>District:</strong>
              ${escapeHTML(
                centre.district || "—"
              )}
            </p>

            <p>
              <strong>Location:</strong>
              ${escapeHTML(
                centre.address || "—"
              )}
            </p>

            <p>
              <strong>Blood Groups:</strong>
              ${escapeHTML(groups)}
            </p>

            <p>
              <strong>Components:</strong>
              ${escapeHTML(components)}
            </p>

          </div>


          <div class="centre-actions">

            <a
              href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              View on Map
            </a>

            <button
              type="button"
              class="btn btn-primary"
              onclick="requestResource('${escapeHTML(
                centre.name
              )}')"
            >
              Start Coordination
            </button>

          </div>


          <div class="verification-note">
            Availability is not guaranteed.
            Please verify current availability and
            eligibility directly with the authorized facility.
          </div>

        </article>
      `;
    }).join("");
}


/* =========================================================
   START COORDINATION
   ========================================================= */

function requestResource(centreName) {
  const message =
    `Resource coordination started for ${centreName}.`;

  showSearchMessage(
    message,
    "success"
  );

  setTimeout(() => {
    window.location.href =
      "blood-request.html";
  }, 900);
}


/* =========================================================
   SEARCH MESSAGE
   ========================================================= */

function showSearchMessage(message, type) {
  const container =
    document.getElementById("searchMessage");

  if (!container) {
    console.log(message);
    return;
  }

  container.textContent = message;
  container.className =
    `search-message ${type}`;

  container.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
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


function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
