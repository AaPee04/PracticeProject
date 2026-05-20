<?php

$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$dbName = "yatzy_db";

$sql = "CREATE DATABASE IF NOT EXISTS $dbName
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_general_ci";

if ($conn->query($sql) === TRUE) {
    echo "Database ready<br>";
} else {
    die("Database error: " . $conn->error);
}

$conn->select_db($dbName);

$sessionTable = "CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL DEFAULT 'Player',
    total_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sessionTable) === TRUE) {
    echo "game_sessions table ready<br>";
} else {
    die("Error game_sessions: " . $conn->error);
}

$scoresTable = "CREATE TABLE IF NOT EXISTS score_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,

    session_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,

    score INT NOT NULL DEFAULT 0,

    dice JSON NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id) REFERENCES game_sessions(id)
        ON DELETE CASCADE
)";

if ($conn->query($scoresTable) === TRUE) {
    echo "score_entries table ready<br>";
} else {
    die("Error score_entries: " . $conn->error);
}

$conn->close();

?>