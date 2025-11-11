// services/storageService.ts
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../lib/firebase';

export const storageService = {
  // Subir imagen genérica
  uploadImage: async (uri: string, path: string): Promise<string> => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    // Convertir URI a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Subir a Storage
    const storageRef = ref(storage, `users/${user.uid}/${path}/${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  },

  // Subir imagen de perfil
  uploadProfileImage: async (uri: string): Promise<string> => {
    return storageService.uploadImage(uri, 'profile');
  },

  // Subir imagen de prenda
  uploadClothingImage: async (uri: string): Promise<string> => {
    return storageService.uploadImage(uri, 'clothing');
  }
};