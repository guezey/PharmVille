from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db
from pharm_app.utils.query_builder import MedicineQueryBuilder

bp = Blueprint('medicine', __name__, url_prefix='/medicine')


def parse_medicine_props(data):
    medicine = {
        'name': data['name'],
        'image_url': data.get('image_url'),
        'company': data['company'],
        'price': data['price'],
        'prospectus': data.get('prospectus'),
        'amount': data['amount'],
        'presc_type': data['presc_type'],
        'intake_type': data['intake_type'],
        'age_groups': data['age_groups'],
        'medicine_classes': data['medicine_classes'],
        'side_effects': data['side_effects'],
    }
    return medicine


class MedicineGroupView(MethodView):
    def put(self):
        data = request.get_json()
        builder = MedicineQueryBuilder(**data)

        cursor = db.connection.cursor(DictCursor)
        query = builder.build()
        current_app.logger.info(query)
        cursor.execute(query)

        medicines = cursor.fetchall()
        return jsonify(medicines)

    def post(self):
        data = request.get_json()
        medicine = parse_medicine_props(data)

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""INSERT INTO Product (name, company, image_url, price) 
                VALUES (%s, %s, %s, %s)
            """, (medicine['name'], medicine['company'], medicine['image_url'], medicine['price']))
            pk = cursor.lastrowid
            cursor.execute(""" INSERT INTO Medicine(prod_id, prospectus, amount, presc_type, intake_type)
                VALUEs (%s, %s, %s, %s, %s)        
            """, (pk, medicine['prospectus'], medicine['amount'], medicine['presc_type'], medicine['intake_type']))
            for age_group in medicine['age_groups']:
                cursor.execute("""INSERT INTO medicine_age(prod_id, group_name, advised_dosage, unit)
                    VALUES(%s, %s, %s, %s)
                 """, (pk, age_group['group_name'], age_group['advised_dosage'], age_group['unit']))
            for side_effect in medicine['side_effects']:
                cursor.execute("""INSERT INTO medicine_side_effect(effect_name, prod_id)
                    VALUES (%s, %s)
                """, (side_effect, pk))
            for med_class in medicine['medicine_classes']:
                cursor.execute(""" INSERT INTO class_join_medicine(class_name, prod_id) 
                    VALUEs (%s, %s)
                """, (med_class, pk))
            db.connection.commit()
        except Error as e:
            current_app.logger.error(str(e))
            db.connection.rollback()
            return str(e), 400
        return f"Medicine successfully inserted with pk:{pk}", 201


bp.add_url_rule('', view_func=MedicineGroupView.as_view('medicine-group'))


class MedicineView(MethodView):
    def error404(self, prod_id):
        return {"message": f"medicine with id: {prod_id} not found "}, 404

    def get(self, prod_id: int):
        cursor = db.connection.cursor(DictCursor)
        # fetch the base medicine
        cursor.execute("""
        SELECT * FROM full_medicine WHERE prod_id = %s
        """, (prod_id,))
        medicine = cursor.fetchone()

        if not medicine:
            return self.error404(prod_id)
        # fetch and merge remaining attributes
        cursor.execute("""
            SELECT medicine_age.group_name, advised_dosage, unit FROM AgeGroup NATURAL JOIN medicine_age 
                WHERE prod_id = %s
            """, (prod_id,))
        medicine["age_groups"] = cursor.fetchall()

        cursor.execute("""
            SELECT DISTINCT (pharmacy_id), name,total_reviews, avg_rating  
            FROM Pharmacy NATURAL JOIN pharmacy_product NATURAL JOIN pharmacy_ratings
                WHERE prod_id = %s 
        """, (prod_id,))
        medicine['pharmacies'] = cursor.fetchall()

        cursor = db.connection.cursor(Cursor)
        cursor.execute("""
                    SELECT class_name FROM class_join_medicine WHERE prod_id = %s
                """, (prod_id,))
        medicine['medicine_classes'] = [med_class[0] for med_class in cursor.fetchall()]

        cursor.execute(""" SELECT effect_name FROM  medicine_side_effect WHERE prod_id = %s
                """, (prod_id,))
        medicine["side_effects"] = [side_effect[0] for side_effect in cursor.fetchall()]
        medicine["prod_type"] = "Medicine"
        return medicine

    def put(self, prod_id):
        data = request.get_json()
        medicine = parse_medicine_props(data)

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""UPDATE Product
                              SET name = %s, company = %s, image_url = %s, price = %s
                              WHERE prod_id = %s
                           """,
                           (medicine['name'], medicine['company'], medicine['image_url'], medicine['price'], prod_id))

            cursor.execute("""UPDATE Medicine
                              SET prospectus = %s, amount = %s, presc_type = %s, intake_type = %s
                              WHERE prod_id = %s
                           """, (
                medicine['prospectus'], medicine['amount'], medicine['presc_type'], medicine['intake_type'], prod_id))

            # Delete existing age group records
            cursor.execute("""DELETE FROM medicine_age WHERE prod_id = %s""", (prod_id,))

            # Insert new age group records
            for age_group in medicine['age_groups']:
                cursor.execute("""INSERT INTO medicine_age(prod_id, group_name, advised_dosage, unit)
                                  VALUES (%s, %s, %s, %s)
                               """, (prod_id, age_group['group_name'], age_group['advised_dosage'], age_group['unit']))

            # Delete existing side effect records
            cursor.execute("""DELETE FROM medicine_side_effect WHERE prod_id = %s""", (prod_id,))

            # Insert new side effect records
            for side_effect in medicine['side_effects']:
                cursor.execute("""INSERT INTO medicine_side_effect(effect_name, prod_id)
                                  VALUES (%s, %s)
                               """, (side_effect, prod_id))

            # Delete existing medicine class records
            cursor.execute("""DELETE FROM class_join_medicine WHERE prod_id = %s""", (prod_id,))

            # Insert new medicine class records
            for med_class in medicine['medicine_classes']:
                cursor.execute("""INSERT INTO class_join_medicine(class_name, prod_id)
                                  VALUES (%s, %s)
                               """, (med_class, prod_id))

            db.connection.commit()
        except Error as e:
            print(f"An error occurred during the update: {str(e)}")
            db.connection.rollback()
            return str(e), 400
        return f"Update on product: {prod_id} was successful", 202


bp.add_url_rule('<int:prod_id>', view_func=MedicineView.as_view('medicine'))


@bp.route('/filter_options', methods=['GET'])
def filter_options():
    filter_option = {}
    cursor = db.connection.cursor(DictCursor)
    cursor.execute("""SELECT * FROM AgeGroup ORDER BY min_age """)
    filter_option["age_groups"] = cursor.fetchall()

    cursor.execute("""SELECT * FROM SideEffect ORDER BY effect_name""")
    filter_option["side_effects"] = cursor.fetchall()
    filter_option["presc_types"] = ["None", "White", "Red", "Green", "Purple", "Orange"]

    cursor = db.connection.cursor(Cursor)
    cursor.execute("""SELECT intake_type FROM IntakeType ORDER BY intake_type""")
    filter_option["intake_types"] = [intake_type[0] for intake_type in cursor.fetchall()]
    cursor.execute("""SELECT class_name FROM  MedicineClass ORDER BY class_name""")
    filter_option['medicine_class'] = [med_class[0] for med_class in cursor.fetchall()]
    filter_option['units'] = ['ml', 'mg', 'drops', 'tablets', 'capsules', 'mg per kg of body-weight', 'times', 'puffs']
    return jsonify(filter_option)
