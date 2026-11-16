from __future__ import annotations

import os

from flask import Flask, jsonify, redirect, send_from_directory, request
from mysql.connector import Error

if __package__:
    from .database import PROJECT_DIR, get_connection
    from .users_roles import initialize_system, users_roles_bp
else:
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

# Carpeta donde se almacenarán las fotografías de los productos.
UPLOAD_FOLDER = os.path.join(
    PROJECT_DIR,
    "backend_python",
    "static",
    "uploads",
    "productos"
)

# Crear la carpeta automáticamente si todavía no existe.
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Extensiones de imagen permitidas.
ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
def json_response(payload: dict, status: int = 200):
    # Helper para devolver respuestas JSON limpias y consistentes.
    response = jsonify(payload)
    response.status_code = status
    return response

# Comprobar si el archivo tiene una extensión permitida.
def archivo_imagen_permitido(nombre_archivo):
    return (
        "." in nombre_archivo
        and nombre_archivo.rsplit(".", 1)[1].lower()
        in ALLOWED_IMAGE_EXTENSIONS
    )
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
                        p.categoria_id,
                        p.cantidad,
                        p.precio_fisico,
                        p.precio_redes,
                        p.precio_mercadolibre,
                        p.foto,
                        p.ubicacion,
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



@app.route("/api/productos", methods=["POST"])
def crear_producto():
    """Registra un producto nuevo y almacena su fotografía."""
    from decimal import Decimal, InvalidOperation
    from werkzeug.utils import secure_filename
    import uuid

    data = request.form

    nombre = str(data.get("nombre", "")).strip()

    if not nombre:
        return json_response({
            "ok": False,
            "message": "El nombre del producto es obligatorio."
        }, 400)

    if len(nombre) > 150:
        return json_response({
            "ok": False,
            "message": "El nombre no puede superar 150 caracteres."
        }, 400)

    archivo = request.files.get("foto")
    foto = None
    ruta_guardada = None

    if archivo and archivo.filename:
        if not archivo_imagen_permitido(archivo.filename):
            return json_response({
                "ok": False,
                "message": "Formato de imagen no permitido."
            }, 400)

        nombre_seguro = secure_filename(archivo.filename)
        extension = nombre_seguro.rsplit(".", 1)[1].lower()
        nombre_archivo = f"{uuid.uuid4().hex}.{extension}"

        ruta_guardada = os.path.join(
            UPLOAD_FOLDER,
            nombre_archivo
        )

        foto = f"backend_python/static/uploads/productos/{nombre_archivo}"

    try:
        descripcion = data.get("descripcion") or None
        marca = data.get("marca") or None
        color = data.get("color") or None
        ubicacion = data.get("ubicacion") or None

        cantidad = int(data.get("cantidad", 0))

        if cantidad < 0:
            raise ValueError("La cantidad no puede ser negativa.")

        def convertir_precio(campo):
            valor = data.get(campo, 0)
            precio = Decimal(str(valor or 0))

            if not precio.is_finite() or precio < 0:
                raise ValueError(
                    f"El valor de {campo} no es válido."
                )

            return precio

        precio_compra = convertir_precio("precio_compra")
        precio_redes = convertir_precio("precio_redes")
        precio_mercadolibre = convertir_precio("precio_mercadolibre")
        precio_fisico = convertir_precio("precio_fisico")

        categoria_id = data.get("categoria_id") or None
        proveedor_id = data.get("proveedor_id") or None

        if categoria_id is not None:
            categoria_id = int(categoria_id)

        if proveedor_id is not None:
            proveedor_id = int(proveedor_id)

    except (ValueError, InvalidOperation, TypeError):
        return json_response({
            "ok": False,
            "message": "Revisa la cantidad, los precios y los identificadores."
        }, 400)

    try:
        if archivo and archivo.filename:
            archivo.save(ruta_guardada)

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO productos (
                        nombre, descripcion, marca, color, cantidad,
                        precio_compra, precio_redes, precio_mercadolibre,
                        precio_fisico, ubicacion, foto, categoria_id,
                        proveedor_id
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        nombre, descripcion, marca, color, cantidad,
                        precio_compra, precio_redes, precio_mercadolibre,
                        precio_fisico, ubicacion, foto, categoria_id,
                        proveedor_id
                    )
                )

                nuevo_id = cursor.lastrowid

            connection.commit()

        return json_response({
            "ok": True,
            "message": "Producto registrado correctamente.",
            "id": nuevo_id
        }, 201)

    except Error as exc:
        if ruta_guardada and os.path.exists(ruta_guardada):
            os.remove(ruta_guardada)

        return json_response({
            "ok": False,
            "message": "No fue posible registrar el producto.",
            "detail": str(exc)
        }, 500)


