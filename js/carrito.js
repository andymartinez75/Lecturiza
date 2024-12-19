document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const totalGeneral = document.getElementById("mensaje-compra");
    const suscripciones = document.querySelectorAll(".seleccionar-suscripcion");
    let total = 0;
  
    // Escuchar la elección de suscripciones
    suscripciones.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tipo = e.target.dataset.tipo;
        const precio = parseFloat(e.target.dataset.precio);

        // Agregar suscripción seleccionada al carrito
        carritoItemsStorage.push({ title: tipo, price: precio });
        localStorage.setItem("cart", JSON.stringify(carritoItemsStorage));
  
        // Mostrar mensaje de confirmación
        Swal.fire({
            title: "¡Suscripción añadida!",
            text: `Has añadido el plan ${tipo} al carrito.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: 'swal-popup', // Clase personalizada
            },
          });
          
      });
    });
  
    // Mostrar total de la compra al finalizar
    document.getElementById("finalizar-compra").addEventListener("click", () => {
      carritoItemsStorage.forEach((item) => {
        total += item.price;
      });
  
      if (total > 0) {
        // Mostrar resumen de compra
        Swal.fire({
          title: "Resumen de Compra",
          html: `
            <p>Has seleccionado el siguiente plan:</p>
            <ul>
              ${carritoItemsStorage
                .map(
                  (item) =>
                    `<li><strong>${item.title}</strong>: $${item.price.toFixed(
                      2
                    )}</li>`
                )
                .join("")}
            </ul>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          `,
          icon: "info",
          confirmButtonText: "Finalizar",
        }).then(() => {
          // Vaciar carrito y redirigir
          localStorage.removeItem("cart");
          window.location.href = "libros.html";
        });
      } else {
        Swal.fire({
          title: "Carrito vacío",
          text: "No tienes suscripciones seleccionadas.",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    });
  });
  



