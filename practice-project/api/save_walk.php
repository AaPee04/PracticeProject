<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data"]);
    exit;
}

$distance = $data['distance'];
$duration = $data['duration'];
$avg_speed = $data['avg_speed'];
$route = json_encode($data["route"]);

$stmt = $conn->prepare("INSERT INTO walks (distance, duration, avg_speed, route) VALUES (?, ?, ?, ?)");
$stmt->bind_param("dids", $distance, $duration, $avg_speed, $route);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}
?>