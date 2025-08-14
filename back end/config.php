<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'arizona_glf');
define('DB_USER', 'root');
define('DB_PASS', '');

// Security configuration
define('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production');
define('CSRF_SECRET', 'your-super-secret-csrf-key-change-in-production');

// File upload configuration
define('MAX_FILE_SIZE', 50 * 1024 * 1024); // 50MB
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('ALLOWED_FILE_TYPES', [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'text/plain'
]);

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Strict');

// CORS configuration
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',
    'https://your-production-domain.com'
]);

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('America/Phoenix');

// Auto-create upload directories
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}
if (!file_exists(UPLOAD_DIR . 'clients/')) {
    mkdir(UPLOAD_DIR . 'clients/', 0755, true);
}
if (!file_exists(UPLOAD_DIR . 'admin_files/')) {
    mkdir(UPLOAD_DIR . 'admin_files/', 0755, true);
}
?>
