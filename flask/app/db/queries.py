from bson.objectid import ObjectId
from app.db import mongo
from app.db.projections import business_projection, id_projection
from app.db.utils import serialize_doc, serialize_docs, serialize_id
from app.utils.misc import find, now


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


def get_business_by_id(business_id):
    business = mongo.db.businesses.find_one(business_id, projection=business_projection)
    return serialize_doc(business)


def search_businesses(name, location, page, page_size):
    filter_opts = {}

    if name:
        filter_opts["name"] = {"$regex": f"^{name}", "$options": "i"}

    if location:
        filter_opts["city"] = {"$regex": f"^{location}", "$options": "i"}

    total = mongo.db.businesses.find(filter=filter_opts).count()
    pagination = {"total": total, "page": page, "pageSize": page_size}

    businesses = mongo.db.businesses.find(
        filter=filter_opts,
        skip=(page - 1) * page_size,
        limit=page_size,
        projection=business_projection,
    )
    return {"businesses": serialize_docs(businesses), "pagination": pagination}


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

    result = list(mongo.db.businesses.aggregate(pipeline))
    result = result[0]

    return {"locations": result["data"], "pagination": result["metadata"][0]}


def search_reviews(business_id, business_name, page, page_size):
    filter_opts = {"sentiment": {"$exists": True}}
    business_docs = []

    if business_name:
        business_filter = {"name": {"$regex": f"^{business_name}", "$options": "i"}}
        business_docs = list(
            mongo.db.businesses.find(filter=business_filter, projection=business_projection)
        )
        business_ids = list(business_docs)
        business_ids = list(map(lambda id: id["_id"], business_ids))
        filter_opts["businessId"] = {"$in": business_ids}

    if business_id:
        filter_opts["businessId"] = business_id

    total = mongo.db.reviews.find(filter=filter_opts).count()
    pagination = {"total": total, "page": page, "pageSize": page_size}

    reviews = mongo.db.reviews.find(
        filter=filter_opts, skip=(page - 1) * page_size, limit=page_size
    )
    reviews = serialize_docs(reviews)

    if business_name:
      def map_business_to_review(review):
          business = find(lambda b: b["_id"] == review["businessId"], business_docs)
          review["business"] = business
          return review

      reviews = list(
          map(
              map_business_to_review,
              reviews,
          )
      )

    return {"reviews": reviews, "pagination": pagination}
