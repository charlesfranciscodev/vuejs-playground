import dateutil.parser

from flask import Blueprint, jsonify, request, render_template, Response

from project.api.models import Project
from project import db

projects_blueprint = Blueprint(
    "projects",
    __name__
)

@projects_blueprint.route("/api/projects")
def get_projects():
    response = []
    projects = db.session.query(Project).all()
    for project in projects:
        response.append(project.to_partial_dict())
    return jsonify(response)


@projects_blueprint.route("/api/projects/<int:project_id>")
def get_project(project_id):
    project = Project.query.filter_by(project_id=project_id).first()
    if project is None:
        return Response(status=404)
    return jsonify(project.to_dict())
