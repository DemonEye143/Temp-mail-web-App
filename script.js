// DOM Elements
const currentEmailElement = document.getElementById('current-email');
const generateEmailBtn = document.getElementById('generate-email');
const copyEmailBtn = document.getElementById('copy-email');
const deleteAllBtn = document.getElementById('delete-all');
const refreshInboxBtn = document.getElementById('refresh-inbox');
const emailListElement = document.getElementById('email-list');
const messageCountElement = document.getElementById('message-count');
const inboxCountElement = document.getElementById('inbox-count');

// Email Generator Function
function generateRandomEmail() {
    const domains = [
        'tempmail.pro', 'anonmail.com', 'ghostmail.io', 
        'privaterelay.net', 'securebox.email', 'shadowmail.co'
    ];
    
    const adjectives = ['swift', 'secure', 'private', 'hidden', 'phantom', 'shadow', 'ghost', 'stealth'];
    const nouns = ['falcon', 'wolf', 'tiger', 'eagle', 'panther', 'raven', 'viper', 'hawk'];
    const numbers = Math.floor(Math.random() * 999) + 1;
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${adjective}.${noun}${numbers}@${domain}`;
}

// Generate Initial Email
let currentEmail = generateRandomEmail();
currentEmailElement.innerHTML = `
    <i class="fas fa-envelope-open-text"></i>
    <span class="email-text">${currentEmail}</span>
`;

// Generate New Email
generateEmailBtn.addEventListener('click', () => {
    currentEmail = generateRandomEmail();
    currentEmailElement.innerHTML = `
        <i class="fas fa-envelope-open-text"></i>
        <span class="email-text">${currentEmail}</span>
    `;
    
    showNotification('New email address generated!', 'success');
});

// Copy Email to Clipboard
copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentEmail).then(() => {
        showNotification('Email copied to clipboard!', 'success');
        
        // Button feedback
        copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyEmailBtn.classList.add('btn-success');
        
        setTimeout(() => {
            copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyEmailBtn.classList.remove('btn-success');
        }, 2000);
    });
});

// Delete All Emails
deleteAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all emails? This action cannot be undone.')) {
        emailListElement.innerHTML = `
            <div class="empty-inbox">
                <i class="fas fa-envelope-open"></i>
                <h3>Inbox is Empty</h3>
                <p>Your temporary emails will appear here</p>
            </div>
        `;
        messageCountElement.textContent = '0';
        inboxCountElement.textContent = '0';
        
        showNotification('All emails have been deleted', 'warning');
    }
});

// Refresh Inbox
refreshInboxBtn.addEventListener('click', () => {
    refreshInboxBtn.innerHTML = '<span class="loading"></span> Refreshing...';
    
    // Simulate API call
    setTimeout(() => {
        refreshInboxBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        showNotification('Inbox refreshed successfully', 'info');
    }, 1000);
});

// Sample Email Data (In a real app, this would come from an API)
const sampleEmails = [
    {
        id: 1,
        sender: 'Welcome Team',
        subject: 'Welcome to TempMail PRO!',
        preview: 'Thank you for choosing our secure temporary email service...',
        time: '2 mins ago',
        unread: true
    },
    {
        id: 2,
        sender: 'Security Alert',
        subject: 'New Login Detected',
        preview: 'A new login was detected from a different location...',
        time: '1 hour ago',
        unread: true
    },
    {
        id: 3,
        sender: 'Newsletter',
        subject: 'Weekly Tech Updates',
        preview: 'Check out the latest technology news and updates...',
        time: '3 hours ago',
        unread: false
    }
];

// Display Emails
function displayEmails() {
    if (sampleEmails.length === 0) {
        emailListElement.innerHTML = `
            <div class="empty-inbox">
                <i class="fas fa-envelope-open"></i>
                <h3>Inbox is Empty</h3>
                <p>Your temporary emails will appear here</p>
            </div>
        `;
    } else {
        emailListElement.innerHTML = '';
        sampleEmails.forEach(email => {
            const emailElement = document.createElement('div');
            emailElement.className = `email-item ${email.unread ? 'unread' : ''}`;
            emailElement.innerHTML = `
                <div class="email-header">
                    <div class="email-sender">${email.sender}</div>
                    <div class="email-time">${email.time}</div>
                </div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.preview}</div>
            `;
            emailListElement.appendChild(emailElement);
        });
    }
    
    // Update counters
    const unreadCount = sampleEmails.filter(email => email.unread).length;
    messageCountElement.textContent = sampleEmails.length;
    inboxCountElement.textContent = sampleEmails.length;
    
    // Update unread badge
    inboxCountElement.textContent = sampleEmails.length;
    if (unreadCount > 0) {
        inboxCountElement.style.background = 'var(--gradient-accent)';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize
displayEmails();

// Auto-refresh every 30 seconds
setInterval(() => {
    console.log('Auto-refreshing inbox...');
}, 30000);
