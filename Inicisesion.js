// Inicisesion.js
import { onAuthState, logoutUser, db, collection, query, where, getDocs } from './firebase.js';

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

  // Mostrar/ocultar menú desplegable
  userProfile.addEventListener('click', () => {
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });

  // Detectar estado de sesión
  onAuthState(async (user) => {
    if (user) {
      loginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      userMenu.style.display = 'none';

      try {
        const usuariosRef = collection(db, 'usuarios');
        const q = query(usuariosRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        let nombreCompleto = '';
        if (!querySnapshot.empty) {
          nombreCompleto = querySnapshot.docs[0].data().nombre || user.email;
        } else {
          nombreCompleto = user.email;
        }

        const primerNombre = nombreCompleto.split(' ')[0];
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


