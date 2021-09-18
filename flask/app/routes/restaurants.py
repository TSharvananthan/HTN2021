from app.db.queries import search_restaurants, get_restaurant_by_id, search_locations
from flask import request

def restaurant_routes(app):
    @app.route("/api/restaurants/locations", methods=["GET"])
    def get_restaurant_locations():
        page = request.args.get('page') or 1
        page_size = request.args.get('pageSize') or 10

        response = search_locations(int(page), int(page_size))
        return response, 200

    @app.route("/api/restaurants", methods=["GET"])
    def get_restaurants():
        name = request.args.get('name')
        location = request.args.get('location')
        page = request.args.get('page') or 1
        page_size = request.args.get('pageSize') or 10

        response = search_restaurants(name, location, int(page), int(page_size))
        return response, 200

    @app.route("/api/restaurants/<restaurant_id>", methods=["GET"])
    def get_one_restaurant(restaurant_id):
        response = get_restaurant_by_id(restaurant_id)
        return response, 200