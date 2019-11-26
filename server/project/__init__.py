import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# instantiate the db
db = SQLAlchemy()

cors = CORS()


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
    from project.api.contact_routes import contacts_blueprint, page_not_found
    from project.api.project_routes import projects_blueprint

    # register blueprints
    app.register_blueprint(contacts_blueprint)
    app.register_blueprint(projects_blueprint)
    app.register_error_handler(404, page_not_found)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
