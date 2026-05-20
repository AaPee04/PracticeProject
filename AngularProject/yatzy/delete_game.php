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

$sessionId = $data["session_id"] ?? null;

if (!$sessionId) {
    echo json_encode([
        "success" => false,
        "message" => "Missing session_id"
    ]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM score_entries WHERE session_id = ?");
$stmt->bind_param("i", $sessionId);
$stmt->execute();
$stmt->close();

$stmt = $conn->prepare("DELETE FROM game_sessions WHERE id = ?");
$stmt->bind_param("i", $sessionId);
$stmt->execute();
$stmt->close();

$conn->close();

echo json_encode([
    "success" => true,
    "message" => "Game session deleted",
    "session_id" => $sessionId
]);

?>