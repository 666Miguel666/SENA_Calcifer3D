(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<nav class="navbar">
        <div class="logo">
            <a href="index.html">
                <img src="img/logo.png" alt="Logo Empresa">
            </a>
        </div>

        <div class="brand-name">Calcifer3D</div>

        <div class="menu-toggle" id="menuToggle">
            <i class="fas fa-bars"></i>
        </div>

        <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Inicio</a></li>
            <li><a href="produtos.html">Productos</a></li>
            <li><a href="servicios.html" class="active">Servicios</a></li>
            <li><a href="registro.html">Registro</a></li>
            <li><a href="login.html">Ingreso</a></li>
        </ul>
    </nav>

    <main>
        <section class="services-hero">
            <div class="services-hero-content">
                <h1>Servicios Calcifer 3D</h1>
                <p>Conoce nuestro portafolio de servicios para soporte, formacion y logistica en impresion 3D.</p>
            </div>
        </section>

        <section class="services-carousel-section">
            <div class="section-head">
                <h2>Servicios Destacados</h2>
                <p>Desliza para conocer cada servicio y sus beneficios.</p>
            </div>

            <div class="services-carousel-wrap">
                <button class="carousel-control prev" id="servicePrev" aria-label="Servicio anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <div class="services-carousel" id="servicesCarousel">
                    <article class="service-card">
                        <div class="service-icon"><i class="fas fa-tools"></i></div>
                        <h3>Taller Tecnico 3D</h3>
                        <p>Servicio integral para mantener tus maquinas operando al mejor nivel.</p>
                        <ul>
                            <li>Reparacion de impresoras 3D FDM y resina.</li>
                            <li>Venta de repuestos y componentes compatibles.</li>
                            <li>Mantenimiento preventivo y correctivo.</li>
                        </ul>
                    </article>

                    <article class="service-card">
                        <div class="service-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                        <h3>Asesorias y Formacion</h3>
                        <p>Soluciones para problemas puntuales en impresion 3D y configuracion de materiales.</p>
                        <ul>
                            <li>Asesoria en fallos de impresion y calibracion.</li>
                            <li>Configuracion de resinas y parametros de exposicion.</li>
                            <li>Clases de impresion 3D: principiante, intermedio y avanzado.</li>
                        </ul>
                    </article>

                    <article class="service-card">
                        <div class="service-icon"><i class="fas fa-store"></i></div>
                        <h3>Recogida en Tienda Fisica</h3>
                        <p>Recoge tu compra personalmente y aprovecha un descuento exclusivo.</p>
                        <ul>
                            <li>Retiro programado sin costo de envio.</li>
                            <li>Validacion de pedido y entrega agil.</li>
                            <li>Descuento especial por recogida en tienda.</li>
                        </ul>
                    </article>

                    <article class="service-card">
                        <div class="service-icon"><i class="fas fa-truck"></i></div>
                        <h3>Envios a Toda Colombia</h3>
                        <p>Distribucion nacional para que recibas tus productos y repuestos donde los necesites.</p>
                        <ul>
                            <li>Cobertura de envios a nivel nacional.</li>
                            <li>Opciones de entrega segun ciudad y urgencia.</li>
                            <li>Seguimiento del pedido hasta la entrega.</li>
                        </ul>
                    </article>
                </div>

                <button class="carousel-control next" id="serviceNext" aria-label="Siguiente servicio">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <div class="carousel-dots" id="serviceDots" aria-label="Indicadores de servicios">
                <button class="dot active" data-index="0" aria-label="Ir al servicio 1"></button>
                <button class="dot" data-index="1" aria-label="Ir al servicio 2"></button>
                <button class="dot" data-index="2" aria-label="Ir al servicio 3"></button>
                <button class="dot" data-index="3" aria-label="Ir al servicio 4"></button>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-col">
                <h3>Calcifer 3D</h3>
                <p>
                    Especialistas en impresion 3D de alta precision.
                    Calidad, detalle y rapidez para tus proyectos.
                </p>
            </div>

            <div class="footer-col">
                <h4>Enlaces</h4>
                <ul>
                    <li><a href="servicios.html">Servicios</a></li>
                    <li><a href="produtos.html">Productos</a></li>
                    <li><a href="registro.html">Registro</a></li>
                    <li><a href="login.html">Ingreso</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Contacto</h4>
                <p>Colombia</p>
                <p>+57 XXX XXX XXXX</p>
                <p>contacto@calcifer3d.com</p>
            </div>

            <div class="footer-col">
                <h4>Siguenos</h4>
                <div class="social-icons">
                    <a href="https://www.instagram.com/calcifer._.3d/" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://web.facebook.com/Calcifer3D" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 Calcifer 3D. Todos los derechos reservados.</p>
        </div>
    </footer>`;
})();
