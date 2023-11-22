function iniciarCompra (){

const productos = [
    { nombre: "COMBO DE MANCUERNAS 25kg", precio: 75000}, 
    { nombre: "BARRA DOMINADAS PARED", precio: 50000}, 
    { nombre: "BAND DOMINADAS", precio: 15000}, 
    { nombre: "RODILLERA DEPORTIVA", precio: 12000}, 
    { nombre: "SOGA PARA SALTAR", precio: 10000}
];
const formaPago = ["Efectivo (10% de descuento)", "Tarjeta de debito (en 1 pago)", "3 cuotas sin interes", "6 cuotas fijas (recargo del 10%)", "12 cuotas fijas (recargo del 20%)"];
let selecProd = "Seleccione producto que desea comprar:\n";
let selecPago = "Seleccione medio de pago que desea:\n";
let cantidad = "Ingrese la cantidad que desea: ";
let detallePago = "Detalle de facturación: \n\n";
let prodSelec = 0;
let formadePago = 0;
let cantidadProd = 0;
let descuento = 0;
let cuotas = 0;
let precioFinal = 0;
let ingresoVal = false;

const mostrarMsj = function (msj, list) {
    let j = "";

    for (let i = 0; i < list.length; i++) {
        let o = (list[i].nombre || list[i]);
        let j1 = i + 1;
        j = j + j1 + "- " + o + "\n"

    }
    let salir = list.length + 1;
    j = j + salir + " - Salir";
    return msj + j;
}
function filtrarProductos(lista, filtro) {
    return lista.filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()));
}
const filtroPalabra = prompt("Ingrese una palabra para filtrar los productos:");
const productosFiltrados = filtrarProductos(productos, filtroPalabra);

console.log("Productos filtrados:");
productosFiltrados.forEach(producto => console.log(producto.nombre));

function validacion(mensaje, lista) {
    let seleccionado;

    while (true) {
        seleccionado = parseInt(prompt(mostrarMsj(mensaje, lista)));

        if (!isNaN(seleccionado) && seleccionado != null && seleccionado != "") {
            break;
        } else {
        alert("Por favor, ingrese una opción válida");
        continue;
    }
}
    return seleccionado;
}

function cantidadProducto(mensaje) {
    let cantidad;

    while (true) {
        cantidad = parseInt(prompt(mensaje));

        if (!isNaN(cantidad) && cantidad != null && cantidad != "") {
            break;
        } else {
            alert("Por favor, ingrese una cantidad válida");
            continue;
        }
    }
    return cantidad;
}

function calPrecioFinal(precio, cant, descuento, cuotas) {
    let precioFinal = precio * cant;
    let precioDescuento = 0;
    let recargo = 0;

    if (descuento > 0) {
        precioDescuento = ((precioFinal * descuento) / 100);
        precioFinal = precioFinal - precioDescuento;
    }

    if (cuotas === 3) {
        precioFinal = precioFinal / cuotas;
    }

    if (cuotas === 6) {
        recargo = ((precioFinal * 10) / 100);
        precioFinal = precioFinal + recargo;
        precioFinal = precioFinal / cuotas;
    }

    if (cuotas === 12) {
        recargo = ((precioFinal * 20) / 100);
        precioFinal = precioFinal + recargo;
        precioFinal = precioFinal / cuotas;
    }
    return precioFinal;
}

function detalleProducto(productoSeleccionado) {
    cantidadProd = cantidadProducto(cantidad);
    let opcionesPago = "";
    opcionesPago = "Producto seleccionado: " + productos[productoSeleccionado - 1].nombre + "\n";
    opcionesPago = opcionesPago + "Cantidad: " + cantidadProd + "\n";
    opcionesPago = opcionesPago + "Valor por unidad: " + "$" + productos[productoSeleccionado - 1].precio + "\n";
    opcionesPago = opcionesPago + "Total: " + "$" + productos[productoSeleccionado - 1].precio * cantidadProd + "\n\n";
    opcionesPago = opcionesPago + selecPago;
    formadePago = validacion(opcionesPago, formaPago);
    }

    prodSelec = validacion(selecProd, productos);

    if (prodSelec >= 1 && prodSelec <= 5) {
        ingresoVal = true;
        detalleProducto(prodSelec);
    } else if (prodSelec === 6) {
        alert("¡Nos vemos en su próxima compra!");
    } else {
        alert("La opción que desea ingresar no se encuentra disponible");
    }

    if (ingresoVal) {
        if (formadePago >= 1 && formadePago <= 5) {
        descuento = (formadePago === 1) ? 10 : 0;
        cuotas = (formadePago >= 3 && formadePago <= 5) ? (formadePago - 1) * 3 : 0;
        precioFinal = calPrecioFinal(productos[prodSelec - 1].precio, cantidadProd, descuento, cuotas);
        detallePago = detallePago + "Producto: " + productos[prodSelec - 1].nombre + "\n";
        detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
        detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
        if (cuotas > 0) {
            detallePago = detallePago + "Total a pagar: " + cuotas + " cuotas de $" + precioFinal.toFixed(2);
        } else {
            detallePago = detallePago + "Total a pagar: $" + precioFinal.toFixed(2);
        }
        alert(detallePago);
        } else if (formadePago === 6) {
        alert("¡Nos vemos en su próxima compra!");
        } else {
        alert("La opción que desea ingresar no se encuentra disponible");
        }
    }
}