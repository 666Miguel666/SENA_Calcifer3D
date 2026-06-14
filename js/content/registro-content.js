(() => {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `<!-- 🔥 NAVBAR FLOTANTE -->
<nav class="navbar">
    
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
        <li><a href="login.html">Ingreso</a></li>
    </ul>

</nav>

<div class="main-container">

    <!-- LADO IMAGEN -->
    <div class="image-side">
        <h1>Estas a un paso de acceder a lo mejor del mundo de la impresion 3D</h1>
    </div>

    <!-- LADO FORMULARIO -->
    <div class="form-side">
        <div class="container">
            <h2>Registro de Cliente</h2>

            <form id="registroForm">

                <!-- Tipo de Cliente -->
                <div class="field">
                    <label>Tipo de Cliente</label>
                    <select id="tipoCliente" required>
                        <option value="">Seleccione</option>
                        <option value="persona">Persona Natural</option>
                        <option value="empresa">Empresa</option>
                    </select>
                </div>

                <!-- Campos Persona -->
                <div id="personaFields">
                    <div class="field">
                        <label>Nombre</label>
                        <input type="text" id="nombre" maxlength="40">
                    </div>

                    <div class="field">
                        <label>Apellidos</label>
                        <input type="text" id="apellidos" maxlength="40">
                    </div>

                    <div class="field">
                        <label>Género</label>
                        <select id="genero">
                            <option value="">Seleccione</option>
                            <option>Hombre</option>
                            <option>Mujer</option>
                        </select>
                    </div>
                </div>

                <!-- Campos Empresa -->
                <div id="empresaFields" style="display:none;">
                    <div class="field">
                        <label>Nombre de la Empresa</label>
                        <input type="text" id="nombreEmpresa" maxlength="80">
                    </div>
                </div>

                <!-- Tipo de Documento -->
                <div id="tipoDocumentoContainer" class="field">
                    <label>Tipo de Documento</label>
                    <select id="tipoDocumento" required>
                        <option value="">Seleccione</option>
                        <option value="cc">Cédula de Ciudadanía</option>
                        <option value="ce">Cédula de Extranjería</option>
                    </select>
                </div>

                <div class="field">
                    <label id="labelDocumento">Número de Documento</label>
                    <input type="text" id="documento" maxlength="15">
                </div>

                <div class="field">
                    <label>Correo Electrónico</label>
                    <input type="email" id="email" required>
                </div>

                <div class="field">
                    <label>Teléfono</label>
                    <input type="tel" id="telefono" maxlength="10">
                </div>

                <div class="field">
                    <label>Dirección</label>
                    <input type="text" id="direccion" maxlength="100">
                </div>

                <div class="field">
                    <label>Contraseña</label>
                    <input type="password" id="password" required>
                </div>

                <div class="field">
                    <label>Confirmar Contraseña</label>
                    <input type="password" id="confirmPassword" required>
                </div>

                <button type="submit">Registrarse</button>

            </form>
        </div>
    </div>

</div>
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
</footer>`;
})();
