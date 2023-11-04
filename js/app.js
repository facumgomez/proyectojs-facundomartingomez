const productos = ["COMBO DE MANCUERNAS 25kg", "BARRA DOMINADAS PARED", "BAND DOMINADAS", "RODILLERA DEPORTIVA", "SOGA PARA SALTAR"];
const precio = [75000, 50000, 15000, 12000, 10000]
const formaPago = ["Efectivo (10% de descuento)", "Tarjeta de debito (en 1 pago)", "3 cuotas sin interes", "6 cuotas fijas (recargo del 10%)", "12 cuotas fijas (recargo del 20%)"]
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


const msjPantalla = function (msj, list) {
    let j = 0;

    for (let i = 0; i < list.length; i++) {
        j = i + 1;
        msj = msj + j + " - " + list[i] + "\n";
    }

    j = j + 1;
    msj = msj + j + " - " + "Salir";

    return msj;
}

function validacion(mensaje, lista) {
    let seleccionado;

    while (true) {
        seleccionado = parseInt(prompt(msjPantalla(mensaje, lista)));

        if (!isNaN(seleccionado) && seleccionado != null && seleccionado != "") {
            break;
        }
        else {
            alert("Por favor, ingrese una opción valida");
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
        }
        else {
            alert("Por favor, ingrese una cantidad valida");
            continue;
        }
    }
    return cantidad;
}

function calprecioFinal(precio, cant, descuento, cuotas) {
    let precioFinal = precio * cant;
    let precioDescuento = 0;
    let recargo = 0;

    if (descuento > 0) {
        precioDescuento = ((precioFinal * descuento) / 100);
        precioFinal = precioFinal - precioDescuento;
    }

    if (cuotas == 3) {
        precioFinal = precioFinal / cuotas;
    }

    if (cuotas == 6) {
        recargo = ((precioFinal * 10) / 100);
        precioFinal = precioFinal + recargo;
        precioFinal = precioFinal / cuotas;
    }

    if (cuotas == 12) {
        recargo = ((precioFinal * 20) / 100);
        precioFinal = precioFinal + recargo;
        precioFinal = precioFinal / cuotas;
    }
    return precioFinal;
}

function detalleProducto(productoSe) {
    let opcionesPago = "";

    /*Solicito que ingrese cantidad de producto */
    cantidadProd = cantidadProducto(cantidad);

    opcionesPago = "Producto seleccionado: " + productos[productoSe - 1] + "\n";
    opcionesPago = opcionesPago + "Cantidad: " + cantidadProd + "\n";
    opcionesPago = opcionesPago + "Valor por unidad: " + "$" + precio[productoSe - 1] + "\n";
    opcionesPago = opcionesPago + "Total: " + "$" + precio[productoSe - 1] * cantidadProd + "\n\n";
    opcionesPago = opcionesPago + selecPago;
    formadePago = validacion(opcionesPago, formaPago);
}

prodSelec = validacion(selecProd, productos);

switch (prodSelec) {
    case 1:
        ingresoVal = true;
        detalleProducto(prodSelec);
        break;

    case 2:
        ingresoVal = true;
        detalleProducto(prodSelec);
        break;

    case 3:
        ingresoVal = true;
        detalleProducto(prodSelec);
        break;

    case 4:
        ingresoVal = true;
        detalleProducto(prodSelec);
        break;

    case 5:
        ingresoVal = true;
        detalleProducto(prodSelec);
        break;

    case 6:
        alert("¡Nos vemos hasta su proxima compra!");
        break;

    default:
        alert("La opción que desea ingresar no se encuentra disponible");
        break;
}

if (ingresoVal) {
    switch (formadePago) {
        case 1:
            descuento = 10;
            cuotas = 0;
            precioFinal = calprecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas)
            detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
            detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
            detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
            detallePago = detallePago + "Total a pagar: $" + precioFinal;
            alert(detallePago);
            break;

        case 2:
            descuento = 0;
            cuotas = 0;
            precioFinal = calprecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas)
            detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
            detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
            detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
            detallePago = detallePago + "Total a pagar: $" + precioFinal;
            alert(detallePago);
            break;

        case 3:
            descuento = 0;
            cuotas = 3;
            precioFinal = calprecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas)
            detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
            detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
            detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
            detallePago = detallePago + "Total a pagar: " + "3 cuotas de $" + precioFinal.toFixed(2);
            alert(detallePago);
            break;

        case 4:
            descuento = 0;
            cuotas = 6;
            precioFinal = calprecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas)
            detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
            detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
            detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
            detallePago = detallePago + "Total a pagar: " + "6 cuotas de $" + precioFinal.toFixed(2);
            alert(detallePago);
            break;

        case 5:
            descuento = 0;
            cuotas = 12;
            precioFinal = calprecioFinal(precio[prodSelec - 1], cantidadProd, descuento, cuotas)
            detallePago = detallePago + "Producto: " + productos[prodSelec - 1] + "\n";
            detallePago = detallePago + "Cantidad: " + cantidadProd + "\n";
            detallePago = detallePago + "Forma de pago: " + formaPago[formadePago - 1] + "\n";
            detallePago = detallePago + "Total a pagar: " + "12 cuotas de $" + precioFinal.toFixed(2);
            alert(detallePago);
            break;

        case 6:
            alert("¡Nos vemos hasta su proxima compra!");
            break;
    
        default:
            alert("La opción que desea ingresar no se encuentra disponible");
            break;
    }
}