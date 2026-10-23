# PLAN DE PRUEBAS DE SOFTWARE - SISTEMA WEB Y GESTIÓN CALCIFER3D

## 1. INTRODUCCIÓN Y ALCANCE TÉCNICO

El presente documento constituye el Plan de Pruebas de Software para la plataforma web y sistema de gestión empresarial **Calcifer3D**, un aplicativo orientado a la comercialización de insumos y equipos de impresión 3D (FDM y resina SLA), servicio técnico especializado y cotizaciones personalizadas.

El objetivo de este plan es evaluar de forma estructurada si el sistema cumple con las necesidades reales del negocio y los requerimientos establecidos, verificando la consistencia entre el frontend, el backend y la base de datos relacional, más allá de la simple apariencia visual de las interfaces.

**Arquitectura del Sistema:**
- **Backend:** Python con microframework Flask (`backend_python/app.py`, `backend_python/users_roles.py`).
- **Base de Datos:** Motor relacional MySQL en entorno XAMPP (`backend_python/database.py`, `database/calcifer3d.sql`).
- **Frontend:** HTML5 semántico, CSS3 y JavaScript modular (`js/login.js`, `js/registro.js`, `js/admin.js`, `js/auth.js`, `js/content/`, `js/behavior/`).

El alcance comprende la auditoría estática del código existente, la definición de 10 casos de prueba esenciales (uno por cada técnica de testing), la identificación de brechas en los módulos incompletos y la preparación de instrumentos para registrar los resultados en el laboratorio.

---

## 2. ANÁLISIS DE REQUERIMIENTOS DEL SOFTWARE

Se establecen los requerimientos funcionales (RF) y no funcionales (RNF) de Calcifer3D, indicando qué componente se evalúa y qué se espera comprobar:

### 2.1. Requerimientos Funcionales (RF)
- **RF-01 (Inicialización de Base de Datos):** El endpoint `POST /api/setup` debe ejecutar el DDL `calcifer3d.sql`, crear las tablas relacionales e insertar 4 roles y 3 usuarios predeterminados con claves encriptadas.
- **RF-02 (Autenticación y Sesión):** El endpoint `POST /api/auth/login` debe validar credenciales contra MySQL mediante `check_password_hash` y responder HTTP 200 con el objeto de usuario y rol, o HTTP 401 si son incorrectas.
- **RF-03 (Control de Navegación por Rol):** El script `auth.js` debe inspeccionar `localStorage` y redirigir a `login.html` si un usuario no autorizado intenta acceder a paneles privados (`adminPro.html`, `vendedor.html`, etc.).
- **RF-04 (Autorización en Servidor):** Los endpoints administrativos (`/api/usuarios`, `/api/roles`) deben verificar privilegios antes de ejecutar operaciones DML, impidiendo accesos no autorizados directos vía API.
- **RF-05 (Registro de Clientes):** El endpoint `POST /api/clientes/registro` debe validar campos obligatorios, evitar correos duplicados y crear de forma dual el cliente en `clientes` y el usuario en `usuarios` con rol `Comprador`.
- **RF-06 (Gestión de Usuarios y Roles):** El administrador debe poder ejecutar operaciones CRUD sobre usuarios y roles, garantizando el cifrado de contraseñas y bloqueando la eliminación de roles con usuarios asignados.
- **RF-07 (Catálogo de Productos):** El endpoint `GET /api/productos` debe consultar la base de datos y retornar la lista de productos con stock, categoría y precios diferenciados (físico, redes, MercadoLibre).
- **RF-08 (Chatbot Educativo):** La función `botResponse` en `chatbot.html` debe reconocer palabras clave de materiales y servicios, mostrando respuestas útiles al cliente.
- **RF-09 (Módulos de Operaciones):** Evaluar si los paneles de vendedor y contador interactúan con MySQL o si operan como maquetas visuales en memoria.

### 2.2. Requerimientos No Funcionales (RNF)
- **RNF-01 (Seguridad Criptográfica):** Las contraseñas deben almacenarse como hashes irreversibles (Werkzeug PBKDF2/scrypt), nunca en texto plano.
- **RNF-02 (Prevención de Inyección SQL):** Las consultas dinámicas a MySQL deben utilizar tuplas de parámetros (`%s`) en `cursor.execute()`.
- **RNF-03 (Unicidad y Redundancia):** Rechazar duplicados de correo en usuarios y nombres idénticos en roles, evitando condiciones de carrera.
- **RNF-04 (Rendimiento Local):** Tiempos de respuesta de la API local < 300 ms en solicitudes secuenciales y < 800 ms bajo concurrencia moderada.
- **RNF-05 (Diseño Adaptativo):** Interfaces operables en pantallas de escritorio y móviles (375x667 px) mediante menú hamburguesa.
- **RNF-06 (Fiabilidad):** Manejo de excepciones con respuestas JSON consistentes (códigos 400, 401, 404, 409, 500) sin caídas del servidor Flask.

