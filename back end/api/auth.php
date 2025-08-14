
<?php
require_once '../includes/db.php';
require_once '../includes/security.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];
$request = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'login':
                handleLogin($request);
                break;
            case 'logout':
                handleLogout();
                break;
            case 'register':
                handleRegister($request);
                break;
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
        break;
        
    case 'GET':
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'verify':
                handleVerifySession();
                break;
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handleLogin($request) {
    global $pdo;
    
    if (!isset($request['email']) || !isset($request['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password required']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, email, password_hash, role, status FROM users WHERE email = ? AND status = 'active'");
        $stmt->execute([$request['email']]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($request['password'], $user['password_hash'])) {
            // Start session
            session_start();
            session_regenerate_id(true);
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['last_activity'] = time();
            
            // Log successful login
            $stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action, ip_address) VALUES (?, 'login', ?)");
            $stmt->execute([$user['id'], $_SERVER['REMOTE_ADDR']]);
            
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleLogout() {
    session_start();
    
    if (isset($_SESSION['user_id'])) {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action, ip_address) VALUES (?, 'logout', ?)");
        $stmt->execute([$_SESSION['user_id'], $_SERVER['REMOTE_ADDR']]);
    }
    
    session_destroy();
    echo json_encode(['success' => true]);
}

function handleRegister($request) {
    global $pdo;
    
    $required = ['name', 'email', 'password', 'company'];
    foreach ($required as $field) {
        if (!isset($request[$field]) || empty($request[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Field '$field' is required"]);
            return;
        }
    }
    
    // Validate email
    if (!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        return;
    }
    
    // Check if email already exists
    try {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$request['email']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already registered']);
            return;
        }
        
        // Create user
        $passwordHash = password_hash($request['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash, company, role, status, created_at) VALUES (?, ?, ?, ?, 'client', 'active', NOW())");
        $stmt->execute([
            $request['name'],
            $request['email'],
            $passwordHash,
            $request['company']
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Create user directory
        $userDir = "../uploads/clients/" . $userId;
        if (!file_exists($userDir)) {
            mkdir($userDir, 0755, true);
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Account created successfully'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create account']);
    }
}

function handleVerifySession() {
    session_start();
    
    if (isset($_SESSION['user_id']) && isset($_SESSION['last_activity'])) {
        // Check session timeout (24 hours)
        if (time() - $_SESSION['last_activity'] > 86400) {
            session_destroy();
            http_response_code(401);
            echo json_encode(['error' => 'Session expired']);
            return;
        }
        
        $_SESSION['last_activity'] = time();
        
        echo json_encode([
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'email' => $_SESSION['user_email'],
                'role' => $_SESSION['user_role']
            ]
        ]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
}
?>
