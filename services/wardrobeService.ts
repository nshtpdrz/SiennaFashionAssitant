// services/wardrobeService.ts
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  image: string;
  isFavorite: boolean;
  userId: string;
  createdAt: Date;
}

export const wardrobeService = {
  // Obtener todas las prendas del usuario
  getClothingItems: async (): Promise<ClothingItem[]> => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const q = query(
      collection(db, 'clothingItems'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ClothingItem));
  },

  // Agregar nueva prenda
  addClothingItem: async (item: Omit<ClothingItem, 'id' | 'userId' | 'createdAt'>) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const docRef = await addDoc(collection(db, 'clothingItems'), {
      ...item,
      userId: user.uid,
      createdAt: new Date()
    });
    
    return docRef.id;
  },

  // Actualizar prenda
  updateClothingItem: async (itemId: string, updates: Partial<ClothingItem>) => {
    await updateDoc(doc(db, 'clothingItems', itemId), updates);
  },

  // Eliminar prenda
  deleteClothingItem: async (itemId: string) => {
    await deleteDoc(doc(db, 'clothingItems', itemId));
  }
};