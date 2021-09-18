from app.errors import NotFoundError
from tasks import add


def task_routes(app):
    @app.route("/api/tasks/<task_id>/status", methods=["GET"])
    def get_task_status(task_id):
        task = add.AsyncResult(task_id)
        if not task:
            raise NotFoundError()

        response = {"result": None}

        if task.state == "PENDING":
            response["status"] = "pending"
        elif task.state != "FAILURE":
            response["status"] = "success"
            response["result"] = task.info
        else:
            response["status"] = "fail"
            response["result"] = task.info

        return response, 200