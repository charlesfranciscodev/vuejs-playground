import dateutil.parser

from flask import Blueprint, jsonify, request, render_template, Response

from project.api.models import Contact
from project import db

blueprint = Blueprint(
    "contacts",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


@blueprint.route("/")
def index():
    return render_template("index.html")


@blueprint.route("/api/contacts")
def contacts():
    response = []
    contacts = db.session.query(Contact).all()
    for contact in contacts:
        response.append(contact.to_dict())
    return jsonify(response)


@blueprint.route("/api/contacts/<int:contact_id>")
def contact(contact_id):
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    if contact is None:
        return Response(status=404)
    return jsonify(contact.to_dict())


@blueprint.route("/api/contacts", methods=["POST", "PUT"])
def create_or_update_contact():
    response = {}
    request_json = request.get_json()
    contact = None

    # Validation
    keys = ["firstName", "lastName", "email", "birthdate", "phoneNumber", "avatarUrl"]
    if request.method == "PUT":
        keys.append("contact_id")
    for key in keys:
        if not request_json.get(key):
            response["message"] = "Missing {key} in request body".format(key=key)
            return jsonify(response), 400

    email = request_json["email"]
    if request.method == "POST":
        contact = Contact.query.filter_by(email=email).first()
        if contact is not None:
            response["message"] = "Email already exists"
            return jsonify(response), 409

    # Parse the request data
    if request.method == "POST":
        contact = Contact()
    elif request.method == "PUT":
        contact_id = int(request_json["contact_id"])
        contact = Contact.query.filter_by(contact_id=contact_id).first()
        if contact is None:
            response["message"] = "Contact not found"
            return jsonify(response), 404

    contact.first_name = request_json["firstName"]
    contact.last_name = request_json["lastName"]
    contact.email = email
    contact.birthdate = dateutil.parser.parse(request_json["birthdate"])
    contact.phone_number = request_json["phoneNumber"]
    contact.avatar_url = request_json["avatarUrl"]

    if request.method == "POST":
        db.session.add(contact)
        response["message"] = "Contact created successfully"
    elif request.method == "PUT":
        response["message"] = "Contact updated successfully"
    db.session.commit()
    
    return jsonify(response), 201


@blueprint.route("/api/contacts/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    if contact is None:
        return Response(status=404)
    db.session.delete(contact)
    db.session.commit()
    return Response(status=204)


@blueprint.route("/api/test")
def test():
    response = {
        "message": "Yo mamma so fat even penguins are jealous of the way she waddles."
    }
    return jsonify(response)
