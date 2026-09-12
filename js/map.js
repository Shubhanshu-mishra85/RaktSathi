/* =========================================
   VITALLOOP - BLOOD RESOURCE MAP
   Interactive Demo Map Logic
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mapContainer = document.querySelector("#bloodMap");

    if (!mapContainer) {
        return;
    }

    /*
      Demo blood-resource locations.
      These are prototype/demo records only.
      They do NOT represent live blood inventory.
    */

    const resources = [
        {
            name: "VitalCare Blood Centre",
            city: "Lucknow",
            group: "O+",
            status: "Available for enquiry",
            type: "Blood Centre"
        },
        {
            name: "City Blood Resource Centre",
            city: "Kanpur",
            group: "B+",
            status: "Available for enquiry",
            type: "Blood Centre"
        },
        {
            name: "LifeLine Blood Centre",
            city: "Lucknow",
            group: "A+",
            status: "Available for enquiry",
            type: "Blood Centre"
        },
        {
            name: "Hope Blood Centre",
            city: "Prayagraj",
            group: "AB+",
            status: "Available for enquiry",
            type: "Blood Centre"
        },
        {
            name: "CarePlus Blood Centre",
            city: "Varanasi",
            group: "O-",
            status: "Available for enquiry",
            type: "Blood Centre"
        }
    ];

    /*
      Create demo resource cards
    */

    function showResources(list) {

        let existingList = document.querySelector("#resourceList");

        if (!existingList) {

            existingList = document.createElement("div");

            existingList.id = "resourceList";

            existingList.style.display = "grid";
            existingList.style.gridTemplateColumns =
                "repeat(auto-fit, minmax(250px, 1fr))";
            existingList.style.gap = "16px";
            existingList.style.marginTop = "20px";

            mapContainer.appendChild(existingList);
        }

        existingList.innerHTML = "";

        if (list.length === 0) {

            existingList.innerHTML = `
                <div style="
                    padding:20px;
                    border-radius:16px;
                    background:#fff;
                    border:1px solid #e5e7eb;
                    color:#64748b;
                    text-align:center;
                ">
                    No demo resources found.
                </div>
            `;

            return;
        }

        list.forEach(function (resource) {

            const card = document.createElement("div");

            card.style.padding = "20px";
            card.style.borderRadius = "18px";
            card.style.background = "#ffffff";
            card.style.border = "1px solid #e5e7eb";
            card.style.boxShadow = "0 8px 25px rgba(15,23,42,0.06)";
            card.style.transition = "transform .25s ease, box-shadow .25s ease";

            card.innerHTML = `
                <div style="
                    font-size:28px;
                    margin-bottom:10px;
                ">🩸</div>

                <h3 style="
                    margin:0 0 8px;
                    color:#0f172a;
                ">
                    ${resource.name}
                </h3>

                <p style="
                    margin:5px 0;
                    color:#64748b;
                ">
                    📍 ${resource.city}
                </p>

                <p style="
                    margin:5px 0;
                    color:#334155;
                ">
                    Blood Group: <strong>${resource.group}</strong>
                </p>

                <p style="
                    margin:10px 0 0;
                    color:#16a34a;
                    font-weight:600;
                ">
                    ● ${resource.status}
                </p>

                <small style="
                    display:block;
                    margin-top:10px;
                    color:#94a3b8;
                ">
                    ${resource.type} • Demo data
                </small>
            `;

            card.addEventListener("mouseenter", function () {
                card.style.transform = "translateY(-5px)";
                card.style.boxShadow =
                    "0 14px 35px rgba(15,23,42,0.10)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "translateY(0)";
                card.style.boxShadow =
                    "0 8px 25px rgba(15,23,42,0.06)";
            });

            existingList.appendChild(card);
        });
    }


    /*
      Initial resources
    */

    showResources(resources);


    /*
      Blood group filter
    */

    const bloodFilter = document.querySelector("#bloodGroupFilter");

    if (bloodFilter) {

        bloodFilter.addEventListener("change", function () {

            const selectedGroup = this.value.trim();

            if (!selectedGroup || selectedGroup === "all") {

                showResources(resources);

                return;
            }

            const filtered = resources.filter(function (resource) {

                return resource.group === selectedGroup;

            });

            showResources(filtered);
        });
    }


    /*
      City search
    */

    const citySearch = document.querySelector("#citySearch");

    if (citySearch) {

        citySearch.addEventListener("input", function () {

            const query = this.value.toLowerCase().trim();

            const filtered = resources.filter(function (resource) {

                return (
                    resource.city.toLowerCase().includes(query) ||
                    resource.name.toLowerCase().includes(query) ||
                    resource.group.toLowerCase().includes(query)
                );

            });

            showResources(filtered);
        });
    }


    /*
      Find resource button
    */

    const findButton = document.querySelector("#findResources");

    if (findButton) {

        findButton.addEventListener("click", function () {

            const city =
                citySearch ? citySearch.value.toLowerCase().trim() : "";

            const group =
                bloodFilter ? bloodFilter.value.trim() : "";

            let filtered = resources;

            if (city) {

                filtered = filtered.filter(function (resource) {

                    return (
                        resource.city.toLowerCase().includes(city) ||
                        resource.name.toLowerCase().includes(city)
                    );

                });
            }

            if (group && group !== "all") {

                filtered = filtered.filter(function (resource) {

                    return resource.group === group;

                });
            }

            showResources(filtered);

            const list = document.querySelector("#resourceList");

            if (list) {

                list.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });
    }


    /*
      Demo location button
    */

    const locationButton =
        document.querySelector("#useLocation");

    if (locationButton) {

        locationButton.addEventListener("click", function () {

            if (!navigator.geolocation) {

                alert(
                    "Location service is not supported by this browser."
                );

                return;
            }

            locationButton.textContent = "Finding location...";

            navigator.geolocation.getCurrentPosition(

                function () {

                    /*
                      For this prototype we do not calculate
                      real blood-centre distance.
                    */

                    locationButton.textContent =
                        "✓ Location detected";

                    alert(
                        "Location detected for prototype use. " +
                        "Live centre matching will require verified backend data."
                    );

                },

                function () {

                    locationButton.textContent =
                        "Use My Location";

                    alert(
                        "Location permission was not available. " +
                        "You can search by city instead."
                    );

                }

            );

        });
    }


    /*
      Map marker animation support
    */

    const markers =
        document.querySelectorAll(".map-marker");

    markers.forEach(function (marker, index) {

        marker.style.animationDelay =
            (index * 0.15) + "s";

        marker.addEventListener("click", function () {

            const resourceName =
                marker.getAttribute("data-resource");

            if (resourceName) {

                alert(
                    resourceName +
                    "\n\nPrototype resource marker.\n" +
                    "Please verify availability with the authorized blood centre."
                );

            }

        });

    });


    /*
      Safety notice
    */

    const notice =
        document.querySelector("#mapSafetyNotice");

    if (notice) {

        notice.innerHTML = `
            <strong>Safety note:</strong>
            VitalLoop is a discovery and coordination layer.
            It does not collect, test, store, transport or issue blood.
            Availability shown in this prototype is demo data and is
            not a guarantee of real-time inventory.
        `;

    }

});
