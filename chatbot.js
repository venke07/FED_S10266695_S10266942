document.addEventListener('DOMContentLoaded', function() {
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSendBtn = document.getElementById('chatbotSendBtn');


  const apiKey = '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'; // Replace with your OpenRouter API key

  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    chatbotInput.value = '';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
      addMessage(data.reply, 'bot');
    })
    .catch(error => {
      console.error('Error:', error);
      addMessage('Sorry, something went wrong. Please try again later.', 'bot');
    });
  }

  chatbotSendBtn.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
