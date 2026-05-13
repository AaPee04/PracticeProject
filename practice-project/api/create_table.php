<?php
$servername = "localhost";
$username = "root";
$password = "Holopolo123!";
$dbname = "walktracker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE walks (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  distance FLOAT NOT NULL,
  duration INT NOT NULL,
  avg_speed FLOAT NOT NULL,
  route LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "Table walks created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
?>