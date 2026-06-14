(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<nav class="navbar">
    
    <div class="logo">
        <a href="#">
            <img src="img/logo.png" alt="Logo Empresa">
        </a>
    </div>

    <div class="brand-name">Calcifer3D</div>

    <!-- 🔥 BOTÓN HAMBURGUESA -->
    <div class="menu-toggle" id="menuToggle">
        <i class="fas fa-bars"></i>
    </div>
    
    <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="produtos.html">Productos</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="registro.html">Registro</a></li>
        <li><a href="login.html">Ingreso</a></li>
    </ul>

</nav>
<section class="hero">
    <div class="hero-content">
        <h1>Calcifer3D</h1>
        <h2>“Si no tenemos lo que buscas, lo traemos por encargo.”</h2>
        <p>
            Tenemos todo lo que necesitas para la impresión 3D: máquinas FDM y SLA,
            todo tipo de resinas y filamentos, servicio técnico especializado
            y asesorías eficaces para resolver problemas específicos en cada caso.
        </p>
        <div class="hero-actions">
            <a href="#cotizacion" id="quoteOpenBtn" class="btn-hero">Cotizar ahora</a>
            <a href="#sugerencias-contacto" id="feedbackOpenBtn" class="btn-hero btn-hero-secondary">Sugerencias y contacto</a>
        </div>
    </div>
</section>
<section id="cotizacion" class="quote-section" aria-hidden="true">
    <div class="quote-container">
        <div class="quote-head">
            <h2>Formulario de Cotizacion</h2>
            <p>Completa los datos y te enviaremos una propuesta a medida para tu proyecto 3D.</p>
        </div>

        <form id="quoteForm" class="quote-form">
            <div class="quote-grid">
                <div class="field">
                    <label for="nombreCotiza">Nombre</label>
                    <input id="nombreCotiza" type="text" placeholder="Tu nombre completo" required>
                </div>
                <div class="field">
                    <label for="empresaCotiza">Empresa</label>
                    <input id="empresaCotiza" type="text" placeholder="Nombre de empresa (opcional)">
                </div>
                <div class="field">
                    <label for="correoCotiza">Correo</label>
                    <input id="correoCotiza" type="email" placeholder="correo@ejemplo.com" required>
                </div>
                <div class="field">
                    <label for="telefonoCotiza">Telefono</label>
                    <input id="telefonoCotiza" type="tel" placeholder="+57 300 000 0000" required>
                </div>
                <div class="field">
                    <label for="servicioCotiza">Servicio</label>
                    <select id="servicioCotiza" required>
                        <option value="">Selecciona una opcion</option>
                        <option>Impresion 3D</option>
                        <option>Venta de resinas y consumibles</option>
                        <option>Servicio tecnico</option>
                        <option>Asesoria especializada</option>
                    </select>
                </div>
                <div class="field">
                    <label for="presupuestoCotiza">Presupuesto estimado</label>
                    <select id="presupuestoCotiza">
                        <option>Menos de $500.000</option>
                        <option>$500.000 - $2.000.000</option>
                        <option>$2.000.000 - $5.000.000</option>
                        <option>Mas de $5.000.000</option>
                    </select>
                </div>
            </div>

            <div class="field">
                <label for="detalleCotiza">Detalle del proyecto</label>
                <textarea id="detalleCotiza" rows="5" placeholder="Cuéntanos que necesitas, cantidades, tiempos o referencias..." required></textarea>
            </div>

            <div class="quote-actions">
                <button type="submit" class="btn-quote">Enviar cotizacion</button>
                <span id="quoteMsg" class="quote-msg"></span>
            </div>
        </form>
    </div>
</section>
<section class="stats hidden">
    <div class="stats-container">

        <h2 class="stats-title">Nuestra experiencia nos respalda</h2>

        <div class="stats-grid">

            <div class="stat-card">
                <div class="icon">🔥</div>
                <h3 class="counter" data-target="5">0</h3>
                <p>Años de experiencia en impresión 3D</p>
            </div>

            <div class="stat-card">
                <div class="icon">📦</div>
                <h3 class="counter" data-target="2000">0</h3>
                <p>Productos vendidos</p>
            </div>

            <div class="stat-card">
                <div class="icon">🛠️</div>
                <h3 class="counter" data-target="500">0</h3>
                <p>Máquinas reparadas con éxito</p>
            </div>

            <div class="stat-card">
                <div class="icon">🤝</div>
                <h3>100%</h3>
                <p>Soporte postventa garantizado</p>
            </div>

        </div>

    </div>
</section>


<section class="ecosystem">
    <div class="ecosystem-container">

        <h2 class="ecosystem-title">Todo para tu ecosistema 3D</h2>
        <p class="ecosystem-subtitle">
            Consumibles, repuestos, herramientas y equipos para llevar tus impresiones al siguiente nivel.
        </p>

        <div class="carousel-wrapper">
            <button class="carousel-btn left">&#10094;</button>

            <div class="carousel">

                <div class="eco-card">
                    <div class="eco-icon">🔩</div>
                    <h3>Repuestos y Partes</h3>
                    <p>Motores, LCD, placas, fuentes y piezas originales.</p>
                </div>

                <div class="eco-card">
                    <div class="eco-icon">🧪</div>
                    <h3>FEP / nFEP / ACF</h3>
                    <p>Películas de alta calidad para máxima precisión.</p>
                </div>

                <div class="eco-card">
                    <div class="eco-icon">🎨</div>
                    <h3>Resinas y Tintes</h3>
                    <p>Resinas técnicas y tintes para acabados únicos.</p>
                </div>

                <div class="eco-card">
                    <div class="eco-icon">🧼</div>
                    <h3>Equipos Wash & Cure</h3>
                    <p>Postprocesado profesional y eficiente.</p>
                </div>

                <div class="eco-card">
                    <div class="eco-icon">🖌️</div>
                    <h3>Pinturas Vallejo</h3>
                    <p>Pinturas premium para miniaturas y modelismo.</p>
                </div>

                <div class="eco-card">
                    <div class="eco-icon">🛠️</div>
                    <h3>Herramientas Especializadas</h3>
                    <p>Espátulas, lijas, cortadores y seguridad.</p>
                </div>

            </div>

            <button class="carousel-btn right">&#10095;</button>
        </div>

    </div>
</section>


<section class="why hidden">
    <div class="why-container">

        <h2 class="why-title">¿Por qué elegir Calcifer 3D?</h2>
        <p class="why-subtitle">
            Más que vender productos, ofrecemos respaldo, experiencia y compromiso real con tus proyectos.
        </p>

        <div class="why-grid">

            <div class="why-card">
                <div class="why-icon">🛠️</div>
                <h3>Servicio Técnico Especializado</h3>
                <p>Más de 500 máquinas reparadas con éxito y diagnóstico profesional en impresión 3D.</p>
            </div>

            <div class="why-card">
                <div class="why-icon">📦</div>
                <h3>Stock Real en Colombia</h3>
                <p>Disponibilidad inmediata de resinas, repuestos y accesorios sin largas esperas.</p>
            </div>

            <div class="why-card">
                <div class="why-icon">🤝</div>
                <h3>Soporte Postventa Garantizado</h3>
                <p>Cada venta incluye asesoría para asegurar el éxito de tus impresiones.</p>
            </div>

            <div class="why-card">
                <div class="why-icon">🚚</div>
                <h3>Envíos Nacionales</h3>
                <p>Llevamos tus productos a cualquier parte de Colombia de forma segura y rápida.</p>
            </div>

        </div>
    </div>
</section>

<section class="testimonials hidden">
    <div class="testimonials-container">

        <h2 class="testimonials-title">Lo que dicen nuestros clientes</h2>
        <p class="testimonials-subtitle">
            Opiniones reales de nuestra comunidad en Colombia
        </p>

        <div class="testimonials-grid">

            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>
                    “Excelente atención y asesoría. Me ayudaron a solucionar mi problema con la impresora en tiempo récord.”
                </p>
                <h4>- Cliente satisfecho</h4>
            </div>

            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>
                    “Gran variedad de resinas y filamentos. Siempre cumplen con lo prometido.”
                </p>
                <h4>- Cliente satisfecho</h4>
            </div>

            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>
                    “El servicio técnico es excelente. Repararon mi máquina y quedó como nueva.”
                </p>
                <h4>- Cliente satisfecho</h4>
            </div>

        </div>

    </div>
</section>

<section id="sugerencias-contacto" class="feedback-section" aria-hidden="true">
    <div class="feedback-container">
        <div class="feedback-head">
            <h2>Sugerencias y Contacto</h2>
            <p>Comparte tus ideas, reporta una novedad o solicita acompaÃ±amiento de nuestro equipo.</p>
        </div>

        <div class="feedback-layout">
            <form id="feedbackForm" class="feedback-form">
                <div class="feedback-grid">
                    <div class="field">
                        <label for="nombreFeedback">Nombre</label>
                        <input id="nombreFeedback" type="text" placeholder="Tu nombre completo" required>
                    </div>
                    <div class="field">
                        <label for="correoFeedback">Correo</label>
                        <input id="correoFeedback" type="email" placeholder="correo@ejemplo.com" required>
                    </div>
                    <div class="field">
                        <label for="telefonoFeedback">Telefono</label>
                        <input id="telefonoFeedback" type="tel" placeholder="+57 300 000 0000">
                    </div>
                    <div class="field">
                        <label for="tipoFeedback">Tipo de solicitud</label>
                        <select id="tipoFeedback" required>
                            <option value="">Selecciona una opcion</option>
                            <option>Sugerencia</option>
                            <option>Peticion</option>
                            <option>Queja</option>
                            <option>Felicitacion</option>
                            <option>Soporte tecnico</option>
                        </select>
                    </div>
                    <div class="field">
                        <label for="asuntoFeedback">Asunto</label>
                        <input id="asuntoFeedback" type="text" placeholder="Resumen corto de tu mensaje" required>
                    </div>
                    <div class="field">
                        <label for="preferenciaFeedback">Canal preferido</label>
                        <select id="preferenciaFeedback">
                            <option>Correo electronico</option>
                            <option>WhatsApp</option>
                            <option>Llamada telefonica</option>
                        </select>
                    </div>
                </div>

                <div class="field">
                    <label for="detalleFeedback">Mensaje</label>
                    <textarea id="detalleFeedback" rows="5" placeholder="Escribe aqui tu sugerencia, solicitud o comentario..." required></textarea>
                </div>

                <div class="feedback-actions">
                    <button type="submit" class="btn-quote">Enviar mensaje</button>
                    <button type="button" id="feedbackCloseBtn" class="btn-feedback-close">Ocultar seccion</button>
                    <span id="feedbackMsg" class="quote-msg"></span>
                </div>
            </form>

            <aside class="feedback-info">
                <h3>Canales directos</h3>
                <ul>
                    <li><strong>Correo:</strong> contacto@calcifer3d.com</li>
                    <li><strong>WhatsApp:</strong> +57 300 123 4567</li>
                    <li><strong>Horario:</strong> Lunes a Sabado, 8:00 a.m. - 6:00 p.m.</li>
                    <li><strong>Ubicacion:</strong> Colombia</li>
                </ul>
                <p>Tiempo estimado de respuesta: 24 a 48 horas habiles.</p>
            </aside>
        </div>
    </div>
</section>
<footer class="footer">
  <div class="footer-container">

    <div class="footer-col">
      <h3>Calcifer 3D</h3>
      <p>
        Especialistas en impresión 3D de alta precisión.
        Calidad, detalle y rapidez para tus proyectos.
      </p>
    </div>

    <div class="footer-col">
      <h4>Enlaces</h4>
      <ul>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="#ecosistema">Ecosistema</a></li>
        <li><a href="#porque">¿Por qué elegirnos?</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contacto</h4>
      <p>📍 Colombia</p>
      <p>📞 +57 XXX XXX XXXX</p>
      <p>✉ contacto@calcifer3d.com</p>
    </div>

    <div class="footer-col">
        <h4>Síguenos</h4>
            <div class="social-icons">
                <a href="https://www.instagram.com/calcifer._.3d/" target="_blank">
                <i class="fab fa-instagram"></i>
        </a>
            <a href="https://web.facebook.com/Calcifer3D" target="_blank">
            <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://wa.me/573001234567" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>
</div>


  </div>

  <div class="footer-bottom">
    <p>© 2026 Calcifer 3D. Todos los derechos reservados.</p>
  </div>
</footer>
<button id="chatToggle" class="chat-toggle" aria-label="Abrir chat">
    <i class="fas fa-comments"></i>
</button>

<section id="chatBox" class="chat-box-widget" aria-hidden="true">
    <header class="chat-header">
        <div>
            <h3>Asistente Calcifer 3D</h3>
            <p>Te ayudamos con productos y soporte</p>
        </div>
        <button id="chatClose" class="chat-close" aria-label="Cerrar chat">
            <i class="fas fa-times"></i>
        </button>
    </header>

    <div id="chatMessages" class="chat-messages">
        <div class="chat-message bot">Hola, soy tu asistente. Que necesitas hoy?</div>
        <div class="chat-message bot">Puedes preguntar por resinas, impresoras o soporte tecnico.</div>
    </div>

    <form id="chatForm" class="chat-input-area">
        <input id="chatInput" type="text" placeholder="Escribe tu mensaje..." autocomplete="off">
        <button type="submit">Enviar</button>
    </form>
</section>`;
})();
