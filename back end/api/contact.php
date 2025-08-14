
<?php
header("Access-Control-Allow-Origin: https://www.arizonaglf.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/email.php';
require_once __DIR__ . '/../includes/security.php';

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
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name'], $input['email'], $input['subject'], $input['message'])) {
        throw new Exception('Missing required fields');
    }

    $name = Security::sanitizeInput($input['name']);
    $email = Security::sanitizeInput($input['email']);
    $subject = Security::sanitizeInput($input['subject']);
    $message = Security::sanitizeInput($input['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Rate limiting (basic)
    $ip = $_SERVER['REMOTE_ADDR'];
    $cacheFile = __DIR__ . '/../cache/contact_' . md5($ip) . '.txt';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 60) {
        throw new Exception('Please wait before sending another message');
    }

    // Save to database
    $db = new Database();
    $messageId = $db->insert('messages', [
        'sender_name' => $name,
        'sender_email' => $email,
        'subject' => $subject,
        'body' => $message,
        'is_from_contact_form' => true,
        'status' => 'unread'
    ]);

    // Send email
    $emailHandler = new EmailHandler();
    $emailSent = $emailHandler->sendContactForm($name, $email, $subject, $message);

    // Create rate limit cache
    if (!is_dir(__DIR__ . '/../cache')) {
        mkdir(__DIR__ . '/../cache', 0755, true);
    }
    file_put_contents($cacheFile, time());

    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully',
        'id' => $messageId,
        'email_sent' => $emailSent
    ]);

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>
