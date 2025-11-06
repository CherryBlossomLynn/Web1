// Enhanced Database Website JavaScript
console.log('🚀 SCRIPT LOADING - JavaScript file is being executed at:', new Date().toLocaleTimeString());

// FORCE SET YOUR CONTACT MANAGER CONTACTS FIRST - BEFORE ANYTHING ELSE
window.globalContacts = [
    // Keep Lynn as requested
    { id: 1, name: 'Lynn Davis', role: 'Administrator', status: 'online', favorite: true, lastViewed: Date.now() - 7200000, email: 'lynn@lynnsdatabase.local', phone: '+1 (555) 123-4567', birthday: '1988-11-04', bio: 'Database Administrator with over 8 years of experience in managing enterprise-level database systems. Specializes in MySQL, PostgreSQL, and data security protocols.', interests: { videogames: ['Database Management Games'], physicalGames: ['Chess', 'Strategy Board Games'], media: ['Tech Documentaries', 'Cybersecurity Films'] } },
    // Your real contacts from Contact Manager database with interests based on games/gametypes tables
    { id: 2, name: 'Kathy', role: 'User', status: 'offline', favorite: false, lastViewed: Date.now() - 86400000, email: '', phone: '', birthday: '', bio: 'Contact from your Contact Manager database. Enjoys card games and movies.', interests: { videogames: ['Casual Mobile Games'], physicalGames: ['Uno', 'Hopscotch', 'Jump Rope'], media: ['Romance Movies', 'Comedy Films', 'TV Dramas'] } },
    { id: 3, name: 'Michael', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 3600000, email: '', phone: '4694266925', birthday: '', bio: 'Contact from your Contact Manager database. Gaming enthusiast and movie lover.', interests: { videogames: ['Minecraft', 'Action Games', 'RPGs'], physicalGames: ['Monopoly', 'Card Games', 'Basketball'], media: ['Action Movies', 'Gaming Streams', 'Adventure Films'] } },
    { id: 4, name: 'Nathan', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 7200000, email: 'NathanLorenzen1@gmail.com', phone: '8649154169', birthday: '2000-06-07', bio: 'Contact from your Contact Manager database. Tech-savvy gamer born in 2000.', interests: { videogames: ['VR Games', 'Virtual Reality', 'Tech Simulators'], physicalGames: ['Tech Gadgets', 'Puzzle Games'], media: ['Sci-Fi Movies', 'Tech Reviews', 'Gaming Content'] } },
    { id: 5, name: 'Willie', role: 'User', status: 'away', favorite: false, lastViewed: Date.now() - 43200000, email: 'atuasmedium@gmail.com', phone: '', birthday: '1999-11-29', bio: 'Contact from your Contact Manager database. Enjoys traditional games and entertainment.', interests: { videogames: ['Classic Arcade Games'], physicalGames: ['Uno', 'Checkers', 'Traditional Games'], media: ['Classic Movies', 'Old TV Shows', 'Documentaries'] } },
    { id: 6, name: 'Scarlett', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 1800000, email: 'Scarlettfromash@gmail.com', phone: '9124679551', birthday: '2007-05-16', bio: 'Contact from your Contact Manager database. Young gamer who loves variety.', interests: { videogames: ['Minecraft', 'Mobile Games', 'Creative Games'], physicalGames: ['Tag', 'Board Games', 'Sports'], media: ['Teen Movies', 'Music Videos', 'Social Media Content'] } }
];

// IMMEDIATELY set window.contacts to point to globalContacts
window.contacts = window.globalContacts;

console.log('🚀 Contacts initialized:', window.contacts.length, 'contacts loaded');

// IMMEDIATE TEST FUNCTIONS - Available right away
window.simpleTest = function() {
    alert('Simple test works! JavaScript is functional.');
};

window.simpleBrowseTest = function() {
    console.log('Testing simple browse...');
    const mainPage = document.getElementById('mainPage');
    const browsePage = document.getElementById('browseAllPage');
    
    if (mainPage && browsePage) {
        mainPage.style.display = 'none';
        browsePage.style.display = 'block';
        alert('Page switch successful!');
    } else {
        alert('Pages not found. Main: ' + !!mainPage + ', Browse: ' + !!browsePage);
    }
};

window.simpleBackTest = function() {
    console.log('Testing simple back...');
    const mainPage = document.getElementById('mainPage');
    const browsePage = document.getElementById('browseAllPage');
    
    if (mainPage && browsePage) {
        browsePage.style.display = 'none';
        mainPage.style.display = 'block';
        alert('Back button test successful!');
    } else {
        alert('Pages not found for back. Main: ' + !!mainPage + ', Browse: ' + !!browsePage);
    }
};



// Browse All Page Function
window.showBrowseAllPage = function() {
    console.log('🚀 showBrowseAllPage called');
    
    const mainPage = document.getElementById('mainPage');
    const browseAllPage = document.getElementById('browseAllPage');
    const addContactPage = document.getElementById('addContactPage');
    const accountPage = document.getElementById('accountPage');
    
    // Hide all other pages
    if (mainPage) mainPage.style.display = 'none';
    if (addContactPage) addContactPage.style.display = 'none';
    if (accountPage) accountPage.style.display = 'none';
    
    // Show browse page
    if (browseAllPage) {
        browseAllPage.style.display = 'block';
        console.log('✅ Browse All page shown');
        
        // Load the contacts
        setTimeout(loadAllContacts, 100);
    } else {
        console.error('❌ Browse All page element not found');
    }
};

// Load All Contacts Function
function loadAllContacts() {
    console.log('📂 Loading user\'s added contacts...');
    
    const browseGrid = document.getElementById('browseContactsGrid');
    const browseLoading = document.getElementById('browseLoading');
    const browseEmpty = document.getElementById('browseEmpty');
    const contactsCount = document.getElementById('browseContactsCount');
    
    // Show loading
    if (browseLoading) browseLoading.style.display = 'block';
    if (browseGrid) browseGrid.style.display = 'none';
    if (browseEmpty) browseEmpty.style.display = 'none';
    
    // Load user's added contacts from favorites
    setTimeout(() => {
        let myContacts = [];
        
        try {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            myContacts = favorites;
            console.log('👥 User contacts loaded:', myContacts.length, myContacts);
        } catch (error) {
            console.error('❌ Error loading user contacts:', error);
        }
        
        if (browseLoading) browseLoading.style.display = 'none';
        
        if (myContacts.length === 0) {
            console.log('⚠️ No added contacts found');
            if (browseEmpty) browseEmpty.style.display = 'block';
            if (contactsCount) contactsCount.textContent = 'No contacts in your list';
            return;
        }
        
        console.log(`✅ Rendering ${myContacts.length} user contacts`);
        if (contactsCount) contactsCount.textContent = `${myContacts.length} contact${myContacts.length !== 1 ? 's' : ''} in your list`;
        if (browseGrid) browseGrid.style.display = 'grid';
        
        renderBrowseContacts(myContacts);
    }, 500);
}

