(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<div class="admin-container">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="profile-box">
    <h2 class="brand">Calcifer 3D</h2>

    <div class="profile-img">
        <img src="img/administrador.webp" alt="Foto Contador">
    </div>

    <h3 class="profile-name">Carlos Beltran</h3>
    <p class="profile-role">Administrador</p>
</div>
        <ul class="menu">

    <li class="active" data-section="dashboard">
        <i class="fas fa-chart-line"></i>
        <span>Dashboard</span>
    </li>

    <li data-section="inventario">
        <i class="fas fa-boxes"></i>
        <span>Inventario</span>
    </li>

    <li data-section="usuarios">
        <i class="fas fa-users"></i>
        <span>Gestión de Usuarios</span>
    </li>

    <li data-section="roles">
        <i class="fas fa-user-shield"></i>
        <span>Roles</span>
    </li>

    <li data-section="registro-contable">
        <i class="fas fa-file-invoice-dollar"></i>
        <span>Registro Contable</span>
    </li>

    <li data-section="reportes">
        <i class="fas fa-chart-pie"></i>
        <span>Reportes</span>
    </li>

    <li data-section="configuracion">
        <i class="fas fa-cog"></i>
        <span>Configuración</span>
    </li>

    <li class="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar Sesión</span>
    </li>

</ul>
    </aside>

    <!-- MAIN -->
    <main class="main-content">

<section id="dashboard" class="content-section active-section">
    <div class="dashboard-header">
    <div>
        <h2>Panel Ejecutivo</h2>
        <p>Resumen general del sistema Calcifer 3D</p>
    </div>

    <div class="dashboard-date">
        <strong>Hoy:</strong> 24 Febrero 2026
    </div>
</div>
<div class="dashboard-kpis">
    <div class="kpi-card">
        <span>Ingresos Totales</span>
        <h3>$18,750,000</h3>
        <p class="positive">+12% este mes</p>
    </div>

    <div class="kpi-card">
        <span>Gastos Totales</span>
        <h3>$9,320,000</h3>
        <p class="negative">+4% este mes</p>
    </div>

    <div class="kpi-card">
        <span>Utilidad Neta</span>
        <h3>$9,430,000</h3>
        <p class="positive">Margen saludable</p>
    </div>

    <div class="kpi-card">
        <span>Productos en Inventario</span>
        <h3>142</h3>
        <p>12 con stock bajo</p>
    </div>
</div>
<div class="dashboard-grid">

    <!-- Últimos Movimientos -->
    <div class="dashboard-card">
        <h3>Últimos Movimientos Contables</h3>

        <ul class="activity-list">
            <li>
                <span>Venta Punto Físico</span>
                <strong class="positive">+$1,200,000</strong>
            </li>
            <li>
                <span>Compra Resina Elegoo</span>
                <strong class="negative">-$850,000</strong>
            </li>
            <li>
                <span>Servicio Diseño 3D</span>
                <strong class="positive">+$900,000</strong>
            </li>
        </ul>
    </div>

    <!-- Estado del Sistema -->
    <div class="dashboard-card">
        <h3>Estado del Sistema</h3>

        <ul class="system-status">
            <li>✔ Base de datos conectada</li>
            <li>✔ Último respaldo: 22/02/2026</li>
            <li>✔ Servidor activo</li>
            <li>⚠ 12 productos con stock bajo</li>
        </ul>
    </div>

</div>
<div class="dashboard-card">
    <h3>Resumen de Usuarios</h3>

    <div class="users-summary">
        <div>
            <h4>3</h4>
            <span>Administradores</span>
        </div>
        <div>
            <h4>8</h4>
            <span>Vendedores</span>
        </div>
        <div>
            <h4>124</h4>
            <span>Clientes Registrados</span>
        </div>
    </div>
</div>


</section>

        <section id="inventario" class="content-section">
    <div class="section-header">
        <h2>Inventario</h2>
        <button class="btn-primary">+ Agregar producto</button>
    </div>

    <div class="section-filters">
        <input type="text" placeholder="Buscar producto...">
        <select>
            <option>Todas las categorías</option>
            <option>Periféricos</option>
            <option>Componentes</option>
        </select>
        
    </div>

    <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="inventarioTableBody">
            <tr>
                <td>001</td>
                <td>Resina Anycubic</td>
                <td>Resinas</td>
                <td>25</td>
                <td>$80.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>002</td>
                <td>Anycubic M7 PRO</td>
                <td>Maquinas</td>
                <td>25</td>
                <td>$5.850.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>003</td>
                <td>Elegoo Mars 5 Ultra</td>
                <td>Maquinas</td>
                <td>25</td>
                <td>$3.000.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>004</td>
                <td>Vallejo Primer</td>
                <td>Pinturas</td>
                <td>25</td>
                <td>$180.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>005</td>
                <td>Filtro de Aire Anycubic</td>
                <td>Accesorios</td>
                <td>25</td>
                <td>$145.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>006</td>
                <td>Lampara de luz UV</td>
                <td>Accesorios</td>
                <td>25</td>
                <td>$100.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>007</td>
                <td>Resina de componente</td>
                <td>Resinas</td>
                <td>25</td>
                <td>$120.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>008</td>
                <td>Lamina Fep</td>
                <td>Consumibles</td>
                <td>25</td>
                <td>$50.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>009</td>
                <td>Resina Sunlu Standard</td>
                <td>resinas</td>
                <td>25</td>
                <td>$70.000</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</section>

        <section id="usuarios" class="content-section">
    <div class="section-header">
        <h2>Gestión de Usuarios</h2>
        <button id="addUserButton" class="btn-primary">+ Agregar usuario</button>
    </div>

    <form id="userForm" class="config-card user-form">
        <h3 id="userFormTitle">Crear usuario</h3>
        <input type="hidden" id="userId">

        <div class="form-grid">
            <div>
                <label for="userName">Nombre completo</label>
                <input type="text" id="userName" maxlength="150" required>
            </div>

            <div>
                <label for="userEmail">Correo</label>
                <input type="email" id="userEmail" maxlength="150" required>
            </div>

            <div>
                <label for="userPassword">Contrasena</label>
                <input type="password" id="userPassword" placeholder="Obligatoria al crear">
            </div>

            <div>
                <label for="userRole">Rol</label>
                <select id="userRole" required>
                    <option value="">Selecciona un rol</option>
                </select>
            </div>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn-primary" id="userSubmitButton">Guardar usuario</button>
            <button type="button" class="btn-secondary" id="userCancelButton">Cancelar</button>
        </div>

        <p class="form-message" id="userMessage"></p>
    </form>

    <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="usuariosTableBody">
            <tr>
                <td>01</td>
                <td>Juan Pérez</td>
                <td>juan@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>02</td>
                <td>Miguel Angel Rodriguez Ocampo</td>
                <td>miguel@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>03</td>
                <td>Danilo Andrés Sánchez Sánchez</td>
                <td>Danilo@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>04</td>
                <td>Sebastian De Avila Mora</td>
                <td>Sebastian@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>05</td>
                <td>Franky Michael Prada Medina</td>
                <td>Franky@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>06</td>
                <td>Heidy Lizeth Ortegon Aristizabal</td>
                <td>Heidy@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>07</td>
                <td>Carlos Arturo Rodriguez Ocampo</td>
                <td>Carlos@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>08</td>
                <td>Daniela Beltran Sarta</td>
                <td>Daniela@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
                        <tr>
                <td>09</td>
                <td>Jenny Paola Galindo Mesa</td>
                <td>Jenny@email.com</td>
                <td>
                    <select>
                        <option>Administrador</option>
                        <option>Empleado</option>
                        <option>Cliente</option>
                    </select>
                </td>
                <td>Activo</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>

        </tbody>
    </table>
</section>

        <section id="roles" class="content-section">
    <div class="section-header">
        <h2>Gestion de Roles</h2>
    </div>

    <div class="roles-layout">
        <form id="roleForm" class="config-card role-form">
            <h3 id="roleFormTitle">Crear rol</h3>
            <input type="hidden" id="roleId">

            <div class="form-grid">
                <div>
                    <label for="roleName">Nombre del rol</label>
                    <input type="text" id="roleName" placeholder="Ej: Soporte" maxlength="50" required>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary" id="roleSubmitButton">Guardar rol</button>
                <button type="button" class="btn-secondary" id="roleCancelButton">Cancelar</button>
            </div>

            <p class="form-message" id="roleMessage"></p>
        </form>

        <div class="roles-table-panel">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rol</th>
                        <th>Usuarios asignados</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="rolesTableBody">
                    <tr>
                        <td colspan="4">Cargando roles...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

        <section id="registro-contable" class="content-section">
    <h1>Registro Contable</h1>

    <!-- RESUMEN -->
    <div class="resumen-contable">
        <div class="card-resumen">
            <h3>Ingresos del Mes</h3>
            <p id="totalIngresos">$6,250,000</p>
        </div>

        <div class="card-resumen">
            <h3>Egresos del Mes</h3>
            <p id="totalEgresos">$3,480,000</p>
        </div>

        <div class="card-resumen utilidad">
            <h3>Utilidad</h3>
            <p id="totalUtilidad">$2,770,000</p>
        </div>
    </div>

    <!-- FILTRO -->
    <div class="filtro-fecha">
        <label>Desde:</label>
        <input type="date" id="fechaDesde">

        <label>Hasta:</label>
        <input type="date" id="fechaHasta">

        <button class="btn">Filtrar</button>
    </div>

    <!-- TABLA CONTABLE -->
    <div class="tabla-container">
        <table class="admin-table contable-table">
    <thead>
        <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Concepto</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>Saldo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>01/02/2026</td>
            <td class="ingreso">Ingreso</td>
            <td>Venta Punto Físico</td>
            <td>$1,200,000</td>
            <td>-</td>
            <td class="saldo positivo">$1,200,000</td>
        </tr>
        <tr>
            <td>03/02/2026</td>
            <td class="egreso">Egreso</td>
            <td>Compra Resina Elegoo</td>
            <td>-</td>
            <td>$850,000</td>
            <td class="saldo positivo">$350,000</td>
        </tr>
    </tbody>
</table>
    </div>

    <!-- BOTONES -->
    <div class="acciones-contables">
        <button class="btn">Descargar PDF</button>
        <button class="btn-secundario">Exportar Excel</button>
    </div>

</section>

<section id="reportes" class="content-section">
 <div class="report-header">
    <h2>Reportes Financieros</h2>

    <div class="report-filters">
        <select>
            <option>Este Mes</option>
            <option>Mes Anterior</option>
            <option>Este Año</option>
            <option>Personalizado</option>
        </select>

        <button class="btn-primary">Generar Reporte</button>
    </div>
</div>

<div class="report-kpis">
    <div class="kpi-card">
        <span>Ventas Totales</span>
        <h3>$18,750,000</h3>
        <p class="positive">+12% vs mes anterior</p>
    </div>

    <div class="kpi-card">
        <span>Gastos Operativos</span>
        <h3>$9,320,000</h3>
        <p class="negative">+4% vs mes anterior</p>
    </div>

    <div class="kpi-card">
        <span>Utilidad Neta</span>
        <h3>$9,430,000</h3>
        <p class="positive">+18% crecimiento</p>
    </div>

    <div class="kpi-card">
        <span>Margen de Ganancia</span>
        <h3>50.3%</h3>
        <p class="positive">Salud financiera estable</p>
    </div>
</div>

<div class="estado-resultados">
    <h3>Estado de Resultados</h3>

    <table class="admin-table">
        <tbody>
            <tr>
                <td>Ingresos por Ventas</td>
                <td class="text-right">$18,750,000</td>
            </tr>
            <tr>
                <td>Costos de Producción</td>
                <td class="text-right">$6,500,000</td>
            </tr>
            <tr class="subtotal">
                <td>Utilidad Bruta</td>
                <td class="text-right">$12,250,000</td>
            </tr>
            <tr>
                <td>Gastos Operativos</td>
                <td class="text-right">$9,320,000</td>
            </tr>
            <tr class="total">
                <td>Utilidad Neta</td>
                <td class="text-right">$2,930,000</td>
            </tr>
        </tbody>
    </table>
</div>

</section>
<section id="configuracion" class="content-section">
<div class="config-card">
    <h3>Información de la Empresa</h3>

    <div class="form-grid">
        <div>
            <label>Nombre Comercial</label>
            <input type="text" value="Calcifer 3D">
        </div>

        <div>
            <label>NIT</label>
            <input type="text" value="900.456.789-1">
        </div>

        <div>
            <label>Correo Corporativo</label>
            <input type="email" value="info@calcifer3d.com">
        </div>

        <div>
            <label>Teléfono</label>
            <input type="text" value="+57 310 555 8844">
        </div>

        <div class="full">
            <label>Dirección</label>
            <input type="text" value="Bogotá, Colombia">
        </div>
    </div>

    <button class="btn-primary">Guardar Cambios</button>
</div>
<div class="config-card">
    <h3>Perfil del Administrador</h3>

    <div class="form-grid">
        <div>
            <label>Nombre</label>
            <input type="text" value="Carlos Beltran">
        </div>

        <div>
            <label>Correo</label>
            <input type="email" value="admin@calcifer3d.com">
        </div>

        <div>
            <label>Nueva Contraseña</label>
            <input type="password" placeholder="********">
        </div>
    </div>

    <button class="btn-primary">Actualizar Perfil</button>
</div>
<div class="config-card">
    <h3>Personalización del Sistema</h3>

    <div class="form-grid">
        <div>
            <label>Color Principal</label>
            <input type="color" value="#ff4d00">
        </div>

        <div>
            <label>Modo del Sistema</label>
            <select>
                <option>Modo Oscuro</option>
                <option>Modo Claro</option>
            </select>
        </div>

        <div>
            <label>Logo Corporativo</label>
            <input type="file">
        </div>
    </div>

    <button class="btn-primary">Aplicar Cambios</button>
</div>
<div class="config-card">
    <h3>Parámetros Financieros</h3>

    <div class="form-grid">
        <div>
            <label>Moneda</label>
            <select>
                <option>Pesos Colombianos (COP)</option>
                <option>Dólares (USD)</option>
            </select>
        </div>

        <div>
            <label>IVA (%)</label>
            <input type="number" value="19">
        </div>

        <div>
            <label>Margen Mínimo (%)</label>
            <input type="number" value="25">
        </div>
    </div>

    <button class="btn-primary">Guardar Configuración</button>
</div>
<div class="config-card">
    <h3>Seguridad</h3>

    <div class="toggle-group">
        <label>
            <input type="checkbox" checked>
            Activar autenticación en dos pasos
        </label>

        <label>
            <input type="checkbox" checked>
            Cerrar sesión automática tras 30 minutos
        </label>

        <label>
            <input type="checkbox">
            Notificar intentos fallidos
        </label>
    </div>

    <button class="btn-danger">Cerrar Todas las Sesiones</button>
</div>
<div class="config-card">
    <h3>Respaldo y Sistema</h3>

    <div class="backup-actions">
        <button class="btn-secondary">Crear Backup</button>
        <button class="btn-secondary">Restaurar Backup</button>
        <button class="btn-danger">Restablecer Sistema</button>
    </div>

    <p class="system-info">
        Versión del Sistema: v2.1.0 <br>
        Último Respaldo: 22/02/2026
    </p>
</div>

</section>

    </main>
</div>`;
})();
