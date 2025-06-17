// Theme Toggle Functionality
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeCheckbox.checked = true;
}

themeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Chat Functionality
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Initial bot message
setTimeout(() => {
    addBotMessage("SYSTEM INITIALIZED... READY TO CHAT!");
}, 500);

// Send message when button is clicked or Enter is pressed
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    showTypingIndicator();
    
    // Simulate API response (replace with actual API call)
    setTimeout(() => {
        removeTypingIndicator();
        const responses = [
            "AFFIRMATIVE. I PROCESSED YOUR REQUEST.",
            "ERROR 404: WITTY RESPONSE NOT FOUND.",
            "COMMAND RECEIVED. PROCESSING...",
            "I'M JUST A SIMPLE 8-BIT AI. PLEASE BE GENTLE!",
            "01001000 01001001 00100001 (THAT'S 'HI!' IN BINARY)"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addBotMessage(randomResponse);
    }, 1500 + Math.random() * 2000);
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
    
    // Add typewriter effect
    let i = 0;
    messageElement.textContent = '';
    const typing = setInterval(() => {
        if (i < message.length) {
            messageElement.textContent += message.charAt(i);
            scrollToBottom();
            i++;
        } else {
            clearInterval(typing);
        }
    }, 30);
    
    chatLog.appendChild(messageElement);
    scrollToBottom();
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function removeTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Easter egg - change colors when clicking header
document.querySelector('header').addEventListener('click', function() {
    const root = document.documentElement;
    const colors = [
        { primary: '#ff2d75', secondary: '#00f0ff', accent: '#ff9e3d' },
        { primary: '#9c27b0', secondary: '#00bcd4', accent: '#ffeb3b' },
        { primary: '#e91e63', secondary: '#00e676', accent: '#ff9800' },
        { primary: '#673ab7', secondary: '#ff5722', accent: '#8bc34a' }
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    root.style.setProperty('--light-primary', randomColor.primary);
    root.style.setProperty('--light-secondary', randomColor.secondary);
    root.style.setProperty('--light-accent', randomColor.accent);
    
    if (body.classList.contains('dark-mode')) {
        root.style.setProperty('--dark-primary', randomColor.primary);
        root.style.setProperty('--dark-secondary', randomColor.secondary);
        root.style.setProperty('--dark-accent', randomColor.accent);
    }
});