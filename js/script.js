document.addEventListener("DOMContentLoaded", () => {
    const contenedorLibros = document.querySelector(".contenedor-cards");
    const indicadorCarga = document.createElement("div");

  // Indicador de carga 
indicadorCarga.id = "indicador-carga";
indicadorCarga.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
        <div>
        <img src="./img/animacion-libro.gif" alt="Cargando" style="width: 100px; display: block; margin: auto;">
        <p class="texto-centrado texto-blanco mt-2">Cargando libros...</p>
        </div>
    </div>
    `;
contenedorLibros.appendChild(indicadorCarga);

function obtenerLibros() {
    mostrarIndicador(true);

    fetch("https://gutendex.com/books?languages=es&limit=9")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        const libros = datos.results;

        // Limpia el contenedor de libros
        contenedorLibros.innerHTML = "";

        // Genera las cards de libros
        libros.forEach((libro) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.width = "18rem";

        cardDiv.innerHTML = `
            <img src="${ libro.formats["image/jpeg"]}" class="card-img-top" alt="${libro.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${libro.title}</h5>
                <p class="card-text">Autor: ${libro.authors
                .map((a) => a.name)
                .join(", ")}</p>
                <button class="btn btn-success mt-auto">Agregar</button>
            </div>
            `;

          // Agregar evento al botón "Agregar"
        const botonAgregar = cardDiv.querySelector("button");
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(libro);
        });

          // Añadir la card al contenedor
        contenedorLibros.appendChild(cardDiv);
        });

        mostrarIndicador(false); // Oculta el indicador después de cargar
    })
    .catch((error) => {
        console.error("Error:", error);
        mostrarIndicador(false);
    });
}

  // Función para mostrar u ocultar el indicador de carga
function mostrarIndicador(mostrar) {
    indicadorCarga.style.display = mostrar ? "block" : "none";
}

  // Función para agregar al carrito usando localStorage
function agregarAlCarrito(libro) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(libro);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`¡"${libro.title}" ha sido agregado al carrito!`);
}

  // Carga inicial de libros
obtenerLibros();
});
