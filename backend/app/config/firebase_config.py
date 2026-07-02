import os
import json
import base64
import firebase_admin
from firebase_admin import credentials


def initialize_firebase():
    if not firebase_admin._apps:
        # In production, load from environment variable
        firebase_b64 = os.getenv("FIREBASE_SERVICE_ACCOUNT_B64")
        if firebase_b64:
            service_account_info = json.loads(base64.b64decode(firebase_b64).decode("utf-8"))
            cred = credentials.Certificate(service_account_info)
        else:
            # In development, load from local JSON file
            cred_path = os.path.join(
                os.path.dirname(__file__),
                "firebase-service-account.json"
            )
            cred = credentials.Certificate(cred_path)

        firebase_admin.initialize_app(cred)
        print("Firebase initialized successfully")
