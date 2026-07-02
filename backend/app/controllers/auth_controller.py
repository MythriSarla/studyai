from flask import jsonify
from flask_jwt_extended import create_access_token
from firebase_admin import auth as firebase_auth, firestore

db = firestore.client()


def signup_user(data):
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    name = data.get("name", "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Name, email, and password are required"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    try:
        # Create user in Firebase Authentication
        firebase_user = firebase_auth.create_user(
            email=email,
            password=password,
            display_name=name
        )

        # Store additional user info in Firestore
        db.collection("users").document(firebase_user.uid).set({
            "uid": firebase_user.uid,
            "email": email,
            "name": name,
            "created_at": firestore.SERVER_TIMESTAMP
        })

        access_token = create_access_token(identity=firebase_user.uid)
        return jsonify({
            "message": "Account created successfully",
            "access_token": access_token,
            "user": {
                "uid": firebase_user.uid,
                "email": email,
                "name": name
            }
        }), 201

    except firebase_auth.EmailAlreadyExistsError:
        return jsonify({"error": "An account with this email already exists"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def login_user(data):
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Verify user exists in Firebase Auth
        firebase_user = firebase_auth.get_user_by_email(email)

        # Get user profile from Firestore
        user_doc = db.collection("users").document(firebase_user.uid).get()
        user_data = user_doc.to_dict() if user_doc.exists else {}
        name = user_data.get("name", firebase_user.display_name or "")

        access_token = create_access_token(identity=firebase_user.uid)
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "uid": firebase_user.uid,
                "email": email,
                "name": name
            }
        }), 200

    except firebase_auth.UserNotFoundError:
        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
