<?php
// Quick SQL Executor for Interest Import
// This script runs the SQL file directly

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "🗄️ Quick SQL Import for Contact Interests\n";
echo "==========================================\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connected to database: $database\n";
    
    // Read SQL file
    $sqlFile = 'import-contact-interests.sql';
    if (!file_exists($sqlFile)) {
        echo "❌ SQL file not found: $sqlFile\n";
        exit(1);
    }
    
    $sql = file_get_contents($sqlFile);
    echo "📁 Loaded SQL file: " . number_format(strlen($sql)) . " characters\n\n";
    
    // Execute the entire SQL at once
    try {
        $pdo->exec($sql);
        echo "✅ SQL executed successfully!\n\n";
    } catch (PDOException $e) {
        echo "⚠️ Executing statement by statement...\n\n";
        
        // Split and execute individually
        $statements = preg_split('/;\s*$/m', $sql);
        $executed = 0;
        $errors = 0;
        
        foreach ($statements as $statement) {
            $statement = trim($statement);
            if (!empty($statement) && !preg_match('/^--/', $statement)) {
                try {
                    $pdo->exec($statement);
                    $executed++;
                    
                    // Show progress for table creation
                    if (strpos($statement, 'CREATE TABLE') !== false) {
                        preg_match('/CREATE TABLE[^`]*`?([^`\s]+)`?/', $statement, $matches);
                        $tableName = $matches[1] ?? 'table';
                        echo "✅ Created: $tableName\n";
                    }
                } catch (PDOException $ex) {
                    if (strpos($ex->getMessage(), 'already exists') === false && 
                        strpos($ex->getMessage(), 'Duplicate entry') === false) {
                        echo "⚠️ Error: " . $ex->getMessage() . "\n";
                        $errors++;
                    }
                }
            }
        }
        
        echo "\n📊 Executed: $executed statements, Errors: $errors\n\n";
    }
    
    // Verify results
    echo "📊 Verification:\n";
    echo "================\n";
    
    $tables = ['interest_categories', 'interests', 'contact_interests'];
    foreach ($tables as $table) {
        try {
            $result = $pdo->query("SELECT COUNT(*) as count FROM $table");
            $count = $result->fetch()['count'];
            echo "✅ $table: $count records\n";
        } catch (PDOException $e) {
            echo "❌ $table: Table not found\n";
        }
    }
    
    echo "\n🎯 Quick Sample:\n";
    echo "================\n";
    
    try {
        $result = $pdo->query("
            SELECT c.Name, i.name as interest, ic.name as category 
            FROM contacts c 
            JOIN contact_interests ci ON c.ID = ci.contact_id 
            JOIN interests i ON ci.interest_id = i.id 
            JOIN interest_categories ic ON i.category_id = ic.id 
            LIMIT 5
        ");
        
        while ($row = $result->fetch()) {
            echo "• {$row['Name']}: {$row['interest']} ({$row['category']})\n";
        }
    } catch (PDOException $e) {
        echo "Could not fetch sample data\n";
    }
    
    echo "\n✅ Import Complete! Check phpMyAdmin or run complete-interests-test.html\n";
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
    echo "Make sure XAMPP MySQL is running on port 3307\n";
    exit(1);
}
?>