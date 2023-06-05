from MySQLdb.cursors import DictCursor
from flask import Blueprint, redirect, url_for, jsonify, current_app

from pharm_app.extensions import db

bp = Blueprint('products', __name__, url_prefix='/products')


@bp.route("/<int:prod_id>", methods=["GET"])
def get_products(prod_id):
    cursor = db.connection.cursor(DictCursor)

    cursor.execute("""
        SELECT * FROM full_medicine WHERE prod_id = %s
    """, (prod_id,))
    medicine = cursor.fetchone()
    current_app.logger.info(medicine)
    if medicine:
        return redirect(url_for("medicine.medicine", prod_id=prod_id))
    
    
    cursor.execute("""
        SELECT * FROM full_protein_powder WHERE prod_id = %s
    """, (prod_id,))
    protein_powder = cursor.fetchone()
    if protein_powder:
        return redirect(url_for("protein-powder.protein-powder", prod_id=prod_id))
    cursor.execute("""
           SELECT * FROM full_skincare WHERE prod_id = %s
       """, (prod_id,))
    skincare = cursor.fetchone()
    if skincare:
        return redirect(url_for("skincare.skincare", prod_id=prod_id))

    return jsonify({"msg": f"Error finding product with id : {prod_id}"}), 404