---

## 3. ESTADO REAL DE LAS FUNCIONALIDADES (AUDITORÍA DE CÓDIGO)

Diferenciación objetiva entre el código desarrollado disponible para pruebas y los componentes incompletos:

| Módulo / Funcionalidad | Estado Técnico Real | Evidencia en Código | Brecha / Diagnóstico Técnico |
| :--- | :--- | :--- | :--- |
| **Inicialización BD (`/api/setup`)** | **Código Disponible** | `database.py`, `users_roles.py` | Funcional; genera tablas y usuarios semilla. |
| **Login y Cifrado (`/api/auth/login`)** | **Código Disponible** | `users_roles.py`, `login.js` | Funcional; valida hash y guarda en `localStorage`. |
| **Protección en Cliente (`auth.js`)** | **Código Disponible** | `auth.js` | Redirige por rol en navegador, pero no valida tokens en backend. |
| **CRUD Usuarios y Roles** | **Código Disponible** | `users_roles.py`, `admin.js` | Endpoints DML y tabla interactiva operativos. |
| **Registro de Clientes** | **Parcialmente Integrado** | `registro.js`, `users_roles.py` | **Desacople:** Formulario envía `documento` y `genero`, pero la tabla `clientes` carece de estas columnas y el backend los descarta. |
| **Catálogo de Productos** | **Parcialmente Integrado** | `app.py`, `produtos-content.js` | **Desconexión:** Endpoint backend `GET /api/productos` existe, pero `produtos.html` usa tarjetas HTML estáticas sin `fetch`. |
| **Chatbot Asistente** | **Parcialmente Integrado** | `chatbot.html` | Funciona en memoria del navegador; no consulta base de datos. |
| **Cotización y Sugerencias** | **Parcialmente Integrado** | `index-behavior.js` | Simula envío con `setTimeout`; no persiste en base de datos. |
| **Paneles Vendedor y Contador** | **Pendiente / Maqueta** | `vendedor.js`, `contador.js` | Métricas y tablas calculadas desde arrays en JS o DOM, sin conexión con MySQL. |

---

## 4. ESTRATEGIA DE PRUEBAS APLICADA A CALCIFER3D

Se definen las técnicas de prueba requeridas, asociando cada una a un componente específico de Calcifer3D:

1. **Pruebas de Caja Negra:** Evalúan entradas y salidas de formularios (`login.html`, `registro.html`, `chatbot.html`) mediante partición de equivalencia y valores límite, esperando validaciones claras sin errores no controlados.
2. **Pruebas de Caja Blanca:** Inspeccionan ramas condicionales en `users_roles.py` (ej. bifurcación de actualización con o sin cambio de contraseña, y validación `COUNT(*)` antes de borrar roles).
3. **Pruebas Unitarias:** Verifican en aislamiento expresiones regulares de validación (`registro.js`), funciones de hash (`Werkzeug`) y la lógica de respuestas del chatbot (`botResponse`).
4. **Pruebas de Integración:** Comprueban la comunicación conjunta Frontend (`fetch`) ↔ Backend (Flask) ↔ Base de datos (MySQL), verificando confirmación de transacciones con `commit()`.
5. **Pruebas de Regresión:** Reejecutan la suite base tras aplicar correcciones al código o al esquema SQL para asegurar que no se introduzcan nuevos defectos.
6. **Pruebas de Redundancia y Duplicidad:** Evalúan el rechazo de registros duplicados (correos o nombres de rol repetidos) y la desactivación de botones tras el primer clic (`disabled = true`) para evitar dobles envíos.
7. **Pruebas de Carga y Concurrencia Local:** Evalúan el comportamiento del servidor local ante 50 peticiones secuenciales y 15 peticiones simultáneas sobre `GET /api/productos`, midiendo tiempos de respuesta y cierre de conexiones con `SHOW STATUS LIKE 'Threads_connected';`.
8. **Pruebas de Usabilidad y Compatibilidad:** Comprueban la adaptabilidad visual en pantallas móviles (375x667 px con menú hamburguesa) y compatibilidad entre navegadores (Chrome, Edge, Firefox).
9. **Pruebas de Seguridad y Autorización:** Evalúan la resistencia ante inyección SQL y comprueban si los endpoints de la API permiten acceso directo sin autenticación desde clientes externos.

