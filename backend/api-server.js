// Simple API Server for Contact Manager Database
// This creates endpoints for your frontend to interact with the MySQL database

const express = require('express');
const cors = require('cors');
const { dbOperations } = require('./mysql-config');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/test-connection', async (req, res) => {
    try {
        // Simple test query
        const contacts = await dbOperations.getAllContacts();
        res.json({ success: true, message: 'Database connected', contactCount: contacts.length });
    } catch (error) {
        console.error('Database connection test failed:', error);
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await dbOperations.getAllContacts();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// Search contacts
app.get('/api/contacts/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Search query required' });
        }
        
        const contacts = await dbOperations.searchContacts(q);
        res.json(contacts);
    } catch (error) {
        console.error('Error searching contacts:', error);
        res.status(500).json({ error: 'Failed to search contacts' });
    }
});

// Add new contact
app.post('/api/contacts', async (req, res) => {
    try {
        const contactData = req.body;
        
        // Basic validation
        if (!contactData.name) {
            return res.status(400).json({ error: 'Contact name is required' });
        }
        
        const insertId = await dbOperations.addContact(contactData);
        
        // Log the action
        if (req.body.userId) {
            await dbOperations.logAudit(
                req.body.userId, 
                'contact_added', 
                `Added contact: ${contactData.name}`,
                req.ip,
                req.get('User-Agent')
            );
        }
        
        res.json({ success: true, insertId });
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ error: 'Failed to add contact' });
    }
});

// Update contact
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const contactData = req.body;
        
        const success = await dbOperations.updateContact(contactId, contactData);
        
        if (success) {
            // Log the action
            if (req.body.userId) {
                await dbOperations.logAudit(
                    req.body.userId,
                    'contact_updated',
                    `Updated contact ID: ${contactId}`,
                    req.ip,
                    req.get('User-Agent')
                );
            }
            
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// Delete contact (soft delete)
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        
        const success = await dbOperations.deleteContact(contactId);
        
        if (success) {
            // Log the action
            if (req.body.userId) {
                await dbOperations.logAudit(
                    req.body.userId,
                    'contact_deleted',
                    `Deleted contact ID: ${contactId}`,
                    req.ip,
                    req.get('User-Agent')
                );
            }
            
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

// Update last viewed
app.put('/api/contacts/:id/viewed', async (req, res) => {
    try {
        const contactId = req.params.id;
        await dbOperations.updateContactLastViewed(contactId);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating last viewed:', error);
        res.status(500).json({ error: 'Failed to update last viewed' });
    }
});

// User authentication endpoints
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }
        
        const user = await dbOperations.authenticateUser(username, password);
        
        if (user) {
            // Log successful login
            await dbOperations.logAudit(
                user.id,
                'login',
                'User logged in successfully',
                req.ip,
                req.get('User-Agent')
            );
            
            res.json({ success: true, user: { ...user, password_hash: undefined } });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get user profile
app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await dbOperations.getUserProfile(userId);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Contact Manager API is running'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Contact Manager API running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database: Contact_Manager`);
});

module.exports = app;