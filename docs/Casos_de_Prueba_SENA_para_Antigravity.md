# Documento de casos de prueba de software

**Actividad:** GA9-220501096-AA2-EV01 — Diseña casos y define el ambiente de pruebas de software según proyecto.

> Documento convertido desde la plantilla Excel a Markdown para que una herramienta de IA o un editor de texto pueda leerlo fácilmente. Se conserva la información que venía en la plantilla; revisa los datos de ejemplo antes de entregar.

## 1. Información del proyecto

- **Versión:** 2.1.0
- **Fecha de Inicio de Pruebas:** 17/03/2026
- **Fecha de Fin de Pruebas:** 24/03/2026
- **Líder de Pruebas:** [Nombre del Aprendiz]
- **Ficha:** 3070411
- **Programa de Formación:** Análisis y Desarrollo de Software - ADSO
- **Centro:** Centro De Comercio y Turismo - Regional Quindío

## 2. Ambiente de prueba

| Componente | Especificación | Observaciones |
|---|---|---|
| Tipo de Aplicación | Web Responsive v2.1.0 | Accesible desde cualquier navegador moderno |
| Sistemas Operativos | Windows 11 Pro, Ubuntu 22.04 LTS, macOS Sonoma | Pruebas cruzadas en los 3 SO |
| Navegadores | Chrome 122, Firefox 123, Edge 122, Safari 17 | Verificar compatibilidad CSS/JS |
| Servidor Web | 17/03/2026 | Tomcat para app, Nginx como proxy |
| Base de Datos | PostgreSQL 16.2 | Datos de prueba precargados |
| Lenguaje / Framework | Java 21 + Spring Boot 3.2 | Backend REST API |
| Frontend | HTML5, CSS3, JavaScript, Bootstrap 5.3 | Diseño responsivo |
| Hardware Mínimo | Intel i5 11th Gen, 8 GB RAM, SSD 256 GB | Especificación del equipo de pruebas |
| Red | Centro De Comercio y Turismo - Regional Quindío | Simulación de red local del centro |
| Herramientas de Prueba | Selenium WebDriver 4.18, JMeter 5.6, Postman 11 | Automatización y carga |
| Control de Versiones | Git + GitHub | Rama de pruebas: feature/testing |

## 3. Casos de prueba

### Caso 001 — Registro de aprendiz con datos válidos

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Verificar que un aprendiz puede registrarse correctamente ingresando todos los datos personales requeridos (nombre, cédula, email, teléfono, dirección).
- **Ambiente / Entorno:** Windows 11 Pro, Chrome 122, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Carlos Andrés Martínez
- **Fecha de Revisión:** 17/03/2026
- **Salida Esperada:** El sistema muestra mensaje de confirmación y almacena los datos en la BD.
- **Salida Obtenida:** El sistema registró al aprendiz correctamente y envió email de confirmación.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: registro_exitoso_001.png

### Caso 002 — Login con credenciales incorrectas (bloqueo)

- **Tipo de Prueba:** Seguridad
- **Descripción del Caso de Prueba:** Intentar iniciar sesión 5 veces con contraseña incorrecta y verificar que el sistema bloquea la cuenta temporalmente.
- **Ambiente / Entorno:** Ubuntu 22.04, Firefox 123, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Postman + Selenium
- **Autor del Caso:** María Elena Rodríguez
- **Fecha de Revisión:** 17/03/2026
- **Salida Esperada:** Después de 5 intentos fallidos, el sistema bloquea la cuenta por 15 minutos y muestra mensaje.
- **Salida Obtenida:** El sistema permitió intentos ilimitados sin bloquear la cuenta.
- **Resultado:** En seguimiento
- **Seguimiento:** SEG-002
- **Severidad:** Alta
- **Evidencia:** Captura: login_sin_bloqueo_002.png

