
class Chatbot {
    constructor() {
        this.initialize();
        this.createChatInterface();
        this.initializeEventListeners();
        this.isOpen = false;
        this.apiKey = 'AIzaSyBAfimBMzbLjKmnxaAEvW0aiOeu6-uCVDY';
        this.context = `You are a helpful AI assistant for MokeSell, an e-commerce platform where users can both buy and sell products, particularly electronics. 
        Key features of MokeSell include:
        - Buying and selling electronics (laptops, smartphones, tablets, accessories)
        - User profiles for buyers and sellers
        - Product listings with prices and descriptions
        - Secure payment system
        - Delivery tracking
        - Your Gender is a Female
        Please provide helpful, friendly responses within this context. If asked about specific products or prices, explain that you can provide general guidance but recommend checking the current listings for exact prices and availability.`;
    }

    initialize() {
        // Create chat toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'chat-toggle';
        toggleBtn.innerHTML = '💬';
        toggleBtn.onclick = () => this.toggleChat();
        document.body.appendChild(toggleBtn);

        // Initialize chat container
        const chatbotDiv = document.getElementById('chatbot');
        chatbotDiv.innerHTML = `
            <div class="chat-container">
                <div class="chat-header">
                    <h1>MokeSell Assistant</h1>
                    <button class="close-chat">×</button>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <input type="text" id="user-input" placeholder="Type your message...">
                    <button id="send-btn">Send</button>
                </div>
            </div>
        `;
    }

    createChatInterface() {
        this.messages = document.querySelector('.chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-btn');
        this.closeButton = document.querySelector('.close-chat');
        this.chatbot = document.getElementById('chatbot');
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        this.closeButton.addEventListener('click', () => this.toggleChat());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatbot.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen && !this.welcomed) {
            this.sendWelcomeMessage();
            this.welcomed = true;
        }
    }

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.userInput.value = '';
            this.addLoadingIndicator();
            try {
                const response = await this.getAIResponse(message);
                this.removeLoadingIndicator();
                this.addMessage(response, 'bot');
            } catch (error) {
                this.removeLoadingIndicator();
                this.addMessage("I apologize, but I'm having trouble connecting at the moment. Please try again.", 'bot');
                console.error('Error:', error);
            }
        }
    }

    async getAIResponse(message) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.context}\n\nUser: ${message}\n\nAssistant:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid API response structure');
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    addLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message loading';
        loadingDiv.innerHTML = 'Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        this.messages.appendChild(loadingDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    removeLoadingIndicator() {
        const loadingIndicator = this.messages.querySelector('.loading');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    sendWelcomeMessage() {
        const welcome = "👋 Welcome to MokeSell! I'm your AI assistant, here to help you with buying, selling, and any questions you might have about our platform. How can I assist you today?";
        this.addMessage(welcome, 'bot');
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = content;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
