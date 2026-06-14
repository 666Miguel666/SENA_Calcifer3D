// Referencias a campos del formulario de registro.
const tipoCliente = document.getElementById("tipoCliente");
const personaFields = document.getElementById("personaFields");
const empresaFields = document.getElementById("empresaFields");
const tipoDocumentoContainer = document.getElementById("tipoDocumentoContainer");
const labelDocumento = document.getElementById("labelDocumento");
const form = document.getElementById("registroForm");

// Base de la API Flask.
const API_BASE_URL = "/api";

// Mensaje visual que se agrega al formulario para informar exito o error.
let successMessage = document.createElement("div");
successMessage.className = "success-message";
form.appendChild(successMessage);

function createError(element, message) {
    // Crea o reutiliza un contenedor de error debajo del campo.
    let container = element.parentElement || element;
    let error = container.querySelector(".error-message");
    if (!error) {
        error = document.createElement("div");
        error.className = "error-message";
        container.appendChild(error);
    }
    error.textContent = message;
}

function clearError(element) {
    // Limpia errores anteriores para no acumular mensajes viejos.
    let container = element.parentElement || element;
    let error = container.querySelector(".error-message");
    if (error) {
        error.textContent = "";
    }
}

function setTipoDocumentoPorCliente(tipo) {
    // Cambia dinamicamente los campos visibles segun el tipo de cliente.
    // Si es empresa, mostramos NIT.
    // Si es persona, mostramos documento normal.
    if (tipo === "empresa") {
        personaFields.style.display = "none";
        empresaFields.style.display = "block";
        tipoDocumentoContainer.innerHTML = `
            <label>Tipo de Documento</label>
            <select id="tipoDocumento" required>
                <option value="nit">NIT</option>
            </select>
        `;
        labelDocumento.textContent = "Numero de NIT";
        return;
    }

    personaFields.style.display = "block";
    empresaFields.style.display = "none";
    tipoDocumentoContainer.innerHTML = `
        <label>Tipo de Documento</label>
        <select id="tipoDocumento" required>
            <option value="">Seleccione</option>
            <option value="cc">Cedula de Ciudadania</option>
            <option value="ce">Cedula de Extranjeria</option>
        </select>
    `;
    labelDocumento.textContent = "Numero de Documento";
}

tipoCliente.addEventListener("change", function () {
    // Cada vez que el usuario cambia el tipo de cliente,
    // se actualiza el formulario.
    setTipoDocumentoPorCliente(this.value);
});

form.addEventListener("submit", async function (e) {
    // Paso 1: evitar recarga completa del formulario.
    e.preventDefault();

    let valid = true;
    successMessage.textContent = "";

    // Paso 2: leer los valores actuales del formulario.
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const genero = document.getElementById("genero");
    const nombreEmpresa = document.getElementById("nombreEmpresa");
    const documento = document.getElementById("documento");
    const tipoDocumento = document.getElementById("tipoDocumento");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitButton = form.querySelector('button[type="submit"]');

    [
        nombre,
        apellidos,
        genero,
        nombreEmpresa,
        documento,
        tipoDocumento,
        email,
        telefono,
        direccion,
        password,
        confirmPassword
    ].forEach(clearError);

    // Paso 3: validar datos segun sea persona o empresa.
    if (tipoCliente.value === "persona") {
        if (!nombre.value.trim()) {
            createError(nombre, "El nombre es obligatorio.");
            valid = false;
        } else if (/\d/.test(nombre.value)) {
            createError(nombre, "El nombre no puede contener numeros.");
            valid = false;
        }

        if (!apellidos.value.trim()) {
            createError(apellidos, "Los apellidos son obligatorios.");
            valid = false;
        } else if (/\d/.test(apellidos.value)) {
            createError(apellidos, "Los apellidos no pueden contener numeros.");
            valid = false;
        }

        if (!genero.value) {
            createError(genero, "Seleccione un genero.");
            valid = false;
        }
    } else if (tipoCliente.value === "empresa") {
        if (!nombreEmpresa.value.trim()) {
            createError(nombreEmpresa, "El nombre de la empresa es obligatorio.");
            valid = false;
        }
    } else {
        createError(tipoCliente, "Seleccione un tipo de cliente.");
        valid = false;
    }

    // Paso 4: validar campos comunes del formulario.
    if (!documento.value.trim()) {
        createError(documento, "El documento es obligatorio.");
        valid = false;
    } else if (/[a-zA-Z]/.test(documento.value)) {
        createError(documento, "El documento o NIT no puede contener letras.");
        valid = false;
    }

    if (!tipoDocumento.value) {
        createError(tipoDocumento, "Seleccione un tipo de documento.");
        valid = false;
    }

    if (!email.value.trim()) {
        createError(email, "El correo electronico es obligatorio.");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        createError(email, "Correo electronico invalido.");
        valid = false;
    }

    if (!telefono.value.trim()) {
        createError(telefono, "El telefono es obligatorio.");
        valid = false;
    } else if (!/^\d{10}$/.test(telefono.value)) {
        createError(telefono, "El telefono debe tener 10 numeros.");
        valid = false;
    }

    if (!direccion.value.trim()) {
        createError(direccion, "La direccion es obligatoria.");
        valid = false;
    } else if (!/^[a-zA-Z0-9\s.,#-]{5,100}$/.test(direccion.value)) {
        createError(direccion, "Direccion invalida.");
        valid = false;
    }

    if (!password.value) {
        createError(password, "La contrasena es obligatoria.");
        valid = false;
    } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.value)) {
        createError(password, "La contrasena debe tener minimo 8 caracteres, una mayuscula y un numero.");
        valid = false;
    }

    if (!confirmPassword.value) {
        createError(confirmPassword, "Confirme la contrasena.");
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        createError(confirmPassword, "Las contrasenas no coinciden.");
        valid = false;
    }

    if (!valid) {
        // Si algo falla, no llamamos al backend.
        return;
    }

    // Paso 5: construir el payload que se enviara al endpoint
    // /api/clientes/registro en Flask.
    const payload = {
        tipoCliente: tipoCliente.value,
        nombre: nombre.value.trim(),
        apellidos: apellidos.value.trim(),
        genero: genero.value,
        nombreEmpresa: nombreEmpresa.value.trim(),
        documento: documento.value.trim(),
        tipoDocumento: tipoDocumento.value,
        email: email.value.trim(),
        telefono: telefono.value.trim(),
        direccion: direccion.value.trim(),
        password: password.value
    };

    submitButton.disabled = true;
    successMessage.textContent = "Registrando en la base de datos...";

    try {
        // Paso 6: enviar datos al backend.
        const response = await fetch(`${API_BASE_URL}/clientes/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        // Paso 7: si el backend responde con error, lo mostramos.
        if (!response.ok) {
            successMessage.textContent = result.message || "No fue posible completar el registro.";
            return;
        }

        // Paso 8: si sale bien, limpiamos y redirigimos al login.
        successMessage.textContent = result.message || "Registro exitoso.";
        form.reset();
        setTipoDocumentoPorCliente("persona");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    } catch (error) {
        // Error de red o servidor Flask apagado.
        successMessage.textContent = "No se pudo conectar con el servidor Python. Verifica que Flask este ejecutandose.";
    } finally {
        submitButton.disabled = false;
    }
});
