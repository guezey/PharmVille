from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session, current_app
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('patient', __name__, url_prefix='/patient')


class PatientInfoView(MethodView):
    def get(self):
        current_app.logger.info(f"Patient info requested: {session}")
        user_id = session['user_id']
        cursor = db.connection.cursor(DictCursor)

        cursor.execute("""SELECT email, name, surname, tck, weight, height
        FROM Patient 
        NATURAL  JOIN  Person 
        NATURAL JOIN  User WHERE user_id = %s""", (user_id,))
        patient = cursor.fetchone()
        return jsonify(patient), 200

@bp.route('/cart', methods=['GET'])
def get_cart():
    if 'cart' not in session:
        return jsonify({'message': 'NO cART included'}), 404

    cursor = db.connection.cursor(DictCursor)

    for item in session['cart']:
        cursor.execute(
            """
            SELECT name, price FROM Product
            WHERE prod_id = %s
            """,
            (item['prod_id'],)
        )
        item['name'], item['price'] = cursor.fetchone().values()

        cursor.execute(
            """
            SELECT name FROM Pharmacy
            WHERE pharmacy_id = %s
            """,
            (item['pharmacy_id'],)
        )
        item['pharmacy_name'] = cursor.fetchone()['name']

    return jsonify(session['cart']), 200
@bp.route('/cart', methods=['DELETE'])
def delete_from_cart():
    if 'cart' not in session:
        return jsonify({'message': 'NO cART included'}), 404

    prod_id = request.get_json()['prod_id']

    for item in session['cart']:
        if item['prod_id'] == prod_id:
            session['cart'].remove(item)
            break

    return jsonify(session['cart']), 200

bp.add_url_rule("", view_func=PatientInfoView.as_view("patient-info"))
