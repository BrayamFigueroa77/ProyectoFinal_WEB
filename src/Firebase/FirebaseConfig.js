// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7-EQ2IUyujkIbyY1M3TAUCAD5Fe8w9iQ",
  authDomain: "bitacoras-4bee7.firebaseapp.com",
  projectId: "bitacoras-4bee7",
  storageBucket: "bitacoras-4bee7.firebasestorage.app",
  messagingSenderId: "192316556732",
  appId: "1:192316556732:web:6db8591f064866429cd7b9"
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

export { appFirebase, auth };