// Render Browse Contacts Function
function renderBrowseContacts(contacts) {
    const browseGrid = document.getElementById('browseContactsGrid');
    
    if (!browseGrid) return;
    
    const contactsHTML = contacts.map(contact => {
        const statusClass = (contact.status || 'offline').toLowerCase();
        
        return `
            <div class="contact-card" data-contact-id="${contact.id}">
                <div class="contact-avatar">
                    <img src="${contact.avatar || 'images/default-avatar.png'}" 
                         alt="${contact.name}" 
                         onerror="this.src='images/default-avatar.png'">
                    <div class="status-indicator status-${statusClass}"></div>
                </div>
                
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p class="contact-role">${contact.role || 'User'}</p>
                    <p class="contact-status">${contact.status || 'Offline'}</p>
                </div>
                
                <div class="contact-actions">
                    <button class="action-btn remove" 
                            onclick="removeFromFavorites('${contact.id}'); setTimeout(loadAllContacts, 100);" 
                            title="Remove Contact">
                        <i class="fas fa-trash"></i>
                        Remove
                    </button>
                    <button class="action-btn view" 
                            onclick="viewContactDetails('${contact.id}')" 
                            title="View Details">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    browseGrid.innerHTML = contactsHTML;
}

// ESSENTIAL: Define toggleFavorite function IMMEDIATELY for HTML onclick handlers
window.toggleFavorite = function(contactId) {
    console.log('🌟 toggleFavorite called for ID:', contactId);
    
    // Debug: Check if window.contacts exists
    if (!window.contacts) {
        console.error('❌ window.contacts is not defined!');
        return;
    }
    
    const contact = window.contacts.find(c => c.id == contactId);
    
    if (contact) {
        console.log('📞 Found contact:', contact.name, 'current favorite:', contact.favorite);
        
        // Toggle favorite status
        contact.favorite = !contact.favorite;
        console.log('🔄 New favorite status:', contact.favorite);
        
        // Save to localStorage immediately
        const favorites = {};
        window.contacts.forEach(c => {
            if (c.favorite) favorites[c.id] = true;
        });
        localStorage.setItem('contactFavorites', JSON.stringify(favorites));
        console.log('💾 Saved favorites to localStorage');
        
        // Update the existing HTML cards immediately
        const contactCard = document.querySelector(`[data-contact-id="${contact.id}"]`);
        if (contactCard) {
            console.log(`🔄 Updating card for ${contact.name} - favorite: ${contact.favorite}`);
            
            // Show/hide based on favorite status - FAVORITES SHOULD BE VISIBLE
            if (contact.favorite) {
                contactCard.style.display = 'flex';
                console.log(`✅ Showing favorite: ${contact.name}`);
            } else {
                contactCard.style.display = 'none';
                console.log(`❌ Hiding non-favorite: ${contact.name}`);
            }
            
            // Update favorite button appearance
            const favoriteBtn = contactCard.querySelector('.favorite-btn');
            const favoriteIcon = favoriteBtn?.querySelector('i');
            
            if (favoriteBtn && favoriteIcon) {
                if (contact.favorite) {
                    favoriteBtn.classList.add('active');
                    favoriteBtn.setAttribute('title', 'Remove from Favorites');
                    favoriteIcon.className = 'fas fa-star';
                    console.log(`⭐ Updated star to filled for ${contact.name}`);
                } else {
                    favoriteBtn.classList.remove('active');
                    favoriteBtn.setAttribute('title', 'Add to Favorites');
                    favoriteIcon.className = 'far fa-star';
                    console.log(`☆ Updated star to empty for ${contact.name}`);
                }
            }
        } else {
            console.error(`❌ No HTML card found for contact ID: ${contact.id}`);
        }
        
        console.log(`${contact.name} ${contact.favorite ? 'added to' : 'removed from'} favorites`);
        console.log('✅ toggleFavorite completed successfully');
    } else {
        console.error('❌ Contact not found for ID:', contactId);
        console.log('Available contacts:', window.contacts.map(c => `${c.id}: ${c.name}`));
    }
};

console.log('⭐ toggleFavorite function defined and ready');

// Load favorites from localStorage on startup
function loadFavoritesOnStartup() {
    const savedFavorites = localStorage.getItem('contactFavorites');
    if (savedFavorites) {
        try {
            const favorites = JSON.parse(savedFavorites);
            console.log('📋 Loading favorites from localStorage:', favorites);
            window.contacts.forEach(contact => {
                contact.favorite = favorites[contact.id] || false;
                console.log(`📞 ${contact.name} favorite: ${contact.favorite}`);
            });
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    } else {
        console.log('📋 No saved favorites found, using defaults (Lynn Davis should be favorite)');
        // Make sure defaults are preserved (Lynn Davis is favorite by default)
        window.contacts.forEach(contact => {
            console.log(`📞 Default: ${contact.name} favorite: ${contact.favorite}`);
        });
    }
    
    // Count current favorites
    const currentFavorites = window.contacts.filter(c => c.favorite);
    console.log(`⭐ Current favorites: ${currentFavorites.map(c => c.name).join(', ')}`);
}

// Load favorites immediately
loadFavoritesOnStartup();

// Initialize the HTML cards when DOM is ready
function initializeFavoriteCards() {
    console.log('🎨 Initializing favorite cards...');
    let favoritesCount = 0;
    
    window.contacts.forEach(contact => {
        const contactCard = document.querySelector(`[data-contact-id="${contact.id}"]`);
        if (contactCard) {
            console.log(`📋 Processing ${contact.name} (ID: ${contact.id}) - favorite: ${contact.favorite}`);
            
            // Show/hide based on favorite status - FAVORITES SHOULD BE VISIBLE
            if (contact.favorite) {
                contactCard.style.display = 'flex';
                favoritesCount++;
                console.log(`✅ Showing favorite: ${contact.name}`);
            } else {
                contactCard.style.display = 'none';
                console.log(`❌ Hiding non-favorite: ${contact.name}`);
            }
            
            // Update favorite button appearance
            const favoriteBtn = contactCard.querySelector('.favorite-btn');
            const favoriteIcon = favoriteBtn?.querySelector('i');
            
            if (favoriteBtn && favoriteIcon) {
                if (contact.favorite) {
                    favoriteBtn.classList.add('active');
                    favoriteBtn.setAttribute('title', 'Remove from Favorites');
                    favoriteIcon.className = 'fas fa-star';
                } else {
                    favoriteBtn.classList.remove('active');
                    favoriteBtn.setAttribute('title', 'Add to Favorites');
                    favoriteIcon.className = 'far fa-star';
                }
            }
        } else {
            console.error(`❌ No HTML card found for contact ID: ${contact.id}`);
        }
    });
    
    console.log(`🎨 Initialization complete: ${favoritesCount} favorites shown`);
    
    // If no favorites, show a message
    if (favoritesCount === 0) {
        console.log('⚠️ No favorites found - all contacts hidden');
    }
}

// When DOM loads, initialize the cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 DOM loaded, initializing favorite cards...');
    initializeFavoriteCards();
});

console.log('🎯 FORCE LOADED YOUR CONTACTS:', window.globalContacts.map(c => c.name).join(', '));

// Clear any cached contacts from localStorage to force fresh load
localStorage.removeItem('contacts');
localStorage.setItem('contacts', JSON.stringify(window.globalContacts));
console.log('🗑️ Cleared old localStorage and set new contacts');

// EMERGENCY FUNCTION - Call this manually if contacts don't show
window.forceRefreshContacts = function() {
    console.log('🚨 EMERGENCY CONTACT REFRESH');
    window.globalContacts = [
        { id: 1, name: 'Lynn Davis', role: 'Administrator', status: 'online', favorite: true, lastViewed: Date.now() - 7200000, email: 'lynn@lynnsdatabase.local', phone: '+1 (555) 123-4567', birthday: '1988-11-04', bio: 'Database Administrator with over 8 years of experience in managing enterprise-level database systems. Specializes in MySQL, PostgreSQL, and data security protocols.', interests: { videogames: ['Database Management Games'], physicalGames: ['Chess', 'Strategy Board Games'], media: ['Tech Documentaries', 'Cybersecurity Films'] } },
        { id: 2, name: 'Kathy', role: 'User', status: 'offline', favorite: false, lastViewed: Date.now() - 86400000, email: '', phone: '', birthday: '', bio: 'Contact from your Contact Manager database. Enjoys card games and movies.', interests: { videogames: ['Casual Mobile Games'], physicalGames: ['Uno', 'Hopscotch', 'Jump Rope'], media: ['Romance Movies', 'Comedy Films', 'TV Dramas'] } },
        { id: 3, name: 'Michael', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 3600000, email: '', phone: '4694266925', birthday: '', bio: 'Contact from your Contact Manager database. Gaming enthusiast and movie lover.', interests: { videogames: ['Minecraft', 'Action Games', 'RPGs'], physicalGames: ['Monopoly', 'Card Games', 'Basketball'], media: ['Action Movies', 'Gaming Streams', 'Adventure Films'] } },
        { id: 4, name: 'Nathan', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 7200000, email: 'NathanLorenzen1@gmail.com', phone: '8649154169', birthday: '2000-06-07', bio: 'Contact from your Contact Manager database. Tech-savvy gamer born in 2000.', interests: { videogames: ['VR Games', 'Virtual Reality', 'Tech Simulators'], physicalGames: ['Tech Gadgets', 'Puzzle Games'], media: ['Sci-Fi Movies', 'Tech Reviews', 'Gaming Content'] } },
        { id: 5, name: 'Willie', role: 'User', status: 'away', favorite: false, lastViewed: Date.now() - 43200000, email: 'atuasmedium@gmail.com', phone: '', birthday: '1999-11-29', bio: 'Contact from your Contact Manager database. Enjoys traditional games and entertainment.', interests: { videogames: ['Classic Arcade Games'], physicalGames: ['Uno', 'Checkers', 'Traditional Games'], media: ['Classic Movies', 'Old TV Shows', 'Documentaries'] } },
        { id: 6, name: 'Scarlett', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 1800000, email: 'Scarlettfromash@gmail.com', phone: '9124679551', birthday: '2007-05-16', bio: 'Contact from your Contact Manager database. Young gamer who loves variety.', interests: { videogames: ['Minecraft', 'Mobile Games', 'Creative Games'], physicalGames: ['Tag', 'Board Games', 'Sports'], media: ['Teen Movies', 'Music Videos', 'Social Media Content'] } }
    ];
    localStorage.setItem('contacts', JSON.stringify(window.globalContacts));
    console.log('🔄 Forced refresh complete. Contacts:', window.globalContacts.map(c => c.name));
    if (typeof window.updateContactsDisplay === 'function') {
        window.updateContactsDisplay();
    }
};

// IMMEDIATE TEST - Define test function right away
console.log('🔥 SCRIPT LOADING - IMMEDIATE TEST');
window.immediateTest = function() {
    alert('IMMEDIATE TEST WORKS!');
    console.log('✅ Immediate test function executed');
};
console.log('✅ Immediate test function defined');

// DEFINE LOGOUT FUNCTION IMMEDIATELY - Outside of any complex scoping
console.log('🔥 DEFINING LOGOUT FUNCTION');
window.handleLogout = function() {
    console.log('🚪 handleLogout function called');
    
    // Clear localStorage and reload
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    location.reload();
};
console.log('✅ handleLogout function defined');

// Also create backup name
window.logout = window.handleLogout;
console.log('✅ logout alias created');

document.addEventListener('DOMContentLoaded', async function () {
    // Initialize database-driven interests system first
    console.log('🚀 Starting application initialization...');
    
    // Try to initialize database interests
    if (window.initializeDatabaseInterests) {
        await window.initializeDatabaseInterests();
    }
    
    // Login System
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');

    // Valid credentials - Multiple users supported
    const validUsers = {
        'lynn': 'Lynn@1104',
        'michael': 'database2025'
    };

    // Mock database
    let database = [
        { id: 1, name: 'Lynn', type: 'Admin', data: 'Database Administrator' },
        { id: 2, name: 'Michael', type: 'User', data: 'Regular User' },

    ];

    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    console.log('🔐 Authentication check:', { isLoggedIn, currentUser });
    
    if (isLoggedIn) {
        console.log('✅ User is logged in, showing main content');
        showMainContent();
    } else {
        console.log('❌ User not logged in, showing login page');
    }
    
    // Force load contacts if main content is already visible after a delay
    setTimeout(() => {
        const mainContentDiv = document.getElementById('mainContent');
        if (mainContentDiv && mainContentDiv.style.display !== 'none') {
            console.log("🔄 Main content visible, initializing contacts");
            // Initialize contacts first, then call the display functions
            initializeMainPage();
        }
    }, 500);

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.toLowerCase().trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');

            // Input validation
            if (!username || !password) {
                showErrorMessage('Please fill in all fields.');
                return;
            }

            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;

            // Simulate network delay for better UX
            setTimeout(() => {
                if (validUsers[username] && validUsers[username] === password) {
                    // Successful login
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('loginTime', Date.now().toString());
                    showSuccessMessage(username);
                    setTimeout(() => {
                        loginBtn.classList.remove('loading');
                        showMainContent();
                    }, 1500);
                } else {
                    // Failed login
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;
                    showErrorMessage('Invalid username or password.');
                }
            }, 800); // Simulate processing time
        });
    }

    function showMainContent() {
        if (loginSection) loginSection.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';

        // Show current user in welcome message and load profile
        const currentUser = localStorage.getItem('currentUser');
        const userNameElement = document.getElementById('currentUserName');
        if (currentUser && userNameElement) {
            const capitalizedName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
            userNameElement.textContent = capitalizedName;
            loadUserProfile(currentUser);
        }

        initializeMainPage();
        
        // Add a small delay to ensure DOM is fully rendered
        setTimeout(() => {
            initializeAccountFeatures();
        }, 100);
        
        updateMessageBadge();
        
        // Immediately load and display contacts
        console.log("🔄 Loading contacts from showMainContent");
        updateContactsDisplay();
        updateRecentContacts();
    }

    function loadUserProfile(username) {
        // User profile data
        const userProfiles = {
            'lynn': {
                name: 'Lynn Wise',
                role: 'Database Administrator',
                email: 'lynn@lynnsdatabase.local',
                location: 'San Francisco, CA',
                lastLogin: new Date().toLocaleDateString(),
                avatar: 'fas fa-user-tie'
            },
            'michael': {
                name: 'Michael',
                role: 'Regular User',
                email: 'michael@lynnsdatabase.local',
                location: 'New York, NY',
                lastLogin: new Date().toLocaleDateString(),
                avatar: 'fas fa-user'
            }
        };

        const profile = userProfiles[username] || {
            name: username.charAt(0).toUpperCase() + username.slice(1),
            role: 'User',
            email: `${username}@lynnsdatabase.local`,
            location: 'Location not set',
            lastLogin: new Date().toLocaleDateString(),
            avatar: 'fas fa-user-circle'
        };

        // Update profile elements
        const profileName = document.getElementById('profileName');
        const profileRole = document.getElementById('profileRole');
        const profileEmail = document.getElementById('profileEmail');
        const profileLocation = document.getElementById('profileLocation');
        const lastLogin = document.getElementById('lastLogin');
        const profileAvatar = document.getElementById('mainProfileAvatar');

        if (profileName) profileName.textContent = profile.name;
        if (profileRole) profileRole.textContent = profile.role;
        if (profileEmail) profileEmail.textContent = profile.email;
        if (profileLocation) profileLocation.textContent = profile.location || 'Location not set';
        if (lastLogin) lastLogin.textContent = profile.lastLogin;
        if (profileAvatar) profileAvatar.className = profile.avatar;
    }

    function initializeAccountFeatures() {
        console.log('initializeAccountFeatures() called');
        
        // Try multiple ways to find the logout button
        let logoutBtn = document.getElementById('logoutBtn');
        if (!logoutBtn) {
            logoutBtn = document.querySelector('#logoutBtn');
        }
        if (!logoutBtn) {
            logoutBtn = document.querySelector('.logout-btn');
        }
        
        console.log('Logout button element:', logoutBtn);
        console.log('All elements with logout class:', document.querySelectorAll('.logout-btn'));
        
        if (logoutBtn) {
            console.log('Logout button found and event listener added');
            logoutBtn.addEventListener('click', function (e) {
                console.log('Logout button clicked!');
                e.preventDefault();
                
                // Call backend logout endpoint to destroy session
                fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Include cookies for session
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Logout response:', data);
                    if (data.success) {
                        // Clear local storage
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('currentUser');
                        
                        // Show logout notification
                        showNotification('Logged out successfully', 'success');
                        
                        // Reload page after a brief delay to show notification
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        showNotification('Logout failed: ' + data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Logout error:', error);
                    // Even if backend fails, clear local data and reload
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    showNotification('Logged out (connection error)', 'warning');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                });
            });
        } else {
            console.log('Logout button not found!');
        }

        // Also try to add event listener using a different approach
        document.addEventListener('click', function(e) {
            if (e.target && (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn'))) {
                console.log('Logout button clicked via event delegation!');
                e.preventDefault();
                handleLogout();
            }
        });

        // Edit Profile button - scroll to profile tab
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', function () {
                const profileTab = document.querySelector('[data-tab="profile"]');
                if (profileTab) {
                    profileTab.click();
                    showCustomizationTabs();
                }
            });
        }

        // Change Password button - scroll to security tab
        const changePasswordBtn = document.getElementById('changePasswordBtn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', function () {
                const securityTab = document.querySelector('[data-tab="security"]');
                if (securityTab) {
                    securityTab.click();
                    showCustomizationTabs();
                }
            });
        }

        // Update session time
        updateSessionTime();
    }

    function updateSessionTime() {
        const sessionTime = document.getElementById('sessionTime');
        if (sessionTime) {
            const loginTime = localStorage.getItem('loginTime') || Date.now();
            const currentTime = Date.now();
            const sessionDuration = Math.floor((currentTime - loginTime) / (1000 * 60)); // minutes

            if (sessionDuration < 1) {
                sessionTime.textContent = 'Session: Just logged in';
            } else if (sessionDuration < 60) {
                sessionTime.textContent = `Session: ${sessionDuration} min${sessionDuration > 1 ? 's' : ''}`;
            } else {
                const hours = Math.floor(sessionDuration / 60);
                sessionTime.textContent = `Session: ${hours} hour${hours > 1 ? 's' : ''}`;
            }
        }
    }

    function showSuccessMessage(username) {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
        loginBtn.innerHTML = `<i class="fas fa-check"></i> Welcome ${capitalizedName}!`;
        loginBtn.style.background = 'linear-gradient(45deg, #285ba7ff, #203cc9ff)';
        setTimeout(() => {
            loginBtn.innerHTML = originalText;
        }, 1500);
    }

    function showErrorMessage(message = 'Invalid credentials') {
        const loginContainer = document.querySelector('.login-container');
        const loginBtn = document.querySelector('.login-btn');
        const loginText = loginBtn.querySelector('.login-text');

        // Create error message element
        let errorMsg = document.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            loginContainer.appendChild(errorMsg);
        }

        // Show error message
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
        errorMsg.style.opacity = '1';

        // Shake animation
        loginContainer.style.animation = 'shake 0.5s ease-in-out';

        // Update button appearance
        if (loginText) {
            loginText.textContent = 'Try Again';
        }
        loginBtn.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';

        setTimeout(() => {
            if (loginText) {
                loginText.textContent = 'Login';
            }
            loginBtn.style.background = '';
            loginContainer.style.animation = '';

            // Fade out error message
            if (errorMsg) {
                errorMsg.style.opacity = '0';
                setTimeout(() => {
                    errorMsg.style.display = 'none';
                }, 300);
            }
        }, 3000);
    }

    function initializeFilterDropdown() {
        console.log('🔧 Initializing filter dropdown');
        
        // Add event listeners for dropdown buttons
        const applyBtn = document.getElementById('applyFiltersBtn');
        const clearBtn = document.getElementById('clearFiltersBtn');
        const filterBtn = document.getElementById('filterDropdownBtn');
        
        if (applyBtn) {
            applyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Apply filters button clicked');
                if (typeof window.applyFilters === 'function') {
                    window.applyFilters();
                }
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Clear filters button clicked');
                if (typeof window.clearFilters === 'function') {
                    window.clearFilters();
                }
            });
        }
        
        if (filterBtn) {
            filterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Filter dropdown button clicked');
                if (typeof window.toggleFilterDropdown === 'function') {
                    window.toggleFilterDropdown();
                }
            });
        }
        
        console.log('Filter dropdown initialized with buttons:', {
            applyBtn: !!applyBtn,
            clearBtn: !!clearBtn,
            filterBtn: !!filterBtn
        });
    }

    function initializeMainPage() {
        // Initialize page navigation
        initializePageNavigation();

        // Initialize contact search functionality
        initializeUserSearch();

        // Initialize contacts functionality
        initializeContacts();

        // Initialize filter dropdown functionality
        initializeFilterDropdown();

        // Initialize Browse All button
        initializeBrowseAllButton();
        
        // Debug: Check if Browse All page exists
        const browseAllPageDebug = document.getElementById('browseAllPage');
        console.log('🔍 Browse All Page exists:', !!browseAllPageDebug);
        if (browseAllPageDebug) {
            console.log('📄 Browse All Page HTML:', browseAllPageDebug.outerHTML.substring(0, 200) + '...');
        }
        
        // Add timestamp for cache debugging
        console.log('🕒 Script loaded at:', new Date().toLocaleTimeString());
        
        // Test global function availability
        console.log('🔍 Global functions available:');
        console.log('  - showBrowseAllPage:', typeof window.showBrowseAllPage);
        console.log('  - testBrowse:', typeof window.testBrowse);

        // Force contact display update after a short delay to ensure DOM is ready
        setTimeout(function() {
            if (typeof window.updateContactsDisplay === 'function') {
                console.log('Forcing contact display update...');
                window.updateContactsDisplay();
            }
        }, 500);

        // Initialize database stats
        updateDatabaseStats();

        // Set up periodic stats update
        setInterval(updateDatabaseStats, 30000); // Update every 30 seconds
        
        // Ensure Add Contact button works - Direct event listener as backup
        setTimeout(function() {
            const addContactBtn = document.getElementById('addContactBtn');
            if (addContactBtn && typeof window.addContact === 'function') {
                // Remove any existing listeners and add a direct one
                addContactBtn.onclick = function(e) {
                    e.preventDefault();
                    window.addContact();
                    return false;
                };
            }
        }, 100);
    }

    function initializePageNavigation() {
        const accountBtn = document.getElementById('accountBtn');
        const backToMainBtn = document.getElementById('backToMainBtn');
        const mainPage = document.getElementById('mainPage');
        const accountPage = document.getElementById('accountPage');

        if (accountBtn) {
            accountBtn.addEventListener('click', function () {
                mainPage.style.display = 'none';
                accountPage.style.display = 'block';
                loadUserProfile(localStorage.getItem('currentUser'));
                initializeAccountCustomization();
                announcePageChange('Account');
                setFocusToFirstElement(accountPage);
            });
        }

        const messagesBtn = document.getElementById('messagesBtn');
        if (messagesBtn) {
            messagesBtn.addEventListener('click', function () {
                showMessages();
            });
        }

        if (backToMainBtn) {
            backToMainBtn.addEventListener('click', function () {
                accountPage.style.display = 'none';
                mainPage.style.display = 'block';
                announcePageChange('Main');
                setFocusToFirstElement(mainPage);
            });
        }

        // Add Contact page navigation
        const backToMainFromAddContact = document.getElementById('backToMainFromAddContact');
        const addContactPage = document.getElementById('addContactPage');
        
        if (backToMainFromAddContact) {
            backToMainFromAddContact.addEventListener('click', function () {
                addContactPage.style.display = 'none';
                mainPage.style.display = 'block';
                announcePageChange('Main');
                setFocusToFirstElement(mainPage);
            });
        }
    }

    // Global Contacts Management System - Updated with Contact Manager Database
    // NOTE: globalContacts is now set at the very top of the file to ensure it loads first
    let globalContacts = window.globalContacts; // Use the already-set global contacts

    console.log('📋 Using pre-loaded globalContacts:', globalContacts.map(c => c.name).join(', '));

    // Global Contacts Manager
    window.ContactsManager = {
        // Add a new contact to the global list
        addContact: function(user) {
            // Check if contact already exists
            const existingContact = globalContacts.find(c => c.id === user.id);
            if (existingContact) {
                showNotification(`${user.name} is already in your contacts`);
                return false;
            }

            // Create new contact object
            const newContact = {
                id: user.id,
                name: user.name,
                role: user.role,
                status: user.status === 'Active' ? 'online' : 'offline',
                favorite: false,
                lastViewed: Date.now(),
                email: user.email,
                phone: user.phone || 'No phone available',
                birthday: user.birthday || null,
                department: user.department || 'Unknown',
                bio: user.bio || 'No bio available'
            };

            globalContacts.push(newContact);
            this.updateAllContactDisplays();
            showNotification(`${user.name} added to your contacts!`);
            return true;
        },

        // Remove a contact from the global list
        removeContact: function(contactId) {
            const index = globalContacts.findIndex(c => c.id === contactId);
            if (index > -1) {
                const contact = globalContacts[index];
                globalContacts.splice(index, 1);
                this.updateAllContactDisplays();
                showNotification(`${contact.name} removed from contacts`);
                return true;
            }
            return false;
        },

        // Get all contacts
        getAllContacts: function() {
            return [...globalContacts];
        },

        // Get contact by ID
        getContact: function(contactId) {
            return globalContacts.find(c => c.id == contactId);
        },

        // Update contact's favorite status
        toggleFavorite: function(contactId) {
            const contact = window.contacts.find(c => c.id == contactId);
            if (contact) {
                contact.favorite = !contact.favorite;
                saveFavorites();
                this.updateAllContactDisplays();
                showNotification(contact.favorite ? 'Added to favorites' : 'Removed from favorites');
                return contact.favorite;
            }
            return false;
        },

        // Update last viewed timestamp
        updateLastViewed: function(contactId) {
            const contact = globalContacts.find(c => c.id === contactId);
            if (contact) {
                contact.lastViewed = Date.now();
                this.updateAllContactDisplays();
            }
        },

        // Update all displays that show contacts
        updateAllContactDisplays: function() {
            if (typeof window.updateContactsDisplay === 'function') {
                window.updateContactsDisplay();
            }
            if (typeof window.updateContactSearchResults === 'function') {
                window.updateContactSearchResults();
            }
        }
    };

    function initializeContacts() {
        // Use global contacts instead of local array
        const contacts = globalContacts;
        
        // Track selected contacts for bulk operations
        let selectedContactIds = [];

        // Get recently viewed contacts (last 3)
        function getRecentContacts() {
            return globalContacts
                .sort((a, b) => b.lastViewed - a.lastViewed)
                .slice(0, 3);
        }

        // Format time ago
        function timeAgo(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (hours < 1) return 'Just now';
            if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            if (days === 1) return 'Yesterday';
            return `${days} days ago`;
        }

        // Update recent contacts display
        function updateRecentContacts() {
            const recentList = document.getElementById('recentContactsList');
            if (!recentList) return;

            const recentContacts = getRecentContacts();
            recentList.innerHTML = recentContacts.map(contact => `
                <div class="recent-contact-item" data-contact-id="${contact.id}">
                    <div class="recent-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="recent-info">
                        <span class="recent-name">${contact.name}</span>
                        <span class="recent-time">${timeAgo(contact.lastViewed)}</span>
                    </div>
                </div>
            `).join('');
        }

        // Make updateRecentContacts available globally immediately after definition
        window.updateRecentContacts = updateRecentContacts;

        // Toggle favorite status
        function toggleFavorite(contactId) {
            ContactsManager.toggleFavorite(contactId);
        }

        // Update contacts display
        function updateContactsDisplay() {
            console.log('🔍 updateContactsDisplay called');
            const favoritesGrid = document.getElementById('favoritesGrid');
            if (!favoritesGrid) {
                console.log('❌ favoritesGrid element not found');
                return;
            }
            
            // Use window.contacts which has the favorites system
            const contactsToUse = window.contacts || [];
            console.log('🎯 Using contacts:', contactsToUse.map(c => c.name));

            // Get only favorite contacts
            const favoriteContacts = contactsToUse.filter(contact => contact.favorite);
            console.log('⭐ Favorite contacts:', favoriteContacts.map(c => c.name));

            favoritesGrid.innerHTML = favoriteContacts.map(contact => `
                <div class="contact-card" data-contact-id="${contact.id}">
                    <div class="contact-checkbox">
                        <input type="checkbox" class="contact-select-checkbox" data-contact-id="${contact.id}" 
                               onchange="toggleContactSelection(${contact.id})">
                    </div>
                    <div class="contact-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="contact-info">
                        <h4>${contact.name}</h4>
                        <p class="contact-role">${contact.role}</p>
                        <p class="contact-status ${contact.status}">${contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</p>
                    </div>
                    <div class="contact-actions">
                        <button class="contact-btn view-btn" title="View Contact" onclick="viewContactProfile(${contact.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="contact-btn" title="Send Message" onclick="sendMessage(${contact.id})">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="contact-btn favorite-btn ${contact.favorite ? 'active' : ''}" 
                                title="${contact.favorite ? 'Remove from Favorites' : 'Add to Favorites'}"
                                onclick="toggleFavorite(${contact.id})">
                            <i class="${contact.favorite ? 'fas' : 'far'} fa-star"></i>
                        </button>
                        <button class="contact-btn remove-btn" title="Remove Contact" 
                                onclick="removeContact(${contact.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            updateRecentContacts();
        }

        // Functions will be made available globally at the end of initializeContacts
        console.log("🚀 Contact display functions defined");



        // Send message
        window.sendMessage = function(contactId) {
            const contact = ContactsManager.getContact(contactId);
            if (contact) {
                showNotification(`Opening message to ${contact.name}`);
                // Here you would typically open a message dialog
            }
        };

        // Remove contact
        window.removeContact = function(contactId) {
            const contact = ContactsManager.getContact(contactId);
            if (contact) {
                if (confirm(`Are you sure you want to remove ${contact.name} from your contacts?`)) {
                    ContactsManager.removeContact(contactId);
                }
            }
        };

        // Bulk management functions
        window.toggleContactSelection = function(contactId) {
            const checkbox = document.querySelector(`input[data-contact-id="${contactId}"]`);
            const contactCard = document.querySelector(`[data-contact-id="${contactId}"]`);
            
            if (checkbox.checked) {
                if (!selectedContactIds.includes(contactId)) {
                    selectedContactIds.push(contactId);
                    contactCard.classList.add('selected');
                }
            } else {
                selectedContactIds = selectedContactIds.filter(id => id !== contactId);
                contactCard.classList.remove('selected');
            }
            
            updateBulkActionsDisplay();
        };

        window.selectAllContacts = function() {
            const checkboxes = document.querySelectorAll('.contact-select-checkbox');
            const selectAllBtn = document.getElementById('selectAllContactsBtn');
            const isSelectingAll = selectAllBtn.textContent.includes('Select All');
            
            checkboxes.forEach(checkbox => {
                const contactId = parseInt(checkbox.dataset.contactId);
                const contactCard = document.querySelector(`[data-contact-id="${contactId}"]`);
                
                checkbox.checked = isSelectingAll;
                if (isSelectingAll) {
                    if (!selectedContactIds.includes(contactId)) {
                        selectedContactIds.push(contactId);
                        contactCard.classList.add('selected');
                    }
                } else {
                    selectedContactIds = selectedContactIds.filter(id => id !== contactId);
                    contactCard.classList.remove('selected');
                }
            });
            
            selectAllBtn.innerHTML = isSelectingAll 
                ? '<i class="fas fa-times"></i> Deselect All' 
                : '<i class="fas fa-check-square"></i> Select All';
            
            updateBulkActionsDisplay();
        };

        window.bulkAddToFavorites = function() {
            if (selectedContactIds.length === 0) return;
            
            let addedCount = 0;
            selectedContactIds.forEach(contactId => {
                const contact = ContactsManager.getContact(contactId);
                if (contact && !contact.favorite) {
                    ContactsManager.toggleFavorite(contactId);
                    addedCount++;
                }
            });
            
            showNotification(`${addedCount} contact${addedCount > 1 ? 's' : ''} added to favorites`);
            clearContactSelection();
        };

        window.bulkRemoveFromFavorites = function() {
            if (selectedContactIds.length === 0) return;
            
            let removedCount = 0;
            selectedContactIds.forEach(contactId => {
                const contact = ContactsManager.getContact(contactId);
                if (contact && contact.favorite) {
                    ContactsManager.toggleFavorite(contactId);
                    removedCount++;
                }
            });
            
            showNotification(`${removedCount} contact${removedCount > 1 ? 's' : ''} removed from favorites`);
            clearContactSelection();
        };

        window.bulkRemoveContacts = function() {
            if (selectedContactIds.length === 0) return;
            
            const contactNames = selectedContactIds.map(id => {
                const contact = ContactsManager.getContact(id);
                return contact ? contact.name : 'Unknown';
            }).filter(name => name !== 'Unknown');
            
            if (confirm(`Are you sure you want to remove ${contactNames.length} contact${contactNames.length > 1 ? 's' : ''} from your contact list?\n\n${contactNames.join(', ')}`)) {
                selectedContactIds.forEach(contactId => {
                    ContactsManager.removeContact(contactId);
                });
                
                showNotification(`${contactNames.length} contact${contactNames.length > 1 ? 's' : ''} removed`);
                clearContactSelection();
            }
        };

        window.clearContactSelection = function() {
            selectedContactIds = [];
            document.querySelectorAll('.contact-select-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('.contact-card').forEach(card => card.classList.remove('selected'));
            const selectAllBtn = document.getElementById('selectAllContactsBtn');
            if (selectAllBtn) {
                selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All';
            }
            updateBulkActionsDisplay();
        };

        function updateBulkActionsDisplay() {
            const bulkActionsSection = document.getElementById('contactsBulkActions');
            const selectedCountSpan = document.getElementById('selectedContactsCount');
            
            if (selectedContactIds.length > 0) {
                bulkActionsSection.style.display = 'block';
                selectedCountSpan.textContent = `${selectedContactIds.length} contact${selectedContactIds.length > 1 ? 's' : ''} selected`;
            } else {
                bulkActionsSection.style.display = 'none';
            }
        }

        // Import contacts
        window.importContacts = function() {
            showNotification('Import Contacts feature - coming soon!');
        };

        // Export contacts
        window.exportContacts = function() {
            const contactsData = JSON.stringify(globalContacts, null, 2);
            const blob = new Blob([contactsData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'contacts.json';
            a.click();
            URL.revokeObjectURL(url);
            showNotification('Contacts exported successfully');
        };

        // Manage groups
        window.manageGroups = function() {
            showNotification('Manage Groups feature - coming soon!');
        };

        // Event listeners
        document.addEventListener('click', function(e) {
            if (e.target.id === 'addContactBtn' || e.target.closest('#addContactBtn')) {
                e.preventDefault();
                if (typeof window.addContact === 'function') {
                    window.addContact();
                }
            } else if (e.target.id === 'importContactsBtn' || e.target.closest('#importContactsBtn')) {
                window.importContacts();
            } else if (e.target.id === 'exportContactsBtn' || e.target.closest('#exportContactsBtn')) {
                window.exportContacts();
            } else if (e.target.id === 'manageGroupsBtn' || e.target.closest('#manageGroupsBtn')) {
                window.manageGroups();
            }
        });

        // Make functions available globally first
        window.updateContactsDisplay = updateContactsDisplay;
        window.updateRecentContacts = updateRecentContacts;
        
        // Initialize contacts display immediately
        console.log("🎯 End of initializeContacts - calling display functions");
        updateContactsDisplay();
        updateRecentContacts();
    }

    // Add new contact - Navigate to add contact page (Simple working version)
    window.addContact = function() {
        try {
            const mainPage = document.getElementById('mainPage');
            const addContactPage = document.getElementById('addContactPage');
            
            if (mainPage && addContactPage) {
                mainPage.style.display = 'none';
                addContactPage.style.display = 'block';
                
                // Optional enhancements (won't break if they fail)
                try {
                    if (typeof announcePageChange === 'function') {
                        announcePageChange('Add Contact');
                    }
                    if (typeof setFocusToFirstElement === 'function') {
                        setFocusToFirstElement(addContactPage);
                    }
                    if (typeof window.initializeAddContactPage === 'function') {
                        window.initializeAddContactPage();
                    }
                } catch (e) {
                    // Ignore optional function errors
                }
            }
        } catch (error) {
            // Fallback: try direct navigation
            alert('Navigating to Add Contact page...');
            const mainPage = document.getElementById('mainPage');
            const addContactPage = document.getElementById('addContactPage');
            if (mainPage) mainPage.style.display = 'none';
            if (addContactPage) addContactPage.style.display = 'block';
        }
    };

    // Add Contact Page Functionality
    window.initializeAddContactPage = function() {
        // Extended user database for adding contacts
        const availableUsers = [
            { id: 1, name: 'Lynn Miller', email: 'lynn@lynnsdatabase.local', role: 'Admin', department: 'IT', status: 'Active', lastSeen: '2 minutes ago', isContact: true },
            { id: 2, name: 'Michael Johnson', email: 'michael@lynnsdatabase.local', role: 'User', department: 'Marketing', status: 'Active', lastSeen: '5 minutes ago', isContact: true },
            { id: 3, name: 'Alex Thompson', email: 'alex@lynnsdatabase.local', role: 'Developer', department: 'IT', status: 'Active', lastSeen: '1 hour ago', isContact: false },
            { id: 4, name: 'Emma Rodriguez', email: 'emma@lynnsdatabase.local', role: 'Manager', department: 'HR', status: 'Active', lastSeen: '30 minutes ago', isContact: false },
            { id: 5, name: 'David Chen', email: 'david@lynnsdatabase.local', role: 'User', department: 'Finance', status: 'Active', lastSeen: '15 minutes ago', isContact: false },
            { id: 6, name: 'Sofia Martinez', email: 'sofia@lynnsdatabase.local', role: 'Designer', department: 'Marketing', status: 'Active', lastSeen: '45 minutes ago', isContact: false },
            { id: 7, name: 'James Wilson', email: 'james@lynnsdatabase.local', role: 'Developer', department: 'IT', status: 'Active', lastSeen: '2 hours ago', isContact: false },
            { id: 8, name: 'Priya Patel', email: 'priya@lynnsdatabase.local', role: 'Manager', department: 'Sales', status: 'Active', lastSeen: '1 day ago', isContact: false },
            { id: 9, name: 'Carlos Rodriguez', email: 'carlos@lynnsdatabase.local', role: 'User', department: 'Finance', status: 'Inactive', lastSeen: '3 days ago', isContact: false },
            { id: 10, name: 'Isabella Brown', email: 'isabella@lynnsdatabase.local', role: 'Moderator', department: 'HR', status: 'Active', lastSeen: '20 minutes ago', isContact: false }
        ];

        let selectedUsers = [];
        let recentlyAddedContacts = [];

        function performAddContactSearch() {
            const query = document.getElementById('addContactSearchInput').value.toLowerCase().trim();
            const roleFilter = document.getElementById('addContactRoleFilter').value;
            const statusFilter = document.getElementById('addContactStatusFilter').value;
            const departmentFilter = document.getElementById('addContactDepartmentFilter').value;
            const searchResults = document.getElementById('addContactSearchResults');
            const searchLoading = document.getElementById('addContactSearchLoading');

            // Show loading state
            searchResults.style.display = 'none';
            searchLoading.style.display = 'block';

            setTimeout(() => {
                // Get IDs of existing contacts to exclude them
                const existingContactIds = ContactsManager.getAllContacts().map(c => c.id);
                let results = availableUsers.filter(user => !existingContactIds.includes(user.id)); // Only show non-contacts

                // Filter by search query
                if (query) {
                    results = results.filter(user =>
                        user.name.toLowerCase().includes(query) ||
                        user.email.toLowerCase().includes(query) ||
                        user.role.toLowerCase().includes(query) ||
                        user.department.toLowerCase().includes(query)
                    );
                }

                // Apply filters
                if (roleFilter) results = results.filter(user => user.role === roleFilter);
                if (statusFilter) results = results.filter(user => user.status === statusFilter);
                if (departmentFilter) results = results.filter(user => user.department === departmentFilter);

                displayAddContactResults(results);
                searchLoading.style.display = 'none';
                searchResults.style.display = 'block';
            }, 800);
        }

        function displayAddContactResults(users) {
            const searchResults = document.getElementById('addContactSearchResults');
            
            if (users.length === 0) {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-user-friends"></i>
                        <p>No users found</p>
                        <small>Try adjusting your search criteria</small>
                    </div>
                `;
                return;
            }

            searchResults.innerHTML = users.map(user => `
                <div class="user-result-card ${selectedUsers.includes(user.id) ? 'selected' : ''}" data-user-id="${user.id}">
                    <input type="checkbox" class="select-checkbox" ${selectedUsers.includes(user.id) ? 'checked' : ''} 
                           onchange="toggleUserSelection(${user.id})">
                    <div class="user-result-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-result-info">
                        <h4>${user.name}</h4>
                        <div class="user-result-meta">
                            <span><i class="fas fa-envelope"></i> ${user.email}</span>
                            <span><i class="fas fa-user-tag"></i> ${user.role}</span>
                            <span><i class="fas fa-building"></i> ${user.department}</span>
                            <span><i class="fas fa-clock"></i> ${user.lastSeen}</span>
                        </div>
                        <span class="user-result-status ${user.status.toLowerCase()}">${user.status}</span>
                    </div>
                    <div class="user-result-actions">
                        <button class="add-contact-btn-result" onclick="addSingleContact(${user.id})" 
                                ${recentlyAddedContacts.includes(user.id) ? 'class="added"' : ''}>
                            <i class="fas ${recentlyAddedContacts.includes(user.id) ? 'fa-check' : 'fa-user-plus'}"></i>
                            ${recentlyAddedContacts.includes(user.id) ? 'Added' : 'Add Contact'}
                        </button>
                    </div>
                </div>
            `).join('');

            updateBulkActions();
        }

        // Global functions for add contact page
        window.toggleUserSelection = function(userId) {
            if (selectedUsers.includes(userId)) {
                selectedUsers = selectedUsers.filter(id => id !== userId);
            } else {
                selectedUsers.push(userId);
            }
            updateBulkActions();
            
            // Update visual state
            const card = document.querySelector(`[data-user-id="${userId}"]`);
            if (card) {
                card.classList.toggle('selected', selectedUsers.includes(userId));
            }
        };

        window.addSingleContact = function(userId) {
            const user = availableUsers.find(u => u.id === userId);
            if (user && !recentlyAddedContacts.includes(userId)) {
                // Add to global contacts using ContactsManager
                if (ContactsManager.addContact(user)) {
                    user.isContact = true;
                    recentlyAddedContacts.push(userId);
                    updateRecentlyAdded(user);
                    
                    // Update button state
                    const button = document.querySelector(`[data-user-id="${userId}"] .add-contact-btn-result`);
                    if (button) {
                        button.innerHTML = '<i class="fas fa-check"></i> Added';
                        button.classList.add('added');
                    }
                }
            }
        };

        window.addSelectedContacts = function() {
            const usersToAdd = availableUsers.filter(u => selectedUsers.includes(u.id));
            let addedCount = 0;
            
            usersToAdd.forEach(user => {
                if (ContactsManager.addContact(user)) {
                    user.isContact = true;
                    if (!recentlyAddedContacts.includes(user.id)) {
                        recentlyAddedContacts.push(user.id);
                        updateRecentlyAdded(user);
                    }
                    addedCount++;
                }
            });
            
            if (addedCount > 0) {
                showNotification(`${addedCount} contact${addedCount > 1 ? 's' : ''} added to your contact list!`);
            }
            selectedUsers = [];
            performAddContactSearch(); // Refresh results
        };

        window.clearSelection = function() {
            selectedUsers = [];
            updateBulkActions();
            document.querySelectorAll('.select-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('.user-result-card').forEach(card => card.classList.remove('selected'));
        };

        function updateBulkActions() {
            const bulkSection = document.getElementById('bulkActionsSection');
            const selectedCount = document.getElementById('selectedCount');
            
            if (selectedUsers.length > 0) {
                bulkSection.style.display = 'block';
                selectedCount.textContent = `${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''} selected`;
            } else {
                bulkSection.style.display = 'none';
            }
        }

        function updateRecentlyAdded(user) {
            const recentlyAddedList = document.getElementById('recentlyAddedList');
            
            if (recentlyAddedContacts.length === 1) {
                recentlyAddedList.innerHTML = '';
            }
            
            const recentItem = document.createElement('div');
            recentItem.className = 'recently-added-item';
            recentItem.innerHTML = `
                <div class="recently-added-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="recently-added-info">
                    <h5>${user.name}</h5>
                    <small>Added just now • ${user.role} in ${user.department}</small>
                </div>
            `;
            
            recentlyAddedList.insertBefore(recentItem, recentlyAddedList.firstChild);
        }

        // Quick action functions
        window.showOnlineUsers = function() {
            document.getElementById('addContactStatusFilter').value = 'Active';
            document.getElementById('addContactSearchInput').value = '';
            performAddContactSearch();
        };

        window.showRecentUsers = function() {
            document.getElementById('addContactSearchInput').value = '';
            performAddContactSearch();
            showNotification('Showing all available users');
        };

        window.showSuggestedContacts = function() {
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser === 'lynn') {
                document.getElementById('addContactDepartmentFilter').value = 'IT';
            }
            performAddContactSearch();
            showNotification('Showing suggested contacts based on your profile');
        };

        // Advanced search toggle
        window.toggleAddContactAdvancedSearch = function() {
            const advancedSearch = document.getElementById('addContactAdvancedSearch');
            advancedSearch.style.display = advancedSearch.style.display === 'none' ? 'block' : 'none';
        };

        window.applyAddContactFilters = function() {
            performAddContactSearch();
            showNotification('Filters applied');
        };

        window.clearAddContactFilters = function() {
            document.getElementById('addContactRoleFilter').value = '';
            document.getElementById('addContactStatusFilter').value = '';
            document.getElementById('addContactDepartmentFilter').value = '';
            document.getElementById('addContactFilterRegistration').value = '';
            performAddContactSearch();
            showNotification('Filters cleared');
        };

        // Event listeners
        const searchBtn = document.getElementById('addContactSearchBtn');
        const searchInput = document.getElementById('addContactSearchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', performAddContactSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performAddContactSearch();
                }
            });
        }

        // Filter change listeners
        document.getElementById('addContactRoleFilter').addEventListener('change', performAddContactSearch);
        document.getElementById('addContactStatusFilter').addEventListener('change', performAddContactSearch);
        document.getElementById('addContactDepartmentFilter').addEventListener('change', performAddContactSearch);
    };

    function initializeUserSearch() {
        const searchBtn = document.getElementById('searchUserBtn');
        const searchInput = document.getElementById('userSearchInput');
        const roleFilter = document.getElementById('roleFilter');
        const statusFilter = document.getElementById('statusFilter');
        const searchResults = document.getElementById('searchResults');

        // Get contacts from the global contacts management system
        function getContactsForSearch() {
            return ContactsManager.getAllContacts().map(contact => ({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                role: contact.role,
                status: mapContactStatus(contact.status),
                lastSeen: getTimeAgo(contact.lastViewed)
            }));
        }

        // Helper function to map contact status to display format
        function mapContactStatus(status) {
            switch(status) {
                case 'online': return 'Active';
                case 'away': return 'Away';
                case 'offline': return 'Offline';
                default: return 'Inactive';
            }
        }

        // Helper function to format time ago
        function getTimeAgo(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (hours < 1) return 'Just now';
            if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            if (days === 1) return '1 day ago';
            return `${days} days ago`;
        }

        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            
            // If no query, don't open the panel
            if (!query) return;

            // Open the search side panel
            openSearchPanel();

            const roleFilterValue = document.getElementById('roleFilter').value;
            const statusFilterValue = document.getElementById('statusFilter').value;
            const searchLoading = document.getElementById('searchLoading');
            const searchResults = document.getElementById('searchResults');

            console.log('Performing search with query:', query);

            // Show loading state in side panel
            searchResults.style.display = 'none';
            searchLoading.style.display = 'block';

            // Simulate search delay for better UX
            setTimeout(() => {
                let results = getContactsForSearch();
                console.log('Found', results.length, 'total contacts');

                // Filter by search query
                results = results.filter(user =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.role.toLowerCase().includes(query)
                );
                console.log('Filtered to', results.length, 'contacts matching query');

                // Filter by role
                if (roleFilterValue) {
                    results = results.filter(user => user.role === roleFilterValue);
                    console.log('Filtered by role to', results.length, 'contacts');
                }

                // Filter by status
                if (statusFilterValue) {
                    results = results.filter(user => user.status === statusFilterValue);
                    console.log('Filtered by status to', results.length, 'contacts');
                }

                // Hide loading and show results
                searchLoading.style.display = 'none';
                searchResults.style.display = 'block';
                displaySearchResults(results, query);
            }, 500); // Simulate search processing time
        }

        function displaySearchResults(results, query) {
            console.log('Displaying', results.length, 'contact results');
            const searchResultsElement = document.getElementById('searchResults');
            
            if (results.length === 0) {
                searchResultsElement.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>${query ? `No contacts found for "${query}"` : 'You haven\'t added any contacts yet'}</p>
                        <small>${query ? 'Only searching through your added contacts' : 'Use the Add Contact button to add contacts to your list'}</small>
                    </div>
                `;
                return;
            }

            // Add a header to show what we're displaying
            const headerText = query ? `Search results for "${query}"` : `All your contacts (${results.length})`;
            const headerHTML = `
                <div class="search-results-header">
                    <h3><i class="fas fa-users"></i> ${headerText}</h3>
                </div>
            `;

            const resultsHTML = results.map(user => `
                <div class="user-result contact-result">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-info">
                        <h4>${user.name}</h4>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Role:</strong> ${user.role}</p>
                        <p><strong>Last Seen:</strong> ${user.lastSeen}</p>
                    </div>
                    <div class="contact-actions">
                        <button class="contact-action-btn message-btn" onclick="sendMessage(${user.id})" title="Send Message">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="contact-action-btn favorite-btn" onclick="toggleContactFavorite(${user.id})" title="Add to Favorites">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                    <div class="user-status ${user.status.toLowerCase()}">
                        ${user.status}
                    </div>
                </div>
            `).join('');
            
            searchResultsElement.innerHTML = headerHTML + resultsHTML;
            console.log('Successfully displayed', results.length, 'contacts');
        }

        // Event listeners
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }

        // Setup filter event listeners after the search panel is opened
        function setupFilterListeners() {
            const roleFilter = document.getElementById('roleFilter');
            const statusFilter = document.getElementById('statusFilter');
            
            if (roleFilter) {
                roleFilter.addEventListener('change', () => {
                    if (document.getElementById('searchSidePanel').classList.contains('active')) {
                        performSearch();
                    }
                });
            }

            if (statusFilter) {
                statusFilter.addEventListener('change', () => {
                    if (document.getElementById('searchSidePanel').classList.contains('active')) {
                        performSearch();
                    }
                });
            }
        }

        // Initialize filter listeners
        setupFilterListeners();

        // Function to update contact search results display
        function updateContactSearchResults() {
            // Re-run the search if there's an active search
            const searchInput = document.getElementById('userSearchInput');
            if (searchInput && searchInput.value.trim()) {
                performSearch();
            }
        }

        // Global functions for contact search actions (avoid duplicate definitions)
        if (typeof window.viewContactProfile === 'undefined') {
            // viewContactProfile is already defined globally above
        } else {
            // Function already exists, no need to redefine

            window.sendMessage = function(contactId) {
                const contact = ContactsManager.getContact(contactId);
                if (contact) {
                    showNotification(`Opening message to ${contact.name}`);
                    // Here you would typically open a message dialog
                }
            };

            window.toggleContactFavorite = function(contactId) {
                ContactsManager.toggleFavorite(contactId);
            };
        }
    }

    function updateDatabaseStats() {
        const totalUsers = document.getElementById('totalUsers');
        const totalAdmins = document.getElementById('totalAdmins');
        const activeUsers = document.getElementById('activeUsers');

        // Simulate real-time stats
        const stats = {
            users: 8,
            admins: 2,
            active: 6
        };

        if (totalUsers) totalUsers.textContent = stats.users;
        if (totalAdmins) totalAdmins.textContent = stats.admins;
        if (activeUsers) activeUsers.textContent = stats.active;
    }

    function initializeAccountCustomization() {
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab + '-tab');
                if (targetContent) targetContent.classList.add('active');
            });
        });

        // Load user settings on page load
        loadUserSettings();
        
        // Make function available globally
        window.updateContactSearchResults = updateContactSearchResults;
    }

    // Search panel control functions
    function openSearchPanel() {
        const searchPanel = document.getElementById('searchSidePanel');
        const searchOverlay = document.getElementById('searchOverlay');
        
        if (searchPanel && searchOverlay) {
            searchPanel.classList.add('active');
            searchOverlay.classList.add('active');
        }
    }

    function closeSearchPanel() {
        const searchPanel = document.getElementById('searchSidePanel');
        const searchOverlay = document.getElementById('searchOverlay');
        
        if (searchPanel && searchOverlay) {
            searchPanel.classList.remove('active');
            searchOverlay.classList.remove('active');
        }
    }

    // Make search panel functions globally available
    window.openSearchPanel = openSearchPanel;
    window.closeSearchPanel = closeSearchPanel;



    function showMainPage() {
        console.log('🏠 showMainPage called');
        
        // Simple and direct approach
        const mainPage = document.getElementById('mainPage');
        const addContactPage = document.getElementById('addContactPage');
        const accountPage = document.getElementById('accountPage');
        const contactDetailsPage = document.getElementById('contactDetailsPage');
        
        console.log('Pages found:', {
            main: !!mainPage,
            addContact: !!addContactPage,
            account: !!accountPage,
            details: !!contactDetailsPage
        });
        
        // Hide all other pages
        if (addContactPage) addContactPage.style.display = 'none';
        if (accountPage) accountPage.style.display = 'none';
        if (contactDetailsPage) contactDetailsPage.style.display = 'none';
        
        // Show main page
        if (mainPage) {
            mainPage.style.display = 'block';
            console.log('✅ Main page should now be visible');
            
            // Refresh favorites display
            if (typeof initializeFavoriteCards === 'function') {
                setTimeout(() => {
                    initializeFavoriteCards();
                }, 100);
            }
        } else {
            console.error('❌ Main page element not found!');
            alert('Error: Cannot find main page element');
        }
    }





    function initializeBrowseSearch() {
        const searchInput = document.getElementById('browseSearchInput');
        const searchBtn = document.getElementById('browseSearchBtn');
        const roleFilter = document.getElementById('browseRoleFilter');
        const statusFilter = document.getElementById('browseStatusFilter');
        
        // Search functionality for user's contacts
        const performBrowseSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            const roleValue = roleFilter.value;
            const statusValue = statusFilter.value;
            
            // Get user's contacts from favorites
            let userContacts = [];
            try {
                userContacts = JSON.parse(localStorage.getItem('favorites') || '[]');
            } catch (error) {
                console.error('Error loading user contacts for search:', error);
            }
            
            let filteredContacts = userContacts;
            
            // Filter by search query
            if (query) {
                filteredContacts = filteredContacts.filter(contact => 
                    contact.name.toLowerCase().includes(query) ||
                    (contact.role || '').toLowerCase().includes(query) ||
                    (contact.status || '').toLowerCase().includes(query)
                );
            }
            
            // Filter by role
            if (roleValue) {
                filteredContacts = filteredContacts.filter(contact => 
                    contact.role === roleValue
                );
            }
            
            // Filter by status
            if (statusValue) {
                filteredContacts = filteredContacts.filter(contact => 
                    (contact.status || 'offline').toLowerCase() === statusValue.toLowerCase()
                );
            }
            
            // Update display
            const browseGrid = document.getElementById('browseContactsGrid');
            const browseEmpty = document.getElementById('browseEmpty');
            const contactsCount = document.getElementById('browseContactsCount');
            
            if (filteredContacts.length > 0) {
                renderBrowseContacts(filteredContacts);
                if (browseGrid) browseGrid.style.display = 'grid';
                if (browseEmpty) browseEmpty.style.display = 'none';
            } else {
                if (browseGrid) browseGrid.style.display = 'none';
                if (browseEmpty) browseEmpty.style.display = 'block';
            }
            
            if (contactsCount) {
                contactsCount.textContent = `${filteredContacts.length} contact${filteredContacts.length !== 1 ? 's' : ''} found`;
            }
        };
        
        // Event listeners
        if (searchBtn) searchBtn.addEventListener('click', performBrowseSearch);
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performBrowseSearch();
            });
        }
        if (roleFilter) roleFilter.addEventListener('change', performBrowseSearch);
        if (statusFilter) statusFilter.addEventListener('change', performBrowseSearch);
    }

    let browseSelectedContacts = new Set();

    function toggleContactSelection(contactId) {
        const selectEl = document.querySelector(`[data-contact-id="${contactId}"] .browse-contact-select`);
        const cardEl = document.querySelector(`[data-contact-id="${contactId}"]`);
        
        if (browseSelectedContacts.has(contactId)) {
            browseSelectedContacts.delete(contactId);
            selectEl.classList.remove('selected');
            cardEl.classList.remove('selected');
        } else {
            browseSelectedContacts.add(contactId);
            selectEl.classList.add('selected');
            cardEl.classList.add('selected');
        }
        
        updateBrowseBulkActions();
    }

    function clearBrowseSelection() {
        browseSelectedContacts.clear();
        document.querySelectorAll('.browse-contact-select').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelectorAll('.browse-contact-card').forEach(el => {
            el.classList.remove('selected');
        });
        updateBrowseBulkActions();
    }

    function updateBrowseBulkActions() {
        const bulkActions = document.getElementById('browseBulkActions');
        const selectedCount = document.getElementById('browseSelectedCount');
        
        if (browseSelectedContacts.size > 0) {
            bulkActions.style.display = 'block';
            selectedCount.textContent = `${browseSelectedContacts.size} contact${browseSelectedContacts.size !== 1 ? 's' : ''} selected`;
        } else {
            bulkActions.style.display = 'none';
        }
    }

    function bulkAddToFavoritesBrowse() {
        browseSelectedContacts.forEach(contactId => {
            toggleFavorite(contactId);
        });
        
        // Update the display
        setTimeout(() => {
            loadAllContacts();
            clearBrowseSelection();
        }, 100);
    }

    function toggleFavoriteFromBrowse(contactId) {
        toggleFavorite(contactId);
        
        // Update the button display
        setTimeout(() => {
            const contact = window.contacts.find(c => c.id === contactId);
            const btn = document.querySelector(`[data-contact-id="${contactId}"] .browse-action-btn.favorite`);
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span');
            
            if (contact && contact.favorite) {
                btn.classList.add('active');
                btn.title = 'Remove from Favorites';
                text.textContent = 'Favorited';
            } else {
                btn.classList.remove('active');
                btn.title = 'Add to Favorites';
                text.textContent = 'Favorite';
            }
        }, 100);
    }

    // Initialize Browse All button functionality
    function initializeBrowseAllButton() {
        console.log('🔄 Initializing Browse All button...');
        
        // Try multiple approaches to find the button
        const browseAllBtn = document.getElementById('browseAllBtn');
        const browseAllBtnQuery = document.querySelector('#browseAllBtn');
        const browseAllBtnByClass = document.querySelector('button[onclick*="showBrowseAllPage"]');
        
        console.log('🔲 Browse All button by ID:', browseAllBtn);
        console.log('🔲 Browse All button by querySelector:', browseAllBtnQuery);
        console.log('🔲 Browse All button by onclick:', browseAllBtnByClass);
        
        const button = browseAllBtn || browseAllBtnQuery || browseAllBtnByClass;
        
        if (button) {
            // DO NOT remove onclick - keep it as primary method
            console.log('✅ Browse All button found, keeping onclick attribute');
            console.log('� Current onclick:', button.getAttribute('onclick'));
            
            // Test the function is available
            if (typeof showBrowseAllPage === 'function') {
                console.log('✅ showBrowseAllPage function is available');
            } else {
                console.error('❌ showBrowseAllPage function not available');
            }
            
        } else {
            console.error('❌ Browse All button not found in DOM');
            // List all buttons for debugging
            const allButtons = document.querySelectorAll('button');
            console.log('📋 All buttons found:', allButtons.length);
            allButtons.forEach((btn, index) => {
                console.log(`Button ${index}:`, btn.id, btn.textContent.trim());
            });
        }
    }

    // Simple test function
    window.testBrowse = function() {
        alert('JavaScript is working! Button should work too.');
        return 'Test successful';
    };
    
    // Make main functions globally available (Browse All is already defined early)
    window.showMainPage = showMainPage;

    function showCustomizationTabs() {
        // Scroll to customization tabs within the account page
        const customizationSection = document.querySelector('.customization-section');
        if (customizationSection) {
            customizationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function initializeProfileSettings() {
        // Profile photo upload
        const photoUpload = document.getElementById('photoUpload');
        const removePhoto = document.getElementById('removePhoto');
        const profilePhotoDisplay = document.getElementById('profilePhotoDisplay');

        if (photoUpload) {
            photoUpload.addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        profilePhotoDisplay.style.backgroundImage = `url(${e.target.result})`;
                        profilePhotoDisplay.style.backgroundSize = 'cover';
                        profilePhotoDisplay.style.borderRadius = '50%';
                        profilePhotoDisplay.innerHTML = '';

                        // Save to localStorage
                        localStorage.setItem('userProfilePhoto', e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (removePhoto) {
            removePhoto.addEventListener('click', function () {
                profilePhotoDisplay.style.backgroundImage = '';
                profilePhotoDisplay.innerHTML = '<i class="fas fa-user-circle"></i>';
                localStorage.removeItem('userProfilePhoto');
            });
        }
    }

    function initializeAppearanceSettings() {
        // Theme selection
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function () {
                themeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');

                const theme = this.getAttribute('data-theme');
                applyTheme(theme);
                localStorage.setItem('userTheme', theme);
            });
        });

        // Accent color picker
        const accentColor = document.getElementById('accentColor');
        if (accentColor) {
            accentColor.addEventListener('change', function () {
                document.documentElement.style.setProperty('--accent-color', this.value);
                localStorage.setItem('userAccentColor', this.value);
            });
        }

        // Font size slider
        const fontSize = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSize && fontSizeValue) {
            fontSize.addEventListener('input', function () {
                fontSizeValue.textContent = this.value + 'px';
                document.documentElement.style.setProperty('--base-font-size', this.value + 'px');
                localStorage.setItem('userFontSize', this.value);
            });
        }
    }

    function initializePreferencesSettings() {
        // Save preference changes to localStorage
        const preferences = [
            'emailNotifications', 'pushNotifications',
            'profileVisibility', 'showLastSeen',
            'languageSelect', 'timezoneSelect'
        ];

        preferences.forEach(prefId => {
            const element = document.getElementById(prefId);
            if (element) {
                const eventType = element.type === 'checkbox' ? 'change' : 'change';
                element.addEventListener(eventType, function () {
                    const value = element.type === 'checkbox' ? element.checked : element.value;
                    localStorage.setItem('pref_' + prefId, value);
                });
            }
        });
    }

    function initializeSecuritySettings() {
        // Change password functionality
        const changePasswordSubmit = document.getElementById('changePasswordSubmit');
        if (changePasswordSubmit) {
            changePasswordSubmit.addEventListener('click', function () {
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                if (!currentPassword || !newPassword || !confirmPassword) {
                    alert('Please fill all password fields.');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    alert('New passwords do not match.');
                    return;
                }

                if (newPassword.length < 6) {
                    alert('Password must be at least 6 characters long.');
                    return;
                }

                // In a real application, you would verify the current password
                // and update it on the server
                alert('Password changed successfully!');

                // Clear the form
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
            });
        }

        // Two-factor authentication toggle
        const twoFactorAuth = document.getElementById('twoFactorAuth');
        if (twoFactorAuth) {
            twoFactorAuth.addEventListener('change', function () {
                localStorage.setItem('twoFactorEnabled', this.checked);
                if (this.checked) {
                    alert('Two-Factor Authentication enabled! (Demo)');
                } else {
                    alert('Two-Factor Authentication disabled.');
                }
            });
        }
    }

    function applyTheme(theme) {
        const body = document.body;
        // Remove existing theme classes
        body.classList.remove('dark-theme', 'ocean-theme', 'sunset-theme');

        if (theme !== 'default') {
            body.classList.add(theme + '-theme');
        }
    }

    function loadUserSettings() {
        const currentUser = localStorage.getItem('currentUser');

        // Load profile photo
        const savedPhoto = localStorage.getItem('userProfilePhoto');
        const profilePhotoDisplay = document.getElementById('profilePhotoDisplay');
        if (savedPhoto && profilePhotoDisplay) {
            profilePhotoDisplay.style.backgroundImage = `url(${savedPhoto})`;
            profilePhotoDisplay.style.backgroundSize = 'cover';
            profilePhotoDisplay.style.borderRadius = '50%';
            profilePhotoDisplay.innerHTML = '';
        }

        // Load theme
        const savedTheme = localStorage.getItem('userTheme') || 'default';
        applyTheme(savedTheme);
        const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (themeOption) {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            themeOption.classList.add('active');
        }

        // Load accent color
        const savedAccentColor = localStorage.getItem('userAccentColor');
        if (savedAccentColor) {
            document.documentElement.style.setProperty('--accent-color', savedAccentColor);
            const accentColorInput = document.getElementById('accentColor');
            if (accentColorInput) accentColorInput.value = savedAccentColor;
        }

        // Load font size
        const savedFontSize = localStorage.getItem('userFontSize');
        if (savedFontSize) {
            document.documentElement.style.setProperty('--base-font-size', savedFontSize + 'px');
            const fontSizeInput = document.getElementById('fontSize');
            const fontSizeValue = document.getElementById('fontSizeValue');
            if (fontSizeInput) fontSizeInput.value = savedFontSize;
            if (fontSizeValue) fontSizeValue.textContent = savedFontSize + 'px';
        }

        // Load preferences
        const preferences = [
            'emailNotifications', 'pushNotifications',
            'profileVisibility', 'showLastSeen',
            'languageSelect', 'timezoneSelect', 'twoFactorAuth'
        ];

        preferences.forEach(prefId => {
            const savedValue = localStorage.getItem('pref_' + prefId) || localStorage.getItem(prefId);
            const element = document.getElementById(prefId);
            if (element && savedValue !== null) {
                if (element.type === 'checkbox') {
                    element.checked = savedValue === 'true';
                } else {
                    element.value = savedValue;
                }
            }
        });

        // Load profile information based on user
        loadUserProfileData(currentUser);
    }

    function loadUserProfileData(username) {
        const userProfiles = {
            'lynn': {
                displayName: 'Lynn Miller',
                email: 'lynn@lynnsdatabase.local',
                phone: '+1 (555) 123-4567',
                bio: 'Database Administrator and Web Developer. Passionate about creating efficient data solutions.',
                location: 'San Francisco, CA',
                website: 'https://lynn.dev'
            },
            'michael': {
                displayName: 'Michael Johnson',
                email: 'michael@lynnsdatabase.local',
                phone: '+1 (555) 987-6543',
                bio: 'Tech enthusiast and regular user of Lynn\'s Database system.',
                location: 'New York, NY',
                website: 'https://michael.tech'
            }
        };

        const profile = userProfiles[username] || {
            displayName: username ? username.charAt(0).toUpperCase() + username.slice(1) : 'User',
            email: username ? `${username}@lynnsdatabase.local` : 'user@lynnsdatabase.local',
            phone: '',
            bio: '',
            location: '',
            website: ''
        };

        // Populate form fields
        const fields = ['displayName', 'userEmail', 'userPhone', 'userBio', 'userLocation', 'userWebsite'];
        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            const dataKey = fieldId.replace('user', '').toLowerCase();
            if (element && profile[dataKey]) {
                element.value = profile[dataKey];
            }
        });
    }

    function saveAllUserSettings() {
        try {
            // Save profile information
            const profileFields = ['displayName', 'userEmail', 'userPhone', 'userBio', 'userLocation', 'userWebsite'];
            const profileData = {};

            profileFields.forEach(fieldId => {
                const element = document.getElementById(fieldId);
                if (element) {
                    profileData[fieldId] = element.value;
                    localStorage.setItem('profile_' + fieldId, element.value);
                }
            });

            // Save with timestamp for versioning
            const saveData = {
                timestamp: Date.now(),
                version: '1.0',
                profiles: profileData,
                settings: getAllSettings()
            };

            localStorage.setItem('lynndb_backup', JSON.stringify(saveData));
            console.log('All settings saved successfully!');
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            showNotification('Failed to save settings. Storage might be full.', 'error');
            return false;
        }
    }

    function getAllSettings() {
        const settings = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('user') || key.startsWith('pref_') || key.startsWith('profile_')) {
                settings[key] = localStorage.getItem(key);
            }
        }
        return settings;
    }

    function exportUserData() {
        try {
            const exportData = {
                timestamp: Date.now(),
                version: '1.0',
                user: localStorage.getItem('currentUser'),
                data: getAllSettings()
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `lynndb-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            showNotification('Data exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            showNotification('Export failed. Please try again.', 'error');
        }
    }

    function importUserData(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importData = JSON.parse(e.target.result);

                if (!importData.version || !importData.data) {
                    throw new Error('Invalid backup file format');
                }

                // Restore settings
                Object.keys(importData.data).forEach(key => {
                    localStorage.setItem(key, importData.data[key]);
                });

                showNotification('Data imported successfully! Refreshing...', 'success');
                setTimeout(() => {
                    location.reload();
                }, 2000);

            } catch (error) {
                console.error('Import failed:', error);
                showNotification('Import failed. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    function clearAllData() {
        if (confirm('Are you sure you want to clear all data? This will log you out and cannot be undone.')) {
            try {
                // Keep only essential items
                const keepItems = ['isLoggedIn', 'currentUser', 'loginTime'];
                const toKeep = {};
                keepItems.forEach(key => {
                    const value = localStorage.getItem(key);
                    if (value) toKeep[key] = value;
                });

                localStorage.clear();

                // Restore essential items
                Object.keys(toKeep).forEach(key => {
                    localStorage.setItem(key, toKeep[key]);
                });

                showNotification('All data cleared successfully!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } catch (error) {
                console.error('Clear data failed:', error);
                showNotification('Failed to clear data.', 'error');
            }
        }
    }

    function resetToDefaultSettings() {
        // Clear all custom settings
        const settingsKeys = Object.keys(localStorage).filter(key =>
            key.startsWith('user') || key.startsWith('pref_') || key.startsWith('profile_')
        );

        settingsKeys.forEach(key => {
            localStorage.removeItem(key);
        });

        // Reset theme
        applyTheme('default');
        document.documentElement.style.removeProperty('--accent-color');
        document.documentElement.style.removeProperty('--base-font-size');

        // Reload settings
        setTimeout(() => {
            loadUserSettings();
        }, 100);
    }

    function showSaveSuccess() {
        const saveBtn = document.getElementById('saveAllSettings');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Settings Saved!';
        saveBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';

        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.style.background = '';
        }, 2000);
    }

    function showResetSuccess() {
        const resetBtn = document.getElementById('resetSettings');
        const originalText = resetBtn.innerHTML;
        resetBtn.innerHTML = '<i class="fas fa-check"></i> Settings Reset!';
        resetBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';

        setTimeout(() => {
            resetBtn.innerHTML = originalText;
            resetBtn.style.background = '';
        }, 2000);
    }



    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // Add logout functionality (optional)
    function logout() {
        // Call backend logout endpoint to destroy session
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include cookies for session
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear local storage
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                
                // Show logout notification
                showNotification('Logged out successfully', 'success');
                
                // Reload page after a brief delay to show notification
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                showNotification('Logout failed: ' + data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Even if backend fails, clear local data and reload
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            showNotification('Logged out (connection error)', 'warning');
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    }

    // Notification System
    function showNotification(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        // Create unique ID for this notification
        const notificationId = 'notif_' + Date.now() + Math.random().toString(36).substr(2, 9);
        notification.id = notificationId;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="closeNotification('${notificationId}')" title="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add click-to-close on the entire notification as backup
        notification.addEventListener('click', function(e) {
            // Only close if clicking the close button or notification background
            if (e.target.classList.contains('notification-close') || 
                e.target.classList.contains('fa-times') ||
                e.target === notification) {
                window.closeNotification(notificationId);
            }
        });

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // Global function to close notifications
    window.closeNotification = function(notificationId) {
        const notification = document.getElementById(notificationId);
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    };

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'info':
            default: return 'fa-info-circle';
        }
    }

    // Enhanced form validation
    function validateForm(formData) {
        const errors = [];

        if (formData.email && !isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        if (formData.phone && !isValidPhone(formData.phone)) {
            errors.push('Please enter a valid phone number');
        }

        if (formData.website && !isValidURL(formData.website)) {
            errors.push('Please enter a valid website URL');
        }

        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Auto-save functionality
    function setupAutoSave() {
        const inputs = document.querySelectorAll('input, textarea, select');
        let saveTimeout;

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    const savedIndicator = document.querySelector('.auto-save-indicator');
                    if (savedIndicator) {
                        savedIndicator.textContent = 'Auto-saved';
                        savedIndicator.style.opacity = '1';
                        setTimeout(() => {
                            savedIndicator.style.opacity = '0';
                        }, 2000);
                    }
                }, 2000);
            });
        });
    }

    // Initialize auto-save if on account page
    if (window.location.hash === '#account' || document.getElementById('accountPage')) {
        setupAutoSave();
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Ctrl+S to save settings
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const saveBtn = document.getElementById('saveAllSettings');
            if (saveBtn && saveBtn.style.display !== 'none') {
                saveBtn.click();
            }
        }

        // Escape to close modals/overlays
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notif => notif.remove());
        }

        // Tab trap for login form
        if (e.key === 'Tab' && document.getElementById('loginSection').style.display !== 'none') {
            const loginForm = document.getElementById('loginForm');
            const focusableElements = loginForm.querySelectorAll('input, button');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }

        // Enter key to trigger search
        if (e.key === 'Enter' && document.activeElement === document.getElementById('userSearchInput')) {
            e.preventDefault();
            document.getElementById('searchUserBtn').click();
        }

        // Arrow keys for tab navigation
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.target.classList.contains('tab-btn')) {
            e.preventDefault();
            const tabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = tabs.indexOf(e.target);
            let nextIndex;

            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }

            tabs[nextIndex].focus();
        }
    });

    // Announce page changes to screen readers
    function announcePageChange(pageName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now viewing ${pageName} page`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Enhanced focus management
    function setFocusToFirstElement(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    // Automatic backup functionality
    function createAutoBackup() {
        try {
            const backupData = {
                timestamp: Date.now(),
                version: '1.0',
                autoBackup: true,
                data: getAllSettings()
            };

            localStorage.setItem('lynndb_auto_backup', JSON.stringify(backupData));
            console.log('Auto backup created');
        } catch (error) {
            console.warn('Auto backup failed:', error);
        }
    }

    // Check for storage quota and clean up if needed
    function checkStorageQuota() {
        try {
            if (navigator.storage && navigator.storage.estimate) {
                navigator.storage.estimate().then(estimate => {
                    const usagePercentage = (estimate.usage / estimate.quota) * 100;
                    if (usagePercentage > 80) {
                        showNotification('Storage is getting full. Consider exporting your data.', 'warning', 5000);
                    }
                });
            }
        } catch (error) {
            console.warn('Storage quota check failed:', error);
        }
    }

    // Data integrity check
    function validateStorageData() {
        try {
            const currentUser = localStorage.getItem('currentUser');
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn === 'true' && !currentUser) {
                console.warn('Data integrity issue detected');
                localStorage.removeItem('isLoggedIn');
                location.reload();
            }
        } catch (error) {
            console.error('Data validation failed:', error);
        }
    }

    // Initialize data management
    function initializeDataManagement() {
        // Check storage quota
        checkStorageQuota();

        // Validate existing data
        validateStorageData();

        // Create auto backup every 5 minutes for logged-in users
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setInterval(createAutoBackup, 5 * 60 * 1000);
        }

        // Handle browser beforeunload to save data
        window.addEventListener('beforeunload', function () {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                createAutoBackup();
            }
        });
    }

    // Initialize data management
    initializeDataManagement();

    // Accessibility helper functions
    function announcePageChange(pageName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Navigated to ${pageName} page`;
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    function setFocusToFirstElement(container) {
        const focusableElements = container.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    // Enhanced Profile System
    function initializeProfileSystem() {
        // Load existing profile data
        loadProfileData();

        // Initialize form handlers
        setupProfileFormHandlers();

        // Initialize real-time preview
        setupRealtimePreview();

        // Initialize photo upload
        setupPhotoUpload();
    }

    function loadProfileData() {
        const username = localStorage.getItem('currentUsername') || 'user';
        const savedProfile = localStorage.getItem(`profile_${username}`);

        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            populateProfileForm(profileData);
            updateProfilePreview(profileData);
        } else {
            // Set default values
            const defaultProfile = {
                firstName: username,
                lastName: '',
                username: username,
                email: '',
                phone: '',
                location: '',
                timezone: 'America/New_York',
                jobTitle: '',
                company: '',
                department: '',
                bio: '',
                birthDate: '',
                interests: '',
                website: '',
                linkedin: '',
                github: '',
                twitter: '',
                pronouns: '',
                avatar: null
            };
            updateProfilePreview(defaultProfile);
        }
    }

    function populateProfileForm(profileData) {
        Object.keys(profileData).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = profileData[key] || '';
            }
        });
    }

    function setupProfileFormHandlers() {
        // Real-time name updates
        const nameFields = ['firstName', 'lastName', 'username'];
        nameFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', handleNameChange);
                field.addEventListener('blur', validateField);
            }
        });

        // Bio character counter
        const bioField = document.getElementById('bio');
        if (bioField) {
            bioField.addEventListener('input', updateCharacterCount);
        }

        // Form validation for all fields
        const profileForm = document.querySelector('.profile-section');
        if (profileForm) {
            const inputs = profileForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', updatePreviewFromForm);
            });
        }

        // Action buttons
        setupActionButtons();
    }

    function handleNameChange(e) {
        const field = e.target;
        const value = field.value.trim();

        // Update preview immediately
        updatePreviewFromForm();

        // Update display name in header if it's the main name fields
        if (field.id === 'firstName' || field.id === 'lastName') {
            updateHeaderDisplayName();
        }

        // Validate username uniqueness
        if (field.id === 'username') {
            validateUsernameUniqueness(value);
        }
    }

    function updateHeaderDisplayName() {
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const displayName = `${firstName} ${lastName}`.trim();

        // Update all instances of the user's name in the interface
        const nameElements = document.querySelectorAll('.user-display-name');
        nameElements.forEach(element => {
            element.textContent = displayName || 'User';
        });
    }

    function validateUsernameUniqueness(username) {
        const field = document.getElementById('username');
        const currentUser = localStorage.getItem('currentUsername');

        if (username && username !== currentUser) {
            // Check if username exists in database
            const isUnique = !database.some(user =>
                user.name.toLowerCase() === username.toLowerCase()
            );

            if (isUnique) {
                showFieldSuccess(field, 'Username is available');
            } else {
                showFieldError(field, 'Username is already taken');
            }
        }
    }

    function updateCharacterCount() {
        const bioField = document.getElementById('bio');
        const counter = document.querySelector('.char-counter');

        if (bioField && counter) {
            const currentLength = bioField.value.length;
            const maxLength = 500;
            const remaining = maxLength - currentLength;

            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#dc3545' : '#6c757d';
        }
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();

        // Clear previous validation styles
        clearFieldValidation(field);

        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                } else if (value) {
                    showFieldSuccess(field);
                }
                break;

            case 'url':
                if (value && !isValidUrl(value)) {
                    showFieldError(field, 'Please enter a valid URL');
                } else if (value) {
                    showFieldSuccess(field);
                }
                break;

            case 'tel':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                } else if (value) {
                    showFieldSuccess(field);
                }
                break;

            default:
                if (field.required && !value) {
                    showFieldError(field, 'This field is required');
                } else if (value) {
                    showFieldSuccess(field);
                }
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');

        let errorDiv = field.parentNode.querySelector('.validation-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'validation-message error';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.className = 'validation-message error';
    }

    function showFieldSuccess(field, message = '') {
        field.classList.add('success');
        field.classList.remove('error');

        let successDiv = field.parentNode.querySelector('.validation-message');
        if (message) {
            if (!successDiv) {
                successDiv = document.createElement('div');
                successDiv.className = 'validation-message success';
                field.parentNode.appendChild(successDiv);
            }
            successDiv.textContent = message;
            successDiv.className = 'validation-message success';
        } else if (successDiv) {
            successDiv.remove();
        }
    }

    function clearFieldValidation(field) {
        field.classList.remove('error', 'success');
        const validationMsg = field.parentNode.querySelector('.validation-message');
        if (validationMsg) {
            validationMsg.remove();
        }
    }

    function setupRealtimePreview() {
        // Update preview whenever form changes
        const profileForm = document.querySelector('.profile-section');
        if (profileForm) {
            profileForm.addEventListener('input', updatePreviewFromForm);
            profileForm.addEventListener('change', updatePreviewFromForm);
        }
    }

    function updatePreviewFromForm() {
        const profileData = collectFormData();
        updateProfilePreview(profileData);
    }

    function collectFormData() {
        const formData = {};
        const fields = [
            'firstName', 'lastName', 'username', 'pronouns',
            'email', 'phone', 'location', 'timezone',
            'jobTitle', 'company', 'department',
            'bio', 'birthDate', 'interests',
            'website', 'linkedin', 'github', 'twitter'
        ];

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                formData[fieldId] = field.value.trim();
            }
        });

        return formData;
    }

    function updateProfilePreview(profileData) {
        const previewCard = document.querySelector('.preview-card');
        if (!previewCard) return;

        const avatar = previewCard.querySelector('.preview-avatar');
        const nameElement = previewCard.querySelector('.preview-info h5');
        const usernameElement = previewCard.querySelector('.username');
        const jobElement = previewCard.querySelector('.job-title');
        const companyElement = previewCard.querySelector('.company');
        const locationElement = previewCard.querySelector('.location');
        const bioElement = previewCard.querySelector('.bio-preview');

        // Update avatar
        if (avatar) {
            if (profileData.avatar) {
                avatar.innerHTML = `<img src="${profileData.avatar}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                const initials = getInitials(profileData.firstName, profileData.lastName);
                avatar.textContent = initials;
            }
        }

        // Update name
        if (nameElement) {
            const displayName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
            nameElement.textContent = displayName || profileData.username || 'User';
        }

        // Update other fields
        if (usernameElement) {
            usernameElement.textContent = profileData.username ? `@${profileData.username}` : '';
        }

        if (jobElement) {
            jobElement.textContent = profileData.jobTitle || '';
        }

        if (companyElement) {
            companyElement.textContent = profileData.company || '';
        }

        if (locationElement) {
            locationElement.textContent = profileData.location || '';
        }

        if (bioElement) {
            bioElement.textContent = profileData.bio || '';
        }
    }

    function getInitials(firstName, lastName) {
        const first = (firstName || '').charAt(0).toUpperCase();
        const last = (lastName || '').charAt(0).toUpperCase();
        return first + last || 'U';
    }

    function setupPhotoUpload() {
        const uploadBtn = document.getElementById('uploadPhotoBtn');
        const generateBtn = document.getElementById('generateAvatarBtn');
        const removeBtn = document.getElementById('removePhotoBtn');

        if (uploadBtn) {
            uploadBtn.addEventListener('click', handlePhotoUpload);
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', generateAvatar);
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', removePhoto);
        }
    }

    function handlePhotoUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageData = event.target.result;
                    updateProfilePhoto(imageData);
                    showNotification('Profile photo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function generateAvatar() {
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';

        // Generate a colorful avatar using initials
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Random background color based on name
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const nameHash = (firstName + lastName).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        const bgColor = colors[Math.abs(nameHash) % colors.length];

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 200, 200);

        // Draw initials
        ctx.fillStyle = 'white';
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const initials = getInitials(firstName, lastName);
        ctx.fillText(initials, 100, 100);

        const avatarData = canvas.toDataURL();
        updateProfilePhoto(avatarData);
        showNotification('Avatar generated successfully!', 'success');
    }

    function removePhoto() {
        updateProfilePhoto(null);
        showNotification('Profile photo removed', 'info');
    }

    function updateProfilePhoto(imageData) {
        const photoContainer = document.querySelector('.current-photo');
        const previewAvatar = document.querySelector('.preview-avatar');

        if (photoContainer && previewAvatar) {
            if (imageData) {
                photoContainer.innerHTML = `<img src="${imageData}" alt="Profile Photo">`;
                previewAvatar.innerHTML = `<img src="${imageData}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                const firstName = document.getElementById('firstName')?.value || '';
                const lastName = document.getElementById('lastName')?.value || '';
                const initials = getInitials(firstName, lastName);

                photoContainer.innerHTML = `<div class="avatar-placeholder">${initials}</div>`;
                previewAvatar.textContent = initials;
            }
        }

        // Save to profile data
        const currentProfile = collectFormData();
        currentProfile.avatar = imageData;
        updateProfilePreview(currentProfile);
    }

    function setupActionButtons() {
        const saveBtn = document.querySelector('.save-profile');
        const previewBtn = document.querySelector('.preview-profile');
        const resetBtn = document.querySelector('.reset-profile');

        if (saveBtn) {
            saveBtn.addEventListener('click', saveProfile);
        }

        if (previewBtn) {
            previewBtn.addEventListener('click', togglePreviewMode);
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', resetProfile);
        }
    }

    function saveProfile() {
        const profileData = collectFormData();

        // Validate required fields
        if (!profileData.firstName && !profileData.lastName && !profileData.username) {
            showNotification('Please provide at least a name or username', 'error');
            return;
        }

        // Save to localStorage
        const username = localStorage.getItem('currentUsername') || 'user';
        localStorage.setItem(`profile_${username}`, JSON.stringify(profileData));

        // Update header display
        updateHeaderDisplayName();

        showNotification('Profile saved successfully!', 'success');

        // Auto-backup
        createAutoBackup();
    }

    function togglePreviewMode() {
        const profileSection = document.querySelector('.profile-section');
        const previewSection = document.querySelector('.profile-preview-section');

        if (profileSection.style.display === 'none') {
            // Show form, hide preview
            profileSection.style.display = 'block';
            previewSection.style.display = 'block';
        } else {
            // Show full preview
            profileSection.style.display = 'none';
            previewSection.style.display = 'block';

            // Update preview with current form data
            updatePreviewFromForm();
        }
    }

    function resetProfile() {
        if (confirm('Are you sure you want to reset all profile information? This cannot be undone.')) {
            // Clear form
            const profileForm = document.querySelector('.profile-section');
            if (profileForm) {
                const inputs = profileForm.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.value = '';
                    clearFieldValidation(input);
                });
            }

            // Reset to defaults
            const username = localStorage.getItem('currentUsername') || 'user';
            document.getElementById('firstName').value = username;
            document.getElementById('username').value = username;

            // Update preview
            updatePreviewFromForm();

            showNotification('Profile reset to defaults', 'info');
        }
    }

    // Validation helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Initialize profile system when page loads
    if (localStorage.getItem('isLoggedIn') === 'true') {
        initializeProfileSystem();
    }

    // ===== COMPREHENSIVE ENHANCEMENT FUNCTIONS =====

    // Enhanced User Management System
    function initializeUserManagement() {
        loadUserTable();
        initializeUserActions();
    }

    function loadUserTable() {
        const tbody = document.getElementById('userTableBody');
        if (!tbody) return;

        const enhancedDatabase = database.map(user => ({
            ...user,
            status: Math.random() > 0.2 ? 'Active' : 'Inactive',
            lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            email: `${user.name.toLowerCase()}@lynnsdatabase.local`,
            role: user.type === 'Admin' ? 'Admin' : Math.random() > 0.5 ? 'User' : 'Moderator'
        }));

        tbody.innerHTML = enhancedDatabase.map(user => `
            <tr data-user-id="${user.id}">
                <td><input type="checkbox" class="user-select" value="${user.id}"></td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${user.name.charAt(0)}</div>
                        <div>
                            <strong>${user.name}</strong>
                            <br><small>${user.email}</small>
                        </div>
                    </div>
                </td>
                <td><span class="role-badge ${user.role.toLowerCase()}">${user.role}</span></td>
                <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
                <td>${user.lastActive}</td>
                <td>
                    <div class="user-actions-dropdown">
                        <button class="action-dropdown-btn" onclick="toggleUserActions(${user.id})">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu" id="userActions${user.id}">
                            <button onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                            <button onclick="suspendUser(${user.id})"><i class="fas fa-ban"></i> Suspend</button>
                            <button onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add select all functionality
        const selectAllBtn = document.getElementById('selectAll');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('change', function () {
                const checkboxes = document.querySelectorAll('.user-select');
                checkboxes.forEach(cb => cb.checked = this.checked);
            });
        }
    }

    function initializeUserActions() {
        // Initialize user management event listeners
        document.addEventListener('click', function (e) {
            if (e.target.closest('.user-actions-dropdown')) return;
            // Close all dropdown menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        });
    }

    function showCreateUserModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h4><i class="fas fa-user-plus"></i> Create New User</h4>
                    <button class="modal-close" onclick="closeModal(this)">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="createUserForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Role *</label>
                                <select name="role" required>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Status *</label>
                                <select name="status" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password *</label>
                            <input type="password" name="password" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="action-btn secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="action-btn primary" onclick="createUser()">Create User</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function createUser() {
        const form = document.getElementById('createUserForm');
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        // Add user to database
        const newUser = {
            id: Date.now(),
            name: userData.name,
            type: userData.role,
            data: userData.role,
            email: userData.email,
            status: userData.status,
            lastActive: new Date().toLocaleDateString()
        };

        database.push(newUser);
        loadUserTable();
        closeModal(document.querySelector('.modal-overlay'));
        showNotification('User created successfully!', 'success');
    }

    function toggleUserActions(userId) {
        const menu = document.getElementById(`userActions${userId}`);
        const isVisible = menu.style.display === 'block';

        // Close all other menus
        document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');

        // Toggle current menu
        menu.style.display = isVisible ? 'none' : 'block';
    }

    function editUser(userId) {
        const user = database.find(u => u.id === userId);
        if (!user) return;

        showNotification(`Editing user: ${user.name}`, 'info');
        // Implementation for edit user modal
    }

    function suspendUser(userId) {
        const user = database.find(u => u.id === userId);
        if (!user) return;

        if (confirm(`Are you sure you want to suspend ${user.name}?`)) {
            showNotification(`User ${user.name} has been suspended`, 'warning');
            loadUserTable();
        }
    }

    function deleteUser(userId) {
        const user = database.find(u => u.id === userId);
        if (!user) return;

        if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            database = database.filter(u => u.id !== userId);
            loadUserTable();
            showNotification(`User ${user.name} has been deleted`, 'error');
        }
    }

    function bulkUserActions() {
        const selectedUsers = Array.from(document.querySelectorAll('.user-select:checked'));
        if (selectedUsers.length === 0) {
            showNotification('Please select users to perform bulk actions', 'warning');
            return;
        }

        const actions = ['Activate', 'Deactivate', 'Suspend', 'Delete'];
        const action = prompt(`Selected ${selectedUsers.length} users. Choose action:\n${actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`);

        if (action && actions[parseInt(action) - 1]) {
            showNotification(`${actions[parseInt(action) - 1]} action applied to ${selectedUsers.length} users`, 'info');
        }
    }

    function exportUsers() {
        const csvContent = "data:text/csv;charset=utf-8," +
            "Name,Email,Role,Status,Last Active\n" +
            database.map(user => `${user.name},${user.email || user.name + '@lynnsdatabase.local'},${user.type},Active,${new Date().toLocaleDateString()}`).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'users_export.csv');
        link.click();

        showNotification('User data exported successfully!', 'success');
    }

    // Advanced Search & Filtering
    let savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '{}');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    function toggleAdvancedSearch() {
        const advancedSearch = document.getElementById('advancedSearch');
        const isVisible = advancedSearch.style.display !== 'none';
        advancedSearch.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            advancedSearch.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Filter Dropdown Functionality
    window.toggleFilterDropdown = function() {
        console.log('🔽 toggleFilterDropdown called');
        
        const dropdown = document.getElementById('filterDropdown');
        const button = document.getElementById('filterDropdownBtn');
        const container = document.querySelector('.filter-dropdown-container');
        
        console.log('Elements found:', {
            dropdown: !!dropdown,
            button: !!button,
            container: !!container
        });
        
        if (!dropdown || !button || !container) {
            console.error('Missing dropdown elements!');
            return;
        }
        
        const isVisible = dropdown.style.display === 'block';
        console.log('Current visibility:', isVisible);
        
        if (isVisible) {
            // Hide dropdown
            dropdown.style.display = 'none';
            button.classList.remove('active');
            container.classList.remove('show');
            console.log('🔼 Dropdown hidden');
        } else {
            // Show dropdown
            dropdown.style.display = 'block';
            button.classList.add('active');
            container.classList.add('show');
            console.log('🔽 Dropdown shown');
        }
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const container = document.querySelector('.filter-dropdown-container');
        const dropdown = document.getElementById('filterDropdown');
        const button = document.getElementById('filterDropdownBtn');
        
        if (container && !container.contains(event.target)) {
            dropdown.style.display = 'none';
            button.classList.remove('active');
            container.classList.remove('show');
        }
    });

    // Apply filters from dropdown to contact search
    window.applyFilters = function() {
        console.log('Applying filters from dropdown');
        
        // Get values from dropdown filters
        const roleFilter = document.getElementById('roleFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        
        console.log('Selected filters - Role:', roleFilter, 'Status:', statusFilter);
        
        // Trigger the existing search function which will use these filter values
        const searchBtn = document.getElementById('searchUserBtn');
        if (searchBtn && typeof performSearch === 'function') {
            // Find the performSearch function in the initializeUserSearch scope
            const searchInput = document.getElementById('userSearchInput');
            if (searchInput) {
                // Trigger search event
                searchBtn.click();
            }
        }
        
        // Close the dropdown after applying filters
        const dropdown = document.getElementById('filterDropdown');
        const button = document.getElementById('filterDropdownBtn');
        const container = document.querySelector('.filter-dropdown-container');
        
        dropdown.style.display = 'none';
        button.classList.remove('active');
        container.classList.remove('show');
        
        // Show notification about applied filters
        let filterText = [];
        if (roleFilter) filterText.push(`Role: ${roleFilter}`);
        if (statusFilter) filterText.push(`Status: ${statusFilter}`);
        
        if (filterText.length > 0) {
            showNotification(`Filters applied: ${filterText.join(', ')}`, 'success');
        } else {
            showNotification('Showing all contacts', 'info');
        }
    };

    // Clear all filters in dropdown
    window.clearFilters = function() {
        console.log('Clearing all filters');
        
        // Reset dropdown filter values
        document.getElementById('roleFilter').value = '';
        document.getElementById('statusFilter').value = '';
        
        // Trigger search to show all results
        const searchBtn = document.getElementById('searchUserBtn');
        if (searchBtn && typeof performSearch === 'function') {
            searchBtn.click();
        }
        
        // Close the dropdown
        const dropdown = document.getElementById('filterDropdown');
        const button = document.getElementById('filterDropdownBtn');
        const container = document.querySelector('.filter-dropdown-container');
        
        dropdown.style.display = 'none';
        button.classList.remove('active');
        container.classList.remove('show');
        
        showNotification('All filters cleared', 'info');
    };

    function applyFilters() {
        const filters = {
            userType: document.getElementById('filterUserType')?.value || '',
            status: document.getElementById('filterStatus')?.value || '',
            registration: document.getElementById('filterRegistration')?.value || '',
            sortBy: document.getElementById('sortBy')?.value || 'name',
            sortOrder: document.getElementById('sortOrder')?.value || 'asc'
        };

        let filteredResults = [...database];

        // Apply filters
        if (filters.userType) {
            filteredResults = filteredResults.filter(user => user.type === filters.userType);
        }

        if (filters.status) {
            filteredResults = filteredResults.filter(user => {
                const userStatus = Math.random() > 0.2 ? 'Active' : 'Inactive';
                return userStatus.toLowerCase() === filters.status.toLowerCase();
            });
        }

        // Apply sorting
        filteredResults.sort((a, b) => {
            let aVal = a[filters.sortBy] || a.name;
            let bVal = b[filters.sortBy] || b.name;

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (filters.sortOrder === 'desc') {
                return bVal > aVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
        });

        displaySearchResults(filteredResults);
        showNotification(`Found ${filteredResults.length} results`, 'info');

        // Add to search history
        const searchQuery = Object.values(filters).filter(Boolean).join(' + ');
        if (searchQuery) {
            addToSearchHistory(searchQuery);
        }
    }

    function clearFilters() {
        document.getElementById('filterUserType').value = '';
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterRegistration').value = '';
        document.getElementById('sortBy').value = 'name';
        document.getElementById('sortOrder').value = 'asc';

        displaySearchResults(database);
        showNotification('Filters cleared', 'info');
    }

    function saveSearch() {
        const searchName = prompt('Enter a name for this search:');
        if (!searchName) return;

        const filters = {
            userType: document.getElementById('filterUserType')?.value || '',
            status: document.getElementById('filterStatus')?.value || '',
            registration: document.getElementById('filterRegistration')?.value || '',
            sortBy: document.getElementById('sortBy')?.value || 'name',
            sortOrder: document.getElementById('sortOrder')?.value || 'asc'
        };

        savedSearches[searchName] = filters;
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        updateSavedSearchTags();
        showNotification(`Search "${searchName}" saved!`, 'success');
    }

    function updateSavedSearchTags() {
        const container = document.getElementById('savedSearchTags');
        if (!container) return;

        container.innerHTML = Object.keys(savedSearches).map(name => `
            <span class="search-tag" onclick="loadSavedSearch('${name}')">
                <i class="fas fa-star"></i> ${name}
                <button class="remove-tag" onclick="removeSavedSearch('${name}')">&times;</button>
            </span>
        `).join('');
    }

    function loadSavedSearch(name) {
        const filters = savedSearches[name];
        if (!filters) return;

        Object.keys(filters).forEach(key => {
            const element = document.getElementById('filter' + key.charAt(0).toUpperCase() + key.slice(1)) ||
                document.getElementById(key);
            if (element) {
                element.value = filters[key];
            }
        });

        applyFilters();
        showNotification(`Loaded search: ${name}`, 'info');
    }

    function removeSavedSearch(name) {
        if (confirm(`Remove saved search "${name}"?`)) {
            delete savedSearches[name];
            localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
            updateSavedSearchTags();
            showNotification(`Search "${name}" removed`, 'info');
        }
    }

    function addToSearchHistory(query) {
        searchHistory.unshift({
            query: query,
            timestamp: new Date().toLocaleString(),
            results: database.length
        });

        // Keep only last 10 searches
        searchHistory = searchHistory.slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    // Analytics & Reporting
    function initializeAnalytics() {
        updateAnalyticsData();
        initializeCharts();
    }

    function updateAnalyticsData() {
        // Update stat cards
        document.getElementById('totalUsers').textContent = database.length;
        document.getElementById('activeUsers').textContent = Math.floor(database.length * 0.8);
        document.getElementById('dailyActivity').textContent = Math.floor(Math.random() * 50) + 10;
        document.getElementById('engagement').textContent = Math.floor(Math.random() * 30) + 70 + '%';
    }

    function initializeCharts() {
        // Animate chart bars
        setTimeout(() => {
            document.querySelectorAll('.chart-bar').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, index * 100);
            });
        }, 500);

        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress').forEach(progress => {
                const width = progress.style.width;
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            });
        }, 1000);
    }

    function generateReport(type) {
        showNotification(`Generating ${type.toUpperCase()} report...`, 'info');

        setTimeout(() => {
            if (type === 'pdf') {
                // Simulate PDF generation
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,Lynn\'s Database Analytics Report\n\nGenerated: ' + new Date().toLocaleString();
                link.download = 'analytics_report.txt';
                link.click();
            } else if (type === 'csv') {
                exportUsers();
                return;
            }

            showNotification(`${type.toUpperCase()} report generated successfully!`, 'success');
        }, 2000);
    }

    // Security Features
    let securitySettings = JSON.parse(localStorage.getItem('securitySettings') || '{}');
    let loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');

    function saveSecuritySettings() {
        const settings = {
            requireUppercase: document.getElementById('requireUppercase')?.checked || false,
            requireNumbers: document.getElementById('requireNumbers')?.checked || false,
            requireSymbols: document.getElementById('requireSymbols')?.checked || false,
            minPasswordLength: document.getElementById('minPasswordLength')?.value || 8,
            sessionTimeout: document.getElementById('sessionTimeout')?.value || 30,
            enableAutoLock: document.getElementById('enableAutoLock')?.checked || false,
            enableSecureCookies: document.getElementById('enableSecureCookies')?.checked || false,
            maxLoginAttempts: document.getElementById('maxLoginAttempts')?.value || 3,
            lockoutDuration: document.getElementById('lockoutDuration')?.value || 15,
            enable2FA: document.getElementById('enable2FA')?.checked || false
        };

        securitySettings = settings;
        localStorage.setItem('securitySettings', JSON.stringify(settings));
        showNotification('Security settings saved successfully!', 'success');
    }

    function auditSecurity() {
        showNotification('Running security audit...', 'info');

        setTimeout(() => {
            const issues = [];

            if (!securitySettings.requireUppercase) {
                issues.push('Password uppercase requirement is disabled');
            }
            if (!securitySettings.requireNumbers) {
                issues.push('Password number requirement is disabled');
            }
            if (securitySettings.sessionTimeout > 60) {
                issues.push('Session timeout is longer than recommended (60 minutes)');
            }

            if (issues.length === 0) {
                showNotification('Security audit passed! No issues found.', 'success');
            } else {
                showNotification(`Security audit found ${issues.length} issues. Check console for details.`, 'warning');
                console.log('Security Issues:', issues);
            }
        }, 2000);
    }

    // Notifications System
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    let notificationPrefs = JSON.parse(localStorage.getItem('notificationPrefs') || '{}');

    function saveNotificationPrefs() {
        const prefs = {
            emailNotifications: document.getElementById('emailNotifications')?.checked || false,
            pushNotifications: document.getElementById('pushNotifications')?.checked || false,
            smsNotifications: document.getElementById('smsNotifications')?.checked || false,
            activityAlerts: document.getElementById('activityAlerts')?.checked || false
        };

        notificationPrefs = prefs;
        localStorage.setItem('notificationPrefs', JSON.stringify(prefs));
        showNotification('Notification preferences saved!', 'success');
    }

    function clearNotifications() {
        if (confirm('Clear all notifications?')) {
            notifications = [];
            localStorage.setItem('notifications', JSON.stringify(notifications));
            updateNotificationsList();
            showNotification('All notifications cleared', 'info');
        }
    }

    function updateNotificationsList() {
        const container = document.getElementById('notificationsList');
        if (!container) return;

        if (notifications.length === 0) {
            container.innerHTML = '<p class="no-notifications">No notifications</p>';
            return;
        }

        container.innerHTML = notifications.slice(0, 10).map(notif => `
            <div class="notification-item">
                <div class="notification-icon ${notif.type}">
                    <i class="fas fa-${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <h6>${notif.title}</h6>
                    <p>${notif.message}</p>
                    <span class="notification-time">${notif.time}</span>
                </div>
            </div>
        `).join('');
    }

    function addNotification(title, message, type = 'info', icon = 'info') {
        const notification = {
            id: Date.now(),
            title,
            message,
            type,
            icon,
            time: new Date().toLocaleString(),
            read: false
        };

        notifications.unshift(notification);
        notifications = notifications.slice(0, 50); // Keep only last 50
        localStorage.setItem('notifications', JSON.stringify(notifications));
        updateNotificationsList();
    }

    // Utility Functions
    function closeModal(element) {
        const modal = element.closest('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    function displaySearchResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><p>No users found</p></div>';
            return;
        }

        container.innerHTML = results.map(user => `
            <div class="user-result-card">
                <div class="user-avatar">${user.name.charAt(0)}</div>
                <div class="user-details">
                    <h4>${user.name}</h4>
                    <p class="user-role">${user.type}</p>
                    <p class="user-description">${user.data}</p>
                </div>
                <div class="user-status">
                    <span class="status-badge ${Math.random() > 0.2 ? 'active' : 'inactive'}">
                        ${Math.random() > 0.2 ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    // Initialize all systems when main content is shown
    function initializeAllSystems() {
        initializeUserManagement();
        initializeAnalytics();
        updateSavedSearchTags();
        updateNotificationsList();

        // Add some sample notifications
        if (notifications.length === 0) {
            addNotification('Welcome!', 'Welcome to the enhanced Lynn\'s Database', 'success', 'check');
            addNotification('System Update', 'Database has been updated with new features', 'info', 'info-circle');
        }
    }

    // Enhanced tab switching with analytics
    function switchToTab(tabName) {
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none';
        });

        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabName + '-tab');
        const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);

        if (selectedTab && selectedBtn) {
            selectedTab.classList.add('active');
            selectedTab.style.display = 'block';
            selectedBtn.classList.add('active');

            // Initialize tab-specific functionality
            if (tabName === 'analytics') {
                initializeAnalytics();
            } else if (tabName === 'user-management') {
                loadUserTable();
            }

            // Track tab usage
            addNotification('Tab Switched', `Switched to ${tabName} tab`, 'info', 'eye');
        }
    }

    // Enhanced customization tabs functionality
    function showCustomizationTabs() {
        const accountPage = document.getElementById('accountPage');
        if (accountPage) {
            accountPage.style.display = 'block';
            initializeAllSystems();

            // Setup tab click handlers
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const tabName = this.getAttribute('data-tab');
                    switchToTab(tabName);
                });
            });
        }
    }

    // Make functions available globally
    window.showNotification = showNotification;
    window.showCustomizationTabs = showCustomizationTabs;
    window.exportUserData = exportUserData;
    // Messages System
    function showMessages() {
        // Create messages modal if it doesn't exist
        let messagesModal = document.getElementById('messagesModal');
        if (!messagesModal) {
            messagesModal = createMessagesModal();
            document.body.appendChild(messagesModal);
            
            // The close button now uses direct onclick in the HTML for reliability
            
            // Add click outside to close
            messagesModal.onclick = function(e) {
                if (e.target === messagesModal) {
                    messagesModal.style.display = 'none';
                }
            };
        }
        
        // Show the modal
        messagesModal.style.display = 'block';
        loadMessages();
        
        // Hide message badge when opened
        const messageBadge = document.getElementById('messageBadge');
        if (messageBadge) {
            messageBadge.style.display = 'none';
        }
    }

    function createMessagesModal() {
        const modal = document.createElement('div');
        modal.id = 'messagesModal';
        modal.className = 'modal messages-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-envelope"></i> Messages</h2>
                    <button onclick="document.getElementById('messagesModal').style.display='none';" style="background: none; border: none; font-size: 28px; cursor: pointer; padding: 8px 12px; color: #666; z-index: 9999; position: relative; border-radius: 4px; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.1)'; this.style.color='#333';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#666';" title="Close Messages">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="messages-container">
                        <div class="messages-list" id="messagesList">
                            <!-- Messages will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    function loadMessages() {
        const messagesList = document.getElementById('messagesList');
        if (!messagesList) return;

        // Sample messages - in a real app, this would come from a server
        const messages = [
            {
                id: 1,
                from: 'System',
                subject: 'Welcome to Lynn\'s Database!',
                message: 'Thank you for joining our platform. Explore the features and manage your data efficiently.',
                time: '2 hours ago',
                read: false,
                type: 'system'
            },
            {
                id: 2,
                from: 'Michael',
                subject: 'Friend Request',
                message: 'Hey! I\'d like to connect with you on the platform. Let\'s collaborate!',
                time: '1 day ago',
                read: false,
                type: 'friend-request'
            },
            {
                id: 3,
                from: 'Admin',
                subject: 'Platform Update',
                message: 'New features have been added to improve your experience. Check them out!',
                time: '3 days ago',
                read: true,
                type: 'notification'
            }
        ];

        messagesList.innerHTML = messages.map(message => `
            <div class="message-item ${!message.read ? 'unread' : ''}" data-message-id="${message.id}">
                <div class="message-header">
                    <div class="message-from">
                        <i class="fas ${getMessageIcon(message.type)}"></i>
                        <strong>${message.from}</strong>
                    </div>
                    <div class="message-time">${message.time}</div>
                </div>
                <div class="message-subject">${message.subject}</div>
                <div class="message-preview">${message.message}</div>
                <div class="message-actions">
                    ${message.type === 'friend-request' ? 
                        '<button class="btn-accept" onclick="acceptFriendRequest(' + message.id + ')">Accept</button><button class="btn-decline" onclick="declineFriendRequest(' + message.id + ')">Decline</button>' : 
                        '<button class="btn-read" onclick="markAsRead(' + message.id + ')">Mark as Read</button>'
                    }
                    <button class="btn-delete" onclick="deleteMessage(' + message.id + ')">Delete</button>
                </div>
            </div>
        `).join('');

        // Update badge count
        updateMessageBadge();
    }

    function getMessageIcon(type) {
        switch (type) {
            case 'system': return 'fa-cog';
            case 'friend-request': return 'fa-user-plus';
            case 'notification': return 'fa-bell';
            default: return 'fa-envelope';
        }
    }

    function updateMessageBadge() {
        const messageBadge = document.getElementById('messageBadge');
        // Count unread messages (in a real app, this would be from server data)
        const unreadCount = 2; // Sample count
        
        if (messageBadge && unreadCount > 0) {
            messageBadge.textContent = unreadCount;
            messageBadge.style.display = 'flex';
        } else if (messageBadge) {
            messageBadge.style.display = 'none';
        }
    }

    window.showMessages = showMessages;
    window.closeMessagesModal = function() {
        const modal = document.getElementById('messagesModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };
    window.acceptFriendRequest = function(id) {
        showNotification('Friend request accepted!', 'success');
        loadMessages(); // Refresh messages
    };
    window.declineFriendRequest = function(id) {
        showNotification('Friend request declined.', 'info');
        loadMessages(); // Refresh messages
    };
    window.markAsRead = function(id) {
        showNotification('Message marked as read.', 'info');
        loadMessages(); // Refresh messages
    };
    window.deleteMessage = function(id) {
        showNotification('Message deleted.', 'info');
        loadMessages(); // Refresh messages
    };

    window.importUserData = importUserData;
    window.clearAllData = clearAllData;
    
    // Debug function to check button status
    window.checkLogoutButton = function() {
        const btn = document.getElementById('logoutBtn');
        console.log('Logout button element:', btn);
        console.log('Button visible:', btn ? window.getComputedStyle(btn).display : 'not found');
        console.log('Button onclick:', btn ? btn.onclick : 'N/A');
        console.log('IsLoggedIn:', localStorage.getItem('isLoggedIn'));
        console.log('CurrentUser:', localStorage.getItem('currentUser'));
        return btn;
    };
    
    window.logout = window.handleLogout; // Keep backward compatibility
    window.initializeProfileSystem = initializeProfileSystem;
    window.toggleAdvancedSearch = toggleAdvancedSearch;
    window.clearFilters = clearFilters;
    window.saveSearch = saveSearch;
    window.loadSavedSearch = loadSavedSearch;
    window.removeSavedSearch = removeSavedSearch;
    window.showCreateUserModal = showCreateUserModal;
    window.createUser = createUser;
    window.toggleUserActions = toggleUserActions;
    window.editUser = editUser;
    window.suspendUser = suspendUser;
    window.deleteUser = deleteUser;
    window.bulkUserActions = bulkUserActions;
    window.exportUsers = exportUsers;
    window.generateReport = generateReport;
    window.saveSecuritySettings = saveSecuritySettings;
    window.auditSecurity = auditSecurity;
    window.saveNotificationPrefs = saveNotificationPrefs;
    window.clearNotifications = clearNotifications;
    window.closeModal = closeModal;

    // toggleFavorite function is now defined at the top of the file

    window.removeContact = function(contactId) {
        const contact = globalContacts.find(c => c.id === contactId);
        if (contact) {
            if (confirm(`Are you sure you want to remove ${contact.name} from your contacts?`)) {
                const card = document.querySelector(`[data-contact-id="${contactId}"]`);
                if (card) {
                    card.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        card.remove();
                        showNotification(`${contact.name} removed from contacts`);
                    }, 300);
                }
                // Remove from globalContacts array
                const index = globalContacts.findIndex(c => c.id === contactId);
                if (index > -1) {
                    globalContacts.splice(index, 1);
                }
            }
        }
    };

    window.toggleContactSelection = function(contactId) {
        const checkbox = document.querySelector(`input[data-contact-id="${contactId}"]`);
        const contactCard = document.querySelector(`[data-contact-id="${contactId}"]`);
        
        if (checkbox && contactCard) {
            if (checkbox.checked) {
                contactCard.classList.add('selected');
            } else {
                contactCard.classList.remove('selected');
            }
        }
    };

    window.sendMessage = function(contactId) {
        const contact = globalContacts.find(c => c.id === contactId);
        if (contact) {
            showNotification(`Opening message to ${contact.name}`);
        }
    };
});

// Note: globalContacts is already defined at the top of the file with interests data

// Global view contact profile function (outside DOMContentLoaded for onclick access)
window.viewContactProfile = function(contactId) {
    console.log('🔍 viewContactProfile called with ID:', contactId);
    
    // Convert contactId to number if it's a string
    const numericId = parseInt(contactId);
    
    // Find the contact
    const contact = window.globalContacts.find(c => c.id == contactId || c.id == numericId);
    console.log('📋 Found contact:', contact);
    
    if (contact) {
        // Update last viewed timestamp using ContactsManager if available
        if (window.ContactsManager && window.ContactsManager.updateLastViewed) {
            window.ContactsManager.updateLastViewed(contactId);
        }
        
        // Store current contact ID for action buttons
        window.currentContactId = contactId;
        
        // Populate contact details
        const nameEl = document.getElementById('contactDetailsName');
        const roleEl = document.getElementById('contactDetailsRole');
        const emailEl = document.getElementById('contactDetailsEmail');
        const phoneEl = document.getElementById('contactDetailsPhone');
        const birthdayEl = document.getElementById('contactDetailsBirthday');
        const bioEl = document.getElementById('contactDetailsBio');
        const statusEl = document.getElementById('contactDetailsStatus');
        
        if (nameEl) nameEl.textContent = contact.name;
        if (roleEl) roleEl.textContent = contact.role;
        if (emailEl) emailEl.textContent = contact.email;
        if (phoneEl) phoneEl.textContent = contact.phone || 'No phone number available';
        if (birthdayEl) {
            // Format birthday nicely
            if (contact.birthday) {
                const date = new Date(contact.birthday);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                birthdayEl.textContent = date.toLocaleDateString('en-US', options);
            } else {
                birthdayEl.textContent = 'No birthday available';
            }
        }
        if (bioEl) bioEl.textContent = contact.bio || 'No bio available';
        
        // Setup edit functionality for contact details
        setupContactDetailEditing(contact.id);
        
        // Populate interests dropdowns
        const videogamesDropdown = document.getElementById('videogamesDropdown');
        const physicalGamesDropdown = document.getElementById('physicalGamesDropdown');
        const mediaDropdown = document.getElementById('mediaDropdown');
        
        if (contact.interests) {
            // Populate video games dropdown
            if (videogamesDropdown && contact.interests.videogames) {
                videogamesDropdown.innerHTML = '<option value="">Select video game interest</option>';
                contact.interests.videogames.forEach(game => {
                    const option = document.createElement('option');
                    option.value = game;
                    option.textContent = game;
                    videogamesDropdown.appendChild(option);
                });
            }
            
            // Populate physical games dropdown
            if (physicalGamesDropdown && contact.interests.physicalGames) {
                physicalGamesDropdown.innerHTML = '<option value="">Select physical game interest</option>';
                contact.interests.physicalGames.forEach(game => {
                    const option = document.createElement('option');
                    option.value = game;
                    option.textContent = game;
                    physicalGamesDropdown.appendChild(option);
                });
            }
            
            // Populate media dropdown
            if (mediaDropdown && contact.interests.media) {
                mediaDropdown.innerHTML = '<option value="">Select media interest</option>';
                contact.interests.media.forEach(mediaItem => {
                    const option = document.createElement('option');
                    option.value = mediaItem;
                    option.textContent = mediaItem;
                    mediaDropdown.appendChild(option);
                });
            }
        }
        
        // Update status indicator
        if (statusEl) {
            statusEl.textContent = contact.status;
            statusEl.className = `status-indicator ${contact.status.toLowerCase()}`;
        }
        
        // Update favorite button
        const favoriteIcon = document.getElementById('detailsFavoriteIcon');
        const favoriteText = document.getElementById('detailsFavoriteText');
        if (favoriteIcon && favoriteText) {
            if (contact.favorite) {
                favoriteIcon.className = 'fas fa-star';
                favoriteText.textContent = 'Remove from Favorites';
            } else {
                favoriteIcon.className = 'far fa-star';
                favoriteText.textContent = 'Add to Favorites';
            }
        }
        
        // Hide main page and show contact details page
        console.log('🔄 Switching to contact details page');
        const mainPage = document.getElementById('mainPage');
        const detailsPage = document.getElementById('contactDetailsPage');
        console.log('📄 Main page element:', mainPage);
        console.log('📄 Details page element:', detailsPage);
        
        if (mainPage) mainPage.style.display = 'none';
        if (detailsPage) detailsPage.style.display = 'block';
        
        if (window.showNotification) {
            window.showNotification(`Viewing ${contact.name}'s profile`);
        }
    } else {
        console.error('Contact not found for ID:', contactId);
        alert('Contact not found for ID: ' + contactId);
        if (window.showNotification) {
            window.showNotification('Contact not found!', 'error');
        }
    }
};

