from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('prescribe', __name__, url_prefix='/prescribe')


def error_404(patient_tck):
    return jsonify({"message": f"Patient with TCK: {patient_tck} not found"}), 404


class PrescribeView(MethodView):

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
            return error_404(patient_tck)

        return jsonify(patient)

    def get(self):
        cursor = db.connection.cursor(DictCursor)

        cursor.execute(
            """
            SELECT * FROM Disease
            """
        )
        diseases = cursor.fetchall()

        return jsonify(diseases)

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
            return error_404(patient_tck)

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
            (
                prescription['patient_id'], prescription['doctor_id'], prescription['write_date'],
                prescription['due_date'],
                prescription['type'], prescription['status'])
        )
        # FIXME: (optional) critical section
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
        except Error as e:
            print(e)
            db.connection.rollback()
            return jsonify({"message": "Error occurred while adding prescription."}), 500

        db.connection.commit()

        return jsonify({"message": "Prescription successfully added."}), 202


bp.add_url_rule('<int:patient_tck>', view_func=PrescribeView.as_view('prescribe-patient'), methods=['GET', 'POST'])
bp.add_url_rule('', view_func=PrescribeView.as_view('prescribe-general'), methods=['GET'])