@app.route("/api/productos/<int:producto_id>", methods=["PUT"])
def actualizar_producto(producto_id):
    """Actualiza un producto y permite reemplazar su fotografía."""
    from decimal import Decimal, InvalidOperation
    from werkzeug.utils import secure_filename
    import uuid

    # Recibir los datos enviados mediante FormData.
    data = request.form

    nombre = str(data.get("nombre", "")).strip()

    if not nombre:
        return json_response({
            "ok": False,
            "message": "El nombre del producto es obligatorio."
        }, 400)

    if len(nombre) > 150:
        return json_response({
            "ok": False,
            "message": "El nombre no puede superar 150 caracteres."
        }, 400)

    # Revisar si se seleccionó una fotografía nueva.
    archivo = request.files.get("foto")
    ruta_guardada = None
    foto_nueva = None

    if archivo and archivo.filename:
        if not archivo_imagen_permitido(archivo.filename):
            return json_response({
                "ok": False,
                "message": "Formato de imagen no permitido."
            }, 400)

        nombre_seguro = secure_filename(archivo.filename)
        extension = nombre_seguro.rsplit(".", 1)[1].lower()
        nombre_archivo = f"{uuid.uuid4().hex}.{extension}"

        ruta_guardada = os.path.join(
            UPLOAD_FOLDER,
            nombre_archivo
        )

        foto_nueva = (
            f"backend_python/static/uploads/productos/{nombre_archivo}"
        )

    try:
        descripcion = data.get("descripcion") or None
        marca = data.get("marca") or None
        color = data.get("color") or None
        ubicacion = data.get("ubicacion") or None

        cantidad = int(data.get("cantidad", 0))

        if cantidad < 0:
            raise ValueError("La cantidad no puede ser negativa.")

        def convertir_precio(campo):
            valor = data.get(campo, 0)
            precio = Decimal(str(valor or 0))

            if not precio.is_finite() or precio < 0:
                raise ValueError(
                    f"El valor de {campo} no es válido."
                )

            return precio

        precio_compra = convertir_precio("precio_compra")
        precio_redes = convertir_precio("precio_redes")
        precio_mercadolibre = convertir_precio("precio_mercadolibre")
        precio_fisico = convertir_precio("precio_fisico")

        categoria_id = data.get("categoria_id") or None
        proveedor_id = data.get("proveedor_id") or None

        if categoria_id is not None:
            categoria_id = int(categoria_id)

        if proveedor_id is not None:
            proveedor_id = int(proveedor_id)

    except (ValueError, InvalidOperation, TypeError):
        return json_response({
            "ok": False,
            "message": "Revisa la cantidad, los precios y los identificadores."
        }, 400)

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:

                # Consultar si existe el producto y recuperar su fotografía.
                cursor.execute(
                    "SELECT id, foto FROM productos WHERE id = %s",
                    (producto_id,)
                )

                producto_actual = cursor.fetchone()

                if producto_actual is None:
                    return json_response({
                        "ok": False,
                        "message": "El producto que intentas actualizar no existe."
                    }, 404)

                foto_anterior = producto_actual[1]

                # Si no se seleccionó una imagen nueva, conservar la anterior.
                foto_final = foto_nueva if foto_nueva else foto_anterior

                # Guardar la nueva fotografía, si existe.
                if archivo and archivo.filename:
                    archivo.save(ruta_guardada)

                # Actualizar los datos del producto.
                cursor.execute(
                    """
                    UPDATE productos
                    SET
                        nombre = %s,
                        descripcion = %s,
                        marca = %s,
                        color = %s,
                        cantidad = %s,
                        precio_compra = %s,
                        precio_redes = %s,
                        precio_mercadolibre = %s,
                        precio_fisico = %s,
                        ubicacion = %s,
                        foto = %s,
                        categoria_id = %s,
                        proveedor_id = %s
                    WHERE id = %s
                    """,
                    (
                        nombre,
                        descripcion,
                        marca,
                        color,
                        cantidad,
                        precio_compra,
                        precio_redes,
                        precio_mercadolibre,
                        precio_fisico,
                        ubicacion,
                        foto_final,
                        categoria_id,
                        proveedor_id,
                        producto_id
                    )
                )

            connection.commit()

        # Eliminar la fotografía anterior solo después de actualizar correctamente.
        if foto_nueva and foto_anterior:
            carpeta_relativa = "backend_python/static/uploads/productos/"

            if foto_anterior.startswith(carpeta_relativa):
                ruta_anterior = os.path.join(
                    PROJECT_DIR,
                    foto_anterior
                )

                if os.path.isfile(ruta_anterior):
                    os.remove(ruta_anterior)

        return json_response({
            "ok": True,
            "message": "Producto actualizado correctamente.",
            "id": producto_id
        })

    except Exception as exc:

        # Si ocurrió un error, eliminar la fotografía nueva que se alcanzó a guardar.
        if ruta_guardada and os.path.exists(ruta_guardada):
            os.remove(ruta_guardada)

        return json_response({
            "ok": False,
            "message": "No fue posible actualizar el producto.",
            "detail": str(exc)
        }, 500)

