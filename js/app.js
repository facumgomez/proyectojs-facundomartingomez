function iniciarCompra (){

const productos = ["COMBO DE MANCUERNAS 25kg", "BARRA DOMINADAS PARED", "BAND DOMINADAS", "RODILLERA DEPORTIVA", "SOGA PARA SALTAR"];
const precio = [75000, 50000, 15000, 12000, 10000];
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
    let j = " ";

    for (let i = 0; i < list.length; i++) {
        j = i + 1;
        msj = msj + j + " - " + list[i] + "\n";
    }

    j = j + 1;
    msj = msj + j + " - " + "Salir";

    return msj;
}

function filtrarProductos(palabraClave) {
    return productos.filter(producto => producto.toLowerCase().includes(palabraClave.toLowerCase()));
}
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
    const palabraClave = prompt("Ingrese una palabra clave para filtrar productos:");
    const productosFiltrados = filtrarProductos(palabraClave);

    if (productosFiltrados.length > 0) {
    prodSelec = validacion(selecProd, productosFiltrados);
    ingresoVal = true;}else {
        alert("No hay productos disponibles que coincidan con la búsqueda.");
    }


    cantidadProd = cantidadProducto(cantidad);
    let opcionesPago = "";
    opcionesPago = "Producto seleccionado: " + productos[productoSeleccionado - 1] + "\n";
    opcionesPago = opcionesPago + "Cantidad: " + cantidadProd + "\n";
    opcionesPago = opcionesPago + "Valor por unidad: " + "$" + precio[productoSeleccionado - 1] + "\n";
    opcionesPago = opcionesPago + "Total: " + "$" + precio[productoSeleccionado - 1] * cantidadProd + "\n\n";
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
        precioFinal = calPrecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas);
        detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
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