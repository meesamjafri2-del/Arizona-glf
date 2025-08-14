
<?php
session_start();

require_once '../config.php';

header("Access-Control-Allow-Origin: https://www.arizonaglf.com");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    echo json_encode([
        'authenticated' => false,
        'user' => null
    ]);
    exit();
}

try {
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT id, name, email, role FROM users WHERE id = ? AND is_active = 1");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        session_destroy();
        echo json_encode([
            'authenticated' => false,
            'user' => null
        ]);
        exit();
    }
    
    $user = $result->fetch_assoc();
    
    echo json_encode([
        'authenticated' => true,
        'user' => $user
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'authenticated' => false,
        'user' => null
    ]);
    error_log($e->getMessage());
}
?>
