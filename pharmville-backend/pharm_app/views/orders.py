from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('orders', __name__, url_prefix='/orders')


class PrescribeView(MethodView):
    def get(self):
        return jsonify({"message": "Orders"}), 200

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
                    SELECT NOW() > (SELECT due_date FROM Prescription WHERE presc_id = %s) AS is_expired
                    """,
                    (med['prescription_id'],)
                )
                is_presc_expired = cursor.fetchone()['is_expired']

                if is_presc_expired:
                    cursor.execute(
                        """
                        UPDATE Prescription SET status = 'OVERDUE' WHERE presc_id = %s
                        """,
                        (med['prescription_id'],)
                    )
                    db.connection.commit()
                    return jsonify({"message": f"Prescription {med['prescription_id']} is expired"}), 400

                cursor.execute(
                    """
                    SELECT status FROM Prescription WHERE presc_id = %s
                    """,
                    (med['prescription_id'],)
                )
                presc_status = cursor.fetchone()['status']

                if presc_status == 'USED':
                    return jsonify({"message": f"Prescription {med['prescription_id']} is already used"}), 400

                cursor.execute(
                    """
                    SELECT prod_id FROM Product WHERE name=%s
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
                    return jsonify({"message": f"Product {med_id} is not available at {data['pharmacy_name']}"}), 400

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

                cursor.execute(
                    """
                    UPDATE Prescription SET status = 'USED' WHERE presc_id = %s
                    """,
                    (med['prescription_id'],)
                )

            cursor.execute(
                """
                SELECT SUM(unit_price * count) AS total_price FROM product_order WHERE order_id = %s
                """,
                (order_id,)
            )

            total_price = cursor.fetchone()['total_price']

            cursor.execute(
                """
                INSERT INTO Payment (order_id, payment_time, payment_amount, card_number, card_holder, card_cvv, expiry_date)
                VALUES (%s, NOW(), %s, %s, %s, %s, %s)
                """,
                (order_id, total_price, data['card_number'], data['card_holder'], data['cvv'], data['exp'])
            )

        except Error as e:
            print(e)
            db.connection.rollback()
            return jsonify({"message": "Order could not be created. No payment done."}), 500

        db.connection.commit()
        return jsonify({"message": "Order created, Payment done."}), 201


bp.add_url_rule('', view_func=PrescribeView.as_view('orders'), methods=['GET', 'POST'])