// Contact Detail Editing Functionality
function setupContactDetailEditing(contactId) {
    // Setup edit icons click handlers
    const editIcons = document.querySelectorAll('.edit-icon');
    editIcons.forEach(icon => {
        // Remove existing listeners to avoid duplicates
        icon.replaceWith(icon.cloneNode(true));
    });
    
    // Re-select icons after cloning
    const freshEditIcons = document.querySelectorAll('.edit-icon');
    freshEditIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const title = icon.getAttribute('title');
            if (title.includes('Email')) {
                editContactEmail(contactId);
            } else if (title.includes('Phone')) {
                editContactPhone(contactId);
            } else if (title.includes('Birthday')) {
                editContactBirthday(contactId);
            } else if (title.includes('Bio')) {
                editContactBio(contactId);
            }
        });
    });
}

function editContactEmail(contactId) {
    const contact = window.globalContacts.find(c => c.id == contactId);
    if (!contact) return;
    
    const currentEmail = contact.email;
    
    // Create a modal for email editing
    const modal = createEmailEditModal(currentEmail, (newEmail) => {
        if (newEmail === null) return; // User cancelled
        
        if (validateEmail(newEmail)) {
            // Update the contact data
            contact.email = newEmail;
            
            // Update the display
            const emailEl = document.getElementById('contactDetailsEmail');
            if (emailEl) {
                emailEl.textContent = newEmail;
                // Add visual feedback
                const container = emailEl.closest('.contact-detail-inline');
                if (container) {
                    container.classList.add('updated');
                    setTimeout(() => container.classList.remove('updated'), 1000);
                }
            }
            
            // Show success notification
            if (window.showNotification) {
                window.showNotification(`Email updated to ${newEmail}`, 'success');
            }
            
            // Save to localStorage for persistence
            saveContactUpdates();
        } else {
            alert('Please enter a valid email address (e.g., user@example.com)');
        }
    });
}

