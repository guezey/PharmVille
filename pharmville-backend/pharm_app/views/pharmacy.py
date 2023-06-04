from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, jsonify, session, request
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('pharmacy', __name__, url_prefix='/pharmacy')

@bp.route('/orders', methods=['GET'])
def get_orders ():
    cursor = db.connection.cursor(DictCursor)
    pharmacy = session['user_id']

    try:
        # Fetch all active orders for the pharmacy
        cursor.execute(
            """
            SELECT order_id, order_time, payment_amount AS total FROM Orders
            NATURAL JOIN Payment
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
            SELECT order_id, order_time, order_status FROM Orders
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

    return jsonify({"active-orders": active_orders,
                    "shipped-and-delivered-orders": shipped_and_delivered_orders}), 200

@bp.route('/orders', methods=['PUT'])
def update_order_status():
    data = request.get_json()
    cursor = db.connection.cursor(DictCursor)

    try:
        cursor.execute(
            """
            SELECT order_status FROM Orders
            WHERE order_id = %s
            """,
            (data['order_id'],)
        )
        status = cursor.fetchone()['order_status']

        if status == 'ACTIVE':
            cursor.execute(
                """
                UPDATE Orders
                SET order_status = %s
                WHERE order_id = %s
                """,
                ('SHIPPED', data['order_id'])
            )
        elif status == 'SHIPPED':
            cursor.execute(
                """
                UPDATE Orders
                SET order_status = %s
                WHERE order_id = %s
                """,
                ('DELIVERED', data['order_id'])
            )
        else:
            return jsonify({'error': 'Order status cannot be updated'}), 400

        db.connection.commit()
    except Error as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Order status updated successfully'}), 200
