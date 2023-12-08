const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const barraPrincipal = document.querySelector(".barraPrincipal")


abrir.addEventListener("click", ()=>{
    barraPrincipal.classList.add("mostrar");
})
cerrar.addEventListener("click", ()=>{
    barraPrincipal.classList.remove("mostrar");
})
botonCategoria.forEach(boton=> boton.addEventListener("click", ()=>{
    barraPrincipal.classList.remove("mostrar");
}))