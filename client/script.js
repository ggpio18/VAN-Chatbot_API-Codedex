// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const clickSound = document.getElementById('click-sound');
const sendSound = document.getElementById('send-sound');

// Theme Management
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    
    // Play transition sound
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Theme sound failed:", e));
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme === 'dark');
themeToggle.checked = savedTheme === 'dark';

// Theme toggle event
themeToggle.addEventListener('change', () => {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio play failed:", e));
    }
    setTheme(themeToggle.checked);
});

// Initial Bot Message
setTimeout(() => {
    addMessage('bot', "SYSTEM INITIALIZED\nREADY FOR INPUT");
}, 1000);

// Message Handling
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    // Clear initial screen if it's the first message
    if (document.querySelector('.initial-screen')) {
        chatLog.innerHTML = '';
    }
    
    // Typewriter effect
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            messageElement.textContent = text.substring(0, i + 1);
            scrollToBottom();
            i++;
        } else {
            clearInterval(typing);
        }
    }, 30);
    
    chatLog.appendChild(messageElement);
    scrollToBottom();
}

function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Typing Indicator
function showTyping() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

// Update the queryChatAI function:
async function queryChatAI(message) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || "ERROR: COULD NOT PROCESS REQUEST";
    } catch (error) {
        console.error('API Error:', error);
        return "NETWORK ERROR: PLEASE RETRY";
    }
}

// Send Message - Updated with better audio handling
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    try {
        if (sendSound) {
            sendSound.currentTime = 0;
            await sendSound.play().catch(e => console.log("Send sound failed:", e));
        }
    } catch (e) {
        console.log("Audio error:", e);
    }
    
    addMessage('user', message);
    userInput.value = '';
    showTyping();
    
    try {
        const response = await queryChatAI(message);
        hideTyping();
        addMessage('bot', response);
    } catch (error) {
        hideTyping();
        addMessage('bot', "NETWORK ERROR: PLEASE RETRY");
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Easter Egg - Click Header for Fun
document.querySelector('header').addEventListener('click', () => {
    const colors = [
        { light: '#306850', dark: '#e94584' }, // Original
        { light: '#5a3d7a', dark: '#00c1b3' }, // Purple/Teal
        { light: '#8e44ad', dark: '#f39c12' }, // Purple/Orange
        { light: '#27ae60', dark: '#e74c3c' }  // Green/Red
    ];
    
    const root = document.documentElement;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    root.style.setProperty('--light-primary', randomColor.light);
    root.style.setProperty('--dark-secondary', randomColor.dark);
    
    if (body.classList.contains('dark-mode')) {
        root.style.setProperty('--dark-primary', randomColor.light);
    }
});

// Add floating pyramids to dark mode
function createVaporwaveElements() {
    const darkBg = document.querySelector('.dark-bg');
    if (!darkBg) return;
    
    // Create 5 floating pyramids
    for (let i = 0; i < 5; i++) {
        const pyramid = document.createElement('div');
        pyramid.classList.add('vaporwave-pyramid');
        
        // Random positioning
        pyramid.style.left = `${Math.random() * 80 + 10}%`;
        pyramid.style.top = `${Math.random() * 60 + 20}%`;
        
        // Random size
        const size = Math.random() * 60 + 40;
        pyramid.style.width = `${size}px`;
        pyramid.style.height = `${size * 0.75}px`;
        
        // Random animation duration
        pyramid.style.animationDuration = `${Math.random() * 10 + 10}s`;
                                                                
        darkBg.appendChild(pyramid);
    }
}

// Call this when page loads
window.addEventListener('DOMContentLoaded', createVaporwaveElements);