<?php
require_once __DIR__ . '/../config.php';

class CSRF {
    private static function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function generateToken() {
        self::startSession();
        
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        return $_SESSION['csrf_token'];
    }

    public static function validateToken($token) {
        self::startSession();
        
        if (!isset($_SESSION['csrf_token'])) {
            return false;
        }
        
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    public static function getTokenFromRequest() {
        // Check various sources for CSRF token
        $token = null;
        
        // Check headers
        if (isset($_SERVER['HTTP_X_CSRF_TOKEN'])) {
            $token = $_SERVER['HTTP_X_CSRF_TOKEN'];
        } elseif (isset($_SERVER['HTTP_X_XSRF_TOKEN'])) {
            $token = $_SERVER['HTTP_X_XSRF_TOKEN'];
        }
        
        // Check POST data
        if (!$token && isset($_POST['csrf_token'])) {
            $token = $_POST['csrf_token'];
        }
        
        // Check JSON body
        if (!$token) {
            $input = json_decode(file_get_contents('php://input'), true);
            if (isset($input['csrf_token'])) {
                $token = $input['csrf_token'];
            }
        }
        
        return $token;
    }

    public static function requireValidToken() {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        
        // Only require CSRF token for state-changing requests
        if (!in_array($requestMethod, ['POST', 'PUT', 'DELETE', 'PATCH'])) {
            return true;
        }
        
        $token = self::getTokenFromRequest();
        
        if (!$token || !self::validateToken($token)) {
            http_response_code(419); // Laravel's CSRF token mismatch status
            echo json_encode([
                'success' => false,
                'message' => 'CSRF token mismatch'
            ]);
            exit;
        }
        
        return true;
    }

    public static function refreshToken() {
        self::startSession();
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        return $_SESSION['csrf_token'];
    }
}
?>
