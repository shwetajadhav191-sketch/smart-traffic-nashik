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
        name: "Mumbai Naka",
        element: 4,
        state: "RED",
        countdown: 20
    }

];


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

    const location = document.querySelector(
        `.location[data-signal="${signal.element}"]`
    );

    if (!location) {
        return;
    }

    const marker =
        location.querySelector(".marker");

    if (!marker) {
        return;
    }

    const status =
        getTrafficStatus(signal.state);

    marker.classList.remove(
        "heavy",
        "moderate",
        "clear"
    );

    marker.classList.add(status);
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

    const signalBox = document.querySelector(
        `.signal-${signal.element}`
    );

    if (!signalBox) {
        return;
    }

    const redLight =
        signalBox.querySelector(".light.red");

    const yellowLight =
        signalBox.querySelector(".light.yellow");

    const greenLight =
        signalBox.querySelector(".light.green");

    const statusText =
        signalBox.querySelector(".signal-status");

    const countdownText =
        signalBox.querySelector(".countdown");


    // Remove active state from all lights

    redLight.classList.remove("active");

    yellowLight.classList.remove("active");

    greenLight.classList.remove("active");


    // Turn on correct light

    if (signal.state === "RED") {

        redLight.classList.add("active");

    }

    else if (signal.state === "YELLOW") {

        yellowLight.classList.add("active");

    }

    else if (signal.state === "GREEN") {

        greenLight.classList.add("active");

    }


    // Update signal text

    statusText.textContent =
        signal.state;

    countdownText.textContent =
        signal.countdown;


    // Update map marker and traffic card

    updateTrafficInformation(signal);


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