<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Invalid request.";
    exit;
}

$title = $_POST["title"] ?? "";
$location = $_POST["location"] ?? "";
$description = $_POST["description"] ?? "";
$severity = $_POST["severity"] ?? "MEDIUM";

if ($title === "" || $location === "" || $description === "") {
    echo "Please fill all required fields.";
    exit;
}

$sql = "INSERT INTO traffic_alerts
        (title, location, description, severity)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Prepare failed: " . $conn->error;
    exit;
}

$stmt->bind_param(
    "ssss",
    $title,
    $location,
    $description,
    $severity
);

if ($stmt->execute()) {
    echo "Traffic alert added successfully!";
} else {
    echo "Insert failed: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>