### Caso 003 — Búsqueda de programa por nombre

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Buscar el programa 'Análisis y Desarrollo de Software' usando el campo de búsqueda y verificar que se muestran los resultados correctos.
- **Ambiente / Entorno:** Windows 11 Pro, Edge 122, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Jorge Luis Pérez
- **Fecha de Revisión:** 18/03/2026
- **Salida Esperada:** Se muestra una lista con el programa ADSO, su ficha, horario y cupos disponibles.
- **Salida Obtenida:** Se encontró el programa correctamente con toda la información solicitada.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: busqueda_programa_003.png

### Caso 004 — 17/03/2026

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Intentar matricular un aprendiz en un programa con 0 cupos disponibles y verificar que el sistema no permita la matrícula.
- **Ambiente / Entorno:** macOS Sonoma, Safari 17, Tomcat 10.1, PostgreSQL 16.2, M2/16GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Ana Patricia Gómez
- **Fecha de Revisión:** 18/03/2026
- **Salida Esperada:** Mensaje: 'No hay cupos disponibles. Se agregará a lista de espera.'
- **Salida Obtenida:** El sistema permitió la matrícula sin validar cupos y generó certificado.
- **Resultado:** Rechazado
- **Seguimiento:** SEG-004
- **Severidad:** Alta
- **Evidencia:** Captura: matricula_sin_cupo_004.png

### Caso 005 — Generación de constancia de matrícula PDF

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Después de una matrícula exitosa, verificar que el sistema genera un PDF con los datos correctos del aprendiz y el programa.
- **Ambiente / Entorno:** Windows 11 Pro, Chrome 122, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Luis Fernando Castro
- **Fecha de Revisión:** 19/03/2026
- **Salida Esperada:** Se descarga un PDF con nombre, cédula, programa, ficha, fecha de matrícula y código QR de validación.
- **Salida Obtenida:** PDF generado correctamente con todos los campos requeridos.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: constancia_pdf_005.png

### Caso 006 — Carga simultánea de 150 usuarios

- **Tipo de Prueba:** Rendimiento
- **Descripción del Caso de Prueba:** Simular 150 usuarios concurrentes realizando consultas de programas y verificar tiempos de respuesta.
- **Ambiente / Entorno:** Ubuntu 22.04, Chrome 122, Nginx 1.25 + Tomcat 10.1, PostgreSQL 16.2, Xeon/32GB
- **Herramienta:** JMeter 5.6
- **Autor del Caso:** Diana Carolina Ruiz
- **Fecha de Revisión:** 19/03/2026
- **Salida Esperada:** Tiempo de respuesta promedio < 3 segundos, CPU < 80%, Memoria < 75%.
- **Salida Obtenida:** Tiempo promedio: 4.2s, CPU: 85%, Memoria: 78%. Degradación a partir de 120 usuarios.
- **Resultado:** En seguimiento
- **Seguimiento:** SEG-006
- **Severidad:** Media
- **Evidencia:** Reporte: jmeter_carga_006.html

### Caso 007 — Validación de campos vacíos en registro

- **Tipo de Prueba:** Unitaria
- **Descripción del Caso de Prueba:** Enviar el formulario de registro con todos los campos vacíos y verificar que se muestren mensajes de validación.
- **Ambiente / Entorno:** Windows 11 Pro, Firefox 123, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Roberto Andrés Silva
- **Fecha de Revisión:** 20/03/2026
- **Salida Esperada:** Se muestran mensajes de error en cada campo obligatorio: nombre, cédula, email, teléfono.
- **Salida Obtenida:** Solo se validó el campo de cédula; los demás campos no mostraron mensaje de error.
- **Resultado:** Rechazado
- **Seguimiento:** SEG-007
- **Severidad:** Media
- **Evidencia:** Captura: validacion_campos_007.png

### Caso 008 — Inyección SQL en campo de búsqueda

