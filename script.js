// Replace with your Hugging Face API token
const HF_API_TOKEN = 'YOUR_HUGGING_FACE_TOKEN_HERE';

// Model ID from Hugging Face (we'll use Zephyr 7B as example)
const MODEL_ID = 'HuggingFaceH4/zephyr-7b-beta';

const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Initial bot message
addBotMessage("Greetings! I'm your 8-bit AI assistant powered by Hugging Face. How can I help?");

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    showTypingIndicator();
    
    try {
        const response = await queryHuggingFace(message);
        removeTypingIndicator();
        addBotMessage(response);
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addBotMessage("Oops! Something went wrong. Try again later!");
    }
}

async function queryHuggingFace(message) {
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
You are a helpful, 8-bit style AI assistant. Keep responses short, fun and retro-themed.
</s>
<|user|>
${message}
</s>
<|assistant|>`,
                parameters: {
                    max_new_tokens: 200,
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
           "I didn't get a proper response. Try asking differently!";
}

// Helper functions (same as before)
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
    typingElement.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    chatLog.appendChild(typingElement);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    typingElement?.remove();
}

function scrollToBottom() {
    chatLog.scrollTop = chatLog.scrollHeight;
}