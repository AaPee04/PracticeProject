<?php
file_put_contents("debug.txt", file_get_contents("php://input"));
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

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