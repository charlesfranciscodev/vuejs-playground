import bcrypt
import dateutil.parser

from functools import wraps

from flask import Blueprint, jsonify, request, render_template, Response

from project.api.models import Contact, Project
from project import db

contacts_blueprint = Blueprint(
    "contacts",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        response = {
            "message": "Please provide a valid auth token."
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
        if contact is None:
            return jsonify(response), 401
        return f(value, *args, **kwargs)
    return decorated_function


@contacts_blueprint.route("/")
def index():
    return render_template("index.html")


@contacts_blueprint.route("/login", methods=["POST"])
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


@contacts_blueprint.route("/api/contacts")
def get_contacts():
    response = []
    contacts = db.session.query(Contact).all()
    for contact in contacts:
        response.append(contact.to_dict())
    return jsonify(response)


@contacts_blueprint.route("/api/contacts/<int:contact_id>", methods=["GET", "DELETE"])
def get_contact(contact_id):
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    if contact is None:
        return Response(status=404)
    if request.method == "GET":
        return jsonify(contact.to_dict())
    elif request.method == "DELETE":
        db.session.delete(contact)
        db.session.commit()
        return Response(status=204)


@contacts_blueprint.route("/api/contacts", methods=["POST", "PUT"])
def create_or_update_contact():
    response = {}
    request_json = request.get_json()
    contact = None

    # Validation
    keys = ["first_name", "last_name", "username", "email", "birthdate", "phone_number", "avatar_url", "description"]
    if request.method == "POST":
        keys.append("password")
    elif request.method == "PUT":
        keys.append("contact_id")
    for key in keys:
        if key not in request_json:
            response["message"] = "Missing {key} in request body".format(key=key)
            return jsonify(response), 400

    contact_id = int(request_json["contact_id"]) if request.method == "PUT" else None

    email = request_json["email"]
    contact = Contact.query.filter_by(email=email).first()
    if contact is not None and (request.method == "POST" or contact.contact_id != contact_id):
        response["message"] = "Email already exists"
        return jsonify(response), 409

    username = request_json["username"]
    contact = Contact.query.filter_by(username=username).first()
    if contact is not None and (request.method == "POST" or contact.contact_id != contact_id):
        response["message"] = "Username already exists"
        return jsonify(response), 409

    # Parse the request data
    if request.method == "POST":
        contact = Contact()
    elif request.method == "PUT":
        contact = Contact.query.filter_by(contact_id=contact_id).first()
        if contact is None:
            response["message"] = "Contact not found"
            return jsonify(response), 404

    contact.first_name = request_json["first_name"]
    contact.last_name = request_json["last_name"]
    contact.username = request_json["username"]
    contact.email = email
    contact.birthdate = dateutil.parser.parse(request_json["birthdate"])
    contact.phone_number = request_json["phone_number"]
    contact.avatar_url = request_json["avatar_url"]
    contact.description = request_json["description"]
    if "password" in request_json:
        contact.hash_password(request_json["password"])
    if "projects" in request_json:
        if request.method == "PUT":
            contact.projects = []
        for project_dict in request_json["projects"]:
            project = Project.query.filter_by(project_id=project_dict["project_id"]).first()
            contact.projects.append(project)

    if request.method == "POST":
        db.session.add(contact)
        response["message"] = "Contact created successfully"
    elif request.method == "PUT":
        response["message"] = "Contact updated successfully"
    db.session.commit()
    response["contact_id"] = contact.contact_id
    
    return jsonify(response), 201


@contacts_blueprint.route("/api/test")
def test():
    response = {
        "message": "Yo mamma so fat even penguins are jealous of the way she waddles."
    }
    return jsonify(response)
