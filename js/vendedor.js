document.addEventListener("DOMContentLoaded", () => {

    /* ============================= */
    /* MENU LATERAL */
    /* ============================= */

    const menuItems = document.querySelectorAll('.menu li[data-section]');
    const sections = document.querySelectorAll('.content-section');
    const sidebar = document.getElementById('sidebar');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {

            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active-section');
            });

            const target = item.getAttribute('data-section');
            const targetSection = document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add('active-section');
            }

        });
    });


    /* ============================= */
    /* LOGOUT */
    /* ============================= */

    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("calcifer_user");
            window.location.href = "login.html";
        });
    }


    /* ============================= */
    /* DASHBOARD */
    /* ============================= */

    const productos = [
        { nombre: "Resina Elegoo 8K", marca: "Elegoo", stock: 12, precio: 180000 },
        { nombre: "Anycubic Wash & Cure", marca: "Anycubic", stock: 3, precio: 950000 },
        { nombre: "Placa Mars 3", marca: "Elegoo", stock: 2, precio: 320000 },
        { nombre: "Alcohol Isopropílico", marca: "Genérico", stock: 25, precio: 25000 },
    ];

    const totalProductos = document.getElementById("totalProductos");
    const stockBajoElement = document.getElementById("stockBajo");
    const ventasMes = document.getElementById("ventasMes");
    const ingresos = document.getElementById("ingresos");
    const tabla = document.getElementById("tablaProductos");

    if (totalProductos) {
        totalProductos.textContent = productos.length;
    }

    if (stockBajoElement) {
        const stockBajo = productos.filter(p => p.stock < 5).length;
        stockBajoElement.textContent = stockBajo;
    }

    if (ventasMes) {
        ventasMes.textContent = 18;
    }

    if (ingresos) {
        const totalIngresos = 3450000;
        ingresos.textContent = "$" + totalIngresos.toLocaleString();
    }

    if (tabla) {
        tabla.innerHTML = "";

        productos.forEach(producto => {
            const fila = `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.stock}</td>
                    <td>$${producto.precio.toLocaleString()}</td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    }

});


/* ============================= */
/* CAMBIAR ESTADO PEDIDOS */
/* ============================= */

function cambiarEstado(selectElement) {
    const estado = selectElement.value;
    const fila = selectElement.closest("tr");

    if (!fila) return;

    const badge = fila.querySelector("td:nth-child(6) span");

    if (!badge) return;

    badge.textContent = estado;
    badge.className = "badge";

    if (estado === "Pendiente") badge.classList.add("pendiente");
    if (estado === "En preparación") badge.classList.add("online");
    if (estado === "Enviado") badge.classList.add("enviado");
    if (estado === "Entregado") badge.classList.add("entregado");
}
