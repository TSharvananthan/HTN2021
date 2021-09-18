from app.constants import DEFAULT_PAGE, DEFAULT_PAGE_SIZE
from app.db.queries import search_businesses, get_business_by_id, search_locations
from flask import request

def business_routes(app):
    @app.route("/api/businesses/locations", methods=["GET"])
    def get_business_locations():
        page = request.args.get('page') or DEFAULT_PAGE
        page_size = request.args.get('pageSize') or DEFAULT_PAGE_SIZE

        response = search_locations(int(page), int(page_size))
        return response, 200

    @app.route("/api/businesses", methods=["GET"])
    def get_businesses():
        name = request.args.get('name')
        location = request.args.get('location')
        page = request.args.get('page') or DEFAULT_PAGE
        page_size = request.args.get('pageSize') or DEFAULT_PAGE_SIZE

        response = search_businesses(name, location, int(page), int(page_size))
        return response, 200

    @app.route("/api/businesses/<business_id>", methods=["GET"])
    def get_one_business(business_id):
        response = get_business_by_id(business_id)
        return response, 200