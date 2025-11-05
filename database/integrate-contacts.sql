-- Integration Script: Replace Frontend Contacts with Contact_Manager Database
-- This script enhances your existing Contact_Manager database for website integration

USE Contact_Manager;

-- 1. First, let's ensure your contacts table has all needed columns
-- Add missing columns if they don't exist (won't affect existing data)

ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS birthday DATE NULL,
ADD COLUMN IF NOT EXISTS bio TEXT NULL,
ADD COLUMN IF NOT EXISTS interests TEXT NULL,
ADD COLUMN IF NOT EXISTS avatar VARCHAR(50) DEFAULT 'fas fa-user',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS status ENUM('active', 'inactive') DEFAULT 'active';

-- 2. Update existing contacts to have default values for new fields
UPDATE contacts 
SET 
    avatar = COALESCE(avatar, 'fas fa-user'),
    status = COALESCE(status, 'active'),
    last_viewed = COALESCE(last_viewed, created_at, NOW()),
    created_at = COALESCE(created_at, NOW()),
    updated_at = NOW()
WHERE avatar IS NULL OR status IS NULL OR last_viewed IS NULL;

-- 3. Create users table for authentication (if it doesn't exist)
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

-- Insert your core users (only if they don't already exist)
INSERT IGNORE INTO users (username, password_hash, email, full_name, role, avatar, location) VALUES
('lynn', '$2b$10$example_hash_Lynn@1104', 'Michelle.wise2004@gmail.com', 'Lynn Wise', 'admin', 'fas fa-user-tie', 'San Francisco, CA'),
('michael', '$2b$10$example_hash_database2025', 'michael@lynnsdatabase.local', 'Michael Johnson', 'user', 'fas fa-user', 'New York, NY'),
('testuser', '$2b$10$example_hash_123', 'testuser@lynnsdatabase.local', 'Test User', 'user', 'fas fa-user-check', 'Los Angeles, CA');

-- 4. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_last_viewed ON contacts(last_viewed);

-- 5. Show final results
SELECT 'DATABASE INTEGRATION COMPLETED' as status;

SELECT 'CONTACTS SUMMARY' as info;
SELECT 
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN email IS NOT NULL THEN 1 END) as contacts_with_email,
    COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as contacts_with_phone,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_contacts
FROM contacts;

SELECT 'SAMPLE CONTACTS' as info;
SELECT 
    id,
    name,
    email,
    phone,
    status,
    created_at
FROM contacts 
WHERE status = 'active'
ORDER BY created_at DESC 
LIMIT 5;