import json
import dateutil.parser

from flask.cli import FlaskGroup

from project import create_app, db
from project.api.models import Contact

app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command("recreate_db")
def recreate_db():
    db.reflect()
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    """Seeds the database."""
    with open("contacts.json") as file:
        contacts = json.load(file)
        for contact_dict in contacts:
            contact = Contact()
            contact.first_name = contact_dict["firstName"]
            contact.last_name = contact_dict["lastName"]
            contact.email = contact_dict["email"]
            contact.birthdate = dateutil.parser.parse(contact_dict["birthdate"])
            contact.phone_number = contact_dict["phoneNumber"]
            contact.avatar_url = contact_dict["avatarUrl"]
            db.session.add(contact)
    db.session.commit()

if __name__ == "__main__":
    cli()
