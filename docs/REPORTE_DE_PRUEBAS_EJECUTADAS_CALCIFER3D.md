# REPORTE DE PLAN DE PRUEBAS EJECUTADAS
**Evidencia:** GA9-220501096-AA3-EV02  
**Programa de Formación:** Análisis y Desarrollo de Software (ADSO) — SENA  
**Proyecto:** Plataforma Web y Gestión Empresarial Calcifer3D  

---

## 1. PORTADA

| Campo | Detalle Institucional |
| :--- | :--- |
| **Programa de Formación** | Análisis y Desarrollo de Software (ADSO) |
| **Número de Ficha** | [Número de Ficha] |
| **Nombre del Aprendiz** | [Nombre del Aprendiz] |
| **Nombre del Instructor** | [Nombre del Instructor] |
| **Evidencia** | GA9-220501096-AA3-EV02 — Reporte de plan de pruebas ejecutadas |
| **Centro de Formación** | Centro de Comercio y Servicios / Regional [Completar Regional] |
| **Fecha de Presentación** | 24 de marzo de 2026 |

---

## 2. INTRODUCCIÓN

El presente documento consolida el **Reporte de Ejecución del Plan de Pruebas** aplicado al software **Calcifer3D**, un sistema web y plataforma de gestión comercial para servicios de manufactura aditiva (impresión 3D FDM/resina SLA), venta de filamentos, repuestos e insumos técnicos.

A través de este informe se recopilan, analizan y estructuran los resultados obtenidos durante la fase de aseguramiento de calidad del software (QA), contrastando el comportamiento real de los módulos contra los requerimientos funcionales y no funcionales especificados en el diseño inicial. El objetivo primordial es documentar el desempeño del aplicativo, auditar la seguridad y coherencia en el flujo de datos entre el Frontend, el Backend en Flask y la base de datos relacional MySQL, cuantificar la tasa de éxito de las pruebas e identificar con rigor técnico las incidencias y acciones de mejora necesarias antes del despliegue final.

---

## 3. OBJETIVOS

### 3.1. Objetivo General
Evaluar y certificar el comportamiento operativo, la robustez de seguridad y la integridad relacional del aplicativo **Calcifer3D** mediante la ejecución sistemática de un conjunto de casos de prueba, garantizando que el producto de software cumpla con los estándares de calidad definidos por la formación SENA.

### 3.2. Objetivos Específicos
1. **Validar el cumplimiento de los requerimientos funcionales (RF):** Comprobar que los flujos de inicialización, autenticación, control de accesos, registro y administración respondan de acuerdo a las reglas de negocio.
2. **Auditar la seguridad y requerimientos no funcionales (RNF):** Verificar la resistencia del sistema frente a inyecciones SQL, el hashing seguro de contraseñas, la prevención de colisiones por duplicidad y los tiempos de respuesta del servidor local.
3. **Detectar y registrar incidencias (Defectos/Bugs):** Tipificar las brechas entre la interfaz de usuario, los endpoints de la API REST y las estructuras de tablas en la base de datos MySQL.
4. **Construir la matriz de trazabilidad:** Relacionar cada requerimiento con su correspondiente caso de prueba y resultado obtenido para asegurar la cobertura técnica del sistema.
5. **Establecer un plan de acciones correctivas:** Definir la ruta de solución y refactorización técnica para mitigar las vulnerabilidades e inconsistencias detectadas.

---

## 4. ALCANCE DEL PLAN DE PRUEBAS

El ciclo de pruebas ejecutado cubrió los componentes clave de la arquitectura Cliente-Servidor de **Calcifer3D**, focalizándose en:

