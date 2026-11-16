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
// Referencias para el modulo de inventario.
const inventarioTableBody = document.getElementById("inventarioTableBody");
const buscarProductoInput = document.getElementById("buscarProducto");
const filtroCategoriaSelect = document.getElementById("filtroCategoria");
const inventarioMessage = document.getElementById("inventarioMessage");
const addProductButton = document.getElementById("addProductButton");

// Referencias del formulario de productos.
const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productBrandInput = document.getElementById("productBrand");
const productColorInput = document.getElementById("productColor");
const productCategorySelect = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productQuantityInput = document.getElementById("productQuantity");
const productLocationSelect = document.getElementById("productLocation");
const productPurchasePriceInput = document.getElementById("productPurchasePrice");
const productPhysicalPriceInput = document.getElementById("productPhysicalPrice");
const productSocialPriceInput = document.getElementById("productSocialPrice");
const productMarketplacePriceInput = document.getElementById("productMarketplacePrice");
const productPhotoInput = document.getElementById("productPhoto");
const productPhotoPreview = document.getElementById("productPhotoPreview");
const productPhotoPreviewImage = document.getElementById("productPhotoPreviewImage");
const productPhotoPreviewText = document.getElementById("productPhotoPreviewText");
const productCancelButton = document.getElementById("productCancelButton");
const productMessage = document.getElementById("productMessage");
const productSubmitButton = document.getElementById("productSubmitButton");

// Elementos del modal de confirmación de eliminación.
const modalEliminarProducto = document.getElementById("modalEliminarProducto");
const modalProductoNombre = document.getElementById("modalProductoNombre");
const modalProductoId = document.getElementById("modalProductoId");
const cancelarEliminarProducto = document.getElementById("cancelarEliminarProducto");
const confirmarEliminarProducto = document.getElementById("confirmarEliminarProducto");

// Producto pendiente de eliminación.
let productoPendienteEliminar = null;


// ==========================================
// REFERENCIAS DEL MODAL DE CATEGORÍAS
// ==========================================

const manageCategoriesButton = document.getElementById("manageCategoriesButton");
const modalCategorias = document.getElementById("modalCategorias");

const categoriaForm = document.getElementById("categoriaForm");
const categoriaIdInput = document.getElementById("categoriaId");
const categoriaNombreInput = document.getElementById("categoriaNombre");
const categoriaDescripcionInput = document.getElementById("categoriaDescripcion");

const guardarCategoriaButton = document.getElementById("guardarCategoria");
const cancelarEdicionCategoriaButton = document.getElementById("cancelarEdicionCategoria");
const cerrarModalCategoriasButton = document.getElementById("cerrarModalCategorias");

const categoriaMessage = document.getElementById("categoriaMessage");
const categoriasTableBody = document.getElementById("categoriasTableBody");

// Referencias del modal para eliminar categorías
const modalEliminarCategoria = document.getElementById("modalEliminarCategoria");
const nombreCategoriaEliminar = document.getElementById("nombreCategoriaEliminar");
const cancelarEliminarCategoriaButton = document.getElementById("cancelarEliminarCategoria");
const confirmarEliminarCategoriaButton = document.getElementById("confirmarEliminarCategoria");

// ==========================================
// REFERENCIAS DEL MODAL DETALLE DE PRODUCTO
// ==========================================

const modalDetalleProducto = document.getElementById("modalDetalleProducto");

const cerrarDetalleProducto = document.getElementById("cerrarDetalleProducto");
const cerrarDetalleProductoFooter = document.getElementById("cerrarDetalleProductoFooter");
const editarDesdeDetalle = document.getElementById("editarDesdeDetalle");

const detalleProductoId = document.getElementById("detalleProductoId");
const detalleProductoFoto = document.getElementById("detalleProductoFoto");
const detalleProductoEstado = document.getElementById("detalleProductoEstado");

const detalleProductoNombre = document.getElementById("detalleProductoNombre");
const detalleProductoMarca = document.getElementById("detalleProductoMarca");
const detalleProductoColor = document.getElementById("detalleProductoColor");
const detalleProductoCategoria = document.getElementById("detalleProductoCategoria");
const detalleProductoDescripcion = document.getElementById("detalleProductoDescripcion");

const detalleProductoCantidad = document.getElementById("detalleProductoCantidad");
const detalleProductoUbicacion = document.getElementById("detalleProductoUbicacion");

