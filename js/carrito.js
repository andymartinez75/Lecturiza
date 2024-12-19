    document.addEventListener("DOMContentLoaded", () => {
    const totalGeneral = document.getElementById("mensaje-compra");
    const suscripciones = document.querySelectorAll(".seleccionar-suscripcion");
  
    // Cargar suscripción seleccionada desde localStorage
    const suscripcionGuardada = JSON.parse(localStorage.getItem("cart"));
  
    if (suscripcionGuardada) {
      // Marcar botón si ya hay una suscripción guardada
      suscripciones.forEach((btn) => {
        if (btn.dataset.tipo === suscripcionGuardada.title) {
          btn.classList.add("active");
        }
      });
    }
  
    // Escuchar la elección de suscripciones
    suscripciones.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tipo = e.target.dataset.tipo;
        const precio = parseFloat(e.target.dataset.precio);
  
        // Sobrescribir la suscripción seleccionada
        localStorage.setItem("cart", JSON.stringify({ title: tipo, price: precio }));
  
        // Limpiar estados activos previos
        suscripciones.forEach((btn) => btn.classList.remove("active"));
  
        // Marcar el botón actual como activo
        e.target.classList.add("active");
  
        // Mostrar mensaje de confirmación
        Swal.fire({
          title: "¡Suscripción seleccionada!",
          text: `Has elegido el plan ${tipo}.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      });
    });
  
    // Mostrar total de la compra al finalizar
    document.getElementById("finalizar-compra").addEventListener("click", () => {
      const suscripcionSeleccionada = JSON.parse(localStorage.getItem("cart"));
  
      if (suscripcionSeleccionada) {
        Swal.fire({
          title: "Resumen de Compra",
          html: `
            <p>Has seleccionado el siguiente plan:</p>
            <ul>
              <li><strong>${suscripcionSeleccionada.title}</strong>: $${suscripcionSeleccionada.price.toFixed(2)}</li>
            </ul>
            <p><strong>Total:</strong> $${suscripcionSeleccionada.price.toFixed(2)}</p>
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
          text: "No has seleccionado ninguna suscripción.",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    });
  });
  


