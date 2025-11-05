<?php
// Separate Games into Category-Specific Tables
// This script creates separate tables for videogames, physical games, and media

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "🔄 Separating Games into Category-Specific Tables\n";
echo "================================================\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connected to database\n\n";
    
    // Step 1: Analyze current games table
    echo "📋 Step 1: Analyzing current games structure\n";
    echo "--------------------------------------------\n";
    
    $totalGames = $pdo->query("SELECT COUNT(*) FROM games")->fetchColumn();
    echo "Total games in unified table: $totalGames\n";
    
    $gamesByCategory = $pdo->query("
        SELECT 
            ic.name as category,
            COUNT(g.id) as count,
            GROUP_CONCAT(g.name SEPARATOR ', ') as game_names
        FROM games g
        JOIN interest_categories ic ON g.category_id = ic.id
        GROUP BY ic.id, ic.name
        ORDER BY ic.name
    ")->fetchAll();
    
    foreach($gamesByCategory as $cat) {
        echo "  • {$cat['category']}: {$cat['count']} games\n";
        echo "    Games: " . substr($cat['game_names'], 0, 100) . (strlen($cat['game_names']) > 100 ? '...' : '') . "\n";
    }
    echo "\n";
    
    // Step 2: Create separate tables for each category
    echo "🏗️  Step 2: Creating category-specific tables\n";
    echo "---------------------------------------------\n";
    
    // Backup current games table
    $pdo->exec("DROP TABLE IF EXISTS games_unified_backup");
    $pdo->exec("CREATE TABLE games_unified_backup AS SELECT * FROM games");
    echo "✅ Backed up unified games table\n";
    
    // Create videogames table
    $createVideogamesSQL = "
    CREATE TABLE IF NOT EXISTS videogames (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        genre VARCHAR(50),
        platform VARCHAR(100),
        rating VARCHAR(10),
        is_multiplayer BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_genre (genre),
        INDEX idx_platform (platform)
    )";
    $pdo->exec($createVideogamesSQL);
    echo "✅ Created videogames table\n";
    
    // Create physical_games table
    $createPhysicalGamesSQL = "
    CREATE TABLE IF NOT EXISTS physical_games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        game_type ENUM('BoardGame', 'CardGame', 'Sport', 'Outdoor', 'Traditional') DEFAULT 'BoardGame',
        min_players INT DEFAULT 1,
        max_players INT DEFAULT 8,
        age_range VARCHAR(20),
        equipment_needed TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_type (game_type),
        INDEX idx_players (min_players, max_players)
    )";
    $pdo->exec($createPhysicalGamesSQL);
    echo "✅ Created physical_games table\n";
    
    // Create media table
    $createMediaSQL = "
    CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        media_type ENUM('Movie', 'TV_Show', 'Documentary', 'Music', 'Podcast', 'Video', 'Social_Media') DEFAULT 'Movie',
        genre VARCHAR(50),
        rating VARCHAR(10),
        duration VARCHAR(20),
        release_year INT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_type (media_type),
        INDEX idx_genre (genre),
        INDEX idx_year (release_year)
    )";
    $pdo->exec($createMediaSQL);
    echo "✅ Created media table\n\n";
    
    // Step 3: Migrate games to appropriate tables
    echo "📦 Step 3: Migrating games to category tables\n";
    echo "---------------------------------------------\n";
    
    $videogamesCount = 0;
    $physicalGamesCount = 0;
    $mediaCount = 0;
    
    // Get all games with their categories
    $allGames = $pdo->query("
        SELECT g.*, ic.name as category_name
        FROM games g
        JOIN interest_categories ic ON g.category_id = ic.id
        ORDER BY ic.name, g.name
    ")->fetchAll();
    
    foreach($allGames as $game) {
        try {
            switch(strtolower($game['category_name'])) {
                case 'videogames':
                    // Determine genre and platform based on game name
                    $genre = 'Action'; // Default
                    $platform = 'Multi-Platform'; // Default
                    $isMultiplayer = false;
                    
                    // Smart categorization based on game name
                    $gameName = strtolower($game['name']);
                    if (strpos($gameName, 'minecraft') !== false) {
                        $genre = 'Sandbox';
                        $platform = 'Multi-Platform';
                        $isMultiplayer = true;
                    } elseif (strpos($gameName, 'vr') !== false || strpos($gameName, 'virtual reality') !== false) {
                        $genre = 'VR';
                        $platform = 'VR Headset';
                    } elseif (strpos($gameName, 'mobile') !== false) {
                        $genre = 'Casual';
                        $platform = 'Mobile';
                    } elseif (strpos($gameName, 'arcade') !== false) {
                        $genre = 'Arcade';
                        $platform = 'Arcade/Retro';
                    } elseif (strpos($gameName, 'rpg') !== false) {
                        $genre = 'RPG';
                        $platform = 'Multi-Platform';
                    } elseif (strpos($gameName, 'action') !== false) {
                        $genre = 'Action';
                        $platform = 'Multi-Platform';
                    } elseif (strpos($gameName, 'puzzle') !== false) {
                        $genre = 'Puzzle';
                        $platform = 'Multi-Platform';
                    } elseif (strpos($gameName, 'creative') !== false) {
                        $genre = 'Creative';
                        $platform = 'Multi-Platform';
                    }
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO videogames (name, description, genre, platform, is_multiplayer, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([
                        $game['name'],
                        $game['description'],
                        $genre,
                        $platform,
                        $isMultiplayer,
                        $game['created_at']
                    ]);
                    $videogamesCount++;
                    echo "✅ Video Game: {$game['name']} -> $genre ($platform)\n";
                    break;
                    
                case 'physicalgames':
                    // Determine game type and player count
                    $gameType = 'BoardGame'; // Default
                    $minPlayers = 1;
                    $maxPlayers = 4;
                    $equipmentNeeded = '';
                    
                    $gameName = strtolower($game['name']);
                    if (strpos($gameName, 'uno') !== false || strpos($gameName, 'card') !== false) {
                        $gameType = 'CardGame';
                        $minPlayers = 2;
                        $maxPlayers = 10;
                        $equipmentNeeded = 'Card deck';
                    } elseif (strpos($gameName, 'chess') !== false || strpos($gameName, 'checkers') !== false) {
                        $gameType = 'BoardGame';
                        $minPlayers = 2;
                        $maxPlayers = 2;
                        $equipmentNeeded = 'Game board and pieces';
                    } elseif (strpos($gameName, 'monopoly') !== false || strpos($gameName, 'board') !== false) {
                        $gameType = 'BoardGame';
                        $minPlayers = 2;
                        $maxPlayers = 6;
                        $equipmentNeeded = 'Game board, pieces, dice';
                    } elseif (strpos($gameName, 'basketball') !== false || strpos($gameName, 'sport') !== false) {
                        $gameType = 'Sport';
                        $minPlayers = 2;
                        $maxPlayers = 10;
                        $equipmentNeeded = 'Sports equipment';
                    } elseif (strpos($gameName, 'hopscotch') !== false || strpos($gameName, 'tag') !== false || strpos($gameName, 'jump rope') !== false) {
                        $gameType = 'Outdoor';
                        $minPlayers = 1;
                        $maxPlayers = 20;
                        $equipmentNeeded = 'Minimal equipment';
                    } else {
                        $gameType = 'Traditional';
                    }
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO physical_games (name, description, game_type, min_players, max_players, equipment_needed, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([
                        $game['name'],
                        $game['description'],
                        $gameType,
                        $minPlayers,
                        $maxPlayers,
                        $equipmentNeeded,
                        $game['created_at']
                    ]);
                    $physicalGamesCount++;
                    echo "✅ Physical Game: {$game['name']} -> $gameType ($minPlayers-$maxPlayers players)\n";
                    break;
                    
                case 'media':
                    // Determine media type and genre
                    $mediaType = 'Movie'; // Default
                    $genre = 'General';
                    $duration = '';
                    
                    $mediaName = strtolower($game['name']);
                    if (strpos($mediaName, 'movie') !== false || strpos($mediaName, 'film') !== false) {
                        $mediaType = 'Movie';
                        $duration = '90-120 min';
                        if (strpos($mediaName, 'action') !== false) $genre = 'Action';
                        elseif (strpos($mediaName, 'romance') !== false) $genre = 'Romance';
                        elseif (strpos($mediaName, 'comedy') !== false) $genre = 'Comedy';
                        elseif (strpos($mediaName, 'sci-fi') !== false) $genre = 'Sci-Fi';
                        elseif (strpos($mediaName, 'adventure') !== false) $genre = 'Adventure';
                        elseif (strpos($mediaName, 'teen') !== false) $genre = 'Teen';
                        elseif (strpos($mediaName, 'classic') !== false) $genre = 'Classic';
                        elseif (strpos($mediaName, 'cybersecurity') !== false) $genre = 'Tech';
                    } elseif (strpos($mediaName, 'tv') !== false || strpos($mediaName, 'show') !== false || strpos($mediaName, 'drama') !== false) {
                        $mediaType = 'TV_Show';
                        $duration = '30-60 min/episode';
                        if (strpos($mediaName, 'drama') !== false) $genre = 'Drama';
                        elseif (strpos($mediaName, 'old') !== false) $genre = 'Classic';
                    } elseif (strpos($mediaName, 'documentary') !== false || strpos($mediaName, 'documentaries') !== false) {
                        $mediaType = 'Documentary';
                        $duration = '60-90 min';
                        if (strpos($mediaName, 'tech') !== false) $genre = 'Technology';
                        else $genre = 'Educational';
                    } elseif (strpos($mediaName, 'music') !== false || strpos($mediaName, 'video') !== false) {
                        $mediaType = 'Video';
                        $duration = '3-5 min';
                        if (strpos($mediaName, 'music') !== false) $genre = 'Music';
                        elseif (strpos($mediaName, 'gaming') !== false) $genre = 'Gaming';
                    } elseif (strpos($mediaName, 'social media') !== false) {
                        $mediaType = 'Social_Media';
                        $duration = 'Variable';
                        $genre = 'Social';
                    } elseif (strpos($mediaName, 'stream') !== false || strpos($mediaName, 'content') !== false || strpos($mediaName, 'review') !== false) {
                        $mediaType = 'Video';
                        $duration = '10-30 min';
                        if (strpos($mediaName, 'gaming') !== false) $genre = 'Gaming';
                        elseif (strpos($mediaName, 'tech') !== false) $genre = 'Technology';
                        else $genre = 'Entertainment';
                    }
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO media (name, description, media_type, genre, duration, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([
                        $game['name'],
                        $game['description'],
                        $mediaType,
                        $genre,
                        $duration,
                        $game['created_at']
                    ]);
                    $mediaCount++;
                    echo "✅ Media: {$game['name']} -> $mediaType ($genre)\n";
                    break;
            }
        } catch(PDOException $e) {
            echo "⚠️  Skipped duplicate: {$game['name']} - {$e->getMessage()}\n";
        }
    }
    
    echo "\n📊 Migration Summary:\n";
    echo "--------------------\n";
    echo "Video Games migrated: $videogamesCount\n";
    echo "Physical Games migrated: $physicalGamesCount\n";
    echo "Media items migrated: $mediaCount\n";
    echo "Total: " . ($videogamesCount + $physicalGamesCount + $mediaCount) . "\n\n";
    
    // Step 4: Create new contact relationship tables
    echo "🔗 Step 4: Creating contact relationship tables\n";
    echo "-----------------------------------------------\n";
    
    // Create contact_videogames table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_videogames (
            id INT AUTO_INCREMENT PRIMARY KEY,
            contact_id INT NOT NULL,
            videogame_id INT NOT NULL,
            skill_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
            hours_played INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_contact (contact_id),
            INDEX idx_videogame (videogame_id),
            UNIQUE KEY unique_contact_videogame (contact_id, videogame_id),
            FOREIGN KEY (contact_id) REFERENCES contacts(ID) ON DELETE CASCADE,
            FOREIGN KEY (videogame_id) REFERENCES videogames(id) ON DELETE CASCADE
        )
    ");
    echo "✅ Created contact_videogames table\n";
    
    // Create contact_physical_games table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_physical_games (
            id INT AUTO_INCREMENT PRIMARY KEY,
            contact_id INT NOT NULL,
            physical_game_id INT NOT NULL,
            skill_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
            favorite_variant VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_contact (contact_id),
            INDEX idx_physical_game (physical_game_id),
            UNIQUE KEY unique_contact_physical_game (contact_id, physical_game_id),
            FOREIGN KEY (contact_id) REFERENCES contacts(ID) ON DELETE CASCADE,
            FOREIGN KEY (physical_game_id) REFERENCES physical_games(id) ON DELETE CASCADE
        )
    ");
    echo "✅ Created contact_physical_games table\n";
    
    // Create contact_media table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_media (
            id INT AUTO_INCREMENT PRIMARY KEY,
            contact_id INT NOT NULL,
            media_id INT NOT NULL,
            rating INT CHECK (rating >= 1 AND rating <= 5),
            watch_status ENUM('Want_to_Watch', 'Watching', 'Completed', 'Dropped') DEFAULT 'Completed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_contact (contact_id),
            INDEX idx_media (media_id),
            UNIQUE KEY unique_contact_media (contact_id, media_id),
            FOREIGN KEY (contact_id) REFERENCES contacts(ID) ON DELETE CASCADE,
            FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
        )
    ");
    echo "✅ Created contact_media table\n\n";
    
    // Step 5: Migrate contact relationships
    echo "📋 Step 5: Migrating contact relationships\n";
    echo "-----------------------------------------\n";
    
    $contactGames = $pdo->query("
        SELECT cg.contact_id, g.name as game_name, ic.name as category_name
        FROM contact_games cg
        JOIN games g ON cg.game_id = g.id
        JOIN interest_categories ic ON g.category_id = ic.id
    ")->fetchAll();
    
    $videogameLinks = 0;
    $physicalGameLinks = 0;
    $mediaLinks = 0;
    
    foreach($contactGames as $cg) {
        try {
            switch(strtolower($cg['category_name'])) {
                case 'videogames':
                    $videogame = $pdo->prepare("SELECT id FROM videogames WHERE name = ?");
                    $videogame->execute([$cg['game_name']]);
                    $vgResult = $videogame->fetch();
                    
                    if ($vgResult) {
                        $stmt = $pdo->prepare("
                            INSERT INTO contact_videogames (contact_id, videogame_id) 
                            VALUES (?, ?)
                        ");
                        $stmt->execute([$cg['contact_id'], $vgResult['id']]);
                        $videogameLinks++;
                    }
                    break;
                    
                case 'physicalgames':
                    $physicalGame = $pdo->prepare("SELECT id FROM physical_games WHERE name = ?");
                    $physicalGame->execute([$cg['game_name']]);
                    $pgResult = $physicalGame->fetch();
                    
                    if ($pgResult) {
                        $stmt = $pdo->prepare("
                            INSERT INTO contact_physical_games (contact_id, physical_game_id) 
                            VALUES (?, ?)
                        ");
                        $stmt->execute([$cg['contact_id'], $pgResult['id']]);
                        $physicalGameLinks++;
                    }
                    break;
                    
                case 'media':
                    $mediaItem = $pdo->prepare("SELECT id FROM media WHERE name = ?");
                    $mediaItem->execute([$cg['game_name']]);
                    $mediaResult = $mediaItem->fetch();
                    
                    if ($mediaResult) {
                        $stmt = $pdo->prepare("
                            INSERT INTO contact_media (contact_id, media_id) 
                            VALUES (?, ?)
                        ");
                        $stmt->execute([$cg['contact_id'], $mediaResult['id']]);
                        $mediaLinks++;
                    }
                    break;
            }
        } catch(PDOException $e) {
            // Skip duplicates
        }
    }
    
    echo "Contact-Videogame links: $videogameLinks\n";
    echo "Contact-Physical Game links: $physicalGameLinks\n";
    echo "Contact-Media links: $mediaLinks\n\n";
    
    // Step 6: Verification and summary
    echo "📊 Step 6: Final verification\n";
    echo "-----------------------------\n";
    
    $tables = ['videogames', 'physical_games', 'media'];
    foreach($tables as $table) {
        $count = $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn();
        echo "✅ $table: $count records\n";
    }
    
    $relationshipTables = ['contact_videogames', 'contact_physical_games', 'contact_media'];
    foreach($relationshipTables as $table) {
        $count = $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn();
        echo "✅ $table: $count relationships\n";
    }
    
    echo "\n✅ Separation completed successfully!\n";
    echo "\n📋 Next Steps:\n";
    echo "-------------\n";
    echo "1. Update API endpoints to use new table structure\n";
    echo "2. Update frontend to work with separated tables\n";
    echo "3. Test all contact relationships\n";
    echo "4. Consider dropping the unified games table when ready:\n";
    echo "   - DROP TABLE games;\n";
    echo "   - DROP TABLE contact_games;\n";
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}
?>