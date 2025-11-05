// MySQL Database Configuration
// This file contains the configuration for connecting to MySQL database

const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',  // XAMPP default user
    password: '',  // XAMPP default password (empty)
    database: 'Contact_Manager',  // Your existing database
    port: 3306,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Database schema setup
const setupDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                role ENUM('admin', 'user', 'manager') DEFAULT 'user',
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL,
                avatar VARCHAR(50) DEFAULT 'fas fa-user',
                location VARCHAR(100) DEFAULT 'Unknown'
            )
        `);

        // Create sessions table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                session_token VARCHAR(255) UNIQUE NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create audit log table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS audit_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                action VARCHAR(100) NOT NULL,
                details TEXT,
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Insert default users (with hashed passwords - use bcrypt in production)
        await connection.execute(`
            INSERT IGNORE INTO users (username, password_hash, email, full_name, role, avatar, location) VALUES
            ('lynn', '$2b$10$example_hash_for_Lynn@1104', 'Michelle.wise2004@gmail.com', 'Lynn Wise', 'admin', 'fas fa-user-tie', 'San Francisco, CA'),
            ('michael', '$2b$10$example_hash_for_database2025', 'michael@lynnsdatabase.local', 'Michael', 'user', 'fas fa-user', 'New York, NY'),
            ('testuser', '$2b$10$example_hash_for_123', 'testuser@lynnsdatabase.local', 'Test User', 'user', 'fas fa-user-check', 'Los Angeles, CA')
        `);

        connection.release();
        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Database setup failed:', error);
    }
};

// Database operations
const dbOperations = {
    // User authentication
    authenticateUser: async (username, password) => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT id, username, password_hash, email, full_name, role, status FROM users WHERE username = ? AND status = "active"',
                [username]
            );
            connection.release();
            
            if (rows.length === 0) return null;
            
            // In production, use bcrypt to compare password
            // const isValid = await bcrypt.compare(password, rows[0].password_hash);
            // For demo, we'll use simple comparison (NOT SECURE)
            const isValid = password === 'Lynn@1104' || password === 'database2025' || password === '123';
            
            if (isValid) {
                // Update last login
                await dbOperations.updateLastLogin(rows[0].id);
                return rows[0];
            }
            return null;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    // Get user profile
    getUserProfile: async (userId) => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT id, username, email, full_name, role, status, created_at, last_login, avatar, location FROM users WHERE id = ?',
                [userId]
            );
            connection.release();
            return rows[0] || null;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    // Update last login
    updateLastLogin: async (userId) => {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [userId]
            );
            connection.release();
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    // Search users
    searchUsers: async (searchTerm, role = null) => {
        const connection = await pool.getConnection();
        try {
            let query = `
                SELECT id, username, email, full_name, role, status, last_login, avatar, location 
                FROM users 
                WHERE (full_name LIKE ? OR email LIKE ? OR username LIKE ?)
            `;
            let params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
            
            if (role) {
                query += ' AND role = ?';
                params.push(role);
            }
            
            query += ' ORDER BY full_name';
            
            const [rows] = await connection.execute(query, params);
            connection.release();
            return rows;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    // Contact management operations
    searchContacts: async (searchTerm) => {
        const connection = await pool.getConnection();
        try {
            const query = `
                SELECT id, name, email, phone, birthday, bio, interests, avatar, status, created_at, updated_at, last_viewed 
                FROM contacts 
                WHERE status = 'active' AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)
                ORDER BY name
            `;
            const params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
            
            const [rows] = await connection.execute(query, params);
            connection.release();
            return rows;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    getAllContacts: async () => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT id, name, email, phone, birthday, bio, interests, avatar, status, created_at, updated_at, last_viewed FROM contacts WHERE status = "active" ORDER BY name'
            );
            connection.release();
            return rows;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    addContact: async (contactData) => {
        const connection = await pool.getConnection();
        try {
            const { name, email, phone, birthday, bio, interests, avatar = 'fas fa-user' } = contactData;
            const [result] = await connection.execute(
                'INSERT INTO contacts (name, email, phone, birthday, bio, interests, avatar, last_viewed) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
                [name, email, phone, birthday, bio, interests, avatar]
            );
            connection.release();
            return result.insertId;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    updateContact: async (contactId, contactData) => {
        const connection = await pool.getConnection();
        try {
            const { name, email, phone, birthday, bio, interests } = contactData;
            await connection.execute(
                'UPDATE contacts SET name = ?, email = ?, phone = ?, birthday = ?, bio = ?, interests = ?, updated_at = NOW(), last_viewed = NOW() WHERE id = ?',
                [name, email, phone, birthday, bio, interests, contactId]
            );
            connection.release();
            return true;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    deleteContact: async (contactId) => {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                'UPDATE contacts SET status = "inactive", updated_at = NOW() WHERE id = ?',
                [contactId]
            );
            connection.release();
            return true;
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    updateContactLastViewed: async (contactId) => {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                'UPDATE contacts SET last_viewed = NOW() WHERE id = ?',
                [contactId]
            );
            connection.release();
        } catch (error) {
            connection.release();
            throw error;
        }
    },

    // Log audit event
    logAudit: async (userId, action, details, ipAddress, userAgent) => {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                'INSERT INTO audit_log (user_id, action, details, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
                [userId, action, details, ipAddress, userAgent]
            );
            connection.release();
        } catch (error) {
            connection.release();
            throw error;
        }
    }
};

module.exports = {
    pool,
    setupDatabase,
    dbOperations,
    dbConfig
};

// Initialize database on module load
if (require.main === module) {
    setupDatabase();
}