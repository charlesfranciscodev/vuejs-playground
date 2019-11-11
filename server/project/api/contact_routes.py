import dateutil.parser

from flask import Blueprint, jsonify, request, render_template, Response

from project.api.models import Contact
from project import db

contacts_blueprint = Blueprint(
    "contacts",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


@contacts_blueprint.route("/")
def index():
    return render_template("index.html")


@contacts_blueprint.route("/api/contacts")
def get_contacts():
    response = []
    contacts = db.session.query(Contact).all()
    for contact in contacts:
        response.append(contact.to_partial_dict())
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
    keys = ["first_name", "last_name", "email", "birthdate", "phone_number", "avatar_url", "description"]
    if request.method == "PUT":
        keys.append("contact_id")
    for key in keys:
        if key not in request_json:
            response["message"] = "Missing {key} in request body".format(key=key)
            return jsonify(response), 400

    email = request_json["email"]
    contact_id = int(request_json["contact_id"]) if request.method == "PUT" else None
    contact = Contact.query.filter_by(email=email).first()
    if contact is not None and (request.method == "POST" or contact.contact_id != contact_id):
        response["message"] = "Email already exists"
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
    contact.email = email
    contact.birthdate = dateutil.parser.parse(request_json["birthdate"])
    contact.phone_number = request_json["phone_number"]
    contact.avatar_url = request_json["avatar_url"]
    contact.description = request_json["description"]

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
