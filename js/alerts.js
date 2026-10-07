function formatAlertTime(dateString) {
    const alertDate = new Date(dateString);
    const now = new Date();

    const difference = Math.floor((now - alertDate) / 1000);

    if (difference < 60) {
        return "Just now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
        return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return hours + (hours === 1 ? " hour ago" : " hours ago");
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return days + (days === 1 ? " day ago" : " days ago");
    }

    return alertDate.toLocaleDateString();
}

async function loadDatabaseAlerts() {

    try {

        const response = await fetch("get_alerts.php");

        if (!response.ok) {
            throw new Error("Unable to fetch alerts.");
        }

        const alerts = await response.json();

        const alertsContainer = document.getElementById("alertsContainer");

        alerts.reverse().forEach(function(alert) {
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

            alertCard.className = "alert-card database-alert";

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

                <span class="time">${formatAlertTime(alert.created_at)}</span>

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