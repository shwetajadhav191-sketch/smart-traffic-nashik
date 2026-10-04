// ======================================
// Smart Traffic Nashik
// Route JavaScript
// ======================================

// Initialize Route Map
const routeMap = L.map("routeMap").setView([20.0059, 73.7897], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(routeMap);

// Get HTML elements

const fromInput =
    document.getElementById("from");

const destinationInput =
    document.getElementById("destination");

const findRouteBtn =
    document.getElementById("findRouteBtn");

const swapBtn =
    document.getElementById("swapBtn");

const message =
    document.getElementById("message");

const routeResult =
    document.getElementById("routeResult");

const distance =
    document.getElementById("distance");

const travelTime =
    document.getElementById("travelTime");

const traffic =
    document.getElementById("traffic");

const fromDisplay =
    document.getElementById("fromDisplay");

const destinationDisplay =
    document.getElementById("destinationDisplay");

const fromSuggestions =
    document.getElementById("fromSuggestions");

const destinationSuggestions =
    document.getElementById("destinationSuggestions");


let currentRoute = null;


// ======================================
// Nashik Locations
// ======================================

const locations = [

    "Nashik Road",

    "Nashik Railway Station",

    "Nashik CBS",

    "Nashik City Centre",

    "College Road, Nashik",

    "Gangapur Road, Nashik",

    "Panchavati, Nashik",

    "Mahatma Nagar, Nashik",

    "Indira Nagar, Nashik",

    "Dwarka, Nashik",

    "Satpur, Nashik",

    "Ambad, Nashik",

    "CIDCO, Nashik",

    "Canada Corner, Nashik",

    "Mumbai Naka, Nashik",

    "Trimbak Road, Nashik",

    "Pathardi Phata, Nashik",

    "Deolali, Nashik",

    "KTHM College, Nashik",

    "BYK College, Nashik",

    "Nashik Municipal Corporation",

    "Sula Vineyards, Nashik"

];


// ======================================
// Show Suggestions
// ======================================

function showSuggestions(input, suggestionBox) {

    const searchText =
        input.value.trim().toLowerCase();


    // Clear old suggestions

    suggestionBox.innerHTML = "";


    // Don't show suggestions if empty

    if (searchText === "") {

        return;
    }


    // Find matching locations

    const matchingLocations =
        locations.filter(function (location) {

            return location
                .toLowerCase()
                .includes(searchText);

        });


    // Show maximum 6 suggestions

    const limitedLocations =
        matchingLocations.slice(0, 6);


    limitedLocations.forEach(function (location) {

        const suggestion =
            document.createElement("div");


        suggestion.classList.add(
            "suggestion-item"
        );


        suggestion.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            <span>${location}</span>
        `;


        // Select suggestion

        suggestion.addEventListener(
            "click",
            function () {

                input.value = location;

                suggestionBox.innerHTML = "";

                message.textContent = "";

            }
        );


        suggestionBox.appendChild(
            suggestion
        );

    });

}


// ======================================
// Starting Location Autocomplete
// ======================================

fromInput.addEventListener(
    "input",
    function () {

        showSuggestions(
            fromInput,
            fromSuggestions
        );

    }
);


// ======================================
// Destination Autocomplete
// ======================================

destinationInput.addEventListener(
    "input",
    function () {

        showSuggestions(
            destinationInput,
            destinationSuggestions
        );

    }
);

// ======================================
// Get Coordinates
// ======================================

async function getCoordinates(locationName) {

    const url =
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(locationName + ", Nashik, Maharashtra, India")}` +
        `&format=jsonv2&limit=1&countrycodes=in`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location search failed.");
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Could not find ${locationName}.`);
    }

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

// ======================================
// Find Road Route
// ======================================

async function findRoadRoute(from, destination) {

    const fromCoordinates =
        await getCoordinates(from);

    const destinationCoordinates =
        await getCoordinates(destination);


    const routeUrl =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${fromCoordinates.lon},${fromCoordinates.lat};` +
        `${destinationCoordinates.lon},${destinationCoordinates.lat}` +
        `?overview=full&geometries=geojson`;


    const response =
        await fetch(routeUrl);


    if (!response.ok) {
        throw new Error("Route service failed.");
    }


    const data =
        await response.json();


    if (
        data.code !== "Ok" ||
        !data.routes ||
        data.routes.length === 0
    ) {
        throw new Error("No road route was found.");
    }


    return data.routes[0];
}


// ======================================
// Find Route
// ======================================

findRouteBtn.addEventListener(
    "click",
    async function () {

        const from =
            fromInput.value.trim();

        const destination =
            destinationInput.value.trim();


        // Check empty fields

        if (
            from === "" ||
            destination === ""
        ) {

            message.textContent =
                "Please enter both locations.";

            routeResult.classList.add(
                "hidden"
            );

            return;
        }


        // Check same location

        if (
            from.toLowerCase() ===
            destination.toLowerCase()
        ) {

            message.textContent =
                "Starting location and destination cannot be the same.";

            routeResult.classList.add(
                "hidden"
            );

            return;
        }


        // Success message

        message.textContent =
            "Route found successfully!";


        // Display selected locations

        fromDisplay.textContent =
            from;

        destinationDisplay.textContent =
            destination;

        // Find actual road route

try {

    message.textContent =
        "Finding the best road route...";


    const route =
        await findRoadRoute(
            from,
            destination
        );


    // Remove previous route

    if (currentRoute) {
        routeMap.removeLayer(currentRoute);
    }


    // Draw new route

    currentRoute =
        L.geoJSON(
            route.geometry,
            {
                style: {
                    color: "#7054e6",
                    weight: 6,
                    opacity: 0.85
                }
            }
        ).addTo(routeMap);


    // Zoom map to route

    routeMap.fitBounds(
        currentRoute.getBounds(),
        {
            padding: [30, 30]
        }
    );


    // Distance

    const distanceKm =
        route.distance / 1000;

    distance.textContent =
        distanceKm.toFixed(1) + " km";


    // Travel time

    const timeMinutes =
        Math.round(route.duration / 60);

    travelTime.textContent =
        timeMinutes + " minutes";


    // Current traffic information

    traffic.textContent =
        "Route calculated";


    message.textContent =
        "Route found successfully!";


}
catch (error) {

    console.error(error);

    message.textContent =
        "Unable to find the route. Please try again.";

}


        // Show route result

        routeResult.classList.remove(
            "hidden"
        );
        setTimeout(() => {
            routeMap.invalidateSize();
        }, 100);

        // Hide suggestions

        fromSuggestions.innerHTML = "";

        destinationSuggestions.innerHTML = "";

    }
);


// ======================================
// Swap Locations
// ======================================

swapBtn.addEventListener(
    "click",
   async function () {

        const temporary =
            fromInput.value;

        fromInput.value =
            destinationInput.value;

        destinationInput.value =
            temporary;


        message.textContent = "";

        fromSuggestions.innerHTML = "";

        destinationSuggestions.innerHTML = "";

    }
);


// ======================================
// Close Suggestions When Clicking Outside
// ======================================

document.addEventListener(
    "click",
    function (event) {

        if (
            !fromInput.contains(event.target) &&
            !fromSuggestions.contains(event.target)
        ) {

            fromSuggestions.innerHTML = "";

        }


        if (
            !destinationInput.contains(event.target) &&
            !destinationSuggestions.contains(event.target)
        ) {

            destinationSuggestions.innerHTML = "";

        }

    }
);