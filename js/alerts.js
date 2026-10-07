async function loadDatabaseAlerts() {

    try {

        const response = await fetch("get_alerts.php");

        if (!response.ok) {
            throw new Error("Unable to fetch alerts.");
        }

        const alerts = await response.json();

        const alertsContainer = document.getElementById("alertsContainer");

        alerts.forEach(function (alert) {

            const alertCard = document.createElement("div");

            let iconClass = "blue";
            let icon = "🚦";

            if (alert.severity === "HIGH") {
                iconClass = "red";
                icon = "⚠️";
            } else if (alert.severity === "MEDIUM") {
                iconClass = "orange";
                icon = "🚧";
            } else if (alert.severity === "LOW") {
                iconClass = "blue";
                icon = "🚗";
            }

            alertCard.className = "alert-card";

            alertCard.innerHTML = `
        <div class="alert-icon ${iconClass}">
            ${icon}
        </div>

        <div class="alert-content">

            <h3>${alert.title}</h3>

            <div class="location">
                📍 ${alert.location}
            </div>

            <p>
                ${alert.description}
            </p>

            <div class="alert-bottom">

                <span class="time">
                    ${alert.created_at}
                </span>

                <span class="badge ${alert.severity.toLowerCase()}">
                    ${alert.severity}
                </span>

            </div>

        </div>
    `;

            alertsContainer.prepend(alertCard);

        });

    } catch (error) {

        console.error("Error loading database alerts:", error);

    }
}


function refreshAlerts() {

    alert("Traffic alerts refreshed successfully!");

}


function callPolice() {

    alert("Police Emergency Number: 112");

}


function callAmbulance() {

    alert("Ambulance Emergency Number: 108");

}


function callFire() {

    alert("Fire Emergency Number: 101");

    function refreshAlerts() {
        alert("Traffic alerts refreshed successfully!");
    }

    function callPolice() {
        alert("Police Emergency Number: 112");
    }

    function callAmbulance() {
        alert("Ambulance Emergency Number: 108");
    }

    function callFire() {
        alert("Fire Brigade Emergency Number: 101");
    }

    function callHighway() {
        alert("Highway Emergency Number: 1033");
    }

    function callWomen() {
        alert("Women Helpline Number: 181");
    }

    function callChild() {
        alert("Child Helpline Number: 1098");
    }

    function callDisaster() {
        alert("Disaster Management Number: 1077");
    }
}
loadDatabaseAlerts();