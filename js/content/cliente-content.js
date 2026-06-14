(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<div class="cliente-container">

    <!-- Sidebar -->
    <aside class="cliente-sidebar">
        <h2 class="logo">Calcifer 3D</h2>
        <div class="cliente-profile">
            <div class="cliente-avatar">
            <img src="img/foto.jpg" alt="Foto Cliente">
        </div>
    <p class="cliente-name">Miguel Rodríguez</p>
    <span class="cliente-role">Cliente</span>
</div>

        <ul>
            <li data-section="dashboard"><i class="fas fa-home"></i> Dashboard</li>
            <li data-section="productos"><i class="fas fa-box"></i> Ver Productos</li>
            <li data-section="carrito"><i class="fas fa-shopping-cart"></i> Carrito</li>
            <li data-section="historial"><i class="fas fa-receipt"></i> Historial</li>
            <li data-section="agendamiento"><i class="fas fa-calendar"></i> Agendamiento</li>
            <li data-section="chat"><i class="fas fa-comments"></i> Chat</li>
            <li data-section="perfil"><i class="fas fa-user"></i> Perfil</li>
            <li class="logout">
                <a href="index.html">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </a>
            </li>
        </ul>
    </aside>

    <!-- Contenido -->
    <main class="cliente-main">

        <!-- DASHBOARD -->
        <section id="dashboard" class="cliente-section active">

    <h2 class="titulo-seccion">Resumen General</h2>

    <!-- MÉTRICAS PRINCIPALES -->
    <div class="dashboard-cards">

        <div class="dashboard-card">
            <div class="icono naranja"><i class="fas fa-shopping-bag"></i></div>
            <div>
                <h3>Pedidos Realizados</h3>
                <p>12</p>
                <span>2 este mes</span>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="icono verde"><i class="fas fa-box"></i></div>
            <div>
                <h3>Productos en Carrito</h3>
                <p>3</p>
                <span>$1.810.000 acumulado</span>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="icono azul"><i class="fas fa-calendar-check"></i></div>
            <div>
                <h3>Próxima Cita</h3>
                <p>14 Feb 2026</p>
                <span>4:00 PM</span>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="icono rojo"><i class="fas fa-file-invoice"></i></div>
            <div>
                <h3>Total Invertido</h3>
                <p>$3.240.000</p>
                <span>En 2026</span>
            </div>
        </div>

    </div>

    <!-- ACTIVIDAD RECIENTE -->
    <div class="actividad-reciente">

        <h3>Actividad Reciente</h3>

        <ul>
            <li>🛒 Agregaste "Resina UV 1KG" al carrito</li>
            <li>📦 Compra confirmada - Factura #2026-002</li>
            <li>📅 Agendaste servicio técnico para el 14 Feb</li>
            <li>💬 Nuevo mensaje del vendedor</li>
        </ul>

    </div>

    <!-- ESTADO GENERAL -->
    <div class="estado-general">

        <div class="estado-card">
            <h4>Nivel de Cliente</h4>
            <p class="vip">Cliente Frecuente</p>
        </div>

        <div class="estado-card">
            <h4>Beneficios Activos</h4>
            <p>5% descuento permanente</p>
        </div>

        <div class="estado-card">
            <h4>Estado de Cuenta</h4>
            <p class="activo">Al día</p>
        </div>

    </div>

</section>

        <!-- PRODUCTOS -->
        <section id="productos" class="cliente-section">

    <h2>Nuestros Productos</h2>

    <div class="productos-grid">

        <!-- Repite estos bloques -->
        <div class="producto-card">
            <img src="img/Mars-4.png">
            <h4>Impresora Elegoo Mars 4</h4>
            <p class="precio">$1.450.000</p>
            <p class="stock">Disponible</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/resina1kg.jpg">
            <h4>Resina UV 1KG</h4>
            <p class="precio">$180.000</p>
            <p class="stock bajo">Stock bajo</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/mono4.webp">
            <h4>Impresora Anycubic Photon Mono 4</h4>
            <p class="precio">$1.200.000</p>
            <p class="stock">Disponible</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/Resina-Elegoo.webp">
            <h4>Resina UV Elegoo 1KG</h4>
            <p class="precio">$125.000</p>
            <p class="stock">Disponible</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/m7pro.webp">
            <h4>Impresora Anycubic Photon M7 PRO</h4>
            <p class="precio">$5.850.000</p>
            <p class="stock">Disponible</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/vallejo_skin_set.avif">
            <h4>valllejo Skin Set</h4>
            <p class="precio">$220.000</p>
            <p class="stock bajo">Stock bajo</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/purificador.webp">
            <h4>purificador de aire Anycubic</h4>
            <p class="precio">$144.000</p>
            <p class="stock">Disponible</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <div class="producto-card">
            <img src="img/a1minicombo.webp">
            <h4>Bambu-lab A1 mini Combo</h4>
            <p class="precio">$3.000.000</p>
            <p class="stock bajo">Stock bajo</p>
            <button class="btn-agregar">Agregar al carrito</button>
        </div>

        <!-- Duplica hasta llenar pantalla -->
        
    </div>
</section>

        <!-- CARRITO -->
        <section id="carrito" class="cliente-section">
    <h2>Mi Carrito</h2>

    <div class="cart-item">
    <div class="cart-img">
        <img src="img/resina1kg.jpg" alt="Producto">
    </div>

    <div class="cart-info">
        <h4>Resina UV 1KG</h4>
        <p>$120.000</p>
        <span>Cantidad: 1</span>
    </div>

    <div class="cart-actions">
        <button class="btn-remove">Eliminar</button>
    </div>
</div>

    <div class="cart-item">
    <div class="cart-img">
        <img src="img/Mars-4.png" alt="Producto">
    </div>

    <div class="cart-info">
        <h4>Maquina Elegoo Mars 4</h4>
        <p>$2.000.000</p>
        <span>Cantidad: 1</span>
    </div>

    <div class="cart-actions">
        <button class="btn-remove">Eliminar</button>
    </div>
</div>

    <div class="carrito-total">
        <h3>Total: $2.120.000</h3>
        <button class="btn-pagar">Proceder al Pago</button>
    </div>
</section>

        <!-- HISTORIAL -->
        <section id="historial" class="cliente-section">
    <h2 class="titulo-seccion">Historial de Compras</h2>

    <div class="historial-kpis">
        <div class="historial-kpi">
            <p class="kpi-label">Compras 2026</p>
            <p class="kpi-value">12</p>
        </div>
        <div class="historial-kpi">
            <p class="kpi-label">Total invertido</p>
            <p class="kpi-value">$3.240.000</p>
        </div>
        <div class="historial-kpi">
            <p class="kpi-label">Última compra</p>
            <p class="kpi-value">12 Feb 2026</p>
        </div>
        <div class="historial-kpi">
            <p class="kpi-label">Estado general</p>
            <p class="kpi-value">Al día</p>
        </div>
    </div>

    <div class="historial-filtros">
        <input type="text" placeholder="Buscar por factura o producto...">
        <select>
            <option>Todos los estados</option>
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>Cancelado</option>
        </select>
        <select>
            <option>Últimos 6 meses</option>
            <option>Últimos 30 días</option>
            <option>Este año</option>
        </select>
        <button type="button">Filtrar</button>
    </div>

    <div class="historial-layout">
        <div class="historial-tabla-wrap">
            <table class="historial-tabla">
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Fecha</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#2026-001</td>
                        <td>12 Feb 2026</td>
                        <td>Impresora Elegoo Mars 4 + Resina UV</td>
                        <td>$890.000</td>
                        <td><span class="historial-badge pagado">Pagado</span></td>
                        <td><a href="#">Ver factura</a></td>
                    </tr>
                    <tr>
                        <td>#2026-002</td>
                        <td>03 Ene 2026</td>
                        <td>Resina UV 1KG</td>
                        <td>$320.000</td>
                        <td><span class="historial-badge pagado">Pagado</span></td>
                        <td><a href="#">Descargar PDF</a></td>
                    </tr>
                    <tr>
                        <td>#2025-198</td>
                        <td>28 Dic 2025</td>
                        <td>Kit de limpieza + Filtro de aire</td>
                        <td>$180.000</td>
                        <td><span class="historial-badge pendiente">Pendiente</span></td>
                        <td><a href="#">Pagar ahora</a></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <aside class="historial-resumen">
            <h3>Actividad de pedidos</h3>
            <div class="historial-evento">
                <p class="evento-titulo">Pedido #2026-001 entregado</p>
                <p class="evento-meta">12 Feb 2026 - Envío nacional</p>
            </div>
            <div class="historial-evento">
                <p class="evento-titulo">Pago confirmado #2026-002</p>
                <p class="evento-meta">03 Ene 2026 - Tarjeta débito</p>
            </div>
            <div class="historial-evento">
                <p class="evento-titulo">Factura #2025-198 pendiente</p>
                <p class="evento-meta">28 Dic 2025 - Vence en 2 días</p>
            </div>
        </aside>
    </div>
</section>

        <!-- AGENDAMIENTO -->
        <section id="agendamiento" class="cliente-section">
    <h2 class="titulo-seccion">Agendamiento de Servicios</h2>

    <div class="agenda-layout">
        <form class="agenda-form">
            <h3>Programar nueva cita</h3>

            <div class="agenda-grid">
                <div class="form-group">
                    <label for="servicio">Servicio</label>
                    <select id="servicio">
                        <option>Diagnóstico técnico de impresora</option>
                        <option>Mantenimiento preventivo</option>
                        <option>Calibración de impresión</option>
                        <option>Asesoría de materiales y resinas</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="equipo">Equipo</label>
                    <input id="equipo" type="text" value="Elegoo Mars 4">
                </div>

                <div class="form-group">
                    <label for="fecha">Fecha</label>
                    <input id="fecha" type="date" value="2026-02-14">
                </div>

                <div class="form-group">
                    <label for="hora">Hora</label>
                    <select id="hora">
                        <option>09:00 AM</option>
                        <option>11:00 AM</option>
                        <option selected>04:00 PM</option>
                        <option>06:00 PM</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="modalidad">Modalidad</label>
                    <select id="modalidad">
                        <option>En tienda</option>
                        <option>A domicilio</option>
                        <option>Videollamada</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="prioridad">Prioridad</label>
                    <select id="prioridad">
                        <option>Normal (24-48h)</option>
                        <option>Alta (mismo día)</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="detalle">Detalle del problema o solicitud</label>
                <textarea id="detalle" rows="4" placeholder="Describe brevemente la falla o el servicio que necesitas..."></textarea>
            </div>

            <div class="agenda-actions">
                <button type="button" class="btn-guardar">Confirmar cita</button>
                <button type="button" class="btn-agenda-secundario">Guardar borrador</button>
            </div>
        </form>

        <aside class="agenda-side">
            <div class="agenda-resumen">
                <h3>Resumen de cita</h3>
                <ul>
                    <li><strong>Servicio:</strong> Diagnóstico técnico</li>
                    <li><strong>Fecha:</strong> 14 Feb 2026</li>
                    <li><strong>Hora:</strong> 4:00 PM</li>
                    <li><strong>Técnico asignado:</strong> Carlos M.</li>
                    <li><strong>Estado:</strong> Confirmado</li>
                </ul>
            </div>

            <div class="agenda-lista">
                <h3>Próximas citas</h3>
                <div class="agenda-item">
                    <p class="agenda-servicio">Mantenimiento preventivo</p>
                    <p>20 Feb 2026 - 10:00 AM</p>
                    <span class="agenda-badge pendiente">Pendiente</span>
                </div>
                <div class="agenda-item">
                    <p class="agenda-servicio">Asesoría de materiales</p>
                    <p>28 Feb 2026 - 03:00 PM</p>
                    <span class="agenda-badge confirmada">Confirmada</span>
                </div>
                <div class="agenda-item">
                    <p class="agenda-servicio">Calibración de impresión</p>
                    <p>05 Mar 2026 - 09:00 AM</p>
                    <span class="agenda-badge reprogramada">Reprogramada</span>
                </div>
            </div>
        </aside>
    </div>
</section>

        <!-- CHAT -->
        <section id="chat" class="cliente-section">
    <h2 class="titulo-seccion">Chat con Vendedor</h2>

    <div class="chat-layout">
        <aside class="chat-list">
            <h3>Conversaciones</h3>

            <div class="chat-contact activo">
                <div class="chat-avatar">JR</div>
                <div>
                    <p class="chat-nombre">Juan Rodríguez</p>
                    <p class="chat-preview">Tenemos stock disponible de Mars 4.</p>
                </div>
                <span class="chat-unread">2</span>
            </div>

            <div class="chat-contact">
                <div class="chat-avatar">ST</div>
                <div>
                    <p class="chat-nombre">Soporte Técnico</p>
                    <p class="chat-preview">Tu cita fue confirmada para el 14 Feb.</p>
                </div>
            </div>

            <div class="chat-contact">
                <div class="chat-avatar">CV</div>
                <div>
                    <p class="chat-nombre">Canal Ventas</p>
                    <p class="chat-preview">¿Deseas cotizar mantenimiento preventivo?</p>
                </div>
            </div>
        </aside>

        <div class="chat-panel">
            <div class="chat-header">
                <div>
                    <h3>Juan Rodríguez</h3>
                    <p>Asesor de ventas • En línea</p>
                </div>
                <div class="chat-header-actions">
                    <button type="button">Ver perfil</button>
                    <button type="button">Adjuntar</button>
                </div>
            </div>

            <div class="chat-box">
                <div class="mensaje vendedor">
                    <p>Hola Miguel 👋 ¿Necesitas ayuda con alguna impresora?</p>
                    <span>3:18 PM</span>
                </div>
                <div class="mensaje cliente">
                    <p>Sí, quiero saber disponibilidad de la Mars 4.</p>
                    <span>3:19 PM</span>
                </div>
                <div class="mensaje vendedor">
                    <p>Tenemos stock disponible. ¿Te la cotizo con resina incluida?</p>
                    <span>3:20 PM</span>
                </div>
                <div class="mensaje cliente">
                    <p>Perfecto, envíame la cotización por este medio.</p>
                    <span>3:21 PM</span>
                </div>
            </div>

            <div class="chat-input">
                <input type="text" placeholder="Escribe tu mensaje...">
                <button type="button" class="btn-chat-alt">Plantilla</button>
                <button type="button">Enviar</button>
            </div>
        </div>
    </div>
</section>

        <!-- PERFIL -->
        <section id="perfil" class="cliente-section">

    <h2 class="titulo-seccion">Mi Perfil</h2>

    <div class="perfil-card">

        <!-- Columna Foto -->
        <div class="perfil-foto">

            <div class="foto-wrapper">
                <img src="img/foto.jpg" id="previewFoto" alt="Foto Cliente">
            </div>

            <label class="btn-subir">
                Cambiar Foto
                <input type="file" hidden>
            </label>

            <p class="tipo-cuenta">Cliente Activo</p>

        </div>

        <!-- Columna Formulario -->
        <form class="perfil-form">

            <div class="form-grid">

                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" value="Miguel Rodríguez">
                </div>

                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" value="miguel@email.com">
                </div>

                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="text" value="3112345678">
                </div>

                <div class="form-group">
                    <label>Ciudad</label>
                    <input type="text" value="Bogotá">
                </div>

                <div class="form-group">
                    <label>Dirección</label>
                    <input type="text" value="Cra 123 #45-67">
                </div>

                <div class="form-group">
                    <label>Nueva Contraseña</label>
                    <input type="password" placeholder="••••••••">
                </div>

            </div>

            <div class="perfil-actions">
                <button type="submit" class="btn-guardar">
                    Guardar Cambios
                </button>
            </div>

        </form>

    </div>

</section>

    </div>
</section>

    </main>

</div>`;
})();
