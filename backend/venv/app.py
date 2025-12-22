from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth_routes import auth_bp
from routes.protected_routes import protected_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
JWTManager(app)

@app.route("/")
def home():
    return {"message": "Servidor activo"}

app.register_blueprint(auth_bp)
app.register_blueprint(protected_bp)

if __name__ == "__main__":
    app.run(debug=True)
