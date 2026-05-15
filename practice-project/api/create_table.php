<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "walktracker";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE IF NOT EXISTS walks (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    distance DOUBLE NOT NULL,
    duration INT NOT NULL,
    avg_speed DOUBLE NOT NULL,
    route JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table walks created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>