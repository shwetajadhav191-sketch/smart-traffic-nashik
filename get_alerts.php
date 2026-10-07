<?php
include "db.php";

header("Content-Type: application/json");

$alerts = [];

/* -------------------------------
   1. Get admin-created alerts
-------------------------------- */

$sql = "SELECT id, title, location, description, severity, status, created_at
        FROM traffic_alerts
        WHERE status = 'Active'
        ORDER BY created_at DESC";

$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $alerts[] = $row;
    }
}


/* -------------------------------
   2. Get approved user complaints
-------------------------------- */

$sql = "SELECT id, complaint_type, location, description, complaint_date
        FROM complaints
        WHERE status = 'Approved'
        ORDER BY complaint_date DESC";

$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {

        $alerts[] = [
            "id" => "complaint_" . $row["id"],
            "title" => "User Report: " . $row["complaint_type"],
            "location" => $row["location"],
            "description" => $row["description"],
            "severity" => "MEDIUM",
            "status" => "Active",
            "created_at" => $row["complaint_date"]
        ];
    }
}


/* -------------------------------
   3. Sort newest alerts first
-------------------------------- */

usort($alerts, function($a, $b) {
    return strtotime($b["created_at"]) - strtotime($a["created_at"]);
});


echo json_encode($alerts);

$conn->close();
?>