<?php
$host = "localhost";
$user = "root";
$pass = "Holopolo123!";
$dbname = "walktracker";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>