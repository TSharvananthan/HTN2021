from time import sleep
from celery import Celery

celery = Celery(__name__, autofinalize=False)


@celery.task(bind=True)
def add(self, x, y):
    print("sleeping for 30 seconds...")
    sleep(30)
    print("woke up")
    print(f"Sum is: {x+y}")
    return x + y