const detallePrecioCompra = document.getElementById("detallePrecioCompra");
const detallePrecioFisico = document.getElementById("detallePrecioFisico");
const detallePrecioRedes = document.getElementById("detallePrecioRedes");
const detallePrecioMercadoLibre = document.getElementById("detallePrecioMercadoLibre");

// Producto que se está visualizando.
let productoDetalleActual = null;
// Categoría seleccionada para eliminar
let categoriaPendienteEliminar = null;

// Cache de categorías recibidas desde MySQL.
let categoriasCache = [];

// Cache de productos recibidos desde MySQL.
let productosCache = [];

// ID del producto que se está editando.
// Si es null, estamos registrando un producto nuevo.
let productoEditandoId = null;

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

// ==========================================
// MODULO DE INVENTARIO - CONSULTA DE MYSQL
// ==========================================

// Formatear valores monetarios en pesos colombianos.
function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(valor) || 0);
}

// Mostrar mensajes en el modulo de inventario.
function mostrarMensajeInventario(mensaje, tipo = "") {
    if (!inventarioMessage) return;

    inventarioMessage.textContent = mensaje;
    inventarioMessage.className = tipo;
}

// Cargar categorias desde la API.
async function cargarCategorias() {
    if (!filtroCategoriaSelect) return;

    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(result.message || "Error al cargar categorias.");
        }

        
    filtroCategoriaSelect.innerHTML =
    '<option value="">Todas las categorias</option>';

        if (productCategorySelect) {
            productCategorySelect.innerHTML =
            '<option value="">Sin categoría</option>';
        }

    result.data.forEach((categoria) => {
        // Opción para filtrar el inventario por nombre.
        const filterOption = document.createElement("option");
        filterOption.value = categoria.nombre;
        filterOption.textContent = categoria.nombre;
        filtroCategoriaSelect.appendChild(filterOption);

        // Opción para registrar el producto usando el ID real.
        if (productCategorySelect) {
            const productOption = document.createElement("option");
            productOption.value = categoria.id;
            productOption.textContent = categoria.nombre;
            productCategorySelect.appendChild(productOption);
        }
    });

    categoriasCache = result.data || [];

    } catch (error) {
        console.error("Error cargando categorias:", error);
        mostrarMensajeInventario(
            "No fue posible cargar las categorias.",
            "error"
        );
    }
}


// ==========================================
// CRUD DE CATEGORÍAS
// ==========================================

// Abrir la ventana de gestión.
async function abrirModalCategorias() {
    if (!modalCategorias) return;

    modalCategorias.hidden = false;
    resetCategoriaForm();

    await cargarCategorias();
    await cargarCategoriasTabla();
}

// Cerrar la ventana.
function cerrarModalCategorias() {
    if (!modalCategorias) return;

    modalCategorias.hidden = true;
    resetCategoriaForm();
}

// Mostrar mensajes de categorías.
function mostrarMensajeCategoria(mensaje, tipo = "") {
    if (!categoriaMessage) return;

    categoriaMessage.textContent = mensaje;
    categoriaMessage.className = `form-message ${tipo}`;
}

// Limpiar el formulario.
function resetCategoriaForm() {
    if (!categoriaForm) return;

    categoriaForm.reset();
    categoriaIdInput.value = "";

    guardarCategoriaButton.textContent = "Guardar categoría";

    mostrarMensajeCategoria("");
}

// Consultar categorías y actualizar la tabla.
async function cargarCategoriasTabla() {
    if (!categoriasTableBody) return;

    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(result.message || "No fue posible cargar las categorías.");
        }

        categoriasCache = result.data || [];

        if (categoriasCache.length === 0) {
            categoriasTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No hay categorías registradas.</td>
                </tr>
            `;
            return;
        }

        categoriasTableBody.innerHTML = categoriasCache.map((categoria) => `
            <tr>
                <td>${escapeHtml(categoria.id)}</td>
                <td>${escapeHtml(categoria.nombre)}</td>
                <td>${escapeHtml(categoria.descripcion || "—")}</td>
                <td>
                    <button
                        type="button"
                        class="btn-edit"
                        data-category-action="edit"
                        data-category-id="${escapeHtml(categoria.id)}">
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn-delete"
                        data-category-action="delete"
                        data-category-id="${escapeHtml(categoria.id)}">
                        Eliminar
                    </button>
                </td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Error cargando categorías:", error);

        categoriasTableBody.innerHTML = `
            <tr>
                <td colspan="4">No fue posible cargar las categorías.</td>
            </tr>
        `;
    }
}

