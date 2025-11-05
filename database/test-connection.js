// Test MySQL connection with XAMPP default settings
const mysql = require('mysql2/promise');

async function testConnection() {
    console.log('Testing MySQL connection...');
    
    // Default XAMPP MySQL configuration
    const xamppConfig = {
        host: 'localhost',
        user: 'root',
        password: '', // Empty password is default for XAMPP
        port: 3306
    };
    
    try {
        console.log('Attempting to connect with XAMPP defaults...');
        const connection = await mysql.createConnection(xamppConfig);
        console.log('✅ Successfully connected to MySQL!');
        
        // Test query
        const [rows] = await connection.execute('SHOW DATABASES');
        console.log('📋 Available databases:');
        rows.forEach(row => console.log(`  - ${row.Database}`));
        
        // Check if our database exists
        const dbExists = rows.some(row => row.Database === 'lynns_database');
        if (dbExists) {
            console.log('✅ lynns_database found!');
        } else {
            console.log('ℹ️  lynns_database not found - will need to create it');
        }
        
        await connection.end();
        console.log('Connection test completed successfully!');
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 MySQL server is not running. Please:');
            console.log('   1. Open XAMPP Control Panel');
            console.log('   2. Click "Start" next to MySQL');
            console.log('   3. Wait for it to show "Running"');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('💡 Access denied. Check username/password');
        } else {
            console.log('💡 Other error occurred:', error.code);
        }
    }
}

testConnection();