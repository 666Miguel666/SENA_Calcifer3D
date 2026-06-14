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
<section class="productos-section">

    <h2 class="productos-title">Nuestros Productos</h2>

    <div class="productos-grid">

        <!-- PRODUCTO 1 -->
        <div class="producto-card">
            <img src="img/producto1.png" alt="Producto 1">
            <div class="producto-info">
                <h3>Figura Personalizada 3D</h3>
                <p class="precio">$85.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 2 -->
        <div class="producto-card">
            <img src="img/producto2.avif" alt="Producto 2">
            <div class="producto-info">
                <h3>Llaveros 3D Personalizados</h3>
                <p class="precio">$25.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 3 -->
        <div class="producto-card">
            <img src="img/producto3.webp" alt="Producto 3">
            <div class="producto-info">
                <h3>Prototipo Industrial</h3>
                <p class="precio">$150.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 4 -->
        <div class="producto-card">
            <img src="img/producto4.webp" alt="Producto 4">
            <div class="producto-info">
                <h3>Accesorios Gamer 3D</h3>
                <p class="precio">$60.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 5 -->
        <div class="producto-card">
            <img src="img/producto1.png" alt="Producto 1">
            <div class="producto-info">
                <h3>Figura Personalizada 3D</h3>
                <p class="precio">$85.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 6 -->
        <div class="producto-card">
            <img src="img/producto2.avif" alt="Producto 2">
            <div class="producto-info">
                <h3>Llaveros 3D Personalizados</h3>
                <p class="precio">$25.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 7 -->
        <div class="producto-card">
            <img src="img/producto3.webp" alt="Producto 3">
            <div class="producto-info">
                <h3>Prototipo Industrial</h3>
                <p class="precio">$150.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 8 -->
        <div class="producto-card">
            <img src="img/producto4.webp" alt="Producto 4">
            <div class="producto-info">
                <h3>Accesorios Gamer 3D</h3>
                <p class="precio">$60.000</p>
                <button>Ver más</button>
            </div>
        </div>
                <!-- PRODUCTO 9 -->
        <div class="producto-card">
            <img src="img/producto1.png" alt="Producto 1">
            <div class="producto-info">
                <h3>Figura Personalizada 3D</h3>
                <p class="precio">$85.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 10 -->
        <div class="producto-card">
            <img src="img/producto2.avif" alt="Producto 2">
            <div class="producto-info">
                <h3>Llaveros 3D Personalizados</h3>
                <p class="precio">$25.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 11 -->
        <div class="producto-card">
            <img src="img/producto3.webp" alt="Producto 3">
            <div class="producto-info">
                <h3>Prototipo Industrial</h3>
                <p class="precio">$150.000</p>
                <button>Ver más</button>
            </div>
        </div>

        <!-- PRODUCTO 12 -->
        <div class="producto-card">
            <img src="img/producto4.webp" alt="Producto 4">
            <div class="producto-info">
                <h3>Accesorios Gamer 3D</h3>
                <p class="precio">$60.000</p>
                <button>Ver más</button>
            </div>
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
</footer>`;
})();