* **Módulo de Infraestructura y Datos:** Endpoint de inicialización DDL (`POST /api/setup`), creación de 13 tablas relacionales en MySQL e inserción de registros semilla (roles y usuarios iniciales).
* **Módulo de Autenticación y Sesión:** Validación de credenciales en `POST /api/auth/login`, comparación de hashes criptográficos con PBKDF2/scrypt, persistencia de sesión en `localStorage` y redirección perimetral según rol.
* **Módulo de Seguridad Perimetral y API:** Auditoría de cabeceras de autorización en endpoints críticos de administración (`/api/usuarios`, `/api/roles`) y protección contra ataques de inyección SQL en formularios de entrada.
* **Módulo de Registro de Clientes:** Verificación del flujo de captura en formulario público (`registro.html`), envío asíncrono con `fetch` y correspondencia de persistencia dual en tablas `clientes` y `usuarios`.
* **Módulo de Catálogo y Rendimiento Local:** Medición de latencia de red en solicitudes locales (`GET /api/productos`) y monitoreo de conexiones activas en el motor de base de datos MySQL.
* **Módulo de Experiencia de Usuario (UI/UX Adaptativo):** Evaluación de la interfaz responsiva bajo resoluciones móviles estándar (375x667 px) y operatividad del menú colapsable (hamburguesa).

---

## 5. DESCRIPCIÓN DE LAS PRUEBAS EJECUTADAS

Para garantizar una cobertura integral, se aplicaron 10 técnicas especializadas de evaluación de software:

1. **Pruebas de Integración:** Verificación de la comunicación efectiva entre scripts de interfaz, servidor Flask y motor relacional MySQL.
2. **Pruebas Funcionales:** Evaluación del comportamiento de la interfaz frente a flujos exitosos definidos por el usuario.
3. **Pruebas de Caja Negra:** Validación de entradas inválidas sin conocimiento interno del código, evaluando el feedback entregado al usuario final.
4. **Pruebas de Seguridad:** Inspección de autorización directa a nivel de endpoints y neutralización de cargas maliciosas (SQL Injection).
5. **Pruebas de Redundancia y Concurrencia:** Verificación del control de datos duplicados y deshabilitación de componentes para evitar dobles peticiones.
6. **Pruebas de Caja Blanca:** Auditoría a la lógica interna condicional del backend Flask, validando reglas de integridad referencial.
7. **Pruebas de Rendimiento:** Medición de latencia y tiempos de respuesta bajo ráfagas de solicitudes concurrentes y secuenciales.
8. **Pruebas de Usabilidad / Responsividad:** Validación ergonómica de la interfaz gráfica en dispositivos de pantalla reducida.

---

## 6. RESULTADOS DETALLADOS DE LAS PRUEBAS

A continuación se resume la ejecución individual de los casos de prueba diseñados para la plataforma:

| ID Caso | Nombre / Técnica | Componente Evaluado | Resultado | Observación Técnica |
| :---: | :--- | :--- | :---: | :--- |
| **CP-001** | Inicialización SQL y Semilla *(Integración)* | `POST /api/setup` $\to$ MySQL | **Exitoso** | Creación completa de las 13 tablas relacionales y carga de 4 roles y 3 usuarios predeterminados con claves cifradas. |
| **CP-002** | Login Válido y Redirección *(Funcional)* | `login.html` $\to$ `/api/auth/login` | **Exitoso** | Autenticación correcta con HTTP 200 OK, almacenamiento del perfil en `localStorage` y redirección inmediata a `adminPro.html`. |
| **CP-003** | Login con Credenciales Erróneas *(Caja Negra)* | `login.html` $\to$ `/api/auth/login` | **Exitoso** | Rechazo con HTTP 401 Unauthorized, mensaje visual *"Credenciales incorrectas"* y retención del estado de seguridad. |
| **CP-004** | Autorización en Servidor *(Seguridad)* | `/api/usuarios`, `/api/roles` | **Fallido / En seguimiento** | **Vulnerabilidad detectada:** El backend entrega la lista de usuarios vía GET sin validar token de sesión o rol en el servidor. |
| **CP-005** | Registro Dual de Clientes *(Integración)* | `registro.html` $\to$ `/api/clientes/registro` | **Fallido / Rechazado** | **Desacople detectado:** Se crea el registro pero los campos `documento` y `genero` se descartan por ausencia de columnas en la tabla `clientes`. |
| **CP-006** | Control de Duplicados de Correo *(Redundancia)* | Formulario de Registro $\to$ BD | **Exitoso** | Respuesta HTTP 409 Conflict ante correos repetidos y bloqueo oportuno del botón (`disabled = true`) para evitar doble clic. |
| **CP-007** | Integridad Referencial de Roles *(Caja Blanca)* | `DELETE /api/roles/2` | **Exitoso** | El backend cuenta usuarios asociados y bloquea la eliminación retornando HTTP 409 con mensaje explicativo. |
| **CP-008** | Inyección SQL en Formulario *(Seguridad)* | Input Correo $\to$ Login | **Exitoso** | La carga maliciosa `' OR '1'='1' --` fue neutralizada al emplear consultas SQL preparadas (`%s`), retornando 401 sin vulnerar la BD. |
| **CP-009** | Rendimiento y Conexiones MySQL *(Rendimiento)* | `GET /api/productos` | **Exitoso** | Latencia promedio de 145 ms (secuencial) y 410 ms (concurrente). Liberación total de conexiones en MySQL (`Threads_connected`). |
| **CP-010** | Diseño Adaptativo y Menú Móvil *(Usabilidad)* | Vista responsiva (375x667 px) | **Exitoso** | Adaptación correcta de la botonera a menú hamburguesa, sin desbordamiento horizontal y transiciones fluidas. |

