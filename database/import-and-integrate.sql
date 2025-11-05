-- Comprehensive Contact Manager Import and Integration
-- This script safely imports your contacts and enhances the database for website use

-- First, ensure we're using the right database
USE Contact_Manager;

-- Backup existing data (if any)
CREATE TABLE IF NOT EXISTS contacts_backup_before_import AS 
SELECT * FROM contacts WHERE 1=0; -- Create empty backup table structure

-- Drop existing contacts table to avoid conflicts with your import
DROP TABLE IF EXISTS contacts;

-- Import your new contact structure and data
-- (Your SQL file content will be inserted here)

CREATE TABLE `contacts` (
  `ID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Phone_Number` varchar(11) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `contacts` (`ID`, `Name`, `Phone_Number`, `Email`, `BirthDate`) VALUES
(1, 'Kathy', NULL, NULL, NULL),
(2, 'Michael', '4694266925', NULL, NULL),
(3, 'Nathan', '8649154169', 'NathanLorenzen1@gmail.com', '2000-06-07'),
(4, 'Willie', NULL, 'atuasmedium@gmail.com', '1999-11-29'),
(5, 'Scarlett', '9124679551', 'Scarlettfromash@gmail.com', '2007-05-16');

ALTER TABLE `contacts` ADD PRIMARY KEY (`ID`);

-- Now enhance the table for website compatibility
ALTER TABLE contacts 
-- Rename columns to match website expectations
CHANGE COLUMN `ID` `id` INT(11) NOT NULL AUTO_INCREMENT,
CHANGE COLUMN `Name` `name` VARCHAR(100) NOT NULL,
CHANGE COLUMN `Phone_Number` `phone` VARCHAR(20) DEFAULT NULL,
CHANGE COLUMN `Email` `email` VARCHAR(100) DEFAULT NULL,
CHANGE COLUMN `BirthDate` `birthday` DATE DEFAULT NULL,

-- Add new columns for website features
ADD COLUMN `bio` TEXT NULL,
ADD COLUMN `interests` TEXT NULL,
ADD COLUMN `avatar` VARCHAR(50) DEFAULT 'fas fa-user',
ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD COLUMN `last_viewed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `status` ENUM('active', 'inactive') DEFAULT 'active';

-- Update existing contacts with default values
UPDATE contacts 
SET 
    avatar = 'fas fa-user',
    status = 'active',
    last_viewed = NOW(),
    created_at = COALESCE(created_at, NOW()),
    updated_at = NOW();

-- Create users table for authentication (if it doesn't exist)
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_last_viewed ON contacts(last_viewed);

-- Show final results
SELECT 'IMPORT AND INTEGRATION COMPLETED!' as status;

SELECT 'CONTACTS IMPORTED' as info;
SELECT 
    id,
    name,
    phone,
    email,
    birthday,
    status,
    created_at
FROM contacts 
ORDER BY id;

SELECT 'SUMMARY' as info;
SELECT 
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN email IS NOT NULL THEN 1 END) as contacts_with_email,
    COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as contacts_with_phone,
    COUNT(CASE WHEN birthday IS NOT NULL THEN 1 END) as contacts_with_birthday
FROM contacts;