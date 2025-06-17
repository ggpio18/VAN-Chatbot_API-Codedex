const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Initial bot message
addBotMessage("Hi there! I'm your 8-bit ChatGPT assistant. How can I help you today?");

// Send message when button is clicked
sendBtn.addEventListener('click', sendMessage);

// Send message when Enter is pressed
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addUserMessage(message);
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call ChatGPT API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant with a retro 8-bit personality. Keep responses concise and fun."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response to chat
        if (data.choices && data.choices[0].message) {
            addBotMessage(data.choices[0].message.content);
        } else {
            addBotMessage("Oops! Something went wrong. Try again!");
        }
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addBotMessage("I'm having connection issues. Please try again later!");
    }
}


function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    scrollToBottom();
}

function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    scrollToBottom();
}

function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot-message');
    typingElement.id = 'typing-indicator';
    
    const typingText = document.createElement('div');
    typingText.classList.add('typing');
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.classList.add('typing-dot');
        typingText.appendChild(dot);
    }
    
    typingElement.appendChild(typingText);
    chatLog.appendChild(typingElement);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Easter egg - change color scheme on header click
document.querySelector('header').addEventListener('click', function() {
    const root = document.documentElement;
    const colors = [
        { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#ffe66d' },
        { primary: '#ff9ff3', secondary: '#feca57', accent: '#1dd1a1' },
        { primary: '#48dbfb', secondary: '#5f27cd', accent: '#ff9ff3' },
        { primary: '#00d2d3', secondary: '#ff9ff3', accent: '#f368e0' }
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    root.style.setProperty('--primary', randomColor.primary);
    root.style.setProperty('--secondary', randomColor.secondary);
    root.style.setProperty('--accent', randomColor.accent);
});

