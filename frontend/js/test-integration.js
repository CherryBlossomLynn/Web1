// Test Database Integration
// Run this in browser console to test the database connection

async function testDatabaseIntegration() {
    console.log('🧪 Testing Contact_Manager database integration...');
    
    // Test 1: API Health Check
    try {
        const healthResponse = await fetch('http://localhost:3000/api/health');
        if (healthResponse.ok) {
            const health = await healthResponse.json();
            console.log('✅ API Server Health:', health);
        } else {
            console.log('❌ API Server not responding');
            return false;
        }
    } catch (error) {
        console.log('❌ API Server connection failed:', error.message);
        return false;
    }
    
    // Test 2: Fetch Contacts
    try {
        const contactsResponse = await fetch('http://localhost:3000/api/contacts');
        if (contactsResponse.ok) {
            const contacts = await contactsResponse.json();
            console.log(`✅ Database contains ${contacts.length} contacts:`, contacts);
            
            if (contacts.length > 0) {
                console.log('📋 Sample contact:', contacts[0]);
            }
        } else {
            console.log('❌ Failed to fetch contacts from database');
            return false;
        }
    } catch (error) {
        console.log('❌ Contact fetch failed:', error.message);
        return false;
    }
    
    // Test 3: Check if frontend integration is working
    if (typeof window.globalContacts !== 'undefined') {
        console.log(`✅ Frontend has ${window.globalContacts.length} contacts loaded`);
        
        if (window.globalContacts.length > 0) {
            console.log('📋 Sample frontend contact:', window.globalContacts[0]);
        }
    } else {
        console.log('⚠️ Frontend globalContacts not initialized yet');
    }
    
    // Test 4: Test contact replacement function
    if (typeof window.replaceFrontendContacts === 'function') {
        console.log('✅ Contact replacement function available');
        
        console.log('🔄 Testing contact replacement...');
        const success = await window.replaceFrontendContacts();
        
        if (success) {
            console.log('✅ Contact replacement successful!');
        } else {
            console.log('❌ Contact replacement failed');
        }
    } else {
        console.log('❌ Contact replacement function not available');
    }
    
    console.log('🧪 Database integration test completed!');
    return true;
}

// Make test function globally available
window.testDatabaseIntegration = testDatabaseIntegration;

console.log('🧪 Database integration test loaded. Run testDatabaseIntegration() to test.');