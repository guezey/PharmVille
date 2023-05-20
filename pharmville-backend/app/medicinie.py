from app import  app, mysql
import MySQLdb.cursors


@app.get('/medicine')
def get_medicine():
    