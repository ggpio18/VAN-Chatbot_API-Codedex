// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const clickSound = document.getElementById('click-sound');
const sendSound = document.getElementById('send-sound');

// Hugging Face API Configuration
const HF_API_TOKEN = 'YOUR_HUGGING_FACE_TOKEN'; // Replace with your token
const MODEL_ID = 'HuggingFaceH4/zephyr-7b-beta'; // Free model

// Theme Management
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme === 'dark');
themeToggle.checked = savedTheme === 'dark';

// Theme toggle event
themeToggle.addEventListener('change', () => {
    clickSound.play();
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

// Hugging Face API Call
async function queryChatAI(message) {
    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${MODEL_ID}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: `<|system|>
You are a helpful 8-bit AI assistant. Respond in short, fun messages with occasional retro gaming references.
</s>
<|user|>
${message}
</s>
<|assistant|>`,
                    parameters: {
                        max_new_tokens: 150,
                        temperature: 0.7,
                        repetition_penalty: 1.2
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result[0]?.generated_text.split('<|assistant|>')[1]?.trim() || 
               "ERROR: COULD NOT PROCESS REQUEST";
    } catch (error) {
        console.error('API Error:', error);
        return "SYSTEM ERROR: TRY AGAIN LATER";
    }
}

// Send Message
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    sendSound.play();
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