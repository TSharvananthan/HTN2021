from bson.objectid import ObjectId
from pymongo import ReturnDocument

from app.db import mongo
from app.db.utils import serialize_doc, serialize_docs, serialize_id, serialize_ids
from app.utils.misc import now


def create_new_user():
    """
    Creates a new user in db with empty questions array and creation date
    @returns:  user_id - mongodb user document ID
    """
    user = {"createdOn": now()}
    user_doc = mongo.db.users.insert_one(user)
    return serialize_id(user_doc.inserted_id)


def get_user_by_id(user_id):
    """
    Get a user document from db if user_id is valid
    @param: user_id - _id for the corresponding user to get
    @returns: user doc as python dict if valid user_id, else None
    """
    user = mongo.db.users.find_one(ObjectId(user_id))
    return serialize_doc(user)

