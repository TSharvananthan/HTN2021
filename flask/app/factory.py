from app.errors.handlers import register_error_handlers
from app.routes import register_routes
from flask import Flask
from config import DevConfig
from config.logger import init_logger
import tasks

init_logger()


def create_app(type="app"):
    app = Flask(__name__)

    cfg = DevConfig()

    app.config.from_object(cfg)
    configure_celery(app, tasks.celery)

    register_error_handlers(app)
    register_routes(app)

    return app if type == "app" else tasks.celery


def create_flask():
    return create_app(type="app")


def create_celery():
    return create_app("worker")


def configure_celery(app, celery):

    # set broker url and result backend from app config
    celery.conf.broker_url = app.config["CELERY_BROKER_URL"]
    celery.conf.result_backend = app.config["CELERY_RESULT_BACKEND"]

    # subclass task base for app context
    # http://flask.pocoo.org/docs/0.12/patterns/celery/
    TaskBase = celery.Task

    class AppContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = AppContextTask

    # run finalize to process decorated tasks
    celery.finalize()