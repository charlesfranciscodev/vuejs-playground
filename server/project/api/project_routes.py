import dateutil.parser

from flask import Blueprint, jsonify, request, render_template, Response

from project.api.models import Contact, Project
from project.api.contact_routes import login_required
from project import db

projects_blueprint = Blueprint(
    "projects",
    __name__
)


@projects_blueprint.route("/api/projects")
@login_required
def get_projects(contact_id):
    response = []
    contact = Contact.query.filter_by(contact_id=contact_id).first()
    for project in contact.projects:
        response.append(project.to_partial_dict())
    return jsonify(response)


@projects_blueprint.route("/api/projects/<int:project_id>")
@login_required
def get_project(contact_id, project_id):
    project = Project.query.filter_by(project_id=project_id).first()
    if project is None:
        return Response(status=404)
    for contact in project.contacts:
        if contact.contact_id == contact_id:
            return jsonify(project.to_dict())
    response = {
        "message": "You are not assigned to this project."
    }
    return jsonify(response), 403
