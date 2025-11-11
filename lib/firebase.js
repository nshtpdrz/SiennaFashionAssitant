// lib/firebase.ts
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_DAYUtqz_tRcGnKQa56SdZxhqSREqfA8",
  authDomain: "siennafashionassistantv1.firebaseapp.com",
  projectId: "siennafashionassistantv1",
  storageBucket: "siennafashionassistantv1.firebasestorage.app",
  messagingSenderId: "949911091838",
  appId: "1:949911091838:web:ae2168280b18aa0461f62f",
  measurementId: "G-RXYR3QQVKZ"
};

const app = initializeApp(firebaseConfig);

// Configurar auth con persistencia
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;