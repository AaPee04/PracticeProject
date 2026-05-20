<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yatzy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message"=> "Connection failed"
    ]);
    exit;
}

$statsSql = "
    SELECT 
        COUNT(*) AS total_games,
        SUM(total_score) AS total_points,
        AVG(total_score) AS average_points
    FROM game_sessions
";
$statsResult = $conn->query($statsSql);
$stats = $statsResult->fetch_assoc();

$maxSql = "SELECT total_score FROM game_sessions ORDER BY total_score DESC LIMIT 1";
$maxResult = $conn->query($maxSql);
$maxRow = $maxResult->fetch_assoc();
$highest_score = $maxRow ? intval($maxRow["total_score"]) : 0;

$latestSql = "SELECT total_score FROM game_sessions ORDER BY created_at DESC LIMIT 1";
$latestResult = $conn->query($latestSql);
$latestRow = $latestResult->fetch_assoc();
$latest_score = $latestRow ? intval($latestRow["total_score"]) : 0;

echo json_encode([
    "success" => true,
    "total_games" => intval($stats["total_games"]),
    "total_points" => intval($stats["total_points"]),
    "average_points" => round(floatval($stats["average_points"]), 2),
    "highest_score" => $highest_score,
    "latest_score" => $latest_score
]);

$conn->close();
?>
