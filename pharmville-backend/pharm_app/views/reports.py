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
        where pharmacy_id = %s AND  order_date BETWEEN %s AND %s
        GROUP BY order_date """,
                   (pharm_id, start_date, end_date))
    report['sum'] = cursor.fetchone()
    return report


def report_without_date(pharm_id: int):
    report = {}
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""SELECT (
                        SELECT SUM(unit_price * count) 
                        FROM Orders
                        NATURAL JOIN product_order
                        WHERE pharmacy_id = %s
                        GROUP BY order_date) 
                        AS revenue,
                    (SELECT count(o.order_id)
                        FROM Orders AS o
                        WHERE o.pharmacy_id = %s) 
                        AS order_count,
                    (SELECT count(o.order_id)
                        FROM Orders AS o
                        WHERE o.order_status = 'CANCELED'
                         AND o.pharmacy_id = %s) as canceled_orders_count
        """,
                   (pharm_id, pharm_id, pharm_id))
    stats = cursor.fetchone()
    report['revenue'] = stats['revenue']
    report['order_count'] = stats['order_count']
    report['canceled_orders_count'] = stats['canceled_orders_count']
    cursor.execute("""SELECT *
        FROM (SELECT prod_id, SUM(count) AS sold_amount
             FROM Orders
                      NATURAL JOIN product_order
             where pharmacy_id = %s
             GROUP BY prod_id ORDER BY sold_amount DESC) AS product_amount NATURAL  JOIN  Product LIMIT %s
        """, (pharm_id, 3))
    cursor.fetchall()
    report['top3_most_sold'] = cursor.fetchall()
    cursor.execute("""
            SELECT order_date, MAX(revenue) AS max_revenue
                FROM (SELECT order_date, SUM(unit_price * count) AS revenue
                     FROM Orders
                            NATURAL JOIN product_order
                     where pharmacy_id = %s
                     GROUP BY order_date) AS revenue_by_date;
     """, (pharm_id,))
    report['max_revenue'] = cursor.fetchone()


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
