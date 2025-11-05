-- Extract and Add All Contact Interests to Database
-- This script creates the enhanced interests structure and populates it with all interests from contact profiles

USE contact_manager;

-- Create interest categories table
CREATE TABLE IF NOT EXISTS interest_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create interests table  
CREATE TABLE IF NOT EXISTS interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES interest_categories(id),
    UNIQUE KEY unique_interest_category (name, category_id)
);

-- Create contact_interests junction table
CREATE TABLE IF NOT EXISTS contact_interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contact_id INT,
    interest_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(ID) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE,
    UNIQUE KEY unique_contact_interest (contact_id, interest_id)
);

-- Insert interest categories
INSERT IGNORE INTO interest_categories (name, description) VALUES
('videogames', 'Video games and digital gaming activities'),
('physicalGames', 'Physical games, sports, and real-world activities'),
('media', 'Movies, TV shows, documentaries, and media content');

-- Insert all video game interests found in contact profiles
INSERT IGNORE INTO interests (name, category_id, description) 
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Database Management Games' as interest_name, 'Technical database-themed games (Lynn)' as interest_desc
    UNION SELECT 'Casual Mobile Games', 'Easy-to-play mobile gaming apps (Kathy)'
    UNION SELECT 'Minecraft', 'Popular sandbox building game (Michael, Scarlett)'
    UNION SELECT 'Action Games', 'Fast-paced action and adventure games (Michael)'
    UNION SELECT 'RPGs', 'Role-playing games with character development (Michael)'
    UNION SELECT 'VR Games', 'Virtual reality gaming experiences (Nathan)'
    UNION SELECT 'Virtual Reality', 'Immersive VR experiences (Nathan)'
    UNION SELECT 'Tech Simulators', 'Technology and simulation games (Nathan)'
    UNION SELECT 'Classic Arcade Games', 'Retro arcade-style games (Willie)'
    UNION SELECT 'Mobile Games', 'Smartphone and tablet games (Scarlett)'
    UNION SELECT 'Creative Games', 'Games focused on creativity and building (Scarlett)'
) AS videogame_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'videogames';

-- Insert all physical game interests found in contact profiles
INSERT IGNORE INTO interests (name, category_id, description)
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Chess' as interest_name, 'Strategic board game for two players (Lynn)' as interest_desc
    UNION SELECT 'Strategy Board Games', 'Complex board games requiring planning (Lynn)'
    UNION SELECT 'Uno', 'Classic card game for families (Kathy, Willie)'
    UNION SELECT 'Hopscotch', 'Traditional playground jumping game (Kathy)'
    UNION SELECT 'Jump Rope', 'Skipping rope physical activity (Kathy)'
    UNION SELECT 'Monopoly', 'Popular property trading board game (Michael)'
    UNION SELECT 'Card Games', 'Games played with playing cards (Michael)'
    UNION SELECT 'Basketball', 'Team sport with shooting and dribbling (Michael)'
    UNION SELECT 'Tech Gadgets', 'Interest in technological devices (Nathan)'
    UNION SELECT 'Puzzle Games', 'Games involving problem-solving (Nathan)'
    UNION SELECT 'Checkers', 'Classic strategy board game (Willie)'
    UNION SELECT 'Traditional Games', 'Classic games passed down through generations (Willie)'
    UNION SELECT 'Tag', 'Running game where players chase each other (Scarlett)'
    UNION SELECT 'Board Games', 'Various tabletop games with boards (Scarlett)'
    UNION SELECT 'Sports', 'Various athletic activities and competitions (Scarlett)'
) AS physical_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'physicalGames';