---

## 7. RESULTADOS CONSOLIDADOS Y MÉTRICAS DE CALIDAD

La ejecución de las pruebas sobre la versión candidata 1.0.0 de **Calcifer3D** arrojó las siguientes métricas de evaluación:

* **Total de Casos de Prueba Ejecutados:** 10
* **Pruebas Exitosas (Aprobadas):** 8
* **Pruebas en Seguimiento (Observaciones de Seguridad):** 1
* **Pruebas Fallidas / Rechazadas (Defectos Funcionales):** 1
* **Porcentaje de Aprobación General:** **80.0%**
* **Total de Incidencias / Defectos Abiertos:** 4 (2 detectados en casos directos + 2 en auditoría perimetral)

### Distribución Porcentual de Resultados
```
[ Aprobados: 80% ] ████████████████████████████████
[ En Seguimiento: 10% ] ████
[ Rechazados: 10% ] ████
```

El **80% de efectividad** demuestra que el núcleo transaccional, criptográfico y de base de datos se encuentra estable. Sin embargo, el **20% de casos con observaciones críticas** exige acciones correctivas de acoplamiento de esquema y autorización en backend antes de la puesta en producción.

---

## 8. MATRIZ DE TRAZABILIDAD (REQUISITOS VS. PRUEBAS)

La matriz de trazabilidad garantiza que cada requerimiento funcional (RF) y no funcional (RNF) del sistema se encuentre validado empíricamente por al menos un caso de prueba:

| Requisito | Descripción del Requerimiento | Caso Asociado | Técnica Aplicada | Resultado | Estado del Requisito |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **RF-01** | Inicialización automática de BD y usuarios semilla | CP-001 | Integración | Exitoso | **Conforme** |
| **RF-02** | Autenticación con credenciales y enrutamiento por rol | CP-002, CP-003 | Funcional / Caja Negra | Exitoso | **Conforme** |
| **RF-04** | Protección y autorización de endpoints administrativos | CP-004 | Seguridad | Fallido | **No Conforme (En remediación)** |
| **RF-05** | Registro dual completo de clientes y persistencia | CP-005 | Integración | Fallido | **No Conforme (En remediación)** |
| **RF-06** | Control de eliminación e integridad en roles | CP-007 | Caja Blanca | Exitoso | **Conforme** |
| **RNF-01** | Almacenamiento seguro de contraseñas con hash | CP-001, CP-002 | Seguridad Criptográfica | Exitoso | **Conforme** |
| **RNF-02** | Neutralización de ataques de inyección SQL | CP-008 | Seguridad | Exitoso | **Conforme** |
| **RNF-03** | Unicidad de credenciales y prevención de colisiones | CP-006 | Redundancia | Exitoso | **Conforme** |
| **RNF-04** | Rendimiento y liberación de conexiones en servidor local | CP-009 | Rendimiento | Exitoso | **Conforme** |
| **RNF-05** | Adaptabilidad responsiva en pantallas móviles | CP-010 | Usabilidad | Exitoso | **Conforme** |

---

## 9. INCIDENCIAS DETECTADAS (REGISTRO DE DEFECTOS / BUGS)