// Registrar una categoría nueva o actualizar una existente.
async function guardarCategoria(event) {
    event.preventDefault();

    const categoriaId = categoriaIdInput.value;
    const nombre = categoriaNombreInput.value.trim();
    const descripcion = categoriaDescripcionInput.value.trim();

    if (!nombre) {
        mostrarMensajeCategoria("El nombre de la categoría es obligatorio.", "error");
        return;
    }

    const url = categoriaId
        ? `${API_BASE_URL}/categorias/${categoriaId}`
        : `${API_BASE_URL}/categorias`;

    const method = categoriaId ? "PUT" : "POST";

    guardarCategoriaButton.disabled = true;
    guardarCategoriaButton.textContent = categoriaId ? "Actualizando..." : "Guardando...";

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, descripcion })
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(result.message || "No fue posible guardar la categoría.");
        }

        mostrarMensajeCategoria(result.message, "success");

        resetCategoriaForm();

        await cargarCategorias();
        await cargarCategoriasTabla();

        mostrarMensajeCategoria(
            result.message || "¡Categoría guardada correctamente!",
            "success"
        );

    } catch (error) {
        console.error("Error guardando categoría:", error);
        mostrarMensajeCategoria(error.message, "error");

    } finally {
        guardarCategoriaButton.disabled = false;
        guardarCategoriaButton.textContent = categoriaIdInput.value
            ? "Actualizar categoría"
            : "Guardar categoría";
    }
}

// Preparar una categoría para editar.
function prepararEdicionCategoria(categoriaId) {
    const categoria = categoriasCache.find(
        (item) => String(item.id) === String(categoriaId)
    );

    if (!categoria) return;

    categoriaIdInput.value = categoria.id;
    categoriaNombreInput.value = categoria.nombre;
    categoriaDescripcionInput.value = categoria.descripcion || "";

    guardarCategoriaButton.textContent = "Actualizar categoría";

    mostrarMensajeCategoria("");

    categoriaNombreInput.focus();
}


// Abre el modal y prepara la categoría seleccionada

async function abrirModalEliminarCategoria(categoriaId) {
    const categoria = categoriasCache.find(
        (item) => String(item.id) === String(categoriaId)
    );

    if (!categoria || !modalEliminarCategoria) return;

    categoriaPendienteEliminar = categoria.id;
    nombreCategoriaEliminar.textContent = categoria.nombre;

    const resumen = document.getElementById("resumenProductosCategoria");
    const totalProductos = document.getElementById("totalProductosCategoriaEliminar");
    const listaProductos = document.getElementById("listaProductosCategoriaEliminar");
    const mensajeSinProductos = document.getElementById("categoriaSinProductos");

    // Estado inicial mientras se consulta el servidor
    resumen.hidden = false;
    mensajeSinProductos.hidden = true;
    totalProductos.textContent = "...";
    listaProductos.innerHTML = "<p>Consultando productos asociados...</p>";

    modalEliminarCategoria.hidden = false;

    try {
        const response = await fetch(
            `${API_BASE_URL}/categorias/${categoriaId}/productos`
        );

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(
                result.message || "No fue posible consultar los productos."
            );
        }

        const productos = result.data || [];

        totalProductos.textContent = productos.length;

        if (productos.length > 0) {
            listaProductos.innerHTML = `
                <ul>
                    ${productos.map(producto => `
                        <li>${escapeHtml(producto.nombre)}</li>
                    `).join("")}
                </ul>
            `;

            resumen.hidden = false;
            mensajeSinProductos.hidden = true;
        } else {
            resumen.hidden = true;
            mensajeSinProductos.hidden = false;
        }

    } catch (error) {
        console.error("Error consultando productos de categoría:", error);

        listaProductos.innerHTML = `
            <p>No fue posible cargar los productos asociados.</p>
            <p>${escapeHtml(error.message)}</p>
        `;

        resumen.hidden = false;
        totalProductos.textContent = "?";
    }
}


// Ejecuta la eliminación después de confirmar en el modal

