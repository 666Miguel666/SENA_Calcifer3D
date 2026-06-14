// Clave usada para guardar la sesion del usuario en el navegador.
const CALCIFER_STORAGE_KEY = "calcifer_user";

// Relacion entre pagina y roles permitidos.
// Si un usuario intenta abrir un panel que no corresponde a su rol,
// lo redirigimos al login.
const PAGE_ROLES = {
    "adminPro.html": ["Admin"],
    "vendedor.html": ["Vendedor"],
    "cliente.html": ["Comprador"],
    "contador.html": ["Contador"]
};

function getCurrentUser() {
    // Recupera la sesion guardada en localStorage.
    const raw = localStorage.getItem(CALCIFER_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(CALCIFER_STORAGE_KEY);
        return null;
    }
}

function logoutAndRedirect() {
    // Borra sesion local y envia al login.
    localStorage.removeItem(CALCIFER_STORAGE_KEY);
    window.location.href = "login.html";
}

function getCurrentPage() {
    // Obtiene el nombre del archivo actual, por ejemplo adminPro.html.
    return window.location.pathname.split("/").pop();
}

function protectPage() {
    // Paso 1: detecta la pagina actual.
    // Paso 2: revisa si esa pagina exige un rol.
    // Paso 3: si no hay sesion o el rol no coincide, redirige al login.
    const page = getCurrentPage();
    const allowedRoles = PAGE_ROLES[page];

    if (!allowedRoles) {
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        logoutAndRedirect();
        return;
    }

    if (!allowedRoles.includes(user.rol)) {
        logoutAndRedirect();
    }
}

function hydrateUserInfo() {
    // Rellena nombre y rol en los paneles usando los datos guardados
    // en localStorage despues del login.
    const user = getCurrentUser();
    if (!user) {
        return;
    }

    document.querySelectorAll(".profile-name, .cliente-name, .user-profile h4").forEach((element) => {
        element.textContent = user.nombre;
    });

    document.querySelectorAll(".profile-role, .cliente-role, .user-profile span").forEach((element) => {
        element.textContent = user.rol;
    });
}

function bindLogoutButtons() {
    // Conecta todos los botones de cerrar sesion visibles en las vistas.
    const logoutElements = document.querySelectorAll(".logout, .logout a");
    logoutElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            logoutAndRedirect();
        });
    });
}

// Protegemos la vista apenas carga el script.
protectPage();
document.addEventListener("DOMContentLoaded", () => {
    // Una vez cargado el DOM, mostramos nombre/rol y activamos logout.
    hydrateUserInfo();
    bindLogoutButtons();
});
