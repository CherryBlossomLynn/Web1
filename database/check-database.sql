-- Check Existing Contact_Manager Database Structure
-- Run this in phpMyAdmin to see what's currently in your database

-- First, show all databases
SHOW DATABASES;

-- Use the Contact_Manager database (adjust case if needed)
USE Contact_Manager;
-- If above fails, try:
-- USE contact_manager;

-- Show all tables in the database
SHOW TABLES;

-- For each table, show structure and sample data
-- (Replace 'your_table_name' with actual table names from SHOW TABLES result)

-- Example: If you have a 'contacts' table
DESCRIBE contacts;
SELECT COUNT(*) as total_contacts FROM contacts;
SELECT * FROM contacts LIMIT 5;

-- Example: If you have a 'users' table  
DESCRIBE users;
SELECT COUNT(*) as total_users FROM users;
SELECT * FROM users LIMIT 5;

-- Show all table structures at once
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM 
    INFORMATION_SCHEMA.COLUMNS 
WHERE 
    TABLE_SCHEMA = 'Contact_Manager'
ORDER BY 
    TABLE_NAME, ORDINAL_POSITION;