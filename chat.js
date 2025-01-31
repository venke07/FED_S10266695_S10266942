document.addEventListener('DOMContentLoaded', function() {
  const chatList = document.getElementById('chat-list');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  const chats = [
    { id: 1, name: 'Chat 1', messages: ['Hello', 'How are you?'] },
    { id: 2, name: 'Chat 2', messages: ['Hi', 'What\'s up?'] },
    // Add more chat data here
  ];

  chats.forEach(chat => {
    const li = document.createElement('li');
    li.textContent = chat.name;
    li.dataset.chatId = chat.id;
    chatList.appendChild(li);
  });

  chatList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      const chatId = event.target.dataset.chatId;
      const chat = chats.find(c => c.id == chatId);
      chatMessages.innerHTML = '';
      chat.messages.forEach(message => {
        const p = document.createElement('p');
        p.textContent = message;
        chatMessages.appendChild(p);
      });
    }
  });

  sendBtn.addEventListener('click', function() {
    const message = chatInput.value;
    if (message.trim()) {
      const p = document.createElement('p');
      p.textContent = message;
      chatMessages.appendChild(p);
      chatInput.value = '';
    }
  });
});
