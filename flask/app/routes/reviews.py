from app.constants import DEFAULT_PAGE, DEFAULT_PAGE_SIZE
from app.constants import DEFAULT_PAGE, DEFAULT_PAGE_SIZE
from app.db.queries import search_reviews
from flask import request


def review_routes(app):
    @app.route("/api/reviews", methods=["GET"])
    def get_reviews():
        business_id = request.args.get("businessId")
        business_name = request.args.get("businessName")
        page = request.args.get("page") or DEFAULT_PAGE
        page_size = request.args.get("pageSize") or DEFAULT_PAGE_SIZE

        response = search_reviews(
            business_id, business_name, int(page), int(page_size)
        )
        return response, 200
