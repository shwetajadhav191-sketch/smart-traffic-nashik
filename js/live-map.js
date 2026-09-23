// =====================================================
// SMART TRAFFIC NASHIK - LIVE TRAFFIC SIGNALS
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

    const lastUpdated = document.getElementById("lastUpdated");

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
// UPDATE ONE SIGNAL
// =====================================================

function updateSignal(signal) {

    const signalBox = document.querySelector(
        `.signal-${signal.element}`
    );

    if (!signalBox) {
        return;
    }


    // Find the three lights
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


    // Remove active class from all lights
    redLight.classList.remove("active");

    yellowLight.classList.remove("active");

    greenLight.classList.remove("active");


    // =================================================
    // TURN ON THE CORRECT LIGHT
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
    // UPDATE TEXT
    // =================================================

    statusText.textContent = signal.state;

    countdownText.textContent = signal.countdown;

}



// =====================================================
// CHANGE TO NEXT SIGNAL STATE
// =====================================================

function nextSignalState(signal) {


    if (signal.state === "RED") {

        signal.state = "GREEN";

        signal.countdown = signalTimings.GREEN;

    }


    else if (signal.state === "GREEN") {

        signal.state = "YELLOW";

        signal.countdown = signalTimings.YELLOW;

    }


    else if (signal.state === "YELLOW") {

        signal.state = "RED";

        signal.countdown = signalTimings.RED;

    }

}



// =====================================================
// COUNTDOWN
// =====================================================

function updateCountdown() {

    signals.forEach(function(signal) {


        // Reduce countdown by 1 second
        signal.countdown--;


        // When countdown reaches zero
        if (signal.countdown <= 0) {

            // Move to next state
            nextSignalState(signal);

        }


        // Update the signal on the webpage
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