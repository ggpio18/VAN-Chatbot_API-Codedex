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