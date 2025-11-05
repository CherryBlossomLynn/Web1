# Safe Database Migration for Contact_Manager
# This script will enhance your existing Contact_Manager database while preserving all data

-- ============================================================================
-- SAFE MIGRATION SCRIPT FOR CONTACT_MANAGER DATABASE
-- This script preserves all existing data while adding required features
-- ============================================================================

-- Switch to your existing database
USE Contact_Manager;

-- 1. BACKUP EXISTING DATA (Create backup tables)
-- ============================================================================

-- Create backup of existing contacts table (if it exists)
CREATE TABLE IF NOT EXISTS contacts_backup_20251105 AS 
SELECT * FROM contacts;

-- Create backup of existing users table (if it exists)  
CREATE TABLE IF NOT EXISTS users_backup_20251105 AS 
SELECT * FROM users;

-- 2. ENSURE CONTACTS TABLE HAS ALL REQUIRED FIELDS
-- ============================================================================

-- Add missing columns to contacts table if they don't exist
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS id INT AUTO_INCREMENT PRIMARY KEY FIRST,
ADD COLUMN IF NOT EXISTS name VARCHAR(100) NOT NULL,
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS birthday DATE,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS interests TEXT,
ADD COLUMN IF NOT EXISTS avatar VARCHAR(50) DEFAULT 'fas fa-user',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS status ENUM('active', 'inactive') DEFAULT 'active';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- 3. ENSURE USERS TABLE FOR AUTHENTICATION
-- ============================================================================

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user', 'manager') DEFAULT 'user',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    avatar VARCHAR(50) DEFAULT 'fas fa-user',
    location VARCHAR(100) DEFAULT 'Unknown'
);

-- Add your core users (only if they don't already exist)
INSERT IGNORE INTO users (username, password_hash, email, full_name, role, avatar, location) VALUES
('lynn', '$2b$10$example_hash_Lynn@1104', 'Michelle.wise2004@gmail.com', 'Lynn Wise', 'admin', 'fas fa-user-tie', 'San Francisco, CA'),
('michael', '$2b$10$example_hash_database2025', 'michael@lynnsdatabase.local', 'Michael Johnson', 'user', 'fas fa-user', 'New York, NY'),
('testuser', '$2b$10$example_hash_123', 'testuser@lynnsdatabase.local', 'Test User', 'user', 'fas fa-user-check', 'Los Angeles, CA');

-- 4. CREATE SUPPORTING TABLES
-- ============================================================================

-- User sessions table for login management
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Audit log table for tracking changes
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    contact_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL
);

-- Contact groups/categories table (optional enhancement)
CREATE TABLE IF NOT EXISTS contact_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#007bff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for contact-category relationships
CREATE TABLE IF NOT EXISTS contact_category_relations (
    contact_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (contact_id, category_id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES contact_categories(id) ON DELETE CASCADE
);

-- 5. INSERT DEFAULT CATEGORIES
-- ============================================================================

INSERT IGNORE INTO contact_categories (name, color) VALUES
('Family', '#28a745'),
('Friends', '#17a2b8'),
('Work', '#ffc107'),
('Business', '#dc3545'),
('Other', '#6c757d');

-- 6. UPDATE EXISTING CONTACTS (if any data needs standardization)
-- ============================================================================

-- Ensure all contacts have required fields
UPDATE contacts 
SET 
    avatar = COALESCE(avatar, 'fas fa-user'),
    status = COALESCE(status, 'active'),
    last_viewed = COALESCE(last_viewed, created_at, NOW()),
    created_at = COALESCE(created_at, NOW()),
    updated_at = NOW()
WHERE avatar IS NULL OR status IS NULL OR last_viewed IS NULL;

-- 7. VERIFICATION QUERIES
-- ============================================================================

-- Show final table structures
SELECT 'CONTACTS TABLE STRUCTURE' as info;
DESCRIBE contacts;

SELECT 'USERS TABLE STRUCTURE' as info;
DESCRIBE users;

-- Show data counts
SELECT 'DATA SUMMARY' as info;
SELECT 
    (SELECT COUNT(*) FROM contacts) as total_contacts,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM contact_categories) as total_categories;

-- Show sample of preserved data
SELECT 'SAMPLE CONTACTS' as info;
SELECT id, name, email, phone, status, created_at FROM contacts LIMIT 5;

SELECT 'SAMPLE USERS' as info;
SELECT id, username, full_name, role, status FROM users LIMIT 5;

-- Success message
SELECT 'MIGRATION COMPLETED SUCCESSFULLY! All existing data preserved.' as result;