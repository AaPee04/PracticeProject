<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

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
$category = $data["category"] ?? "";
$score = $data["score"] ?? 0;
$dice = json_encode($data["dice"] ?? []);

if (!$category) {
    echo json_encode([
        "success" => false,
        "message" => "Category missing"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO scores (player_name, category, score, dice) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $player, $category, $score, $dice);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Score saved"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>