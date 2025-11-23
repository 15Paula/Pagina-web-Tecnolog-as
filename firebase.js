import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"; // Nota: Usé una versión estable, la 12.5.0 a veces da problemas con CDN, pero si te funciona la 12 déjala.
import {
  getAuth,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 👇 AQUÍ ESTÁ EL CAMBIO: Importamos la config en lugar de escribirla aquí
import { firebaseConfig } from "./config.js";

// Inicializamos
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 👇 DE AQUÍ PARA ABAJO ES TU CÓDIGO ORIGINAL (NO LO BORRES) 👇

export const registerUser = async (email, password, nombre, telefono, direccion) => {
  const userCredential = await firebaseCreateUser(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "usuarios", user.uid), {
    nombre,
    email,
    telefono,
    direccion,
    uid: user.uid,
    creadoEn: new Date()
  });

  return userCredential;
};

export const loginUser = (email, password) => {
  return firebaseSignIn(auth, email, password);
};

export const onAuthState = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

export const logoutUser = () => {
  return signOut(auth);
};

// Exportamos utilidades de Firestore para usarlas en otros lados
export {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc
};
/* --- NUEVA FUNCIÓN: GUARDAR PEDIDO --- */
export const registrarPedido = async (datosPedido) => {
  try {
    // Crea una colección "pedidos" automáticamente si no existe
    const docRef = await addDoc(collection(db, "pedidos"), datosPedido);
    console.log("Pedido registrado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al registrar el pedido: ", e);
    throw e;
  }
};