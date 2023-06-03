from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db


