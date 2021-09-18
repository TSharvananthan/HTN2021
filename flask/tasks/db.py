import os
from bson.objectid import ObjectId
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")


class Mongo:
    def __init__(self):
        self.conn = MongoClient(MONGO_URI, connect=False)

    def save_sentiment_data(self, review_id, stats):
        """
        Save computed stats for a review to db
        """
        self.conn["db"]["reviews"].find_one_and_update(
            {"_id": review_id}, {"$set": {"analysis": stats}}
        )
