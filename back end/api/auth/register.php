<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../includes/Auth.php';
require_once __DIR__ . '/../../includes/CSRF.php';

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // CSRF protection
    CSRF::requireValidToken();
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
        throw new Exception('Name, email, and password are required');
    }

    $auth = new Auth();
    $user = $auth->register($input['name'], $input['email'], $input['password']);

    echo json_encode([
        'success' => true,
        'user' => $user,
        'csrf_token' => CSRF::generateToken()
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
