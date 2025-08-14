<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react-chat";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($method == 'GET') {
    $sql = "SELECT * FROM messages ORDER BY timestamp ASC";
    $result = $conn->query($sql);

    $messages = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }

    echo json_encode($messages);
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $sender = $data->sender;
    $content = $data->content;

    $sql = "INSERT INTO messages (sender, content) VALUES ('$sender', '$content')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "New message created successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

$conn->close();
?>