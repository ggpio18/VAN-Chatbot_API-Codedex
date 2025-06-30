require('dotenv').config({ path: require('path').join(__dirname, '.env') });
console.log("Env path:", require('path').join(__dirname, '.env'));
console.log("Current dir:", __dirname);

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for path-to-regexp issue - force resolution
require('express/lib/router/layer').prototype.handle_request = function handle(req, res, next) {
  const fn = this.handle;

  if (fn.length > 3) {
    return next();
  }

  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client
app.use(express.static(path.join(__dirname, '../client')));

// Secure API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        console.log("Incoming message:", req.body.message);
        
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
            {
                inputs: `<|system|>
                You are a helpful 8-bit AI assistant. Respond in short, fun messages with occasional retro gaming references.
                </s>
                <|user|>
                ${req.body.message}
                </s>
                <|assistant|>`,
                parameters: {
                    max_new_tokens: 150,
                    temperature: 0.7,
                    repetition_penalty: 1.2
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );

        console.log("HF API Response:", response.data);
        const responseText = response.data[0]?.generated_text.split('<|assistant|>')[1]?.trim();
        res.json({ response: responseText || "ERROR: EMPTY RESPONSE" });
        
    } catch (error) {
        console.error("FULL ERROR:", {
            message: error.message,
            response: error.response?.data,
            config: error.config?.headers?.Authorization ? "HAS_AUTH_HEADER" : "NO_AUTH_HEADER"
        });
        res.status(500).json({ 
            error: error.message,
            response: "NETWORK ERROR: PLEASE RETRY" 
        });
    }
});

// Serve index.html for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 8-bit AI server running on port ${PORT}`);
});

//limits
// app.use(express.limit('5mb')); // Prevent large payload attacks
// app.use(helmet()); // Security headers

console.log("API Token:", process.env.HF_API_TOKEN ? "✅ Loaded" : "❌ Missing");