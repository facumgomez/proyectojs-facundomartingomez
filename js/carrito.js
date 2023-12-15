let productosCarrito = localStorage.getItem("productosAlCarrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos");
const carritoOpciones = document.querySelector("#carritoOpciones");
const carritoCompra = document.querySelector("#carritoCompra");
const carritoTotal = document.querySelector("#carritoTotal");
const carritoTotalProductos = document.querySelector("#carritoTotalProductos");
let carritoOpBorrar = document.querySelector("#opcionesCarritoBorrar");
let carritoBorrar = document.querySelectorAll(".carritoBorrar");
let carritoOpCompro = document.querySelector("#opcionesCarritoCompro");

function cargarCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        carritoVacio.classList.add("borrar");
        carritoProductos.classList.remove("borrar");
        carritoOpciones.classList.remove("borrar");
        carritoCompra.classList.add("borrar");

        carritoProductos.innerHTML = "";
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carritoTitulo">
                <small>Producto:</small>
                <h3>${producto.titulo}</h3>    
            </div>
            <div class="carritoCantidad">
                <small>Cantidad:</small>
                <p><button class="botonCantidad" data-id="${producto.id}" data-operacion="restar">-</button>
                ${producto.cantidad}
                <button class="botonCantidad" data-id="${producto.id}" data-operacion="sumar">+</button></p>
            </div>
            <div class="carritoPrecio">
                <small>Precio:</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carritoSubtotal">
                <small>SubTotal:</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
                <button class="carritoBorrar" id="${producto.id}"><i class="bi bi-trash3-fill text-danger"></i></button>
            `;
            carritoProductos.append(div);
            const restar = div.querySelector('.botonCantidad[data-operacion="restar"]');
            const sumar = div.querySelector('.botonCantidad[data-operacion="sumar"]');

            restar.addEventListener("click", () => modificarCantidad(producto.id, "restar"));
            sumar.addEventListener("click", () => modificarCantidad(producto.id, "sumar"));
        });
        actualizarAgregar();
        actualizarTotal();
        const totalCantidadProductos = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        carritoTotalProductos.innerText = `Total de productos: ${totalCantidadProductos}`;
    } else {
        carritoVacio.classList.remove("borrar");
        carritoProductos.classList.add("borrar");
        carritoOpciones.classList.add("borrar");
        carritoCompra.classList.add("borrar");
    };
};
cargarCarrito();

function actualizarAgregar() {
    carritoBorrar = document.querySelectorAll(".carritoBorrar");
    carritoBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
};

function eliminarCarrito(e) {
    const idBorrar = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBorrar);
    if (index !== -1) {
        productosCarrito.splice(index, 1);
        modificarCantidad();
        cargarCarrito();

        localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));
        carritoTotalProductos.classList.toggle("borrar", productosCarrito.length === 0);
    };
};

function modificarCantidad(id, operacion) {
    const index = productosCarrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        if (operacion === "restar" && productosCarrito[index].cantidad > 1) {
            productosCarrito[index].cantidad -= 1;
        } else if (operacion === "sumar") {
            productosCarrito[index].cantidad += 1;
        };
        cargarCarrito();
        localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));
    };
};

function actualizarTotal() {
    const sumaTotal = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    carritoTotal.innerText = `$${sumaTotal}`;
}

carritoOpBorrar.addEventListener("click", opcionesCarritoBorrar);
function opcionesCarritoBorrar() {
    productosCarrito.length = 0;
    localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));
    cargarCarrito();
    carritoTotalProductos.classList.add("borrar");
    carritoTotal.innerText = "";
};

carritoOpCompro.addEventListener("click", compraFinalizada);
function compraFinalizada() {
    productosCarrito.length = 0;
    localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));

    carritoVacio.classList.add("borrar");
    carritoProductos.classList.add("borrar");
    carritoOpciones.classList.add("borrar");
    carritoCompra.classList.remove("borrar");
    carritoTotalProductos.classList.toggle("borrar", !carritoTotalProductos.classList.contains("borrar"));
};