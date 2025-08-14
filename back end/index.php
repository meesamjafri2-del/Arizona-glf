<?php
require_once __DIR__ . '/config.php';

// Simple router for API endpoints
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string and normalize path
$path = strtok($requestUri, '?');
$path = rtrim($path, '/');

// Handle CORS preflight
if ($requestMethod === 'OPTIONS') {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, X-Requested-With, Authorization');
    header('Access-Control-Max-Age: 86400');
    exit(0);
}

// API routing
$routes = [
    // Authentication
    '/api/auth/login' => 'api/auth/login.php',
    '/api/auth/register' => 'api/auth/register.php',
    '/api/auth/logout' => 'api/auth/logout.php',
    '/api/auth/check' => 'api/auth/check.php',
    
    // CSRF
    '/api/csrf-token' => 'api/csrf-token.php',
    
    // Files (to be implemented)
    '/api/files/upload' => 'api/files/upload.php',
    '/api/files/list' => 'api/files/list.php',
    '/api/files/delete' => 'api/files/delete.php',
    '/api/files/download' => 'api/files/download.php',
    
    // Client endpoints
    '/api/client/stats' => 'api/client/stats.php',
    
    // Admin endpoints
    '/api/admin/stats' => 'api/admin/stats.php',
    '/api/admin/users' => 'api/admin/users.php',
    '/api/admin/files' => 'api/admin/files.php',
    
    // Contact
    '/api/contact' => 'api/contact.php',
];

// Check if route exists
if (isset($routes[$path])) {
    $file = __DIR__ . '/' . $routes[$path];
    if (file_exists($file)) {
        require $file;
        exit;
    }
}

// Handle dynamic routes (with parameters)
foreach ($routes as $route => $file) {
    // Convert route pattern to regex
    $pattern = preg_replace('/\{[^}]+\}/', '([^/]+)', $route);
    $pattern = '#^' . $pattern . '$#';
    
    if (preg_match($pattern, $path, $matches)) {
        array_shift($matches); // Remove full match
        $_REQUEST['route_params'] = $matches;
        
        $filePath = __DIR__ . '/' . $file;
        if (file_exists($filePath)) {
            require $filePath;
            exit;
        }
    }
}

// Default response for unknown routes
header('Content-Type: application/json');
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'API endpoint not found',
    'path' => $path,
    'available_routes' => array_keys($routes)
]);
?>
