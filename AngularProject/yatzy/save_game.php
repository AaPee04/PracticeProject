<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yatzy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$player = $data["player_name"] ?? "Player";
$total = $data["total_score"] ?? 0;
$scores = $data["scores"] ?? [];
$diceHistory = $data["dice_history"] ?? [];

$stmt = $conn->prepare("INSERT INTO game_sessions (player_name, total_score) VALUES (?, ?)");
$stmt->bind_param("si", $player, $total);
$stmt->execute();

$sessionId = $stmt->insert_id;
$stmt->close();

$stmt = $conn->prepare("INSERT INTO score_entries (session_id, category, score, dice) VALUES (?, ?, ?, ?)");

foreach ($scores as $category => $score) {

    $dice = json_encode($diceHistory[$category] ?? []);

    $stmt->bind_param("isis", $sessionId, $category, $score, $dice);
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "message" => "Game saved",
    "session_id" => $sessionId
]);

?>