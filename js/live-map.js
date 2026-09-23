// ================= LIVE MAP =================

function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("lastUpdated").textContent = time;
}

updateTime();


// ================= LIVE TRAFFIC SIGNALS =================

const signals = document.querySelectorAll(".signal");

const signalData = [
    {
        state: "red",
        time: 20
    },
    {
        state: "green",
        time: 30
    }
];


function updateSignals() {

    signals.forEach((signal, index) => {

        const data = signalData[index];

        const red = signal.querySelector(".red");
        const yellow = signal.querySelector(".yellow");
        const green = signal.querySelector(".green");

        const status = signal.querySelector(".signal-status");
        const countdown = signal.querySelector(".countdown");


        // Turn all lights OFF
        red.classList.remove("active");
        yellow.classList.remove("active");
        green.classList.remove("active");


        // Turn ON current light
        if (data.state === "red") {

            red.classList.add("active");
            status.textContent = "RED";

        } else if (data.state === "yellow") {

            yellow.classList.add("active");
            status.textContent = "YELLOW";

        } else {

            green.classList.add("active");
            status.textContent = "GREEN";
        }


        // Update countdown
        countdown.textContent = data.time + " sec";
    });
}


function signalTimer() {

    signalData.forEach((data) => {

        data.time--;

        if (data.time <= 0) {

            if (data.state === "red") {

                data.state = "green";
                data.time = 30;

            } else if (data.state === "green") {

                data.state = "yellow";
                data.time = 5;

            } else {

                data.state = "red";
                data.time = 20;
            }
        }
    });

    updateSignals();
}


// Start signals
updateSignals();


// Run every 1 second
setInterval(signalTimer, 1000);