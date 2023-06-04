from MySQLdb.cursors import DictCursor
from MySQLdb import Error

from flask import Blueprint, request, jsonify, session

from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('orders', __name__, url_prefix='/orders')


class OrdersView(MethodView):
    def get(self):
        user_id = session['user_id']
        cursor = db.connection.cursor(DictCursor)

        cursor.execute(""" SELECT * FROM Orders 
            WHERE  patient_id = %s
                ORDER BY IF(order_status = 'DELIVERED', 1, 2), order_time DESC
        """, (user_id,))
        orders = cursor.fetchall()

        for order in orders:
            cursor.execute("""
                SELECT prod_id, unit_price, count, presc_id, name  
                FROM Product  NATURAL JOIN  product_order
                    WHERE order_id = %s
            """, (order['order_id'],))
            order['products'] = cursor.fetchall()

            cursor.execute("""
                SELECT review_id, rating,title, body FROM Review
                    WHERE order_id = %s
            """, (order['order_id'],))
            order['review'] = cursor.fetchone()

            cursor.execute(""" SELECT SUM(unit_price * count) AS total_price 
            FROM product_order WHERE order_id = %s""", (order['order_id'],))
            order['total_price'] = cursor.fetchone()['total_price']

            cursor.execute("""SELECT * FROM Payment WHERE order_id = %s""", (order['order_id'],))
            order['payment'] = cursor.fetchone()

        return jsonify(orders)

    # Purchase order
    def post(self):
        data = request.get_json()
        cursor = db.connection.cursor(DictCursor)

        patient_id = session['user_id']

        cursor.execute(
            """
            SELECT pharmacy_id FROM Pharmacy WHERE name = %s
            """,
            (data['pharmacy_name'],)
        )
        pharmacy = cursor.fetchone()

        if not pharmacy:
            return jsonify({"message": f"Pharmacy with name: {data['pharmacy_name']} not found"}), 404

        try:
            for med in data['medicines']:
                cursor.execute(
                    """
                    SELECT NOW() < (SELECT due_date FROM Prescription WHERE presc_id = %s) AS is_valid
                    """,
                    (med['prescription_id'],)
                )
                is_presc_valid = cursor.fetchone()['is_valid']

                if not is_presc_valid:
                    return jsonify({"message": f"Prescription {med['prescription_id']} is not valid"}), 400

                cursor.execute(
                    """
                    SELECT prod_id FROM Product WHERE name = %s
                    """,
                    (med['name'],)
                )
                med_id = cursor.fetchone()['prod_id']

                cursor.execute(
                    """
                    SELECT stock FROM pharmacy_product WHERE prod_id = %s AND pharmacy_id = %s
                    """,
                    (med_id, pharmacy['pharmacy_id'])
                )
                count = cursor.fetchone()['stock']
                if count < med['count']:
                    return jsonify({"message": f"Product {med['prod_id']} is not available"}), 400

            cursor.execute(
                """
                INSERT INTO Orders (order_time, pharmacy_id, patient_id, delivery_time, order_status, shipping_firm, address_id)
                VALUES (NOW(), %s, %s, %s, 'ACTIVE', 'Aras Kargo', %s)
                """,
                (pharmacy['pharmacy_id'], patient_id, None, data['address_id'])
            )
            cursor.execute(
                """
                SELECT LAST_INSERT_ID() AS last_insert FROM Orders
                """
            )
            order_id = cursor.fetchone()['last_insert']

            for med in data['medicines']:
                cursor.execute(
                    """
                    SELECT prod_id FROM Product WHERE name=%s
                    """,
                    (med['name'],)
                )
                med_id = cursor.fetchone()['prod_id']

                cursor.execute(
                    """
                    INSERT INTO product_order (order_id, prod_id, presc_id, unit_price, count)
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    (order_id, med_id, med['prescription_id'], med['price'], med['count'])
                )

        except Error as e:
            print(e)
            db.connection.rollback()
            return jsonify({"message": "Order could not be created"}), 400

        db.connection.commit()
        return jsonify({"message": "Order created"}), 201


bp.add_url_rule('', view_func=OrdersView.as_view('orders'), methods=['GET', 'POST'])
