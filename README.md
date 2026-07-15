# 🎓 StudyAI – An AI-Powered Personalized Learning Platform

### An End-to-End Full-Stack Web Application for Smarter Studying

Developed as part of a **College Internship Project**

---

## 📖 About the Project

**StudyAI** is a full-stack web application that helps students study smarter by automatically generating AI-powered summaries, flashcards, quizzes, and personalized study materials from uploaded documents (PDF, DOCX, or TXT).

This repository contains the **complete Software Development Lifecycle (SDLC)** of the project—from brainstorming and requirements analysis through design, development, testing, documentation and demonstration.

🌐 **Live Demo:** https://studyai-tau.vercel.app

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Project Preview](#-project-preview)
- [Repository Structure](#-repository-structure)
- [Repository Contents](#-repository-contents)
- [Technology Stack](#️-technology-stack)
- [Project Highlights](#-project-highlights)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Developer](#-developer)
- [License](#-license)

---

## 📷 Project Preview

- 🏠 Home Page
- 📄 File Upload
- 🤖 AI Summary
- 🃏 Flashcards
- 📝 Quiz Generator
- 📊 Analytics Dashboard
- ## Demo Video

https://github.com/user-attachments/assets/e76f43ff-c836-4f7f-b325-228210ef1c7d




- 





---

## 📂 Repository Structure

```
studyai/
│
├── 01_Brainstorming & Ideation
├── 02_Requirement Analysis
├── 03_Project Design Phase
├── 04_Project Planning Phase
├── 05_Project Development Phase
│   ├── backend
│   └── frontend
├── 06_Project Testing
├── 07_Project Documentation
├── 08_Project Demonstration
└── README.md
```

---

## 📚 Repository Contents

### 1. Brainstorming & Ideation
- Brainstorming & Idea Prioritization
- Define Problem Statement
- Empathy Map

### 2. Requirement Analysis
- Customer Journey Map
- Data Flow Diagram
- Solution Requirements
- Technology Stack

### 3. Project Design Phase
- Problem–Solution Fit
- Proposed Solution
- Solution Architecture

### 4. Project Planning Phase
- Project Planning

### 5. Project Development Phase
- Flask Backend (`backend/`)
- React + Vite Frontend (`frontend/`)
- Code Layout, Readability & Reusability
- Coding & Solution
- Functional Features Included in the Solution

### 6. Project Testing
- Performance Testing
- Functional Testing
- Test Reports

### 7. Project Documentation
- Project Executable Files
- Sample Project Documentation

### 8. Project Demonstration
- Communication
- Demonstration of Proposed Features
- Project Demo Planning
- Scalability & Future Plan
- Team Involvement in Demonstration

---

## 🚀 Project Highlights

- 📄 File Upload — Upload PDF, DOCX, or TXT study materials
- 🤖 AI Summary — Structured summaries with key concepts and exam tips
- 🃏 Flashcards — Auto-generated flashcards with flip animation
- 📝 Quiz Generator — MCQ, True/False, and Short Answer questions
- 📊 Analytics Dashboard — Track performance with Chart.js visualizations
- 🔐 Authentication — Secure JWT-based login and signup
- ☁️ Cloud Database — Firebase Firestore for persistent data storage
- Complete SDLC Documentation

---

## 🛠️ Technology Stack

| Category         | Technologies                              |
| ---------------- | ------------------------------------------ |
| Frontend         | React.js + Vite, Tailwind CSS, React Router, Axios, Chart.js, React Dropzone |
| Backend          | Python, Flask, Flask-JWT-Extended, Flask-CORS, Gunicorn |
| Database & Auth  | Firebase Authentication, Firebase Firestore |
| AI               | Groq API (Llama 3.3 70B Versatile), Prompt Engineering |
| Deployment       | Vercel (Frontend), Render (Backend)         |
| Version Control  | Git & GitHub                                |

---

## 🏗️ Application Workflow

```
Document Upload (PDF/DOCX/TXT)
   ↓
Text Extraction
   ↓
Groq API (Llama 3.3 70B) Processing
   ↓
AI Summary / Flashcards / Quiz Generation
   ↓
Firebase Firestore (Storage)
   ↓
Analytics Dashboard (Chart.js)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- Firebase project
- Groq API key

### Frontend Setup
```
cd frontend
npm install
npm run dev
```

### Backend Setup
```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Environment Variables

**Backend `.env`:**
- `FLASK_PORT=5001`
- `JWT_SECRET_KEY=your_jwt_secret`
- `GROQ_API_KEY=your_groq_api_key`
- `FIREBASE_SERVICE_ACCOUNT_B64=your_base64_key`

**Frontend `.env.production`:**
- `VITE_API_URL=your_render_backend_url/api`

---

## 📡 API Endpoints

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------- |
| GET    | `/api/health`       | Health check                          |
| POST   | `/api/auth/signup`  | Register new user                     |
| POST   | `/api/auth/login`   | Login user                            |
| POST   | `/api/upload`       | Upload file and generate AI content   |

---

## 📈 Future Enhancements

- Mobile application
- Spaced-repetition scheduling for flashcards
- Collaborative study rooms
- Voice-based quiz mode
- Multi-language document support

---

## 👤 Developer

**Mythri Sarla** — Built as a college internship project.

GitHub: https://github.com/MythriSarla

---

## 📄 License

MIT License

---

**⭐ If you found this project useful, consider giving it a star!**
