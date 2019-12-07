import bcrypt
from functools import wraps

from flask import Blueprint, jsonify, request

from project.api.error_routes import custom_error_handler
from project.api.models import Contact


auth_blueprint = Blueprint(
    "auth",
    __name__
)


def login_required(admin_required=False):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            response = {
                "message": "Please provide an authentication token."
            }
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return jsonify(response), 401
            auth_token = auth_header.split(" ")[1]
            value = Contact.decode_auth_token(auth_token)
            if isinstance(value, str):
                response["message"] = value
                return jsonify(response), 401
            contact = Contact.query.filter_by(contact_id=value).first()
            if contact is None or (not contact.is_admin and admin_required):
                response["message"] = "Admin permissions required"
                return jsonify(response), 401
            return f(value, *args, **kwargs)
        return decorated_function
    return decorator


@auth_blueprint.route("/login", methods=["POST"])
@custom_error_handler
def login():
    response = {}
    request_json = request.get_json()
    username = request_json["username"]
    password = request_json["password"].encode("utf-8")

    # verify credentials
    contact = Contact.query.filter_by(username=username).first()
    if contact is None:
        response["message"] = "Invalid username or password."
        return jsonify(response), 401
    hashed_password = bcrypt.hashpw(password, contact.salt.encode("utf-8")).decode()
    if hashed_password != contact.hashed_password:
        response["message"] = "Invalid username or password."
        return jsonify(response), 401

    # Generate auth token
    auth_token = contact.encode_auth_token()
    response = contact.to_partial_dict()
    response["token"] = auth_token.decode()
    return jsonify(response)
