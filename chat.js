document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'AIzaSyBAfimBMzbLjKmnxaAEvW0aiOeu6-uCVDY';
    let currentChat = null;
    let users = [];

    // Get DOM elements
    const chatList = document.getElementById('chat-list');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const currentSellerName = document.getElementById('current-seller');
    const urlParams = new URLSearchParams(window.location.search);
    const targetUsername = urlParams.get('user');

    // Fetch users from the database
    async function fetchUsers() {
        try {
            const response = await fetch('https://devassignmentven-57f7.restdb.io/rest/Account', {
                headers: {
                    'x-apikey': '6788f0bf7cf4e11f6418ad94'
                }
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const usersData = await response.json();
            console.log('Fetched users:', usersData);
            return usersData;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    // Populate chat list
    async function populateChatList() {
        users = await fetchUsers();
        chatList.innerHTML = '';
        if (users.length === 0) {
            chatList.innerHTML = '<li>No users found</li>';
            chatMessages.innerHTML = '<div class="message received">No users available to chat with.</div>';
            return;
        }
        users.forEach(user => {
            // Log each user object to inspect its structure
            console.log('Processing user:', user);
            
            const li = document.createElement('li');
            li.className = 'chat-list-item';
            li.innerHTML = `
                <div class="seller-avatar">
                    <img src="${user.avatar || 'images/profile.png'}" alt="User Icon">
                </div>
                <div class="seller-info">
                    <h4>${user.username || user.Username || 'Unknown User'}</h4>
                    <p class="last-message">${user.lastMessage || 'No messages yet'}</p>
                </div>
                <span class="chat-time">Now</span>
            `;
            li.dataset.userId = user._id || user.id; // Handle both possible ID formats
            li.addEventListener('click', () => selectChat(user._id || user.id));
            chatList.appendChild(li);

            // Automatically open chat if the username matches the target username
            if (user.username === targetUsername || user.Username === targetUsername) {
                selectChat(user._id || user.id);
            }
        });
    }

    // Select a chat
    function selectChat(userId) {
        currentChat = userId;
        console.log('Selecting chat for userId:', userId);
        const user = users.find(u => (u._id === userId || u.id === userId));
        console.log('Found user:', user);
        
        if (user && currentSellerName) {
            // Try different possible property names for username
            const displayName = user.username || user.Username || user.name || user.Name || 'Unknown User';
            console.log('Setting display name to:', displayName);
            currentSellerName.textContent = displayName;
        } else {
            console.error('User or currentSellerName element not found:', {
                user: user,
                element: currentSellerName
            });
        }
        
        chatMessages.innerHTML = '';
        if (user) {
            addMessage(user.lastMessage || 'No messages yet', 'received');
        }
    }

    // Rest of the functions remain the same
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message received typing';
        indicator.innerHTML = '<span>Typing</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }

    async function getAIResponse(message) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Customer: ${message}\n\nSeller:`
                        }]
                    }]
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || !currentChat) return;

        addMessage(message, 'sent');
        chatInput.value = '';

        const typingIndicator = addTypingIndicator();

        try {
            const response = await getAIResponse(message);
            removeTypingIndicator(typingIndicator);
            addMessage(response, 'received');
        } catch (error) {
            removeTypingIndicator(typingIndicator);
            addMessage('Sorry, I had trouble processing your message. Please try again.', 'received');
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initialize chat interface
    populateChatList();
});