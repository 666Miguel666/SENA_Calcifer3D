from __future__ import annotations

from flask import Blueprint, request
from mysql.connector import Error
from werkzeug.security import check_password_hash, generate_password_hash

from database import bootstrap_database, get_connection


users_roles_bp = Blueprint("users_roles", __name__)

DEFAULT_ROLES = ("Admin", "Vendedor", "Comprador", "Contador")

DEFAULT_USERS = (
    {
        "nombre": "Administrador Calcifer",
        "correo": "admin@calcifer3d.com",
        "password": "Admin1234",
        "rol": "Admin",
    },
    {
        "nombre": "Vendedor Calcifer",
        "correo": "vendedor@calcifer3d.com",
        "password": "Vendedor1234",
        "rol": "Vendedor",
    },
    {
        "nombre": "Contador Calcifer",
        "correo": "contador@calcifer3d.com",
        "password": "Contador1234",
        "rol": "Contador",
    },
)


def json_response(payload: dict, status: int = 200):
    from flask import jsonify

    response = jsonify(payload)
    response.status_code = status
    return response


def ensure_roles_and_default_users() -> None:
    with get_connection() as connection:
        with connection.cursor(dictionary=True) as cursor:
            for role_name in DEFAULT_ROLES:
                cursor.execute("SELECT id FROM roles WHERE nombre = %s", (role_name,))
                role = cursor.fetchone()
                if not role:
                    cursor.execute("INSERT INTO roles (nombre) VALUES (%s)", (role_name,))

            for user in DEFAULT_USERS:
                cursor.execute("SELECT id FROM roles WHERE nombre = %s", (user["rol"],))
                role = cursor.fetchone()
                if not role:
                    continue

                cursor.execute(
                    "SELECT id FROM usuarios WHERE correo = %s", (user["correo"],)
                )
                existing_user = cursor.fetchone()
                if existing_user:
                    continue

                cursor.execute(
                    """
                    INSERT INTO usuarios (nombre, correo, password, rol_id)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (
                        user["nombre"],
                        user["correo"],
                        generate_password_hash(user["password"]),
                        role["id"],
                    ),
                )
        connection.commit()


def initialize_system() -> None:
    bootstrap_database()
    ensure_roles_and_default_users()


@users_roles_bp.route("/api/setup", methods=["POST", "OPTIONS"])
def setup_database():
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        initialize_system()
        return json_response(
            {
                "ok": True,
                "message": "Base de datos inicializada correctamente",
                "default_users": [
                    {
                        "correo": user["correo"],
                        "password": user["password"],
                        "rol": user["rol"],
                    }
                    for user in DEFAULT_USERS
                ],
            }
        )
    except Exception as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/auth/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}
    correo = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not correo or not password:
        return json_response(
            {"ok": False, "message": "Correo y contrasena son obligatorios"}, 400
        )

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT
                        u.id,
                        u.nombre,
                        u.correo,
                        u.password,
                        r.nombre AS rol
                    FROM usuarios u
                    INNER JOIN roles r ON r.id = u.rol_id
                    WHERE u.correo = %s
                    LIMIT 1
                    """,
                    (correo,),
                )
                usuario = cursor.fetchone()

        if not usuario or not check_password_hash(usuario["password"], password):
            return json_response(
                {"ok": False, "message": "Credenciales incorrectas"}, 401
            )

        return json_response(
            {
                "ok": True,
                "message": "Inicio de sesion exitoso",
                "user": {
                    "id": usuario["id"],
                    "nombre": usuario["nombre"],
                    "correo": usuario["correo"],
                    "rol": usuario["rol"],
                },
            }
        )
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/usuarios", methods=["GET"])
def listar_usuarios():
    # READ del CRUD de usuarios.
    # Lista usuarios reales con su rol para llenar la tabla del panel admin.
    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT
                        u.id,
                        u.nombre,
                        u.correo,
                        u.rol_id,
                        r.nombre AS rol,
                        'Activo' AS estado
                    FROM usuarios u
                    INNER JOIN roles r ON r.id = u.rol_id
                    ORDER BY u.id ASC
                    """
                )
                usuarios = cursor.fetchall()

        return json_response({"ok": True, "data": usuarios})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/usuarios", methods=["POST", "OPTIONS"])
def crear_usuario():
    # CREATE del CRUD de usuarios.
    # Crea un usuario con nombre, correo, contrasena y rol.
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}
    nombre = (data.get("nombre") or "").strip()
    correo = (data.get("correo") or "").strip().lower()
    password = data.get("password") or ""
    rol_id = data.get("rol_id")

    if not nombre or not correo or not password or not rol_id:
        return json_response(
            {"ok": False, "message": "Nombre, correo, contrasena y rol son obligatorios"},
            400,
        )

    try:
        rol_id = int(rol_id)
    except (TypeError, ValueError):
        return json_response({"ok": False, "message": "Rol invalido"}, 400)

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM roles WHERE id = %s", (rol_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Rol no encontrado"}, 404)

                cursor.execute("SELECT id FROM usuarios WHERE correo = %s", (correo,))
                if cursor.fetchone():
                    return json_response(
                        {"ok": False, "message": "El correo ya esta registrado"},
                        409,
                    )

                cursor.execute(
                    """
                    INSERT INTO usuarios (nombre, correo, password, rol_id)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (nombre, correo, generate_password_hash(password), rol_id),
                )
                user_id = cursor.lastrowid
            connection.commit()

        return json_response(
            {"ok": True, "message": "Usuario creado correctamente", "id": user_id},
            201,
        )
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/usuarios/<int:user_id>", methods=["PUT", "OPTIONS"])
def actualizar_usuario(user_id: int):
    # UPDATE del CRUD de usuarios.
    # Actualiza datos basicos; la contrasena solo cambia si se envia una nueva.
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}
    nombre = (data.get("nombre") or "").strip()
    correo = (data.get("correo") or "").strip().lower()
    password = data.get("password") or ""
    rol_id = data.get("rol_id")

    if not nombre or not correo or not rol_id:
        return json_response(
            {"ok": False, "message": "Nombre, correo y rol son obligatorios"},
            400,
        )

    try:
        rol_id = int(rol_id)
    except (TypeError, ValueError):
        return json_response({"ok": False, "message": "Rol invalido"}, 400)

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM usuarios WHERE id = %s", (user_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Usuario no encontrado"}, 404)

                cursor.execute("SELECT id FROM roles WHERE id = %s", (rol_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Rol no encontrado"}, 404)

                cursor.execute(
                    """
                    SELECT id
                    FROM usuarios
                    WHERE correo = %s AND id <> %s
                    """,
                    (correo, user_id),
                )
                if cursor.fetchone():
                    return json_response(
                        {"ok": False, "message": "El correo ya esta registrado"},
                        409,
                    )

                if password:
                    cursor.execute(
                        """
                        UPDATE usuarios
                        SET nombre = %s, correo = %s, password = %s, rol_id = %s
                        WHERE id = %s
                        """,
                        (
                            nombre,
                            correo,
                            generate_password_hash(password),
                            rol_id,
                            user_id,
                        ),
                    )
                else:
                    cursor.execute(
                        """
                        UPDATE usuarios
                        SET nombre = %s, correo = %s, rol_id = %s
                        WHERE id = %s
                        """,
                        (nombre, correo, rol_id, user_id),
                    )
            connection.commit()

        return json_response({"ok": True, "message": "Usuario actualizado correctamente"})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/usuarios/<int:user_id>", methods=["DELETE", "OPTIONS"])
def eliminar_usuario(user_id: int):
    # DELETE del CRUD de usuarios.
    # Elimina el usuario seleccionado desde el panel administrador.
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM usuarios WHERE id = %s", (user_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Usuario no encontrado"}, 404)

                cursor.execute("DELETE FROM usuarios WHERE id = %s", (user_id,))
            connection.commit()

        return json_response({"ok": True, "message": "Usuario eliminado correctamente"})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/roles", methods=["GET"])
