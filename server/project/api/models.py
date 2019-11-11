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
    email = db.Column(db.String(255), unique=True, nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    projects = db.relationship(
        "Project",
        secondary=contact_project,
        lazy="subquery",
        backref=db.backref("contacts", lazy=True)
    )

    @staticmethod
    def hash_password(password):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt).decode()

    def to_dict(self):
        contact_dict = {
            "contact_id": self.contact_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "birthdate": self.birthdate.strftime("%Y-%m-%d"),
            "phone_number": self.phone_number,
            "avatar_url": self.avatar_url,
            "description": self.description,
            "projects": [project.to_partial_dict() for project in self.projects]
        }
        return contact_dict

    def to_partial_dict(self):
        contact_dict = {
            "contact_id": self.contact_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar_url": self.avatar_url,
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
