(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<div class="dashboard">

    <!-- Sidebar -->
    <aside class="sidebar">
    <div class="profile-box">
        <h2 class="brand">Calcifer 3D</h2>

         <div class="profile-img">
            <img src="img/contador.jpg" alt="Foto Contador">
        </div>

        <h3 class="profile-name">Carlos Mendoza</h3>
        <p class="profile-role">Contador</p>
    </div>

        <ul class="menu">
            <li class="active" data-view="dashboard">📊 Dashboard</li>
            <li data-view="ventas">📈 Registro de Ventas</li>
            <li data-view="productos">📦 Inventario</li>
            <li data-view="contable">🧾 Registro Contable</li>
            <li data-view="reportes">📊 Reportes Financieros</li>
            <li class="logout" onclick="logout()">🚪 Cerrar Sesión</li>
        </ul>
    </aside>

    <!-- Contenido -->
    <main class="content">

        <!-- Vista Dashboard -->
<section id="dashboard" class="view active-view">
    <h1>Panel Financiero Ejecutivo</h1>

    <!-- KPIs PRINCIPALES -->
    <div class="kpi-grid">

        <div class="kpi-card">
            <h3>Ventas del Mes</h3>
            <p>$16,800,000</p>
            <span class="kpi-sub">+8% vs mes anterior</span>
        </div>

        <div class="kpi-card">
            <h3>Ingresos Totales</h3>
            <p>$185,400,000</p>
            <span class="kpi-sub">Acumulado 2026</span>
        </div>

        <div class="kpi-card egreso">
            <h3>Egresos Totales</h3>
            <p>$121,850,000</p>
            <span class="kpi-sub">Costos + Operativos</span>
        </div>

        <div class="kpi-card utilidad">
            <h3>Utilidad Neta</h3>
            <p>$63,550,000</p>
            <span class="kpi-sub">Margen 34%</span>
        </div>

    </div>

    <!-- RESUMEN CONTABLE -->
    <div class="resumen-dashboard">

        <div class="resumen-box">
            <h2>Estado Actual de Caja</h2>
            <p class="big-number">$42,100,000</p>
            <span>Disponible después de egresos</span>
        </div>

        <div class="resumen-box">
            <h2>Inventario Disponible</h2>
            <p class="big-number">86 Productos</p>
            <span>Stock general en bodega</span>
        </div>

        <div class="resumen-box">
            <h2>Ventas Punto Físico</h2>
            <p class="big-number">$6,250,000</p>
            <span>Ingresos registrados externos</span>
        </div>

    </div>

    <!-- INDICADORES VISUALES -->
    <div class="indicadores-dashboard">

        <div class="indicador-card">
            <h4>Margen de Rentabilidad</h4>
            <div class="barra">
                <div class="progreso" style="width:34%"></div>
            </div>
            <span>34%</span>
        </div>

        <div class="indicador-card">
            <h4>Crecimiento Mensual</h4>
            <div class="barra">
                <div class="progreso verde" style="width:18%"></div>
            </div>
            <span>18%</span>
        </div>

        <div class="indicador-card">
            <h4>Nivel de Gastos</h4>
            <div class="barra">
                <div class="progreso rojo" style="width:66%"></div>
            </div>
            <span>66% del ingreso</span>
        </div>

    </div>

</section>

        <!-- Registro Ventas -->
<section id="ventas" class="view">
    <h1>Registro de Ventas</h1>

    <!-- FORMULARIO VENTA EXTERNA -->
    <div class="venta-form-container">
        <h3>Registrar Venta Externa (Punto Físico)</h3>

        <form id="ventaExternaForm" class="venta-form">
            <input type="date" id="fechaVenta" required>
            <input type="text" id="clienteVenta" placeholder="Nombre del Cliente" required>
            <input type="text" id="conceptoVenta" placeholder="Concepto / Producto" required>
            <input type="number" id="montoVenta" placeholder="Monto $" required>
            <select id="metodoPago">
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
            </select>

            <button type="submit" class="btn">Registrar Venta</button>
        </form>
    </div>

    <!-- TABLA -->
    <div class="tabla-container">
        <table id="tablaVentas">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Concepto</th>
                    <th>Método</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>23/02/2026</td>
                    <td>Juan Pérez</td>
                    <td>Impresión 3D personalizada</td>
                    <td>Efectivo</td>
                    <td>$1,200,000</td>
                </tr>
                <tr>
                    <td>21/02/2026</td>
                    <td>María Gómez</td>
                    <td>Filamento PLA</td>
                    <td>Transferencia</td>
                    <td>$850,000</td>
                </tr>
                <tr>
                    <td>18/02/2026</td>
                    <td>Empresa XYZ</td>
                    <td>Servicio prototipo</td>
                    <td>Tarjeta</td>
                    <td>$2,400,000</td>
                </tr>
                <tr>
                    <td>15/02/2026</td>
                    <td>Carlos Ruiz</td>
                    <td>Diseño 3D</td>
                    <td>Efectivo</td>
                    <td>$600,000</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

        <!-- Productos -->
        <section id="productos" class="view">
    <h1>Consultar y editar Productos</h1>

    <div class="inventario-tools">
        <input type="search" id="buscarInventario" placeholder="Buscar por nombre, marca, color o ubicacion">
        <span id="resultadoInventario" class="inventario-resultado"></span>
    </div>

    <div class="tabla-container">
        <table id="tablaProductos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Color</th>
                    <th>Stock</th>
                    <th>Precio Compra</th>
                    <th>Precio Venta</th>
                    <th>Ubicación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Filamento PLA 1KG</td>
                    <td>eSun</td>
                    <td>Negro</td>
                    <td>25</td>
                    <td>$45,000</td>
                    <td>$65,000</td>
                    <td>Bodega A1</td>
                    <td>
                        <button class="btn-ver">Ver</button>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
                <tr>
                    <td>Resina 8K Gris</td>
                    <td>Elegoo</td>
                    <td>Gris</td>
                    <td>12</td>
                    <td>$180,000</td>
                    <td>$230,000</td>
                    <td>Bodega B2</td>
                    <td>
                        <button class="btn-ver">Ver</button>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
                <tr>
                    <td>Anycubic Photon Mono 6K</td>
                    <td>Anycubic</td>
                    <td>Negro</td>
                    <td>3</td>
                    <td>$1,200,000</td>
                    <td>$1,450,000</td>
                    <td>Exhibición</td>
                    <td>
                        <button class="btn-ver">Ver</button>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
                <tr>
                    <td>Kit Lavado y Curado</td>
                    <td>Elegoo</td>
                    <td>Blanco</td>
                    <td>6</td>
                    <td>$650,000</td>
                    <td>$780,000</td>
                    <td>Bodega C3</td>
                    <td>
                        <button class="btn-ver">Ver</button>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
                <tr>
                    <td>Boquilla 0.4mm</td>
                    <td>Creality</td>
                    <td>Dorado</td>
                    <td>40</td>
                    <td>$5,000</td>
                    <td>$12,000</td>
                    <td>Caja Herramientas</td>
                    <td>
                        <button class="btn-ver">Ver</button>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</section>



        <!-- Registro Contable -->
<section id="contable" class="view">
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
        <table id="tablaContable">
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
                    <td>Ingreso</td>
                    <td>Venta Punto Físico</td>
                    <td>$1,200,000</td>
                    <td>-</td>
                    <td>$1,200,000</td>
                </tr>
                <tr>
                    <td>03/02/2026</td>
                    <td>Egreso</td>
                    <td>Compra Resina Elegoo</td>
                    <td>-</td>
                    <td>$850,000</td>
                    <td>$350,000</td>
                </tr>
                <tr>
                    <td>05/02/2026</td>
                    <td>Ingreso</td>
                    <td>Servicio Diseño 3D</td>
                    <td>$900,000</td>
                    <td>-</td>
                    <td>$1,250,000</td>
                </tr>
                <tr>
                    <td>08/02/2026</td>
                    <td>Egreso</td>
                    <td>Pago Arriendo</td>
                    <td>-</td>
                    <td>$1,000,000</td>
                    <td>$250,000</td>
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

        <!-- Reportes Financieros -->
<section id="reportes" class="view">
    <h1>Reportes Financieros</h1>

    <!-- RESUMEN GENERAL -->
    <div class="resumen-reportes">
        <div class="card-reporte">
            <h3>Ingresos Anuales</h3>
            <p>$185,400,000</p>
        </div>
        <div class="card-reporte">
            <h3>Egresos Anuales</h3>
            <p>$121,850,000</p>
        </div>
        <div class="card-reporte utilidad">
            <h3>Utilidad Neta</h3>
            <p>$63,550,000</p>
        </div>
    </div>

    <!-- ESTADO DE RESULTADOS -->
    <div class="tabla-container">
        <h2>Estado de Resultados - 2026</h2>
        <table>
            <tbody>
                <tr>
                    <td>Ventas Totales</td>
                    <td>$185,400,000</td>
                </tr>
                <tr>
                    <td>Costo de Ventas</td>
                    <td>$98,000,000</td>
                </tr>
                <tr>
                    <td><strong>Utilidad Bruta</strong></td>
                    <td><strong>$87,400,000</strong></td>
                </tr>
                <tr>
                    <td>Gastos Operativos</td>
                    <td>$45,300,000</td>
                </tr>
                <tr>
                    <td><strong>Utilidad Operativa</strong></td>
                    <td><strong>$42,100,000</strong></td>
                </tr>
                <tr>
                    <td>Impuestos</td>
                    <td>$10,500,000</td>
                </tr>
                <tr>
                    <td><strong>Utilidad Neta</strong></td>
                    <td><strong>$31,600,000</strong></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- TABLA MENSUAL -->
    <div class="tabla-container">
        <h2>Comparativo Mensual</h2>
        <table>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Ingresos</th>
                    <th>Egresos</th>
                    <th>Utilidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Enero</td>
                    <td>$14,500,000</td>
                    <td>$9,200,000</td>
                    <td>$5,300,000</td>
                </tr>
                <tr>
                    <td>Febrero</td>
                    <td>$16,800,000</td>
                    <td>$10,500,000</td>
                    <td>$6,300,000</td>
                </tr>
                <tr>
                    <td>Marzo</td>
                    <td>$18,200,000</td>
                    <td>$11,400,000</td>
                    <td>$6,800,000</td>
                </tr>
                <tr>
                    <td>Abril</td>
                    <td>$19,000,000</td>
                    <td>$12,100,000</td>
                    <td>$6,900,000</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- INDICADORES -->
    <div class="indicadores">
        <div class="indicador">
            <h4>Margen de Ganancia</h4>
            <div class="barra">
                <div class="progreso" style="width: 34%;"></div>
            </div>
            <span>34%</span>
        </div>

        <div class="indicador">
            <h4>Crecimiento Anual</h4>
            <div class="barra">
                <div class="progreso verde" style="width: 18%;"></div>
            </div>
            <span>18%</span>
        </div>
    </div>

    <div class="acciones-reportes">
        <button class="btn">Descargar Reporte PDF</button>
    </div>
</section>

    </main>

</div>
</div>`;
})();
