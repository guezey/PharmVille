import MySQLdb.cursors
from flask_restful import Resource, reqparse
from app import mysql
from query_builder import MedicineQueryBuilde

parser = reqparse.RequestParser()


class MedicineList(Resource):
    def get(self):


        

        

    