function editContactPhone(contactId) {
    const contact = window.globalContacts.find(c => c.id == contactId);
    if (!contact) return;
    
    const currentPhone = contact.phone;
    
    // Create a modal for phone editing
    const modal = createPhoneEditModal(currentPhone, (newPhone) => {
        if (newPhone === null) return; // User cancelled
        
        if (validatePhone(newPhone)) {
            // Format the phone number
            const formattedPhone = formatPhoneNumber(newPhone);
            
            // Update the contact data
            contact.phone = formattedPhone;
            
            // Update the display
            const phoneEl = document.getElementById('contactDetailsPhone');
            if (phoneEl) {
                phoneEl.textContent = formattedPhone;
                // Add visual feedback
                const container = phoneEl.closest('.contact-detail-inline');
                if (container) {
                    container.classList.add('updated');
                    setTimeout(() => container.classList.remove('updated'), 1000);
                }
            }
            
            // Show success notification
            if (window.showNotification) {
                window.showNotification(`Phone updated to ${formattedPhone}`, 'success');
            }
            
            // Save to localStorage for persistence
            saveContactUpdates();
        } else {
            alert('Please enter a valid phone number with 10-11 digits (e.g., +1 555 123 4567 or 555-123-4567)');
        }
    });
}

function editContactBirthday(contactId) {
    const contact = window.globalContacts.find(c => c.id == contactId);
    if (!contact) return;
    
    // Convert current birthday to MM/DD/YYYY format for display
    let currentBirthday = '';
    if (contact.birthday) {
        const date = new Date(contact.birthday);
        currentBirthday = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    
    // Create a modal for birthday editing
    const modal = createBirthdayEditModal(currentBirthday, (newBirthday) => {
        if (newBirthday === null) return; // User cancelled
        
        if (validateBirthday(newBirthday)) {
            // Convert to ISO format for storage
            const [month, day, year] = newBirthday.split('/');
            const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            
            // Update the contact data
            contact.birthday = isoDate;
            
            // Update the display with formatted date
            const birthdayEl = document.getElementById('contactDetailsBirthday');
            if (birthdayEl) {
                const date = new Date(isoDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                birthdayEl.textContent = date.toLocaleDateString('en-US', options);
                // Add visual feedback
                const container = birthdayEl.closest('.contact-detail-inline');
                if (container) {
                    container.classList.add('updated');
                    setTimeout(() => container.classList.remove('updated'), 1000);
                }
            }
            
            // Show success notification
            if (window.showNotification) {
                window.showNotification(`Birthday updated to ${newBirthday}`, 'success');
            }
            
            // Save to localStorage for persistence
            saveContactUpdates();
        } else {
            alert('Please enter a valid date in MM/DD/YYYY format (e.g., 12/25/1990)');
        }
    });
}

function editContactBio(contactId) {
    const contact = window.globalContacts.find(c => c.id == contactId);
    if (!contact) return;
    
    const currentBio = contact.bio || '';
    
    // Create a modal for better bio editing experience
    const modal = createBioEditModal(currentBio, (newBio) => {
        if (newBio === null) return; // User cancelled
        
        if (validateBio(newBio)) {
            // Update the contact data
            contact.bio = newBio;
            
            // Update the display
            const bioEl = document.getElementById('contactDetailsBio');
            if (bioEl) {
                bioEl.textContent = newBio || 'No bio available';
                // Add visual feedback
                const container = bioEl.closest('.contact-detail-inline');
                if (container) {
                    container.classList.add('updated');
                    setTimeout(() => container.classList.remove('updated'), 1000);
                }
            }
            
            // Show success notification
            if (window.showNotification) {
                window.showNotification('Bio updated successfully', 'success');
            }
            
            // Save to localStorage for persistence
            saveContactUpdates();
        } else {
            alert('Bio must be between 1 and 500 characters long');
        }
    });
}

function createBioEditModal(currentBio, onSave) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'bio-edit-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'bio-edit-modal';
    modal.style.cssText = `
        background: var(--bg-primary);
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Create modal header
    const header = document.createElement('h3');
    header.textContent = 'Edit Bio';
    header.style.cssText = `
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    header.textContent = 'Edit Bio';
    
    // Create textarea
    const textarea = document.createElement('textarea');
    textarea.value = currentBio;
    textarea.placeholder = 'Enter bio information...';
    textarea.style.cssText = `
        width: 100%;
        min-height: 120px;
        padding: 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 1rem;
        line-height: 1.6;
        resize: vertical;
        font-family: inherit;
        margin-bottom: 1rem;
    `;
    
    // Character counter
    const counter = document.createElement('div');
    counter.style.cssText = `
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
        text-align: right;
    `;
    
    function updateCounter() {
        const length = textarea.value.length;
        counter.textContent = `${length}/500 characters`;
        if (length > 500) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
    
    // Create buttons container
    const buttons = document.createElement('div');
    buttons.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    `;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = `
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Add event listeners
    saveBtn.addEventListener('click', () => {
        onSave(textarea.value.trim());
        document.body.removeChild(overlay);
    });
    
    cancelBtn.addEventListener('click', () => {
        onSave(null);
        document.body.removeChild(overlay);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            onSave(null);
            document.body.removeChild(overlay);
        }
    });
    
    // Assemble modal
    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(textarea);
    modal.appendChild(counter);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus textarea
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    
    return overlay;
}

function createEmailEditModal(currentEmail, onSave) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'email-edit-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'email-edit-modal';
    modal.style.cssText = `
        background: var(--bg-primary);
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Create modal header
    const header = document.createElement('h3');
    header.textContent = 'Edit Email Address';
    header.style.cssText = `
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'email';
    input.value = currentEmail;
    input.placeholder = 'Enter email address...';
    input.style.cssText = `
        width: 100%;
        padding: 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 1rem;
    `;
    
    // Create buttons container
    const buttons = document.createElement('div');
    buttons.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    `;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = `
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Add event listeners
    saveBtn.addEventListener('click', () => {
        onSave(input.value.trim());
        document.body.removeChild(overlay);
    });
    
    cancelBtn.addEventListener('click', () => {
        onSave(null);
        document.body.removeChild(overlay);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            onSave(null);
            document.body.removeChild(overlay);
        }
    });
    
    // Assemble modal
    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(input);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus input
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    
    return overlay;
}

