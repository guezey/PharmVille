from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app, session
from flask.views import MethodView
from pharm_app.extensions import db
from pharm_app.views.medicine import MedicineGroupView

bp = Blueprint('prescribe', __name__, url_prefix='/prescribe')


def parse_prescription_props(data):
    # TODO: parse prescription props
    return None
    # medicine = {
    #     'name': data['name'],
    #     'image_url': data.get('image_url'),
    #     'company': data['company'],
    #     'price': data['price'],
    #     'prospectus': data.get('prospectus'),
    #     'amount': data['amount'],
    #     'presc_type': data['presc_type'],
    #     'intake_type': data['intake_type'],
    #     'age_groups': data['age_groups'],
    #     'medicine_classes': data['medicine_classes'],
    #     'side_effects': data['side_effects'],
    # }
    # return medicine


# class MedicineGroupView(MethodView):
#     def get(self):
#         data = request.get_json()
#         builder = MedicineQueryBuilder(**data)
#
#         cursor = db.connection.cursor(DictCursor)
#         query = builder.build()
#         current_app.logger.info(query)
#         cursor.execute(query)
#
#         medicines = cursor.fetchall()
#         return jsonify(medicines)
#
#     def post(self):
#         data = request.get_json()
#         medicine = parse_medicine_props(data)
#
#         cursor = db.connection.cursor(DictCursor)
#         try:
#             cursor.execute("""INSERT INTO Product (name, company, image_url, price)
#                 VALUES (%s, %s, %s, %s)
#             """, (medicine['name'], medicine['company'], medicine['image_url'], medicine['price']))
#             pk = cursor.lastrowid
#             cursor.execute(""" INSERT INTO Medicine(prod_id, prospectus, amount, presc_type, intake_type)
#                 VALUEs (%s, %s, %s, %s, %s)
#             """, (pk, medicine['prospectus'], medicine['amount'], medicine['presc_type'], medicine['intake_type']))
#             for age_group in medicine['age_groups']:
#                 cursor.execute("""INSERT INTO medicine_age(prod_id, group_name, advised_dosage, unit)
#                     VALUES(%s, %s, %s, %s)
#                  """, (pk, age_group['group_name'], age_group['advised_dosage'], age_group['unit']))
#             for side_effect in medicine['side_effects']:
#                 cursor.execute("""INSERT INTO medicine_side_effect(effect_name, prod_id)
#                     VALUES (%s, %s)
#                 """, (side_effect, pk))
#             for med_class in medicine['medicine_classes']:
#                 cursor.execute(""" INSERT INTO class_join_medicine(class_name, prod_id)
#                     VALUEs (%s, %s)
#                 """, (med_class, pk))
#             db.connection.commit()
#         except Error as e:
#             current_app.logger.error(str(e))
#             db.connection.rollback()
#             return str(e), 400
#         return f"Medicine successfully inserted with pk:{pk}", 201
#
#
# bp.add_url_rule('/', view_func=MedicineGroupView.as_view('medicine-group'))


class PrescribeView(MethodView):
    def error404(self, patient_tck):
        return {"message": f"Patient with TCK: {patient_tck} not found"}, 404

    def get(self, patient_tck: int):
        cursor = db.connection.cursor(DictCursor)

        cursor.execute(
            """
            SELECT name, surname, tck, YEAR(NOW()) - YEAR(birth_date) AS age, weight, height, gender 
            FROM Patient NATURAL JOIN Person 
            WHERE tck = %s
            """,
            (patient_tck,)
        )
        patient = cursor.fetchone()

        if not patient:
            return self.error404(patient_tck)

        return jsonify(patient)

    # def get(self):
    #     cursor = db.connection.cursor(DictCursor)
    #
    #     cursor.execute(
    #         """
    #         SELECT * FROM Disease
    #         """
    #     )
    #     diseases = cursor.fetchall()
    #
    #     return jsonify(diseases)

    def post(self, patient_tck: int):
        cursor = db.connection.cursor(DictCursor)

        cursor.execute(
            """
            SELECT person_id FROM Person WHERE tck = %s
            """,
            (patient_tck,)
        )
        patient = cursor.fetchone()

        if not patient:
            return self.error404(patient_tck)

        doctor_id = session['user_id']

        data = request.get_json()
        prescription = {
            'patient_id': patient['person_id'],
            'doctor_id': doctor_id,
            'write_date': data['write_date'],
            'due_date': data['due_date'],
            'type': data['type'],
            'status': data['status'],
            'medicines': data['medicines'] if 'medicines' in data else None,
            'diseases': data['diseases'] if 'diseases' in data else None
        }

        cursor.execute(
            """
            INSERT INTO Prescription(patient_id, doctor_id, write_date, due_date, type, status)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (prescription['patient_id'], prescription['doctor_id'], prescription['write_date'], prescription['due_date'], prescription['type'], prescription['status'])
        )
        # FIXME: (optional) critical section
        cursor.execute(
            """
            SELECT LAST_INSERT_ID() AS id FROM Prescription
            """
        )
        prescription_id = cursor.fetchone()['id']

        for medicine in data['medicines']:
            cursor.execute(
                """
                SELECT prod_id FROM Product NATURAL JOIN Medicine WHERE name = %s AND company = %s AND amount = %s                
                """,
                (medicine['name'], medicine['company'], medicine['amount'])
            )
            med_id = cursor.fetchone()['prod_id']

            cursor.execute(
                """
                INSERT INTO medicine_presc(presc_id, med_id, dosage, description)
                VALUES (%s, %s, %s, %s)
                """,
                (prescription_id, med_id, medicine['dosage'], medicine['description'])
            )

        for disease in data['diseases']:
            cursor.execute(
                """
                SELECT disease_id FROM Disease WHERE name = %s   
                """,
                (disease['name'],)
            )
            disease_id = cursor.fetchone()['disease_id']

            cursor.execute(
                """
                INSERT INTO presc_disease(presc_id, disease_id)
                VALUES (%s, %s)
                """,
                (prescription_id, disease_id)
            )

        db.connection.commit()

        return f"Prescription successfully added.", 202


bp.add_url_rule('/<int:patient_tck>', view_func=PrescribeView.as_view('prescribe'))
# bp.add_url_rule('/', view_func=PrescribeView.as_view('prescribe'))
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