---

## 5. PLANIFICACIÓN DE INTEGRACIÓN Y CUMPLIMIENTO DEL USUARIO

- **Integración en Dos Etapas:**
  1. *Aislamiento:* Conexión directa a MySQL desde script Python y prueba del endpoint base `/api/health`.
  2. *Flujos Conjuntos:* Flujo de Registro (cliente + usuario en BD), Flujo de Login (validación hash + redirección) y Flujo de Administración (CRUD interactivo).
- **Cumplimiento de Necesidades del Negocio:**
  - *Identidad y Permisos:* Garantizar que un comprador no pueda ver ni operar funciones administrativas.
  - *Trazabilidad de Clientes:* Exigir que los datos de identificación (cédula/NIT) no se pierdan en el guardado.
  - *Integridad Financiera:* Garantizar que los precios del catálogo provengan de la base de datos y no de valores fijos en el frontend.

---

## 6. CRITERIOS DE ACEPTACIÓN, RECHAZO Y ENTORNOS

- **Criterios de Aceptación:** Códigos HTTP esperados (200, 201, 400, 401, 409), respuestas JSON estructuradas con clave `ok`, persistencia comprobada en phpMyAdmin y consola JavaScript libre de errores.
- **Criterios de Rechazo:** Errores HTTP 500 no controlados, datos no guardados en MySQL tras indicar éxito en pantalla, o vulnerabilidades de seguridad abiertas.
- **Entorno de Laboratorio:** Windows 10/11, Python 3.10+ (`Flask==3.1.0`, `mysql-connector-python==9.2.0`), XAMPP (MySQL en puerto 3306), Google Chrome DevTools, phpMyAdmin y Postman/Thunder Client.
- **Procedimiento:** Ciclo de 5 pasos: Preparación del entorno (`/api/setup`) ➔ Ejecución de pruebas y registro ➔ Reporte de defectos en bitácora ➔ Corrección de código ➔ Re-testing y pruebas de regresión.

---

## 7. MATRIZ DE TRAZABILIDAD (REQUERIMIENTO ↔ CASOS DE PRUEBA)

| Requisito Asociado | Tipo de Prueba Aplicada | Caso de Prueba Concreto | Prioridad | Nivel de Riesgo |
| :--- | :--- | :--- | :--- | :--- |
| **RF-01** | Integración / Infraestructura | **CP-01:** Inicialización del Esquema SQL y Usuarios Semilla | Crítica | Alto |
| **RF-02** | Funcional / Autenticación | **CP-02:** Login Exitoso con Credenciales Válidas y Redirección | Crítica | Crítico |
| **RF-02** | Caja Negra / Validación | **CP-03:** Rechazo de Acceso ante Credenciales Inválidas | Alta | Alto |
| **RF-04** | Seguridad / Autorización API | **CP-04:** Verificación de Autorización Directa en Endpoints de la API | Crítica | Crítico |
| **RF-05** | Integración / Persistencia | **CP-05:** Registro Dual de Clientes y Verificación de Pérdida de Datos | Alta | Alto |
| **RNF-03** | Redundancia y Duplicidad | **CP-06:** Control de Duplicados de Correo y Prevención de Doble Clic | Alta | Alto |
| **RF-06** | Caja Blanca / Integridad | **CP-07:** Integridad Referencial al Eliminar Roles con Usuarios | Alta | Medio |
| **RNF-02** | Seguridad / Inyección SQL | **CP-08:** Resistencia ante Inyección SQL en Formulario de Login | Crítica | Crítico |
| **RNF-04** | Carga y Concurrencia Local | **CP-09:** Evaluación de Rendimiento Local y Conexiones en MySQL | Media | Medio |
| **RNF-05** | Usabilidad / Compatibilidad | **CP-10:** Verificación de Diseño Adaptativo y Menú Móvil | Media | Medio |

---

## 8. LOS 10 CASOS DE PRUEBA ESENCIALES DE CALCIFER3D

