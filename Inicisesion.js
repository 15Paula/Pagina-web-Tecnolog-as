// Inicisesion.js
import { 
  onAuthState, 
  logoutUser, 
  db, 
  doc,
  getDoc
} from './firebase.js';

export function initAuthUI({
  loginBtnSelector,
  userProfileSelector,
  userNameSelector,
  userMenuSelector,
  logoutBtnSelector
}) {
  const loginBtn = document.querySelector(loginBtnSelector);
  const userProfile = document.querySelector(userProfileSelector);
  const userNameSpan = document.querySelector(userNameSelector);
  const userMenu = document.querySelector(userMenuSelector);
  const logoutBtn = document.querySelector(logoutBtnSelector);

  if (!loginBtn || !userProfile || !userNameSpan || !userMenu || !logoutBtn) {
    console.error('No se encontraron los elementos para inicializar la UI de autenticación.');
    return;
  }

  // Mostrar/ocultar menú
  userProfile.addEventListener('click', () => {
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });

  // Detectar inicio de sesión
  onAuthState(async (user) => {
    if (user) {
      loginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      userMenu.style.display = 'none';

      try {
        // ✅ Leer el documento correcto por UID
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        let nombreCompleto = user.email;

        if (docSnap.exists()) {
          nombreCompleto = docSnap.data().nombre || user.email;
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

  // Cerrar sesión
  logoutBtn.addEventListener('click', async () => {
    await logoutUser();
    window.location.reload();
  });
}