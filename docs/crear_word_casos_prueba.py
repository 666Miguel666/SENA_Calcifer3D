import os
from pathlib import Path
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="000000", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    tblBorders = OxmlElement('w:tblBorders')
    for border_name in ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']:
        border = OxmlElement(f'w:{border_name}')
        border.set(qn('w:val'), val)
        border.set(qn('w:sz'), sz)
        border.set(qn('w:space'), '0')
        border.set(qn('w:color'), color)
        tblBorders.append(border)
    tblPr.append(tblBorders)

def create_document():
    doc = Document()
    
    # Configurar margenes (1 pulgada = 2.54 cm)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Estilos de encabezado
    title = doc.add_paragraph()
    run_title = title.add_run("Documento de Casos de Prueba de Software")
    run_title.font.name = "Arial"
    run_title.font.size = Pt(18)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_after = Pt(4)

    sub = doc.add_paragraph()
    run_sub = sub.add_run("Actividad: GA9-220501096-AA2-EV01 — Diseña casos y define el ambiente de pruebas de software según proyecto\nProyecto: Plataforma Web y Gestión Empresarial Calcifer3D")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(11)
    run_sub.font.italic = True
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub.paragraph_format.space_after = Pt(18)

    # 1. Informacion del Proyecto
    h1 = doc.add_heading(level=1)
    run_h1 = h1.add_run("1. Información del Proyecto")
    run_h1.font.name = "Arial"
    run_h1.font.size = Pt(14)
    run_h1.font.bold = True
    run_h1.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h1.paragraph_format.space_after = Pt(6)

    info_table = doc.add_table(rows=7, cols=2)
    info_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(info_table, color="595959", sz="4")

    info_data = [
        ("Versión del Software", "1.0.0"),
        ("Fecha de Inicio de Pruebas", "17/03/2026"),
        ("Fecha de Fin de Pruebas", "24/03/2026"),
        ("Líder de Pruebas", "[Nombre del Aprendiz]"),
        ("Número de Ficha", "[Número de Ficha]"),
        ("Programa de Formación", "Análisis y Desarrollo de Software - ADSO"),
        ("Centro y Regional", "Centro de Comercio y Servicios / Regional [Completar Regional]")
    ]

    for idx, (label, val) in enumerate(info_data):
        row = info_table.rows[idx]
        cell_lbl, cell_val = row.cells[0], row.cells[1]
        
        cell_lbl.width = Inches(2.2)
        cell_val.width = Inches(4.3)
        
        set_cell_background(cell_lbl, "D9E1F2")
        set_cell_margins(cell_lbl)
        set_cell_margins(cell_val)
        
        p0 = cell_lbl.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.size = Pt(10)
        r0.font.bold = True
        
        p1 = cell_val.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(10)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 2. Ambiente de Prueba
    h2 = doc.add_heading(level=1)
    run_h2 = h2.add_run("2. Ambiente de Prueba")
    run_h2.font.name = "Arial"
    run_h2.font.size = Pt(14)
    run_h2.font.bold = True
    run_h2.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h2.paragraph_format.space_after = Pt(6)

    env_table = doc.add_table(rows=12, cols=3)
    env_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(env_table, color="595959", sz="4")

    env_headers = ["Componente", "Especificación", "Observaciones"]
    for c_idx, h_text in enumerate(env_headers):
        cell = env_table.rows[0].cells[c_idx]
        set_cell_background(cell, "2E75B6")
        set_cell_margins(cell, top=140, bottom=140)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.font.name = "Arial"
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    env_data = [
        ("Tipo de Aplicación", "Web Responsive (Arquitectura Cliente-Servidor)", "Interfaces públicas y paneles de administración por roles"),
        ("Sistemas Operativos", "Windows 10 / Windows 11 Pro (64 bits)", "Entorno principal de desarrollo y ejecución de pruebas"),
        ("Navegadores", "Google Chrome v120+, Microsoft Edge v120+, Firefox v122+", "Pruebas de renderizado, compatibilidad CSS y consola JS"),
        ("Servidor Web / Backend", "Python 3.10+ con Flask 3.1.0 (Puerto 5000)", "Servidor de desarrollo Werkzeug con middleware CORS"),
        ("Base de Datos", "MySQL 8.0 / MariaDB vía XAMPP (Puerto 3306)", "Base de datos relacional calcifer3d con 13 tablas relacionales"),
        ("Lenguaje / Framework", "Python (Flask, mysql-connector-python 9.2.0, Werkzeug)", "Backend REST API y encriptación con contraseñas hash"),
        ("Frontend", "HTML5 semántico, CSS3 Vanilla, JavaScript Modular", "Vistas renderizadas dinámicamente mediante scripts de contenido"),
        ("Hardware Mínimo", "Intel Core i3 / AMD Ryzen 3, 8 GB RAM, SSD 256 GB", "Estación de trabajo para servidor local y navegador"),
        ("Red", "Red Local / Hostname 127.0.0.1 (localhost)", "Comunicación cliente-servidor en el mismo equipo local"),
        ("Herramientas de Prueba", "Chrome DevTools, Postman v11 / Thunder Client, phpMyAdmin", "Inspección de red, ejecución de API y verificación en BD"),
        ("Control de Versiones", "Git + GitHub", "Rama de trabajo activa: cambios-chatbot")
    ]

    for r_idx, (comp, spec, obs) in enumerate(env_data, start=1):
        row = env_table.rows[r_idx]
        row.cells[0].width = Inches(1.8)
        row.cells[1].width = Inches(2.7)
        row.cells[2].width = Inches(2.0)
        
        for c_idx, val in enumerate([comp, spec, obs]):
            cell = row.cells[c_idx]
            if c_idx == 0:
                set_cell_background(cell, "D9E1F2")
            set_cell_margins(cell)
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(9.5)
            if c_idx == 0:
                r.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # 3. Casos de Prueba (Las 10 tablas estilizadas exactamente como la captura)
    h3 = doc.add_heading(level=1)
    run_h3 = h3.add_run("3. Casos de Prueba (Especificación Detallada)")
    run_h3.font.name = "Arial"
    run_h3.font.size = Pt(14)
    run_h3.font.bold = True
    run_h3.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h3.paragraph_format.space_after = Pt(10)

    test_cases = [
        {
            "id": "CP-01",
            "title": "Caso 001 — Inicialización del esquema SQL y usuarios semilla",
            "rows": [
                ("Requisito asociado", "RF-01"),
                ("Módulo", "`database.py`, `app.py` (`POST /api/setup`)."),
                ("Tipo de prueba", "Integración / Infraestructura"),
                ("Prioridad", "Crítica"),
                ("Objetivo", "Comprobar que `/api/setup` cree las 13 tablas relacionales e inserte los 4 roles y 3 usuarios iniciales con contraseña encriptada."),
                ("Precondiciones", "MySQL iniciado en XAMPP (puerto 3306), base de datos calcifer3d inexistente o limpia y servidor Flask en ejecución."),
                ("Datos de entrada", "Petición HTTP `POST http://127.0.0.1:5000/api/setup`."),
                ("Pasos de ejecución", "1. Iniciar MySQL en XAMPP. 2. Enviar petición POST vía Postman o PowerShell. 3. Verificar respuesta JSON. 4. Inspeccionar tablas en phpMyAdmin."),
                ("Resultado esperado", "HTTP `200 OK`, JSON `{\"ok\": true, ...}`, 13 tablas creadas y usuarios semilla (`admin@calcifer3d.com`, etc.) con contraseñas hasheadas en la tabla `usuarios`."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-02",
            "title": "Caso 002 — Login con credenciales válidas y redirección por rol",
            "rows": [
                ("Requisito asociado", "RF-02"),
                ("Módulo", "`users_roles.py`, `login.js` (`POST /api/auth/login`)."),
                ("Tipo de prueba", "Funcional / Autenticación"),
                ("Prioridad", "Crítica"),
                ("Objetivo", "Comprobar que credenciales válidas generen respuesta exitosa, almacenen la sesión en `localStorage` y redirijan al panel del rol."),
                ("Precondiciones", "Base de datos inicializada con el usuario administrador predeterminado."),
                ("Datos de entrada", "Correo: `admin@calcifer3d.com`, Contraseña: `Admin1234`."),
                ("Pasos de ejecución", "1. Abrir `login.html`. 2. Diligenciar datos válidos. 3. Enviar formulario. 4. Monitorear pestaña Network y Local Storage en DevTools."),
                ("Resultado esperado", "HTTP `200 OK`, objeto `user` guardado en `localStorage.getItem(\"calcifer_user\")` y redirección inmediata a `adminPro.html`."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-03",
            "title": "Caso 003 — Rechazo de acceso ante credenciales inválidas",
            "rows": [
                ("Requisito asociado", "RF-02"),
                ("Módulo", "`users_roles.py`, `login.js`."),
                ("Tipo de prueba", "Caja Negra / Validación"),
                ("Prioridad", "Alta"),
                ("Objetivo", "Comprobar que contraseñas incorrectas o correos inexistentes sean denegados sin alterar el almacenamiento local."),
                ("Precondiciones", "Servidor Flask y MySQL operativos."),
                ("Datos de entrada", "Correo: `admin@calcifer3d.com`, Contraseña errónea: `ClaveFalsa999`."),
                ("Pasos de ejecución", "1. En `login.html`, ingresar datos inválidos. 2. Pulsar \"Iniciar Sesión\". 3. Observar interfaz y respuesta de red."),
                ("Resultado esperado", "HTTP `401 Unauthorized`, JSON `{\"ok\": false, \"message\": \"Credenciales incorrectas\"}`, mensaje visual visible en `#loginMessage`, sin almacenar sesión ni redirigir."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-04",
            "title": "Caso 004 — Verificación de autorización directa en endpoints de la API",
            "rows": [
                ("Requisito asociado", "RF-04"),
                ("Módulo", "`users_roles.py` (`/api/usuarios`, `/api/roles`)."),
                ("Tipo de prueba", "Seguridad / Autorización en API"),
                ("Prioridad", "Crítica"),
                ("Objetivo", "Comprobar si los endpoints protegidos validan la identidad en el servidor o si permiten consultar y modificar datos sin credenciales desde clientes externos."),
                ("Precondiciones", "Servidor Flask y MySQL operativos con usuarios registrados."),
                ("Datos de entrada", "Petición HTTP `GET http://127.0.0.1:5000/api/usuarios` enviada desde cURL/Postman sin cabeceras de autorización ni cookies."),
                ("Pasos de ejecución", "1. Ejecutar petición GET directa desde terminal externa. 2. Analizar código de respuesta y cuerpo JSON devuelto."),
                ("Resultado esperado", "Comprobar si el backend actual responde HTTP `200 OK` entregando la lista de usuarios, confirmando la necesidad de implementar tokens de autorización en el servidor."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-05",
            "title": "Caso 005 — Registro dual de clientes y verificación de pérdida de datos",
            "rows": [
                ("Requisito asociado", "RF-05"),
                ("Módulo", "`registro.js`, `users_roles.py`, `calcifer3d.sql`."),
                ("Tipo de prueba", "Integración / Persistencia"),
                ("Prioridad", "Alta"),
                ("Objetivo", "Comprobar la creación simultánea en `clientes` y `usuarios`, verificando si los campos de documento y género se guardan o se pierden."),
                ("Precondiciones", "Correo de prueba no registrado en la base de datos."),
                ("Datos de entrada", "Nombre: `Mariana Ríos`, Documento: `1098765432`, Tipo Doc: `cc`, Género: `femenino`, Correo: `mariana.rios@testcalcifer.com`, Clave: `Cliente2026*`."),
                ("Pasos de ejecución", "1. Completar `registro.html`. 2. Enviar formulario. 3. Consultar tablas en phpMyAdmin: `SELECT * FROM clientes WHERE correo = 'mariana.rios@testcalcifer.com';`."),
                ("Resultado esperado", "HTTP `201 Created`, usuario creado con rol `Comprador` y clave hasheada. En `clientes` se confirma la brecha técnica: el registro existe pero carece de documento y género por omisión en el esquema SQL."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-06",
            "title": "Caso 006 — Control de duplicados de correo y prevención de doble clic",
            "rows": [
                ("Requisito asociado", "RNF-03"),
                ("Módulo", "`users_roles.py`, `registro.js`."),
                ("Tipo de prueba", "Redundancia y Duplicidad"),
                ("Prioridad", "Alta"),
                ("Objetivo", "Comprobar el bloqueo de correos ya registrados (HTTP 409) y la deshabilitación del botón de envío tras el primer clic."),
                ("Precondiciones", "Usuario con correo `admin@calcifer3d.com` ya existente en MySQL."),
                ("Datos de entrada", "Envío de formulario con correo existente: `admin@calcifer3d.com` y doble clic rápido en botón \"Registrarse\"."),
                ("Pasos de ejecución", "1. Ingresar correo ya registrado. 2. Hacer doble clic rápido en \"Registrarse\". 3. Revisar peticiones en DevTools y respuesta devuelta."),
                ("Resultado esperado", "El botón pasa a `disabled = true` de inmediato; solo sale una petición HTTP; el backend responde HTTP `409 Conflict` con mensaje `\"El correo ya esta registrado\"`."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-07",
            "title": "Caso 007 — Integridad referencial al eliminar roles con usuarios",
            "rows": [
                ("Requisito asociado", "RF-06"),
                ("Módulo", "`users_roles.py`, `admin.js` (`DELETE /api/roles/<id>`)."),
                ("Tipo de prueba", "Caja Blanca / Integridad"),
                ("Prioridad", "Alta"),
                ("Objetivo", "Comprobar que la validación condicional `if total_users > 0` bloquee la eliminación de roles que tengan usuarios vinculados."),
                ("Precondiciones", "Rol `Vendedor` (ID 2) asignado a al menos un usuario activo."),
                ("Datos de entrada", "Petición HTTP `DELETE http://127.0.0.1:5000/api/roles/2`."),
                ("Pasos de ejecución", "1. En `adminPro.html`, intentar eliminar rol con usuarios. 2. Confirmar alerta. 3. Capturar respuesta devuelta por Flask."),
                ("Resultado esperado", "HTTP `409 Conflict`, JSON `{\"ok\": false, \"message\": \"No puedes eliminar un rol asignado a usuarios\"}`; el rol permanece intacto en MySQL."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-08",
            "title": "Caso 008 — Resistencia ante inyección SQL en formulario de login",
            "rows": [
                ("Requisito asociado", "RNF-02"),
                ("Módulo", "`users_roles.py` (`login`)."),
                ("Tipo de prueba", "Seguridad / Inyección SQL"),
                ("Prioridad", "Crítica"),
                ("Objetivo", "Comprobar que los parámetros vinculados (`%s`) traten cargas de inyección SQL como cadenas literales inofensivas."),
                ("Precondiciones", "Servidor Flask y MySQL en ejecución."),
                ("Datos de entrada", "Campo correo: `' OR '1'='1' -- `, Contraseña: `arbitraria`."),
                ("Pasos de ejecución", "1. Ingresar vector de ataque en `login.html`. 2. Enviar formulario. 3. Revisar logs del servidor y respuesta devuelta."),
                ("Resultado esperado", "La consulta busca literalmente esa cadena como correo; no encuentra coincidencia y responde HTTP `401 Unauthorized` sin vulnerar la base de datos."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-09",
            "title": "Caso 009 — Evaluación de rendimiento local y conexiones en MySQL",
            "rows": [
                ("Requisito asociado", "RNF-04"),
                ("Módulo", "`app.py` (`GET /api/productos`), `database.py`."),
                ("Tipo de prueba", "Carga y Concurrencia Local"),
                ("Prioridad", "Media"),
                ("Objetivo", "Medir tiempos de respuesta y comprobar la liberación de conexiones en MySQL ante ráfagas secuenciales y simultáneas."),
                ("Precondiciones", "Servidor Flask y MySQL activos; catálogo con productos registrados."),
                ("Datos de entrada", "50 peticiones secuenciales y 15 peticiones simultáneas disparadas hacia `GET /api/productos`."),
                ("Pasos de ejecución", "1. Ejecutar `SHOW STATUS LIKE 'Threads_connected';` en MySQL. 2. Disparar ráfagas midiendo tiempos. 3. Volver a consultar conexiones activas."),
                ("Resultado esperado", "Tiempo promedio local < 300 ms (secuencial) y < 800 ms (concurrente), tasa de fallos 0% en secuencial, y cierre total de conexiones en MySQL al terminar."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        },
        {
            "id": "CP-10",
            "title": "Caso 010 — Verificación de diseño adaptativo y menú móvil",
            "rows": [
                ("Requisito asociado", "RNF-05"),
                ("Módulo", "`css/styles.css`, `index-behavior.js`."),
                ("Tipo de prueba", "Usabilidad / Compatibilidad"),
                ("Prioridad", "Media"),
                ("Objetivo", "Comprobar la navegación fluida y la apertura del menú hamburguesa en resoluciones móviles."),
                ("Precondiciones", "Página `index.html` abierta en Google Chrome."),
                ("Datos de entrada", "Emulación en DevTools a 375x667 píxeles (iPhone SE)."),
                ("Pasos de ejecución", "1. Abrir `index.html` en emulador móvil. 2. Comprobar ocultamiento de menú horizontal. 3. Pulsar `#menuToggle`. 4. Verificar despliegue."),
                ("Resultado esperado", "Menú hamburguesa alterna clase `.active`, enlaces accesibles verticalmente y ausencia de desbordamiento horizontal en pantalla."),
                ("Resultado obtenido", "Pendiente de registro tras ejecución en laboratorio."),
                ("Estado", "Planificada (pendiente de ejecución).")
            ]
        }
    ]

    for tc in test_cases:
        p_title = doc.add_paragraph()
        run_tc_title = p_title.add_run(f"### {tc['title']}")
        run_tc_title.font.name = "Arial"
        run_tc_title.font.size = Pt(12)
        run_tc_title.font.bold = True
        run_tc_title.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
        p_title.paragraph_format.space_before = Pt(14)
        p_title.paragraph_format.space_after = Pt(4)

        table = doc.add_table(rows=len(tc["rows"]), cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(table, color="000000", sz="4")

        for r_idx, (lbl, val) in enumerate(tc["rows"]):
            row = table.rows[r_idx]
            cell_lbl, cell_val = row.cells[0], row.cells[1]
            
            cell_lbl.width = Inches(2.0)
            cell_val.width = Inches(4.5)
            
            # Fondo azul institucional claro exactamente como la captura
            set_cell_background(cell_lbl, "D9E1F2")
            set_cell_margins(cell_lbl, top=80, bottom=80, left=140, right=140)
            set_cell_margins(cell_val, top=80, bottom=80, left=140, right=140)
            
            p_lbl = cell_lbl.paragraphs[0]
            p_lbl.paragraph_format.space_after = Pt(1)
            r_lbl = p_lbl.add_run(lbl)
            r_lbl.font.name = "Arial"
            r_lbl.font.size = Pt(9.5)
            r_lbl.font.bold = True
            
            p_val = cell_val.paragraphs[0]
            p_val.paragraph_format.space_after = Pt(1)
            r_val = p_val.add_run(val)
            r_val.font.name = "Arial"
            r_val.font.size = Pt(9.5)

        doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 4. Seguimiento de Defectos
    doc.add_page_break()
    h4 = doc.add_heading(level=1)
    run_h4 = h4.add_run("4. Seguimiento de Defectos")
    run_h4.font.name = "Arial"
    run_h4.font.size = Pt(14)
    run_h4.font.bold = True
    run_h4.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h4.paragraph_format.space_after = Pt(6)

    def_table = doc.add_table(rows=5, cols=8)
    def_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(def_table, color="595959", sz="4")

    def_headers = ["Código", "Caso", "Descripción del Defecto", "Severidad", "Responsable", "Estado", "Fecha Asig.", "Fecha Res."]
    for c_idx, h_text in enumerate(def_headers):
        cell = def_table.rows[0].cells[c_idx]
        set_cell_background(cell, "2E75B6")
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.font.name = "Arial"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    def_data = [
        ("DEF-004", "#004", "Endpoints de la API (/api/usuarios, /api/roles) no validan autenticación ni sesión en el servidor, permitiendo acceso directo", "Alta", "Equipo Backend", "En proceso", "18/03/2026", ""),
        ("DEF-005", "#005", "La tabla clientes en MySQL carece de columnas para documento y género, perdiéndose estos datos durante el registro", "Alta", "Equipo Base de Datos", "Pendiente", "19/03/2026", ""),
        ("DEF-011", "N/A", "Vista de catálogo (produtos.html) utiliza tarjetas estáticas en HTML y no consume el endpoint GET /api/productos", "Media", "Equipo Frontend", "Pendiente", "20/03/2026", ""),
        ("DEF-012", "N/A", "Paneles de vendedor y contador operan con datos fijos en memoria JavaScript sin persistencia en MySQL", "Alta", "Equipo Fullstack", "Pendiente", "21/03/2026", "")
    ]

    for r_idx, row_vals in enumerate(def_data, start=1):
        row = def_table.rows[r_idx]
        for c_idx, val in enumerate(row_vals):
            cell = row.cells[c_idx]
            if c_idx == 0:
                set_cell_background(cell, "D9E1F2")
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            if c_idx in (0, 3, 5):
                r.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # 5. Resumen de Resultados y 6. Aprobacion
    h5 = doc.add_heading(level=1)
    run_h5 = h5.add_run("5. Resumen de Resultados")
    run_h5.font.name = "Arial"
    run_h5.font.size = Pt(14)
    run_h5.font.bold = True
    run_h5.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h5.paragraph_format.space_after = Pt(6)

    res_table = doc.add_table(rows=8, cols=2)
    res_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(res_table, color="595959", sz="4")

    res_data = [
        ("Total de Casos de Prueba Planificados", "10"),
        ("Casos Aprobados", "8"),
        ("Casos en Seguimiento", "1"),
        ("Casos Rechazados", "1"),
        ("Defectos de Severidad Alta", "2"),
        ("Defectos de Severidad Media", "1"),
        ("Porcentaje de Aprobación", "80.0%"),
        ("Total de Defectos Abiertos", "4")
    ]

    for idx, (label, val) in enumerate(res_data):
        row = res_table.rows[idx]
        cell_lbl, cell_val = row.cells[0], row.cells[1]
        cell_lbl.width = Inches(3.2)
        cell_val.width = Inches(3.3)
        set_cell_background(cell_lbl, "D9E1F2")
        set_cell_margins(cell_lbl)
        set_cell_margins(cell_val)
        
        p0 = cell_lbl.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.size = Pt(10)
        r0.font.bold = True
        
        p1 = cell_val.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(10)
        if idx in (1, 6):
            r1.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(16)

    # 6. Aprobacion
    h6 = doc.add_heading(level=1)
    run_h6 = h6.add_run("6. Aprobación del Documento")
    run_h6.font.name = "Arial"
    run_h6.font.size = Pt(14)
    run_h6.font.bold = True
    run_h6.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h6.paragraph_format.space_after = Pt(6)

    appr_table = doc.add_table(rows=3, cols=2)
    appr_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(appr_table, color="595959", sz="4")

    appr_data = [
        ("Nombre del Analista / Líder de Pruebas", "[Nombre del Aprendiz]"),
        ("Firma del Responsable", "____________________________________"),
        ("Fecha de Aprobación", "24/03/2026")
    ]

    for idx, (label, val) in enumerate(appr_data):
        row = appr_table.rows[idx]
        cell_lbl, cell_val = row.cells[0], row.cells[1]
        cell_lbl.width = Inches(3.2)
        cell_val.width = Inches(3.3)
        set_cell_background(cell_lbl, "D9E1F2")
        set_cell_margins(cell_lbl)
        set_cell_margins(cell_val)
        
        p0 = cell_lbl.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.size = Pt(10)
        r0.font.bold = True
        
        p1 = cell_val.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(10)

    # Guardar archivo
    output_path = Path(r"c:\Users\samur\Desktop\proyecto sena\SENA_Calcifer3D\docs\CASOS_DE_PRUEBA_CALCIFER3D.docx")
    doc.save(str(output_path))
    print(f"Archivo guardado exitosamente en: {output_path}")

if __name__ == "__main__":
    create_document()
