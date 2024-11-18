// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa getFirestore
import { getStorage } from "firebase/storage"; // Importa getStorage

const firebaseConfig = {
  apiKey: "AIzaSyA7-EQ2IUyujkIbyY1M3TAUCAD5Fe8w9iQ",
  authDomain: "bitacoras-4bee7.firebaseapp.com",
  projectId: "bitacoras-4bee7",
  storageBucket: "bitacoras-4bee7.appspot.com", // Ya está correcto
  messagingSenderId: "192316556732",
  appId: "1:192316556732:web:6db8591f064866429cd7b9"
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase); // Usa el nombre de la constante correcto
const storage = getStorage(appFirebase); // Inicializa el storage

export { appFirebase, auth, db, storage }; // Asegúrate de exportar storage también