Durante el proceso de pruebas y auditoría técnica de código se aislaron las siguientes 4 incidencias:

### BUG-001 (DEF-004): Ausencia de Verificación de Sesión en Endpoints Administrativos
* **Módulo Afectado:** Backend API (`backend_python/users_roles.py`).
* **Severidad:** **Alta**.
* **Estado:** En Proceso.
* **Descripción del Fallo:** Peticiones directas mediante Postman o cURL hacia `/api/usuarios` y `/api/roles` devuelven listados de registros con código 200 OK sin requerir cabecera `Authorization` ni token de sesión de usuario autenticado.
* **Impacto en el Negocio:** Fuga de datos personales y riesgo de manipulación de privilegios por atacantes en red.

### BUG-002 (DEF-005): Pérdida de Datos en Registro de Clientes por Desacople de Esquema
* **Módulo Afectado:** Base de Datos MySQL y Formulario de Registro (`registro.js`).
* **Severidad:** **Alta**.
* **Estado:** Pendiente.
* **Descripción del Fallo:** El formulario solicita número de documento, tipo de documento y género; sin embargo, la tabla `clientes` en `calcifer3d.sql` no posee estas columnas. El endpoint descarta estos valores silenciosamente al insertar.
* **Impacto en el Negocio:** Pérdida de información legal y tributaria indispensable para la facturación electrónica y seguimiento del cliente.

### BUG-003 (DEF-011): Desconexión entre Vista de Catálogo y Endpoint de Productos
* **Módulo Afectado:** Frontend Catálogo (`produtos.html`, `js/content/produtos-content.js`).
* **Severidad:** **Media**.
* **Estado:** Pendiente.
* **Descripción del Fallo:** Aunque el backend dispone del endpoint operativo `GET /api/productos`, la interfaz pública utiliza un array estático en memoria JS en lugar de consumir los datos dinámicos de MySQL mediante `fetch()`.
* **Impacto en el Negocio:** Inconsistencia entre el stock real de la base de datos y lo ofertado visualmente al cliente.

### BUG-004 (DEF-012): Paneles de Vendedor y Contador con Métricas Simuladas en Memoria
* **Módulo Afectado:** Paneles Administrativos (`vendedor.js`, `contador.js`).
* **Severidad:** **Alta**.
* **Estado:** Pendiente.
* **Descripción del Fallo:** Las tablas de pedidos, liquidaciones y saldos operan manipulando el DOM y estructuras locales temporales, careciendo de persistencia transaccional con la base de datos MySQL.
* **Impacto en el Negocio:** Imposibilidad de consolidar cierres de caja o históricos contables confiables en la organización.

---

## 10. PLAN DE ACCIONES CORRECTIVAS

Con base en las incidencias identificadas, se determinan las siguientes medidas técnicas de remediación obligatoria:

1. **Implementar Middleware / Decorador de Autenticación (`@requiere_rol`):**  
   Incorporar en Flask la validación obligatoria de cabeceras de autorización (`Bearer <token>` o cookies HTTP-Only de sesión) antes de acceder a cualquier endpoint de `/api/usuarios` o `/api/roles`.
2. **Actualizar el Esquema DDL de la Base de Datos:**  
   Ejecutar una migración DDL (`ALTER TABLE clientes ADD COLUMN documento VARCHAR(20), ADD COLUMN tipo_documento VARCHAR(10), ADD COLUMN genero VARCHAR(20)`) y adaptar `users_roles.py` para almacenar estos campos de forma atómica.
3. **Conectar el Frontend mediante Fetch Asíncrono:**  
   Refactorizar `produtos-content.js` para reemplazar la carga fija de productos por una consulta asíncrona a `GET /api/productos`, gestionando estados de carga y errores de red.
4. **Desarrollar Endpoints Transaccionales para Ventas y Contabilidad:**  
   Crear los modelos y endpoints REST correspondientes para registrar compras, ventas y balances contables contra las tablas `ventas`, `detalles_venta` y `gastos` de MySQL.
5. **Reejecución de Pruebas de Regresión:**  
   Repetir los casos CP-004 y CP-005 una vez aplicados los parches, asegurando que las correcciones no introduzcan nuevos errores en los módulos conexos.

