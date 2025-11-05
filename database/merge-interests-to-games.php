<?php
// Merge Interests into Games Table
// This script will migrate all interests data into the games table structure

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "🔄 Merging Interests into Games Table\n";
echo "====================================\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connected to database\n\n";
    
    // Step 1: Backup current games table structure
    echo "📋 Step 1: Analyzing current structures\n";
    echo "---------------------------------------\n";
    
    $gamesDesc = $pdo->query("DESCRIBE games")->fetchAll();
    echo "Current games table columns:\n";
    foreach($gamesDesc as $col) {
        echo "  - {$col['Field']} ({$col['Type']})\n";
    }
    
    $interestsCount = $pdo->query("SELECT COUNT(*) FROM interests")->fetchColumn();
    echo "\nInterests to migrate: $interestsCount\n";
    
    $categoriesCount = $pdo->query("SELECT COUNT(*) FROM interest_categories")->fetchColumn();
    echo "Categories to preserve: $categoriesCount\n\n";
    
    // Step 2: Create new games table structure that can hold interests
    echo "🏗️  Step 2: Restructuring games table\n";
    echo "-------------------------------------\n";
    
    // Drop and recreate games table with proper structure
    $pdo->exec("DROP TABLE IF EXISTS games_backup");
    $pdo->exec("CREATE TABLE games_backup AS SELECT * FROM games");
    echo "✅ Backed up original games table\n";
    
    $pdo->exec("DROP TABLE games");
    
    // Create new games table with interests structure
    $createGamesSQL = "
    CREATE TABLE games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category_id INT NOT NULL,
        description TEXT,
        game_type ENUM('VideoGame', 'CardGame', 'VirtualReality', 'BoardGame', 'PhysicalGame', 'Media') DEFAULT 'VideoGame',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category_id),
        INDEX idx_name (name),
        INDEX idx_type (game_type),
        UNIQUE KEY unique_name_category (name, category_id),
        FOREIGN KEY (category_id) REFERENCES interest_categories(id) ON DELETE CASCADE
    )";
    
    $pdo->exec($createGamesSQL);
    echo "✅ Created new games table structure\n";
    
    // Step 3: Migrate all interests to games table
    echo "\n📦 Step 3: Migrating interests data\n";
    echo "----------------------------------\n";
    
    $interests = $pdo->query("
        SELECT i.*, ic.name as category_name 
        FROM interests i 
        JOIN interest_categories ic ON i.category_id = ic.id 
        ORDER BY ic.name, i.name
    ")->fetchAll();
    
    $migrated = 0;
    foreach($interests as $interest) {
        // Determine game type based on category
        $gameType = 'VideoGame'; // default
        switch(strtolower($interest['category_name'])) {
            case 'videogames':
                $gameType = 'VideoGame';
                break;
            case 'physicalgames':
                $gameType = 'PhysicalGame';
                break;
            case 'media':
                $gameType = 'Media';
                break;
        }
        
        try {
            $stmt = $pdo->prepare("
                INSERT INTO games (name, category_id, description, game_type, created_at) 
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $interest['name'],
                $interest['category_id'],
                $interest['description'],
                $gameType,
                $interest['created_at']
            ]);
            $migrated++;
            echo "✅ Migrated: {$interest['name']} ({$interest['category_name']}) -> {$gameType}\n";
        } catch(PDOException $e) {
            echo "⚠️  Skipped duplicate: {$interest['name']}\n";
        }
    }
    
    echo "\nMigration complete: $migrated interests moved to games table\n";
    
    // Step 4: Update contact_interests to reference games instead
    echo "\n🔗 Step 4: Updating contact relationships\n";
    echo "----------------------------------------\n";
    
    // Create new contact_games table
    $pdo->exec("DROP TABLE IF EXISTS contact_games");
    $createContactGamesSQL = "
    CREATE TABLE contact_games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contact_id INT NOT NULL,
        game_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contact (contact_id),
        INDEX idx_game (game_id),
        UNIQUE KEY unique_contact_game (contact_id, game_id),
        FOREIGN KEY (contact_id) REFERENCES contacts(ID) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
    )";
    $pdo->exec($createContactGamesSQL);
    echo "✅ Created contact_games table\n";
    
    // Migrate contact_interests data
    $contactInterests = $pdo->query("
        SELECT ci.contact_id, ci.interest_id, i.name as interest_name
        FROM contact_interests ci
        JOIN interests i ON ci.interest_id = i.id
    ")->fetchAll();
    
    $linkedCount = 0;
    foreach($contactInterests as $ci) {
        // Find corresponding game
        $game = $pdo->prepare("SELECT id FROM games WHERE name = ?");
        $game->execute([$ci['interest_name']]);
        $gameResult = $game->fetch();
        
        if ($gameResult) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO contact_games (contact_id, game_id) 
                    VALUES (?, ?)
                ");
                $stmt->execute([$ci['contact_id'], $gameResult['id']]);
                $linkedCount++;
            } catch(PDOException $e) {
                // Skip duplicates
            }
        }
    }
    
    echo "✅ Linked $linkedCount contact-game relationships\n";
    
    // Step 5: Show final results
    echo "\n📊 Step 5: Final verification\n";
    echo "----------------------------\n";
    
    $gamesCount = $pdo->query("SELECT COUNT(*) FROM games")->fetchColumn();
    $contactGamesCount = $pdo->query("SELECT COUNT(*) FROM contact_games")->fetchColumn();
    $categoriesCount = $pdo->query("SELECT COUNT(*) FROM interest_categories")->fetchColumn();
    
    echo "Games in new table: $gamesCount\n";
    echo "Contact-game links: $contactGamesCount\n";
    echo "Categories preserved: $categoriesCount\n\n";
    
    // Show sample data
    echo "📋 Sample games by category:\n";
    $sampleGames = $pdo->query("
        SELECT g.name, ic.name as category, g.game_type, g.description
        FROM games g
        JOIN interest_categories ic ON g.category_id = ic.id
        ORDER BY ic.name, g.name
        LIMIT 10
    ")->fetchAll();
    
    foreach($sampleGames as $game) {
        echo "  • {$game['name']} ({$game['category']}) [{$game['game_type']}]\n";
    }
    
    echo "\n✅ Migration completed successfully!\n";
    echo "\nNext steps:\n";
    echo "----------\n";
    echo "1. Update API endpoints to use 'games' instead of 'interests'\n";
    echo "2. Update frontend JavaScript to use new API structure\n";
    echo "3. Test the new contact-games relationships\n";
    echo "4. Clean up old tables when ready:\n";
    echo "   - DROP TABLE contact_interests;\n";
    echo "   - DROP TABLE interests;\n";
    echo "   (Keep interest_categories as it's still used by games table)\n";
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}
?>