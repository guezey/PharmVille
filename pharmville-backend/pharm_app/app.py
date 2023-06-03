from flask import Flask, session, request
from flask_session import Session
from flask_cors import CORS
from .extensions import db
from .conf import MysqlConfig
from .views import (medicine_bp, protein_powder_bp, skincare_bp,
                    prescribe_bp, prescriptions_bp, review_bp, orders_bp
                    )


def reg_blueprints(flask_app: Flask):
    flask_app.register_blueprint(medicine_bp)
    flask_app.register_blueprint(protein_powder_bp)
    flask_app.register_blueprint(skincare_bp)
    flask_app.register_blueprint(prescribe_bp)
    flask_app.register_blueprint(prescriptions_bp)
    flask_app.register_blueprint(review_bp)
    flask_app.register_blueprint(orders_bp)


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
app.config["CORS_HEADERS"] = ["Content-Type", "Authorization"]


@app.route('/')
def hello_world():  # put application's code here
    session['user_id'] = 2
    return 'Hello World!'


@app.route('/login', methods=['POST'])
def login():
    try:
        # FIXME
        session['user_id'] = request.get_json()['user_id']
    except KeyError:
        return 'Invalid user id', 400

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
