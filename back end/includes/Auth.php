<?php
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/CSRF.php';

class Auth {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->startSession();
    }

    private function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function register($name, $email, $password, $role = 'client') {
        // Validate input
        if (empty($name) || empty($email) || empty($password)) {
            throw new Exception('All fields are required');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format');
        }

        if (strlen($password) < 6) {
            throw new Exception('Password must be at least 6 characters long');
        }

        // Check if user already exists
        $existingUser = $this->db->fetch(
            "SELECT id FROM users WHERE email = ?",
            [$email]
        );

        if ($existingUser) {
            throw new Exception('Email already registered');
        }

        // Create user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $userId = uniqid('user_', true);

        $this->db->execute(
            "INSERT INTO users (id, name, email, password, role, created_at, is_active) VALUES (?, ?, ?, ?, ?, NOW(), 1)",
            [$userId, $name, $email, $hashedPassword, $role]
        );

        // Create user directory
        $userDir = UPLOAD_DIR . 'clients/' . $userId;
        if (!file_exists($userDir)) {
            mkdir($userDir, 0755, true);
        }

        // Auto-login user
        $user = $this->getUserById($userId);
        $this->createSession($user);

        return $user;
    }

    public function login($email, $password) {
        if (empty($email) || empty($password)) {
            throw new Exception('Email and password are required');
        }

        $user = $this->db->fetch(
            "SELECT * FROM users WHERE email = ?",
            [$email]
        );

        if (!$user || !password_verify($password, $user['password'])) {
            throw new Exception('Invalid email or password');
        }

        if (!$user['is_active']) {
            throw new Exception('Account is deactivated');
        }

        // Update last login
        $this->db->execute(
            "UPDATE users SET last_login = NOW() WHERE id = ?",
            [$user['id']]
        );

        $this->createSession($user);
        return $this->formatUserData($user);
    }

    public function logout() {
        $this->startSession();
        session_destroy();
        return true;
    }

    public function getCurrentUser() {
        $this->startSession();
        
        if (!isset($_SESSION['user_id'])) {
            return null;
        }

        $user = $this->getUserById($_SESSION['user_id']);
        
        if (!$user || !$user['is_active']) {
            $this->logout();
            return null;
        }

        return $user;
    }

    public function requireAuth() {
        $user = $this->getCurrentUser();
        
        if (!$user) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Authentication required'
            ]);
            exit;
        }

        return $user;
    }

    public function requireRole($role) {
        $user = $this->requireAuth();
        
        if ($user['role'] !== $role) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'Insufficient permissions'
            ]);
            exit;
        }

        return $user;
    }

    public function requireAdmin() {
        return $this->requireRole('admin');
    }

    private function createSession($user) {
        $this->startSession();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['csrf_token'] = CSRF::generateToken();
    }

    private function getUserById($userId) {
        $user = $this->db->fetch(
            "SELECT * FROM users WHERE id = ?",
            [$userId]
        );

        return $user ? $this->formatUserData($user) : null;
    }

    private function formatUserData($user) {
        return [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'registrationDate' => $user['created_at'],
            'lastLogin' => $user['last_login'],
            'isActive' => (bool)$user['is_active']
        ];
    }

    public function updatePassword($userId, $currentPassword, $newPassword) {
        $user = $this->db->fetch(
            "SELECT password FROM users WHERE id = ?",
            [$userId]
        );

        if (!$user || !password_verify($currentPassword, $user['password'])) {
            throw new Exception('Current password is incorrect');
        }

        if (strlen($newPassword) < 6) {
            throw new Exception('New password must be at least 6 characters long');
        }

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        
        $this->db->execute(
            "UPDATE users SET password = ? WHERE id = ?",
            [$hashedPassword, $userId]
        );

        return true;
    }
}
?>
