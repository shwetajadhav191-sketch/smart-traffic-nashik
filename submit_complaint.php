<?php

include "db.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "PHP file is working. Waiting for complaint data.";
    exit;
}

$complaint_type = $_POST["complaint_type"] ?? "";
$location = $_POST["location"] ?? "";
$description = $_POST["description"] ?? "";

if ($complaint_type === "" || $location === "" || $description === "") {
    echo "Missing complaint data.";
    exit;
}

$sql = "INSERT INTO complaints (complaint_type, location, description)
        VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Prepare failed: " . $conn->error;
    exit;
}

$stmt->bind_param(
    "sss",
    $complaint_type,
    $location,
    $description
);

if ($stmt->execute()) {
    echo "Complaint submitted successfully!";
} else {
    echo "Insert failed: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>