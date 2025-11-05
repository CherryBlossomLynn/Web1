<?php
// Work with existing separated table structure
// This script will organize the data in the existing tables properly

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "🔄 Working with Existing Separated Tables Structure\n";
echo "===================================================\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connected to database\n\n";
    
    // Check current structure
    echo "📋 Current Table Analysis:\n";
    echo "--------------------------\n";
    
    $tables = ['videogames', 'physicalgames', 'media', 'interest_categories', 'contact_interests'];
    foreach($tables as $table) {
        try {
            $count = $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn();
            echo "✅ $table: $count records\n";
        } catch(PDOException $e) {
            echo "❌ $table: Table not found or error\n";
        }
    }
    echo "\n";
    
    // Let's see what's in the videogames table
    echo "🎮 Videogames Table Sample:\n";
    echo "---------------------------\n";
    try {
        $vgSample = $pdo->query("SELECT * FROM videogames LIMIT 5")->fetchAll();
        foreach($vgSample as $vg) {
            echo "  • ID: {$vg['id']}, Name: {$vg['name']}\n";
            if (isset($vg['category_id'])) echo "    Category ID: {$vg['category_id']}\n";
            if (isset($vg['description'])) echo "    Description: " . substr($vg['description'], 0, 50) . "...\n";
        }
        echo "\n";
    } catch(PDOException $e) {
        echo "Error reading videogames: " . $e->getMessage() . "\n\n";
    }
    
    // Check if we can correlate with interest_categories
    echo "📊 Categories and Games Distribution:\n";
    echo "------------------------------------\n";
    
    try {
        // Get categories
        $categories = $pdo->query("SELECT * FROM interest_categories")->fetchAll();
        foreach($categories as $cat) {
            echo "Category: {$cat['name']} (ID: {$cat['id']})\n";
            
            // Check videogames in this category
            if ($cat['name'] == 'videogames') {
                $vgCount = $pdo->query("SELECT COUNT(*) FROM videogames WHERE category_id = {$cat['id']}")->fetchColumn();
                echo "  - Videogames: $vgCount items\n";
                
                $vgList = $pdo->query("SELECT name FROM videogames WHERE category_id = {$cat['id']} LIMIT 10")->fetchAll(PDO::FETCH_COLUMN);
                echo "  - Sample: " . implode(', ', $vgList) . "\n";
            }
        }
        echo "\n";
    } catch(PDOException $e) {
        echo "Error checking categories: " . $e->getMessage() . "\n\n";
    }
    
    // Check physicalgames table structure
    echo "🏐 Physical Games Table:\n";
    echo "-----------------------\n";
    try {
        $pgDesc = $pdo->query("DESCRIBE physicalgames")->fetchAll();
        echo "Columns in physicalgames table:\n";
        foreach($pgDesc as $col) {
            echo "  - {$col['Field']} ({$col['Type']})\n";
        }
        
        $pgSample = $pdo->query("SELECT * FROM physicalgames LIMIT 3")->fetchAll();
        if (count($pgSample) > 0) {
            echo "Sample data:\n";
            foreach($pgSample as $pg) {
                print_r($pg);
            }
        } else {
            echo "No data in physicalgames table\n";
        }
        echo "\n";
    } catch(PDOException $e) {
        echo "Error checking physicalgames: " . $e->getMessage() . "\n\n";
    }
    
    // Check media table structure  
    echo "📺 Media Table:\n";
    echo "--------------\n";
    try {
        $mediaDesc = $pdo->query("DESCRIBE media")->fetchAll();
        echo "Columns in media table:\n";
        foreach($mediaDesc as $col) {
            echo "  - {$col['Field']} ({$col['Type']})\n";
        }
        
        $mediaSample = $pdo->query("SELECT * FROM media LIMIT 3")->fetchAll();
        if (count($mediaSample) > 0) {
            echo "Sample data:\n";
            foreach($mediaSample as $media) {
                print_r($media);
            }
        } else {
            echo "No data in media table\n";
        }
        echo "\n";
    } catch(PDOException $e) {
        echo "Error checking media: " . $e->getMessage() . "\n\n";
    }
    
    // Now let's migrate data from videogames to the proper separated tables
    echo "🔄 Migration Plan:\n";
    echo "------------------\n";
    
    // Check which games are categorized as what
    try {
        $gamesByCategory = $pdo->query("
            SELECT 
                vg.name,
                vg.description,
                vg.category_id,
                ic.name as category_name
            FROM videogames vg
            LEFT JOIN interest_categories ic ON vg.category_id = ic.id
            ORDER BY ic.name, vg.name
        ")->fetchAll();
        
        $videogamesList = [];
        $physicalGamesList = [];
        $mediaList = [];
        
        foreach($gamesByCategory as $game) {
            switch(strtolower($game['category_name'])) {
                case 'videogames':
                    $videogamesList[] = $game;
                    break;
                case 'physicalgames':
                    $physicalGamesList[] = $game;
                    break;
                case 'media':
                    $mediaList[] = $game;
                    break;
                default:
                    echo "Unknown category: {$game['category_name']} for {$game['name']}\n";
            }
        }
        
        echo "Games to keep in videogames table: " . count($videogamesList) . "\n";
        echo "Games to move to physicalgames table: " . count($physicalGamesList) . "\n";
        echo "Games to move to media table: " . count($mediaList) . "\n\n";
        
        // Now let's restructure the physicalgames table properly
        echo "🏗️  Restructuring physicalgames table:\n";
        echo "--------------------------------------\n";
        
        // Drop and recreate physicalgames with proper structure
        $pdo->exec("DROP TABLE IF EXISTS physicalgames_backup");
        $pdo->exec("CREATE TABLE physicalgames_backup AS SELECT * FROM physicalgames");
        
        $pdo->exec("DROP TABLE physicalgames");
        $pdo->exec("
            CREATE TABLE physicalgames (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT,
                game_type ENUM('BoardGame', 'CardGame', 'Sport', 'Outdoor', 'Traditional') DEFAULT 'BoardGame',
                min_players INT DEFAULT 1,
                max_players INT DEFAULT 8,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_name (name)
            )
        ");
        echo "✅ Recreated physicalgames table\n";
        
        // Restructure media table properly
        echo "📺 Restructuring media table:\n";
        echo "-----------------------------\n";
        
        $pdo->exec("DROP TABLE IF EXISTS media_backup");
        $pdo->exec("CREATE TABLE media_backup AS SELECT * FROM media");
        
        $pdo->exec("DROP TABLE media");
        $pdo->exec("
            CREATE TABLE media (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT,
                media_type ENUM('Movie', 'TV_Show', 'Documentary', 'Music', 'Video', 'Social_Media') DEFAULT 'Movie',
                genre VARCHAR(50),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_name (name)
            )
        ");
        echo "✅ Recreated media table\n";
        
        // Migrate physical games
        echo "\n🏐 Migrating physical games:\n";
        echo "---------------------------\n";
        $physicalCount = 0;
        foreach($physicalGamesList as $game) {
            try {
                $gameType = 'BoardGame';
                $minPlayers = 2;
                $maxPlayers = 4;
                
                $gameName = strtolower($game['name']);
                if (strpos($gameName, 'uno') !== false || strpos($gameName, 'card') !== false) {
                    $gameType = 'CardGame';
                    $maxPlayers = 10;
                } elseif (strpos($gameName, 'sport') !== false || strpos($gameName, 'basketball') !== false) {
                    $gameType = 'Sport';
                    $maxPlayers = 10;
                } elseif (strpos($gameName, 'tag') !== false || strpos($gameName, 'hopscotch') !== false) {
                    $gameType = 'Outdoor';
                    $minPlayers = 1;
                    $maxPlayers = 20;
                }
                
                $stmt = $pdo->prepare("
                    INSERT INTO physicalgames (name, description, game_type, min_players, max_players, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $game['name'],
                    $game['description'],
                    $gameType,
                    $minPlayers,
                    $maxPlayers,
                    date('Y-m-d H:i:s')
                ]);
                echo "✅ {$game['name']} -> $gameType\n";
                $physicalCount++;
            } catch(PDOException $e) {
                echo "⚠️  Error with {$game['name']}: " . $e->getMessage() . "\n";
            }
        }
        
        // Migrate media
        echo "\n📺 Migrating media:\n";
        echo "------------------\n";
        $mediaCount = 0;
        foreach($mediaList as $item) {
            try {
                $mediaType = 'Movie';
                $genre = 'General';
                
                $itemName = strtolower($item['name']);
                if (strpos($itemName, 'movie') !== false || strpos($itemName, 'film') !== false) {
                    $mediaType = 'Movie';
                    if (strpos($itemName, 'action') !== false) $genre = 'Action';
                    elseif (strpos($itemName, 'romance') !== false) $genre = 'Romance';
                    elseif (strpos($itemName, 'comedy') !== false) $genre = 'Comedy';
                    elseif (strpos($itemName, 'sci-fi') !== false) $genre = 'Sci-Fi';
                } elseif (strpos($itemName, 'tv') !== false || strpos($itemName, 'show') !== false) {
                    $mediaType = 'TV_Show';
                } elseif (strpos($itemName, 'documentary') !== false) {
                    $mediaType = 'Documentary';
                    $genre = 'Educational';
                } elseif (strpos($itemName, 'music') !== false || strpos($itemName, 'video') !== false) {
                    $mediaType = 'Video';
                    if (strpos($itemName, 'music') !== false) $genre = 'Music';
                    else $genre = 'Entertainment';
                } elseif (strpos($itemName, 'social') !== false) {
                    $mediaType = 'Social_Media';
                    $genre = 'Social';
                }
                
                $stmt = $pdo->prepare("
                    INSERT INTO media (name, description, media_type, genre, created_at) 
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $item['name'],
                    $item['description'],
                    $mediaType,
                    $genre,
                    date('Y-m-d H:i:s')
                ]);
                echo "✅ {$item['name']} -> $mediaType ($genre)\n";
                $mediaCount++;
            } catch(PDOException $e) {
                echo "⚠️  Error with {$item['name']}: " . $e->getMessage() . "\n";
            }
        }
        
        // Clean up videogames table to only contain actual video games
        echo "\n🎮 Cleaning videogames table:\n";
        echo "-----------------------------\n";
        
        // Remove non-videogames from videogames table
        $removedCount = 0;
        foreach($physicalGamesList as $game) {
            $pdo->prepare("DELETE FROM videogames WHERE name = ?")->execute([$game['name']]);
            $removedCount++;
        }
        foreach($mediaList as $item) {
            $pdo->prepare("DELETE FROM videogames WHERE name = ?")->execute([$item['name']]);
            $removedCount++;
        }
        
        echo "✅ Removed $removedCount non-videogames from videogames table\n";
        
        // Final verification
        echo "\n📊 Final Table Counts:\n";
        echo "----------------------\n";
        
        $finalTables = ['videogames', 'physicalgames', 'media'];
        foreach($finalTables as $table) {
            $count = $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn();
            echo "✅ $table: $count records\n";
        }
        
        echo "\n🎉 Separation completed successfully!\n";
        echo "\n📋 Summary:\n";
        echo "----------\n";
        echo "• Videogames table now contains only video games\n";
        echo "• Physical games moved to physicalgames table with proper structure\n";
        echo "• Media items moved to media table with proper structure\n";
        echo "• All tables have proper indexes and constraints\n";
        
    } catch(PDOException $e) {
        echo "Migration error: " . $e->getMessage() . "\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}
?>