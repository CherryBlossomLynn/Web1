-- Export contacts from Contact_Manager database to JavaScript format
-- Run this in phpMyAdmin to get your contacts in a format we can use

USE Contact_Manager;

-- First, let's see what we're working with
SELECT 'CURRENT CONTACTS IN DATABASE' as info;
SELECT COUNT(*) as total_contacts FROM contacts;

-- Show structure to understand available fields
SELECT 'CONTACT TABLE STRUCTURE' as info;
DESCRIBE contacts;

-- Export contacts in a format we can easily convert to JavaScript
SELECT 'CONTACTS FOR WEBSITE INTEGRATION' as info;
SELECT 
    CONCAT(
        '{',
        'id: ', COALESCE(id, 'null'), ', ',
        'name: "', COALESCE(REPLACE(name, '"', '\\"'), 'Unknown'), '", ',
        'email: "', COALESCE(REPLACE(email, '"', '\\"'), ''), '", ',
        'phone: "', COALESCE(REPLACE(phone, '"', '\\"'), ''), '", ',
        'birthday: "', COALESCE(DATE_FORMAT(birthday, '%m/%d/%Y'), ''), '", ',
        'bio: "', COALESCE(REPLACE(SUBSTRING(bio, 1, 200), '"', '\\"'), ''), '", ',
        'interests: "', COALESCE(REPLACE(interests, '"', '\\"'), ''), '", ',
        'avatar: "', COALESCE(avatar, 'fas fa-user'), '", ',
        'lastViewed: ', UNIX_TIMESTAMP(COALESCE(last_viewed, created_at, NOW())) * 1000,
        '},'
    ) as javascript_contact
FROM contacts 
WHERE status != 'inactive' OR status IS NULL
ORDER BY name;

-- Also create a summary
SELECT 'INTEGRATION SUMMARY' as info;
SELECT 
    COUNT(*) as total_contacts_to_export,
    COUNT(CASE WHEN email IS NOT NULL AND email != '' THEN 1 END) as contacts_with_email,
    COUNT(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 END) as contacts_with_phone,
    MIN(created_at) as oldest_contact,
    MAX(created_at) as newest_contact
FROM contacts 
WHERE status != 'inactive' OR status IS NULL;