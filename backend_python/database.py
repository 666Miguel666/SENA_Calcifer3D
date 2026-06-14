from __future__ import annotations

import os
from pathlib import Path

import mysql.connector
from mysql.connector import Error


BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
SQL_SCHEMA_PATH = PROJECT_DIR / "database" / "calcifer3d.sql"


def get_db_config(include_database: bool = True) -> dict[str, object]:
    config: dict[str, object] = {
        "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
        "port": int(os.getenv("MYSQL_PORT", "3306")),
        "user": os.getenv("MYSQL_USER", "root"),
        "password": os.getenv("MYSQL_PASSWORD", ""),
        "connection_timeout": int(os.getenv("MYSQL_TIMEOUT", "5")),
    }
    if include_database:
        config["database"] = os.getenv("MYSQL_DATABASE", "calcifer3d")
    return config


def get_connection(include_database: bool = True):
    config = get_db_config(include_database=include_database)

    try:
        return mysql.connector.connect(**config)
    except Error:
        if config.get("host") not in {"127.0.0.1", "localhost"}:
            raise

        fallback_config = dict(config)
        fallback_config["host"] = "::1"
        return mysql.connector.connect(**fallback_config)


def database_is_initialized() -> bool:
    database_name = str(get_db_config(include_database=True)["database"])

    with get_connection(include_database=False) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*)
                FROM information_schema.tables
                WHERE table_schema = %s AND table_name = 'usuarios'
                """,
                (database_name,),
            )
            return cursor.fetchone()[0] > 0


def bootstrap_database() -> None:
    if not SQL_SCHEMA_PATH.exists():
        raise FileNotFoundError(f"No se encontro el archivo SQL: {SQL_SCHEMA_PATH}")

    if database_is_initialized():
        return

    with get_connection(include_database=False) as connection:
        with connection.cursor() as cursor:
            sql_script = SQL_SCHEMA_PATH.read_text(encoding="utf-8")
            statements = [
                statement.strip()
                for statement in sql_script.split(";")
                if statement.strip()
            ]
            for statement in statements:
                cursor.execute(statement)
        connection.commit()
