from flask import Blueprint, jsonify, request, render_template

from project.api.models import Contact
from project import db

blueprint = Blueprint("contacts", __name__, template_folder="./templates", static_folder="static", static_url_path="/api/static")


@blueprint.route("/")
def index():
    return render_template("index.html")


@blueprint.route("/api/test")
def test():
    response = {
        "message": "Yo mamma so fat even penguins are jealous of the way she waddles."
    }
    return jsonify(response)
