from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('prescriptions', __name__, url_prefix='/prescriptions')


class PrescriptionsView(MethodView):
    def get(self):
        cursor = db.connection.cursor(DictCursor)
        patient = session['user_id']

        cursor.execute(
            """
            SELECT * FROM Prescription WHERE patient_id = %s
            """,
            (patient,)
        )
        prescriptions = cursor.fetchall()

        cursor.execute(
            """
            SELECT * FROM medicine_presc
            INNER JOIN Medicine ON medicine_presc.med_id = Medicine.prod_id
            WHERE presc_id IN (
                SELECT presc_id FROM Prescription WHERE patient_id = %s
            )
            """,
            (patient,)
        )
        medicines = cursor.fetchall()

        cursor.execute(
            """
            SELECT * FROM presc_disease
            NATURAL JOIN Disease
            WHERE presc_id IN (
                SELECT presc_id FROM Prescription WHERE patient_id = %s
            )
            """,
            (patient,)
        )
        diseases = cursor.fetchall()

        prescriptions_with_medicines = []
        for prescription in prescriptions:
            prescription['medicines'] = []
            for medicine in medicines:
                if medicine['presc_id'] == prescription['presc_id']:
                    prescription['medicines'].append(medicine)
            prescriptions_with_medicines.append(prescription)

        prescriptions_with_medicines_and_diseases = []
        for prescription in prescriptions_with_medicines:
            prescription['diseases'] = []
            for disease in diseases:
                if disease['presc_id'] == prescription['presc_id']:
                    prescription['diseases'].append(disease)
            prescriptions_with_medicines_and_diseases.append(prescription)

        for prescription in prescriptions_with_medicines_and_diseases:
            cursor.execute(
                """
                SELECT name, surname FROM Doctor
                NATURAL JOIN Person
                WHERE doctor_id = %s
                """,
                (prescription['doctor_id'],)
            )
            doctor = cursor.fetchone()
            prescription['doctor'] = doctor
            prescription.pop('doctor_id')

        return jsonify(prescriptions_with_medicines_and_diseases), 200


bp.add_url_rule('', view_func=PrescriptionsView.as_view('prescriptions'), methods=['GET'])
