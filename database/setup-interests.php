<?php
// Enhanced Interests Database Setup Script
// Run this to add all interests to the Contact_Manager database

$host = 'localhost:3307';
$username = 'root';
$password = '';
$database = 'contact_manager';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h1>Enhanced Interests Database Setup</h1>\n";
    
    // Read and execute the SQL file
    $sql = file_get_contents('enhanced-interests-setup.sql');
    
    // Split into individual statements
    $statements = explode(';', $sql);
    
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement) && !preg_match('/^--/', $statement)) {
            try {
                $pdo->exec($statement);
                echo "<p>✅ Executed: " . substr($statement, 0, 100) . "...</p>\n";
            } catch (PDOException $e) {
                if (strpos($e->getMessage(), 'Duplicate entry') === false) {
                    echo "<p>⚠️ Warning: " . $e->getMessage() . "</p>\n";
                }
            }
        }
    }
    
    // Verify the setup
    echo "<h2>Verification Results:</h2>\n";
    
    $result = $pdo->query("SELECT COUNT(*) as total FROM interests");
    $total = $result->fetch()['total'];
    echo "<p>Total interests created: $total</p>\n";
    
    $result = $pdo->query("
        SELECT ic.name as category, COUNT(i.id) as count 
        FROM interest_categories ic 
        LEFT JOIN interests i ON ic.id = i.category_id 
        GROUP BY ic.id, ic.name
    ");
    echo "<h3>Interests by Category:</h3>\n";
    while ($row = $result->fetch()) {
        echo "<p>{$row['category']}: {$row['count']} interests</p>\n";
    }
    
    $result = $pdo->query("
        SELECT c.Name, COUNT(ci.interest_id) as interest_count
        FROM contacts c 
        LEFT JOIN contact_interests ci ON c.ID = ci.contact_id
        GROUP BY c.ID, c.Name
    ");
    echo "<h3>Contact Interest Assignments:</h3>\n";
    while ($row = $result->fetch()) {
        echo "<p>{$row['Name']}: {$row['interest_count']} interests assigned</p>\n";
    }
    
    echo "<h2>✅ Database setup completed successfully!</h2>\n";
    
} catch (PDOException $e) {
    echo "<h2>❌ Database connection failed:</h2>\n";
    echo "<p>" . $e->getMessage() . "</p>\n";
}
?>