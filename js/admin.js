// Referencias para controlar el menu lateral del panel administrador.
const menuItems = document.querySelectorAll(".menu li");
const sections = document.querySelectorAll(".content-section");

// Cuerpo de la tabla donde renderizaremos usuarios reales desde MySQL.
const usuariosTableBody = document.getElementById("usuariosTableBody");
const addUserButton = document.getElementById("addUserButton");
const userForm = document.getElementById("userForm");
const userFormTitle = document.getElementById("userFormTitle");
const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const userRoleSelect = document.getElementById("userRole");
const userSubmitButton = document.getElementById("userSubmitButton");
const userCancelButton = document.getElementById("userCancelButton");
const userMessage = document.getElementById("userMessage");
const rolesTableBody = document.getElementById("rolesTableBody");
const roleForm = document.getElementById("roleForm");
const roleIdInput = document.getElementById("roleId");
const roleNameInput = document.getElementById("roleName");
const roleFormTitle = document.getElementById("roleFormTitle");
const roleSubmitButton = document.getElementById("roleSubmitButton");
const roleCancelButton = document.getElementById("roleCancelButton");
const roleMessage = document.getElementById("roleMessage");

// Base de la API Flask.
const API_BASE_URL = "/api";

let rolesCache = [];

menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Cambia la seccion visible del panel segun el item pulsado.
        menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        item.classList.add("active");

        sections.forEach((section) => {
            section.classList.remove("active-section");
        });

        const target = item.getAttribute("data-section");
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add("active-section");
        }
    });
});

const printAccountingButton = document.querySelector(".acciones-contables .btn");
if (printAccountingButton) {
    printAccountingButton.addEventListener("click", () => {
        // Imprime el contenido del registro contable.
        const contenido = document.getElementById("registro-contable").innerText;
        const ventana = window.open("", "", "width=800,height=600");
        ventana.document.write("<pre>" + contenido + "</pre>");
        ventana.document.close();
        ventana.print();
    });
}

