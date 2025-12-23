from flask import Blueprint, request
from werkzeug.security import generate_password_hash
from database import get_db
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    password_hash = generate_password_hash(data["password"])

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO usuarios (nombre, email, password, role_id) VALUES (%s,%s,%s,%s)",
        (data["nombre"], data["email"], password_hash, 2)
    )

    db.commit()
    return {"message": "Usuario registrado correctamente"}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT u.id, u.password, r.nombre AS rol
        FROM usuarios u
        JOIN roles r ON u.role_id = r.id
        WHERE u.email=%s
    """, (data["email"],))

    user = cursor.fetchone()

    if not user or not check_password_hash(user["password"], data["password"]):
        return {"error": "Credenciales inválidas"}, 401

    token = create_access_token(identity={
        "id": user["id"],
        "rol": user["rol"]
    })

    return {"token": token, "rol": user["rol"]}


