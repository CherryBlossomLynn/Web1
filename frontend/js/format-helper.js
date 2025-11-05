// Helper Script: Format Database Contacts
// Use this to help format your phpMyAdmin export results

function formatDatabaseResults(rawResults) {
    // If you copied the results from phpMyAdmin as text, this will help format them
    const lines = rawResults.split('\n');
    const contacts = [];
    
    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('{') && line.endsWith(',')) {
            // Remove the trailing comma and add to array
            contacts.push(line.slice(0, -1));
        }
    });
    
    return '[\n    ' + contacts.join(',\n    ') + '\n]';
}

// Example usage:
// 1. Copy all results from phpMyAdmin javascript_contact column
// 2. Paste them as a string in the console like this:
// const rawData = `{id: 1, name: "John", ...},
// {id: 2, name: "Jane", ...},`;
// 3. Run: console.log(formatDatabaseResults(rawData));
// 4. Copy the formatted result to your JavaScript file

window.formatDatabaseResults = formatDatabaseResults;

console.log('🛠️ Database formatting helper loaded');
console.log('💡 Use formatDatabaseResults(yourCopiedText) to format phpMyAdmin results');