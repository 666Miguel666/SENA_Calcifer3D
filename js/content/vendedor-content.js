(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<div class="container">

    <!-- SIDEBAR -->
    <aside class="sidebar" id="sidebar">
        <div class="logo">
            <h2>Calcifer 3D</h2>
            
        </div>
            <div class="user-profile">
                 <img src="https://i.pravatar.cc/100?img=12" alt="Perfil">
                    <h4>Juan Rodríguez</h4>
                    <span>Vendedor</span>
            </div>
        

        <ul class="menu">
            <li class="active" data-section="dashboard">
                <i class="fas fa-chart-line"></i><span>Dashboard</span>
            </li>
            <li data-section="consultar-productos">
                <i class="fas fa-search"></i><span>Consultar Productos</span>
            </li>
            <li data-section="reporte-ventas">
                <i class="fas fa-file-invoice"></i><span>Reporte de Ventas</span>
            </li>
            <li data-section="chat">
                <i class="fas fa-comments"></i><span>Chat Clientes</span>
            </li>
            <li data-section="pedidos">
                <i class="fas fa-shopping-cart"></i><span>Gestión Pedidos</span>
            </li>
            <li class="logout">
                <i class="fas fa-sign-out-alt"></i><span>Cerrar Sesión</span>
            </li>
        </ul>
    </aside>

    <!-- MAIN -->
    <main class="main-content">

       
        <!-- DASHBOARD -->
        <section id="dashboard" class="content-section dashboard-container active-section">

        <h1 class="dashboard-title">Panel de Vendedor</h1>

        <!-- RESUMEN -->
        <div class="dashboard-cards">

        <div class="card">
            <h3>Total Productos</h3>
            <p id="totalProductos">0</p>
        </div>

        <div class="card warning">
            <h3>Stock Bajo</h3>
            <p id="stockBajo">0</p>
        </div>

        <div class="card success">
            <h3>Ventas del Mes</h3>
            <p id="ventasMes">0</p>
        </div>

        <div class="card income">
            <h3>Ingresos Estimados</h3>
            <p id="ingresos">$0</p>
        </div>

    </div>

    <!-- TABLA PRODUCTOS -->
    <div class="dashboard-table">
        <h2>Últimos Productos</h2>

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Stock</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody id="tablaProductos">
            </tbody>
        </table>
    </div>

        </section>

        <!-- CONSULTAR PRODUCTOS -->
        <section id="consultar-productos" class="content-section">
            <h2>Consultar Productos</h2>
            <input type="text" placeholder="Buscar producto..." class="input">

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Resina Elegoo 8K</td>
                            <td>Elegoo</td>
                            <td>$130.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Resina Anycubic 14k</td>
                            <td>Anycubic</td>
                            <td>$150.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Resina Sunsu ABS</td>
                            <td>Sunlu</td>
                            <td>$180.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Resina Mika 500g</td>
                            <td>Mika</td>
                            <td>$100.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Bambulab A1 mini Combo</td>
                            <td>Bambulab</td>
                            <td>$3.000.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Anycubic Photon Mono 4</td>
                            <td>Anycubic</td>
                            <td>$1.200.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Creality K1</td>
                            <td>Creality</td>
                            <td>$2.000.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Elegoo Mars 5 Ultra</td>
                            <td>Elegoo</td>
                            <td>$2.250.000</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Phrozen Tr300</td>
                            <td>Phrozen/td>
                            <td>$300.000</td>
                            <td>25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- REPORTE -->
        <section id="reporte-ventas" class="content-section">

    <h2>Reporte Personal de Ventas</h2>

    <!-- FILTROS -->
    <div class="report-filters">
        <input type="date" class="input">
        <input type="date" class="input">
        <select class="input">
            <option>Todos los estados</option>
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>Cancelado</option>
        </select>
        <button class="btn-primary">Filtrar</button>
    </div>

    <!-- KPIs -->
    <div class="report-kpis">
        <div class="report-card">
            <h3>$12,450,000</h3>
            <p>Total Ventas</p>
        </div>

        <div class="report-card">
            <h3>42</h3>
            <p>Pedidos Cerrados</p>
        </div>

        <div class="report-card">
            <h3>$1,245,000</h3>
            <p>Comisión Generada</p>
        </div>

        <div class="report-card">
            <h3>5</h3>
            <p>Pagos Pendientes</p>
        </div>
    </div>

    <!-- TABLA DETALLADA -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Total</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>02/02/2026</td>
                    <td>#2031</td>
                    <td>Laura Gómez</td>
                    <td>Resina 8K</td>
                    <td>$780,000</td>
                    <td><span class="badge paid">Pagado</span></td>
                </tr>
                <tr>
                    <td>10/02/2026</td>
                    <td>#2045</td>
                    <td>Juan Pérez</td>
                    <td>Impresión personalizada</td>
                    <td>$450,000</td>
                    <td><span class="badge pending">Pendiente</span></td>
                </tr>
                <tr>
                    <td>15/02/2026</td>
                    <td>#2050</td>
                    <td>Empresa XYZ</td>
                    <td>Wash & Cure</td>
                    <td>$980,000</td>
                    <td><span class="badge paid">Pagado</span></td>
                </tr>
            </tbody>
        </table>
    </div>

</section>

        <!-- CHAT -->
        <section id="chat" class="content-section">
            <h2>Chat Clientes</h2>

            <div class="seller-chat-layout">
                <aside class="seller-chat-list">
                    <h3>Bandeja de chats</h3>

                    <div class="seller-chat-contact active">
                        <div class="seller-chat-avatar">MR</div>
                        <div>
                            <p class="seller-chat-name">Miguel Rodríguez</p>
                            <p class="seller-chat-preview">¿La Mars 4 incluye garantía?</p>
                        </div>
                        <span class="seller-chat-unread">2</span>
                    </div>

                    <div class="seller-chat-contact">
                        <div class="seller-chat-avatar">LG</div>
                        <div>
                            <p class="seller-chat-name">Laura Gómez</p>
                            <p class="seller-chat-preview">Necesito cotización para 3 resinas 8K.</p>
                        </div>
                    </div>

                    <div class="seller-chat-contact">
                        <div class="seller-chat-avatar">CP</div>
                        <div>
                            <p class="seller-chat-name">Carlos Pérez</p>
                            <p class="seller-chat-preview">¿Manejan envío contraentrega?</p>
                        </div>
                    </div>
                </aside>

                <div class="seller-chat-panel">
                    <div class="seller-chat-header">
                        <div>
                            <h3>Miguel Rodríguez</h3>
                            <p>Cliente frecuente • Última compra: 12 Feb 2026</p>
                        </div>
                        <div class="seller-chat-actions">
                            <button type="button">Ver perfil</button>
                            <button type="button">Ver pedido</button>
                        </div>
                    </div>

                    <div class="seller-chat-context">
                        <p><strong>Interés:</strong> Impresora Elegoo Mars 4 + Resina UV</p>
                        <p><strong>Estado de oportunidad:</strong> Cotización pendiente</p>
                    </div>

                    <div class="chat-box">
                        <div class="message client">
                            <p>Hola Juan, ¿la Mars 4 incluye garantía y soporte?</p>
                            <span>3:16 PM</span>
                        </div>
                        <div class="message seller">
                            <p>Hola Miguel, sí. Incluye garantía de 12 meses y soporte técnico.</p>
                            <span>3:18 PM</span>
                        </div>
                        <div class="message client">
                            <p>Perfecto. ¿Me puedes enviar cotización con resina UV de 1KG?</p>
                            <span>3:19 PM</span>
                        </div>
                        <div class="message seller">
                            <p>Claro, te la comparto hoy mismo. ¿Confirmas envío a Bogotá?</p>
                            <span>3:20 PM</span>
                        </div>
                    </div>

                    <div class="seller-chat-input">
                        <input type="text" placeholder="Escribe una respuesta al cliente...">
                        <button type="button" class="btn-secondary">Plantilla</button>
                        <button type="button" class="btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- PEDIDOS -->
        <section id="pedidos" class="content-section">

    <h2>Gestión de Pedidos</h2>

    <!-- FILTROS -->
    <div class="pedidos-filtros">
        <select class="input">
            <option>Todos</option>
            <option>Online</option>
            <option>Tienda Física</option>
        </select>

        <select class="input">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En preparación</option>
            <option>Enviado</option>
            <option>Entregado</option>
        </select>

        <button class="btn-primary">Filtrar</button>
    </div>

    <!-- TABLA PEDIDOS -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th># Pedido</th>
                    <th>Cliente</th>
                    <th>Tipo</th>
                    <th>Entrega</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody id="tablaPedidos">
                <tr>
                    <td>#3012</td>
                    <td>Laura Gómez</td>
                    <td><span class="badge online">Online</span></td>
                    <td>Envío</td>
                    <td>$780,000</td>
                    <td><span class="badge pendiente">Pendiente</span></td>
                    <td>
                        <select onchange="cambiarEstado(this)">
                            <option>Pendiente</option>
                            <option>En preparación</option>
                            <option>Enviado</option>
                            <option>Entregado</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>#3015</td>
                    <td>Carlos Ruiz</td>
                    <td><span class="badge tienda">Tienda</span></td>
                    <td>Recoger</td>
                    <td>$450,000</td>
                    <td><span class="badge enviado">Enviado</span></td>
                    <td>
                        <select onchange="cambiarEstado(this)">
                            <option>Pendiente</option>
                            <option>En preparación</option>
                            <option selected>Enviado</option>
                            <option>Entregado</option>
                        </select>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

</section>

    </main>
</div>`;
})();
