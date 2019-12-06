from functools import wraps

import dateutil.parser
import pandas
from flask import (
    Blueprint, jsonify, request, render_template, Response, send_file,
    session, redirect, url_for
)

from project import db
from project.api.auth_routes import login_required
from project.api.error_routes import custom_error_handler
from project.api.models import Contact, Project


contacts_blueprint = Blueprint(
    "contacts",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


@contacts_blueprint.route("/")
@custom_error_handler
def index():
    """Render the Home Page template."""
    return render_template("index.html")


@contacts_blueprint.route("/download/contacts-pandas")
@custom_error_handler
def download_contacts():
    data = []
    contacts = db.session.query(Contact).all()
    for contact in contacts:
        data.append(contact.to_spreadsheet_dict())
    dataframe = pandas.DataFrame(data)
    file_name = "contacts-pandas.xlsx"
    absolute_path = "/usr/src/app/project/api/static/spreadsheet/{}".format(file_name)
    writer = pandas.ExcelWriter(absolute_path, engine="xlsxwriter")
    dataframe.to_excel(writer, index=False)
    writer.save()
    return send_file(absolute_path, mimetype="application/vnd.ms-excel", as_attachment=True)


@contacts_blueprint.route("/api/contacts")
@custom_error_handler
def get_contacts():
    response = []
    contacts = db.session.query(Contact).all()
    for contact in contacts:
        response.append(contact.to_spreadsheet_dict())
    return jsonify(response)


@contacts_blueprint.route("/api/contacts/<int:contact_id>")
@custom_error_handler
def get_contact(contact_id):
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    if contact is None:
        return Response(status=404)
    return jsonify(contact.to_dict())


@contacts_blueprint.route("/api/contacts/<int:contact_id>", methods=["DELETE"], endpoint="delete_contact")
@login_required(admin_required=True)
@custom_error_handler
def delete_contact(user_id, contact_id):
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    if contact is None:
        return Response(status=404)
    db.session.delete(contact)
    db.session.commit()
    return Response(status=204)


@contacts_blueprint.route("/api/contacts", methods=["POST", "PUT"], endpoint="create_or_update_contact")
@login_required(admin_required=True)
@custom_error_handler
def create_or_update_contact(user_id):
    response = {}
    request_json = request.get_json()
    contact = None

    # Validation
    keys = ["first_name", "last_name", "username", "email", "short_birthdate", "phone_number", "avatar_url", "description"]
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
    contact.birthdate = dateutil.parser.parse(request_json["short_birthdate"])
    contact.phone_number = request_json["phone_number"]
    contact.avatar_url = request_json["avatar_url"]
    contact.description = request_json["description"]
    if "password" in request_json:
        contact.hash_password(request_json["password"])
    if "is_admin" in request_json:
        contact.is_admin = request_json["is_admin"]
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
