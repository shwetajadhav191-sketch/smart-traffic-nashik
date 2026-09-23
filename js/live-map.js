// =====================================================
// SMART TRAFFIC NASHIK - LIVE TRAFFIC MAP
// =====================================================



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


// Update immediately
updateTime();

// Update every minute
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


    // Get traffic status
    const status =
        getTrafficStatus(signal.state);


    // Remove old traffic classes
    marker.classList.remove("heavy");

    marker.classList.remove("moderate");

    marker.classList.remove("clear");


    // Add new traffic class
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


    // Get traffic status
    const status =
        getTrafficStatus(signal.state);


    // Get display text
    const trafficText =
        getTrafficText(status);


    // Find status dot
    const statusDot =
        card.querySelector(".status-dot");


    // Find status text
    const statusText =
        card.querySelector(".traffic-status-text");


    // Remove old card classes
    card.classList.remove("heavy-card");

    card.classList.remove("moderate-card");

    card.classList.remove("clear-card");


    // Add new card class
    card.classList.add(
        `${status}-card`
    );


    // Update dot
    if (statusDot) {

        statusDot.classList.remove("heavy");

        statusDot.classList.remove("moderate");

        statusDot.classList.remove("clear");

        statusDot.classList.add(status);

    }


    // Update text
    if (statusText) {

        statusText.textContent =
            trafficText;

    }


    // Small animation
    card.classList.add("status-changed");


    setTimeout(function() {

        card.classList.remove("status-changed");

    }, 300);

}



// =====================================================
// UPDATE TRAFFIC INFORMATION
// =====================================================

function updateTrafficInformation(signal) {

    // Update map marker
    updateMapMarker(signal);


    // Update traffic card
    updateTrafficCard(signal);

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


    // Find lights
    const redLight =
        signalBox.querySelector(".light.red");

    const yellowLight =
        signalBox.querySelector(".light.yellow");

    const greenLight =
        signalBox.querySelector(".light.green");


    // Find text
    const statusText =
        signalBox.querySelector(".signal-status");

    const countdownText =
        signalBox.querySelector(".countdown");


    // Remove active class
    redLight.classList.remove("active");

    yellowLight.classList.remove("active");

    greenLight.classList.remove("active");


    // =================================================
    // TURN ON CORRECT LIGHT
    // =================================================

    if (signal.state === "RED") {

        redLight.classList.add("active");

    }

    else if (signal.state === "YELLOW") {

        yellowLight.classList.add("active");

    }

    else if (signal.state === "GREEN") {

        greenLight.classList.add("active");

    }


    // =================================================
    // UPDATE SIGNAL TEXT
    // =================================================

    statusText.textContent =
        signal.state;

    countdownText.textContent =
        signal.countdown;


    // =================================================
    // UPDATE TRAFFIC INFORMATION
    // =================================================

    updateTrafficInformation(signal);

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

        // Reduce countdown
        signal.countdown--;


        // If countdown reaches zero
        if (signal.countdown <= 0) {

            // Change signal
            nextSignalState(signal);

        }


        // Update webpage
        updateSignal(signal);

    });

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

setInterval(updateCountdown, 1000);