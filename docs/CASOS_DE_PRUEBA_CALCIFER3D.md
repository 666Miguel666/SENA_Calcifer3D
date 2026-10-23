# Documento de casos de prueba de software

**Actividad:** GA9-220501096-AA2-EV01 — Diseña casos y define el ambiente de pruebas de software según proyecto.  
**Proyecto:** Plataforma Web y Gestión Empresarial Calcifer3D  

---

## 1. Información del proyecto

- **Versión:** 1.0.0
- **Fecha de Inicio de Pruebas:** 17/03/2026
- **Fecha de Fin de Pruebas:** 24/03/2026
- **Líder de Pruebas:** [Nombre del Aprendiz]
- **Ficha:** [Número de Ficha]
- **Programa de Formación:** Análisis y Desarrollo de Software - ADSO
- **Centro:** Centro de Comercio y Servicios / Regional [Completar Regional]

---

## 2. Ambiente de prueba

| Componente | Especificación | Observaciones |
|---|---|---|
| **Tipo de Aplicación** | Web Responsive (Arquitectura Cliente-Servidor) | Interfaces públicas y paneles de administración por roles |
| **Sistemas Operativos** | Windows 10 / Windows 11 Pro (64 bits) | Entorno principal de desarrollo y ejecución de pruebas |
| **Navegadores** | Google Chrome v120+, Microsoft Edge v120+, Firefox v122+ | Pruebas de renderizado, compatibilidad CSS y consola JS |
| **Servidor Web / Backend** | Python 3.10+ con Flask 3.1.0 (Puerto 5000) | Servidor de desarrollo Werkzeug con middleware CORS |
| **Base de Datos** | MySQL 8.0 / MariaDB vía XAMPP (Puerto 3306) | Base de datos relacional `calcifer3d` con 13 tablas |
| **Lenguaje / Framework** | Python (Flask, mysql-connector-python 9.2.0, Werkzeug) | Backend REST API y encriptación con contraseñas hash |
| **Frontend** | HTML5 semántico, CSS3 Vanilla, JavaScript Modular | Vistas renderizadas dinámicamente mediante scripts de contenido |
| **Hardware Mínimo** | Intel Core i3 / AMD Ryzen 3, 8 GB RAM, SSD 256 GB | Estación de trabajo para servidor local y navegador |
| **Red** | Red Local / Hostname `127.0.0.1` (localhost) | Comunicación cliente-servidor en el mismo equipo |
| **Herramientas de Prueba** | Chrome DevTools, Postman v11 / Thunder Client, phpMyAdmin | Inspección de red, ejecución de API y verificación de BD |
| **Control de Versiones** | Git + GitHub | Rama de trabajo: `cambios-chatbot` |

---

## 3. Casos de prueba

### Caso 001 — Inicialización del esquema SQL y usuarios semilla

- **Tipo de Prueba:** Integración
- **Descripción del Caso de Prueba:** Ejecutar el endpoint `/api/setup` y verificar la creación completa de las 13 tablas relacionales en MySQL, junto con la inserción de los 4 roles base y los 3 usuarios predeterminados con contraseña encriptada.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP 3306), i5/8GB
- **Herramienta:** Postman + phpMyAdmin
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 17/03/2026
- **Salida Esperada:** Código HTTP 200 OK, JSON con confirmación y creación de las 13 tablas en MySQL con 3 usuarios iniciales hasheados.
- **Salida Obtenida:** Base de datos inicializada correctamente; se crearon las tablas relacionales y los usuarios semilla con contraseñas encriptadas.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `setup_exitoso_001.png`

---

### Caso 002 — Login con credenciales válidas y redirección por rol

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Ingresar al sistema con correo y contraseña válidos (`admin@calcifer3d.com` / `Admin1234`), comprobando la validación del hash en Flask, el almacenamiento de sesión en `localStorage` y la redirección al panel `adminPro.html`.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Chrome DevTools
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 17/03/2026
- **Salida Esperada:** HTTP 200 OK, almacenamiento del objeto `user` en `localStorage` y redirección inmediata a `adminPro.html`.
- **Salida Obtenida:** Autenticación exitosa, credenciales validadas contra la BD y redirección correcta según el rol del usuario.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `login_exitoso_002.png`

---

### Caso 003 — Login con credenciales incorrectas y mensaje de rechazo

