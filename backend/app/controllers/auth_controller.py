from flask import jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

# TEMPORARY in-memory user store.
# This will be replaced with Firebase Firestore in Phase 4.
# Structure: { "email": { "password_hash": "...", "name": "..." } }
fake_users_db = {}


def signup_user(data):
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    name = data.get("name", "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Name, email, and password are required"}), 400

    if email in fake_users_db:
        return jsonify({"error": "An account with this email already exists"}), 409

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    fake_users_db[email] = {
        "password_hash": generate_password_hash(password),
        "name": name,
    }

    access_token = create_access_token(identity=email)
    return jsonify({
        "message": "Account created successfully",
        "access_token": access_token,
        "user": {"email": email, "name": name}
    }), 201


def login_user(data):
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = fake_users_db.get(email)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {"email": email, "name": user["name"]}
    }), 200
