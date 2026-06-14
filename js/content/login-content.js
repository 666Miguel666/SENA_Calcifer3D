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

<section class="login-section">
    <div class="login-container">
        <div class="login-form">
            <h2>Ingreso al Sistema</h2>
            <p class="login-subtitle">Bienvenido a Calcifer 3D</p>

            <form id="loginForm">
                <div class="input-group">
                    <label for="loginEmail">Correo Electronico</label>
                    <div class="input-wrapper">
                        <i class="fas fa-envelope"></i>
                        <input id="loginEmail" type="email" placeholder="ejemplo@correo.com" required>
                    </div>
                    <small class="error-message"></small>
                </div>

                <div class="input-group">
                    <label for="loginPassword">Contrasena</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock"></i>
                        <input id="loginPassword" type="password" placeholder="Ingrese su contrasena" required>
                    </div>
                    <small class="error-message"></small>
                </div>

                <div id="loginMessage" class="error-message"></div>

                <button type="submit" class="btn-login">
                    Ingresar
                </button>

                <p class="extra-links">
                    No tienes cuenta? <a href="registro.html">Registrate aqui</a>
                </p>
            </form>
        </div>

        <div class="login-image">
            <img src="img/login.png" alt="Login Calcifer 3D">
        </div>
    </div>
</section>

<section class="demo-links">
    <a href="cliente.html" class="btn-demo">Ejemplo Cliente</a>
    <a href="adminPro.html" class="btn-demo">Ejemplo Administrador</a>
    <a href="contador.html" class="btn-demo">Ejemplo Contador</a>
    <a href="vendedor.html" class="btn-demo">Ejemplo Vendedor</a>
</section>

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
        <li><a href="#ecosistema">Ecosistema</a></li>
        <li><a href="#porque">Por que elegirnos?</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
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