function createPhoneEditModal(currentPhone, onSave) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'phone-edit-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'phone-edit-modal';
    modal.style.cssText = `
        background: var(--bg-primary);
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Create modal header
    const header = document.createElement('h3');
    header.textContent = 'Edit Phone Number';
    header.style.cssText = `
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'tel';
    input.value = currentPhone;
    input.placeholder = 'Enter phone number (e.g., +1 555 123 4567)';
    input.style.cssText = `
        width: 100%;
        padding: 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 0.5rem;
    `;
    
    // Create help text
    const helpText = document.createElement('div');
    helpText.textContent = 'Format: 10-11 digits (e.g., +1 555 123 4567 or 555-123-4567)';
    helpText.style.cssText = `
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
    `;
    
    // Create buttons container
    const buttons = document.createElement('div');
    buttons.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    `;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = `
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Add event listeners
    saveBtn.addEventListener('click', () => {
        onSave(input.value.trim());
        document.body.removeChild(overlay);
    });
    
    cancelBtn.addEventListener('click', () => {
        onSave(null);
        document.body.removeChild(overlay);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            onSave(null);
            document.body.removeChild(overlay);
        }
    });
    
    // Assemble modal
    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(input);
    modal.appendChild(helpText);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus input
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    
    return overlay;
}

