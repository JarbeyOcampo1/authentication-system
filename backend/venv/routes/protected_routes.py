from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

protected_bp = Blueprint("protected", __name__)

@protected_bp.route("/admin")
@jwt_required()
def admin():
    user = get_jwt_identity()

    if user["rol"] != "ADMIN":
        return {"error": "Acceso denegado"}, 403

    return {"message": "Bienvenido ADMIN"}
