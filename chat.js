document.addEventListener('DOMContentLoaded', function() {
  const API_KEY = 'AIzaSyAWbysNyOICEM46ZFVR5mLG1hTS8wW_Nhk';
  let currentChat = null;

  // Chat data
  const sellers = [
      {
          id: 1,
          name: 'Electronics Pro Shop',
          avatar: '🏪',
          status: 'online',
          context: 'You are an electronics store seller specializing in smartphones and laptops. Be professional but friendly.',
          lastMessage: 'How can I help you today?'
      },
      {
          id: 2,
          name: 'Gaming Gear Store',
          avatar: '🎮',
          status: 'online',
          context: 'You are a gaming equipment seller. Be enthusiastic about gaming while maintaining professionalism.',
          lastMessage: 'Check out our new gaming peripherals!'
      },
      {
          id: 3,
          name: 'Tech Accessories',
          avatar: '📱',
          status: 'online',
          context: 'You are a tech accessories seller specializing in cases, chargers, and gadget add-ons. Be helpful and knowledgeable.',
          lastMessage: 'Looking for any specific accessories?'
      }
  ];

  // Get DOM elements
  const chatList = document.getElementById('chat-list');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const currentSellerName = document.getElementById('current-seller');

  // Populate chat list
  function populateChatList() {
      chatList.innerHTML = ''; // Clear existing chats
      sellers.forEach(seller => {
          const li = document.createElement('li');
          li.innerHTML = `
              <div class="chat-list-item">
                  <div class="seller-avatar">${seller.avatar}</div>
                  <div class="seller-info">
                      <h4>${seller.name}</h4>
                      <p class="last-message">${seller.lastMessage}</p>
                  </div>
                  <span class="chat-time">Now</span>
              </div>
          `;
          li.dataset.sellerId = seller.id;
          li.addEventListener('click', () => selectChat(seller.id));
          chatList.appendChild(li);
      });
  }

  // Select a chat
  function selectChat(sellerId) {
      currentChat = sellers.find(s => s.id === sellerId);
      currentSellerName.textContent = currentChat.name;
      chatMessages.innerHTML = '';
      addMessage(currentChat.lastMessage, 'received');
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
                          text: `${currentChat.context}\n\nCustomer: ${message}\n\nSeller:`
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