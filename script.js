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
