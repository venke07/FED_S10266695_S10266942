const CONFIG = {
  API_KEY: '6788f0bf7cf4e11f6418ad94',
  API_BASE_URL: 'https://devassignmentven-57f7.restdb.io/rest',
  DEFAULT_AVATAR: 'images/default-avatar.png'
};

class ChatInterface {
  constructor() {
    this.currentChat = null;
    this.users = [];
    this.elements = this.initializeElements();
    this.bindEventListeners();
    this.initialize();
  }

  initializeElements() {
    return {
      chatList: document.getElementById('chat-list'),
      chatMessages: document.getElementById('chat-messages'),
      chatInput: document.getElementById('chat-input'),
      sendBtn: document.getElementById('send-btn'),
      currentSellerName: document.getElementById('current-seller')
    };
  }

  bindEventListeners() {
    this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
    this.elements.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  async initialize() {
    await this.populateChatList();
  }

  // Fixed fetchUsers method syntax
  async fetchUsers() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/accounts`, {
            headers: {
                'x-apikey': CONFIG.API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log('Response status:', response.status);
        const usersData = await response.json();
        console.log('Fetched users:', usersData);
        return usersData;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
  }

  async populateChatList() {
    try {
      this.users = await this.fetchUsers();
      this.elements.chatList.innerHTML = '';
      
      if (this.users.length === 0) {
        this.elements.chatList.innerHTML = '<li class="no-users">No users found</li>';
        return;
      }

      this.users.forEach(user => this.createChatListItem(user));
    } catch (error) {
      console.error('Error in populateChatList:', error);
      this.elements.chatList.innerHTML = '<li class="error">Error loading users. Please try again later.</li>';
    }
  }

  createChatListItem(user) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="chat-list-item">
        <div class="seller-avatar">
          <img src="${user.avatar || CONFIG.DEFAULT_AVATAR}" alt="${user.username}'s avatar">
        </div>
        <div class="seller-info">
          <h4>${this.sanitizeHTML(user.username)}</h4>
          <p class="last-message">${this.sanitizeHTML(user.lastMessage || 'No messages yet')}</p>
        </div>
        <span class="chat-time">Now</span>
      </div>
    `;
    li.dataset.userId = user._id;
    li.addEventListener('click', () => this.selectChat(user._id));
    this.elements.chatList.appendChild(li);
  }

  selectChat(userId) {
    this.currentChat = userId;
    const user = this.users.find(u => u._id === userId);
    this.elements.currentSellerName.textContent = user.username;
    this.elements.chatMessages.innerHTML = '';
    this.addMessage(user.lastMessage || 'No messages yet', 'received');
  }

  addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = this.sanitizeHTML(text);
    this.elements.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  createTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message received typing';
    indicator.innerHTML = '<span>Typing</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
    this.elements.chatMessages.appendChild(indicator);
    this.scrollToBottom();
    return indicator;
  }

  removeTypingIndicator(indicator) {
    if (indicator?.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  async sendMessage() {
    const message = this.elements.chatInput.value.trim();
    if (!message || !this.currentChat) return;

    this.addMessage(message, 'sent');
    this.elements.chatInput.value = '';

    const typingIndicator = this.createTypingIndicator();

    try {
      await this.simulateAIResponse(typingIndicator);
    } catch (error) {
      this.removeTypingIndicator(typingIndicator);
      this.addMessage('Sorry, I had trouble processing your message. Please try again.', 'received');
    }
  }

  async simulateAIResponse(typingIndicator) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.removeTypingIndicator(typingIndicator);
        this.addMessage('This is a sample AI response.', 'received');
        resolve();
      }, 1000);
    });
  }

  scrollToBottom() {
    this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
  }

  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Initialize the chat interface when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChatInterface();
});