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

## Modulo de inventario

El sistema Calcifer3D cuenta con un modulo de inventario que permite administrar los productos registrados en la base de datos MySQL. Su interfaz permite realizar operaciones de consulta, creacion, edicion y eliminacion de productos, ademas de gestionar sus categorias y consultar la informacion detallada de cada producto.

### Funcionalidades principales

- **Consulta de productos:** muestra los productos registrados en la base de datos.
- **Registro de productos:** permite agregar nuevos productos al inventario.
- **Edicion de productos:** permite modificar la informacion de los productos existentes.
- **Eliminacion de productos:** permite retirar productos del inventario.
- **Busqueda y filtros:** facilita la localizacion de productos mediante las herramientas de busqueda y filtros disponibles.
- **Gestion de categorias:** permite crear, consultar, modificar y eliminar categorias.
- **Detalle de producto:** permite consultar la informacion completa de un producto desde la tabla del inventario.
- **Carga de imagenes:** permite adjuntar fotografias a los productos y almacenarlas en el servidor.

### Informacion de los productos

El inventario administra informacion como:

- Identificador del producto.
- Nombre.
- Marca.
- Color.
- Categoria.
- Descripcion.
- Cantidad disponible.
- Ubicacion fisica.
- Precio de compra.
- Precio de venta fisica.
- Precio para redes sociales.
- Precio de venta en Mercado Libre.
- Fotografia del producto.

Los precios permiten diferenciar los valores de comercializacion segun el canal de venta.

### Gestion de imagenes

Las imagenes cargadas desde el formulario de productos se almacenan en:

```text
backend_python/static/uploads/productos/
```

La ruta de cada imagen se guarda en el registro del producto en la base de datos. Esto permite recuperar y mostrar la fotografia cuando se consulta el inventario o se abre el detalle de un producto.

El sistema cuenta con gestion automatizada de archivos de imagen:

- **Registro:** guarda la fotografia seleccionada al crear un producto.
- **Edicion:** conserva la fotografia existente cuando no se selecciona una nueva.
- **Reemplazo:** cuando se carga una fotografia nueva, actualiza la ruta en MySQL y elimina la fotografia anterior si ningun otro producto la utiliza.
- **Eliminacion:** cuando se elimina un producto, tambien elimina su fotografia del servidor si ningun otro producto la utiliza.
- **Proteccion de archivos:** antes de eliminar una fotografia, el backend verifica que no este asociada a otro producto y que pertenezca a la carpeta de imagenes del inventario.

Estas operaciones evitan la acumulacion innecesaria de archivos de imagen que ya no estan asociados a productos.

Las fotografias deben conservarse en esta carpeta para que puedan visualizarse correctamente al ejecutar el proyecto en otro equipo.

### Gestion de categorias

El inventario incluye una herramienta para administrar las categorias de los productos.

Permite:

- Crear categorias.
- Consultar las categorias registradas.
- Modificar el nombre de una categoria.
- Consultar los productos asociados a una categoria.
- Eliminar categorias.

Antes de eliminar una categoria, el sistema consulta los productos que estan asociados y los muestra en una ventana de confirmacion.

La eliminacion utiliza la relacion de la base de datos con la regla `ON DELETE SET NULL`. Por esta razon, cuando se elimina una categoria, los productos relacionados no se eliminan: simplemente quedan sin categoria asignada.

### Consulta del detalle de producto

Al seleccionar una fila de la tabla del inventario se abre una ventana con la informacion ampliada del producto.

Esta ventana permite consultar:

- Fotografia ampliada.
- Nombre, marca y color.
- Categoria y descripcion.
- Cantidad disponible y ubicacion.
- Estado del producto.
- Precios de compra y venta por canal.

Desde esta ventana tambien se puede acceder a la opcion de edicion del producto.

### Endpoints del inventario

Los siguientes endpoints permiten consultar y administrar los recursos del inventario:

**Productos**

- `GET /api/productos`: consulta los productos registrados.
- `POST /api/productos`: registra un producto.
- `PUT /api/productos/<id>`: actualiza un producto.
- `DELETE /api/productos/<id>`: elimina un producto.

**Categorias**

- `GET /api/categorias`: consulta las categorias.
- `POST /api/categorias`: registra una categoria.
- `PUT /api/categorias/<id>`: actualiza una categoria.
- `DELETE /api/categorias/<id>`: elimina una categoria.
- `GET /api/categorias/<id>/productos`: consulta los productos asociados a una categoria.

**Proveedores**

- `GET /api/proveedores`: consulta los proveedores registrados.

### Archivos relacionados

Los principales archivos que intervienen en el modulo son:

- `backend_python/app.py`: contiene las rutas y la logica del backend para la gestion del inventario.
- `backend_python/database.py`: gestiona la conexion con MySQL.
- `js/admin.js`: contiene la logica de interaccion con el inventario, consultas a la API, operaciones CRUD y ventanas modales.
- `js/content/adminPro-content.js`: contiene la estructura HTML de la interfaz del administrador y sus ventanas modales.
- `css/styles_admin.css`: contiene los estilos visuales del panel administrativo y del inventario.
- `backend_python/static/uploads/productos/`: almacena las fotografias de los productos.

### Prueba del modulo

Para probar el inventario:

1. Inicia MySQL desde XAMPP.
2. Abre una terminal en la carpeta raiz del proyecto.
3. Activa el entorno virtual.
4. Ejecuta el servidor Flask:

```powershell
py backend_python/app.py
```

5. Accede al panel administrativo desde el frontend.
6. Abre el modulo de inventario.
7. Prueba las operaciones de consulta, registro, edicion y eliminacion de productos.
8. Prueba la creacion y administracion de categorias.
9. Selecciona un producto de la tabla para consultar su detalle.

**Importante:** las operaciones del inventario trabajan con la base de datos MySQL. Las fotografias se almacenan en el servidor dentro de la carpeta de archivos estaticos.