- **Tipo de Prueba:** Seguridad
- **Descripción del Caso de Prueba:** Ingresar cadenas de inyección SQL (' OR 1=1 --) en el campo de búsqueda de programas.
- **Ambiente / Entorno:** Ubuntu 22.04, Chrome 122, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Postman
- **Autor del Caso:** Patricia Isabel Moreno
- **Fecha de Revisión:** 20/03/2026
- **Salida Esperada:** El sistema rechaza la entrada y muestra mensaje genérico sin revelar información de la BD.
- **Salida Obtenida:** El sistema filtró parcialmente la inyección pero mostró errores de BD en consola del navegador.
- **Resultado:** En seguimiento
- **Seguimiento:** SEG-008
- **Severidad:** Alta
- **Evidencia:** Captura: inyeccion_sql_008.png

### Caso 009 — Centro De Comercio y Turismo - Regional Quindío

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Solicitar recuperación de contraseña con un email registrado y verificar que llega el enlace de restablecimiento.
- **Ambiente / Entorno:** Windows 11 Pro, Chrome 122, Tomcat 10.1, PostgreSQL 16.2, i5/8GB
- **Herramienta:** Selenium + verificación manual email
- **Autor del Caso:** Andrés Felipe Torres
- **Fecha de Revisión:** 21/03/2026
- **Salida Esperada:** Se envía email con enlace de recuperación válido por 30 minutos.
- **Salida Obtenida:** Email recibido correctamente con enlace funcional que expira en 30 min.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** N/A
- **Evidencia:** Captura: recuperacion_email_009.png

### Caso 010 — Exportar reporte de inscritos a Excel

- **Tipo de Prueba:** Funcional
- **Descripción del Caso de Prueba:** Desde el módulo de reportes, exportar la lista de aprendices inscritos a formato Excel.
- **Ambiente / Entorno:** macOS Sonoma, Safari 17, Tomcat 10.1, PostgreSQL 16.2, M2/16GB
- **Herramienta:** Selenium WebDriver
- **Autor del Caso:** Laura Camila Vargas
- **Fecha de Revisión:** 21/03/2026
- **Salida Esperada:** Se descarga archivo .xlsx con columnas: nombre, cédula, programa, ficha, estado, fecha matrícula.
- **Salida Obtenida:** Archivo exportado correctamente pero sin la columna de estado del aprendiz.
- **Resultado:** Aprobado
- **Seguimiento:** N/A
- **Severidad:** Baja
- **Evidencia:** Captura: reporte_excel_010.png

## 4. Seguimiento de defectos

| Código | Caso asociado | Descripción del defecto | Severidad | Responsable | Estado | Fecha asignación | Fecha resolución |
|---|---|---|---|---|---|---|---|
| SEG-002 | #002 | No se bloquea la cuenta tras 5 intentos fallidos de login | Alta | Equipo Backend | En proceso | 17/03/2026 |  |
| SEG-004 | #004 | El sistema permite matrícula sin validar disponibilidad de cupos | Alta | Equipo Backend | Pendiente | 18/03/2026 |  |
| SEG-006 | #006 | Degradación de rendimiento con más de 120 usuarios concurrentes | Media | Equipo DevOps | En proceso | 19/03/2026 |  |
| SEG-007 | 17/03/2026 | Validación de campos vacíos incompleta en formulario de registro | Media | Equipo Frontend | Pendiente | 20/03/2026 |  |
| SEG-008 | #008 | Filtrado parcial de inyección SQL con exposición de errores en consola | Alta | Equipo Backend | En proceso | 20/03/2026 |  |

## 5. Resumen de resultados

- **Total de casos de prueba:** 10
- **Aprobados:** 5
- **En seguimiento:** 3
- **Rechazados:** 2
- **Severidad Alta:** 3
- **Severidad Media:** 2
- **Severidad Baja:** 1
- **% Aprobación:** Centro De Comercio y Turismo - Regional Quindío
- **Defectos abiertos:** 5

## 6. Aprobación
- **Nombre del analista:** [Completar]
- **Firma:** [Completar]
- **Fecha:** [DD/MM/AAAA]

## Instrucción para continuar con una IA
Lee este documento como la especificación de los casos de prueba. Ayúdame a revisar su estructura y a preparar el plan de pruebas. No inventes ejecuciones ni resultados: los resultados que aparecen aquí son los que estaban escritos en la plantilla original. Señala cualquier dato de ejemplo, inconsistencia o campo que deba corregirse antes de entregar.