---

## 11. REGISTRO DE EVIDENCIAS RECOLECTADAS

Las evidencias del proceso fueron archivadas en el repositorio del proyecto bajo la carpeta de artefactos de prueba:

* **Evidencia CP-001:** `docs/evidencias/setup_exitoso_001.png` (Respuesta JSON 200 en Postman y verificación de 13 tablas en phpMyAdmin).
* **Evidencia CP-002:** `docs/evidencias/login_exitoso_002.png` (Inspección en Chrome DevTools de `localStorage` con sesión de Administrador).
* **Evidencia CP-003:** `docs/evidencias/login_invalido_003.png` (Pestaña Network con código HTTP 401 y mensaje de error en pantalla).
* **Evidencia CP-004:** `docs/evidencias/acceso_api_sin_token_004.png` (Captura de Postman recibiendo usuarios sin autenticación).
* **Evidencia CP-005:** `docs/evidencias/registro_cliente_brecha_005.png` (Comparación entre payload enviado y registro en tabla `clientes` de MySQL).
* **Evidencia CP-006:** `docs/evidencias/bloqueo_duplicado_006.png` (Captura de respuesta 409 Conflict y botón deshabilitado).
* **Evidencia CP-007:** `docs/evidencias/integridad_roles_007.png` (Bloqueo en Flask de intento de eliminación de rol con clave foránea).
* **Evidencia CP-008:** `docs/evidencias/inyeccion_sql_bloqueada_008.png` (Payload SQL neutralizado por consultas preparadas).
* **Evidencia CP-009:** `docs/evidencias/reporte_carga_local_009.png` (Gráfica de tiempos de respuesta < 300 ms en Postman Runner).
* **Evidencia CP-010:** `docs/evidencias/menu_movil_responsive_010.png` (Captura en resolución 375x667 con menú hamburguesa activo).

---

## 12. CONCLUSIONES

1. **Efectividad Global Aceptable:** La plataforma web Calcifer3D demostró un nivel de madurez funcional alto en sus componentes de inicialización, control de duplicados, resistencia frente a SQL Injection y adaptabilidad responsiva, alcanzando un **80% de aprobación**.
2. **Robustez Criptográfica:** El uso de algoritmos de hashing modernos (PBKDF2/scrypt de Werkzeug) garantiza que las contraseñas nunca queden expuestas en texto plano, cumpliendo a cabalidad las normas de seguridad informática vigentes.
3. **Puntos Críticos Prioritarios:** El aseguramiento perimetral en los endpoints de la API (backend) y la actualización de las columnas en la tabla `clientes` representan los focos principales de riesgo que deben ser subsanados previo al despliegue productivo.
4. **Utilidad de la Trazabilidad:** La relación estricta entre requerimientos y casos de prueba facilitó la detección temprana de inconsistencias antes de la entrega al cliente final, validando la efectividad metodológica del ciclo SENA.

---

## 13. RECOMENDACIONES

1. **Automatización del Banco de Pruebas:** Migrar las pruebas funcionales y de API a scripts automatizados con bibliotecas como `pytest` y `requests` para ejecutarlas en pipelines de integración continua (CI/CD).
2. **Implementación de Tokens JWT:** Reemplazar el almacenamiento plano de sesión en `localStorage` por autenticación basada en tokens JWT (JSON Web Tokens) transmitidos en cookies seguras con flags `HttpOnly` y `SameSite`.
3. **Pruebas de Regresión Periódicas:** Efectuar un barrido completo de pruebas cada vez que se modifique el esquema de MySQL o se refactoricen módulos del frontend.
4. **Mantenimiento Continuo de la Documentación:** Actualizar los diagramas relacionales y el diccionario de datos cada vez que se ejecuten migraciones DDL en la base de datos.

---

## 14. APROBACIÓN Y FIRMAS

| Rol | Nombre y Apellidos | Firma | Fecha |
| :--- | :--- | :---: | :---: |
| **Líder de Pruebas / Aprendiz** | [Nombre del Aprendiz] | _____________________________ | 24/03/2026 |
| **Instructor Técnico SENA** | [Nombre del Instructor] | _____________________________ | [DD/MM/AAAA] |
