// Importa AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
import { initializeFirestore } from "@firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwAbsi7cmSwII9CaGRYSp-IV8qWcW4gNo",
    authDomain: "nowbox-9e3df.firebaseapp.com",
    projectId: "nowbox-9e3df",
    storageBucket: "nowbox-9e3df.appspot.com",
    messagingSenderId: "566450108015",
    appId: "1:566450108015:web:1af831afd7dfeb7816ff9a",
    measurementId: "G-HQMWVTCJPR"
  };


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore si lo necesitas
// const db = getFirestore(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

// Inicializa Firebase initializeAuth con AsyncStorage
const initialAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});



export {  db, initialAuth};

