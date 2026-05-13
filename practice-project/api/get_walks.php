<?php
header("Content-Type: application/json");
require "db.php";

$sql = "SELECT id, distance, duration, avg_speed, route, created_at FROM walks ORDER BY created at DESC";
$result = $conn->query($sql);

$walks = [];

if ($result && $result -> num_rows > 0) {
    while ($row = $result -> fetch_assoc()) {
        $walks[] = [
            "id" => intval($row["id"]),
            "distance" => floatval($row["distance"]),
            "duration" => intval($row["duration"]),
            "avg_speed" => floatval($row["avg_speed"]),
            "route" => $row["route"],
            "created_at" => $row["created_at"]
        ];
    }
}

echo json_encode([
    "status" => "success",
    "walks" => $walks
]);
?>