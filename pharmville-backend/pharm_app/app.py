from flask import Flask, session, request, jsonify, current_app
from flask_session import Session
from MySQLdb.cursors import DictCursor
from flask_cors import CORS
from .extensions import db
from .conf import MysqlConfig
from .views import medicine_bp, protein_powder_bp, skincare_bp, prescribe_bp, prescriptions_bp
import bcrypt


def reg_blueprints(flask_app: Flask):
    flask_app.register_blueprint(medicine_bp)
    flask_app.register_blueprint(protein_powder_bp)
    flask_app.register_blueprint(skincare_bp)
    flask_app.register_blueprint(prescribe_bp)
    flask_app.register_blueprint(prescriptions_bp)


def register_extensions(flask_app: Flask):
    db.init_app(flask_app)
    reg_blueprints(flask_app)


def create_app():
    flask_app = Flask(__name__)
    flask_app.config["SESSION_PERMANENT"] = False
    flask_app.config["SESSION_TYPE"] = "filesystem"
    flask_app.config.from_object(MysqlConfig)
    register_extensions(flask_app)
    return flask_app


app = create_app()
Session(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/')
def hello_world():  # put application's code here
    session['user_id'] = 2
    return 'Hello World!'


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        pwd = data['password'].encode('utf-8')
        cursor = db.connection.cursor(DictCursor)
        cursor.execute("SELECT * FROM User WHERE email=%s", (data['email'],))
        result = cursor.fetchone()

        if result is None:
            return jsonify({"message": "Invalid email"}), 400
        else:
            current_app.logger.info(result)
            stored_hashed_password = result['password']

            if bcrypt.checkpw(pwd, stored_hashed_password.encode('utf-8')):
                session['user_id'] = result['user_id']
                session['role'] = result['role']
                return jsonify({"message": "Logged in", "role": result['role']}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401

    except KeyError:
        return 'Invalid username or password', 400

    return 'Logged in'



@app.route('/logout', methods=['POST'])
def logout():
    try:
        session.pop('user_id')
    except KeyError:
        return 'Not logged in', 400

    return 'Logged out'


@app.route('/signup', methods=['POST'])
def signup():
    # TODO: implement signup
    return 'Not implemented', 501


if __name__ == '__main__':
    app.run()
