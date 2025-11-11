// contexts/AuthContext.tsx
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  userData: any;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email);
      setUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              name: user.email?.split('@')[0] || 'Usuario',
              email: user.email,
              bio: '',
              age: '',
              style: 'Casual'
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setUserData({
            name: user.email?.split('@')[0] || 'Usuario',
            email: user.email,
            bio: '',
            age: '',
            style: 'Casual'
          });
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, 'users', result.user.uid), {
      name,
      email,
      createdAt: new Date(),
      bio: '',
      age: '',
      style: 'Casual',
      preferences: {
        colors: [],
        brands: [],
        sizes: []
      }
    });
    
    setUser(result.user);
    setUserData({
      name,
      email,
      bio: '',
      age: '',
      style: 'Casual'
    });
  };

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    
    try {
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setUserData({
          name: result.user.email?.split('@')[0] || 'Usuario',
          email: result.user.email,
          bio: '',
          age: '',
          style: 'Casual'
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  const updateUserData = async (data: any) => {
    if (!user) return;
    
    await setDoc(doc(db, 'users', user.uid), data, { merge: true });
    setUserData(data);
  };

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure you have wrapped your app with <AuthProvider> in _layout.tsx'
    );
  }
  
  return context;
}