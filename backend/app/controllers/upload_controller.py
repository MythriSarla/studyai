import os
import uuid
from flask import jsonify
from firebase_admin import firestore
from app.utils.file_parser import extract_text_from_file
from app.services.groq_service import (
    generate_summary,
    generate_flashcards,
    generate_quiz
)

db = firestore.client()
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(file, user_uid):
    if not file or file.filename == "":
        return jsonify({"error": "No file provided"}), 400

    file_ext = file.filename.rsplit(".", 1)[1].lower()
    if not allowed_file(file.filename):
        return jsonify({"error": "Only PDF, DOCX, and TXT files are allowed"}), 400

    # Save file locally
    file_id = str(uuid.uuid4())
    filename = f"{file_id}.{file_ext}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        # Extract text from file
        extracted_text = extract_text_from_file(file_path, file_ext)

        if len(extracted_text) < 50:
            return jsonify({"error": "File has too little text to process"}), 400

        # Generate AI content
        summary = generate_summary(extracted_text)
        flashcards_data = generate_flashcards(extracted_text)
        quiz_data = generate_quiz(extracted_text)

        # Store everything in Firestore
        doc_ref = db.collection("uploads").document(file_id)
        doc_ref.set({
            "file_id": file_id,
            "user_uid": user_uid,
            "original_filename": file.filename,
            "file_type": file_ext,
            "extracted_text": extracted_text[:5000],
            "summary": summary,
            "flashcards": flashcards_data.get("flashcards", []),
            "quiz": quiz_data,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        return jsonify({
            "message": "File processed successfully",
            "file_id": file_id,
            "filename": file.filename,
            "summary": summary,
            "flashcards": flashcards_data.get("flashcards", []),
            "quiz": quiz_data
        }), 201

    except Exception as e:
        # Clean up file if processing fails
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500
