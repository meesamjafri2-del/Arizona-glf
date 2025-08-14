
<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'arizonag_wp167');
define('DB_USER', 'arizonag_wp167');
define('DB_PASS', 'Arizonahouse@279');

// Security settings
define('SESSION_TIMEOUT', 3600); // 1 hour
define('CSRF_TOKEN_NAME', 'csrf_token');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB

// Email configuration
define('SMTP_HOST', 'mail.arizonaglf.com');
define('SMTP_PORT', 465);
define('SMTP_USERNAME', 'info@arizonaglf.com');
define('SMTP_PASSWORD', 'Arizonahouse@279');
define('ADMIN_EMAIL', 'info@arizonaglf.com');

// File upload settings
define('UPLOAD_PATH', __DIR__ . '/uploads/');
define('ALLOWED_FILE_TYPES', ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'zip']);

// Error reporting
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Set timezone
date_default_timezone_set('America/Phoenix');
?>