*(Todos catalogados honestamente como **Planificada / Pendiente de Ejecución** para su aplicación en laboratorio).*

---

### CP-01: Inicialización del Esquema SQL y Usuarios Semilla
- **Tipo:** Integración / Infraestructura | **Requisito:** RF-01 | **Prioridad:** Crítica
- **Módulo:** `database.py`, `app.py` (`POST /api/setup`).
- **Objetivo:** Comprobar que `/api/setup` cree las 13 tablas relacionales e inserte los 4 roles y 3 usuarios iniciales con contraseña encriptada.
- **Datos de Entrada:** Petición HTTP `POST http://127.0.0.1:5000/api/setup`.
- **Pasos:** 1. Iniciar MySQL en XAMPP. 2. Enviar petición POST vía Postman o PowerShell. 3. Verificar respuesta JSON. 4. Inspeccionar tablas en phpMyAdmin.
- **Resultado Esperado:** HTTP `200 OK`, JSON `{"ok": true, ...}`, 13 tablas creadas y usuarios semilla (`admin@calcifer3d.com`, etc.) con contraseñas hasheadas en la tabla `usuarios`.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-02: Login Exitoso con Credenciales Válidas y Redirección
- **Tipo:** Funcional / Autenticación | **Requisito:** RF-02 | **Prioridad:** Crítica
- **Módulo:** `users_roles.py`, `login.js` (`POST /api/auth/login`).
- **Objetivo:** Comprobar que credenciales válidas generen respuesta exitosa, almacenen la sesión en `localStorage` y redirijan al panel del rol.
- **Datos de Entrada:** Correo: `admin@calcifer3d.com`, Contraseña: `Admin1234`.
- **Pasos:** 1. Abrir `login.html`. 2. Diligenciar datos válidos. 3. Enviar formulario. 4. Monitorear pestaña *Network* y *Local Storage* en DevTools.
- **Resultado Esperado:** HTTP `200 OK`, objeto `user` guardado en `localStorage.getItem("calcifer_user")` y redirección inmediata a `adminPro.html`.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-03: Rechazo de Acceso ante Credenciales Inválidas
- **Tipo:** Caja Negra / Validación | **Requisito:** RF-02 | **Prioridad:** Alta
- **Módulo:** `users_roles.py`, `login.js`.
- **Objetivo:** Comprobar que contraseñas incorrectas o correos inexistentes sean denegados sin alterar el almacenamiento local.
- **Datos de Entrada:** Correo: `admin@calcifer3d.com`, Contraseña errónea: `ClaveFalsa999`.
- **Pasos:** 1. En `login.html`, ingresar datos inválidos. 2. Pulsar "Iniciar Sesión". 3. Observar interfaz y respuesta de red.
- **Resultado Esperado:** HTTP `401 Unauthorized`, JSON `{"ok": false, "message": "Credenciales incorrectas"}`, mensaje visual visible en `#loginMessage`, sin almacenar sesión ni redirigir.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-04: Verificación de Autorización Directa en Endpoints de la API
- **Tipo:** Seguridad / Autorización en API | **Requisito:** RF-04 | **Prioridad:** Crítica
- **Módulo:** `users_roles.py` (`/api/usuarios`, `/api/roles`).
- **Objetivo:** Comprobar si los endpoints protegidos validan la identidad en el servidor o si permiten consultar y modificar datos sin credenciales desde clientes externos.
- **Datos de Entrada:** Petición `GET http://127.0.0.1:5000/api/usuarios` enviada desde cURL/Postman sin cabeceras de autorización ni cookies.
- **Pasos:** 1. Ejecutar petición GET directa desde terminal externa. 2. Analizar código de respuesta y cuerpo JSON.
- **Resultado Esperado:** Comprobar si el backend actual responde HTTP `200 OK` entregando la lista de usuarios, lo que confirmaría la necesidad de implementar tokens de autorización en el servidor para evitar accesos no autorizados.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-05: Registro Dual de Clientes y Verificación de Pérdida de Datos
- **Tipo:** Integración / Persistencia | **Requisito:** RF-05 | **Prioridad:** Alta
- **Módulo:** `registro.js`, `users_roles.py`, `calcifer3d.sql`.
- **Objetivo:** Comprobar la creación simultánea en `clientes` y `usuarios`, verificando si los campos de documento y género se guardan o se pierden.
- **Datos de Entrada:** Nombre: `Mariana Ríos`, Documento: `1098765432`, Correo: `mariana.rios@testcalcifer.com`, Clave: `Cliente2026*`.
- **Pasos:** 1. Completar `registro.html`. 2. Enviar formulario. 3. Consultar tablas en phpMyAdmin: `SELECT * FROM clientes WHERE correo = 'mariana.rios@testcalcifer.com';`.
- **Resultado Esperado:** HTTP `201 Created`, usuario creado con rol `Comprador` y clave hasheada. En `clientes` se confirma la brecha técnica: el registro existe pero carece de documento y género por omisión en el esquema SQL.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-06: Control de Duplicados de Correo y Prevención de Doble Clic
- **Tipo:** Redundancia y Duplicidad | **Requisito:** RNF-03 | **Prioridad:** Alta
- **Módulo:** `users_roles.py`, `registro.js`.
- **Objetivo:** Comprobar el bloqueo de correos ya registrados (HTTP 409) y la deshabilitación del botón de envío tras el primer clic.
- **Datos de Entrada:** Envío de formulario con correo existente: `admin@calcifer3d.com` y doble clic rápido en botón.
- **Pasos:** 1. Ingresar correo ya registrado. 2. Hacer doble clic rápido en "Registrarse". 3. Revisar peticiones en DevTools y respuesta.
- **Resultado Esperado:** El botón pasa a `disabled = true` de inmediato; solo sale una petición HTTP; el backend responde HTTP `409 Conflict` con mensaje `"El correo ya esta registrado"`.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-07: Integridad Referencial al Eliminar Roles con Usuarios
- **Tipo:** Caja Blanca / Integridad | **Requisito:** RF-06 | **Prioridad:** Alta
- **Módulo:** `users_roles.py`, `admin.js` (`DELETE /api/roles/<id>`).
- **Objetivo:** Comprobar que la validación condicional `if total_users > 0` bloquee la eliminación de roles que tengan usuarios vinculados.
- **Datos de Entrada:** Petición `DELETE http://127.0.0.1:5000/api/roles/2` (Rol Vendedor, con usuarios asignados).
- **Pasos:** 1. En `adminPro.html`, intentar eliminar rol con usuarios. 2. Confirmar alerta. 3. Capturar respuesta.
- **Resultado Esperado:** HTTP `409 Conflict`, JSON `{"ok": false, "message": "No puedes eliminar un rol asignado a usuarios"}`; el rol permanece intacto en MySQL.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-08: Resistencia ante Inyección SQL en Formulario de Login
- **Tipo:** Seguridad / Inyección SQL | **Requisito:** RNF-02 | **Prioridad:** Crítica
- **Módulo:** `users_roles.py` (`login`).
- **Objetivo:** Comprobar que los parámetros vinculados (`%s`) traten cargas de inyección SQL como cadenas literales inofensivas.
- **Datos de Entrada:** Campo correo: `' OR '1'='1' -- `, Contraseña: `arbitraria`.
- **Pasos:** 1. Ingresar vector de ataque en `login.html`. 2. Enviar formulario. 3. Revisar logs y respuesta.
- **Resultado Esperado:** La consulta busca literalmente esa cadena como correo; no encuentra coincidencia y responde HTTP `401 Unauthorized` sin vulnerar la base de datos.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-09: Evaluación de Rendimiento Local y Conexiones en MySQL
- **Tipo:** Carga y Concurrencia Local | **Requisito:** RNF-04 | **Prioridad:** Media
- **Módulo:** `app.py` (`GET /api/productos`), `database.py`.
- **Objetivo:** Medir tiempos de respuesta y comprobar la liberación de conexiones en MySQL ante ráfagas secuenciales y simultáneas.
- **Datos de Entrada:** 50 peticiones secuenciales y 15 peticiones simultáneas disparadas con script Python o Postman.
- **Pasos:** 1. Ejecutar `SHOW STATUS LIKE 'Threads_connected';` en MySQL. 2. Disparar ráfagas midiendo tiempos. 3. Volver a consultar conexiones activas.
- **Resultado Esperado:** Tiempo promedio local < 300 ms (secuencial) y < 800 ms (concurrente), tasa de fallos 0% en secuencial, y cierre total de conexiones en MySQL al terminar.
- **Estado:** Planificada (Pendiente de Ejecución).

