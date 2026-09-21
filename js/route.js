// ======================================
// Smart Traffic Nashik
// Route JavaScript
// ======================================


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
// Find Route
// ======================================

findRouteBtn.addEventListener(
    "click",
    function () {

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


        // Demo route information

        distance.textContent =
            "8.5 km";

        travelTime.textContent =
            "22 minutes";

        traffic.textContent =
            "Moderate";


        // Show route result

        routeResult.classList.remove(
            "hidden"
        );


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
    function () {

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