@app.route("/api/productos/<int:producto_id>", methods=["DELETE"])
def eliminar_producto(producto_id):
    """Elimina un producto existente de MySQL."""

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:

                # Comprobar que el producto exista.
                cursor.execute(
                    "SELECT id FROM productos WHERE id = %s",
                    (producto_id,)
                )

                if cursor.fetchone() is None:
                    return json_response({
                        "ok": False,
                        "message": "El producto que intentas eliminar no existe."
                    }, 404)

                # Eliminar el producto.
                cursor.execute(
                    "DELETE FROM productos WHERE id = %s",
                    (producto_id,)
                )

            connection.commit()

        return json_response({
            "ok": True,
            "message": "Producto eliminado correctamente.",
            "id": producto_id
        })

    except Error as exc:
        return json_response({
            "ok": False,
            "message": "No fue posible eliminar el producto.",
            "detail": str(exc)
        }, 500)
        

@app.route("/api/categorias/<int:categoria_id>/productos", methods=["GET"])
def listar_productos_categoria(categoria_id):
    """Consulta los productos asociados a una categoría."""

    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:

                # Verificar que la categoría exista
                cursor.execute(
                    """
                    SELECT id, nombre
                    FROM categorias
                    WHERE id = %s
                    """,
                    (categoria_id,)
                )

                categoria = cursor.fetchone()

                if not categoria:
                    return json_response({
                        "ok": False,
                        "message": "La categoría no existe."
                    }, 404)

                # Consultar los productos asociados
                cursor.execute(
                    """
                    SELECT id, nombre
                    FROM productos
                    WHERE categoria_id = %s
                    ORDER BY nombre ASC
                    """,
                    (categoria_id,)
                )

                productos = cursor.fetchall()

        return json_response({
            "ok": True,
            "categoria": categoria["nombre"],
            "total": len(productos),
            "data": productos
        })

    except Error as exc:
        return json_response({
            "ok": False,
            "message": "No fue posible consultar los productos asociados.",
            "detail": str(exc)
        }, 500)
        

@app.route("/api/categorias", methods=["GET"])
def listar_categorias():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("""
                    SELECT id, nombre, descripcion
                    FROM categorias
                    ORDER BY nombre ASC
                """)
                categorias = cursor.fetchall()

        return json_response({"ok": True, "data": categorias})

    except Error as exc:
        return json_response(
            {"ok": False, "message": str(exc)}, 500
        )


@app.route("/api/categorias", methods=["POST"])
def crear_categoria():
    data = request.get_json(silent=True) or {}

    nombre = str(data.get("nombre", "")).strip()
    descripcion = str(data.get("descripcion", "")).strip() or None

    if not nombre:
        return json_response({
            "ok": False,
            "message": "El nombre de la categoría es obligatorio."
        }, 400)

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO categorias (nombre, descripcion)
                    VALUES (%s, %s)
                    """,
                    (nombre, descripcion)
                )
                nuevo_id = cursor.lastrowid

            connection.commit()

        return json_response({
            "ok": True,
            "message": "Categoría creada correctamente.",
            "id": nuevo_id
        }, 201)

    except Error as exc:
        return json_response({
            "ok": False,
            "message": "No fue posible crear la categoría.",
            "detail": str(exc)
        }, 500)

@app.route("/api/categorias/<int:categoria_id>", methods=["PUT"])
def actualizar_categoria(categoria_id):
    data = request.get_json(silent=True) or {}

    nombre = str(data.get("nombre", "")).strip()
    descripcion = str(data.get("descripcion", "")).strip() or None

    if not nombre:
        return json_response({
            "ok": False,
            "message": "El nombre de la categoría es obligatorio."
        }, 400)

    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE categorias
                    SET nombre = %s, descripcion = %s
                    WHERE id = %s
                    """,
                    (nombre, descripcion, categoria_id)
                )

                if cursor.rowcount == 0:
                    return json_response({
                        "ok": False,
                        "message": "La categoría no existe."
                    }, 404)

            connection.commit()

        return json_response({
            "ok": True,
            "message": "Categoría actualizada correctamente."
        })

    except Error as exc:
        return json_response({
            "ok": False,
            "message": "No fue posible actualizar la categoría.",
            "detail": str(exc)
        }, 500)


@app.route("/api/categorias/<int:categoria_id>", methods=["DELETE"])
def eliminar_categoria(categoria_id):
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "DELETE FROM categorias WHERE id = %s",
                    (categoria_id,)
                )

                if cursor.rowcount == 0:
                    return json_response({
                        "ok": False,
                        "message": "La categoría no existe."
                    }, 404)

            connection.commit()

        return json_response({
            "ok": True,
            "message": "Categoría eliminada correctamente."
        })

    except Error as exc:
        return json_response({
            "ok": False,
            "message": (
                "No fue posible eliminar la categoría. "
                "Verifica si tiene productos asociados."
            ),
            "detail": str(exc)
        }, 409)


@app.route("/api/proveedores", methods=["GET"])
def listar_proveedores():
    try:
        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("""
                    SELECT id, nombre, telefono, correo, direccion
                    FROM proveedores
                    ORDER BY nombre ASC
                """)
                proveedores = cursor.fetchall()

        return json_response({"ok": True, "data": proveedores})

    except Error as exc:
        return json_response(
            {"ok": False, "message": str(exc)}, 500
        )


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