- **Tipo de Prueba:** Caja Negra
- **Descripción del Caso de Prueba:** Intentar iniciar sesión con contraseña errónea o correo no registrado, verificando que el backend retorne HTTP 401 y que la interfaz presente un mensaje claro sin alterar la sesión local.
- **Ambiente / Entorno:** Windows 11, Edge 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Chrome DevTools
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 18/03/2026
- **Salida Esperada:** HTTP 401 Unauthorized, mensaje visual *"Credenciales incorrectas"*, sin almacenar datos en `localStorage` ni permitir el ingreso.
- **Salida Obtenida:** El sistema denegó el acceso con código 401 y mostró el mensaje de error en pantalla sin redirigir.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `login_invalido_003.png`

---

### Caso 004 — Verificación de autorización directa en endpoints de la API

- **Tipo de Prueba:** Seguridad
- **Descripción del Caso de Prueba:** Realizar solicitudes directas HTTP GET y POST a `/api/usuarios` y `/api/roles` desde un cliente externo (Postman o cURL) sin enviar cookies, tokens de sesión ni cabeceras de autorización.
- **Ambiente / Entorno:** Windows 11, Postman v11, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Postman
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 18/03/2026
- **Salida Esperada:** El backend debe rechazar la solicitud con HTTP 401 o 403 al no detectar un token o sesión válida en el servidor.
- **Salida Obtenida:** El backend respondió HTTP 200 OK entregando la lista de usuarios, ya que los endpoints no validan autorización en el servidor.
- **Resultado:** En seguimiento
- **Seguimiento:** DEF-004
- **Severidad:** Alta
- **Evidencia:** Captura: `acceso_api_sin_token_004.png`

---

### Caso 005 — Registro dual de clientes y verificación de pérdida de datos

- **Tipo de Prueba:** Integración
- **Descripción del Caso de Prueba:** Registrar un cliente desde `registro.html` y verificar si el registro se inserta simultáneamente en `clientes` y `usuarios`, comprobando si los campos `documento`, `tipoDocumento` y `genero` se almacenan en MySQL.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Chrome DevTools + phpMyAdmin
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 19/03/2026
- **Salida Esperada:** Registro exitoso (HTTP 201) con creación de cuenta y persistencia de todos los campos ingresados en el formulario.
- **Salida Obtenida:** Se crearon los registros en `clientes` y `usuarios`, pero la tabla `clientes` carece de columnas para documento y género, perdiéndose estos datos.
- **Resultado:** Rechazado
- **Seguimiento:** DEF-005
- **Severidad:** Alta
- **Evidencia:** Captura: `registro_cliente_brecha_005.png`

---

### Caso 006 — Control de duplicados de correo y prevención de doble clic

- **Tipo de Prueba:** Redundancia
- **Descripción del Caso de Prueba:** Intentar registrar un usuario con un correo ya existente (`admin@calcifer3d.com`) y verificar el bloqueo con HTTP 409, además de comprobar que el botón de envío se deshabilite tras el primer clic.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Chrome DevTools
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 19/03/2026
- **Salida Esperada:** Botón deshabilitado al hacer clic (`disabled = true`) y respuesta HTTP 409 Conflict con mensaje *"El correo ya esta registrado"*.
- **Salida Obtenida:** El botón se deshabilitó oportunamente y el backend bloqueó el correo duplicado retornando código 409.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `bloqueo_duplicado_006.png`

---

### Caso 007 — Integridad referencial al eliminar roles con usuarios

- **Tipo de Prueba:** Caja Blanca
- **Descripción del Caso de Prueba:** Intentar eliminar un rol desde el panel de administración (`DELETE /api/roles/2`) que tenga usuarios asociados, verificando que la lógica condicional en Flask impida la operación.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Postman + Chrome DevTools
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 20/03/2026
- **Salida Esperada:** HTTP 409 Conflict con mensaje *"No puedes eliminar un rol asignado a usuarios"*, conservando el registro en MySQL.
- **Salida Obtenida:** El sistema ejecutó el conteo de usuarios vinculados, bloqueó la eliminación y respondió con código 409.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `integridad_roles_007.png`

---

### Caso 008 — Resistencia ante inyección SQL en formulario de login

