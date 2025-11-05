<?php
// Import All Contact Interests to Database
// This script executes the SQL to create tables and import all contact interests

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
.container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.success { color: #28a745; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 10px; margin: 10px 0; border-radius: 5px; }
.error { color: #dc3545; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; margin: 10px 0; border-radius: 5px; }
.info { color: #0c5460; background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 10px; margin: 10px 0; border-radius: 5px; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f8f9fa; }
pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
.step { margin: 20px 0; padding: 15px; border-left: 4px solid #007bff; background-color: #f8f9fa; }
</style>";

echo "<div class='container'>";
echo "<h1>🗄️ Import All Contact Interests to Database</h1>";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<div class='success'>✅ Connected to database: $database</div>";
    
    // Read and execute the SQL file
    $sqlFile = 'import-contact-interests.sql';
    
    if (!file_exists($sqlFile)) {
        echo "<div class='error'>❌ SQL file not found: $sqlFile</div>";
        exit;
    }
    
    $sql = file_get_contents($sqlFile);
    echo "<div class='info'>📁 Loaded SQL file: $sqlFile (" . number_format(strlen($sql)) . " characters)</div>";
    
    // Split into individual statements and execute
    $statements = preg_split('/;\s*\n/', $sql);
    $executedCount = 0;
    $errorCount = 0;
    
    echo "<div class='step'>";
    echo "<h2>🔄 Executing SQL Statements</h2>";
    
    foreach ($statements as $index => $statement) {
        $statement = trim($statement);
        if (!empty($statement) && !preg_match('/^--/', $statement) && !preg_match('/^\/\*/', $statement)) {
            try {
                $pdo->exec($statement);
                $executedCount++;
                
                // Show progress for key operations
                if (strpos($statement, 'CREATE TABLE') !== false) {
                    preg_match('/CREATE TABLE[^`]*`?([^`\s]+)`?/', $statement, $matches);
                    $tableName = $matches[1] ?? 'unknown';
                    echo "<div class='success'>✅ Created table: $tableName</div>";
                } elseif (strpos($statement, 'INSERT') !== false && strpos($statement, 'interest_categories') !== false) {
                    echo "<div class='success'>✅ Inserted interest categories</div>";
                } elseif (strpos($statement, 'INSERT') !== false && strpos($statement, 'interests (') !== false) {
                    echo "<div class='success'>✅ Inserted interests data</div>";
                } elseif (strpos($statement, 'INSERT') !== false && strpos($statement, 'contact_interests') !== false) {
                    echo "<div class='success'>✅ Linked contact interests</div>";
                }
            } catch (PDOException $e) {
                if (strpos($e->getMessage(), 'Duplicate entry') === false && 
                    strpos($e->getMessage(), 'already exists') === false) {
                    echo "<div class='error'>⚠️ Error in statement " . ($index + 1) . ": " . $e->getMessage() . "</div>";
                    $errorCount++;
                }
            }
        }
    }
    echo "</div>";
    
    echo "<div class='success'>🎉 Import completed! Executed $executedCount statements with $errorCount errors.</div>";
    
    // Verify the results
    echo "<div class='step'>";
    echo "<h2>📊 Verification Results</h2>";
    
    // Category count
    $result = $pdo->query("SELECT COUNT(*) as count FROM interest_categories");
    $categoryCount = $result->fetch()['count'];
    echo "<div class='info'>📁 Interest Categories: $categoryCount</div>";
    
    // Interest count
    $result = $pdo->query("SELECT COUNT(*) as count FROM interests");
    $interestCount = $result->fetch()['count'];
    echo "<div class='info'>🎯 Total Interests: $interestCount</div>";
    
    // Assignment count
    $result = $pdo->query("SELECT COUNT(*) as count FROM contact_interests");
    $assignmentCount = $result->fetch()['count'];
    echo "<div class='info'>🔗 Contact-Interest Links: $assignmentCount</div>";
    
    echo "</div>";
    
    // Show interests by category
    echo "<div class='step'>";
    echo "<h2>🎮 Interests by Category</h2>";
    $result = $pdo->query("
        SELECT 
            ic.name as category,
            COUNT(i.id) as interest_count,
            GROUP_CONCAT(i.name ORDER BY i.name SEPARATOR ', ') as interests
        FROM interest_categories ic
        LEFT JOIN interests i ON ic.id = i.category_id
        GROUP BY ic.id, ic.name
        ORDER BY ic.name
    ");
    
    while ($row = $result->fetch()) {
        echo "<h3>" . ucfirst($row['category']) . " ({$row['interest_count']} interests)</h3>";
        echo "<p>" . ($row['interests'] ?: 'No interests found') . "</p>";
    }
    echo "</div>";
    
    // Show contact assignments
    echo "<div class='step'>";
    echo "<h2>👥 Contact Interest Assignments</h2>";
    $result = $pdo->query("
        SELECT 
            c.Name as contact_name,
            COUNT(ci.interest_id) as total_interests,
            GROUP_CONCAT(
                CONCAT(ic.name, ': ', i.name) 
                ORDER BY ic.name, i.name 
                SEPARATOR ' | '
            ) as interest_details
        FROM contacts c
        LEFT JOIN contact_interests ci ON c.ID = ci.contact_id
        LEFT JOIN interests i ON ci.interest_id = i.id
        LEFT JOIN interest_categories ic ON i.category_id = ic.id
        GROUP BY c.ID, c.Name
        ORDER BY c.Name
    ");
    
    echo "<table>";
    echo "<tr><th>Contact</th><th>Total Interests</th><th>Interest Details</th></tr>";
    while ($row = $result->fetch()) {
        echo "<tr>";
        echo "<td><strong>{$row['contact_name']}</strong></td>";
        echo "<td>{$row['total_interests']}</td>";
        echo "<td>" . ($row['interest_details'] ?: 'No interests assigned') . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
    
    // Show detailed breakdown
    echo "<div class='step'>";
    echo "<h2>📋 Detailed Interest Breakdown</h2>";
    $result = $pdo->query("
        SELECT 
            c.Name as contact,
            ic.name as category,
            GROUP_CONCAT(i.name ORDER BY i.name SEPARATOR ', ') as interests
        FROM contacts c
        JOIN contact_interests ci ON c.ID = ci.contact_id
        JOIN interests i ON ci.interest_id = i.id
        JOIN interest_categories ic ON i.category_id = ic.id
        GROUP BY c.ID, c.Name, ic.id, ic.name
        ORDER BY c.Name, ic.name
    ");
    
    echo "<table>";
    echo "<tr><th>Contact</th><th>Category</th><th>Interests</th></tr>";
    while ($row = $result->fetch()) {
        echo "<tr>";
        echo "<td><strong>{$row['contact']}</strong></td>";
        echo "<td>" . ucfirst($row['category']) . "</td>";
        echo "<td>{$row['interests']}</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
    
    echo "<div class='success'>";
    echo "<h2>✅ Import Complete!</h2>";
    echo "<p>All contact interests have been successfully imported and linked to the database.</p>";
    echo "<p><strong>Next Steps:</strong></p>";
    echo "<ul>";
    echo "<li>Visit <a href='http://localhost/phpmyadmin/index.php?route=/database/structure&db=contact_manager'>phpMyAdmin</a> to view the tables</li>";
    echo "<li>Test the <a href='http://localhost:3000/api/interests'>API endpoints</a></li>";
    echo "<li>Check the <a href='../frontend/complete-interests-test.html'>complete interests test</a></li>";
    echo "</ul>";
    echo "</div>";
    
} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h2>❌ Database Connection Error</h2>";
    echo "<p><strong>Error:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p>Make sure XAMPP MySQL is running on port 3307</p>";
    echo "</div>";
}

echo "</div>";
?>