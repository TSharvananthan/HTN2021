from bson.objectid import ObjectId
from app.db import mongo
from app.db.projections import restaurant_projection, id_projection
from app.db.utils import serialize_doc, serialize_docs, serialize_id
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


def get_restaurant_by_id(restaurant_id):
    restaurant = mongo.db.restaurants.find_one(
        restaurant_id, projection=restaurant_projection
    )
    return serialize_doc(restaurant)


def search_restaurants(name, location, page, page_size):
    filter_opts = {}

    if name:
        filter_opts["name"] = {"$regex": f"^{name}", "$options": "i"}

    if location:
        filter_opts["city"] = {"$regex": f"^{location}", "$options": "i"}

    total = mongo.db.restaurants.find(filter=filter_opts).count()
    pagination = {"total": total, "page": page, "pageSize": page_size}

    restaurants = mongo.db.restaurants.find(
        filter=filter_opts,
        skip=(page - 1) * page_size,
        limit=page_size,
        projection=restaurant_projection,
    )
    return {"restaurants": serialize_docs(restaurants), "pagination": pagination}


def search_locations(page, page_size):
    pipeline = [
        {
            "$project": {
                "city": True,
            }
        },
        {
            "$group": {
                "_id": "$city",
            }
        },
        {
            "$facet": {
                "metadata": [
                    {"$count": "total"},
                    {
                        "$addFields": {
                            "page": page,
                            "pageSize": page_size,
                        },
                    },
                ],
                "data": [
                    {"$skip": (page - 1) * page_size},
                    {"$limit": page_size},
                    {
                        "$project": {
                            "city": "$_id",
                            "_id": False,
                        },
                    },
                ],
            },
        },
    ]

    result = list(mongo.db.restaurants.aggregate(pipeline))
    result = result[0]

    return {"locations": result["data"], "pagination": result["metadata"][0]}


def search_reviews(restaurant_id, restaurant_name, page, page_size):
    filter_opts = {}

    if restaurant_name:
        restaurant_filter = {"name": {"$regex": f'^{restaurant_name}', "$options": "i"}}
        restaurant_ids = mongo.db.restaurants.find(
            filter=restaurant_filter, projection=id_projection
        )
        restaurant_ids = list(restaurant_ids)
        restaurant_ids = list(map(lambda id: id["_id"], restaurant_ids))
        filter_opts["businessId"] = {"$in": restaurant_ids}

    if restaurant_id:
        filter_opts["businessId"] = restaurant_id

    print(filter_opts)

    total = mongo.db.reviews.find(filter=filter_opts).count()
    pagination = {"total": total, "page": page, "pageSize": page_size}

    reviews = mongo.db.reviews.find(
        filter=filter_opts, skip=(page - 1) * page_size, limit=page_size
    )
    return {"reviews": serialize_docs(reviews), "pagination": pagination}
