from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('review', __name__, url_prefix='/reviews')


def _parse_review(data):
    review = {
        'review_id': data.get('review_id'),
        'rating': data['rating'],
        'title': data.get('title'),
        'body': data.get('body'),
        'order_id': data['order_id']
    }
    return review


@bp.route("/pharmacy/<int:pharmacy_id>", methods=["GET"])
def pharmacy_reviews(pharmacy_id):
    cursor = db.connection.cursor(DictCursor)
    pharmacy_reviews = {}
    cursor.execute("""SELECT body, rating, review_id, title FROM pharmacy_reviews WHERE pharmacy_id = %s""", (pharmacy_id,))
    pharmacy_reviews['reviews'] = cursor.fetchall()
    cursor.execute("""SELECT ROUND(avg_rating, 2) AS avg_rating, pharmacy_id, total_reviews, name 
    FROM pharmacy_ratings  NATURAL JOIN Pharmacy
    WHERE pharmacy_id = %s """, (pharmacy_id,))
    pharmacy_reviews['stats'] = cursor.fetchone()
    return jsonify(pharmacy_reviews), 200


@bp.route("/", methods=["POST"])
def post_review():
    cursor = db.connection.cursor(DictCursor)
    review = _parse_review(request.get_json())

    cursor.execute("""SELECT * FROM Orders NATURAL LEFT JOIN Review 
    WHERE order_id = %s AND review_id IS NULL""", (review['order_id'],))

    if not cursor.fetchone():
        return jsonify({'msg': f"You can't write a review for order: {review['order_id']}"}, )

    cursor.execute("""INSERT INTO Review ( rating, title, body, order_id) 
    VALUES (%s, %s, %s, %s)""",
                   (review['rating'], review['title'], review['body'], review['order_id']))
    db.connection.commit()
    return jsonify(f"Succesfully inserted  review to order: {review['order_id']} "), 202


@bp.route("/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""SELECT * FROM Review 
    WHERE review_id= %s """, (review_id,))
    if not cursor.fetchone():
        return jsonify({"msg": f"Review with id {review_id} not found"}, 404)
    cursor.execute("DELETE FROM Review WHERE review_id = %s", (review_id,))
    db.connection.commit()

    return jsonify({"msg": f"Review {review_id} has been deleted"}), 200