function createBirthdayEditModal(currentBirthday, onSave) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'birthday-edit-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'birthday-edit-modal';
    modal.style.cssText = `
        background: var(--bg-primary);
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Create modal header
    const header = document.createElement('h3');
    header.textContent = 'Edit Birthday';
    header.style.cssText = `
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentBirthday;
    input.placeholder = 'MM/DD/YYYY (e.g., 12/25/1990)';
    input.style.cssText = `
        width: 100%;
        padding: 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 0.5rem;
    `;
    
    // Create help text
    const helpText = document.createElement('div');
    helpText.textContent = 'Format: MM/DD/YYYY (e.g., 12/25/1990)';
    helpText.style.cssText = `
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
    `;
    
    // Create buttons container
    const buttons = document.createElement('div');
    buttons.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    `;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = `
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Add event listeners
    saveBtn.addEventListener('click', () => {
        onSave(input.value.trim());
        document.body.removeChild(overlay);
    });
    
    cancelBtn.addEventListener('click', () => {
        onSave(null);
        document.body.removeChild(overlay);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            onSave(null);
            document.body.removeChild(overlay);
        }
    });
    
    // Assemble modal
    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(input);
    modal.appendChild(helpText);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus input
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    
    return overlay;
}

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validatePhone(phone) {
    // Remove all non-digit characters to count digits
    const digitsOnly = phone.replace(/\D/g, '');
    // Allow 10 digits (US) or 11 digits (with country code)
    return digitsOnly.length >= 10 && digitsOnly.length <= 11;
}

