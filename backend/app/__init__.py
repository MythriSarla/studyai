from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Allow requests from the React frontend (running on Vite's default port)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return {"status": "ok", "message": "StudyAI backend is running"}, 200

    return app
