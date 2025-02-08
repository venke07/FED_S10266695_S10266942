document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '6788f0bf7cf4e11f6418ad94';
    let currentChat = null;
    let users = [];

    // Get DOM elements
    const chatList = document.getElementById('chat-list');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const currentSellerName = document.getElementById('current-seller');

    // Fetch users from the database
    async function fetchUsers() {
        try {
            const response = await fetch('https://devassignmentven-57f7.restdb.io/rest/Account', {
                headers: {
                    'x-apikey': '6788f0bf7cf4e11f6418ad94'
                }
            });
            console.log('Response status:', response.status); // Debugging log
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const usersData = await response.json();
            console.log('Fetched users:', usersData); // Debugging log
            return usersData;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    // Populate chat list
    async function populateChatList() {
        users = await fetchUsers();
        chatList.innerHTML = ''; // Clear existing chats
        if (users.length === 0) {
            chatList.innerHTML = '<li>No users found</li>';
            chatMessages.innerHTML = '<div class="message received">No users available to chat with.</div>';
            return;
        }
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="chat-list-item">
                    <div class="seller-avatar">
                        <img src="${user.avatar || 'images/default-avatar.png'}" alt="User Icon">
                    </div>
                    <div class="seller-info">
                        <h4>${user.username}</h4>
                        <p class="last-message">${user.lastMessage || 'No messages yet'}</p>
                    </div>
                    <span class="chat-time">Now</span>
                </div>
            `;
            li.dataset.userId = user.id;
            li.addEventListener('click', () => selectChat(user.id));
            chatList.appendChild(li);
        });
    }

    // Select a chat
    function selectChat(userId) {
        currentChat = userId;
        const user = users.find(u => u.id === userId);
        currentSellerName.textContent = user.username;
        chatMessages.innerHTML = '';
        addMessage(user.lastMessage || 'No messages yet', 'received');
    }

    // Add a message to the chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add typing indicator
    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message received typing';
        indicator.innerHTML = '<span>Typing</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    // Remove typing indicator
    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }

    // Get AI response
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

    // Send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || !currentChat) return;

        addMessage(message, 'sent');
        chatInput.value = '';

        // Add typing indicator
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