async function confirmarEliminacionCategoria() {
    if (categoriaPendienteEliminar === null) return;

    const categoriaId = categoriaPendienteEliminar;
    const textoOriginal = confirmarEliminarCategoriaButton.textContent;

    try {
        confirmarEliminarCategoriaButton.disabled = true;
        confirmarEliminarCategoriaButton.textContent = "Eliminando...";

        const response = await fetch(
            `${API_BASE_URL}/categorias/${categoriaId}`,
            { method: "DELETE" }
        );

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(
                result.message || "No fue posible eliminar la categoría."
            );
        }

        cerrarModalEliminarCategoria();
        resetCategoriaForm();

        // Actualizar las categorías y el inventario.
        await cargarCategorias();
        await cargarCategoriasTabla();
        await cargarProductos();

        mostrarMensajeCategoria(
            result.message || "Categoría eliminada correctamente.",
            "success"
        );

    } catch (error) {
        console.error("Error eliminando categoría:", error);

        cerrarModalEliminarCategoria();

        mostrarMensajeCategoria(error.message, "error");

    } finally {
        confirmarEliminarCategoriaButton.disabled = false;
        confirmarEliminarCategoriaButton.textContent = textoOriginal;
    }
}


// Cierra el modal y limpia la selección
function cerrarModalEliminarCategoria() {
    if (!modalEliminarCategoria) return;

    modalEliminarCategoria.hidden = true;
    categoriaPendienteEliminar = null;
}


