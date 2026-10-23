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

def set_table_borders(table, color="B0C4DE", sz="4", val="single"):
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

def add_heading_1(doc, text):
    h = doc.add_heading(level=1)
    run = h.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    h.paragraph_format.space_before = Pt(14)
    h.paragraph_format.space_after = Pt(6)
    return h

def add_heading_2(doc, text):
    h = doc.add_heading(level=2)
    run = h.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x2E, 0x75, 0xB6)
    h.paragraph_format.space_before = Pt(10)
    h.paragraph_format.space_after = Pt(4)
    return h

def add_paragraph(doc, text, bold_prefix="", space_after=6, italic=False):
    p = doc.add_paragraph()
    if bold_prefix:
        r_bold = p.add_run(bold_prefix)
        r_bold.font.name = "Arial"
        r_bold.font.size = Pt(10)
        r_bold.font.bold = True
        r_bold.font.color.rgb = RGBColor(0x26, 0x26, 0x26)
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(10)
    r.font.italic = italic
    r.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    return p

def add_callout(doc, text, title=""):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "F2F5F8")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    set_table_borders(tbl, color="2E75B6", sz="12", val="single")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.15
    if title:
        r_t = p.add_run(title + "\n")
        r_t.font.name = "Arial"
        r_t.font.size = Pt(10)
        r_t.font.bold = True
        r_t.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(9.5)
    r.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    
    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_after = Pt(6)

