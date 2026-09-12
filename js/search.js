/* =========================================================
   VITALLOOP — SEARCH & FILTER ENGINE
   Blood Resource Network
   Demo data only
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const resourceContainer =
    document.querySelector("#resource-list, .resource-grid");

  const campContainer =
    document.querySelector("#camp-list, .camp-grid");

  const searchInput =
    document.querySelector("#resource-search, [data-resource-search]");

  const bloodSelect =
    document.querySelector("#blood-group, [data-blood-group]");

  const citySelect =
    document.querySelector("#city, [data-city]");

  const campSearch =
    document.querySelector("#camp-search, [data-camp-search]");

  const campCity =
    document.querySelector("#camp-city, [data-camp-city]");


  /* ---------------------------------------------------------
     RESOURCE DATA
     --------------------------------------------------------- */

  let resources = [];


  async function loadResources() {

    if (!resourceContainer) return;

    try {

      const response =
        await fetch("data/resources.json");

      if (!response.ok) {
        throw new Error("Resource data could not be loaded.");
      }

      const data = await response.json();

      resources = Array.isArray(data.resources)
        ? data.resources
        : [];

      populateCities(resources);
      renderResources(resources);

    } catch (error) {

      console.error(error);

      resourceContainer.innerHTML = `
        <div class="alert alert-warning">
          Demo resource data could not be loaded.
          Please check the repository files.
        </div>
      `;

    }

  }


  /* ---------------------------------------------------------
     CITY OPTIONS
     --------------------------------------------------------- */

  function populateCities(items) {

    if (!citySelect) return;

    const cities = [
      ...new Set(
        items
          .map(item => item.city)
          .filter(Boolean)
      )
    ].sort();

    const currentValue = citySelect.value;

    citySelect.innerHTML =
      `<option value="">All cities</option>`;

    cities.forEach(city => {

      const option =
        document.createElement("option");

      option.value = city;
      option.textContent = city;

      citySelect.appendChild(option);

    });

    citySelect.value = currentValue;

  }


  /* ---------------------------------------------------------
     RESOURCE FILTER
     --------------------------------------------------------- */

  function filterResources() {

    const search =
      searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const bloodGroup =
      bloodSelect
        ? bloodSelect.value.trim().toLowerCase()
        : "";

    const city =
      citySelect
        ? citySelect.value.trim().toLowerCase()
        : "";


    const filtered = resources.filter(resource => {

      const searchableText = [

        resource.name,
        resource.type,
        resource.city,
        resource.state,
        resource.area

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


      const matchesSearch =
        !search ||
        searchableText.includes(search);


      const matchesCity =
        !city ||
        String(resource.city)
          .toLowerCase() === city;


      const matchesBlood =
        !bloodGroup ||
        Array.isArray(resource.bloodGroups) &&
        resource.bloodGroups.some(item => {

          return (
            String(item.group)
              .toLowerCase() === bloodGroup
          );

        });


      return (
        matchesSearch &&
        matchesCity &&
        matchesBlood
      );

    });


    renderResources(filtered);

  }


  /* ---------------------------------------------------------
     RESOURCE CARDS
     --------------------------------------------------------- */

  function renderResources(items) {

    if (!resourceContainer) return;


    if (!items.length) {

      resourceContainer.innerHTML = `
        <div class="alert alert-info">
          No matching demo blood resources found.
          Try another blood group or city.
        </div>
      `;

      return;

    }


    resourceContainer.innerHTML =
      items.map(resource => {

        const groups =
          Array.isArray(resource.bloodGroups)
            ? resource.bloodGroups
            : [];


        const groupHTML =
          groups.map(item => {

            const status =
              String(item.status || "")
                .toLowerCase();

            let statusClass =
              "limited";

            if (status === "available") {
              statusClass = "available";
            }

            if (status === "unavailable") {
              statusClass = "unavailable";
            }


            return `
              <span class="blood-type"
                    title="${escapeHTML(status)}">
                ${escapeHTML(item.group)}
              </span>
            `;

          }).join("");


        return `

          <article class="card resource-card">

            <div class="resource-top">

              <div>
                <h3>
                  ${escapeHTML(resource.name)}
                </h3>

                <p>
                  ${escapeHTML(resource.type || "Blood Resource")}
                </p>
              </div>

              <span class="badge badge-warning">
                DEMO
              </span>

            </div>


            <div class="resource-info">

              <div class="resource-row">
                <span>City</span>
                <span>
                  ${escapeHTML(resource.city || "—")}
                </span>
              </div>


              <div class="resource-row">
                <span>Area</span>
                <span>
                  ${escapeHTML(resource.area || "—")}
                </span>
              </div>


              <div class="resource-row">
                <span>Blood Groups</span>
                <span>
                  ${groups.length}
                </span>
              </div>


              <div class="divider"></div>


              <div>
                <p class="text-muted">
                  Available groups in this prototype:
                </p>

                <div class="blood-inline">
                  ${groupHTML}
                </div>
              </div>


              <div class="alert alert-warning mt-2">

                Prototype data only.
                Availability is not real-time or guaranteed.

              </div>

            </div>

          </article>

        `;

      }).join("");

  }


  /* ---------------------------------------------------------
     CAMP DATA
     --------------------------------------------------------- */

  let camps = [];


  async function loadCamps() {

    if (!campContainer) return;

    try {

      const response =
        await fetch("data/camps.json");

      if (!response.ok) {
        throw new Error("Camp data could not be loaded.");
      }

      const data =
        await response.json();

      camps = Array.isArray(data.camps)
        ? data.camps
        : [];

      populateCampCities(camps);
      renderCamps(camps);

    } catch (error) {

      console.error(error);

      campContainer.innerHTML = `
        <div class="alert alert-warning">
          Demo camp data could not be loaded.
        </div>
      `;

    }

  }


  /* ---------------------------------------------------------
     CAMP CITY OPTIONS
     --------------------------------------------------------- */

  function populateCampCities(items) {

    if (!campCity) return;

    const cities =
      [
        ...new Set(
          items
            .map(item => item.city)
            .filter(Boolean)
        )
      ].sort();


    const currentValue =
      campCity.value;


    campCity.innerHTML =
      `<option value="">All cities</option>`;


    cities.forEach(city => {

      const option =
        document.createElement("option");

      option.value = city;
      option.textContent = city;

      campCity.appendChild(option);

    });


    campCity.value = currentValue;

  }


  /* ---------------------------------------------------------
     CAMP FILTER
     --------------------------------------------------------- */

  function filterCamps() {

    const search =
      campSearch
        ? campSearch.value.trim().toLowerCase()
        : "";


    const city =
      campCity
        ? campCity.value.trim().toLowerCase()
        : "";


    const filtered =
      camps.filter(camp => {

        const searchableText = [

          camp.title,
          camp.organizer,
          camp.city,
          camp.state,
          camp.location

        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !search ||
          searchableText.includes(search);


        const matchesCity =
          !city ||
          String(camp.city)
            .toLowerCase() === city;


        return (
          matchesSearch &&
          matchesCity
        );

      });


    renderCamps(filtered);

  }


  /* ---------------------------------------------------------
     CAMP CARDS
     --------------------------------------------------------- */

  function renderCamps(items) {

    if (!campContainer) return;


    if (!items.length) {

      campContainer.innerHTML = `
        <div class="alert alert-info">
          No matching demo camps found.
        </div>
      `;

      return;

    }


    campContainer.innerHTML =
      items.map(camp => {

        const groups =
          Array.isArray(camp.bloodGroups)
            ? camp.bloodGroups.join(", ")
            : "—";


        return `

          <article class="card camp-card">

            <span class="camp-date">
              ${formatDate(camp.date)}
            </span>


            <h3>
              ${escapeHTML(camp.title)}
            </h3>


            <p>
              <strong>Organizer:</strong>
              ${escapeHTML(camp.organizer || "—")}
            </p>


            <p>
              <strong>Time:</strong>
              ${escapeHTML(camp.time || "—")}
            </p>


            <p>
              <strong>Location:</strong>
              ${escapeHTML(camp.location || "—")},
              ${escapeHTML(camp.city || "")}
            </p>


            <p>
              <strong>Blood groups:</strong>
              ${escapeHTML(groups)}
            </p>


            <div class="alert alert-warning mt-2">

              DEMO EVENT — Verify date, venue and organizer
              before visiting.

            </div>

          </article>

        `;

      }).join("");

  }


  /* ---------------------------------------------------------
     EVENT LISTENERS
     --------------------------------------------------------- */

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      filterResources
    );
  }


  if (bloodSelect) {
    bloodSelect.addEventListener(
      "change",
      filterResources
    );
  }


  if (citySelect) {
    citySelect.addEventListener(
      "change",
      filterResources
    );
  }


  if (campSearch) {
    campSearch.addEventListener(
      "input",
      filterCamps
    );
  }


  if (campCity) {
    campCity.addEventListener(
      "change",
      filterCamps
    );
  }


  /* ---------------------------------------------------------
     DATE FORMAT
     --------------------------------------------------------- */

  function formatDate(dateString) {

    if (!dateString) return "Date not available";

    const date =
      new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  }


  /* ---------------------------------------------------------
     HTML SAFETY
     --------------------------------------------------------- */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* ---------------------------------------------------------
     START
     --------------------------------------------------------- */

  loadResources();
  loadCamps();

});
