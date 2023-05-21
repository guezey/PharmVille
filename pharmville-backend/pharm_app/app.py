from flask import Flask

from .extensions import db
from .conf import MysqlConfig
from .views import medicine_bp


def reg_blueprints(flask_app: Flask):
    flask_app.register_blueprint(medicine_bp)


def register_extensions(flask_app: Flask):
    db.init_app(flask_app)
    reg_blueprints(flask_app)


def create_app():
    flask_app = Flask(__name__)
    flask_app.config.from_object(MysqlConfig)
    register_extensions(flask_app)
    return flask_app


app = create_app()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
