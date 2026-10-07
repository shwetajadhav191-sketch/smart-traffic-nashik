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


/* =========================
   HANDLE COMPLAINT IMAGE
========================= */

$image_path = "";

if (isset($_FILES["complaint_image"]) && $_FILES["complaint_image"]["error"] === UPLOAD_ERR_OK) {

    $image = $_FILES["complaint_image"];

    /* Check file type */
    $allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!in_array($image["type"], $allowed_types)) {
        echo "Invalid image type. Please upload JPG, PNG or WEBP.";
        exit;
    }

    /* Check file size - maximum 5 MB */
    if ($image["size"] > 5 * 1024 * 1024) {
        echo "Image is too large. Maximum size is 5 MB.";
        exit;
    }

    /* Create unique filename */
    $extension = pathinfo($image["name"], PATHINFO_EXTENSION);

    $file_name = uniqid("complaint_", true) . "." . $extension;

    /* Folder where image will be stored */
    $upload_folder = "uploads/complaints/";

    $target_file = $upload_folder . $file_name;

    /* Move uploaded image */
    if (!move_uploaded_file($image["tmp_name"], $target_file)) {
        echo "Failed to upload image.";
        exit;
    }

    $image_path = $target_file;
}


/* =========================
   INSERT COMPLAINT
========================= */

$sql = "INSERT INTO complaints
        (complaint_type, location, description, image_path)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Prepare failed: " . $conn->error;
    exit;
}

$stmt->bind_param(
    "ssss",
    $complaint_type,
    $location,
    $description,
    $image_path
);

if ($stmt->execute()) {
    echo "Complaint submitted successfully!";
} else {
    echo "Insert failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>