-- Insert all media interests found in contact profiles
INSERT IGNORE INTO interests (name, category_id, description)
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Tech Documentaries' as interest_name, 'Educational films about technology (Lynn)' as interest_desc
    UNION SELECT 'Cybersecurity Films', 'Movies about digital security and hacking (Lynn)'
    UNION SELECT 'Romance Movies', 'Films focused on romantic relationships (Kathy)'
    UNION SELECT 'Comedy Films', 'Humorous movies and entertainment (Kathy)'
    UNION SELECT 'TV Dramas', 'Television series with dramatic storylines (Kathy)'
    UNION SELECT 'Action Movies', 'High-energy films with action sequences (Michael)'
    UNION SELECT 'Gaming Streams', 'Live or recorded gaming content (Michael)'
    UNION SELECT 'Adventure Films', 'Movies featuring exciting journeys (Michael)'
    UNION SELECT 'Sci-Fi Movies', 'Science fiction films and stories (Nathan)'
    UNION SELECT 'Tech Reviews', 'Technology product reviews and analysis (Nathan)'
    UNION SELECT 'Gaming Content', 'Various gaming-related media (Nathan)'
    UNION SELECT 'Classic Movies', 'Timeless films from cinema history (Willie)'
    UNION SELECT 'Old TV Shows', 'Classic television programs (Willie)'
    UNION SELECT 'Documentaries', 'Educational and informational films (Willie)'
    UNION SELECT 'Teen Movies', 'Films targeted at teenage audiences (Scarlett)'
    UNION SELECT 'Music Videos', 'Musical performances and videos (Scarlett)'
    UNION SELECT 'Social Media Content', 'Content from social platforms (Scarlett)'
) AS media_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'media';

-- Now link each contact to their specific interests
-- Clear existing assignments first
DELETE FROM contact_interests;

-- Lynn's interests (ID will be determined by contact lookup)
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Lynn' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Database Management Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Chess', 'Strategy Board Games'))
   OR (ic.name = 'media' AND i.name IN ('Tech Documentaries', 'Cybersecurity Films'));

-- Kathy's interests
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Kathy' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Casual Mobile Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Uno', 'Hopscotch', 'Jump Rope'))
   OR (ic.name = 'media' AND i.name IN ('Romance Movies', 'Comedy Films', 'TV Dramas'));

-- Michael's interests
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Michael' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Minecraft', 'Action Games', 'RPGs'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Monopoly', 'Card Games', 'Basketball'))
   OR (ic.name = 'media' AND i.name IN ('Action Movies', 'Gaming Streams', 'Adventure Films'));

-- Nathan's interests
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Nathan' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('VR Games', 'Virtual Reality', 'Tech Simulators'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Tech Gadgets', 'Puzzle Games'))
   OR (ic.name = 'media' AND i.name IN ('Sci-Fi Movies', 'Tech Reviews', 'Gaming Content'));

-- Willie's interests
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Willie' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Classic Arcade Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Uno', 'Checkers', 'Traditional Games'))
   OR (ic.name = 'media' AND i.name IN ('Classic Movies', 'Old TV Shows', 'Documentaries'));

-- Scarlett's interests
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 
    (SELECT ID FROM contacts WHERE Name = 'Scarlett' LIMIT 1) as contact_id,
    i.id as interest_id
FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Minecraft', 'Mobile Games', 'Creative Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Tag', 'Board Games', 'Sports'))
   OR (ic.name = 'media' AND i.name IN ('Teen Movies', 'Music Videos', 'Social Media Content'));

-- Display setup results
SELECT '🎉 Contact Interests Database Setup Complete!' AS status;

-- Show statistics
SELECT 'Database Statistics' AS info;
SELECT COUNT(*) AS total_interest_categories FROM interest_categories;
SELECT COUNT(*) AS total_interests FROM interests;
SELECT COUNT(*) AS total_contact_interest_links FROM contact_interests;

-- Show interests by category
SELECT 
    ic.name AS category,
    COUNT(i.id) AS interest_count
FROM interest_categories ic
LEFT JOIN interests i ON ic.id = i.category_id
GROUP BY ic.id, ic.name
ORDER BY ic.name;

-- Show contact assignments summary
SELECT 
    c.Name AS contact_name,
    COUNT(ci.interest_id) AS total_interests
FROM contacts c
LEFT JOIN contact_interests ci ON c.ID = ci.contact_id
GROUP BY c.ID, c.Name
ORDER BY c.Name;

-- Show detailed contact interests
SELECT 
    c.Name AS contact,
    ic.name AS category,
    i.name AS interest
FROM contacts c
JOIN contact_interests ci ON c.ID = ci.contact_id
JOIN interests i ON ci.interest_id = i.id
JOIN interest_categories ic ON i.category_id = ic.id
ORDER BY c.Name, ic.name, i.name;