- **Tipo de Prueba:** Seguridad
- **Descripción del Caso de Prueba:** Ingresar cargas de inyección SQL (`' OR '1'='1' --`) en el campo de correo del login para comprobar si las consultas parametrizadas de MySQL neutralizan el ataque.
- **Ambiente / Entorno:** Windows 11, Chrome 122, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Chrome DevTools + Postman
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 20/03/2026
- **Salida Esperada:** El backend trata la entrada como una cadena literal inofensiva y deniega el acceso con HTTP 401 Unauthorized sin revelar errores SQL.
- **Salida Obtenida:** La inyección fue tratada como texto literal y el sistema respondió con código 401 sin vulnerar la base de datos.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `inyeccion_sql_bloqueada_008.png`

---

### Caso 009 — Evaluación de rendimiento local y conexiones en MySQL

- **Tipo de Prueba:** Rendimiento
- **Descripción del Caso de Prueba:** Enviar una ráfaga secuencial de 50 peticiones y 15 peticiones simultáneas al endpoint `GET /api/productos`, midiendo tiempos de respuesta (< 300 ms) y verificando el cierre de conexiones en MySQL con `SHOW STATUS LIKE 'Threads_connected'`.
- **Ambiente / Entorno:** Windows 11, Postman Runner / Python Script, Flask 3.1.0, MySQL (XAMPP), i5/8GB
- **Herramienta:** Python Script + phpMyAdmin
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 21/03/2026
- **Salida Esperada:** Tiempo promedio < 300 ms en secuencial, tasa de error 0% y liberación completa de conexiones activas en MySQL al finalizar.
- **Salida Obtenida:** Tiempo promedio: 145 ms en secuencial y 410 ms en concurrente. Tasa de error: 0%. Las conexiones en MySQL se cerraron correctamente.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `reporte_carga_local_009.png`

---

### Caso 010 — Verificación de diseño adaptativo y menú móvil

- **Tipo de Prueba:** Usabilidad
- **Descripción del Caso de Prueba:** Emular resolución móvil de 375x667 px (iPhone SE) en Chrome DevTools, comprobando el ocultamiento del menú horizontal y el despliegue interactivo mediante el botón hamburguesa (`#menuToggle`).
- **Ambiente / Entorno:** Windows 11, Chrome 122 (Device Toolbar), Flask 3.1.0, i5/8GB
- **Herramienta:** Chrome DevTools
- **Autor del Caso:** [Nombre del Aprendiz]
- **Fecha de Revisión:** 21/03/2026
- **Salida Esperada:** Menú hamburguesa visible, apertura fluida de la navegación vertical al hacer clic y ausencia de desbordamiento horizontal en pantalla.
- **Salida Obtenida:** La interfaz se adaptó correctamente a la resolución móvil y el menú respondió a los eventos de clic sin desbordamiento.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: `menu_movil_responsive_010.png`

---

## 4. Seguimiento de defectos

| Código | Caso asociado | Descripción del defecto | Severidad | Responsable | Estado | Fecha asignación | Fecha resolución |
|---|---|---|---|---|---|---|---|
| **DEF-004** | #004 | Endpoints de la API (`/api/usuarios`, `/api/roles`) no validan autenticación ni sesión en el servidor, permitiendo acceso directo | Alta | Equipo Backend | En proceso | 18/03/2026 |  |
| **DEF-005** | #005 | La tabla `clientes` en MySQL carece de columnas para documento y género, perdiéndose estos datos durante el registro | Alta | Equipo Base de Datos | Pendiente | 19/03/2026 |  |
| **DEF-011** | N/A | Vista de catálogo (`produtos.html`) utiliza tarjetas estáticas en HTML y no consume el endpoint `GET /api/productos` | Media | Equipo Frontend | Pendiente | 20/03/2026 |  |
| **DEF-012** | N/A | Paneles de vendedor y contador operan con datos fijos en memoria JavaScript sin persistencia en MySQL | Alta | Equipo Fullstack | Pendiente | 21/03/2026 |  |

---

## 5. Resumen de resultados

- **Total de casos de prueba:** 10
- **Aprobados:** 8
- **En seguimiento:** 1
- **Rechazados:** 1
- **Severidad Alta:** 2
- **Severidad Media:** 1
- **Severidad Baja:** 0
- **% Aprobación:** 80.0%
- **Defectos abiertos:** 4

---

## 6. Aprobación

- **Nombre del analista / líder de pruebas:** [Nombre del Aprendiz]
- **Firma:** __________________________________
- **Fecha:** [DD/MM/AAAA]
