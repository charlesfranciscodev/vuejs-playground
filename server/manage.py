import json
import dateutil.parser

from flask.cli import FlaskGroup

from project import create_app, db
from project.api.models import Contact, Project, Platform

app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command("recreate_db")
def recreate_db():
    db.reflect()
    db.drop_all()
    db.create_all()
    db.session.commit()


def create_platforms():
    with open("platforms.json") as f:
        platforms = json.load(f)
        for platform_dict in platforms:
            platform = Platform()
            platform.name = platform_dict["name"]
            platform.icon_class = platform_dict["iconClass"]
            db.session.add(platform)
    db.session.commit()


def create_projects():
    with open("projects.json") as f:
        projects = json.load(f)
        for project_dict in projects:
            project = Project()
            project.name = project_dict["name"]
            project.release_date = project_dict["releaseDate"]
            project.website_url = project_dict["websiteUrl"]
            project.logo_url = project_dict["logoUrl"]
            project.description = project_dict["description"]
            for platform_id in project_dict["platforms"]:
                platform = Platform.query.filter_by(platform_id=platform_id).first()
                project.platforms.append(platform)
            db.session.add(project)
    db.session.commit()


def create_contacts():
    with open("contacts.json") as f:
        contacts = json.load(f)
        for contact_dict in contacts:
            contact = Contact()
            contact.first_name = contact_dict["firstName"]
            contact.last_name = contact_dict["lastName"]
            contact.username = contact_dict["username"]
            contact.hash_password(contact_dict["password"])
            contact.last_name = contact_dict["lastName"]
            contact.email = contact_dict["email"]
            contact.birthdate = dateutil.parser.isoparse(contact_dict["birthdate"])
            contact.phone_number = contact_dict["phoneNumber"]
            contact.avatar_url = contact_dict["avatarUrl"]
            contact.description = contact_dict["description"]
            for project_id in contact_dict["projects"]:
                project = Project.query.filter_by(project_id=project_id).first()
                contact.projects.append(project)
            db.session.add(contact)
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    """Seeds the database."""
    print("Creating Platforms")
    create_platforms()
    print("Creating Projects")
    create_projects()
    print("Creating Contacts")
    create_contacts()
    print("Done")


if __name__ == "__main__":
    cli()
