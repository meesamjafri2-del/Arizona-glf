
-- Arizona GLF Database Schema

CREATE DATABASE IF NOT EXISTS arizona_glf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE arizona_glf;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Files table
CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_uploaded_by (uploaded_by)
);

-- Messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_user INT,
    to_user INT,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    is_from_contact_form BOOLEAN DEFAULT FALSE,
    sender_email VARCHAR(255),
    sender_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (to_user) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_from_user (from_user),
    INDEX idx_to_user (to_user),
    INDEX idx_status (status)
);

-- Site settings table
CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key)
);

-- Sessions table for better session management
CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_last_activity (last_activity)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES 
('Administrator', 'admin@arizonaglf.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert some default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES 
('company_name', 'Arizona GLF'),
('company_email', 'info@arizonaglf.com'),
('company_phone', '+1 (555) 123-4567'),
('company_address', 'Arizona, USA'),
('max_file_size', '10485760'),
('allowed_file_types', 'pdf,doc,docx,txt,jpg,png,zip');