---

### CP-10: Verificación de Diseño Adaptativo y Menú Móvil
- **Tipo:** Usabilidad / Compatibilidad | **Requisito:** RNF-05 | **Prioridad:** Media
- **Módulo:** `css/styles.css`, `index-behavior.js`.
- **Objetivo:** Comprobar la navegación fluida y la apertura del menú hamburguesa en resoluciones móviles.
- **Datos de Entrada:** Emulación en DevTools a 375x667 píxeles (iPhone SE).
- **Pasos:** 1. Abrir `index.html` en emulador móvil. 2. Comprobar ocultamiento de menú horizontal. 3. Pulsar `#menuToggle`. 4. Verificar despliegue.
- **Resultado Esperado:** Menú hamburguesa alterna clase `.active`, enlaces accesibles verticalmente y ausencia de desbordamiento horizontal en pantalla.
- **Estado:** Planificada (Pendiente de Ejecución).

---

## 9. HALLAZGOS DE REVISIÓN ESTÁTICA Y BITÁCORA DE NO CONFORMIDADES

Inconsistencias técnicas detectadas en la inspección de código, registradas formalmente como hallazgos pendientes de comprobación en laboratorio:

| ID | Caso de Comprobación | Módulo | Severidad | Descripción del Hallazgo de Revisión | Acción Correctiva Propuesta |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NC-001** | CP-05 | `registro.js` / `calcifer3d.sql` | **Mayor** | Formulario valida y envía `documento`, `tipoDocumento` y `genero`, pero la tabla `clientes` carece de estas columnas y el backend las descarta silenciosamente. | Agregar columnas `tipo_documento`, `documento` y `genero` a `clientes` en `calcifer3d.sql` y actualizar el `INSERT` en `users_roles.py`. |
| **NC-002** | RF-07 | `produtos.html` / `app.py` | **Moderada** | El endpoint `GET /api/productos` funciona en backend, pero la vista web muestra tarjetas HTML fijas sin invocar `fetch`. | Crear script `produtos.js` que consuma la API y genere las tarjetas de forma dinámica. |
| **NC-003** | RF-09 | `vendedor.js` / `contador.js` | **Mayor** | Paneles operan con arreglos fijos en JavaScript o manipulación de DOM sin persistencia relacional en MySQL. | Construir endpoints REST para ventas e inventario y conectarlos a los formularios. |
| **NC-004** | CP-04 | `users_roles.py` / `auth.js` | **Crítica** | La protección de rutas reside solo en el cliente (`localStorage`). Los endpoints `/api/usuarios` y `/api/roles` no validan tokens ni sesiones en el servidor. | Implementar decorador de autenticación en Flask para validar tokens en cada petición HTTP protegida. |
| **NC-005** | CP-06 | `calcifer3d.sql` | **Moderada** | La tabla `clientes` no posee restricción `UNIQUE` en la columna `correo`, dependiendo únicamente de la validación lógica de Flask. | Agregar `UNIQUE KEY uq_clientes_correo (correo)` en la tabla `clientes`. |

