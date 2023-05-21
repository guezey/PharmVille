from flask import Flask
from flask_mysqldb import MySQL
from flask_restful import Api
from conf import MysqlConfig

app = Flask(__name__)

app.config.from_object(MysqlConfig)
mysql = MySQL(app)
api = Api(app)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
