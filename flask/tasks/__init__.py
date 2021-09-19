from tasks.utils import predict_json
from time import sleep
from celery import Celery
from tasks.db import Mongo

celery = Celery(__name__, autofinalize=False)
celery.config_from_object(__name__)

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls test('hello') every 10 seconds.
    sender.add_periodic_task(10.0, process_review.s(), name="sentiment analysis")


@celery.task(bind=True)
def add(self, x, y):
    print("sleeping for 30 seconds...")
    sleep(30)
    print("woke up")
    print(f"Sum is: {x+y}")
    return x + y


@celery.task(bind=True)
def process_review(self):
    mongo = Mongo()

    raw = mongo.get_raw_reviews()

    instances = list(map(lambda i: i["text"], raw))

    result = predict_json(instances=instances)
    rids = []
    for r in raw:
        rids.append((r["_id"]))

    for i in range(len(rids)):
        mongo.save_sentiment_data(rids[i], result[i])

    return {"updated": rids, "result": result}

celery.conf.beat_schedule = {
    "sentiment-analysis": {
    "task": "tasks.process_review",
    "schedule": 10.0
}
}