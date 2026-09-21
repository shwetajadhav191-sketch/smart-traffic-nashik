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