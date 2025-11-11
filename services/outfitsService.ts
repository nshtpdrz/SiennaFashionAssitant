// services/outfitsService.ts
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    where
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface Outfit {
  id: string;
  name: string;
  items: string[]; // IDs de las prendas
  userId: string;
  image?: string;
  createdAt: Date;
}

export const outfitsService = {
  // Obtener todos los outfits del usuario
  getOutfits: async (): Promise<Outfit[]> => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const q = query(
      collection(db, 'outfits'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Outfit));
  },

  // Crear nuevo outfit
  createOutfit: async (outfit: Omit<Outfit, 'id' | 'userId' | 'createdAt'>) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const docRef = await addDoc(collection(db, 'outfits'), {
      ...outfit,
      userId: user.uid,
      createdAt: new Date()
    });
    
    return docRef.id;
  },

  // Eliminar outfit
  deleteOutfit: async (outfitId: string) => {
    await deleteDoc(doc(db, 'outfits', outfitId));
  }
};