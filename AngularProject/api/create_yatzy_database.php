<?php

$servername = "localhost";
$username = "root";
$password = "";

// Yhteys MySQL:ään
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

$tableSql = "CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    player_name VARCHAR(50) NOT NULL DEFAULT 'Player',

    category VARCHAR(50) NOT NULL,

    score INT NOT NULL DEFAULT 0,

    dice JSON NOT NULL,

    turn_number INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($tableSql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Table error: " . $conn->error;
}

$conn->close();
?>