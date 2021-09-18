from app.db.queries import search_reviews
from flask import request


def review_routes(app):
    @app.route("/api/reviews", methods=["GET"])
    def get_reviews():
        restaurant_id = request.args.get("restaurantId")
        restaurant_name = request.args.get("restaurantName")
        page = request.args.get("page") or 1
        page_size = request.args.get("pageSize") or 10

        response = search_reviews(
            restaurant_id, restaurant_name, int(page), int(page_size)
        )
        return response, 200
