# SyncScript

SyncScript is an AI-powered code analysis tool that allows users to instantly generate plain-English summaries, dependency lists, and testing instructions for any code snippet. It leverages the power of the **Gemini 2.5 Flash** model via the official Google GenAI SDK.

## 🚀 Live Demo
**[https://syncscript-tvar.onrender.com](https://syncscript-tvar.onrender.com)**

*(Note: Hosted on Render's free tier. The server may take ~50 seconds to spin up if it has been inactive for 15 minutes.)*

## 🛠️ Tech Stack

* **Backend:** Python, Django, WhiteNoise
* **Frontend:** React, Vite, Tailwind CSS, React Markdown
* **AI Integration:** `google-genai` SDK (Gemini 2.5 Flash)
* **Deployment:** Render.com (Consolidated single-server deployment)

## 🏗️ Architecture

SyncScript uses a **Consolidated Deployment** architecture. The React frontend is built into static files using Vite, which are then served directly by the Django backend using WhiteNoise. This allows the entire application (both the API and the user interface) to be hosted on a single web service.

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/VaisakhCodes/syncscript.git
cd syncscript
```

### 2. Set up the Python Backend
Create a virtual environment and install the required Python packages:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Add your Gemini API Key
Create a `.env` file in the root of the project and add your API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Set up the React Frontend
Navigate to the frontend folder, install dependencies, and build the static files:
```bash
cd frontend
npm install
npm run build
cd ..
```

### 5. Run the Server
Start the Django development server:
```bash
python manage.py runserver
```
Navigate to `http://127.0.0.1:8000/` in your browser to use the app!

## 📦 Deployment (Render.com)

This project is configured to be deployed on Render as a single Web Service. 
The included `render-build.sh` script automatically handles building the frontend and installing the backend dependencies during deployment.

**Build Command:** `bash render-build.sh`
**Start Command:** `gunicorn myproject.wsgi:application`

Make sure to add `GEMINI_API_KEY` to your Render Environment Variables!
