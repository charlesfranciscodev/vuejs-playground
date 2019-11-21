import datetime
import bcrypt
import jwt

from flask import current_app
from project import db


contact_project = db.Table(
    "contact_project",
    db.Column(
        "contact_id",
        db.Integer,
        db.ForeignKey("contact.contact_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    ),
    db.Column(
        "project_id",
        db.Integer,
        db.ForeignKey("project.project_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    )
)


project_platform = db.Table(
    "project_platform",
    db.Column(
        "project_id",
        db.Integer,
        db.ForeignKey("project.project_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    ),
    db.Column(
        "platform_id",
        db.Integer,
        db.ForeignKey("platform.platform_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    )
)


class Contact(db.Model):
    __tablename__ = "contact"
    contact_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    hashed_password = db.Column(db.String(60), nullable=False)
    salt = db.Column(db.String(29), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.Text, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    description = db.Column(db.Text, nullable=False)
    projects = db.relationship(
        "Project",
        secondary=contact_project,
        lazy="subquery",
        backref=db.backref("contacts", lazy=True)
    )

    def hash_password(self, password):
        salt = bcrypt.gensalt()
        self.hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt).decode()
        self.salt = salt.decode()

    def encode_auth_token(self):
        """Generate the auth token."""
        now = datetime.datetime.utcnow()
        delta = datetime.timedelta(
            days=current_app.config.get("TOKEN_EXPIRATION_DAYS"),
            seconds=current_app.config.get("TOKEN_EXPIRATION_SECONDS")
        )
        payload = {
            "exp": now + delta,
            "iat": now,
            "sub": self.contact_id
        }
        return jwt.encode(
            payload,
            current_app.config.get("SECRET_KEY"),
            algorithm="HS256"
        )

    @staticmethod
    def decode_auth_token(auth_token):
        """Decode the auth token."""
        try:
            payload = jwt.decode(
                auth_token,
                current_app.config.get("SECRET_KEY")
            )
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."

    def to_dict(self):
        contact_dict = self.to_spreadsheet_dict()
        contact_dict["description"] = self.description
        contact_dict["projects"] = [project.to_partial_dict() for project in self.projects]
        return contact_dict

    def to_spreadsheet_dict(self):
        contact_dict = self.to_partial_dict()
        contact_dict["email"] = self.email
        contact_dict["birthdate"] = "{}Z".format(self.birthdate.isoformat())
        contact_dict["short_birthdate"] = self.birthdate.isoformat().split(".")[0]
        contact_dict["phone_number"] = self.phone_number
        return contact_dict

    def to_partial_dict(self):
        contact_dict = {
            "contact_id": self.contact_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "avatar_url": self.avatar_url,
            "is_admin": self.is_admin
        }
        return contact_dict


class Project(db.Model):
    __tablename__ = "project"
    project_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    website_url = db.Column(db.Text, nullable=False)
    logo_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    platforms = db.relationship(
        "Platform",
        secondary=project_platform,
        lazy="subquery",
        backref=db.backref("projects", lazy=True)
    )

    def to_dict(self):
        project_dict = {
            "project_id": self.project_id,
            "name": self.name,
            "release_date": self.release_date.strftime("%Y-%m-%d"),
            "website_url": self.website_url,
            "logo_url": self.logo_url,
            "description": self.description,
            "platforms": [platform.to_dict() for platform in self.platforms]
        }
        return project_dict

    def to_partial_dict(self):
        project_dict = {
            "project_id": self.project_id,
            "name": self.name,
            "logo_url": self.logo_url,
        }
        return project_dict


class Platform(db.Model):
    __tablename__ = "platform"
    platform_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    icon_class = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        platform_dict = {
            "platform_id": self.platform_id,
            "name": self.name,
            "icon_class": self.icon_class,
        }
        return platform_dict
