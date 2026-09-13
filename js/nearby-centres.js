// VitalLoop - Nearby Blood Centre Locator

let userLocation = null;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return R * c;
}


function useMyLocation() {

  if (!navigator.geolocation) {
    alert("Your browser does not support location.");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    function(position) {

      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      console.log("User location:", userLocation);

      findNearestBloodCentres();

    },

    function(error) {

      if (error.code === 1) {
        alert(
          "Location permission denied. Please allow location access in your browser."
        );
      } else {
        alert(
          "Unable to get your location. Please try again."
        );
      }

    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}


function findNearestBloodCentres() {

  if (!userLocation) {
    alert("Please allow your location first.");
    return;
  }

  const centresWithDistance = BLOOD_CENTRES.map(function(centre) {

    // Coordinates will be added/updated in the database.
    if (
      centre.latitude === null ||
      centre.longitude === null
    ) {
      return {
        ...centre,
        distance: null
      };
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      centre.latitude,
      centre.longitude
    );

    return {
      ...centre,
      distance: distance
    };

  });

  centresWithDistance.sort(function(a, b) {

    if (a.distance === null) return 1;
    if (b.distance === null) return -1;

    return a.distance - b.distance;

  });

  displayBloodCentres(centresWithDistance);
}


function displayBloodCentres(centres) {

  const container =
    document.getElementById("bloodResults");

  if (!container) {
    console.error("bloodResults container not found.");
    return;
  }

  container.innerHTML = "";

  centres.forEach(function(centre) {

    const card =
      document.createElement("div");

    card.className = "blood-card";

    let distanceText =
      "Distance unavailable";

    if (centre.distance !== null) {
      distanceText =
        centre.distance.toFixed(1) + " km away";
    }

    const mapsLink =
      centre.latitude !== null &&
      centre.longitude !== null
        ? `https://www.google.com/maps/dir/?api=1&destination=${centre.latitude},${centre.longitude}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + " " + centre.address)}`;

    card.innerHTML = `

      <div class="distance">
        📍 ${distanceText}
      </div>

      <h3>${centre.name}</h3>

      <span class="centre-type">
        ${centre.type}
      </span>

      <p>
        <strong>District:</strong>
        ${centre.district}
      </p>

      <p>
        ${centre.address}
      </p>

      ${
        centre.contactPerson
          ? `<p>
              <strong>Contact:</strong>
              ${centre.contactPerson}
            </p>`
          : ""
      }

      ${
        centre.phone
          ? `<p>
              <strong>Phone:</strong>
              ${centre.phone}
            </p>`
          : ""
      }

      <div class="card-actions">

        ${
          centre.phone
            ? `<a href="tel:${centre.phone}">
                📞 Call
              </a>`
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
        Source: SBTC UP
        <br>
        Blood availability must be verified with the
        authorized blood centre.
      </small>

    `;

    container.appendChild(card);

  });

}
