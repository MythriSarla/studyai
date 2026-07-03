import os
from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
    JWTManager(app)

    CORS(app,
         resources={r"/api/*": {"origins": "*"}},
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         supports_credentials=False
    )

    from app.config.firebase_config import initialize_firebase
    initialize_firebase()

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return {"status": "ok", "message": "StudyAI backend is running"}, 200

    from app.routes.auth_routes import auth_bp
    from app.routes.upload_routes import upload_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(upload_bp)

    return app
