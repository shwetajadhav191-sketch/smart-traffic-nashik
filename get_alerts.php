<?php

include "db.php";

header("Content-Type: application/json");

$sql = "SELECT id, title, location, description, severity, status, created_at
        FROM traffic_alerts
        WHERE status = 'Active'
        ORDER BY created_at DESC";

$result = $conn->query($sql);

$alerts = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $alerts[] = $row;
    }
}

echo json_encode($alerts);

$conn->close();

?>