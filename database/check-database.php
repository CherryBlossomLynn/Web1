<?php
// Quick Database Table Verification
// Check if the enhanced interests tables exist in contact_manager

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h1>📊 Contact_Manager Database Status</h1>\n";
    echo "<p>Connected to: <strong>$database</strong> on <strong>$host</strong></p>\n";
    
    // Check all tables in the database
    $result = $pdo->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h2>📋 Available Tables:</h2>\n";
    echo "<ul>\n";
    foreach ($tables as $table) {
        echo "<li><strong>$table</strong></li>\n";
    }
    echo "</ul>\n";
    
    // Check if enhanced interests tables exist
    $enhancedTables = ['interest_categories', 'interests', 'contact_interests'];
    $existingEnhanced = array_intersect($enhancedTables, $tables);
    
    if (count($existingEnhanced) > 0) {
        echo "<h2>✅ Enhanced Interests Tables Found:</h2>\n";
        foreach ($existingEnhanced as $table) {
            echo "<h3>$table</h3>\n";
            
            // Get table structure
            $result = $pdo->query("DESCRIBE $table");
            echo "<table border='1' cellpadding='5' cellspacing='0'>\n";
            echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>\n";
            while ($row = $result->fetch()) {
                echo "<tr>";
                echo "<td>{$row['Field']}</td>";
                echo "<td>{$row['Type']}</td>";
                echo "<td>{$row['Null']}</td>";
                echo "<td>{$row['Key']}</td>";
                echo "<td>{$row['Default']}</td>";
                echo "<td>{$row['Extra']}</td>";
                echo "</tr>\n";
            }
            echo "</table>\n";
            
            // Get row count
            $result = $pdo->query("SELECT COUNT(*) as count FROM $table");
            $count = $result->fetch()['count'];
            echo "<p><strong>Rows:</strong> $count</p>\n";
        }
    } else {
        echo "<h2>⚠️ Enhanced Interests Tables Not Found</h2>\n";
        echo "<p>The enhanced interests tables need to be created. Original tables available:</p>\n";
        
        // Check original tables
        $originalTables = ['contacts', 'games', 'gametypes'];
        foreach ($originalTables as $table) {
            if (in_array($table, $tables)) {
                echo "<h3>$table (Original)</h3>\n";
                $result = $pdo->query("SELECT COUNT(*) as count FROM $table");
                $count = $result->fetch()['count'];
                echo "<p><strong>Rows:</strong> $count</p>\n";
                
                // Show some sample data
                $result = $pdo->query("SELECT * FROM $table LIMIT 5");
                if ($result->rowCount() > 0) {
                    echo "<table border='1' cellpadding='5' cellspacing='0'>\n";
                    $firstRow = true;
                    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                        if ($firstRow) {
                            echo "<tr>";
                            foreach (array_keys($row) as $column) {
                                echo "<th>$column</th>";
                            }
                            echo "</tr>\n";
                            $firstRow = false;
                        }
                        echo "<tr>";
                        foreach ($row as $value) {
                            echo "<td>" . htmlspecialchars($value ?? '') . "</td>";
                        }
                        echo "</tr>\n";
                    }
                    echo "</table>\n";
                }
            }
        }
    }
    
    // Show database access links
    echo "<h2>🔗 Database Access Links:</h2>\n";
    echo "<ul>\n";
    echo "<li><a href='http://localhost/phpmyadmin' target='_blank'>📊 phpMyAdmin Home</a></li>\n";
    echo "<li><a href='http://localhost/phpmyadmin/index.php?route=/database/structure&db=contact_manager' target='_blank'>📋 contact_manager Database</a></li>\n";
    echo "<li><a href='setup-interests.php'>🔧 Setup Enhanced Interests</a></li>\n";
    echo "</ul>\n";
    
} catch (PDOException $e) {
    echo "<h2>❌ Database Connection Error</h2>\n";
    echo "<p><strong>Error:</strong> " . htmlspecialchars($e->getMessage()) . "</p>\n";
    echo "<p>Make sure XAMPP MySQL is running on port 3307</p>\n";
}
?>