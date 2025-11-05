<?php
// Check current database structure
$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "Current Database Structure\n";
echo "=========================\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get all tables
    $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    
    foreach($tables as $table) {
        echo "Table: $table\n";
        echo str_repeat("-", strlen($table) + 7) . "\n";
        
        $cols = $pdo->query("DESCRIBE $table")->fetchAll();
        foreach($cols as $col) {
            echo "  - {$col['Field']} ({$col['Type']})";
            if ($col['Key']) echo " [{$col['Key']}]";
            if ($col['Default'] !== null) echo " DEFAULT: {$col['Default']}";
            echo "\n";
        }
        
        // Show row count
        $count = $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn();
        echo "  Records: $count\n\n";
    }
    
    // Show sample data from key tables
    echo "Sample Data:\n";
    echo "============\n\n";
    
    if (in_array('games', $tables)) {
        echo "Games table sample:\n";
        $games = $pdo->query("SELECT * FROM games LIMIT 5")->fetchAll();
        foreach($games as $game) {
            print_r($game);
        }
        echo "\n";
    }
    
    if (in_array('interests', $tables)) {
        echo "Interests table sample:\n";
        $interests = $pdo->query("SELECT * FROM interests LIMIT 5")->fetchAll();
        foreach($interests as $interest) {
            print_r($interest);
        }
        echo "\n";
    }
    
    if (in_array('gametypes', $tables)) {
        echo "Gametypes table sample:\n";
        $gametypes = $pdo->query("SELECT * FROM gametypes")->fetchAll();
        foreach($gametypes as $gametype) {
            print_r($gametype);
        }
    }
    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
?>