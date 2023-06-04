from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, jsonify, session, request
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('pharmacy', __name__, url_prefix='/pharmacy')


@bp.route('/orders', methods=['GET'])
def get_orders():
    cursor = db.connection.cursor(DictCursor)
    # FIXME: pharmacy_id should be fetched from session
    pharmacy = 6

    try:
        # Fetch all active orders for the pharmacy
        cursor.execute(
            """
            SELECT order_id, order_time, address_field, address_field_2, city, country, postal_code, order_status FROM Orders
            JOIN Address ON Orders.address_id = Address.address_id
            WHERE pharmacy_id = %s AND order_status = 'ACTIVE'
            """,
            (pharmacy,)
        )
        active_orders = cursor.fetchall()

        for order in active_orders:
            cursor.execute(
                """
                SELECT name, count 
                FROM product_order
                NATURAL JOIN Product
                WHERE order_id = %s
                """,
                (order['order_id'],)
            )
            products = cursor.fetchall()

            order['products'] = products

        # Fetch all shipped and delivered orders for the pharmacy
        cursor.execute(
            """
            SELECT order_id, order_time, address_field, address_field_2, city, country, postal_code, order_status FROM Orders
            JOIN Address ON Orders.address_id = Address.address_id
            WHERE pharmacy_id = %s AND (order_status = 'SHIPPED' OR order_status = 'DELIVERED')
            ORDER BY IF(order_status = 'SHIPPED', 1, 2), order_time DESC
            """,
            (pharmacy,)
        )
        shipped_and_delivered_orders = cursor.fetchall()

        for order in shipped_and_delivered_orders:
            cursor.execute(
                """
                SELECT name, count 
                FROM product_order
                NATURAL JOIN Product
                WHERE order_id = %s
                """,
                (order['order_id'],)
            )
            products = cursor.fetchall()

            order['products'] = products

    except Error as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({"active_orders": active_orders,
                    "shipped_and_delivered_orders": shipped_and_delivered_orders}), 200


@bp.route('/orders', methods=['PUT'])
def update_order_status():
    data = request.get_json()
    cursor = db.connection.cursor(DictCursor)

    try:
        cursor.execute(
            """
            UPDATE Orders
            SET order_status = %s
            WHERE order_id = %s
            """,
            (data['order_status'], data['order_id'])
        )
        if data['order_status'] == 'DELIVERED':
            cursor.execute(
                """
                UPDATE Orders
                SET delivery_time = NOW()
                WHERE order_id = %s
                """,
                (data['order_id'],)
            )

            cursor.execute(
                """
                UPDATE Pharmacy
                SET balance = balance + (SELECT SUM(unit_price * count) FROM Product NATURAL JOIN product_order WHERE order_id = %s)
                WHERE pharmacy_id = (SELECT pharmacy_id FROM Orders WHERE order_id = %s)
                """,
                (data['order_id'], data['order_id'])
            )
    except Error as e:
        db.connection.rollback()
        return jsonify({'error': str(e)}), 500

    db.connection.commit()

    return jsonify({'message': 'Order status updated successfully'}), 200


@bp.route('/profile', methods=['GET'])
def get_profile():
    pharmacy_id = session['user_id']
    cursor = db.connection.cursor(DictCursor)

    cursor.execute("""SELECT name, is_on_duty, balance, approval_status 
    FROM Pharmacy PJ 
        JOIN User U ON U.user_id 
        WHERE pharmacy_id = %s""", (pharmacy_id,))

    return jsonify(cursor.fetchone()), 200
