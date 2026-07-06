# StudyAI 🎓
### AI-Powered Personalized Learning Platform

StudyAI is a full-stack web application that helps students study smarter by automatically generating AI-powered summaries, flashcards, quizzes, and personalized study materials from uploaded documents.

🌐 **Live Demo:** https://studyai-tau.vercel.app

---

## ✨ Features

- 📄 **File Upload** — Upload PDF, DOCX, or TXT study materials
- 🤖 **AI Summary** — Structured summaries with key concepts and exam tips
- 🃏 **Flashcards** — Auto-generated flashcards with flip animation
- 📝 **Quiz Generator** — MCQ, True/False, and Short Answer questions
- 📊 **Analytics Dashboard** — Track performance with Chart.js visualizations
- 🔐 **Authentication** — Secure JWT-based login and signup
- ☁️ **Cloud Database** — Firebase Firestore for persistent data storage

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router
- Axios
- Chart.js
- React Dropzone

### Backend
- Python Flask
- Flask-JWT-Extended
- Flask-CORS
- Gunicorn (production)

### Database & Auth
- Firebase Authentication
- Firebase Firestore

### AI
- Groq API (Llama 3.3 70B Versatile)
- Prompt Engineering

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- Firebase project
- Groq API key

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Environment Variables

Backend .env:
- FLASK_PORT=5001
- JWT_SECRET_KEY=your_jwt_secret
- GROQ_API_KEY=your_groq_api_key
- FIREBASE_SERVICE_ACCOUNT_B64=your_base64_key

Frontend .env.production:
- VITE_API_URL=your_render_backend_url/api

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/upload | Upload file and generate AI content |

---

## Developer

Mythri Sarla — Built as a college internship project.

GitHub: https://github.com/MythriSarla

---

## License

MIT License
