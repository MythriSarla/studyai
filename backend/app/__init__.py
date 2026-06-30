import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    JWTManager(app)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return {"status": "ok", "message": "StudyAI backend is running"}, 200

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    return app