def listar_roles():
    # READ del CRUD de roles.
    # Lista todos los roles y muestra cuantos usuarios tiene asignado cada uno.
    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT
                        r.id,
                        r.nombre,
                        COUNT(u.id) AS total_usuarios
                    FROM roles r
                    LEFT JOIN usuarios u ON u.rol_id = r.id
                    GROUP BY r.id, r.nombre
                    ORDER BY r.id ASC
                    """
                )
                roles = cursor.fetchall()

        return json_response({"ok": True, "data": roles})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/roles", methods=["POST", "OPTIONS"])
def crear_rol():
    # CREATE del CRUD de roles.
    # Recibe el nombre del rol desde el formulario del panel administrador.
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}
    nombre = (data.get("nombre") or "").strip()

    if not nombre:
        return json_response(
            {"ok": False, "message": "El nombre del rol es obligatorio"}, 400
        )

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    "SELECT id FROM roles WHERE LOWER(nombre) = LOWER(%s)",
                    (nombre,),
                )
                if cursor.fetchone():
                    return json_response(
                        {"ok": False, "message": "Ya existe un rol con ese nombre"},
                        409,
                    )

                cursor.execute("INSERT INTO roles (nombre) VALUES (%s)", (nombre,))
                role_id = cursor.lastrowid
            connection.commit()

        return json_response(
            {"ok": True, "message": "Rol creado correctamente", "id": role_id},
            201,
        )
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/roles/<int:role_id>", methods=["PUT", "OPTIONS"])
def actualizar_rol(role_id: int):
    # UPDATE del CRUD de roles.
    # Actualiza el nombre de un rol existente usando su id.
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}
    nombre = (data.get("nombre") or "").strip()

    if not nombre:
        return json_response(
            {"ok": False, "message": "El nombre del rol es obligatorio"}, 400
        )

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM roles WHERE id = %s", (role_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Rol no encontrado"}, 404)

                cursor.execute(
                    """
                    SELECT id
                    FROM roles
                    WHERE LOWER(nombre) = LOWER(%s) AND id <> %s
                    """,
                    (nombre, role_id),
                )
                if cursor.fetchone():
                    return json_response(
                        {"ok": False, "message": "Ya existe un rol con ese nombre"},
                        409,
                    )

                cursor.execute(
                    "UPDATE roles SET nombre = %s WHERE id = %s",
                    (nombre, role_id),
                )
            connection.commit()

        return json_response({"ok": True, "message": "Rol actualizado correctamente"})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/roles/<int:role_id>", methods=["DELETE", "OPTIONS"])
def eliminar_rol(role_id: int):
    # DELETE del CRUD de roles.
    # Elimina un rol solo si no esta asignado a ningun usuario.
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM roles WHERE id = %s", (role_id,))
                if not cursor.fetchone():
                    return json_response({"ok": False, "message": "Rol no encontrado"}, 404)

                cursor.execute(
                    "SELECT COUNT(*) AS total FROM usuarios WHERE rol_id = %s",
                    (role_id,),
                )
                total_users = cursor.fetchone()["total"]
                if total_users > 0:
                    return json_response(
                        {
                            "ok": False,
                            "message": "No puedes eliminar un rol asignado a usuarios",
                        },
                        409,
                    )

                cursor.execute("DELETE FROM roles WHERE id = %s", (role_id,))
            connection.commit()

        return json_response({"ok": True, "message": "Rol eliminado correctamente"})
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)


@users_roles_bp.route("/api/clientes/registro", methods=["POST", "OPTIONS"])
def registrar_cliente():
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or {}

    tipo_cliente = (data.get("tipoCliente") or "").strip()
    nombre = (data.get("nombre") or "").strip()
    apellidos = (data.get("apellidos") or "").strip()
    nombre_empresa = (data.get("nombreEmpresa") or "").strip()
    correo = (data.get("email") or "").strip().lower()
    telefono = (data.get("telefono") or "").strip()
    direccion = (data.get("direccion") or "").strip()
    password = data.get("password") or ""

    if tipo_cliente not in {"persona", "empresa"}:
        return json_response({"ok": False, "message": "Tipo de cliente invalido"}, 400)

    nombre_cliente = (
        f"{nombre} {apellidos}".strip() if tipo_cliente == "persona" else nombre_empresa
    )

    if not nombre_cliente or not correo or not telefono or not direccion or not password:
        return json_response(
            {"ok": False, "message": "Faltan campos obligatorios"}, 400
        )

    try:
        initialize_system()

        with get_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT id FROM clientes WHERE correo = %s", (correo,))
                cliente_existente = cursor.fetchone()

                cursor.execute("SELECT id FROM usuarios WHERE correo = %s", (correo,))
                usuario_existente = cursor.fetchone()

                if cliente_existente or usuario_existente:
                    return json_response(
                        {"ok": False, "message": "El correo ya se encuentra registrado"},
                        409,
                    )

                cursor.execute("SELECT id FROM roles WHERE nombre = 'Comprador' LIMIT 1")
                rol = cursor.fetchone()

                if not rol:
                    return json_response(
                        {
                            "ok": False,
                            "message": "No existe el rol Comprador en la base de datos",
                        },
                        500,
                    )

                cursor.execute(
                    """
                    INSERT INTO clientes (nombre, correo, telefono, direccion)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (nombre_cliente, correo, telefono, direccion),
                )

                cursor.execute(
                    """
                    INSERT INTO usuarios (nombre, correo, password, rol_id)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (
                        nombre_cliente,
                        correo,
                        generate_password_hash(password),
                        rol["id"],
                    ),
                )
            connection.commit()

        return json_response(
            {"ok": True, "message": "Registro exitoso. Ya puedes iniciar sesion."},
            201,
        )
    except Error as exc:
        return json_response({"ok": False, "message": str(exc)}, 500)
