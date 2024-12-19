<?php

$servername = "localhost";  
$username = "root";         
$password = "";            
$dbname = "corememories";   

// Create a connection using MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the character set to utf8mb4 (recommended for handling multi-byte characters, emojis, etc.)
$conn->set_charset("utf8mb4");

?>