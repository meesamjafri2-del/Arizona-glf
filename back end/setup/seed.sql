-- Arizona GLF Platform Database Schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS arizona_glf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE arizona_glf;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255) NULL,
    password_reset_token VARCHAR(255) NULL,
    password_reset_expires TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    description TEXT NULL,
    tags JSON NULL,
    virus_scan_status ENUM('pending', 'clean', 'infected', 'failed') DEFAULT 'pending',
    virus_scan_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_upload_date (upload_date),
    INDEX idx_mime_type (mime_type),
    INDEX idx_public (is_public)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    is_replied BOOLEAN DEFAULT FALSE,
    admin_notes TEXT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    assigned_to VARCHAR(50) NULL,
    replied_at TIMESTAMP NULL,
    INDEX idx_created_at (created_at),
    INDEX idx_is_read (is_read),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON SET NULL
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(50) NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON SET NULL
);

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NULL,
    details JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity_type (entity_type),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON SET NULL
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_last_activity (last_activity),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- File shares table (for sharing files between users)
CREATE TABLE IF NOT EXISTS file_shares (
    id VARCHAR(50) PRIMARY KEY,
    file_id VARCHAR(50) NOT NULL,
    shared_by VARCHAR(50) NOT NULL,
    shared_with VARCHAR(50) NULL, -- NULL means public share
    share_token VARCHAR(100) UNIQUE NOT NULL,
    permissions ENUM('view', 'download') DEFAULT 'view',
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_file_id (file_id),
    INDEX idx_shared_by (shared_by),
    INDEX idx_shared_with (shared_with),
    INDEX idx_share_token (share_token),
    INDEX idx_expires_at (expires_at),
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT IGNORE INTO users (id, name, email, password, role, is_active, email_verified) VALUES 
('admin_001', 'Admin User', 'admin@demo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE, TRUE);

-- Insert demo client user
INSERT IGNORE INTO users (id, name, email, password, role, is_active, email_verified) VALUES 
('client_001', 'Demo Client', 'client@demo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', TRUE, TRUE);

-- Insert default system settings
INSERT IGNORE INTO system_settings (setting_key, setting_value, setting_type, description) VALUES 
('max_file_size', '52428800', 'number', 'Maximum file size in bytes (50MB)'),
('allowed_file_types', '["image/jpeg","image/png","image/gif","image/webp","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/zip","text/plain"]', 'json', 'Allowed MIME types for file uploads'),
('enable_two_factor_auth', 'false', 'boolean', 'Enable two-factor authentication'),
('require_password_complexity', 'true', 'boolean', 'Require complex passwords'),
('session_timeout', '7200', 'number', 'Session timeout in seconds (2 hours)'),
('enable_virus_scanning', 'false', 'boolean', 'Enable virus scanning for uploaded files'),
('max_storage_per_user', '1073741824', 'number', 'Maximum storage per user in bytes (1GB)'),
('enable_file_sharing', 'true', 'boolean', 'Enable file sharing between users'),
('enable_public_sharing', 'false', 'boolean', 'Enable public file sharing'),
('site_name', 'Arizona GLF Platform', 'string', 'Site name'),
('admin_email', 'admin@arizonaglf.com', 'string', 'Administrator email address'),
('smtp_host', '', 'string', 'SMTP server host'),
('smtp_port', '587', 'number', 'SMTP server port'),
('smtp_username', '', 'string', 'SMTP username'),
('smtp_password', '', 'string', 'SMTP password'),
('smtp_encryption', 'tls', 'string', 'SMTP encryption (tls/ssl)');

-- Insert sample contact message
INSERT IGNORE INTO contact_messages (id, name, email, subject, message, priority) VALUES 
('contact_001', 'John Doe', 'john@example.com', 'Platform Demo Inquiry', 'I would like to learn more about the Arizona GLF platform features and pricing.', 'medium');

-- Create views for common queries
CREATE OR REPLACE VIEW user_file_stats AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    COUNT(f.id) as file_count,
    COALESCE(SUM(f.file_size), 0) as storage_used,
    MAX(f.upload_date) as last_file_upload
FROM users u
LEFT JOIN files f ON u.id = f.user_id
GROUP BY u.id, u.name, u.email, u.role;

CREATE OR REPLACE VIEW file_type_stats AS
SELECT 
    mime_type,
    COUNT(*) as file_count,
    SUM(file_size) as total_size,
    AVG(file_size) as average_size
FROM files
GROUP BY mime_type
ORDER BY file_count DESC;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_files_user_upload ON files(user_id, upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_activity_user_date ON activity_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status_date ON contact_messages(status, created_at DESC);

-- Default admin password is 'password' (hashed with bcrypt)
-- Default client password is 'password' (hashed with bcrypt)
-- Remember to change these in production!

COMMIT;
