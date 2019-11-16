import os


class BaseConfig:
    """Base configuration"""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TOKEN_EXPIRATION_DAYS = 30
    TOKEN_EXPIRATION_SECONDS = 0
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")


class DevelopmentConfig(BaseConfig):
    SECRET_KEY = "9a39bf1d2039ceab910f5905149e74a0"


class ProductionConfig(BaseConfig):
    """Production configuration"""
    SECRET_KEY = os.environ.get("SECRET_KEY")
