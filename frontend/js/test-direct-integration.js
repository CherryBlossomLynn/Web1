// Simple Test Script for Direct Database Integration
// Add this to browser console to test if the integration script is working

function testDirectIntegration() {
    console.log('🧪 Testing Direct Database Integration...');
    
    // Test 1: Check if script loaded
    console.log('1. Checking if script loaded...');
    if (typeof loadDatabaseContacts === 'function') {
        console.log('✅ loadDatabaseContacts function found');
    } else {
        console.log('❌ loadDatabaseContacts function NOT found');
        console.log('💡 The script may not have loaded properly');
        return false;
    }
    
    // Test 2: Check globalContacts
    console.log('2. Checking globalContacts...');
    if (typeof window.globalContacts !== 'undefined') {
        console.log(`✅ globalContacts exists with ${window.globalContacts.length} contacts`);
    } else {
        console.log('⚠️ globalContacts not initialized yet');
    }
    
    // Test 3: Check localStorage
    console.log('3. Checking localStorage...');
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        console.log(`✅ localStorage has ${contacts.length} contacts`);
    } else {
        console.log('⚠️ No contacts in localStorage');
    }
    
    // Test 4: Try to load database contacts
    console.log('4. Testing database contact loading...');
    try {
        const result = loadDatabaseContacts();
        if (result) {
            console.log('✅ Database contact loading worked');
        } else {
            console.log('⚠️ Database contacts not loaded (probably empty array)');
        }
    } catch (error) {
        console.log('❌ Error loading database contacts:', error);
    }
    
    console.log('🧪 Test completed!');
    return true;
}

// Make test available globally
window.testDirectIntegration = testDirectIntegration;

console.log('🧪 Test script loaded. Run testDirectIntegration() to verify setup.');