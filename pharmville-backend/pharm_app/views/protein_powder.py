from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db
from pharm_app.utils.query_builder import ProteinPowderQueryBuilder

bp = Blueprint('protein-powder', __name__, url_prefix='/protein-powder')


def _parse_protein_powder_props(data):
    protein_powder = {
        'name': data['name'],
        'image_url': data.get('image_url'),
        'company': data['company'],
        'price': data['price'],
        'weight': data.get('weight'),
        'bcaa_percent': data.get('bcaa_percent'),
        'service_amount': data.get('service_amount'),
        'arginine_percent': data.get('arginine_percent'),
        'sugar_percent': data.get('sugar_percent'),
        'fat_percent': data.get('fat_percent'),
        'protein_percent': data.get('protein_percent'),
        'aroma': data['aroma']
    }
    return protein_powder


class ProteinPowderGroupView(MethodView):
    def put(self):
        data = request.get_json()
        current_app.logger.info(data)
        builder = ProteinPowderQueryBuilder(**data)

        cursor = db.connection.cursor(DictCursor)
        query = builder.build()
        current_app.logger.info(query)
        cursor.execute(query)

        protein_powders = cursor.fetchall()
        for protein_powder in protein_powders:
            protein_powder["prod_type"] = "ProteinPowder"
        return jsonify(protein_powders)

    def post(self):
        protein_powder = _parse_protein_powder_props(request.get_json())

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""INSERT INTO Product (name, company, image_url, price) 
                VALUES (%s, %s, %s, %s)
            """, (
                protein_powder['name'], protein_powder['company'], protein_powder['image_url'],
                protein_powder['price']))
            pk = cursor.lastrowid

            cursor.execute(f""" INSERT INTO ProteinPowder(prod_id, weight, bcaa_percent, service_amount,
             arginine_percent, sugar_percent, fat_percent, protein_percent, aroma_name) 
             VALUES  (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (pk, protein_powder['weight'], protein_powder['bcaa_percent'], protein_powder['service_amount'],
                  protein_powder['arginine_percent'], protein_powder['sugar_percent'], protein_powder['fat_percent'],
                  protein_powder['protein_percent'], protein_powder['aroma']
                  ))

            db.connection.commit()
        except Error as e:
            current_app.logger.error(str(e))
            db.connection.rollback()
            return str(e), 400
        return {'message': f"Protein powder with id: {pk} was added"}, 202


bp.add_url_rule('', view_func=ProteinPowderGroupView.as_view('protein-powder-group'))


class ProteinPowderView(MethodView):
    def error404(self, prod_id):
        return {"message": f"protein powder with id: {prod_id} not found "}, 404

    def get(self, prod_id: int):
        cursor = db.connection.cursor(DictCursor)
        cursor.execute("""
        SELECT * FROM full_protein_powder WHERE prod_id = %s
        """, (prod_id,))
        protein_powder = cursor.fetchone()
        if not protein_powder:
            return self.error404(prod_id)
        # fetch and merge remaining attributes

        cursor.execute("""
            SELECT DISTINCT (pharmacy_id), name,total_reviews, ROUND(avg_rating, 2) AS avg_rating 
            FROM Pharmacy NATURAL JOIN pharmacy_product NATURAL  JOIN pharmacy_ratings
                WHERE prod_id = %s 
        """, (prod_id,))
        pharmacy = cursor.fetchone()

        protein_powder['pharmacy'] = pharmacy if pharmacy else {}
        protein_powder['prod_type'] = "ProteinPowder"
        return jsonify(protein_powder)

    def put(self, prod_id: int):
        protein_powder = _parse_protein_powder_props(request.get_json())

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""SELECT * FROM ProteinPowder WHERE prod_id = %s""", (prod_id,))
            if not cursor.fetchone():
                return self.error404(prod_id)

            cursor.execute("""UPDATE Product 
                    SET name = %s, company = %s, image_url = %s, price = %s
                            WHERE prod_id = %s AND prod_id IN (SELECT prod_id FROM ProteinPowder)
                    """, (
                protein_powder['name'], protein_powder['company'], protein_powder['image_url'],
                protein_powder['price'], prod_id))

            cursor.execute("""UPDATE ProteinPowder SET  weight = %s, bcaa_percent = %s, service_amount = %s,
            arginine_percent = %s, sugar_percent = %s, fat_percent = %s, protein_percent = %s, aroma_name = %s
            WHERE prod_id = %s 
             """, (protein_powder['weight'], protein_powder['bcaa_percent'],
                protein_powder['service_amount'], protein_powder['arginine_percent'], protein_powder['sugar_percent'],
                protein_powder['fat_percent'], protein_powder['protein_percent'], protein_powder['aroma'],prod_id))

            # cursor.execute("""UPDATE ProteinPowder SET """)
            db.connection.commit()
        except Error as e:
            print(f"An error occurred during the update: {str(e)}")
            db.connection.rollback()
            return str(e), 400

        return f"Update on product: {prod_id} was successful", 202


bp.add_url_rule('<int:prod_id>', view_func=ProteinPowderView.as_view('protein-powder'))


@bp.route('/filter_options', methods=['GET'])
def filter_options():
    filter_option = {}
    cursor = db.connection.cursor(Cursor)
    cursor.execute(f"""SELECT aroma_name FROM  Aroma ORDER BY  aroma_name """)
    filter_option["aromas"] = [aroma[0] for aroma in cursor.fetchall()]
    return jsonify(filter_option)
