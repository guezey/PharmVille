from MySQLdb.cursors import DictCursor, Cursor
from MySQLdb import Error
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from pharm_app.extensions import db
from pharm_app.utils.query_builder import SkincareQueryBuilder

bp = Blueprint('skincare', __name__, url_prefix='/skincare')


def _parse_skincare_props(data):
    skincare = {
        'name': data['name'],
        'image_url': data.get('image_url'),
        'company': data.get('company'),
        'price': data.get('price'),
        'volume': data.get('volume'),
        'skin_types': data.get('skin_types'),
        'skincare_type': data.get('skincare_type')
    }
    return skincare


class SkincareGroupView(MethodView):
    def put(self):
        data = request.get_json()
        current_app.logger.info(data)
        builder = SkincareQueryBuilder(**data)

        cursor = db.connection.cursor(DictCursor)
        query = builder.build()
        current_app.logger.info(query)
        cursor.execute(query)

        skincare = cursor.fetchall()
        for skincare_prod in skincare :
            skincare_prod["prod_type"] = "Skincare"
        return jsonify(skincare)

    def post(self):
        skincare = _parse_skincare_props(request.get_json())

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""INSERT INTO Product (name, company, image_url, price) 
                VALUES (%s, %s, %s, %s)
            """, (
                skincare['name'], skincare['company'], skincare['image_url'],
                skincare['price']))
            pk = cursor.lastrowid

            cursor.execute("""INSERT INTO Skincare(prod_id, volume, skincare_type)
                VALUES (%s, %s, %s)           
            """, (pk, skincare['volume'], skincare['skincare_type']))
            for skin_type in skincare['skin_types']:
                cursor.execute("""INSERT INTO applicable_skin_types (skin_type, product_id)
                VALUES (%s, %s)""", (skin_type, pk))

            db.connection.commit()
        except Error as e:
            current_app.logger.error(str(e))
            db.connection.rollback()
            return str(e), 400
        return {'message': f"Skincare product with id: {pk} was added"}, 202


bp.add_url_rule('', view_func=SkincareGroupView.as_view('skincare-group'))


class SkincareView(MethodView):
    def error404(self, prod_id):
        return {"message": f"skincare product with id: {prod_id} not found "}, 404

    def get(self, prod_id: int):
        cursor = db.connection.cursor(DictCursor)
        cursor.execute("""
        SELECT * FROM full_skincare WHERE prod_id = %s
        """, (prod_id,))
        skincare = cursor.fetchone()
        if not skincare:
            return self.error404(prod_id)

        cursor.execute("""
            SELECT pharmacy_id, name FROM Pharmacy NATURAL JOIN pharmacy_product
                WHERE prod_id = %s 
        """, (prod_id,))
        pharmacy = cursor.fetchone()
        skincare['pharmacy'] = pharmacy if pharmacy else {}

        cursor = db.connection.cursor(Cursor)
        cursor.execute("""SELECT skin_type  FROM applicable_skin_types
                WHERE product_id = %s""", (prod_id,))
        skincare['applicable_skin_types'] = [skin_type[0] for skin_type in cursor.fetchall()]
        skincare['prod_type'] = "Skincare"
        return jsonify(skincare)

    def put(self, prod_id: int):
        skincare = _parse_skincare_props(request.get_json())

        cursor = db.connection.cursor(DictCursor)
        try:
            cursor.execute("""SELECT * FROM full_skincare""")
            if not cursor.fetchone():
                return self.error404(prod_id)

            cursor.execute("""UPDATE Product 
                    SET name = %s, company = %s, image_url = %s, price = %s
                        WHERE prod_id = %s """, (skincare['name'], skincare['company'], skincare['image_url'],
                                                 skincare['price'], prod_id))
            cursor.execute("""UPDATE Skincare SET  volume = %s, skincare_type = %s WHERE prod_id = %s """,
                           (skincare['volume'], skincare["skincare_type"], prod_id))

            cursor.execute("""DELETE FROM applicable_skin_types WHERE product_id = %s""", (prod_id,))
            for skin_type in skincare['skin_types']:
                cursor.execute("""INSERT INTO applicable_skin_types(skin_type, product_id)
                                  VALUES (%s, %s)
                               """, (skin_type, prod_id))
            db.connection.commit()
        except Error as e:
            print(f"An error occurred during the update: {str(e)}")
            db.connection.rollback()
            return str(e), 400

        return f"Update on product: {prod_id} was successful", 202


bp.add_url_rule('<int:prod_id>', view_func=SkincareView.as_view('skincare'))


@bp.route('/filter_options', methods=['GET'])
def filter_options():
    filter_option = {}
    cursor = db.connection.cursor(Cursor)
    cursor.execute(f"""SELECT skin_type FROM  SkinTypes ORDER BY  skin_type """)
    filter_option["skin_types"] = [skin_type[0] for skin_type in cursor.fetchall()]
    cursor.execute("SELECT skincare_type FROM SkincareType ORDER BY  skincare_type ")
    filter_option["skincare_types"] = [skincare_type[0] for skincare_type in cursor.fetchall()]
    return jsonify(filter_option)
