import { onAuthState, logoutUser, db, collection, query, where, getDocs } from "./firebase.js";

export async function iniciarHeaderConFirebase() {
  const headerContainer = document.getElementById("header-container");
  const res = await fetch("header.html");
  const html = await res.text();
  headerContainer.innerHTML = html;
  document.getElementById("header-container").style.opacity = "1";

  /* ✅ ✅ AGREGAR ESTO AQUÍ (carrito funcionando) ✅ ✅ */
  const cartBtn = document.getElementById("carrito-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }
  /* ✅ ✅ FIN de la parte agregada ✅ ✅ */


  const loginBtn = document.getElementById('loginBtn');
  const userProfile = document.getElementById('userProfile');
  const userNameSpan = document.getElementById('userName');
  const userMenu = document.getElementById('userMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  userProfile.addEventListener('click', () => {
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });

  onAuthState(async (user) => {
    if (user) {
      loginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      userMenu.style.display = 'none';

      try {
        const usuariosRef = collection(db, 'usuarios');
        const q = query(usuariosRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        let nombreCompleto = user.email;

        if (!querySnapshot.empty) {
          nombreCompleto = querySnapshot.docs[0].data().nombre || user.email;
        }

        const primerNombre = nombreCompleto.split(" ")[0];
        userNameSpan.textContent = primerNombre;

      } catch (error) {
        console.error('Error al obtener usuario:', error);
        userNameSpan.textContent = user.email.split('@')[0];
      }
    } else {
      loginBtn.style.display = 'flex';
      userProfile.style.display = 'none';
      userMenu.style.display = 'none';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await logoutUser();
    window.location.reload();
  });
}




