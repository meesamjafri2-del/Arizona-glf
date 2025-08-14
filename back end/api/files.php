
<?php
require_once '../includes/db.php';
require_once '../includes/security.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$userId = $_SESSION['user_id'];
$userRole = $_SESSION['user_role'];

switch ($method) {
    case 'POST':
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'upload':
                handleFileUpload();
                break;
            case 'admin-upload':
                if ($userRole !== 'admin') {
                    http_response_code(403);
                    echo json_encode(['error' => 'Admin access required']);
                    return;
                }
                handleAdminFileUpload();
                break;
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
        break;
        
    case 'GET':
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'list':
                handleListFiles();
                break;
            case 'download':
                handleFileDownload();
                break;
            case 'admin-list':
                if ($userRole !== 'admin') {
                    http_response_code(403);
                    echo json_encode(['error' => 'Admin access required']);
                    return;
                }
                handleAdminListFiles();
                break;
            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
        break;
        
    case 'DELETE':
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'delete':
                handleFileDelete();
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

function handleFileUpload() {
    global $pdo, $userId;
    
    if (!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No file uploaded']);
        return;
    }
    
    $file = $_FILES['file'];
    
    // Validate file
    $allowedTypes = ['pdf', 'doc', 'docx', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'txt'];
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($fileExt, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'File type not allowed']);
        return;
    }
    
    // Check file size (10MB limit)
    if ($file['size'] > 10 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large (max 10MB)']);
        return;
    }
    
    try {
        // Create user directory if it doesn't exist
        $userDir = "../uploads/clients/" . $userId;
        if (!file_exists($userDir)) {
            mkdir($userDir, 0755, true);
        }
        
        // Generate unique filename
        $filename = uniqid() . '_' . basename($file['name']);
        $filepath = $userDir . '/' . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            // Save file info to database
            $stmt = $pdo->prepare("INSERT INTO files (user_id, original_name, stored_name, file_path, file_size, file_type, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
            $stmt->execute([
                $userId,
                $file['name'],
                $filename,
                $filepath,
                $file['size'],
                $fileExt
            ]);
            
            echo json_encode([
                'success' => true,
                'file' => [
                    'id' => $pdo->lastInsertId(),
                    'name' => $file['name'],
                    'size' => $file['size'],
                    'type' => $fileExt
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload file']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleAdminFileUpload() {
    global $pdo;
    
    $clientId = $_POST['client_id'] ?? null;
    
    if (!$clientId || !isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Client ID and file required']);
        return;
    }
    
    $file = $_FILES['file'];
    
    // Validate file (same as client upload)
    $allowedTypes = ['pdf', 'doc', 'docx', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'txt'];
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($fileExt, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'File type not allowed']);
        return;
    }
    
    try {
        // Create client directory if it doesn't exist
        $clientDir = "../uploads/clients/" . $clientId;
        if (!file_exists($clientDir)) {
            mkdir($clientDir, 0755, true);
        }
        
        // Generate unique filename
        $filename = uniqid() . '_' . basename($file['name']);
        $filepath = $clientDir . '/' . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            // Save file info to database
            $stmt = $pdo->prepare("INSERT INTO files (user_id, original_name, stored_name, file_path, file_size, file_type, uploaded_by_admin, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, 1, NOW())");
            $stmt->execute([
                $clientId,
                $file['name'],
                $filename,
                $filepath,
                $file['size'],
                $fileExt
            ]);
            
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload file']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleListFiles() {
    global $pdo, $userId;
    
    try {
        $stmt = $pdo->prepare("SELECT id, original_name, file_size, file_type, uploaded_at, uploaded_by_admin FROM files WHERE user_id = ? ORDER BY uploaded_at DESC");
        $stmt->execute([$userId]);
        $files = $stmt->fetchAll();
        
        echo json_encode(['files' => $files]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleAdminListFiles() {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT f.id, f.original_name, f.file_size, f.file_type, f.uploaded_at, f.uploaded_by_admin,
                   u.name as client_name, u.company as client_company
            FROM files f 
            JOIN users u ON f.user_id = u.id 
            ORDER BY f.uploaded_at DESC
        ");
        $stmt->execute();
        $files = $stmt->fetchAll();
        
        echo json_encode(['files' => $files]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleFileDownload() {
    global $pdo, $userId, $userRole;
    
    $fileId = $_GET['file_id'] ?? null;
    
    if (!$fileId) {
        http_response_code(400);
        echo json_encode(['error' => 'File ID required']);
        return;
    }
    
    try {
        // Check file ownership or admin access
        $sql = "SELECT file_path, original_name, user_id FROM files WHERE id = ?";
        if ($userRole !== 'admin') {
            $sql .= " AND user_id = ?";
        }
        
        $stmt = $pdo->prepare($sql);
        $params = [$fileId];
        if ($userRole !== 'admin') {
            $params[] = $userId;
        }
        $stmt->execute($params);
        
        $file = $stmt->fetch();
        
        if (!$file) {
            http_response_code(404);
            echo json_encode(['error' => 'File not found']);
            return;
        }
        
        if (file_exists($file['file_path'])) {
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $file['original_name'] . '"');
            readfile($file['file_path']);
            exit;
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'File not found on disk']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}

function handleFileDelete() {
    global $pdo, $userId, $userRole;
    
    $request = json_decode(file_get_contents('php://input'), true);
    $fileId = $request['file_id'] ?? null;
    
    if (!$fileId) {
        http_response_code(400);
        echo json_encode(['error' => 'File ID required']);
        return;
    }
    
    try {
        // Check file ownership or admin access
        $sql = "SELECT file_path, user_id FROM files WHERE id = ?";
        if ($userRole !== 'admin') {
            $sql .= " AND user_id = ?";
        }
        
        $stmt = $pdo->prepare($sql);
        $params = [$fileId];
        if ($userRole !== 'admin') {
            $params[] = $userId;
        }
        $stmt->execute($params);
        
        $file = $stmt->fetch();
        
        if (!$file) {
            http_response_code(404);
            echo json_encode(['error' => 'File not found']);
            return;
        }
        
        // Delete file from disk
        if (file_exists($file['file_path'])) {
            unlink($file['file_path']);
        }
        
        // Delete from database
        $stmt = $pdo->prepare("DELETE FROM files WHERE id = ?");
        $stmt->execute([$fileId]);
        
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}
?>
