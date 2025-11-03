// Enhanced Database Website JavaScript
document.addEventListener('DOMContentLoaded', function () {
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
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMainContent();
    }

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
        initializeAccountFeatures();
        updateMessageBadge();
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
        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                location.reload();
            });
        }

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

    function initializeMainPage() {
        // Initialize page navigation
        initializePageNavigation();

        // Initialize contact search functionality
        initializeUserSearch();

        // Initialize contacts functionality
        initializeContacts();

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

    // Global Contacts Management System
    let globalContacts = [
        { id: 1, name: 'Lynn Davis', role: 'Administrator', status: 'online', favorite: true, lastViewed: Date.now() - 7200000, email: 'lynn@lynnsdatabase.local' },
        { id: 2, name: 'Michael Johnson', role: 'User', status: 'away', favorite: false, lastViewed: Date.now() - 3600000, email: 'michael@lynnsdatabase.local' },
        { id: 3, name: 'Sarah Wilson', role: 'Manager', status: 'offline', favorite: false, lastViewed: Date.now() - 86400000, email: 'sarah@lynnsdatabase.local' },
        { id: 4, name: 'Alex Thompson', role: 'User', status: 'online', favorite: false, lastViewed: Date.now() - 7200000, email: 'alex@lynnsdatabase.local' },
        { id: 5, name: 'Emma Rodriguez', role: 'Manager', status: 'away', favorite: false, lastViewed: Date.now() - 86400000, email: 'emma@lynnsdatabase.local' },
        { id: 6, name: 'David Chen', role: 'User', status: 'offline', favorite: false, lastViewed: Date.now() - 259200000, email: 'david@lynnsdatabase.local' }
    ];

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
                department: user.department || 'Unknown'
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
            return globalContacts.find(c => c.id === contactId);
        },

        // Update contact's favorite status
        toggleFavorite: function(contactId) {
            const contact = globalContacts.find(c => c.id === contactId);
            if (contact) {
                contact.favorite = !contact.favorite;
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
            updateContactsDisplay();
            updateContactSearchResults();
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
                    <button class="quick-view-btn" title="Quick View" onclick="viewContactProfile(${contact.id})">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                </div>
            `).join('');
        }

        // Toggle favorite status
        function toggleFavorite(contactId) {
            ContactsManager.toggleFavorite(contactId);
        }

        // Update contacts display
        function updateContactsDisplay() {
            const favoritesGrid = document.getElementById('favoritesGrid');
            if (!favoritesGrid) return;

            // Get all contacts (favorites first)
            const allContacts = [...globalContacts].sort((a, b) => {
                if (a.favorite && !b.favorite) return -1;
                if (!a.favorite && b.favorite) return 1;
                return 0;
            });

            favoritesGrid.innerHTML = allContacts.slice(0, 6).map(contact => `
                <div class="contact-card ${contact.favorite ? 'favorite' : ''}" data-contact-id="${contact.id}">
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
                        <button class="contact-btn" title="View Profile" onclick="viewContactProfile(${contact.id})">
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

        // View contact profile
        window.viewContactProfile = function(contactId) {
            const contact = ContactsManager.getContact(contactId);
            if (contact) {
                ContactsManager.updateLastViewed(contactId);
                showNotification(`Viewing ${contact.name}'s profile`);
                // Here you would typically navigate to the profile page
            }
        };

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

        // Initialize contacts display
        updateContactsDisplay();
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
                status: contact.status === 'online' ? 'Active' : 'Inactive',
                lastSeen: getTimeAgo(contact.lastViewed)
            }));
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
            const roleFilterValue = roleFilter.value;
            const statusFilterValue = statusFilter.value;
            const searchLoading = document.getElementById('searchLoading');
            const searchResults = document.getElementById('searchResults');

            console.log('Performing search with query:', query);

            // Show loading state
            searchResults.style.display = 'none';
            searchLoading.style.display = 'block';

            // Simulate search delay for better UX
            setTimeout(() => {
                let results = getContactsForSearch();
                console.log('Found', results.length, 'total contacts');

                // If no search query, show all contacts
                // If there is a search query, filter by it
                if (query) {
                    results = results.filter(user =>
                        user.name.toLowerCase().includes(query) ||
                        user.email.toLowerCase().includes(query) ||
                        user.role.toLowerCase().includes(query)
                    );
                    console.log('Filtered to', results.length, 'contacts matching query');
                }

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
                        <button class="contact-action-btn view-btn" onclick="viewContactProfile(${user.id})" title="View Profile">
                            <i class="fas fa-eye"></i>
                        </button>
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

        if (roleFilter) {
            roleFilter.addEventListener('change', performSearch);
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', performSearch);
        }

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
            window.viewContactProfile = function(contactId) {
                const contact = ContactsManager.getContact(contactId);
                if (contact) {
                    ContactsManager.updateLastViewed(contactId);
                    showNotification(`Viewing ${contact.name}'s profile`);
                    // Here you would typically navigate to the profile page
                }
            };

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
    }

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
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        location.reload();
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
        const dropdown = document.getElementById('filterDropdown');
        const button = document.getElementById('filterDropdownBtn');
        const container = document.querySelector('.filter-dropdown-container');
        
        const isVisible = dropdown.style.display !== 'none';
        
        if (isVisible) {
            // Hide dropdown
            dropdown.style.display = 'none';
            button.classList.remove('active');
            container.classList.remove('show');
        } else {
            // Show dropdown
            dropdown.style.display = 'block';
            button.classList.add('active');
            container.classList.add('show');
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
    window.logout = logout;
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
});