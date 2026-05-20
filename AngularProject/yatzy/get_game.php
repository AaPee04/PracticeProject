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

$sessionSql = "SELECT * FROM game_sessions ORDER BY created_at DESC";
$sessionResult = $conn->query($sessionSql);

$data = [];

while ($session = $sessionResult->fetch_assoc()) {
    $sessionId = $session["id"];

    $scoresSql = "SELECT category, score FROM score_entries WHERE session_id = $sessionId";
    $scoresResult = $conn->query($scoresSql);

    $scores = [];

    while ($row = $scoresResult->fetch_assoc()) {
        $scores[$row["category"]] = $row["score"];
    }

    $data[] = [
        "id" => $sessionId,
        "player_name" => $session["player_name"],
        "total_score" => $session["total_score"],
        "created_at" => $session["created_at"],
        "scores" => $scores,
    ];
}

echo json_encode([
    "success"=> true,
    "games" => $data
]);

$conn -> close();
?>