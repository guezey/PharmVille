import MySQLdb.cursors
from flask import Blueprint, request, jsonify, current_app
from pharm_app.extensions import db
from pharm_app.utils.query_builder import MedicineQueryBuilder

bp = Blueprint('medicine', __name__, url_prefix='/medicine')


@bp.route('/list', methods=['GET'])
def medicine_list():
    data = request.get_json()
    builder = MedicineQueryBuilder(**data)

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    query = builder.build()
    current_app.logger.info(query)
    cursor.execute(query)

    medicines = cursor.fetchall()
    return jsonify(medicines)