function validateBirthday(birthday) {
    // Check MM/DD/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(birthday)) return false;
    
    // Check if it's a valid date
    const [month, day, year] = birthday.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Verify the date components match (handles invalid dates like 02/30/2020)
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day &&
           year >= 1900 && year <= new Date().getFullYear();
}

function validateBio(bio) {
    // Bio can be empty or between 1-500 characters
    return bio.length <= 500;
}

function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length === 10) {
        // Format as (555) 123-4567
        return `+1 (${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
        // Format as +1 (555) 123-4567
        return `+1 (${digitsOnly.substring(1, 4)}) ${digitsOnly.substring(4, 7)}-${digitsOnly.substring(7)}`;
    } else {
        // Return original if it doesn't match expected patterns
        return phone;
    }
}

function saveContactUpdates() {
    // Save updated contacts to localStorage for persistence
    localStorage.setItem('globalContacts', JSON.stringify(window.globalContacts));
    console.log('💾 Contact updates saved to localStorage');
}

// Load saved contact updates on page load
function loadContactUpdates() {
    const savedContacts = localStorage.getItem('globalContacts');
    if (savedContacts) {
        try {
            const parsedContacts = JSON.parse(savedContacts);
            // Merge with existing contacts, keeping any new properties
            parsedContacts.forEach(savedContact => {
                const existingContact = window.globalContacts.find(c => c.id === savedContact.id);
                if (existingContact) {
                    // Update existing contact with saved data
                    Object.assign(existingContact, savedContact);
                }
            });
            console.log('📂 Loaded saved contact updates from localStorage');
        } catch (error) {
            console.error('Error loading saved contacts:', error);
        }
    }
}

// Load saved contacts when the page loads
window.addEventListener('load', loadContactUpdates);

// Use the globalContacts as the main contacts array
window.contacts = window.globalContacts;

// Load favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('contactFavorites');
    if (savedFavorites) {
        try {
            const favorites = JSON.parse(savedFavorites);
            console.log('📋 Loading favorites from localStorage:', favorites);
            window.contacts.forEach(contact => {
                contact.favorite = favorites[contact.id] || false;
                console.log(`📞 ${contact.name} favorite: ${contact.favorite}`);
            });
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    } else {
        console.log('📋 No saved favorites found, using defaults');
    }
}

// Save favorites to localStorage
function saveFavorites() {
    const favorites = {};
    window.contacts.forEach(contact => {
        if (contact.favorite) {
            favorites[contact.id] = true;
        }
    });
    localStorage.setItem('contactFavorites', JSON.stringify(favorites));
}

// Update the contacts display to show only favorites
function updateContactsDisplay() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;

    const favoriteContacts = window.contacts.filter(contact => contact.favorite);
    
    if (favoriteContacts.length === 0) {
        favoritesGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-star" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                <h3>No Favorite Contacts</h3>
                <p>Click the star button on any contact to add them to your favorites.</p>
            </div>
        `;
        return;
    }

    favoritesGrid.innerHTML = favoriteContacts.map(contact => `
        <div class="contact-card favorite" data-contact-id="${contact.id}">
            <div class="contact-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p class="contact-role">${contact.role}</p>
                <p class="contact-status ${contact.status}">${contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</p>
            </div>
            <div class="contact-actions">
                <button class="contact-btn view-btn" title="View Contact" onclick="viewContactProfile(${contact.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="contact-btn" title="Send Message" onclick="sendMessage(${contact.id})">
                    <i class="fas fa-envelope"></i>
                </button>
                <button class="contact-btn favorite-btn active" title="Remove from Favorites" onclick="toggleFavorite(${contact.id})">
                    <i class="fas fa-star"></i>
                </button>
                <button class="contact-btn delete-btn" onclick="removeContact(${contact.id})" title="Delete Contact">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Clear search and return to favorites view
function clearSearch() {
    console.log('🔄 Clearing search and returning to favorites view');
    const searchInput = document.getElementById('userSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    initializeFavoriteCards(); // Show only favorites
}

// Search and Browse All Contacts Functionality
function searchContacts() {
    const searchInput = document.getElementById('userSearchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        // If no search query, show favorites only
        updateExistingContactCards();
        return;
    }
    
    // Show all contacts that match the search query (for favoriting)
    showAllContactsForSearch(query);
}

function showAllContactsForSearch(query = '') {
    console.log('🔍 showAllContactsForSearch called with query:', query);
    
    if (!query) {
        // If no search query, show ALL contacts for browsing
        console.log('📋 No query - showing all contacts for browsing');
        window.contacts.forEach(contact => {
            const contactCard = document.querySelector(`[data-contact-id="${contact.id}"]`);
            if (contactCard) {
                contactCard.style.display = 'flex';
                console.log(`👀 Showing ${contact.name} for browsing`);
            }
        });
        return;
    }
    
    // Filter contacts based on search query
    const matchingContacts = window.contacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.role.toLowerCase().includes(query.toLowerCase()) ||
        contact.status.toLowerCase().includes(query.toLowerCase())
    );
    
    console.log(`🔍 Found ${matchingContacts.length} contacts matching "${query}"`);
    
    // Show/hide contacts based on search results
    window.contacts.forEach(contact => {
        const contactCard = document.querySelector(`[data-contact-id="${contact.id}"]`);
        if (contactCard) {
            const matches = matchingContacts.find(c => c.id === contact.id);
            contactCard.style.display = matches ? 'flex' : 'none';
            if (matches) {
                console.log(`✅ Showing search result: ${contact.name}`);
            }
        }
    });
    
    // If no matches, show message (but don't replace HTML)
    if (matchingContacts.length === 0) {
        console.log('❌ No matches found for search query');
    }
}

// clearSearch function already defined above

// Initialize search functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('userSearchInput');
    const searchBtn = document.getElementById('searchUserBtn');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', searchContacts);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchContacts();
            }
        });
        
        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            // Debounce the search to avoid too many calls
            clearTimeout(window.searchTimeout);
            window.searchTimeout = setTimeout(searchContacts, 300);
        });
        
        console.log('🔍 Contact search functionality initialized');
    }
});

// Initialize favorites system on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Initializing favorites system...');
    loadFavorites();
    updateExistingContactCards();
    
    // Set up search functionality
    const searchInput = document.getElementById('userSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchContacts);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchContacts();
            }
        });
    }
});

// Update existing HTML contact cards instead of replacing them
function updateExistingContactCards() {
    console.log('🔄 Updating existing contact cards...');
    
    // Hide non-favorite contacts and update favorite button states
    window.contacts.forEach(contact => {
        const contactCard = document.querySelector(`[data-contact-id="${contact.id}"]`);
        if (contactCard) {
            // Show/hide based on favorite status
            if (contact.favorite) {
                contactCard.style.display = 'flex';
            } else {
                contactCard.style.display = 'none';
            }
            
            // Update favorite button appearance
            const favoriteBtn = contactCard.querySelector('.favorite-btn');
            const favoriteIcon = favoriteBtn?.querySelector('i');
            
            if (favoriteBtn && favoriteIcon) {
                if (contact.favorite) {
                    favoriteBtn.classList.add('active');
                    favoriteBtn.setAttribute('title', 'Remove from Favorites');
                    favoriteIcon.className = 'fas fa-star';
                } else {
                    favoriteBtn.classList.remove('active');
                    favoriteBtn.setAttribute('title', 'Add to Favorites');
                    favoriteIcon.className = 'far fa-star';
                }
            }
        }
    });
}

// Make functions available globally
window.clearSearch = clearSearch;
window.updateExistingContactCards = updateExistingContactCards;

// Debug function to check system state
window.debugFavorites = function() {
    console.log('=== FAVORITES DEBUG ===');
    console.log('Window contacts:', window.contacts);
    console.log('Saved favorites:', localStorage.getItem('contactFavorites'));
    if (window.contacts) {
        window.contacts.forEach(contact => {
            const card = document.querySelector(`[data-contact-id="${contact.id}"]`);
            console.log(`${contact.name} (ID: ${contact.id}): favorite = ${contact.favorite}, visible = ${card ? card.style.display : 'no card'}`);
        });
    } else {
        console.error('window.contacts is not defined!');
    }
};

// Test function to verify clicking works
window.testStarButton = function() {
    console.log('🧪 Testing star button functionality...');
    console.log('Current state:');
    window.debugFavorites();
    
    console.log('Testing toggle on Lynn Davis (ID: 1)...');
    window.toggleFavorite(1);
    
    console.log('State after toggle:');
    window.debugFavorites();
};

// Complete system status check
window.systemStatus = function() {
    console.log('=== FAVORITES SYSTEM STATUS ===');
    
    // Check contacts
    console.log('📞 Total contacts:', window.contacts?.length || 0);
    
    // Check favorites
    const favorites = window.contacts?.filter(c => c.favorite) || [];
    console.log('⭐ Current favorites:', favorites.map(c => c.name).join(', ') || 'None');
    
    // Check visible cards
    let visibleCount = 0;
    let hiddenCount = 0;
    
    window.contacts?.forEach(contact => {
        const card = document.querySelector(`[data-contact-id="${contact.id}"]`);
        if (card) {
            if (card.style.display === 'none') {
                hiddenCount++;
                console.log(`❌ Hidden: ${contact.name} (favorite: ${contact.favorite})`);
            } else {
                visibleCount++;
                console.log(`✅ Visible: ${contact.name} (favorite: ${contact.favorite})`);
            }
        } else {
            console.log(`❓ No card found for: ${contact.name}`);
        }
    });
    
    console.log(`👀 Card status: ${visibleCount} visible, ${hiddenCount} hidden`);
    console.log(`💾 localStorage favorites: ${localStorage.getItem('contactFavorites')}`);
    
    // Check if system is working correctly
    if (favorites.length === visibleCount) {
        console.log('✅ SYSTEM STATUS: WORKING CORRECTLY - Only favorites are visible');
    } else {
        console.log('❌ SYSTEM STATUS: ISSUE - Visible cards do not match favorites');
    }
};

// Simple test function
window.testClick = function(id) {
    console.log('🧪 TEST CLICK for ID:', id);
    alert('Test click works! ID: ' + id);
};

