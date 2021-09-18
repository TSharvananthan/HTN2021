from app.routes.reviews import review_routes
from app.routes.businesses import business_routes
from app.routes.task_status import task_routes
import tasks


def register_routes(app):
    @app.route("/api/ping", methods=["GET"])
    def ping():
        app.logger.info("Server was pinged and it ponged")
        return {"ping": "pong"}, 200

    @app.route("/api/test-task", methods=["GET"])
    def test_task():
        task_ids = [None] * 10
        for i in range(10):
            tid = tasks.add.delay(i, 5)
            task_ids[i] = tid.id
            app.logger.info("Task[%s] started", tid)
        return {"tasks": task_ids}, 200

    review_routes(app)
    business_routes(app)
    task_routes(app)
