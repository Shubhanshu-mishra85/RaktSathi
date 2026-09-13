/* =========================================================
   RaktSathi - Nearby Resource & Location Controller
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLocationButton();
});


/* =========================================================
   LOCATION BUTTON
   ========================================================= */

function initLocationButton() {
  const button =
    document.getElementById("useLocation");

  if (!button) return;

  button.addEventListener("click", findNearbyResources);
}


/* =========================================================
   FIND NEARBY RESOURCES
   ========================================================= */

function findNearbyResources() {
  if (!navigator.geolocation) {
    showLocationMessage(
      "Your browser does not support location services.",
      "error"
    );
    return;
  }

  showLocationMessage(
    "Finding nearby blood resources...",
    "loading"
  );

  navigator.geolocation.getCurrentPosition(
    position => {

      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      window.raktSathiUserLocation =
        userLocation;

      calculateNearbyCentres(userLocation);
    },

    error => {
      let message =
        "Unable to access your location.";

      if (error.code === 1) {
        message =
          "Location permission denied. You can search by district or city.";
      }

      if (error.code === 2) {
        message =
          "Your location could not be determined.";
      }

      if (error.code === 3) {
        message =
          "Location request timed out. Please try again.";
      }

      showLocationMessage(
        message,
        "error"
      );
    },

    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    }
  );
}


/* =========================================================
   CALCULATE DISTANCE
   ========================================================= */

function calculateNearbyCentres(userLocation) {

  const centres =
    window.raktSathiCentres || [];

  if (!centres.length) {
    showLocationMessage(
      "Blood-centre data is not available yet.",
      "error"
    );

    return;
  }

  const centresWithDistance =
    centres.map(centre => {

      const latitude =
        Number(centre.latitude);

      const longitude =
        Number(centre.longitude);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
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
          latitude,
          longitude
        );

      return {
        ...centre,
        distance
      };
    });


  const validDistances =
    centresWithDistance
      .filter(item => item.distance !== null)
      .sort(
        (a, b) =>
          a.distance - b.distance
      );


  if (!validDistances.length) {

    showLocationMessage(
      "Nearby distance data is not available for the current prototype dataset. Please use district/city search.",
      "info"
    );

    return;
  }


  window.raktSathiNearbyCentres =
    validDistances;

  displayNearbyCentres(
    validDistances
  );

  showLocationMessage(
    `${validDistances.length} nearby resource(s) found.`,
    "success"
  );
}


/* =========================================================
   HAVERSINE DISTANCE
   ========================================================= */

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const earthRadius = 6371;

  const dLat =
    toRadians(lat2 - lat1);

  const dLon =
    toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}


function toRadians(value) {
  return value *
    (Math.PI / 180);
}


/* =========================================================
   DISPLAY NEARBY CENTRES
   ========================================================= */

function displayNearbyCentres(centres) {

  const container =
    document.getElementById(
      "bloodResults"
    );

  if (!container) return;

  container.innerHTML =
    centres.map(centre => {

      const distance =
        centre.distance !== null
          ? `${centre.distance.toFixed(1)} km away`
          : "Distance unavailable";

      const mapsQuery =
        encodeURIComponent(
          centre.address ||
          `${centre.name}, ${centre.city}, ${centre.state}`
        );

      return `
        <article class="blood-centre-card">

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

          <p>
            <strong>Distance:</strong>
            ${distance}
          </p>

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

          <div class="centre-actions">

            <a
              href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              View Map
            </a>

            <a
              href="blood-request.html"
              class="btn btn-primary"
            >
              Start Coordination
            </a>

          </div>

          <div class="verification-note">
            Distance is approximate.
            Current availability must be verified
            directly with the authorized facility.
          </div>

        </article>
      `;
    }).join("");
}


/* =========================================================
   LOCATION MESSAGE
   ========================================================= */

function showLocationMessage(
  message,
  type
) {
  const element =
    document.getElementById(
      "locationMessage"
    );

  if (!element) {
    console.log(message);
    return;
  }

  element.textContent = message;

  element.className =
    `location-message ${type}`;
}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
