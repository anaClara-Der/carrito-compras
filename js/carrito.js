
const iconoCarrito = document.querySelector(".fa-cart-plus");
const iconoCerrarCarrito = document.querySelector(".fa-times");
const carritoDesplegable = document.getElementById("carrito-desplegable")

iconoCarrito.addEventListener("click", () => {
    carritoDesplegable.style.display = "inline-block";
});

iconoCerrarCarrito.addEventListener("click", () => {
    carritoDesplegable.style.display = "none";
});

