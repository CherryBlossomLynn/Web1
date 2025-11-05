// Your Contact Manager Contacts - Ready for Website Integration
// This file contains your real contacts from the database

const yourDatabaseContacts = [
    // Keep Lynn as requested
    { id: 1, name: 'Lynn Davis', role: 'Administrator', status: 'online', favorite: true, lastViewed: Date.now() - 7200000, email: 'lynn@lynnsdatabase.local', phone: '+1 (555) 123-4567', birthday: '1988-11-04', bio: 'Database Administrator with over 8 years of experience in managing enterprise-level database systems. Specializes in MySQL, PostgreSQL, and data security protocols.', interests: { videogames: ['Database Management Games'], physicalGames: ['Chess', 'Strategy Board Games'], media: ['Tech Documentaries', 'Cybersecurity Films'] } },
    // Your real contacts from Contact Manager database with interests based on games/gametypes tables
    { id: 2, name: 'Kathy', role: 'User', status: 'offline', favorite: false, lastViewed: Date.now() - 86400000, email: '', phone: '', birthday: '', bio: 'Contact from your Contact Manager database. Enjoys card games and movies.', interests: { videogames: ['Casual Mobile Games'], physicalGames: ['Uno', 'Hopscotch', 'Jump Rope'], media: ['Romance Movies', 'Comedy Films', 'TV Dramas'] } },
    { id: 3, name: 'Michael', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 3600000, email: '', phone: '4694266925', birthday: '', bio: 'Contact from your Contact Manager database. Gaming enthusiast and movie lover.', interests: { videogames: ['Minecraft', 'Action Games', 'RPGs'], physicalGames: ['Monopoly', 'Card Games', 'Basketball'], media: ['Action Movies', 'Gaming Streams', 'Adventure Films'] } },
    { id: 4, name: 'Nathan', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 7200000, email: 'NathanLorenzen1@gmail.com', phone: '8649154169', birthday: '2000-06-07', bio: 'Contact from your Contact Manager database. Tech-savvy gamer born in 2000.', interests: { videogames: ['VR Games', 'Virtual Reality', 'Tech Simulators'], physicalGames: ['Tech Gadgets', 'Puzzle Games'], media: ['Sci-Fi Movies', 'Tech Reviews', 'Gaming Content'] } },
    { id: 5, name: 'Willie', role: 'User', status: 'away', favorite: false, lastViewed: Date.now() - 43200000, email: 'atuasmedium@gmail.com', phone: '', birthday: '1999-11-29', bio: 'Contact from your Contact Manager database. Enjoys traditional games and entertainment.', interests: { videogames: ['Classic Arcade Games'], physicalGames: ['Uno', 'Checkers', 'Traditional Games'], media: ['Classic Movies', 'Old TV Shows', 'Documentaries'] } },
    { id: 6, name: 'Scarlett', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 1800000, email: 'Scarlettfromash@gmail.com', phone: '9124679551', birthday: '2007-05-16', bio: 'Contact from your Contact Manager database. Young gamer who loves variety.', interests: { videogames: ['Minecraft', 'Mobile Games', 'Creative Games'], physicalGames: ['Tag', 'Board Games', 'Sports'], media: ['Teen Movies', 'Music Videos', 'Social Media Content'] } }
];

// Function to load your contacts into the website
function loadYourDatabaseContacts() {
    console.log('🔄 FORCE LOADING your Contact Manager contacts (including Lynn)...');
    console.log(`📊 Importing ${yourDatabaseContacts.length} contacts`);
    
    // FORCE clear localStorage first
    localStorage.removeItem('contacts');
    console.log('🗑️ Cleared old localStorage contacts');
    
    // FORCE replace global contacts array with your contacts (including Lynn)
    window.globalContacts = [...yourDatabaseContacts]; // Completely replace, don't merge
    console.log(`✅ FORCE Updated globalContacts with ${yourDatabaseContacts.length} contacts`);
    
    // Update localStorage as backup
    localStorage.setItem('contacts', JSON.stringify(yourDatabaseContacts));
    console.log('✅ Updated localStorage with your contacts');
    
    // Show contact details
    console.log('📋 Your contacts (including Lynn):');
    yourDatabaseContacts.forEach(contact => {
        console.log(`- ${contact.name}${contact.email ? ' (' + contact.email + ')' : ''}${contact.phone ? ' - ' + contact.phone : ''}`);
    });
    
    // IMMEDIATE display updates (no timeout)
    if (typeof window.updateContactsDisplay === 'function') {
        window.updateContactsDisplay();
        console.log('✅ IMMEDIATE Updated contacts display');
    }
    
    if (typeof window.updateRecentContacts === 'function') {
        window.updateRecentContacts();
        console.log('✅ IMMEDIATE Updated recent contacts');
    }
    
    // Also trigger after delay as backup
    setTimeout(() => {
        if (typeof window.updateContactsDisplay === 'function') {
            window.updateContactsDisplay();
            console.log('✅ DELAYED Updated contacts display');
        }
        
        if (typeof window.updateRecentContacts === 'function') {
            window.updateRecentContacts();
            console.log('✅ DELAYED Updated recent contacts');
        }
        
        // Show success notification
        if (typeof window.showNotification === 'function') {
            window.showNotification(`Successfully loaded ${yourDatabaseContacts.length} contacts from your Contact Manager database (including Lynn)!`, 'success');
        } else {
            alert(`✅ Success! Loaded ${yourDatabaseContacts.length} contacts: ${yourDatabaseContacts.map(c => c.name).join(', ')}`);
        }
    }, 1000);
    
    return true;
}

// Make function globally available
window.loadYourDatabaseContacts = loadYourDatabaseContacts;
window.yourDatabaseContacts = yourDatabaseContacts;

// Auto-load your contacts IMMEDIATELY and with backup
console.log('🚀 IMMEDIATE Auto-loading your Contact Manager contacts...');
loadYourDatabaseContacts();

// Also load after delay as backup
setTimeout(() => {
    console.log('🚀 BACKUP Auto-loading your Contact Manager contacts...');
    loadYourDatabaseContacts();
}, 1000);

// And load when DOM is fully ready as triple backup
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🚀 DOM-READY Auto-loading your Contact Manager contacts...');
        loadYourDatabaseContacts();
    }, 500);
});

console.log('📊 Your Contact Manager integration loaded!');
console.log(`👥 Ready to load ${yourDatabaseContacts.length} contacts (including Lynn): ${yourDatabaseContacts.map(c => c.name).join(', ')}`);
console.log('💡 Run loadYourDatabaseContacts() to manually reload');