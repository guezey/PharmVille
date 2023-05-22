from MySQLdb.cursors import DictCursor, Cursor
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db
from pharm_app.utils.query_builder import MedicineQueryBuilder

bp = Blueprint('medicine', __name__, url_prefix='/medicine')


@bp.route('/list', methods=['GET'])
def medicine_list():
    data = request.get_json()
    builder = MedicineQueryBuilder(**data)

    cursor = db.connection.cursor(DictCursor)
    query = builder.build()
    current_app.logger.info(query)
    cursor.execute(query)

    medicines = cursor.fetchall()
    return jsonify(medicines)


class MedicineView(MethodView):
    def get(self, prod_id):
        cursor = db.connection.cursor(DictCursor)
        # fetch the base medicine
        cursor.execute("""
        SELECT * FROM full_medicine WHERE prod_id = %s
        """, (prod_id,))
        medicine = cursor.fetchone()
        # fetch and merge remaining attributes
        cursor.execute("""
            SELECT medicine_age.group_name, advised_dosage, unit FROM AgeGroup JOIN medicine_age 
                WHERE prod_id = %s
            """, (prod_id,))
        medicine["age_groups"] = cursor.fetchall()

        cursor.execute("""
            SELECT * FROM class_join_medicine WHERE prod_id = %s
        """, (prod_id,))
        medicine["side_effects"] = cursor.fetchall()

        cursor.execute("""
            SELECT pharmacy_id, name FROM Pharmacy NATURAL JOIN pharmacy_product
                WHERE prod_id = %s 
        """, (prod_id,))
        medicine['pharmacies'] = cursor.fetchall()

        return medicine


bp.add_url_rule('/', view_func=MedicineView.as_view('medicine'))


@bp.route('/filter_options', methods=['GET'])
def filter_options():
    filter_options = {}
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""SELECT * FROM AgeGroup ORDER BY min_age """)
    filter_options["age_groups"] = cursor.fetchall()

    cursor.execute("""SELECT * FROM SideEffect ORDER BY effect_name""")
    filter_options["side_effects"] = cursor.fetchall()
    filter_options["presc_types"] = ["None","White", "Red", "Green", "Purple", "Orange"]
    
    cursor = db.connection.cursor(Cursor)
    cursor.execute("""SELECT intake_type FROM IntakeType ORDER BY intake_type""")
    filter_options["intake_types"] = [intake_type[0] for intake_type in cursor.fetchall()]
    cursor.execute("""SELECT class_name FROM  MedicineClass ORDER BY class_name""")
    filter_options['medicine_class'] = [med_class[0] for med_class in cursor.fetchall()]
    return filter_options
