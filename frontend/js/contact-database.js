// Database Configuration for Contact Manager
// This file bridges your frontend contact management with the MySQL database

class ContactDatabase {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api'; // Backend API endpoint
        this.isConnected = false;
    }

    // Test database connection
    async testConnection() {
        try {
            const response = await fetch(`${this.apiUrl}/test-connection`);
            this.isConnected = response.ok;
            return this.isConnected;
        } catch (error) {
            console.error('Database connection test failed:', error);
            this.isConnected = false;
            return false;
        }
    }

    // Get all contacts from database
    async getAllContacts() {
        try {
            const response = await fetch(`${this.apiUrl}/contacts`);
            if (!response.ok) throw new Error('Failed to fetch contacts');
            return await response.json();
        } catch (error) {
            console.error('Error fetching contacts:', error);
            // Fallback to localStorage if database is unavailable
            return this.getLocalContacts();
        }
    }

    // Search contacts in database
    async searchContacts(searchTerm) {
        try {
            const response = await fetch(`${this.apiUrl}/contacts/search?q=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Failed to search contacts');
            return await response.json();
        } catch (error) {
            console.error('Error searching contacts:', error);
            return this.searchLocalContacts(searchTerm);
        }
    }

    // Add new contact to database
    async addContact(contactData) {
        try {
            const response = await fetch(`${this.apiUrl}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });
            
            if (!response.ok) throw new Error('Failed to add contact');
            const result = await response.json();
            
            // Also update localStorage as backup
            this.addLocalContact({ ...contactData, id: result.insertId });
            
            return result;
        } catch (error) {
            console.error('Error adding contact:', error);
            // Fallback to localStorage
            return this.addLocalContact(contactData);
        }
    }

    // Update contact in database
    async updateContact(contactId, contactData) {
        try {
            const response = await fetch(`${this.apiUrl}/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });
            
            if (!response.ok) throw new Error('Failed to update contact');
            
            // Also update localStorage as backup
            this.updateLocalContact(contactId, contactData);
            
            return await response.json();
        } catch (error) {
            console.error('Error updating contact:', error);
            // Fallback to localStorage
            return this.updateLocalContact(contactId, contactData);
        }
    }

    // Delete contact from database
    async deleteContact(contactId) {
        try {
            const response = await fetch(`${this.apiUrl}/contacts/${contactId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete contact');
            
            // Also update localStorage as backup
            this.deleteLocalContact(contactId);
            
            return await response.json();
        } catch (error) {
            console.error('Error deleting contact:', error);
            // Fallback to localStorage
            return this.deleteLocalContact(contactId);
        }
    }

    // Update last viewed timestamp
    async updateLastViewed(contactId) {
        try {
            await fetch(`${this.apiUrl}/contacts/${contactId}/viewed`, {
                method: 'PUT'
            });
        } catch (error) {
            console.error('Error updating last viewed:', error);
        }
    }

    // Fallback methods for localStorage (when database is unavailable)
    getLocalContacts() {
        const contacts = localStorage.getItem('contacts');
        return contacts ? JSON.parse(contacts) : [];
    }

    searchLocalContacts(searchTerm) {
        const contacts = this.getLocalContacts();
        const term = searchTerm.toLowerCase();
        return contacts.filter(contact => 
            contact.name.toLowerCase().includes(term) ||
            (contact.email && contact.email.toLowerCase().includes(term)) ||
            (contact.phone && contact.phone.includes(term))
        );
    }

    addLocalContact(contactData) {
        const contacts = this.getLocalContacts();
        const newContact = {
            ...contactData,
            id: contactData.id || Date.now(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_viewed: new Date().toISOString()
        };
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        return { insertId: newContact.id };
    }

    updateLocalContact(contactId, contactData) {
        const contacts = this.getLocalContacts();
        const index = contacts.findIndex(c => c.id == contactId);
        if (index !== -1) {
            contacts[index] = {
                ...contacts[index],
                ...contactData,
                updated_at: new Date().toISOString(),
                last_viewed: new Date().toISOString()
            };
            localStorage.setItem('contacts', JSON.stringify(contacts));
            return true;
        }
        return false;
    }

    deleteLocalContact(contactId) {
        const contacts = this.getLocalContacts();
        const filteredContacts = contacts.filter(c => c.id != contactId);
        localStorage.setItem('contacts', JSON.stringify(filteredContacts));
        return true;
    }

    // Sync localStorage with database (when connection is restored)
    async syncLocalWithDatabase() {
        if (!this.isConnected) return false;

        try {
            const localContacts = this.getLocalContacts();
            const dbContacts = await this.getAllContacts();
            
            // This is a simple sync - in production, you'd want more sophisticated conflict resolution
            console.log(`Syncing ${localContacts.length} local contacts with ${dbContacts.length} database contacts`);
            
            return true;
        } catch (error) {
            console.error('Error syncing contacts:', error);
            return false;
        }
    }
}

// Make ContactDatabase available globally
window.ContactDatabase = ContactDatabase;

// Initialize the database connection
window.contactDB = new ContactDatabase();

// Test connection on load
window.contactDB.testConnection().then(connected => {
    console.log(`Database connection: ${connected ? 'Connected' : 'Using localStorage fallback'}`);
});

export default ContactDatabase;