const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        // Cierre de sesion manual desde el panel admin.
        localStorage.removeItem("calcifer_user");
        window.location.href = "login.html";
    });
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function cargarUsuarios() {
    // Este metodo conecta el panel admin con el backend real.
    // Hace GET a /api/usuarios y llena la tabla HTML.
    if (!usuariosTableBody) {
        return;
    }

    try {
        // Paso 1: pedir usuarios a Flask.
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        const result = await response.json();

        // Paso 2: si hay error, mostrar mensaje en la tabla.
        if (!response.ok || !result.ok) {
            usuariosTableBody.innerHTML = `
                <tr>
                    <td colspan="6">No fue posible cargar los usuarios.</td>
                </tr>
            `;
            return;
        }

        // Paso 3: renderizar cada usuario recibido en una fila.
        usuariosTableBody.innerHTML = result.data.map((usuario) => `
            <tr data-user-id="${escapeHtml(usuario.id)}" data-user-role-id="${escapeHtml(usuario.rol_id)}">
                <td>${escapeHtml(usuario.id)}</td>
                <td>${escapeHtml(usuario.nombre)}</td>
                <td>${escapeHtml(usuario.correo)}</td>
                <td>${escapeHtml(usuario.rol)}</td>
                <td>${escapeHtml(usuario.estado)}</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        // Si no hay conexion con Flask, avisamos dentro de la tabla.
        usuariosTableBody.innerHTML = `
            <tr>
                <td colspan="6">No hay conexion con la API de usuarios.</td>
            </tr>
        `;
    }
}

function mostrarMensajeRol(message, type = "info") {
    // Muestra mensajes del formulario de roles: exito, error o informacion.
    if (!roleMessage) {
        return;
    }

    roleMessage.textContent = message;
    roleMessage.className = `form-message ${type}`;
}

function mostrarMensajeUsuario(message, type = "info") {
    if (!userMessage) {
        return;
    }

    userMessage.textContent = message;
    userMessage.className = `form-message ${type}`;
}

function toggleUserForm(show = true) {
    if (!userForm) {
        return;
    }

    userForm.style.display = show ? "block" : "none";
}

function resetUserForm() {
    if (!userForm) {
        return;
    }

    userForm.reset();
    userIdInput.value = "";
    userFormTitle.textContent = "Crear usuario";
    userSubmitButton.textContent = "Guardar usuario";
    userPasswordInput.placeholder = "Obligatoria al crear";
    userPasswordInput.required = true;
    mostrarMensajeUsuario("");
}

function resetRoleForm() {
    // Limpia el formulario y vuelve al modo de creacion de rol.
    if (!roleForm) {
        return;
    }

    roleForm.reset();
    roleIdInput.value = "";
    roleFormTitle.textContent = "Crear rol";
    roleSubmitButton.textContent = "Guardar rol";
    mostrarMensajeRol("");
}

async function cargarRoles() {
    // READ del CRUD visual de roles.
    // Consulta /api/roles y llena la tabla del panel administrador.
    if (!rolesTableBody) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/roles`);
        const result = await response.json();

        if (!response.ok || !result.ok) {
            rolesTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No fue posible cargar los roles.</td>
                </tr>
            `;
            return;
        }

        rolesCache = result.data;

        if (userRoleSelect) {
            userRoleSelect.innerHTML = `
                <option value="">Selecciona un rol</option>
                ${rolesCache
                    .map(
                        (role) =>
                            `<option value="${escapeHtml(role.id)}">${escapeHtml(role.nombre)}</option>`,
                    )
                    .join("")}
            `;
        }

        if (rolesCache.length === 0) {
            rolesTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No hay roles registrados.</td>
                </tr>
            `;
            return;
        }

        rolesTableBody.innerHTML = rolesCache.map((role) => `
            <tr>
                <td>${escapeHtml(role.id)}</td>
                <td>${escapeHtml(role.nombre)}</td>
                <td>${escapeHtml(role.total_usuarios)}</td>
                <td>
                    <button class="btn-edit" data-role-action="edit" data-role-id="${escapeHtml(role.id)}">Editar</button>
                    <button class="btn-delete" data-role-action="delete" data-role-id="${escapeHtml(role.id)}">Eliminar</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        rolesTableBody.innerHTML = `
            <tr>
                <td colspan="4">No hay conexion con la API de roles.</td>
            </tr>
        `;
    }
}

async function guardarRol(event) {
    // CREATE y UPDATE del CRUD visual de roles.
    // Si no hay id crea un rol nuevo; si hay id actualiza el rol seleccionado.
    event.preventDefault();

    const roleId = roleIdInput.value;
    const nombre = roleNameInput.value.trim();

    if (!nombre) {
        mostrarMensajeRol("Escribe el nombre del rol.", "error");
        return;
    }

    const url = roleId ? `${API_BASE_URL}/roles/${roleId}` : `${API_BASE_URL}/roles`;
    const method = roleId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre }),
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
            mostrarMensajeRol(result.message || "No fue posible guardar el rol.", "error");
            return;
        }

        mostrarMensajeRol(result.message, "success");
        resetRoleForm();
        await cargarRoles();
        await cargarUsuarios();
    } catch (error) {
        mostrarMensajeRol("No hay conexion con la API de roles.", "error");
    }
}

async function eliminarRol(roleId) {
    // DELETE del CRUD visual de roles.
    // Pide confirmacion y solicita al backend eliminar el rol.
    const role = rolesCache.find((item) => String(item.id) === String(roleId));
    const roleName = role ? role.nombre : "este rol";

    if (!confirm(`¿Eliminar el rol "${roleName}"?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/roles/${roleId}`, {
            method: "DELETE",
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
            mostrarMensajeRol(result.message || "No fue posible eliminar el rol.", "error");
            return;
        }

        mostrarMensajeRol(result.message, "success");
        resetRoleForm();
        await cargarRoles();
    } catch (error) {
        mostrarMensajeRol("No hay conexion con la API de roles.", "error");
    }
}

async function guardarUsuario(event) {
    event.preventDefault();

    if (!userForm) {
        return;
    }

    const userId = userIdInput.value;
    const nombre = userNameInput.value.trim();
    const correo = userEmailInput.value.trim().toLowerCase();
    const password = userPasswordInput.value;
    const rol_id = userRoleSelect.value;

    if (!nombre || !correo || !rol_id || (!userId && !password)) {
        mostrarMensajeUsuario("Completa todos los campos obligatorios.", "error");
        return;
    }

    const url = userId ? `${API_BASE_URL}/usuarios/${userId}` : `${API_BASE_URL}/usuarios`;
    const method = userId ? "PUT" : "POST";
    const payload = { nombre, correo, rol_id };

    if (password) {
        payload.password = password;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
            mostrarMensajeUsuario(result.message || "No fue posible guardar el usuario.", "error");
            return;
        }

        mostrarMensajeUsuario(result.message, "success");
        await cargarUsuarios();
        await cargarRoles();
        resetUserForm();
        toggleUserForm(false);
    } catch (error) {
        mostrarMensajeUsuario("No hay conexion con la API de usuarios.", "error");
    }
}

function prepararEdicionUsuario(row) {
    if (!row) {
        return;
    }

    const userId = row.dataset.userId;
    const nombre = row.children[1].textContent.trim();
    const correo = row.children[2].textContent.trim();
    const rolId = row.dataset.userRoleId;

    userIdInput.value = userId;
    userNameInput.value = nombre;
    userEmailInput.value = correo;
    userPasswordInput.value = "";
    userPasswordInput.placeholder = "Dejar vacío para no cambiar";
    userPasswordInput.required = false;
    userRoleSelect.value = rolId || "";
    userFormTitle.textContent = "Editar usuario";
    userSubmitButton.textContent = "Actualizar usuario";
    mostrarMensajeUsuario("");
    toggleUserForm(true);
    userNameInput.focus();
}

async function eliminarUsuario(userId) {
    if (!userId) {
        mostrarMensajeUsuario("No se encontró el usuario.", "error");
        return;
    }

    if (!confirm("¿Deseas eliminar este usuario?")) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
            method: "DELETE",
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
            mostrarMensajeUsuario(result.message || "No fue posible eliminar el usuario.", "error");
            return;
        }

        mostrarMensajeUsuario(result.message, "success");
        await cargarUsuarios();
        await cargarRoles();
    } catch (error) {
        mostrarMensajeUsuario("No hay conexion con la API de usuarios.", "error");
    }
}

if (addUserButton) {
    addUserButton.addEventListener("click", (event) => {
        event.preventDefault();
        resetUserForm();
        toggleUserForm(true);
        userNameInput.focus();
    });
}

if (userCancelButton) {
    userCancelButton.addEventListener("click", () => {
        resetUserForm();
        toggleUserForm(false);
    });
}

if (userForm) {
    userForm.addEventListener("submit", guardarUsuario);
}

if (usuariosTableBody) {
    usuariosTableBody.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) {
            return;
        }

        const row = button.closest("tr");
        if (!row) {
            return;
        }

        if (button.classList.contains("btn-edit")) {
            prepararEdicionUsuario(row);
            return;
        }

        if (button.classList.contains("btn-delete")) {
            eliminarUsuario(row.dataset.userId);
        }
    });
}

if (roleForm) {
    // Conecta el formulario con crear/actualizar roles.
    roleForm.addEventListener("submit", guardarRol);
}

if (roleCancelButton) {
    // Cancela la edicion y deja listo el formulario para un nuevo rol.
    roleCancelButton.addEventListener("click", resetRoleForm);
}

if (rolesTableBody) {
    // Escucha los botones de editar y eliminar dentro de la tabla de roles.
    rolesTableBody.addEventListener("click", (event) => {
        const button = event.target.closest("[data-role-action]");
        if (!button) {
            return;
        }

        const roleId = button.getAttribute("data-role-id");
        const action = button.getAttribute("data-role-action");

        if (action === "edit") {
            const role = rolesCache.find((item) => String(item.id) === String(roleId));
            if (!role) {
                return;
            }

            roleIdInput.value = role.id;
            roleNameInput.value = role.nombre;
            roleFormTitle.textContent = "Editar rol";
            roleSubmitButton.textContent = "Actualizar rol";
            mostrarMensajeRol("");
            roleNameInput.focus();
            return;
        }

        if (action === "delete") {
            eliminarRol(roleId);
        }
    });
}

// Cargamos usuarios apenas entra el administrador al panel.
cargarUsuarios();
cargarRoles();
