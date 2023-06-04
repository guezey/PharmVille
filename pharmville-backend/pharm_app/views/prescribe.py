from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session, current_app
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('prescribe', __name__, url_prefix='/prescribe')


def error_404(patient_tck):
    return jsonify({"message": f"Patient with TCK: {patient_tck} not found"}), 404


class PrescribeView(MethodView):

    def get(self, patient_tck: str):
        cursor = db.connection.cursor(DictCursor)

        cursor.execute(
            """
            SELECT name, surname, YEAR(NOW()) - YEAR(birth_date) AS age, weight, height, gender 
            FROM Patient 
            JOIN Person ON patient_id = person_id
            WHERE tck = %s
            """,
            (patient_tck,)
        )
        patient = cursor.fetchone()

        if not patient:
            return error_404(patient_tck)

        cursor.execute(
            """
            SELECT group_name FROM AgeGroup
            WHERE %s BETWEEN min_age AND max_age
            """,
            (patient['age'],)
        )

        patient['age_group'] = cursor.fetchone()['group_name']

        cursor.execute(
            """
            SELECT advised_dosage, unit, name FROM medicine_age
            NATURAL JOIN Product
            WHERE group_name = %s
            """,
            (patient['age_group'],)
        )
        allowed_medicines = cursor.fetchall()

        return jsonify({"patient": patient, "allowed_medicines": allowed_medicines}), 200

@bp.route('/<string:patient_tck>', methods=['POST'])
def post(patient_tck: str):
    cursor = db.connection.cursor(DictCursor)

    cursor.execute(
        """
        SELECT person_id FROM Person WHERE tck = %s
        """,
        (patient_tck,)
    )
    patient = cursor.fetchone()

    if not patient:
        return error_404(patient_tck)

    doctor_id = session['user_id']

    data = request.get_json()

    cursor.execute(
        """
        INSERT INTO Prescription(patient_id, doctor_id, write_date, due_date, type, status)
        VALUES (%s, %s, NOW(), DATE_ADD(NOW(), INTERVAL 72 HOUR), %s, 'ACTIVE')
        """,
        (patient["person_id"], doctor_id, data['type'].upper())
    )

    cursor.execute(
        """
        SELECT LAST_INSERT_ID() AS id FROM Prescription
        """
    )
    prescription_id = cursor.fetchone()['id']
    try:
        for medicine in data['medicines']:
            cursor.execute(
                """
                SELECT prod_id FROM Product WHERE name = %s           
                """,
                (medicine['name'],)
            )
            med_id = cursor.fetchone()['prod_id']
            cursor.execute(
                """
                INSERT INTO medicine_presc(presc_id, med_id, box_count, dosage, description)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (int(prescription_id), int(med_id), int(medicine['count']), medicine['dosage_type'],
                 medicine['medicine_desc'])
            )

        for disease in data['diseases']:
            cursor.execute(
                """
                SELECT disease_id FROM Disease WHERE name = %s   
                """,
                (disease['value'],)
            )
            disease_id = cursor.fetchone()['disease_id']

            cursor.execute(
                """
                INSERT INTO presc_disease(presc_id, disease_id)
                VALUES (%s, %s)
                """,
                (prescription_id, disease_id)
            )
    except Error as e:
        print(e)
        db.connection.rollback()
        current_app.logger.error(str(e))
        return jsonify({"message": str(e)}), 500

    db.connection.commit()
    return jsonify({"message": "Prescription successfully added."}), 202

@bp.route('/', methods=['GET'])
def get_diseases():
    cursor = db.connection.cursor(DictCursor)

    cursor.execute(
        """
        SELECT * FROM Disease
        """
    )
    diseases = cursor.fetchall()

    return jsonify(diseases)

bp.add_url_rule('<int:patient_tck>', view_func=PrescribeView.as_view('prescribe-patient'), methods=['GET'])
