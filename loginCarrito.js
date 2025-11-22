import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {

    // Si el clic NO es en un botón de carrito, ignoramos
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const user = auth.currentUser;

    if (!user) {
      e.preventDefault();   // Evita que tu script siga
      e.stopPropagation();  // Bloquea completamente el clic
      window.location.href = "login.html";
      return;
    }

    // Si el usuario está autenticado, no hacemos nada.
    // Tu script ORIGINAL manejará el añadido al carrito.
  });
});
