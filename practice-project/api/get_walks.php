<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "db.php";

$sql = "SELECT * FROM walks ORDER BY created_at DESC";
$result = $conn->query($sql);

$walks = [];

while ($row = $result->fetch_assoc()) {
    $row["route"] = json_decode($row["route"]);
    $walks[] = $row;
}

echo json_encode([
    "status" => "success",
    "walks" => $walks
]);
?>