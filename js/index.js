//templates
const templateCards = document.getElementById("template-card").content;
const templateProductos = document.getElementById("template-productos").content;
const templateVaciar = document.getElementById("template-vaciar").content;
const fragment = document.createDocumentFragment();
const listadoTarjetas = document.getElementById("listado-tarjetas");//Div donde se ubicarán las tarjetas
const listadoCompras = document.getElementById("table-elegidos");//Tabla donde se ubicarán los productos seleccionados
const spanCarrito = document.querySelector(".span-carrito");//span dnd se muestra la cantidad comprada
const tituloCompras = document.getElementById("table-productos");
const tableTotal = document.getElementById("table-total");//Indica q el carrito está vacio y luego se pondrá el btn vaciar
let carrito = {};

//cuando carga el html se ejecutará el pedido al .json
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  listener()
});

//pedido a api.json
const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    pintarCartas(data);
  } catch (error) {
    console.log(error);
  }
};

//Interacción 
const listener = () =>{
listadoTarjetas.addEventListener("click", (e) => {//Al hacer click sobre un producto
  agregarAlcarrito(e);
});

listadoCompras.addEventListener("click", (e) => {//En el carritos para aumentar o disminuir un producto
  btnMasoMenos(e);
});
}



//pintar tarjetas
const pintarCartas = (data) => {
  data.forEach((producto) => {
    const clone = templateCards.cloneNode(true);
    clone.querySelector(".template-h3").textContent = producto.title;
    clone.querySelector(".template-p").textContent = producto.precio;
    clone.querySelector(".template-img").setAttribute("src", producto.img);
    clone.querySelector(".card-button").dataset.id = producto.id;

    fragment.appendChild(clone);
  });
  listadoTarjetas.appendChild(fragment);
};

//Al hacer clic en el boton se copia todo el div en objetoProductos
const agregarAlcarrito = (e) => {
  if (e.target.classList.contains("card-button")) {
    objetoProductos(e.target.parentElement);
    tableTitulo();
  }
  e.stopPropagation();
};

//Aparecer o desaparecer titulo
const tableTitulo = () => {
  tituloCompras.style.display = "table";
};

//crear objeto con los productos elegidos
const objetoProductos = (objeto) => {
  const producto = {
    id: objeto.querySelector(".card-button").dataset.id,
    title: objeto.querySelector(".template-h3").textContent,
    precio: objeto.querySelector(".template-p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) { //Si ya existe el producto se le suma uno mas. Se modifica en el objeto solo la posicion cantidad
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };

  pintarCarrito();
};



//Pintar los distitnos elementos que seleccionemos
const pintarCarrito = () => {
  listadoCompras.innerHTML = "";
  Object.values(carrito).forEach((item) => {
    const clone = templateProductos.cloneNode(true);
    clone.querySelector(".table-producto").textContent = item.title;
    clone.querySelector(".table-cantidad").textContent = item.cantidad;
    clone.querySelector(".btn-mas").dataset.id = item.id;
    clone.querySelector(".btn-menos").dataset.id = item.id;
    clone.querySelector(".total").textContent = item.precio * item.cantidad;

    fragment.appendChild(clone);
  });

  listadoCompras.appendChild(fragment);
  pintarVaciar();
};

//Botones de mas y menos
const btnMasoMenos = (e) => {
  if (e.target.classList.contains("btn-mas")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }
  if (e.target.classList.contains("btn-menos")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};



//Muestra el total de todos los productos y al hacer click en el boton vaciar elimina todo
const pintarVaciar = () => {
  tableTotal.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    tableTotal.innerHTML =
      '<p class="total-carrito-vacio">El carrito esta vacío. Comienza a comprar!</p>';
      tituloCompras.style.display = "none"
      spanCarrito.innerHTML = "";
    return;
  }
  const totalCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  spanCarrito.innerHTML = totalCantidad;
  const totalPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  const clone = templateVaciar.cloneNode(true);
  clone.querySelector(".vaciar-cantidad").textContent = totalCantidad;
  clone.querySelector(".vaciar-total").textContent = totalPrecio;
  fragment.appendChild(clone);

  tableTotal.appendChild(fragment);

  const btnVaciarCarrito = document.getElementById("vaciar-btn");
  btnVaciarCarrito.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    tituloCompras.style.display = "none";
    spanCarrito.innerHTML = "";
  });
};
