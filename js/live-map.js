// =============================
// REAL NASHIK LEAFLET MAP
// =============================

const nashikMap = L.map("nashikMap").setView([20.0059, 73.7897], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(nashikMap);

// =====================================================
// SMART TRAFFIC NASHIK - LIVE TRAFFIC MAP
// =====================================================


// =====================================================
// SIGNAL INFORMATION PANEL ELEMENTS
// =====================================================

const signalInfoPanel =
    document.getElementById("signalInfoPanel");

const selectedSignalName =
    document.getElementById("selectedSignalName");

const selectedSignalStatus =
    document.getElementById("selectedSignalStatus");

const selectedSignalCountdown =
    document.getElementById("selectedSignalCountdown");

const selectedTrafficStatus =
    document.getElementById("selectedTrafficStatus");

const closeSignalPanel =
    document.getElementById("closeSignalPanel");


// =====================================================
// LAST UPDATED TIME
// =====================================================

function updateTime() {

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const lastUpdated =
        document.getElementById("lastUpdated");

    if (lastUpdated) {
        lastUpdated.textContent = time;
    }
}

updateTime();

setInterval(updateTime, 60000);


// =====================================================
// TRAFFIC SIGNAL DATA
// =====================================================

const signals = [

    {
        name: "CBS Signal",
        element: 1,
        state: "RED",
        countdown: 20
    },

    {
        name: "Canada Corner Signal",
        element: 2,
        state: "GREEN",
        countdown: 30
    },

    {
        name: "Trimbak Naka Signal",
        element: 3,
        state: "YELLOW",
        countdown: 5
    },

    {
        name: "Mumbai Naka Signal",
        element: 4,
        state: "RED",
        countdown: 20
    },

    {
        name: "Dwarka Signal",
        element: 5,
        state: "GREEN",
        countdown: 30
    },

    {
        name: "Shalimar Signal",
        element: 6,
        state: "RED",
        countdown: 20
    },

    {
        name: "Panchavati Karanja Signal",
        element: 7,
        state: "YELLOW",
        countdown: 5
    },

    {
        name: "Ashok Stambh Signal",
        element: 8,
        state: "GREEN",
        countdown: 30
    },

    {
        name: "Raviwar Karanja Signal",
        element: 9,
        state: "RED",
        countdown: 20
    },

    {
        name: "MICO Circle Signal",
        element: 10,
        state: "GREEN",
        countdown: 30
    },

    {
        name: "ABB Circle Signal",
        element: 11,
        state: "YELLOW",
        countdown: 5
    },

    {
        name: "Old Gangapur Naka Signal",
        element: 12,
        state: "RED",
        countdown: 20
    },

    {
        name: "Pathardi Phata Signal",
        element: 13,
        state: "GREEN",
        countdown: 30
    },

    {
        name: "BYTCO Signal",
        element: 14,
        state: "RED",
        countdown: 20
    },

    {
        name: "Nashik Road Railway Station Signal",
        element: 15,
        state: "YELLOW",
        countdown: 5
    }

];

// =====================================================
// NASHIK SIGNAL LOCATIONS
// =====================================================

const signalLocations = {
    1:  { lat: 20.0059, lng: 73.7897 },
    2:  { lat: 20.0006, lng: 73.7648 },
    3:  { lat: 19.9972, lng: 73.7595 },
    4:  { lat: 19.9778, lng: 73.7895 },

    5:  { lat: 19.9975, lng: 73.8070 }, // Dwarka
    6:  { lat: 20.0035, lng: 73.7800 }, // Shalimar
    7:  { lat: 20.0115, lng: 73.7965 }, // Panchavati Karanja
    8:  { lat: 20.0050, lng: 73.7755 }, // Ashok Stambh
    9:  { lat: 20.0000, lng: 73.7900 }, // Raviwar Karanja
    10: { lat: 19.9945, lng: 73.7505 }, // MICO Circle
    11: { lat: 19.9970, lng: 73.7475 }, // ABB Circle
    12: { lat: 19.9940, lng: 73.7430 }, // Old Gangapur Naka
    13: { lat: 19.9585, lng: 73.8365 }, // Pathardi Phata
    14: { lat: 19.9715, lng: 73.8245 }, // BYTCO
    15: { lat: 19.9555, lng: 73.8420 }  // Nashik Road Railway Station
};

// =====================================================
// CREATE TRAFFIC SIGNAL MARKERS
// =====================================================

function getMarkerColor(status) {

    if (status === "heavy") {
        return "#e53935";
    }

    if (status === "moderate") {
        return "#fbc02d";
    }

    return "#43a047";
}

const signalMarkers = {};

signals.forEach(function(signal) {

    const location = signalLocations[signal.element];

    if (!location) {
        return;
    }

    const status = getTrafficStatus(signal.state);

    const marker = L.circleMarker(
        [location.lat, location.lng],
        {
            radius: 9,
            color: "#ffffff",
            weight: 3,
            fillColor: getMarkerColor(status),
            fillOpacity: 1
        }
    ).addTo(nashikMap);

    marker.bindTooltip(signal.name, {
        direction: "top"
    });

    marker.bindPopup(`
        <strong>${signal.name}</strong><br>
        Status: ${getTrafficText(status)}<br>
        Signal: ${signal.state}<br>
        Countdown: ${signal.countdown} sec
    `);

    signalMarkers[signal.element] = marker;
});

// =====================================================
// SIGNAL TIMINGS
// =====================================================

const signalTimings = {

    RED: 20,

    YELLOW: 5,

    GREEN: 30

};


// =====================================================
// CONVERT SIGNAL TO TRAFFIC STATUS
// =====================================================

function getTrafficStatus(signalState) {

    if (signalState === "RED") {
        return "heavy";
    }

    else if (signalState === "YELLOW") {
        return "moderate";
    }

    else {
        return "clear";
    }
}


// =====================================================
// CONVERT STATUS TO DISPLAY TEXT
// =====================================================

function getTrafficText(status) {

    if (status === "heavy") {
        return "Heavy Traffic";
    }

    else if (status === "moderate") {
        return "Moderate Traffic";
    }

    else {
        return "Clear Traffic";
    }
}


// =====================================================
// UPDATE MAP MARKER
// =====================================================

function updateMapMarker(signal) {

    const marker = signalMarkers[signal.element];

    if (!marker) {
        return;
    }

    const status = getTrafficStatus(signal.state);

    marker.setStyle({
        fillColor: getMarkerColor(status)
    });

    marker.setPopupContent(`
        <strong>${signal.name}</strong><br>
        Status: ${getTrafficText(status)}<br>
        Signal: ${signal.state}<br>
        Countdown: ${signal.countdown} sec
    `);
}


// =====================================================
// UPDATE TRAFFIC AREA CARD
// =====================================================

function updateTrafficCard(signal) {

    const card = document.querySelector(
        `[data-signal-card="${signal.element}"]`
    );

    if (!card) {
        return;
    }

    const status =
        getTrafficStatus(signal.state);

    const trafficText =
        getTrafficText(status);

    const statusDot =
        card.querySelector(".status-dot");

    const statusText =
        card.querySelector(".traffic-status-text");

    card.classList.remove(
        "heavy-card",
        "moderate-card",
        "clear-card"
    );

    card.classList.add(
        `${status}-card`
    );

    if (statusDot) {

        statusDot.classList.remove(
            "heavy",
            "moderate",
            "clear"
        );

        statusDot.classList.add(status);
    }

    if (statusText) {
        statusText.textContent =
            trafficText;
    }

    card.classList.add("status-changed");

    setTimeout(function() {

        card.classList.remove("status-changed");

    }, 300);
}


// =====================================================
// UPDATE TRAFFIC INFORMATION
// =====================================================

function updateTrafficInformation(signal) {

    updateMapMarker(signal);

    updateTrafficCard(signal);
}


// =====================================================
// UPDATE SIGNAL INFORMATION PANEL
// =====================================================

function updateInformationPanel(signal) {

    if (!signalInfoPanel) {
        return;
    }

    // Only update the panel if it is currently open
    if (!signalInfoPanel.classList.contains("show")) {
        return;
    }

    if (selectedSignalName) {
        selectedSignalName.textContent =
            signal.name;
    }

    if (selectedSignalStatus) {
        selectedSignalStatus.textContent =
            signal.state;
    }

    if (selectedSignalCountdown) {
        selectedSignalCountdown.textContent =
            signal.countdown;
    }

    if (selectedTrafficStatus) {

        const trafficStatus =
            getTrafficStatus(signal.state);

        selectedTrafficStatus.textContent =
            getTrafficText(trafficStatus);
    }
}


// =====================================================
// UPDATE ONE SIGNAL
// =====================================================

function updateSignal(signal) {

    // Update map marker
    updateMapMarker(signal);

    // Update traffic area card
    updateTrafficCard(signal);

    // Update information panel
    updateInformationPanel(signal);
}

// =====================================================
// CHANGE TO NEXT SIGNAL STATE
// =====================================================

function nextSignalState(signal) {

    if (signal.state === "RED") {

        signal.state = "GREEN";

        signal.countdown =
            signalTimings.GREEN;

    }

    else if (signal.state === "GREEN") {

        signal.state = "YELLOW";

        signal.countdown =
            signalTimings.YELLOW;

    }

    else if (signal.state === "YELLOW") {

        signal.state = "RED";

        signal.countdown =
            signalTimings.RED;

    }
}


// =====================================================
// COUNTDOWN
// =====================================================

function updateCountdown() {

    signals.forEach(function(signal) {

        signal.countdown--;

        if (signal.countdown <= 0) {

            nextSignalState(signal);

        }

        updateSignal(signal);

    });
}


// =====================================================
// CLICKABLE SIGNAL INFORMATION
// =====================================================

signals.forEach(function(signal) {

    const signalBox =
        document.querySelector(
            `.signal-${signal.element}`
        );

    if (!signalBox) {
        return;
    }

    signalBox.addEventListener(
        "click",
        function() {

            if (!signalInfoPanel) {
                return;
            }

            if (selectedSignalName) {

                selectedSignalName.textContent =
                    signal.name;
            }

            if (selectedSignalStatus) {

                selectedSignalStatus.textContent =
                    signal.state;
            }

            if (selectedSignalCountdown) {

                selectedSignalCountdown.textContent =
                    signal.countdown;
            }

            if (selectedTrafficStatus) {

                const trafficStatus =
                    getTrafficStatus(signal.state);

                selectedTrafficStatus.textContent =
                    getTrafficText(trafficStatus);
            }

            signalInfoPanel.classList.add("show");

        }
    );

});


// =====================================================
// CLOSE SIGNAL INFORMATION PANEL
// =====================================================

if (closeSignalPanel) {

    closeSignalPanel.addEventListener(
        "click",
        function(event) {

            // Prevent click from going to the signal/map
            event.stopPropagation();

            if (signalInfoPanel) {

                signalInfoPanel.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// INITIAL DISPLAY
// =====================================================

signals.forEach(function(signal) {

    updateSignal(signal);

});


// =====================================================
// RUN EVERY SECOND
// =====================================================

setInterval(
    updateCountdown,
    1000
);