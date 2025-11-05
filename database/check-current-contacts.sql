-- Query to check existing Contact_Manager database structure and data
-- Run this in phpMyAdmin to see what contacts you currently have

USE Contact_Manager;

-- Show all tables in the database
SHOW TABLES;

-- Check the structure of your contacts table
DESCRIBE contacts;

-- Show current contacts
SELECT * FROM contacts LIMIT 10;

-- Count total contacts
SELECT COUNT(*) as total_contacts FROM contacts;

-- Show sample contact data to understand the format
SELECT 
    id,
    name,
    email,
    phone,
    created_at
FROM contacts 
ORDER BY id ASC 
LIMIT 5;