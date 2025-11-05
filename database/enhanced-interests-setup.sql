-- Enhanced Interests Database Structure for Contact_Manager
-- This script adds comprehensive interests tables and data

USE contact_manager;

-- Create interests categories table
CREATE TABLE IF NOT EXISTS interest_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Create interests table
CREATE TABLE IF NOT EXISTS interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES interest_categories(id)
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

-- Insert video game interests
INSERT IGNORE INTO interests (name, category_id, description) 
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Minecraft' as interest_name, 'Popular sandbox building game' as interest_desc
    UNION SELECT 'VR Games', 'Virtual reality gaming experiences'
    UNION SELECT 'Action Games', 'Fast-paced action and adventure games'
    UNION SELECT 'Casual Mobile Games', 'Easy-to-play mobile gaming apps'
    UNION SELECT 'RPGs', 'Role-playing games with character development'
    UNION SELECT 'Tech Simulators', 'Technology and simulation games'
    UNION SELECT 'Classic Arcade Games', 'Retro arcade-style games'
    UNION SELECT 'Database Management Games', 'Technical database-themed games'
    UNION SELECT 'Virtual Reality', 'Immersive VR experiences'
    UNION SELECT 'Mobile Games', 'Smartphone and tablet games'
    UNION SELECT 'Creative Games', 'Games focused on creativity and building'
) AS game_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'videogames';

-- Insert physical game interests
INSERT IGNORE INTO interests (name, category_id, description)
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Uno' as interest_name, 'Classic card game for families' as interest_desc
    UNION SELECT 'Monopoly', 'Popular property trading board game'
    UNION SELECT 'Chess', 'Strategic board game for two players'
    UNION SELECT 'Checkers', 'Classic strategy board game'
    UNION SELECT 'Basketball', 'Team sport with shooting and dribbling'
    UNION SELECT 'Tag', 'Running game where players chase each other'
    UNION SELECT 'Hopscotch', 'Traditional playground jumping game'
    UNION SELECT 'Board Games', 'Various tabletop games with boards'
    UNION SELECT 'Card Games', 'Games played with playing cards'
    UNION SELECT 'Strategy Games', 'Games requiring strategic thinking'
    UNION SELECT 'Jump Rope', 'Skipping rope physical activity'
    UNION SELECT 'Strategy Board Games', 'Complex board games requiring planning'
    UNION SELECT 'Tech Gadgets', 'Interest in technological devices'
    UNION SELECT 'Puzzle Games', 'Games involving problem-solving'
    UNION SELECT 'Traditional Games', 'Classic games passed down through generations'
    UNION SELECT 'Sports', 'Various athletic activities and competitions'
) AS physical_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'physicalGames';

-- Insert media interests
INSERT IGNORE INTO interests (name, category_id, description)
SELECT interest_name, cat.id, interest_desc FROM (
    SELECT 'Action Movies' as interest_name, 'High-energy films with action sequences' as interest_desc
    UNION SELECT 'Romance Movies', 'Films focused on romantic relationships'
    UNION SELECT 'Sci-Fi Movies', 'Science fiction films and stories'
    UNION SELECT 'Classic Movies', 'Timeless films from cinema history'
    UNION SELECT 'Teen Movies', 'Films targeted at teenage audiences'
    UNION SELECT 'Tech Documentaries', 'Educational films about technology'
    UNION SELECT 'Gaming Streams', 'Live or recorded gaming content'
    UNION SELECT 'Music Videos', 'Musical performances and videos'
    UNION SELECT 'Cybersecurity Films', 'Movies about digital security and hacking'
    UNION SELECT 'Comedy Films', 'Humorous movies and entertainment'
    UNION SELECT 'TV Dramas', 'Television series with dramatic storylines'
    UNION SELECT 'Adventure Films', 'Movies featuring exciting journeys'
    UNION SELECT 'Tech Reviews', 'Technology product reviews and analysis'
    UNION SELECT 'Gaming Content', 'Various gaming-related media'
    UNION SELECT 'Old TV Shows', 'Classic television programs'
    UNION SELECT 'Documentaries', 'Educational and informational films'
    UNION SELECT 'Social Media Content', 'Content from social platforms'
) AS media_data
CROSS JOIN interest_categories cat 
WHERE cat.name = 'media';

-- Assign interests to contacts based on our existing assignments
-- Lynn (ID: 1) - Database/tech focus
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT 1, i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Database Management Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Chess', 'Strategy Board Games'))
   OR (ic.name = 'media' AND i.name IN ('Tech Documentaries', 'Cybersecurity Films'));

-- Kathy (ID: 1 in contacts table) - Casual
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT (SELECT ID FROM contacts WHERE Name = 'Kathy'), i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Casual Mobile Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Uno', 'Hopscotch', 'Jump Rope'))
   OR (ic.name = 'media' AND i.name IN ('Romance Movies', 'Comedy Films', 'TV Dramas'));

-- Michael (ID: 2 in contacts table) - Gaming enthusiast
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT (SELECT ID FROM contacts WHERE Name = 'Michael'), i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Minecraft', 'Action Games', 'RPGs'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Monopoly', 'Card Games', 'Basketball'))
   OR (ic.name = 'media' AND i.name IN ('Action Movies', 'Gaming Streams', 'Adventure Films'));

-- Nathan (ID: 3 in contacts table) - Tech/VR
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT (SELECT ID FROM contacts WHERE Name = 'Nathan'), i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('VR Games', 'Virtual Reality', 'Tech Simulators'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Tech Gadgets', 'Puzzle Games'))
   OR (ic.name = 'media' AND i.name IN ('Sci-Fi Movies', 'Tech Reviews', 'Gaming Content'));

-- Willie (ID: 4 in contacts table) - Traditional
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT (SELECT ID FROM contacts WHERE Name = 'Willie'), i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Classic Arcade Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Uno', 'Checkers', 'Traditional Games'))
   OR (ic.name = 'media' AND i.name IN ('Classic Movies', 'Old TV Shows', 'Documentaries'));

-- Scarlett (ID: 5 in contacts table) - Young/varied
INSERT IGNORE INTO contact_interests (contact_id, interest_id)
SELECT (SELECT ID FROM contacts WHERE Name = 'Scarlett'), i.id FROM interests i 
JOIN interest_categories ic ON i.category_id = ic.id
WHERE (ic.name = 'videogames' AND i.name IN ('Minecraft', 'Mobile Games', 'Creative Games'))
   OR (ic.name = 'physicalGames' AND i.name IN ('Tag', 'Board Games', 'Sports'))
   OR (ic.name = 'media' AND i.name IN ('Teen Movies', 'Music Videos', 'Social Media Content'));

-- Display results
SELECT 'Enhanced interests database setup completed!' AS status;
SELECT COUNT(*) AS total_interests FROM interests;
SELECT ic.name AS category, COUNT(i.id) AS interest_count 
FROM interest_categories ic 
LEFT JOIN interests i ON ic.id = i.category_id 
GROUP BY ic.id, ic.name;

-- Show contact assignments
SELECT c.Name AS contact_name, 
       ic.name AS category, 
       i.name AS interest_name
FROM contacts c
JOIN contact_interests ci ON c.ID = ci.contact_id
JOIN interests i ON ci.interest_id = i.id
JOIN interest_categories ic ON i.category_id = ic.id
ORDER BY c.Name, ic.name, i.name;