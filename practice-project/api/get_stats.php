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

$sql = "
    SELECT
        SUM(distance) AS total_distance,
        SUM(duration) AS total_duration,
        COUNT(*) AS total_walks,
        CASE
            WHEN SUM(duration) > 0 THEN (SUM(distance) / 1000) / (SUM(duration) / 3600)
            ELSE 0
        END AS avg_speed
    FROM walks
";

$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([
        "status" => "success",
        "total_distance" => floatval($row["total_distance"] ?? 0),
        "total_duration" => intval($row["total_duration"] ?? 0),
        "total_walks" => intval($row["total_walks"] ?? 0),
        "avg_speed" => floatval($row["avg_speed"] ?? 0)
    ]);
} else {
    echo json_encode(["status" => "error"]);
}
?>