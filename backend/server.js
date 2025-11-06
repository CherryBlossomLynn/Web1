// Express Server with MySQL Integration
// This file provides a backend API for the Lynn's Database Website

const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const { dbOperations, setupDatabase } = require('./mysql-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Allow inline scripts for demo
}));

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://lynnsdatabase.local'],
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'lynn-database-secret-key', // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes

// Authentication endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        const user = await dbOperations.authenticateUser(username, password);
        
        if (user) {
            req.session.userId = user.id;
            req.session.username = user.username;
            
            // Log login attempt
            await dbOperations.logAudit(
                user.id,
                'login',
                'User logged in successfully',
                req.ip,
                req.get('User-Agent')
            );
            
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.full_name,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
    if (req.session.userId) {
        // Log logout
        dbOperations.logAudit(
            req.session.userId,
            'logout',
            'User logged out',
            req.ip,
            req.get('User-Agent')
        ).catch(console.error);
    }
    
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Could not log out'
            });
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
});

// Get user profile
app.get('/api/user/profile', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const user = await dbOperations.getUserProfile(req.session.userId);
        
        if (user) {
            res.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.full_name,
                    role: user.role,
                    status: user.status,
                    lastLogin: user.last_login,
                    avatar: user.avatar,
                    location: user.location
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Search users
app.get('/api/users/search', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const { q: searchTerm, role } = req.query;
        
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: 'Search term is required'
            });
        }

        const users = await dbOperations.searchUsers(searchTerm, role);
        
        res.json({
            success: true,
            users: users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.full_name,
                role: user.role,
                status: user.status,
                lastLogin: user.last_login,
                avatar: user.avatar,
                location: user.location
            }))
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get contacts from Contact_Manager database
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await dbOperations.getContactManagerContacts();
        res.json({
            success: true,
            contacts: contacts
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get games and gametypes for interests
app.get('/api/interests', async (req, res) => {
    try {
        const interests = await dbOperations.getGamesAndGameTypes();
        res.json({
            success: true,
            interests: interests
        });
    } catch (error) {
        console.error('Get interests error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get contact interests by ID
app.get('/api/contacts/:id/interests', async (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const interests = await dbOperations.getContactInterests(contactId);
        res.json({
            success: true,
            interests: interests
        });
    } catch (error) {
        console.error('Get contact interests error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// Serve the main website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Initialize database and start server
async function startServer() {
    try {
        console.log('Setting up database...');
        await setupDatabase();
        
        app.listen(PORT, () => {
            console.log(`
🚀 Lynn's Database Server is running!

📍 Local URLs:
   - Main site: http://localhost:${PORT}
   - API Health: http://localhost:${PORT}/api/health
   
🔑 Demo Accounts:
   - Admin: lynn / Lynn@1104
   - User: michael / database2025  
   - Test User: testuser / 123

🗄️  Database: MySQL connection established
            `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();

module.exports = app;