// Consultar productos desde MySQL.
async function cargarProductos() {
    if (!inventarioTableBody) return;

    inventarioTableBody.innerHTML = `
        <tr>
            <td colspan="9">Cargando inventario...</td>
        </tr>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/productos`);
        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(result.message || "Error al consultar productos.");
        }

        productosCache = Array.isArray(result.data) ? result.data : [];

        mostrarMensajeInventario("");
        renderizarProductos();

    } catch (error) {
        console.error("Error cargando productos:", error);

        inventarioTableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No fue posible cargar el inventario.
                </td>
            </tr>
        `;

        mostrarMensajeInventario(
            "No hay conexión con la API de productos.",
            "error"
        );
    }
}


// ==========================================
// DETALLE DEL PRODUCTO
// ==========================================

// Abrir el modal y cargar la información del producto.
function abrirDetalleProducto(productoId) {

    const producto = productosCache.find(
        (item) => String(item.id) === String(productoId)
    );

    if (!producto || !modalDetalleProducto) {
        console.error("No se encontró el producto:", productoId);
        return;
    }

    productoDetalleActual = producto;

    // Identificación del producto.
    detalleProductoId.textContent = `Código: PRD-${producto.id}`;
    detalleProductoNombre.textContent = producto.nombre || "Sin nombre";

    // Información general.
    detalleProductoMarca.textContent = producto.marca || "Sin marca";
    detalleProductoColor.textContent = producto.color || "Sin color";
    detalleProductoCategoria.textContent = producto.categoria || "Sin categoría";
    detalleProductoDescripcion.textContent =
        producto.descripcion || "Este producto no tiene descripción.";

    // Inventario.
    detalleProductoCantidad.textContent =
        `${producto.cantidad ?? 0} unidades`;

    detalleProductoUbicacion.textContent =
        producto.ubicacion || "Sin ubicación";

    // Fotografía.
    const imagen = String(producto.foto || "").trim();

    const imagenSegura =
        /^(https?:\/\/|\/|\.\/|\.\.\/|backend_python\/static\/uploads\/productos\/)/i.test(imagen);

    const rutaImagen = imagen.startsWith("backend_python/")
        ? `/${imagen}`
        : imagen;

    if (imagen && imagenSegura) {
        detalleProductoFoto.src = rutaImagen;
        detalleProductoFoto.alt = producto.nombre || "Fotografía del producto";
        detalleProductoFoto.hidden = false;
    } else {
        detalleProductoFoto.src = "";
        detalleProductoFoto.alt = "Producto sin fotografía";
        detalleProductoFoto.hidden = true;
    }

    // Estado del inventario.
    const cantidad = Number(producto.cantidad) || 0;

    if (cantidad > 0) {
        detalleProductoEstado.textContent = "Disponible";
        detalleProductoEstado.classList.remove("sin-stock");
    } else {
        detalleProductoEstado.textContent = "Agotado";
        detalleProductoEstado.classList.add("sin-stock");
    }

    // Precios.
    detallePrecioCompra.textContent =
        formatearPrecio(producto.precio_compra);

    detallePrecioFisico.textContent =
        formatearPrecio(producto.precio_fisico);

    detallePrecioRedes.textContent =
        formatearPrecio(producto.precio_redes);

    detallePrecioMercadoLibre.textContent =
        formatearPrecio(producto.precio_mercadolibre);

    // Mostrar modal.
    modalDetalleProducto.hidden = false;
}


// Cerrar el modal de detalle.
function cerrarDetalleProductoModal() {
    if (!modalDetalleProducto) return;

    modalDetalleProducto.hidden = true;
    productoDetalleActual = null;
}


// Mostrar los productos en la tabla.
function renderizarProductos() {
    if (!inventarioTableBody) return;

    const textoBusqueda = (buscarProductoInput?.value || "")
        .trim()
        .toLowerCase();

    const categoriaSeleccionada = filtroCategoriaSelect?.value || "";

    const productosFiltrados = productosCache.filter((producto) => {
        const textoProducto = [
            producto.nombre,
            producto.marca,
            producto.descripcion,
            producto.categoria
        ].join(" ").toLowerCase();

        const coincideTexto = textoProducto.includes(textoBusqueda);

        const coincideCategoria =
            !categoriaSeleccionada ||
            producto.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    if (productosFiltrados.length === 0) {
        inventarioTableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No se encontraron productos.
                </td>
            </tr>
        `;
        return;
    }

    inventarioTableBody.innerHTML = productosFiltrados.map((producto) => {

        const imagen = String(producto.foto || "").trim();

        // Aceptar las rutas de fotografías guardadas por nuestro backend.
        const imagenSegura =
            /^(https?:\/\/|\/|\.\/|\.\.\/|backend_python\/static\/uploads\/productos\/)/i.test(imagen);

        // Agregar "/" al inicio para que el navegador encuentre la imagen.
        const rutaImagen = imagen.startsWith("backend_python/")
            ? `/${imagen}`
            : imagen;

        const imagenHTML = imagen && imagenSegura
            ? `<img
                    src="${escapeHtml(rutaImagen)}"
                    alt="${escapeHtml(producto.nombre)}"
                    width="55"
                    height="55"
                    style="width:55px;height:55px;object-fit:contain;border-radius:6px;"
            >`
            : "Sin imagen";


        return `
            <tr data-product-id="${escapeHtml(producto.id)}">
                <td>${escapeHtml(producto.id)}</td>
                <td>${imagenHTML}</td>
                <td>
                    <strong>${escapeHtml(producto.nombre)}</strong>
                    <br>
                    <small>${escapeHtml(producto.descripcion || "")}</small>
                </td>
                <td>${escapeHtml(producto.marca || "—")}</td>
                <td>${escapeHtml(producto.categoria || "Sin categoría")}</td>
                <td>${escapeHtml(producto.cantidad ?? 0)}</td>
                <td>${formatearPrecio(producto.precio_fisico)}</td>
                <td>${escapeHtml(producto.ubicacion || "Sin ubicación")}</td>
                <td class="acciones-producto">
                    <button
                        type="button"
                        class="btn-editar-producto"
                        data-product-id="${escapeHtml(producto.id)}"
                        title="Editar producto">
                        <span class="icono-accion">✏</span>
                        <span>Editar</span>
                    </button>

                    <button
                        type="button"
                        class="btn-eliminar-producto"
                        data-product-id="${escapeHtml(producto.id)}"
                        title="Eliminar producto">
                        <span class="icono-accion">🗑</span>
                        <span>Eliminar</span>
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}



// ==========================================
// EVENTOS DE LA TABLA DE INVENTARIO
// ==========================================

if (inventarioTableBody) {
    inventarioTableBody.addEventListener("click", (event) => {

        // Primero verificamos si se pulsó Editar.
        const botonEditar = event.target.closest(".btn-editar-producto");

        if (botonEditar) {
            const productoId = botonEditar.dataset.productId;
            cargarProductoParaEditar(productoId);
            return;
        }

        // Después verificamos si se pulsó Eliminar.
        const botonEliminar = event.target.closest(".btn-eliminar-producto");

        if (botonEliminar) {
            const productoId = botonEliminar.dataset.productId;
            abrirModalEliminar(productoId);
            return;
        }

        // Si no se pulsó ningún botón, verificamos la fila.
        const fila = event.target.closest("tr");

        if (fila && fila.dataset.productId) {
            abrirDetalleProducto(fila.dataset.productId);
        }
    });
}


// Botón Cancelar del modal.
if (cancelarEliminarProducto) {
    cancelarEliminarProducto.addEventListener("click", cerrarModalEliminar);
}

// Botón Confirmar eliminación del modal.
if (confirmarEliminarProducto) {
    confirmarEliminarProducto.addEventListener(
        "click",
        confirmarEliminacionProducto
    );
}

// Cerrar el modal al hacer clic sobre el fondo oscuro.
if (modalEliminarProducto) {
    modalEliminarProducto.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-eliminar-overlay")) {
            cerrarModalEliminar();
        }
    });
}

// Cerrar el modal al presionar Escape.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalEliminarProducto &&
        !modalEliminarProducto.hidden) {
        cerrarModalEliminar();
    }
    if (modalEliminarCategoria && !modalEliminarCategoria.hidden) {
    cerrarModalEliminarCategoria();
}
});


// Conectar el buscador con la tabla.
if (buscarProductoInput) {
    buscarProductoInput.addEventListener("input", renderizarProductos);
}

// Conectar el filtro de categorias.
if (filtroCategoriaSelect) {
    filtroCategoriaSelect.addEventListener("change", renderizarProductos);
}

/* ==========================================
   CONTROL DEL FORMULARIO DE PRODUCTOS
========================================== */

// Abrir o cerrar el formulario.
function toggleProductForm(mostrar) {
    if (!productForm) return;

    productForm.classList.toggle("active", mostrar);
}

// Limpiar los campos del formulario.
function resetProductForm() {
    if (!productForm) return;

    productForm.reset();

    // Volver al modo de registro de productos.
    productoEditandoId = null;

    if (productSubmitButton) {
        productSubmitButton.textContent = "Guardar producto";
    }

    if (productMessage) {
        productMessage.textContent = "";
        productMessage.className = "form-message";
    }
}

// Cargar los datos de un producto en el formulario para editarlo.
function cargarProductoParaEditar(productoId) {
    const producto = productosCache.find(
        (item) => Number(item.id) === Number(productoId)
    );

    if (!producto) {
        if (productMessage) {
            productMessage.textContent = "No se encontró el producto.";
            productMessage.className = "form-message error";
        }
        return;
    }

    // Cargar los datos del producto.
    productNameInput.value = producto.nombre || "";
    productBrandInput.value = producto.marca || "";
    productColorInput.value = producto.color || "";
    productCategorySelect.value = producto.categoria_id ?? "";
    productDescriptionInput.value = producto.descripcion || "";
    productQuantityInput.value = producto.cantidad ?? 0;
    productLocationSelect.value = producto.ubicacion || "";
    productPurchasePriceInput.value = producto.precio_compra ?? "";
    productPhysicalPriceInput.value = producto.precio_fisico ?? "";
    productSocialPriceInput.value = producto.precio_redes ?? "";
    productMarketplacePriceInput.value = producto.precio_mercadolibre ?? "";
    // Limpiar el selector de archivos.
    // El navegador no permite cargar una ruta directamente en un input file.
    productPhotoInput.value = "";
    // Mostrar la fotografía que ya tiene registrada el producto.
    console.log("Ruta de fotografía:", producto.foto);
    if (producto.foto) {
        productPhotoPreviewImage.src = `/${producto.foto}`;
        productPhotoPreviewImage.hidden = false;
        productPhotoPreviewText.hidden = true;
    } else {
        productPhotoPreviewImage.src = "";
        productPhotoPreviewImage.hidden = true;
        productPhotoPreviewText.hidden = false;
    }

    // Activar el modo de edición.
    productoEditandoId = producto.id;

    if (productSubmitButton) {
        productSubmitButton.textContent = "Actualizar producto";
    }

    if (productMessage) {
        productMessage.textContent = "";
        productMessage.className = "form-message";
    }

    toggleProductForm(true);
}


// Abrir el modal y preparar el producto que se desea eliminar.
function abrirModalEliminar(productoId) {
    const producto = productosCache.find(
        (item) => String(item.id) === String(productoId)
    );

    if (!producto) {
        console.error("No se encontró el producto:", productoId);
        return;
    }

    productoPendienteEliminar = producto.id;

    modalProductoNombre.textContent = producto.nombre;
    modalProductoId.textContent = `ID: ${producto.id}`;

    modalEliminarProducto.hidden = false;
}

// Cerrar el modal sin eliminar el producto.
function cerrarModalEliminar() {
    modalEliminarProducto.hidden = true;
    productoPendienteEliminar = null;
}

// Ejecutar la eliminación cuando el usuario confirma.
async function confirmarEliminacionProducto() {
    if (productoPendienteEliminar === null) return;

    const productoId = productoPendienteEliminar;

    confirmarEliminarProducto.disabled = true;
    confirmarEliminarProducto.textContent = "Eliminando...";

    try {
        mostrarNotificacion(
            inventarioMessage,
            "Eliminando producto...",
            "info",
            0
        );

        const response = await fetch(
            `${API_BASE_URL}/productos/${productoId}`,
            { method: "DELETE" }
        );

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(
                result.message || "No fue posible eliminar el producto."
            );
        }

        cerrarModalEliminar();

        await cargarProductos();

        mostrarNotificacion(
            inventarioMessage,
            "¡Producto eliminado correctamente!",
            "success",
            5000
        );

   } catch (error) {
        console.error("Error eliminando producto:", error);

        mostrarNotificacion(
            inventarioMessage,
            error.message,
            "error",
            0
        );

    } finally {
        confirmarEliminarProducto.disabled = false;
        confirmarEliminarProducto.textContent = "Eliminar producto";
    }
}

// Mostrar notificaciones del sistema.
function mostrarNotificacion(elemento, mensaje, tipo, duracion = 5000) {
    if (!elemento) return;

    elemento.textContent = mensaje;
    elemento.className = `form-message ${tipo}`;

    // Cancelar el temporizador anterior si existe.
    if (elemento.dataset.temporizador) {
        clearTimeout(Number(elemento.dataset.temporizador));
    }

    // Los mensajes de éxito desaparecen después del tiempo indicado.
    if (tipo === "success" && duracion > 0) {
        const temporizador = setTimeout(() => {
            elemento.textContent = "";
            elemento.className = "form-message";
            delete elemento.dataset.temporizador;
        }, duracion);

        elemento.dataset.temporizador = temporizador;
    }
}

// Mostrar una vista previa de la fotografía seleccionada.
function mostrarVistaPreviaProducto() {
    const archivo = productPhotoInput.files[0];

    if (!archivo) {
        productPhotoPreviewImage.hidden = true;
        productPhotoPreviewImage.src = "";
        productPhotoPreviewText.hidden = false;
        return;
    }

    if (!archivo.type.startsWith("image/")) {
        mostrarNotificacion(
            productMessage,
            "Selecciona un archivo de imagen válido.",
            "error",
            5000
        );

        productPhotoInput.value = "";
        return;
    }

    const imagenURL = URL.createObjectURL(archivo);

    productPhotoPreviewImage.src = imagenURL;
    productPhotoPreviewImage.hidden = false;
    productPhotoPreviewText.hidden = true;
}

// Registrar un producto nuevo o actualizar uno existente.
async function guardarProducto(event) {
    event.preventDefault();

    if (!productForm) return;

    const editando = productoEditandoId !== null;

    const formData = new FormData();

        formData.append("nombre", productNameInput.value.trim());
        formData.append("marca", productBrandInput.value.trim());
        formData.append("color", productColorInput.value.trim());

        formData.append(
            "categoria_id",
            productCategorySelect.value || ""
        );

        formData.append("descripcion", productDescriptionInput.value.trim());
        formData.append("cantidad", productQuantityInput.value);
        formData.append("ubicacion", productLocationSelect.value);
        formData.append("precio_compra", productPurchasePriceInput.value);
        formData.append("precio_fisico", productPhysicalPriceInput.value);
        formData.append("precio_redes", productSocialPriceInput.value);
        formData.append("precio_mercadolibre", productMarketplacePriceInput.value);

        // Adjuntar la fotografía si se seleccionó una.
        if (productPhotoInput.files.length > 0) {
            formData.append("foto", productPhotoInput.files[0]);
        }

            try {
                productSubmitButton.disabled = true;
                productSubmitButton.textContent = editando
                    ? "Actualizando..."
                    : "Guardando...";

                mostrarNotificacion(
                    productMessage,
                    editando ? "Actualizando producto..." : "Registrando producto...",
                    "info",
                    0
                    );

        productMessage.className = "form-message";

        const url = editando
            ? `${API_BASE_URL}/productos/${productoEditandoId}`
            : `${API_BASE_URL}/productos`;

        const response = await fetch(url, {
            method: editando ? "PUT" : "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(
                result.message || "No fue posible guardar el producto."
            );
        }

        const mensajeExito = editando
            ? "¡Producto actualizado correctamente!"
            : "¡Producto registrado correctamente!";

        await cargarProductos();

        resetProductForm();
        toggleProductForm(false);

        mostrarNotificacion(
            inventarioMessage,
            mensajeExito,
            "success",
            5000
        );

    } catch (error) {
        console.error("Error guardando producto:", error);

        mostrarNotificacion(
            productMessage,
            error.message,
            "error",
            0
        );

    } finally {
        productSubmitButton.disabled = false;
        productSubmitButton.textContent = productoEditandoId !== null
            ? "Actualizar producto"
            : "Guardar producto";
    }
}


// Botón Agregar producto.
if (addProductButton) {
    addProductButton.addEventListener("click", (event) => {
        event.preventDefault();

        resetProductForm();
        toggleProductForm(true);

        if (productNameInput) {
            productNameInput.focus();
        }
    });
}

// Botón Cancelar.
if (productCancelButton) {
    productCancelButton.addEventListener("click", () => {
        resetProductForm();
        toggleProductForm(false);
    });
}

// Conectar el formulario con el guardado en MySQL.
if (productForm) {
    productForm.addEventListener("submit", guardarProducto);
}

productPhotoInput.addEventListener(
    "change",
    mostrarVistaPreviaProducto
);


// ==========================================
// EVENTOS DEL MODAL DE CATEGORÍAS
// ==========================================

// Abrir modal.
if (manageCategoriesButton) {
    manageCategoriesButton.addEventListener("click", abrirModalCategorias);
}

// Guardar o actualizar.
if (categoriaForm) {
    categoriaForm.addEventListener("submit", guardarCategoria);
}

// Limpiar formulario.
if (cancelarEdicionCategoriaButton) {
    cancelarEdicionCategoriaButton.addEventListener("click", resetCategoriaForm);
}

// Cerrar modal.
if (cerrarModalCategoriasButton) {
    cerrarModalCategoriasButton.addEventListener("click", cerrarModalCategorias);
}

// Cerrar al pulsar el fondo oscuro.
if (modalCategorias) {
    modalCategorias.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-eliminar-overlay")) {
            cerrarModalCategorias();
        }
    });
}

// Editar y eliminar desde la tabla.
if (categoriasTableBody) {
    categoriasTableBody.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category-action]");

        if (!button) return;

        const categoriaId = button.dataset.categoryId;
        const action = button.dataset.categoryAction;

        if (action === "edit") {
            prepararEdicionCategoria(categoriaId);
        }

        if (action === "delete") {
            abrirModalEliminarCategoria(categoriaId);
        }
    });
}

// Cerrar con Escape.
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modalCategorias &&
        !modalCategorias.hidden
    ) {
        cerrarModalCategorias();
    }
});
// Cancelar eliminación
cancelarEliminarCategoriaButton?.addEventListener("click", () => {
    cerrarModalEliminarCategoria();
});

// Confirmar eliminación
confirmarEliminarCategoriaButton?.addEventListener(
    "click",
    confirmarEliminacionCategoria
);

// Cerrar al hacer clic en el fondo oscuro
modalEliminarCategoria?.querySelector(".modal-eliminar-overlay")
    ?.addEventListener("click", () => {
        cerrarModalEliminarCategoria();
    });

// ==========================================
// EVENTOS DEL MODAL DETALLE DE PRODUCTO
// ==========================================

// Botón superior para cerrar.
cerrarDetalleProducto?.addEventListener(
    "click",
    cerrarDetalleProductoModal
);

// Botón inferior para cerrar.
cerrarDetalleProductoFooter?.addEventListener(
    "click",
    cerrarDetalleProductoModal
);

// Cerrar al pulsar el fondo oscuro.
modalDetalleProducto?.querySelector(".modal-eliminar-overlay")
    ?.addEventListener("click", cerrarDetalleProductoModal);

// Editar desde el detalle.
editarDesdeDetalle?.addEventListener("click", () => {

    if (!productoDetalleActual) return;

    const productoId = productoDetalleActual.id;

    cerrarDetalleProductoModal();
    cargarProductoParaEditar(productoId);
});

// Cerrar con Escape.
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modalDetalleProducto &&
        !modalDetalleProducto.hidden
    ) {
        cerrarDetalleProductoModal();
    }
});    

// Cargamos usuarios, roles e inventario al entrar al panel.
cargarUsuarios();
cargarRoles();
cargarCategorias();
cargarProductos();