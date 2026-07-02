from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.upload_controller import upload_file

upload_bp = Blueprint("upload", __name__, url_prefix="/api")


@upload_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload():
    user_uid = get_jwt_identity()
    file = request.files.get("file")
    return upload_file(file, user_uid)
