from flask import Blueprint, jsonify, render_template

from project.api.error_routes import custom_error_handler


test_blueprint = Blueprint(
    "test",
    __name__,
    template_folder="./templates",
    static_folder="static",
    static_url_path="/api/static"
)


@test_blueprint.route("/example")
@custom_error_handler
def example():
    """Example route to link to from the Vue.js app."""
    return render_template("example.html")


@test_blueprint.route("/error-example")
@custom_error_handler
def error_example():
    """Error example route which fails intentionally."""
    return render_template("does-not-exist.html")


@test_blueprint.route("/api/test")
@custom_error_handler
def test():
    response = {
        "message": "Yo mamma so fat even penguins are jealous of the way she waddles."
    }
    return jsonify(response)
