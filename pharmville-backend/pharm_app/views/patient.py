from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session, current_app
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('patient', __name__, url_prefix='/patient')


class PatientInfoView(MethodView):
    def get(self):
        current_app.logger.info(f"Patient info requested: {session}")
        user_id = session['user_id']
        cursor = db.connection.cursor(DictCursor)

        cursor.execute("""SELECT email, name, surname, tck, weight, height
        FROM Patient 
        NATURAL  JOIN  Person 
        NATURAL JOIN  User WHERE user_id = %s""", (user_id,))
        patient = cursor.fetchone()
        return jsonify(patient), 200


bp.add_url_rule("", view_func=PatientInfoView.as_view("patient-info"))
