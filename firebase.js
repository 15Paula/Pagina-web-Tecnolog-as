// firebase.js

// --- Importar Firebase Core, Auth y Firestore ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// --- Configuración Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyAQWzV5B7x8pChiuSggrLFGj753i0kySCU",
  authDomain: "login-93039.firebaseapp.com",
  projectId: "login-93039",
  storageBucket: "login-93039.appspot.com",
  messagingSenderId: "428055807133",
  appId: "1:428055807133:web:22dee2f9c08b15bce80074"
};

// --- Inicializar Firebase ---
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Funciones personalizadas de Auth ---

export const registerUser = (email, password) => {
  return firebaseCreateUser(auth, email, password);
}

export const loginUser = (email, password) => {
  return firebaseSignIn(auth, email, password);
}

export const onAuthState = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
}

export const logoutUser = () => {
  return signOut(auth);
}

// --- Firestore funciones ---
export {
  collection,
  addDoc,
  query,
  where,
  getDocs
};







