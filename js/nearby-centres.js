// VitalLoop - Nearby Blood Centre Location System

let BLOOD_CENTRES = [];
let userLocation = null;


// Load blood-centre database
async function loadBloodCentres() {
  try {
    const response = await fetch("data/blood-centres.json");

    if (!response.ok) {
      throw new Error("Blood centre database could not be loaded.");
    }

    BLOOD_CENTRES = await response.json();

    console.log(
      "VitalLoop: Blood centres loaded:",
      BLOOD_CENTRES.length
    );

    displayBloodCentres(BLOOD_CENTRES);

  } catch (error) {
    console.error(error);

    const container =
      document.getElementById("bloodResults");

    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>

          <h3>Unable to load blood-centre data</h3>

          <p>
            Please check the blood-centres.json file.
          </p>
        </div>
      `;
    }
  }
}


// Haversine distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const dLat =
    (lat2 - lat1) * Math.PI / 180;

  const dLon =
    (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}


// Get user's current location
function useMyLocation() {

  const button =
    document.getElementById("locationButton");

  const status =
    document.getElementById("locationStatus");

  if (!navigator.geolocation) {

    if (status) {
      status.textContent =
        "❌ Location is not supported by this browser.";
    }

    return;
  }


  if (button) {

    button.disabled = true;

    button.textContent =
      "📍 Getting Location...";

  }


  if (status) {

    status.textContent =
      "📍 Requesting your location...";

  }


  navigator.geolocation.getCurrentPosition(

    function(position) {

      userLocation = {

        latitude:
          position.coords.latitude,

        longitude:
          position.coords.longitude

      };


      if (status) {

        status.textContent =
          "✅ Location detected. Calculating distances...";

      }


      calculateDistances();


      if (button) {

        button.disabled = false;

        button.textContent =
          "📍 Location Updated";

      }

    },


    function(error) {

      console.error(
        "Location error:",
        error
      );


      if (button) {

        button.disabled = false;

        button.textContent =
          "📍 Use My Location";

      }


      if (status) {

        if (error.code === 1) {

          status.textContent =
            "❌ Location permission denied. Please allow location access.";

        } else {

          status.textContent =
            "❌ Unable to get your location. Please try again.";

        }

      }

    },


    {

      enableHighAccuracy: true,

      timeout: 15000,

      maximumAge: 60000

    }

  );

}


// Calculate distance for centres
function calculateDistances() {

  if (!userLocation) return;


  BLOOD_CENTRES =
    BLOOD_CENTRES.map(function(centre) {

      if (
        centre.latitude === null ||
        centre.longitude === null ||
        centre.latitude === undefined ||
        centre.longitude === undefined
      ) {

        return {

          ...centre,

          distance: null

        };

      }


      const distance =
        calculateDistance(

          userLocation.latitude,

          userLocation.longitude,

          Number(centre.latitude),

          Number(centre.longitude)

        );


      return {

        ...centre,

        distance: distance

      };

    });


  BLOOD_CENTRES.sort(
    function(a, b) {

      if (a.distance === null) return 1;

      if (b.distance === null) return -1;

      return a.distance - b.distance;

    }
  );


  displayBloodCentres(
    BLOOD_CENTRES
  );

}


// Display centre cards
function displayBloodCentres(centres) {

  const container =
    document.getElementById(
      "bloodResults"
    );

  const resultCount =
    document.getElementById(
      "resultCount"
    );


  if (!container) return;


  if (resultCount) {

    resultCount.textContent =
      centres.length +
      " blood centre" +
      (
        centres.length === 1
          ? ""
          : "s"
      );

  }


  if (!centres.length) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          🔎
        </div>

        <h3>
          No blood centre found
        </h3>

        <p>
          Try changing your search or filter.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    centres.map(function(centre) {

      let distanceText =
        "Distance unavailable";


      if (
        centre.distance !== null &&
        centre.distance !== undefined
      ) {

        distanceText =
          centre.distance.toFixed(1)
          + " km away";

      }


      const query =
        encodeURIComponent(

          (centre.name || "") +
          " " +
          (centre.address || "") +
          " " +
          (centre.district || "") +
          " Uttar Pradesh"

        );


      let mapsLink;


      if (
        centre.latitude !== null &&
        centre.longitude !== null &&
        centre.latitude !== undefined &&
        centre.longitude !== undefined
      ) {

        mapsLink =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          centre.latitude +
          "," +
          centre.longitude;

      } else {

        mapsLink =
          "https://www.google.com/maps/search/?api=1&query=" +
          query;

      }


      return `

        <article class="blood-card">

          <div class="distance">

            📍 ${distanceText}

          </div>


          <h3>
            ${escapeHTML(
              centre.name ||
              "Blood Centre"
            )}
          </h3>


          <span class="centre-type">

            ${escapeHTML(
              centre.type ||
              "Licensed Blood Centre"
            )}

          </span>


          <p>

            <strong>
              District:
            </strong>

            ${escapeHTML(
              centre.district ||
              "Uttar Pradesh"
            )}

          </p>


          <p>

            ${escapeHTML(
              centre.address ||
              "Address not available"
            )}

          </p>


          ${
            centre.contactPerson
              ? `

                <p>

                  <strong>
                    Contact:
                  </strong>

                  ${escapeHTML(
                    centre.contactPerson
                  )}

                </p>

              `
              : ""
          }


          ${
            centre.phone
              ? `

                <p>

                  <strong>
                    Phone:
                  </strong>

                  ${escapeHTML(
                    centre.phone
                  )}

                </p>

              `
              : ""
          }


          <div class="card-actions">


            ${
              centre.phone
                ? `

                  <a
                    href="tel:${escapeHTML(
                      centre.phone
                    )}"
                  >
                    📞 Call
                  </a>

                `
                : ""
            }


            <a
              href="${mapsLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              🗺️ Directions
            </a>


          </div>


          <small>

            Source:
            ${escapeHTML(
              centre.source ||
              "SBTC UP"
            )}

            <br>

            Blood availability must be
            verified directly with the
            authorized blood centre.

          </small>


        </article>

      `;

    }).join("");

}


// Prevent unsafe HTML
function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


// Start database loading
loadBloodCentres();
