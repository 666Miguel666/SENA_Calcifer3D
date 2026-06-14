// Referencias a los elementos principales del formulario de login.
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");

// Base de la API Flask. Como frontend y backend viven en el mismo servidor,
// usamos una ruta relativa.
const API_BASE_URL = "/api";

// Mapa de roles a vistas.
// Cuando el backend valida el login y devuelve el rol,
// usamos este objeto para enviar al usuario al panel correcto.
const ROLE_REDIRECTS = {
    Admin: "adminPro.html",
    Vendedor: "vendedor.html",
    Comprador: "cliente.html",
    Contador: "contador.html"
};

function clearLoginErrors() {
    // Limpia mensajes viejos antes de una nueva validacion.
    loginMessage.textContent = "";
    document.querySelectorAll(".input-group .error-message").forEach((element) => {
        element.textContent = "";
    });
}

function setFieldError(input, message) {
    // Muestra error debajo del campo correspondiente.
    const container = input.closest(".input-group");
    const error = container?.querySelector(".error-message");
    if (error) {
        error.textContent = message;
    }
}

loginForm.addEventListener("submit", async (event) => {
    // Paso 1: evitar que el formulario recargue la pagina.
    event.preventDefault();
    clearLoginErrors();

    // Paso 2: leer credenciales escritas por el usuario.
    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    // Paso 3: validaciones basicas antes de llamar al backend.
    if (!email) {
        setFieldError(loginEmail, "El correo es obligatorio.");
        return;
    }

    if (!password) {
        setFieldError(loginPassword, "La contrasena es obligatoria.");
        return;
    }

    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    loginMessage.textContent = "Validando acceso...";

    try {
        // Paso 4: enviar el login al endpoint Flask /api/auth/login.
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        // Paso 5: si el backend rechaza el acceso, mostramos el mensaje.
        if (!response.ok || !result.ok) {
            loginMessage.textContent = result.message || "No fue posible iniciar sesion.";
            return;
        }

        // Paso 6: guardar la sesion en localStorage para proteger vistas
        // y mostrar nombre/rol dentro de los paneles.
        localStorage.setItem("calcifer_user", JSON.stringify(result.user));

        // Paso 7: redirigir segun el rol devuelto por el backend.
        const redirectUrl = ROLE_REDIRECTS[result.user.rol] || "/";
        window.location.href = redirectUrl;
    } catch (error) {
        // Si Flask no responde, avisamos al usuario.
        loginMessage.textContent = "No se pudo conectar con el servidor Python.";
    } finally {
        // Pase lo que pase, reactivamos el boton.
        submitButton.disabled = false;
    }
});
