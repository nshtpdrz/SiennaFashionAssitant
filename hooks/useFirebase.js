// hooks/useFirebase.js
import { getApps, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

export const useFirebase = () => {
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    setFirebaseReady(true);
  }, []);

  return { firebaseReady };
};