# Backend Python para Calcifer3D

Este backend usa Flask y se conecta a MySQL de XAMPP.

## Incluye

- `backend_python/app.py`: servidor Flask principal, productos y paginas del frontend.
- `backend_python/database.py`: conexion a MySQL e inicializacion del esquema SQL.
- `backend_python/users_roles.py`: modulo separado de usuarios, roles, login y registro.
- `backend_python/requirements.txt`: dependencias.
- `database/calcifer3d.sql`: esquema completo de la base de datos.

## Endpoints

- `GET /api/health`
- `POST /api/setup`
- `GET /api/productos`
- `POST /api/auth/login`
- `GET /api/usuarios`
- `GET /api/roles`
- `POST /api/roles`
- `PUT /api/roles/<id>`
- `DELETE /api/roles/<id>`
- `POST /api/clientes/registro`

## Instalacion

1. Inicia `MySQL` desde XAMPP.
2. Instala Python desde `python.org` si Windows no lo tiene funcionando bien.
3. Crea un entorno virtual:

```powershell
py -m venv .venv
```

4. Activalo:

```powershell
.\.venv\Scripts\Activate.ps1
```

5. Instala dependencias:

```powershell
pip install -r backend_python/requirements.txt
```

## Ejecucion

1. Ejecuta la API:

```powershell
py backend_python/app.py
```

2. Inicializa la base una sola vez:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:5000/api/setup
```

3. Prueba el registro desde `registro.html`.

## Usuarios iniciales

Al ejecutar `POST /api/setup`, el sistema crea estos usuarios por defecto:

- `admin@calcifer3d.com` / `Admin1234`
- `vendedor@calcifer3d.com` / `Vendedor1234`
- `contador@calcifer3d.com` / `Contador1234`

## Variables opcionales

Por defecto queda listo para XAMPP:

- `MYSQL_HOST=127.0.0.1`
- `MYSQL_PORT=3306`
- `MYSQL_USER=root`
- `MYSQL_PASSWORD=`
- `MYSQL_DATABASE=calcifer3d`

## Nota

El formulario actual recoge datos como `documento`, `tipoDocumento` y `genero`, pero esas columnas todavia no existen en la base que definiste.
Por ahora el backend guarda:

- cliente en `clientes`
- acceso en `usuarios`
- rol `Comprador`