---

## 10. GESTIÓN DE RIESGOS, CRONOGRAMA Y CONCLUSIONES

- **Matriz de Riesgos y Contingencias:**
  - *Fallo en MySQL (puerto 3306 ocupado):* Verificar en panel de XAMPP. `database.py` incluye fallback automático hacia `::1` (IPv6).
  - *Corrupción de datos en pruebas:* Ejecutar `POST /api/setup` para restaurar tablas y usuarios semilla de forma idempotente.
  - *Bloqueo por CORS:* Mitigado globalmente mediante middleware `@app.after_request` en `app.py`.
- **Cronograma de Ejecución (10 Días):**
  - *Días 1-2:* Preparación del entorno y verificación estática.
  - *Días 3-4:* Ejecución de pruebas de backend (CP-01, CP-02, CP-03, CP-04).
  - *Días 5-6:* Ejecución de pruebas de integración e interfaz (CP-05, CP-06, CP-07, CP-10).
  - *Día 7:* Pruebas de seguridad (CP-08) y carga local (CP-09).
  - *Días 8-9:* Corrección de defectos reportados y re-testing de regresión.
  - *Día 10:* Consolidación de evidencias y cierre del informe.
- **Conclusión Técnica:** El plan de pruebas establece una evaluación equilibrada, objetiva y rigurosa sobre los componentes reales de Calcifer3D. Con 10 casos de prueba representativos y una bitácora técnica de hallazgos, el equipo dispone de un instrumento concreto y defendible ante los instructores del SENA para demostrar el aseguramiento de la calidad del software.
