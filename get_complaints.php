<?php

include "db.php";

header("Content-Type: application/json");

$sql = "SELECT id, complaint_type, location, description, complaint_date, status
        FROM complaints
        ORDER BY complaint_date DESC";

$result = $conn->query($sql);

$complaints = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

echo json_encode($complaints);

$conn->close();

?>