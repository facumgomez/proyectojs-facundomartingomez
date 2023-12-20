function obtenerProductos(){
    return new Promise((resolve, reject) => {
        fetch("/json/productos.json")
        .then(response => {
            if(!response.ok){
                throw new Error("Error al cargar la API, comunicate con el administrador");
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            resolve(data)})
        .catch(error => reject(error));
    });
};
async function obtencionProductos(){
    try{
        const productosObtener = await obtenerProductos()
        cargaProductos(productosObtener);
    }catch (error){
        console.error("Error al obtener los productos de la app", error);
    };
};
obtencionProductos();

const conteinerProductos = document.querySelector("#conteinerProductos");
function cargaProductos(productoSeleccionados) {
    conteinerProductos.innerHTML = "";
    if (productoSeleccionados.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensajeNoResultados");
        mensaje.innerText = "No hay productos que coincidan con su búsqueda";
        conteinerProductos.appendChild(mensaje);

        const todosProductos = document.createElement("button");
        todosProductos.classList.add("todosProductos");
        todosProductos.innerHTML = `<i class="bi bi-arrow-repeat"></i> Volver a la Tienda`;
        todosProductos.addEventListener("click", () => {

            window.location.href = "../index.html";
        });
        conteinerProductos.appendChild(todosProductos);
        } else {
            productoSeleccionados.map(producto => {
            const div = document.createElement("div");
            div.classList.add("listProductos");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <div class="detalleProducto">
                    <h2>${producto.titulo}</h2>
                    <p>$${producto.precio}</p>
                    <button class=botonAgregar id="${producto.id}">Agregar al Carrito</button>
                </div>
            `;
            conteinerProductos.append(div);
        });
    };
    actualizarAgregar();
};

const botonCategoria = document.querySelectorAll(".botonCategorias");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        botonCategoria.forEach(boton => boton.classList.remove("activar"));
        e.currentTarget.classList.add("activar");

        const productoCategoria = e.currentTarget.id !== "todosProductos"
            ? productos.find(producto => producto.categoria.id === e.currentTarget.id)
            : null;
        tituloPrincipal.innerText = productoCategoria?.categoria.nombre || "Todos los Productos";

        const productosFilter = e.currentTarget.id !== "todosProductos"
            ? productos.filter(producto => producto.categoria && producto.categoria.id === e.currentTarget.id)
            : productos;

        cargaProductos(productosFilter);
    });
});

const buscar = document.querySelector("#buscar");
const buscarProductos = document.querySelector("#buscarProductos");
document.getElementById("buscar").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const productosBuscar = document.getElementById("buscarProductos").value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(productosBuscar) ||
        producto.categoria.nombre.toLowerCase().includes(productosBuscar)
    );
    cargaProductos(productosFiltrados);
});

const buscarResponsive = document.querySelector("#buscarResponsive");
const buscarProductosResponsive = document.querySelector("#buscarProductosResponsive");
document.getElementById("buscarResponsive").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const productosBuscarResponsive = document.getElementById("buscarProductosResponsive").value.toLowerCase();
    const productosFiltradosResponsive = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(productosBuscarResponsive) ||
        producto.categoria.nombre.toLowerCase().includes(productosBuscarResponsive)
    );
    cargaProductos(productosFiltradosResponsive);
});

let botonAgregar = document.querySelectorAll (".botonAgregar");
function actualizarAgregar (){
    botonAgregar = document.querySelectorAll(".botonAgregar");
    botonAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarCarrito);
    });
};

let productosCarrito;
let productosCarritoLocal = localStorage.getItem("productosAlCarrito");

if (productosCarritoLocal){
    productosCarrito = JSON.parse(productosCarritoLocal);
    actualizarCantidad();
} else {
    productosCarrito =  [];
};

function agregarCarrito (e){
    Toastify({
        text: "agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "#aee710",
        color: "#ffffff",
        textTransform: "uppercase",
        borderRadius: "16px",
        },
        offset: {
            x: 20, 
            y: 10,
        },
        onClick: function(){} 
    }).showToast();

    const idAgregar = e.currentTarget.id;
    const productosAgregados = productos.find(producto => producto.id === idAgregar);

    if(productosCarrito.some(producto => producto.id === idAgregar)){
        let index = productosCarrito.findIndex(producto => producto.id === idAgregar);
        productosCarrito[index].cantidad++;
    } else {
        productosAgregados.cantidad = 1;
        productosCarrito.push (productosAgregados);
    };
    actualizarCantidad();
    localStorage.setItem("productosAlCarrito", JSON.stringify(productosCarrito));
};

function actualizarCantidad() {
    let cantidadActualizar = productosCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    carritoUp.innerText = cantidadActualizar;
};