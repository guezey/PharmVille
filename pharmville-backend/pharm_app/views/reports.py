from datetime import datetime

from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app, session
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('report', __name__, url_prefix='/report')


def _parse_str_to_time(date_str):
    if date_str is None:
        return None
    else:
        return datetime.strptime(date_str, "%Y-%m-%d").date()


def report_with_date(pharm_id: int, start_date: datetime.date, end_date: datetime.date):
    report = {}
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""SELECT  SUM(unit_price * count) AS revenue
        FROM Orders
              NATURAL JOIN product_order
        where pharmacy_id = %s AND  order_time BETWEEN %s AND %s
        GROUP BY order_time """,
                   (pharm_id, start_date, end_date))
    report['sum'] = cursor.fetchone()
    return report


def report_without_date(pharm_id: int):
    report = {}
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""
        SELECT round(SUM(unit_price * count), 2 )  AS revenue
            FROM Orders
            NATURAL JOIN product_order
                WHERE pharmacy_id = %s
                GROUP BY pharmacy_id
    """, (pharm_id,))
    report['revenue'] = cursor.fetchone()['revenue']
    cursor.execute("""SELECT COUNT(o.order_id) AS order_count
                        FROM Orders AS o
                        WHERE o.pharmacy_id = %s 
                        """, (pharm_id,))
    report['order_count'] = cursor.fetchone()['order_count']
    cursor.execute("""SELECT COUNT(o.order_id) AS canceled_orders_count
                        FROM Orders AS o
                        WHERE o.order_status = 'CANCELED'
                         AND o.pharmacy_id = %s
        """,
                   (pharm_id,))
    report['canceled_orders_count'] = cursor.fetchone()['canceled_orders_count']
    cursor.execute(f"""
        SELECT *
FROM (SELECT DATE(order_time) AS order_date,
            prod_id,
              CAST(SUM(count) AS UNSIGNED) AS order_count
     FROM Orders
              NATURAL JOIN product_order
     WHERE pharmacy_id = %s
     GROUP BY prod_id, DATE(order_time)) AS order_count_by_date
        NATURAL JOIN Product
    ORDER BY order_count DESC LIMIT 3;
    """,(pharm_id,))

    report['top3_most_sold'] = cursor.fetchall()
    cursor.execute("""
            SELECT order_date, ROUND(MAX(revenue), 2) AS max_revenue
                FROM (SELECT DATE(order_time) AS order_date, SUM(unit_price * count) AS revenue
                     FROM Orders
                            NATURAL JOIN product_order
                     where pharmacy_id = %s
                     GROUP BY order_date) AS revenue_by_date GROUP BY order_date
     """, (pharm_id,))
    report['max_revenue_date'] = cursor.fetchone()

    return report


@bp.route('/', methods=['GET'])
def get_report():
    pharmacy_id = session['user_id']
    start_date = _parse_str_to_time(request.args.get('start_date'))
    end_date = _parse_str_to_time(request.args.get('end_date'))

    if start_date and end_date:
        report = report_with_date(pharmacy_id, start_date, end_date)
    else:
        report = report_without_date(pharmacy_id)
    return jsonify(report), 200
