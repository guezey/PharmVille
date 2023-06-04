from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('address', __name__, url_prefix='/address')


def _address_parser(data: dict):
    address = {
        'name': data['name'],
        'city': data['city'],
        'country': data['country'],
        'address_field': data['address_field'],
        'address_field_2': data['address_field_2'],
        'postal_code': data['postal_code']
    }
    return address


class addressView(MethodView):
    def get(self):
        user_id = session['user_id']

        cursor = db.connection.cursor(DictCursor)
        cursor.execute("""SELECT * FROM Address WHERE user_id = %s""", (user_id,))
        address = cursor.fetchall()
        return jsonify(address), 200

    def post(self):
        cursor = db.connection.cursor(DictCursor)
        user_id = session['user_id']
        address = _address_parser(request.get_json())
        try:
            cursor.execute("""INSERT INTO Address (user_id, name, city, country, address_field,
                    address_field_2, postal_code) VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                           (user_id, address['name'], address['city'], address['country'], address['address_field'],
                            address['address_field_2'], address['postal_code']))
            db.connection.commit()
        except Error as e:
            return jsonify({"message": str(e)}), 400
        return jsonify({"message": "Address created"}), 200


bp.add_url_rule("", view_func=addressView.as_view("addressList"))


class AddressDetailView(MethodView):
    def get(self, address_id):
        user_id = session['user_id']
        cursor = db.connection.cursor(DictCursor)
        cursor.execute("""SELECT * FROM Address WHERE address_id = %s AND user_id = %s""", (address_id, user_id))
        address = cursor.fetchone()
        if not address:
            return jsonify({"message": "Address not found"}), 404
        return jsonify(address), 200

    def put(self, address_id):
        cursor = db.connection.cursor(DictCursor)
        user_id = session['user_id']
        address = _address_parser(request.get_json())
        try:
            cursor.execute("""UPDATE Address SET name = %s, city = %s, country = %s, address_field = %s,
                    address_field_2 = %s, postal_code = %s WHERE address_id = %s AND user_id = %s""",
                           (address['name'], address['city'], address['country'], address['address_field'],
                            address['address_field_2'], address['postal_code'], address_id, user_id))
            db.connection.commit()
        except Error as e:
            return jsonify({"message": str(e)}), 400
        return jsonify({"message": "Address updated"}), 200

    def delete(self, address_id):
        cursor = db.connection.cursor(Cursor)
        user_id = session['user_id']
        try:
            cursor.execute("""SELECT * FROM Address NATURAL JOIN  Orders
             WHERE address_id = %s AND user_id = %s AND order_status NOT IN ('DELIVERED', 'CANCELED')""", (
                address_id, user_id))

            cursor.execute("""DELETE FROM Address WHERE address_id = %s AND user_id = %s""",
                           (address_id, user_id))
            db.connection.commit()

        except Error as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "Address deleted"}), 200


bp.add_url_rule("<int:address_id>", view_func=AddressDetailView.as_view("addressDetail"))
