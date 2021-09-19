import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

class Mongo:
    def __init__(self):
        self.conn = MongoClient(MONGO_URI, connect=False)

    def get_raw_reviews(self):
        """
        Query for review docs which do not have the "sentiment" field
        """
        filter_dict = {"sentiment": {"$exists": False}}
        raw_reviews = self.conn["db"]["reviews"].find(filter=filter_dict, limit=500)
        return list(raw_reviews)

    def save_sentiment_data(self, review_id, stats):
        """
        Save computed stats for a review to db
        """
        self.conn["db"]["reviews"].find_one_and_update(
            {"_id": review_id}, {"$set": {"sentiment": stats}}
        )
