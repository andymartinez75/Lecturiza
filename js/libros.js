document.addEventListener("DOMContentLoaded", () => {
    const bibliotecaContainer = document.getElementById("biblioteca-container");

    // Cargar libros desde la biblioteca (localStorage)
    const biblioteca = JSON.parse(localStorage.getItem("carrito")) || [];

    if (biblioteca.length > 0) {
        biblioteca.forEach((libro) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "col-md-4 mb-4";
            tarjeta.innerHTML = `
                <div class="card">
                    <img src="${libro.formats["image/jpeg"]}" class="card-img-top" alt="${libro.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${libro.title}</h5>
                        <p class="card-text">Autor: ${libro.authors.map((a) => a.name).join(", ")}</p>
                        <button class="btn btn-info">Leer</button>
                    </div>
                </div>
            `;
            bibliotecaContainer.appendChild(tarjeta);
        });
    } else {
        bibliotecaContainer.innerHTML = `<p class="text-white text-center">No tienes libros en tu biblioteca.</p>`;
    }
});

