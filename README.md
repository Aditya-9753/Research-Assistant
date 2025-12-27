# 🤖 AI Research Assistant 
AI Research Assistant is a full-stack application that helps users perform intelligent research using Artificial Intelligence. It includes a **React-based frontend** for user interaction and a **Python (FastAPI) backend** for processing queries and generating AI-powered responses. The project follows clean architecture, scalability, and secure development practices.

---

## 🚀 Features

- AI-powered research and query analysis  
- Interactive and responsive React frontend  
- Clean and modular Python backend (FastAPI)  
- Secure handling of API keys using environment variables  
- Scalable and beginner-friendly project structure  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- JavaScript (ES6+)  
- CSS / Tailwind CSS  
- Axios  

### Backend
- Python  
- FastAPI  
- OpenAI API  
- SQLite  
- Uvicorn  
-----

🔁 High-Level Flow Summary 
User
↓
React Frontend
↓
FastAPI Backend
↓
OpenAI API
↓
Backend Response
↓
React UI 

---

## ⚙️ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/Aditya-9753/Research-Assistant.git
cd Research-Assistant

cd frontend
npm install
npm run dev

cd ../backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

OPENAI_API_KEY=your_openai_api_key_here

uvicorn app.main:app --reload
