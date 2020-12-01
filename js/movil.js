const hamburguesaMenu = document.getElementById("hamburguesa-movil");
const cerrarMenu = document.getElementById("menu-cerrar");
const navMovil = document.getElementById("nav-movil");

hamburguesaMenu.addEventListener("click" , () => {
    hamburguesaMenu.style.display = "none";
    cerrarMenu.style.display = "inline-block"
    navMovil.style.display = "inline-block"
});
cerrarMenu.addEventListener("click" , () => {
    hamburguesaMenu.style.display = "inline-block";
    cerrarMenu.style.display = "none"
    navMovil.style.display = "none"
});