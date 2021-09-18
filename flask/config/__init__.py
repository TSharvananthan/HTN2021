import os


class Config(object):
    DEBUG = False
    TESTING = False

    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_TIMEOUT = 5000

    CELERY_BROKER_URL = os.getenv("REDIS_URI")
    CELERY_RESULT_BACKEND = os.getenv("REDIS_URI")


class DevConfig(Config):
    DEBUG = True
