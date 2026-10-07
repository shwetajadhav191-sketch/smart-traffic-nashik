<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Invalid request.";
    exit;
}

$id = $_POST["id"] ?? "";
$status = $_POST["status"] ?? "";

if ($id === "" || $status === "") {
    echo "Missing complaint data.";
    exit;
}

if ($status !== "Approved" && $status !== "Rejected") {
    echo "Invalid status.";
    exit;
}

$sql = "UPDATE complaints
        SET status = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Prepare failed: " . $conn->error;
    exit;
}

$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo "Complaint status updated successfully!";
} else {
    echo "Update failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>