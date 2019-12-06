import os

from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


# instantiate the db
db = SQLAlchemy()

cors = CORS()


def page_not_found(e):
    return render_template("404.html"), 404


def create_app(script_info=None):
    # instantiate the app
    app = Flask(__name__)

    # set config
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # set up extensions
    db.init_app(app)
    cors.init_app(app)

    # import here to prevent circular import
    from project.api.error_routes import error_blueprint
    from project.api.auth_routes import auth_blueprint
    from project.api.contact_routes import contacts_blueprint
    from project.api.project_routes import projects_blueprint
    from project.api.test_routes import test_blueprint

    # register blueprints
    app.register_blueprint(error_blueprint)
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(contacts_blueprint)
    app.register_blueprint(projects_blueprint)
    app.register_blueprint(test_blueprint)
    app.register_error_handler(404, page_not_found)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
