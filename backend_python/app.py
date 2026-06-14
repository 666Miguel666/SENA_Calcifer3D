from __future__ import annotations

import os

from flask import Flask, jsonify, redirect, send_from_directory
from mysql.connector import Error

from database import PROJECT_DIR, get_connection
from users_roles import initialize_system, users_roles_bp


# Flask servira dos cosas:
# 1. Las paginas HTML/CSS/JS del proyecto.
# 2. La API que habla con MySQL.
app = Flask(
    __name__,
    static_folder=str(PROJECT_DIR),
    static_url_path="",
)
app.register_blueprint(users_roles_bp)


def json_response(payload: dict, status: int = 200):
    # Helper para devolver respuestas JSON limpias y consistentes.
    response = jsonify(payload)
    response.status_code = status
    return response


@app.after_request
def add_cors_headers(response):
    # Permite que el frontend haga peticiones a la API incluso
    # si en algun momento se abre desde otra ruta o puerto.
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response


@app.route("/api/health", methods=["GET"])
def health():
    # Endpoint de prueba.
    # Sirve para confirmar rapido que Flask esta vivo.
    # No consulta base de datos.
    return json_response({"ok": True, "message": "API de Calcifer3D activa"})


@app.route("/api/productos", methods=["GET"])
def listar_productos():
    # Endpoint para listar productos.
    # Aqui usamos DML tipo SELECT para consultar la tabla productos.
    # Se puede reutilizar luego en tienda, panel admin o panel vendedor.
    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT
                        p.id,
                        p.nombre,
                        p.descripcion,
                        p.marca,
                        p.color,
                        p.cantidad,
                        p.precio_fisico,
                        p.precio_redes,
                        p.precio_mercadolibre,
                        p.foto,
                        c.nombre AS categoria
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    ORDER BY p.id DESC
                    """
                )
                productos = cursor.fetchall()
        return json_response({"ok": True, "data": productos})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@app.route("/")
def root():
    # Ruta principal del proyecto.
    # Cuando abres http://127.0.0.1:5000/ se carga index.html.
    return app.send_static_file("index.html")


@app.route("/login")
def login_page():
    # Ruta amigable para abrir la vista de ingreso.
    return app.send_static_file("login.html")


@app.route("/registro")
def registro_page():
    # Ruta amigable para abrir la vista de registro.
    return app.send_static_file("registro.html")


@app.route("/panel")
def panel_page():
    # Ruta reservada por si luego queremos una redireccion inteligente
    # segun el rol del usuario autenticado.
    return redirect("/login")


@app.route("/<path:path>")
def static_pages(path: str):
    # Servidor de archivos del frontend.
    # Permite abrir html, css, js, imagenes y rutas como /adminPro.html.
    # Si la ruta no existe, vuelve al index para evitar errores bruscos.
    file_path = PROJECT_DIR / path
    if file_path.exists() and file_path.is_file():
        return send_from_directory(PROJECT_DIR, path)

    if not path.endswith(".html"):
        html_path = PROJECT_DIR / f"{path}.html"
        if html_path.exists() and html_path.is_file():
            return send_from_directory(PROJECT_DIR, f"{path}.html")

    return app.send_static_file("index.html")


if __name__ == "__main__":
    # Punto de entrada del servidor Flask.
    # Se usa al ejecutar: python backend_python/app.py
    app.run(
        host=os.getenv("FLASK_HOST", "127.0.0.1"),
        port=int(os.getenv("FLASK_PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "true").lower() == "true",
    )
