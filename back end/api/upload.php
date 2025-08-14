
<?php
header("Access-Control-Allow-Origin: https://www.arizonaglf.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Verify user session
    session_start();
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Authentication required');
    }

    $userId = $_SESSION['user_id'];

    // Check if file was uploaded
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('No file uploaded or upload error');
    }

    $file = $_FILES['file'];
    
    // Validate file size
    if ($file['size'] > MAX_FILE_SIZE) {
        throw new Exception('File size exceeds maximum allowed size');
    }

    // Validate file type
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExtension, ALLOWED_FILE_TYPES)) {
        throw new Exception('File type not allowed');
    }

    // Create upload directory if it doesn't exist
    $uploadDir = UPLOAD_PATH;
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Generate unique filename
    $fileName = uniqid() . '_' . time() . '.' . $fileExtension;
    $filePath = $uploadDir . $fileName;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filePath)) {
        throw new Exception('Failed to save file');
    }

    // Save to database
    $db = new Database();
    $fileId = $db->insert('files', [
        'user_id' => $userId,
        'file_name' => $fileName,
        'original_name' => $file['name'],
        'file_path' => $filePath,
        'file_size' => $file['size'],
        'mime_type' => $file['type'],
        'uploaded_by' => $userId
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully',
        'file_id' => $fileId,
        'file_name' => $fileName,
        'original_name' => $file['name']
    ]);

} catch (Exception $e) {
    error_log("File upload error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>
