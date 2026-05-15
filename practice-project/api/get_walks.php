<?php
header("Content-Type: application/json");
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