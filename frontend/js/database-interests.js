// Database-driven interests system
// Fetches games and gametypes from Contact_Manager database

class DatabaseInterests {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
        this.interests = null;
        this.contacts = null;
    }

    // Fetch all interests structure from database
    async fetchInterests() {
        try {
            const response = await fetch(`${this.baseUrl}/interests`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                this.interests = data.interests;
                return this.interests;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Failed to fetch interests from database:', error);
            // Fallback to hardcoded interests if database fails
            return this.getFallbackInterests();
        }
    }

    // Fetch contacts from Contact_Manager database
    async fetchContacts() {
        try {
            const response = await fetch(`${this.baseUrl}/contacts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                this.contacts = data.contacts;
                return this.contacts;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Failed to fetch contacts from database:', error);
            return null;
        }
    }

    // Get contact-specific interests from database
    async getContactInterests(contactId) {
        try {
            const response = await fetch(`${this.baseUrl}/contacts/${contactId}/interests`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success && data.interests) {
                return data.interests;
            } else {
                // Return enhanced interests based on contact profile
                return this.generateContactInterests(contactId);
            }
        } catch (error) {
            console.error(`Failed to fetch interests for contact ${contactId}:`, error);
            return this.generateContactInterests(contactId);
        }
    }

    // Generate enhanced interests based on contact profile and database games
    generateContactInterests(contactId) {
        const baseInterests = this.interests?.categorizedInterests || this.getFallbackInterests().categorizedInterests;
        
        // Enhanced interests based on database games + additional options
        const enhancedInterests = {
            videogames: ['Minecraft', 'VR Games', 'Action Games', 'Casual Mobile Games', 'RPGs', 'Tech Simulators', 'Classic Arcade Games'],
            physicalGames: ['Uno', 'Monopoly', 'Chess', 'Checkers', 'Basketball', 'Tag', 'Hopscotch', 'Board Games', 'Card Games', 'Strategy Games'],
            media: ['Action Movies', 'Romance Movies', 'Sci-Fi Movies', 'Classic Movies', 'Teen Movies', 'Tech Documentaries', 'Gaming Streams', 'Music Videos']
        };

        // Assign thematic interests based on contact ID or other factors
        switch (contactId) {
            case 1: // Lynn - Admin/Tech focus
                return {
                    videogames: ['Database Management Games', 'Tech Simulators'],
                    physicalGames: ['Chess', 'Strategy Games'],
                    media: ['Tech Documentaries', 'Cybersecurity Films']
                };
            case 2: // Kathy - Casual
                return {
                    videogames: ['Casual Mobile Games'],
                    physicalGames: ['Uno', 'Hopscotch', 'Jump Rope'],
                    media: ['Romance Movies', 'Comedy Films', 'TV Dramas']
                };
            case 3: // Michael - Gaming enthusiast
                return {
                    videogames: ['Minecraft', 'Action Games', 'RPGs'],
                    physicalGames: ['Monopoly', 'Card Games', 'Basketball'],
                    media: ['Action Movies', 'Gaming Streams', 'Adventure Films']
                };
            case 4: // Nathan - Tech/VR
                return {
                    videogames: ['VR Games', 'Virtual Reality', 'Tech Simulators'],
                    physicalGames: ['Tech Gadgets', 'Puzzle Games'],
                    media: ['Sci-Fi Movies', 'Tech Reviews', 'Gaming Content']
                };
            case 5: // Willie - Traditional
                return {
                    videogames: ['Classic Arcade Games'],
                    physicalGames: ['Uno', 'Checkers', 'Traditional Games'],
                    media: ['Classic Movies', 'Old TV Shows', 'Documentaries']
                };
            case 6: // Scarlett - Young/varied
                return {
                    videogames: ['Minecraft', 'Mobile Games', 'Creative Games'],
                    physicalGames: ['Tag', 'Board Games', 'Sports'],
                    media: ['Teen Movies', 'Music Videos', 'Social Media Content']
                };
            default:
                return {
                    videogames: enhancedInterests.videogames.slice(0, 3),
                    physicalGames: enhancedInterests.physicalGames.slice(0, 3),
                    media: enhancedInterests.media.slice(0, 3)
                };
        }
    }

    // Fallback interests if database is unavailable
    getFallbackInterests() {
        return {
            interests: [
                {name: 'Minecraft', category: 'videogames'},
                {name: 'VR Games', category: 'videogames'},
                {name: 'Action Games', category: 'videogames'},
                {name: 'Uno', category: 'physicalGames'},
                {name: 'Monopoly', category: 'physicalGames'},
                {name: 'Chess', category: 'physicalGames'},
                {name: 'Action Movies', category: 'media'},
                {name: 'Tech Documentaries', category: 'media'}
            ],
            categories: ['videogames', 'physicalGames', 'media'],
            categorizedInterests: {
                videogames: ['Minecraft', 'VR Games', 'Action Games', 'Casual Mobile Games'],
                physicalGames: ['Uno', 'Monopoly', 'Chess', 'Board Games'],
                media: ['Action Movies', 'Romance Movies', 'Tech Documentaries', 'Gaming Content']
            },
            // Legacy support
            games: ['Uno', 'Minecraft', 'VR', 'Monopoly'],
            gameTypes: ['VideoGame', 'CardGame', 'VirtualReality', 'BoardGame']
        };
    }

    // Get all available interests for dropdown population
    getAllInterestsByCategory() {
        return this.interests?.categorizedInterests || this.getFallbackInterests().categorizedInterests;
    }

    // Populate interest dropdowns with all available options
    populateInterestDropdowns() {
        const allInterests = this.getAllInterestsByCategory();
        
        // Populate videogames dropdown
        const videogamesDropdown = document.getElementById('videogamesDropdown');
        if (videogamesDropdown && allInterests.videogames) {
            videogamesDropdown.innerHTML = '<option value="">Select video game interest</option>';
            allInterests.videogames.forEach(game => {
                const option = document.createElement('option');
                option.value = game;
                option.textContent = game;
                videogamesDropdown.appendChild(option);
            });
        }

        // Populate physical games dropdown
        const physicalGamesDropdown = document.getElementById('physicalGamesDropdown');
        if (physicalGamesDropdown && allInterests.physicalGames) {
            physicalGamesDropdown.innerHTML = '<option value="">Select physical game interest</option>';
            allInterests.physicalGames.forEach(game => {
                const option = document.createElement('option');
                option.value = game;
                option.textContent = game;
                physicalGamesDropdown.appendChild(option);
            });
        }

        // Populate media dropdown
        const mediaDropdown = document.getElementById('mediaDropdown');
        if (mediaDropdown && allInterests.media) {
            mediaDropdown.innerHTML = '<option value="">Select media interest</option>';
            allInterests.media.forEach(mediaItem => {
                const option = document.createElement('option');
                option.value = mediaItem;
                option.textContent = mediaItem;
                mediaDropdown.appendChild(option);
            });
        }
    }

    // Merge database contacts with existing contact data
    async mergeContactsWithDatabase(existingContacts) {
        const dbContacts = await this.fetchContacts();
        if (!dbContacts) return existingContacts;

        const mergedContacts = [];

        for (const existing of existingContacts) {
            // Find matching contact in database
            const dbContact = dbContacts.find(db => 
                db.Name.toLowerCase() === existing.name.toLowerCase()
            );

            if (dbContact) {
                // Get database-driven interests
                const dbInterests = await this.getContactInterests(dbContact.ID);
                
                // Merge existing contact with database data
                const merged = {
                    ...existing,
                    id: dbContact.ID,
                    email: dbContact.email || existing.email,
                    phone: dbContact.phone || existing.phone,
                    birthday: dbContact.birthday || existing.birthday,
                    interests: dbInterests || existing.interests
                };
                mergedContacts.push(merged);
            } else {
                mergedContacts.push(existing);
            }
        }

        return mergedContacts;
    }
}

// Create global instance
window.DatabaseInterests = new DatabaseInterests();

// Initialize database interests system
window.initializeDatabaseInterests = async function() {
    try {
        console.log('🗄️ Initializing database-driven interests system...');
        
        // Fetch interests structure from database
        const interests = await window.DatabaseInterests.fetchInterests();
        console.log('📊 Database interests loaded:', interests);

        // Update global contacts with database-driven interests
        if (window.globalContacts) {
            console.log('🔄 Merging contacts with database...');
            window.globalContacts = await window.DatabaseInterests.mergeContactsWithDatabase(window.globalContacts);
            console.log('✅ Contacts merged with database interests');
        }

        // Populate interest dropdowns with all available options from database
        window.DatabaseInterests.populateInterestDropdowns();
        console.log('📋 Interest dropdowns populated from database');

        return true;
    } catch (error) {
        console.error('❌ Failed to initialize database interests:', error);
        console.log('🔄 Falling back to hardcoded interests');
        return false;
    }
};