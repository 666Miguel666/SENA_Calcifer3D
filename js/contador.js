const menuItems = document.querySelectorAll(".menu li[data-view]");
const views = document.querySelectorAll(".view");

menuItems.forEach(item => {
    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        views.forEach(view => view.classList.remove("active-view"));

        const viewId = item.getAttribute("data-view");
        document.getElementById(viewId).classList.add("active-view");
    });
});

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("calcifer_user");
    window.location.href = "login.html";
}

document.getElementById("ventaExternaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const fecha = document.getElementById("fechaVenta").value;
    const cliente = document.getElementById("clienteVenta").value;
    const concepto = document.getElementById("conceptoVenta").value;
    const monto = document.getElementById("montoVenta").value;
    const metodo = document.getElementById("metodoPago").value;

    const tabla = document.querySelector("#tablaVentas tbody");

    const nuevaFila = `
        <tr>
            <td>${fecha}</td>
            <td>${cliente}</td>
            <td>${concepto}</td>
            <td>${metodo}</td>
            <td>$${parseInt(monto).toLocaleString()}</td>
        </tr>
    `;

    tabla.innerHTML += nuevaFila;

    this.reset();
});

document.querySelectorAll(".btn-editar").forEach(boton => {
    boton.addEventListener("click", function() {

        const fila = this.closest("tr");
        const celdas = fila.querySelectorAll("td");

        for (let i = 0; i < celdas.length - 1; i++) {
            const valor = celdas[i].innerText;
            celdas[i].innerHTML = `<input type="text" value="${valor}" />`;
        }

        this.innerText = "Guardar";
        this.classList.remove("btn-editar");
        this.classList.add("btn-guardar");

        this.addEventListener("click", function guardar() {
            const inputs = fila.querySelectorAll("input");

            inputs.forEach((input, index) => {
                celdas[index].innerText = input.value;
            });

            this.innerText = "Editar";
            this.classList.remove("btn-guardar");
            this.classList.add("btn-editar");
        }, { once: true });

    });
});

const inputBusquedaInventario = document.getElementById("buscarInventario");
const resultadoInventario = document.getElementById("resultadoInventario");
const filasInventario = document.querySelectorAll("#tablaProductos tbody tr");

if (inputBusquedaInventario && filasInventario.length > 0) {
    const filtrarInventario = () => {
        const termino = inputBusquedaInventario.value.trim().toLowerCase();
        let visibles = 0;

        filasInventario.forEach(fila => {
            const columnas = Array.from(fila.querySelectorAll("td")).slice(0, -1);
            const textoFila = columnas.map(columna => {
                const input = columna.querySelector("input");
                return input ? input.value : columna.innerText;
            }).join(" ").toLowerCase();

            const coincide = textoFila.includes(termino);
            fila.style.display = coincide ? "" : "none";

            if (coincide) {
                visibles++;
            }
        });

        if (!resultadoInventario) {
            return;
        }

        if (!termino) {
            resultadoInventario.innerText = `${visibles} productos`;
            return;
        }

        resultadoInventario.innerText = `${visibles} resultado(s) para "${inputBusquedaInventario.value.trim()}"`;
    };

    inputBusquedaInventario.addEventListener("input", filtrarInventario);
    filtrarInventario();
}

document.querySelector(".acciones-contables .btn")
.addEventListener("click", function() {

    const contenido = document.getElementById("contable").innerText;
    const ventana = window.open("", "", "width=800,height=600");
    ventana.document.write("<pre>" + contenido + "</pre>");
    ventana.document.close();
    ventana.print();
});

document.querySelector("#reportes .btn")
.addEventListener("click", function() {

    const contenido = document.getElementById("reportes").innerText;
    const ventana = window.open("", "", "width=900,height=700");
    ventana.document.write("<pre>" + contenido + "</pre>");
    ventana.document.close();
    ventana.print();
});
