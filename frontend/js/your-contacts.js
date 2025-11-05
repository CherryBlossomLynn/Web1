// Your Contact Manager Contacts - Ready for Website Integration
// This file contains your real contacts from the database

const yourDatabaseContacts = [
    // Keep Lynn as requested
    { id: 1, name: 'Lynn Davis', role: 'Administrator', status: 'online', favorite: true, lastViewed: Date.now() - 7200000, email: 'lynn@lynnsdatabase.local', phone: '+1 (555) 123-4567', birthday: '1988-11-04', bio: 'Database Administrator with over 8 years of experience in managing enterprise-level database systems. Specializes in MySQL, PostgreSQL, and data security protocols.' },
    // Your real contacts from Contact Manager database
    { id: 2, name: 'Kathy', role: 'User', status: 'offline', favorite: false, lastViewed: Date.now() - 86400000, email: '', phone: '', birthday: '', bio: 'Contact from your Contact Manager database.' },
    { id: 3, name: 'Michael', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 3600000, email: '', phone: '4694266925', birthday: '', bio: 'Contact from your Contact Manager database.' },
    { id: 4, name: 'Nathan', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 7200000, email: 'NathanLorenzen1@gmail.com', phone: '8649154169', birthday: '2000-06-07', bio: 'Contact from your Contact Manager database.' },
    { id: 5, name: 'Willie', role: 'User', status: 'away', favorite: false, lastViewed: Date.now() - 43200000, email: 'atuasmedium@gmail.com', phone: '', birthday: '1999-11-29', bio: 'Contact from your Contact Manager database.' },
    { id: 6, name: 'Scarlett', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 1800000, email: 'Scarlettfromash@gmail.com', phone: '9124679551', birthday: '2007-05-16', bio: 'Contact from your Contact Manager database.' }
];

// Function to load your contacts into the website
function loadYourDatabaseContacts() {
    console.log('🔄 Loading your Contact Manager contacts (including Lynn)...');
    console.log(`📊 Importing ${yourDatabaseContacts.length} contacts`);
    
    // Replace global contacts array with your contacts (including Lynn)
    if (typeof window.globalContacts !== 'undefined') {
        window.globalContacts.length = 0; // Clear existing contacts
        window.globalContacts.push(...yourDatabaseContacts); // Add your contacts
        console.log(`✅ Updated globalContacts with ${yourDatabaseContacts.length} contacts`);
    } else {
        window.globalContacts = [...yourDatabaseContacts];
        console.log(`✅ Created globalContacts with ${yourDatabaseContacts.length} contacts`);
    }
    
    // Update localStorage as backup
    localStorage.setItem('contacts', JSON.stringify(yourDatabaseContacts));
    console.log('✅ Updated localStorage with your contacts');
    
    // Show contact details
    console.log('📋 Your contacts (including Lynn):');
    yourDatabaseContacts.forEach(contact => {
        console.log(`- ${contact.name}${contact.email ? ' (' + contact.email + ')' : ''}${contact.phone ? ' - ' + contact.phone : ''}`);
    });
    
    // Trigger display updates
    setTimeout(() => {
        if (typeof window.updateContactsDisplay === 'function') {
            window.updateContactsDisplay();
            console.log('✅ Updated contacts display');
        }
        
        if (typeof window.updateRecentContacts === 'function') {
            window.updateRecentContacts();
            console.log('✅ Updated recent contacts');
        }
        
        // Show success notification
        if (typeof window.showNotification === 'function') {
            window.showNotification(`Successfully loaded ${yourDatabaseContacts.length} contacts from your Contact Manager database (including Lynn)!`, 'success');
        } else {
            alert(`✅ Success! Loaded ${yourDatabaseContacts.length} contacts: ${yourDatabaseContacts.map(c => c.name).join(', ')}`);
        }
    }, 500);
    
    return true;
}

// Make function globally available
window.loadYourDatabaseContacts = loadYourDatabaseContacts;
window.yourDatabaseContacts = yourDatabaseContacts;

// Auto-load your contacts
setTimeout(() => {
    console.log('🚀 Auto-loading your Contact Manager contacts...');
    loadYourDatabaseContacts();
}, 2000);

console.log('📊 Your Contact Manager integration loaded!');
console.log(`👥 Ready to load ${yourDatabaseContacts.length} contacts (including Lynn): ${yourDatabaseContacts.map(c => c.name).join(', ')}`);
console.log('💡 Run loadYourDatabaseContacts() to manually reload');