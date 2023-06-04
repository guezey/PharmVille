from MySQLdb.cursors import DictCursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, session, current_app
from flask.views import MethodView
from pharm_app.extensions import db

bp = Blueprint('patient', __name__, url_prefix='/doctor')


class DoctorVie(MethodView):
    def get(self):
        user_id = session['user_id']
        cursor = db.connection.cursor(DictCursor)

        cursor.execute("""SELECT email, name, surname, speciality, approval_status
                FROM Doctor 
                NATURAL JOIN Person 
                NATURAL JOIN User 
                WHERE user_id = %s""", (user_id,))
        doctor = cursor.fetchone()
        return jsonify(doctor), 200


bp.add_url_rule("", view_func=DoctorVie.as_view("doctor-info"))
