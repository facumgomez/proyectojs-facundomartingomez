let productosCarrito = localStorage.getItem("productosAlCarrito");
productosCarrito = JSON.parse(productosCarrito)

const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos");
const carritoOpciones = document.querySelector("#carritoOpciones");
const carritoCompra = document.querySelector("#carritoCompra");
const carritoTotal = document.querySelector("#carritoTotal");
const carritoOpBorrar = document.querySelector("#carritoOpcionesBorrar");
let carritoBorrar = document.querySelectorAll(".carritoBorrar");


function cargarCarrito(){
    if(productosCarrito && productosCarrito.length > 0){
        carritoVacio.classList.add("borrar");
        carritoProductos.classList.remove("borrar");
        carritoOpciones.classList.remove("borrar");
        carritoCompra.classList.add("borrar");
        
        carritoProductos = innerHTML = "";
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            img class="carritoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carritoTitulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>    
            </div>
            <div class="carritoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carritoPrecio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carritoSubtotal">
                <small>SubTotal</small>
                <p>${producto.precio * cantidad}</p>
            </div>
                <button class=carritoBorrar id="${producto.id}"><<i class="bi bi-trash3-fill-text-danger"></i>/button>
            `
        carritoProductos.append(div);
    });
    }else{
        carritoVacio.classList.remove("borrar");
        carritoProductos.classList.add("borrar");
        carritoOpciones.classList.add("borrar");
        carritoCompra.classList.add("borrar");
    }
    actualizarAgregar ();
    actualizarTotal();
}
cargarCarrito();


function actualizarAgregar (){
    carritoOpBorrar = document.querySelectorAll (".opcionesCarritoBorrar");
    carritoOpBorrar.forEach(boton=>{
        boton.addEventListener("click", eliminarCarrito);
    })
}
function eliminarCarrito(e){
    const idBorrar = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBorrar);
    productosCarrito.splice(index, 1);
    cargarCarrito();

    localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));
}
function actualizarTotal(){
    const sumaTotal = productosCarrito.reduce((acc, producto)=> acc + (producto.precio * precio.cantidad), 0)
    carritoTotal.innerText `$${sumaTotal}`;
}
carritoTotal.addEventListener("click", )
carritoTotal.addEventListener("click", compraFinalizada);

function compraFinalizada(){
    productosCarrito.length = 0;
    localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));

    carritoVacio.classList.add("borrar");
    carritoProductos.classList.add("borrar");
    carritoOpciones.classList.add("borrar");
    carritoCompra.classList.remove("borrar");
}
carritoTotal.addEventListener("click", compraFinalizada)