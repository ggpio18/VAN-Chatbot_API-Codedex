![chatbot_light](https://github.com/user-attachments/assets/5a7e92fd-2438-4c85-afa1-a8b06af10a0e)
![chatbot-dark](https://github.com/user-attachments/assets/4d9e1535-c9b6-454f-af37-4da2fd87d75c)

# 📌 VAN Chatbot API – Codedex

> A retro-styled 8-bit chatbot built with Vanilla JavaScript and powered by a Node.js backend. Created as part of the Codedex learning challenge.

---

## 📌 Description

**VAN Chatbot API** is an **8-bit AI assistant** with a nostalgic aesthetic inspired by vintage video games. It simulates a conversational bot experience using **Vanilla JavaScript** on the frontend and a **Node.js + Express.js** backend for secure API requests to Hugging Face. It features CRT monitor effects, pixel art UI, and vaporwave vibes in dark mode.

---

## 🧠 Project Goal

This project was created to:

- Practice both front-end and back-end JavaScript skills without modern frameworks.
- Simulate an old-school gaming chatbot experience with modern web APIs.
- Learn API handling securely with environment variables.
- Build a pixel-perfect and responsive UI from scratch.

---

## 🔧 Features

- ✅ Retro UI with 8-bit styling and pixel fonts  
- ✅ Dark/light mode toggle (Game Boy and Vaporwave)  
- ✅ Typing animations + arcade-style sound effects  
- ✅ CRT display and visual effects  
- ✅ Secure API proxy with Express.js  
- ✅ Environment variable protection  
- ✅ Responsive layout across devices  
- ✅ Friendly error handling with retro flair

---

## 🖥️ Tech Stack

### Frontend:
- **HTML5** – Markup and structure  
- **CSS3** – Pixel-perfect styling using CSS Variables  
- **Vanilla JavaScript** – Framework-free functionality  
- **Google Fonts** – Press Start 2P, Silkscreen for retro typography  
- **Font Awesome** – Pixel-styled icons  

### Backend:
- **Node.js (v18+)** – JavaScript runtime  
- **Express.js** – Minimal web framework  
- **Axios** – Makes HTTP requests to Hugging Face API  
- **CORS** – Enables secure cross-origin requests  
- **dotenv** – Manages environment variables securely  

---

## 🎮 Bot Description

Your **8-bit AI Assistant** is a retro-inspired chatbot with a nostalgic vibe and modern features.

### Key Features:
- CRT monitor-style UI with glow and flicker effects  
- Typewriter-style message rendering  
- Pixel UI elements and iconography  
- Toggle between Game Boy (light) and Vaporwave (dark) modes  
- Easter eggs (e.g., color-changing header)  
- Clean and intuitive layout  

---

## 🌟 Key Highlights

- **Retro UI** – Pixel fonts, border frames, and CRT overlays  
- **Themes** – Switch between light and dark (Game Boy / Vaporwave)  
- **Sound FX** – Arcade-style click and message sounds  
- **Typing Animation** – Terminal-style rendering  
- **Responsive Design** – Works on mobile and desktop  
- **Error Handling** – Fun retro-style error alerts  

### Security Features:
- 🔐 `.env`-based environment variables (kept gitignored)  
- 🛡️ Server-side API proxy via Express.js  
- 🌐 CORS protection for domain restriction  
- 🔍 No API key exposure in the frontend  

---

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- Node.js  
- Express.js  
- Axios  
- Google Fonts  
- Font Awesome  
- dotenv  
- CORS

---

## 📁 Folder Structure

```
VAN-Chatbot_API-Codedex/
├── public/
│   └── index.html
├── src/
│   ├── script.js
│   └── style.css
├── server/
│   ├── index.js
│   └── .env
├── package.json
├── .gitignore
└── README.md
```

---

## 🧪 How to Run the Project

### 🔧 Frontend:

1. Open `public/index.html` in your browser  
   _or use the Live Server extension in VS Code._

### 🚀 Backend Setup:

1. **Fork this repository** to your GitHub account  
2. **Clone your forked repository:**

```bash
git clone https://github.com/your-username/VAN-Chatbot_API-Codedex.git
```

3. **Navigate into the project folder:**

```bash
cd VAN-Chatbot_API-Codedex/server
```

4. **Install server dependencies:**

```bash
npm install
```

5. **Create a `.env` file inside the `server/` directory:**

```env
HUGGING_FACE_API_KEY=your_huggingface_api_key_here
```

> ⚠️ Your `.env` file is ignored by Git for security reasons.

6. **Start the backend server:**

```bash
npm start
```

7. **Access the chatbot UI:**  
Open the `index.html` file in the browser or run the frontend on a static server.

8. **Try It Out:**  
Visit `http://localhost:3000` (or the port shown in your terminal) to test your chatbot!

---

## 📚 What I Learned

- ✅ Securely connecting frontend to API via Node/Express proxy  
- ✅ Designing responsive pixel-perfect UI with retro themes  
- ✅ Improving DOM control and animations with JavaScript  
- ✅ Strengthened understanding of environment config and CORS  
- ✅ Built full-stack communication from scratch  

---

## 💡 Recommendations

- Integrate localStorage for chat history  
- Add more personality or context to responses  
- Upgrade to OpenAI or LangChain APIs for deeper conversation logic  
- Add background music or loading state transitions  
- Optimize the UI for accessibility improvements  

---

## 📝 Notes

- This is a **learning-focused project**, not intended for production.
- It’s part of my **Codedex coding journey** to deepen both frontend and backend fundamentals.

---

## 🏗️ Contributing

1. **Fork the repository**  
2. **Create a new branch:** `git checkout -b feature/your-feature`  
3. **Commit your changes:** `git commit -m "Add feature"`  
4. **Push to the branch:** `git push origin feature/your-feature`  
5. **Open a Pull Request**

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- Thanks to **Codedex** for the guidance  
- Hugging Face for the free API access  
- Inspired by retro UI/UX styles from classic gaming

---

## 📬 Contact

🌐 [https://pioaranzadev.vercel.app](https://pioaranzadev.vercel.app)

---

## 🏷️ Tags

`#VanillaJS` `#NodeJS` `#Chatbot` `#API` `#RetroUI` `#FrontendProject` `#Backend` `#Codedex` `#LearningProject`
