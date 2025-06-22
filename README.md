# StudyNowAI

A smart study planner app built with React.js and Node.js that helps users manage subjects, schedule topics, and track progress efficiently.

---

## 🚀 Features

* 🔐 User authentication (JWT)
* 📚 Subject and topic management
* 📅 Study plan generation
* ✅ Topic completion tracking
* 📱 Mobile-responsive UI

---

## 🧰 Tech Stack

**Frontend:**

* React.js
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios
* Vite

**Backend:**

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT & Bcrypt

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v16+)
* MongoDB (local or cloud)

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/StudyNowAI.git
cd StudyNowAI
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Fill in required environment variables
npm start
```

3. **Frontend Setup**

```bash
cd frontend
npm install
cp .env.example .env
# Add your API URL (e.g., http://localhost:5000)
npm run dev
```

---

## 📁 Environment Variables

### Backend `.env`

```
MONGO_URI=mongodb://localhost:27017/studynowai
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/
```

---

## 🗂 Project Structure

```
StudyNowAI/
├── frontend/
│   ├── public/                    # Static files
│   └── src/
│       ├── components/           # Reusable UI components
│       ├── features/             # Redux slices and feature logic
│       ├── pages/                # Page components (Dashboard, Login, etc.)
│       ├── services/             # Axios API service functions
│       ├── redux/                # Store configuration
│       └── App.jsx, main.jsx     # Entry points
│   └── vite.config.js            # Vite configuration
│   └── package.json              # Frontend dependencies
│
├── backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Mongoose models (User, Subject, Topic)
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # Business logic (study plan generation, etc.)
│   │   └── middleware/           # Auth middleware, error handling
│   └── package.json              # Backend dependencies
│   └── server.js                 # App entry point
│
└── README.md
```

---

## 🚢 Deployment

### Frontend (Vercel)

* Connect GitHub repository
* Set `VITE_API_URL` in Vercel environment variables
* Deploy automatically on push

### Backend (Railway, Render, AWS, etc.)

* Upload backend repo
* Add environment variables
* Deploy and test API

---

## 🤖 AI Tools Used

* [ChatGPT](https://chat.openai.com/) – for architecture planning, code suggestions, and documentation
* [Cursor](https://cursor.sh/) – AI-powered coding assistant and IDE

---

**StudyNowAI** – Making studying simpler, smarter, and stress-free! 🎓
