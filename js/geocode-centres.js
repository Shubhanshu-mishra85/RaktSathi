// VitalLoop - Blood Centre Geocoder
// Converts blood-centre addresses into latitude/longitude
// Uses OpenStreetMap Nominatim for geocoding.

const JSON_FILE = "../data/blood-centres.json";

async function geocodeAddress(address) {
    const query = encodeURIComponent(address + ", Lucknow, Uttar Pradesh, India");

    const url =
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${query}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Geocoding request failed");
        }

        const data = await response.json();

        if (data.length === 0) {
            return null;
        }

        return {
            latitude: Number(data[0].lat),
            longitude: Number(data[0].lon)
        };

    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}

async function geocodeAllCentres() {

    console.log("VitalLoop: Starting blood-centre geocoding...");

    const response = await fetch(JSON_FILE);
    const centres = await response.json();

    let success = 0;
    let failed = 0;

    for (let i = 0; i < centres.length; i++) {

        const centre = centres[i];

        console.log(
            `Processing ${i + 1}/${centres.length}: ${centre.name}`
        );

        // Skip already geocoded centres
        if (
            centre.latitude !== null &&
            centre.longitude !== null
        ) {
            success++;
            continue;
        }

        const result = await geocodeAddress(centre.address);

        if (result) {

            centre.latitude = result.latitude;
            centre.longitude = result.longitude;

            success++;

            console.log(
                `✓ ${centre.name}`,
                result.latitude,
                result.longitude
            );

        } else {

            failed++;

            console.warn(
                `✗ Location not found: ${centre.name}`
            );
        }

        // Respect geocoding service rate limits
        await new Promise(resolve => setTimeout(resolve, 1100));
    }

    console.log("=================================");
    console.log("VitalLoop Geocoding Complete");
    console.log("Successful:", success);
    console.log("Failed:", failed);
    console.log("=================================");

    console.log(
        "Updated data:",
        JSON.stringify(centres, null, 2)
    );

    // Download updated JSON
    const blob = new Blob(
        [JSON.stringify(centres, null, 2)],
        { type: "application/json" }
    );

    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "blood-centres-updated.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);
}


// Start
geocodeAllCentres();
