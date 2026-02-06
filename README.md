# Gabriel Paras Abiog - Portfolio Website

A modern, responsive portfolio website with an AI-powered chatbot featuring pre-prompted questions and answers.

## Features

- 🎨 Beautiful UI with Dark/Light mode toggle
- 💬 Interactive chatbot with pre-defined Q&A
- 📱 Fully responsive design
- ⚡ Fast and modern React frontend
- 🐍 Python Flask backend for chatbot API
- 🎯 Pre-prompted questions for quick interactions

## Tech Stack

### Frontend
- React.js
- CSS3 with modern animations
- Axios for API calls

### Backend
- Python Flask
- Flask-CORS for cross-origin requests
- Keyword-based Q&A matching system

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. **Clone the repository**
   ```bash
   cd Portfolio
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## Running the Application

### Start the Backend Server
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`

### Start the Frontend Development Server
In a new terminal:
```bash
npm start
```
The frontend will run on `http://localhost:3000`

## Project Structure

```
Portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Experience.js
│   │   ├── Projects.js
│   │   ├── Education.js
│   │   ├── Contact.js
│   │   └── Chatbot.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── backend/
│   ├── app.py
│   └── requirements.txt
├── package.json
└── README.md
```

## Chatbot Features

The chatbot includes pre-prompted questions:
- "What is your experience with AI development?"
- "Tell me about your projects"
- "What technologies do you use?"
- "How can I contact you?"
- "What certifications do you have?"

The chatbot uses keyword matching to provide relevant responses based on the user's questions.

## Customization

### Adding New Q&A Pairs
Edit `backend/app.py` and add new entries to the `qa_pairs` dictionary:

```python
"new_category": {
    "keywords": ["keyword1", "keyword2"],
    "response": "Your response here"
}
```

### Styling
All component styles are in their respective `.css` files. The color scheme uses CSS variables and can be easily customized.

## Deployment

### Option (recommended): Vercel (Frontend) + Render (Backend)

#### 1) Deploy Backend (Flask) to Render
- Create a **New Web Service** in Render
- Connect your GitHub repo
- Set **Root Directory** to `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`
- Render will automatically provide a `PORT` env var. The app is already configured to bind to `0.0.0.0`.

After deploying, you’ll get a public backend URL like:
- `https://your-backend.onrender.com`

#### 2) Set the Frontend API URL in Vercel
This project reads the backend URL from:
- `REACT_APP_API_BASE_URL`

Example value (NO trailing slash):
- `REACT_APP_API_BASE_URL=https://your-backend.onrender.com`

#### 3) Deploy Frontend (React) to Vercel
- Import your repo in Vercel
- Framework: **Create React App**
- Build command: `npm run build`
- Output directory: `build`
- Add the env var `REACT_APP_API_BASE_URL`

Once deployed, you’ll get a public URL like:
- `https://your-portfolio.vercel.app`

### Backend
Deploy the Flask app to services like:
- Heroku
- Railway
- Render
- AWS Elastic Beanstalk

Make sure to update the API endpoint in `src/components/Chatbot.js` if deploying to a different domain.

## License

This project is private and for personal use.

## Contact

Gabriel Paras Abiog
- Email: gabrielparasabiog@gmail.com
- Website: www.reallygreatsite.com

