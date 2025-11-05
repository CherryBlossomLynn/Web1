// Contact Database Integration
// This script replaces frontend contacts with real database contacts

// API endpoints
const API_BASE = 'http://localhost:3000/api';

// Function to fetch contacts from Contact_Manager database
async function fetchDatabaseContacts() {
    try {
        console.log('🔄 Fetching contacts from Contact_Manager database...');
        
        const response = await fetch(`${API_BASE}/contacts`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contacts = await response.json();
        console.log(`✅ Fetched ${contacts.length} contacts from database`);
        
        return contacts;
    } catch (error) {
        console.error('❌ Error fetching database contacts:', error);
        return null;
    }
}

// Function to convert database contact format to frontend format
function convertDatabaseContact(dbContact) {
    return {
        id: dbContact.id,
        name: dbContact.name || 'Unknown',
        email: dbContact.email || '',
        phone: dbContact.phone || '',
        birthday: dbContact.birthday ? formatDate(dbContact.birthday) : '',
        bio: dbContact.bio || '',
        interests: dbContact.interests || '',
        avatar: dbContact.avatar || 'fas fa-user',
        created_at: dbContact.created_at,
        updated_at: dbContact.updated_at,
        lastViewed: new Date(dbContact.last_viewed).getTime() || Date.now()
    };
}

// Function to format database date to MM/DD/YYYY
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Function to replace frontend contacts with database contacts
async function replaceFrontendContacts() {
    try {
        console.log('🔄 Replacing frontend contacts with database contacts...');
        
        // Fetch contacts from database
        const databaseContacts = await fetchDatabaseContacts();
        
        if (!databaseContacts) {
            console.log('⚠️ Could not fetch database contacts, keeping current frontend contacts');
            return false;
        }
        
        // Convert database contacts to frontend format
        const convertedContacts = databaseContacts.map(convertDatabaseContact);
        
        // Replace global contacts array
        if (typeof window.globalContacts !== 'undefined') {
            window.globalContacts = convertedContacts;
            console.log(`✅ Replaced globalContacts with ${convertedContacts.length} database contacts`);
        }
        
        // Update localStorage as backup
        localStorage.setItem('contacts', JSON.stringify(convertedContacts));
        console.log('✅ Updated localStorage with database contacts');
        
        // Trigger display updates if functions exist
        if (typeof window.updateContactsDisplay === 'function') {
            window.updateContactsDisplay();
            console.log('✅ Updated contacts display');
        }
        
        if (typeof window.updateRecentContacts === 'function') {
            window.updateRecentContacts();
            console.log('✅ Updated recent contacts');
        }
        
        // Show success message
        if (typeof window.showNotification === 'function') {
            window.showNotification('success', `Successfully loaded ${convertedContacts.length} contacts from database`);
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Error replacing frontend contacts:', error);
        return false;
    }
}

// Function to sync a contact update back to database
async function syncContactToDatabase(contact) {
    try {
        const contactData = {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            birthday: contact.birthday,
            bio: contact.bio,
            interests: contact.interests
        };
        
        let response;
        if (contact.id && contact.id !== 'temp_' + Date.now()) {
            // Update existing contact
            response = await fetch(`${API_BASE}/contacts/${contact.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
        } else {
            // Add new contact
            response = await fetch(`${API_BASE}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
        }
        
        if (response.ok) {
            console.log('✅ Contact synced to database');
            return true;
        } else {
            console.error('❌ Failed to sync contact to database');
            return false;
        }
    } catch (error) {
        console.error('❌ Error syncing contact to database:', error);
        return false;
    }
}

// Function to delete contact from database
async function deleteContactFromDatabase(contactId) {
    try {
        const response = await fetch(`${API_BASE}/contacts/${contactId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            console.log('✅ Contact deleted from database');
            return true;
        } else {
            console.error('❌ Failed to delete contact from database');
            return false;
        }
    } catch (error) {
        console.error('❌ Error deleting contact from database:', error);
        return false;
    }
}

// Make functions globally available
window.fetchDatabaseContacts = fetchDatabaseContacts;
window.replaceFrontendContacts = replaceFrontendContacts;
window.syncContactToDatabase = syncContactToDatabase;
window.deleteContactFromDatabase = deleteContactFromDatabase;

// Auto-replace contacts when this script loads (with delay to ensure other scripts load first)
setTimeout(() => {
    if (typeof window.globalContacts !== 'undefined') {
        console.log('🚀 Auto-loading contacts from Contact_Manager database...');
        replaceFrontendContacts();
    }
}, 2000);

console.log('📊 Contact database integration script loaded');