def create_report_docx(output_path):
    doc = Document()
    
    # Configurar márgenes 1 pulgada (Normas APA)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
        # Pie de página
        footer = section.footer
        f_p = footer.paragraphs[0]
        f_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        f_run = f_p.add_run("SENA ADSO | Evidencia GA9-220501096-AA3-EV02 — Reporte de Pruebas")
        f_run.font.name = "Arial"
        f_run.font.size = Pt(8.5)
        f_run.font.color.rgb = RGBColor(0x88, 0x88, 0x88)

    # Encabezado principal
    t_p = doc.add_paragraph()
    t_run = t_p.add_run("REPORTE DE PLAN DE PRUEBAS EJECUTADAS")
    t_run.font.name = "Arial"
    t_run.font.size = Pt(17)
    t_run.font.bold = True
    t_run.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    t_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t_p.paragraph_format.space_after = Pt(4)

    s_p = doc.add_paragraph()
    s_run = s_p.add_run("Evidencia: GA9-220501096-AA3-EV02\nPrograma: Análisis y Desarrollo de Software (ADSO) | Proyecto: Calcifer3D")
    s_run.font.name = "Arial"
    s_run.font.size = Pt(10.5)
    s_run.font.italic = True
    s_run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    s_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    s_p.paragraph_format.space_after = Pt(16)

    # 1. PORTADA
    add_heading_1(doc, "1. Portada Institucional")
    portada_table = doc.add_table(rows=7, cols=2)
    portada_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(portada_table, color="1F4E79", sz="6")
    
    portada_data = [
        ("Programa de Formación", "Análisis y Desarrollo de Software (ADSO)"),
        ("Número de Ficha", "[Número de Ficha]"),
        ("Nombre del Aprendiz", "[Nombre del Aprendiz]"),
        ("Nombre del Instructor", "[Nombre del Instructor]"),
        ("Código de Evidencia", "GA9-220501096-AA3-EV02 — Reporte de plan de pruebas ejecutadas"),
        ("Centro de Formación", "Centro de Comercio y Servicios / Regional [Completar Regional]"),
        ("Fecha de Presentación", "24 de marzo de 2026")
    ]
    
    col_widths = [Inches(2.2), Inches(4.3)]
    for r_idx, (campo, val) in enumerate(portada_data):
        row = portada_table.rows[r_idx]
        cell_0 = row.cells[0]
        cell_1 = row.cells[1]
        
        cell_0.width = col_widths[0]
        cell_1.width = col_widths[1]
        
        set_cell_background(cell_0, "EBF1F5")
        set_cell_margins(cell_0, top=100, bottom=100, left=140, right=140)
        set_cell_margins(cell_1, top=100, bottom=100, left=140, right=140)
        
        p0 = cell_0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(campo)
        r0.font.name = "Arial"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
        
        p1 = cell_1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = RGBColor(0x26, 0x26, 0x26)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 2. INTRODUCCIÓN
    add_heading_1(doc, "2. Introducción")
    add_paragraph(doc, "El presente documento consolida el Reporte de Ejecución del Plan de Pruebas aplicado al software Calcifer3D, una solución web integral orientada al comercio electrónico de insumos, filamentos y servicios de manufactura aditiva (impresión 3D FDM y resina SLA).")
    add_paragraph(doc, "A través de este informe se presentan de forma estructurada los resultados obtenidos durante la fase de aseguramiento de la calidad (QA), evaluando el comportamiento real de las interfaces de usuario (Frontend), los servicios REST expuestos por el Backend en Python Flask y la persistencia de datos en el motor relacional MySQL. Este análisis permite contrastar las funcionalidades implementadas frente a los requerimientos especificados, cuantificar la tasa de éxito de la suite de pruebas, aislar incidencias (defectos/bugs) y formalizar un plan de remediación técnica previo al despliegue en producción.")

    # 3. OBJETIVOS
    add_heading_1(doc, "3. Objetivos")
    add_heading_2(doc, "3.1. Objetivo General")
    add_paragraph(doc, "Evaluar y certificar el comportamiento funcional, la robustez de seguridad y la consistencia relacional del aplicativo Calcifer3D mediante la ejecución sistemática de un banco de 10 casos de prueba especializados, garantizando el cumplimiento de los estándares de calidad del software exigidos por el SENA.")
    
    add_heading_2(doc, "3.2. Objetivos Específicos")
    add_paragraph(doc, "Comprobar que los módulos de inicialización DDL, autenticación por roles, control de sesiones, registro de clientes y gestión administrativa operen conforme a las reglas del negocio.", bold_prefix="• Validar Requerimientos Funcionales (RF): ")
    add_paragraph(doc, "Auditar el hashing seguro de contraseñas (PBKDF2/scrypt), la resistencia frente a inyecciones SQL, la unicidad de credenciales y los tiempos de respuesta del servidor local (< 300 ms).", bold_prefix="• Auditar Seguridad y Requerimientos No Funcionales (RNF): ")
    add_paragraph(doc, "Tipificar con rigor técnico las brechas entre la interfaz gráfica, los controladores de la API y el esquema relacional de tablas en MySQL.", bold_prefix="• Detectar e Identificar Incidencias (Bugs): ")
    add_paragraph(doc, "Vincular cada requerimiento con su correspondiente caso de prueba y resultado obtenido para verificar la cobertura técnica del sistema.", bold_prefix="• Construir la Matriz de Trazabilidad: ")
    add_paragraph(doc, "Definir las acciones técnicas obligatorias de remediación y las pruebas de regresión necesarias para corregir las vulnerabilidades y fallos aislados.", bold_prefix="• Establecer Acciones Correctivas: ")

    # 4. ALCANCE
    add_heading_1(doc, "4. Alcance del Plan de Pruebas")
    add_paragraph(doc, "El alcance de las pruebas contempló la auditoría estática y dinámica de la arquitectura Cliente-Servidor de Calcifer3D en sus componentes principales:")
    add_paragraph(doc, "Endpoint POST /api/setup, ejecución del script DDL calcifer3d.sql, creación de 13 tablas relacionales e inserción de 4 roles y 3 usuarios predeterminados con claves cifradas.", bold_prefix="1. Módulo de Inicialización y Base de Datos: ")
    add_paragraph(doc, "Validación de credenciales en POST /api/auth/login, verificación de contraseñas con Werkzeug, almacenamiento de sesión en localStorage y redirección perimetral según rol.", bold_prefix="2. Módulo de Autenticación y Acceso: ")
    add_paragraph(doc, "Inspección de autorización en endpoints /api/usuarios y /api/roles, y neutralización de cargas maliciosas (SQLi) en el formulario de acceso.", bold_prefix="3. Módulo de Seguridad Perimetral y API: ")
    add_paragraph(doc, "Captura en registro.html, validación asíncrona fetch y persistencia dual en las entidades clientes y usuarios.", bold_prefix="4. Módulo de Registro de Clientes: ")
    add_paragraph(doc, "Medición de tiempos de respuesta en GET /api/productos y monitoreo de liberación de conexiones activas en MySQL (Threads_connected).", bold_prefix="5. Módulo de Rendimiento y Catálogo: ")
    add_paragraph(doc, "Inspección visual en emulación móvil (375x667 px) y operatividad del menú desplegable hamburguesa (#menuToggle).", bold_prefix="6. Módulo de Usabilidad Responsive (UI/UX): ")

    # 5. DESCRIPCIÓN DE PRUEBAS
    add_heading_1(doc, "5. Descripción de las Pruebas Ejecutadas")
    add_paragraph(doc, "Para garantizar una validación integral del sistema, se seleccionaron y ejecutaron 10 técnicas formales de pruebas de software:")
    
    tecnicas = [
        ("Pruebas de Integración", "Verifican el acoplamiento y flujo bidireccional entre la interfaz web, el backend Flask y la base de datos relacional MySQL (CP-001 y CP-005)."),
        ("Pruebas Funcionales", "Evalúan el éxito de los flujos de trabajo esperados según la interacción normal del usuario en el aplicativo (CP-002)."),
        ("Pruebas de Caja Negra", "Evalúan la respuesta del sistema ante entradas erróneas o malformadas sin requerir inspección del código fuente (CP-003)."),
        ("Pruebas de Seguridad", "Auditan el blindaje perimetral frente a invocaciones no autenticadas en la API y ataques de Inyección SQL (CP-004 y CP-008)."),
        ("Pruebas de Redundancia", "Comprueban el bloqueo de registros duplicados y la prevención de eventos simultáneos por doble clic (CP-006)."),
        ("Pruebas de Caja Blanca", "Verifican ramas de código condicional interno en el backend, auditando la integridad referencial al eliminar roles (CP-007)."),
        ("Pruebas de Rendimiento", "Miden la latencia de respuesta del servidor ante ráfagas secuenciales y concurrentes de solicitudes HTTP (CP-009)."),
        ("Pruebas de Usabilidad", "Verifican la ergonomía, visibilidad y comportamiento adaptativo en dispositivos móviles (CP-010).")
    ]
    for nom, desc in tecnicas:
        add_paragraph(doc, desc, bold_prefix=f"• {nom}: ")

    # 6. RESULTADOS DE LAS PRUEBAS (TABLA)
    add_heading_1(doc, "6. Resultados Detallados de las Pruebas")
    add_paragraph(doc, "A continuación se presentan los resultados consolidados de cada uno de los 10 casos de prueba ejecutados:")

    res_table = doc.add_table(rows=11, cols=5)
    res_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(res_table, color="1F4E79", sz="4")
    
    headers = ["ID", "Caso de Prueba / Técnica", "Componente", "Resultado", "Observación Técnica"]
    col_w = [Inches(0.8), Inches(1.8), Inches(1.2), Inches(1.2), Inches(1.8)]
    
    hdr_row = res_table.rows[0]
    for c_idx, h_text in enumerate(headers):
        cell = hdr_row.cells[c_idx]
        cell.width = col_w[c_idx]
        set_cell_background(cell, "1F4E79")
        set_cell_margins(cell, top=120, bottom=120, left=100, right=100)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h_text)
        r.font.name = "Arial"
        r.font.size = Pt(9)
        r.font.bold = True
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    casos_data = [
        ("CP-001", "Inicialización BD y Semilla\n(Integración)", "POST /api/setup", "Exitoso", "Creación de 13 tablas relacionales y 3 usuarios semilla encriptados."),
        ("CP-002", "Login Válido y Redirección\n(Funcional)", "login.html / API", "Exitoso", "Respuesta HTTP 200, guardado en localStorage y redirección a adminPro.html."),
        ("CP-003", "Login Credenciales Erróneas\n(Caja Negra)", "login.html / API", "Exitoso", "Respuesta HTTP 401 Unauthorized y mensaje visual de alerta."),
        ("CP-004", "Autorización en Servidor\n(Seguridad)", "/api/usuarios\n/api/roles", "Fallido\n(En seguimiento)", "Brecha: Endpoints responden 200 OK a clientes externos sin validar token."),
        ("CP-005", "Registro Dual de Clientes\n(Integración)", "registro.html\nPOST /api/clientes", "Fallido\n(Rechazado)", "Desacople: Campos documento y género se pierden por falta de columnas en BD."),
        ("CP-006", "Control Duplicados Correo\n(Redundancia)", "registro.html / API", "Exitoso", "Respuesta HTTP 409 Conflict y botón deshabilitado tras el primer clic."),
        ("CP-007", "Integridad Roles con Usuarios\n(Caja Blanca)", "DELETE /api/roles/2", "Exitoso", "Lógica condicional bloquea eliminación y responde HTTP 409 Conflict."),
        ("CP-008", "Inyección SQL en Login\n(Seguridad)", "login.html (email)", "Exitoso", "Inyección (' OR '1'='1' --) neutralizada con sentencias parametrizadas (%s)."),
        ("CP-009", "Rendimiento y Conexiones\n(Rendimiento)", "GET /api/productos", "Exitoso", "Latencia promedio 145 ms; liberación total de conexiones en MySQL."),
        ("CP-010", "Diseño Adaptativo Móvil\n(Usabilidad)", "Vista 375x667 px", "Exitoso", "Menú hamburguesa responsivo y navegación fluida sin desbordamiento.")
    ]

    for idx, (cid, cnom, ccomp, cres, cobs) in enumerate(casos_data, start=1):
        row = res_table.rows[idx]
        bg = "FFFFFF" if idx % 2 != 0 else "F9FBFD"
        
        for c_i, val in enumerate([cid, cnom, ccomp, cres, cobs]):
            c = row.cells[c_i]
            c.width = col_w[c_i]
            set_cell_background(c, bg)
            set_cell_margins(c, top=80, bottom=80, left=80, right=80)
            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            if c_i == 0:
                r.font.bold = True
                r.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
            elif c_i == 3:
                r.font.bold = True
                if "Exitoso" in val:
                    r.font.color.rgb = RGBColor(0x1E, 0x84, 0x49) # Verde
                elif "Rechazado" in val:
                    r.font.color.rgb = RGBColor(0xC0, 0x39, 0x2B) # Rojo
                else:
                    r.font.color.rgb = RGBColor(0xD3, 0x54, 0x00) # Naranja
            else:
                r.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 7. RESULTADOS CONSOLIDADOS
    add_heading_1(doc, "7. Resultados Consolidados y Métricas")
    add_paragraph(doc, "El balance cuantitativo de las pruebas sobre la versión 1.0.0 de Calcifer3D se sintetiza en los siguientes indicadores:")

    met_table = doc.add_table(rows=6, cols=2)
    met_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(met_table, color="2E75B6", sz="4")
    
    met_data = [
        ("Total de Casos de Prueba Ejecutados", "10 casos (100%)"),
        ("Pruebas Exitosas (Aprobadas)", "8 casos (80.0%)"),
        ("Pruebas en Seguimiento (Observaciones de Seguridad)", "1 caso (10.0%)"),
        ("Pruebas Fallidas / Rechazadas (Defectos Funcionales)", "1 caso (10.0%)"),
        ("Porcentaje General de Aprobación", "80.0% de Efectividad"),
        ("Total de Defectos / Incidencias Abiertas", "4 defectos (2 críticos, 1 medio, 1 alto)")
    ]

    for m_i, (k, v) in enumerate(met_data):
        row = met_table.rows[m_i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(3.5)
        c1.width = Inches(3.0)
        set_cell_background(c0, "F2F5F8")
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c0, top=90, bottom=90, left=120, right=120)
        set_cell_margins(c1, top=90, bottom=90, left=120, right=120)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k)
        r0.font.name = "Arial"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(v)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = RGBColor(0x26, 0x26, 0x26)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 8. TRAZABILIDAD
    add_heading_1(doc, "8. Matriz de Trazabilidad (Requisitos vs. Pruebas)")
    add_paragraph(doc, "La matriz de trazabilidad permite comprobar que cada Requerimiento Funcional (RF) y Requerimiento No Funcional (RNF) especificado en el diseño cuenta con validación empírica en el plan de pruebas:")

    traz_table = doc.add_table(rows=11, cols=5)
    traz_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(traz_table, color="1F4E79", sz="4")
    
    traz_headers = ["Requisito", "Descripción del Requisito", "Caso(s)", "Técnica", "Estado"]
    traz_widths = [Inches(1.0), Inches(2.3), Inches(1.0), Inches(1.2), Inches(1.0)]
    
    hdr_traz = traz_table.rows[0]
    for c_idx, h_text in enumerate(traz_headers):
        cell = hdr_traz.cells[c_idx]
        cell.width = traz_widths[c_idx]
        set_cell_background(cell, "1F4E79")
        set_cell_margins(cell, top=120, bottom=120, left=100, right=100)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h_text)
        r.font.name = "Arial"
        r.font.size = Pt(9)
        r.font.bold = True
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    traz_data = [
        ("RF-01", "Inicialización automática de BD y usuarios semilla", "CP-001", "Integración", "Conforme"),
        ("RF-02", "Autenticación de credenciales y navegación por rol", "CP-002, CP-003", "Funcional / Caja Negra", "Conforme"),
        ("RF-04", "Autorización y protección de endpoints en backend", "CP-004", "Seguridad", "No Conforme"),
        ("RF-05", "Registro dual completo de clientes con persistencia", "CP-005", "Integración", "No Conforme"),
        ("RF-06", "Gestión de roles con bloqueo por clave foránea", "CP-007", "Caja Blanca", "Conforme"),
        ("RNF-01", "Almacenamiento seguro de claves con hashing", "CP-001, CP-002", "Criptografía", "Conforme"),
        ("RNF-02", "Neutralización de ataques de inyección SQL", "CP-008", "Seguridad", "Conforme"),
        ("RNF-03", "Unicidad de correo y prevención de doble clic", "CP-006", "Redundancia", "Conforme"),
        ("RNF-04", "Rendimiento y liberación de conexiones MySQL", "CP-009", "Rendimiento", "Conforme"),
        ("RNF-05", "Diseño responsivo para visualización móvil", "CP-010", "Usabilidad", "Conforme")
    ]

    for idx, (rq, desc, cs, tec, est) in enumerate(traz_data, start=1):
        row = traz_table.rows[idx]
        bg = "FFFFFF" if idx % 2 != 0 else "F9FBFD"
        for c_i, val in enumerate([rq, desc, cs, tec, est]):
            c = row.cells[c_i]
            c.width = traz_widths[c_i]
            set_cell_background(c, bg)
            set_cell_margins(c, top=80, bottom=80, left=80, right=80)
            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            if c_i == 0:
                r.font.bold = True
                r.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
            elif c_i == 4:
                r.font.bold = True
                if val == "Conforme":
                    r.font.color.rgb = RGBColor(0x1E, 0x84, 0x49)
                else:
                    r.font.color.rgb = RGBColor(0xC0, 0x39, 0x2B)
            else:
                r.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 9. INCIDENCIAS DETECTADAS
    add_heading_1(doc, "9. Incidencias Detectadas (Defectos / Bugs)")
    add_paragraph(doc, "Durante las pruebas se aislaron 4 incidencias técnicas que requieren intervención previa al pase a producción:")

    bugs = [
        ("BUG-001 (DEF-004)", "Ausencia de Verificación de Sesión en Endpoints de la API", "Alta", "En proceso", "backend_python/users_roles.py", "Peticiones directas GET y POST a /api/usuarios y /api/roles responden HTTP 200 sin exigir token o cookie de sesión válida. Permite a clientes externos consultar usuarios sin autenticación."),
        ("BUG-002 (DEF-005)", "Pérdida de Datos en Registro de Clientes por Desacople de Esquema", "Alta", "Pendiente", "registro.js / database/calcifer3d.sql", "El formulario de registro captura documento, tipo_documento y género; sin embargo, la tabla clientes carece de estas columnas en MySQL. El backend descarta los datos silenciosamente al insertar."),
        ("BUG-003 (DEF-011)", "Desconexión entre Vista de Catálogo y Endpoint de Productos", "Media", "Pendiente", "produtos.html / produtos-content.js", "El backend dispone del endpoint operativo GET /api/productos, pero la interfaz utiliza tarjetas fijas en memoria JavaScript en lugar de consumir los datos dinámicos mediante fetch()."),
        ("BUG-004 (DEF-012)", "Paneles de Vendedor y Contador con Métricas Simuladas en Memoria", "Alta", "Pendiente", "vendedor.js / contador.js", "Las tablas operativas de pedidos y balances contables no realizan persistencia transaccional contra la base de datos MySQL, operando como maquetas locales en memoria.")
    ]

    for bid, bname, bsev, bsta, bmod, bdesc in bugs:
        add_callout(doc, 
            f"Módulo Afectado: {bmod}\n"
            f"Severidad: {bsev} | Estado: {bsta}\n"
            f"Descripción: {bdesc}",
            title=f"{bid}: {bname}"
        )

    # 10. ACCIONES CORRECTIVAS
    add_heading_1(doc, "10. Acciones Correctivas")
    add_paragraph(doc, "Para corregir las incidencias detectadas, se establece el siguiente plan de remediación técnica:")
    add_paragraph(doc, "Implementar un decorador en Flask (@requiere_autenticacion y @requiere_rol('Administrador')) que inspeccione el token en las cabeceras HTTP antes de permitir el acceso a las funciones CRUD de usuarios y roles.", bold_prefix="1. Blindaje de Endpoints Administrativos: ")
    add_paragraph(doc, "Ejecutar la sentencia ALTER TABLE clientes ADD COLUMN documento VARCHAR(20), ADD COLUMN tipo_documento VARCHAR(10), ADD COLUMN genero VARCHAR(20); y actualizar la función de registro en users_roles.py.", bold_prefix="2. Migración del Esquema de la Tabla Clientes: ")
    add_paragraph(doc, "Refactorizar js/content/produtos-content.js para reemplazar el arreglo estático por una llamada asíncrona fetch('/api/productos'), renderizando dinámicamente las tarjetas según el stock real de MySQL.", bold_prefix="3. Conexión Dinámica del Catálogo de Productos: ")
    add_paragraph(doc, "Desarrollar los endpoints REST transaccionales para compras, ventas y balances contables, vinculándolos a las entidades ventas y gastos en la base de datos.", bold_prefix="4. Persistencia en Paneles de Vendedor y Contador: ")
    add_paragraph(doc, "Ejecutar una ronda completa de pruebas de regresión sobre los casos CP-004 y CP-005 una vez desplegados los parches para certificar la no regresión del sistema.", bold_prefix="5. Reejecución de Pruebas de Regresión: ")

    # 11. EVIDENCIAS
    add_heading_1(doc, "11. Registro de Evidencias")
    add_paragraph(doc, "Las evidencias documentales y capturas de pantalla de los ensayos de laboratorio se organizaron en el repositorio del proyecto:")
    
    evidencias = [
        ("CP-001", "setup_exitoso_001.png", "Creación de tablas relacionales en phpMyAdmin y respuesta JSON 200 en Postman."),
        ("CP-002", "login_exitoso_002.png", "Persistencia del objeto user en localStorage e inicio de sesión verificado en DevTools."),
        ("CP-003", "login_invalido_003.png", "Respuesta HTTP 401 en la pestaña Network y mensaje de advertencia al usuario."),
        ("CP-004", "acceso_api_sin_token_004.png", "Petición externa en Postman sin cabecera Authorization retornando código 200."),
        ("CP-005", "registro_cliente_brecha_005.png", "Comparación entre el payload JSON enviado y los campos ausentes en tabla clientes."),
        ("CP-006", "bloqueo_duplicado_006.png", "Respuesta HTTP 409 Conflict y botón Registrarse deshabilitado tras el clic."),
        ("CP-007", "integridad_roles_007.png", "Respuesta HTTP 409 en Postman al intentar eliminar un rol con clave foránea activa."),
        ("CP-008", "inyeccion_sql_bloqueada_008.png", "Neutralización de payload SQL (' OR '1'='1') procesado como cadena inofensiva."),
        ("CP-009", "reporte_carga_local_009.png", "Gráfica de tiempos de respuesta (< 300 ms) y consulta SHOW STATUS LIKE 'Threads_connected'."),
        ("CP-010", "menu_movil_responsive_010.png", "Despliegue interactivo del menú hamburguesa en emulador iPhone SE (375x667 px).")
    ]
    for cid, img, desc in evidencias:
        add_paragraph(doc, f"{img} — {desc}", bold_prefix=f"• Evidencia {cid}: ")

    # 12. CONCLUSIONES
    add_heading_1(doc, "12. Conclusiones")
    add_paragraph(doc, "La plataforma web Calcifer3D demostró una estabilidad satisfactoria en sus funciones centrales (inicialización, hashing de claves, mitigación de inyección SQL, control de duplicados y diseño adaptativo), logrando un 80% de casos aprobados.", bold_prefix="1. Madurez Funcional Aceptable: ")
    add_paragraph(doc, "La adopción de Werkzeug PBKDF2/scrypt y el uso riguroso de consultas preparadas (%s) protegen la base de datos contra los vectores de ataque más habituales (OWASP Top 10).", bold_prefix="2. Solidez en Criptografía y Base de Datos: ")
    add_paragraph(doc, "El reporte de pruebas cumplió su cometido esencial: aislar vulnerabilidades en la protección de endpoints y desacoples en el modelo relacional antes de que impacten a usuarios reales en un entorno productivo.", bold_prefix="3. Relevancia del Ciclo de QA: ")
    add_paragraph(doc, "El cruce sistemático entre requerimientos y casos de prueba garantizó una cobertura completa del software y aportó claridad técnica sobre las tareas prioritarias del equipo de desarrollo.", bold_prefix="4. Valor de la Trazabilidad: ")

    # 13. RECOMENDACIONES
    add_heading_1(doc, "13. Recomendaciones")
    add_paragraph(doc, "Diseñar scripts en pytest y requests para ejecutar la suite de casos de prueba de forma automatizada en cada commit de Git.", bold_prefix="1. Automatización de Pruebas: ")
    add_paragraph(doc, "Migrar la sesión basada en localStorage hacia tokens JWT almacenados en cookies HttpOnly y SameSite=Lax para prevenir ataques XSS.", bold_prefix="2. Implementación de Tokens JWT: ")
    add_paragraph(doc, "Incorporar un archivo de migraciones (p. ej. Flask-Migrate / Alembic) para versionar los cambios del esquema relacional de MySQL.", bold_prefix="3. Control de Migraciones de Base de Datos: ")
    add_paragraph(doc, "Alinear la interfaz de catálogo con el backend mediante fetch asíncrono para garantizar que el stock refleje fielmente la base de datos.", bold_prefix="4. Conexión de Vistas Dinámicas: ")

    # 14. APROBACIÓN
    add_heading_1(doc, "14. Aprobación y Firmas")
    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    
    firma_table = doc.add_table(rows=2, cols=2)
    firma_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(firma_table, color="B0C4DE", sz="4")
    
    row0 = firma_table.rows[0]
    row0.cells[0].width = Inches(3.2)
    row0.cells[1].width = Inches(3.2)
    set_cell_background(row0.cells[0], "F2F5F8")
    set_cell_background(row0.cells[1], "F2F5F8")
    set_cell_margins(row0.cells[0], top=100, bottom=100, left=120, right=120)
    set_cell_margins(row0.cells[1], top=100, bottom=100, left=120, right=120)
    
    p_f0 = row0.cells[0].paragraphs[0]
    p_f0.paragraph_format.space_after = Pt(0)
    r_f0 = p_f0.add_run("Líder de Pruebas / Aprendiz ADSO")
    r_f0.font.name = "Arial"
    r_f0.font.size = Pt(9.5)
    r_f0.font.bold = True
    r_f0.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    
    p_f1 = row0.cells[1].paragraphs[0]
    p_f1.paragraph_format.space_after = Pt(0)
    r_f1 = p_f1.add_run("Instructor Técnico de Software SENA")
    r_f1.font.name = "Arial"
    r_f1.font.size = Pt(9.5)
    r_f1.font.bold = True
    r_f1.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)
    
    row1 = firma_table.rows[1]
    row1.cells[0].width = Inches(3.2)
    row1.cells[1].width = Inches(3.2)
    set_cell_margins(row1.cells[0], top=140, bottom=140, left=120, right=120)
    set_cell_margins(row1.cells[1], top=140, bottom=140, left=120, right=120)
    
    p_s0 = row1.cells[0].paragraphs[0]
    p_s0.paragraph_format.space_after = Pt(0)
    p_s0.add_run("Nombre: [Nombre del Aprendiz]\nFirma: _________________________\nFecha: 24/03/2026")
    
    p_s1 = row1.cells[1].paragraphs[0]
    p_s1.paragraph_format.space_after = Pt(0)
    p_s1.add_run("Nombre: [Nombre del Instructor]\nFirma: _________________________\nFecha: [DD/MM/AAAA]")

    doc.save(output_path)
    print(f"Documento creado exitosamente en: {output_path}")

if __name__ == "__main__":
    out_file = Path(__file__).resolve().parent / "REPORTE_DE_PRUEBAS_EJECUTADAS_CALCIFER3D.docx"
    create_report_docx(str(out_file))
