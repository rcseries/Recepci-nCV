// Importar Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (copia esto desde tu consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBvd8E8KrQWP6NcrzzSTAQepwv8XhL5O3Y",
  authDomain: "recepcioncv.firebaseapp.com",
  projectId: "recepcioncv",
  storageBucket: "recepcioncv.firebasestorage.app",
  messagingSenderId: "691150393434",
  appId: "1:691150393434:web:14a304a7b8a5bd7609c863",
  measurementId: "G-R9SGRQH43Z"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };