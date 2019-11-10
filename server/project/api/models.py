import datetime
import jwt

from flask import current_app
from project import db


class Contact(db.Model):
    __tablename__ = "contact"
    contact_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        contact_dict = {
            "contact_id": self.contact_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "birthdate": self.birthdate.strftime("%Y-%m-%d"),
            "phone_number": self.phone_number,
            "avatar_url": self.avatar_url,
            "description": self.description,
        }
        return contact_dict

    def to_partial_dict(self):
        contact_dict = {
            "contact_id": self.contact_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar_url": self.avatar_url
        }
        return contact_dict
