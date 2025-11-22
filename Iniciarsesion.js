import { onAuthState, logoutUser, db, doc, getDoc } from './firebase.js';

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

  function getFirstName(fullName) {
    return fullName.split(' ')[0];
  }

  userProfile.addEventListener('click', () => {
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });

  onAuthState(async (user) => {
    console.log("✅ Cambio de sesión detectado. Usuario actual:", user);

    if (user) {
      loginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      userMenu.style.display = 'none';

      console.log("➡️ UID del usuario:", user.uid);
      console.log("➡️ Email del usuario:", user.email);

      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        console.log("📄 Documento Firestore encontrado:", docSnap.exists());
        if (docSnap.exists()) {
          console.log("📄 Datos del Firestore:", docSnap.data());
        }

        let nombreCompleto = user.email;

        if (docSnap.exists()) {
          nombreCompleto = docSnap.data().nombre || user.email;
        }

        console.log("✅ Nombre final mostrado:", nombreCompleto);

        userNameSpan.textContent = getFirstName(nombreCompleto);

      } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
        userNameSpan.textContent = user.email.split('@')[0];
      }
    } else {
      loginBtn.style.display = 'flex';
      userProfile.style.display = 'none';
      userMenu.style.display = 'none';
    }
  });
}