// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Tu configuración de Firebase Web
const firebaseConfig = {
  apiKey: "AIzaSyC_DAYUtqz_tRcGnKQa56SdZxhqSREqfA8",
  authDomain: "siennafashionassistantv1.firebaseapp.com",
  projectId: "siennafashionassistantv1",
  storageBucket: "siennafashionassistantv1.firebasestorage.app",
  messagingSenderId: "949911091838",
  appId: "1:949911091838:web:ae2168280b18aa0461f62f",
  measurementId: "G-RXYR3QQVKZ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;