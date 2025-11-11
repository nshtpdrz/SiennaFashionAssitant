// hooks/useAuth.js
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { isEmulator } from '../lib/firebase';

// Datos de usuario mock para desarrollo
const mockUsers = [
  { id: '1', email: 'demo@fashion.com', password: '123456', name: 'Usuario Demo' }
];

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => {
      // Para desarrollo, auto-login con usuario demo
      setUser({
        uid: '1',
        email: 'demo@fashion.com',
        displayName: 'Usuario Demo'
      });
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setUser({ uid: user.id, email: user.email, displayName: user.name });
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const register = async (email, password, name) => {
    // Simular registro exitoso
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    mockUsers.push(newUser);
    setUser({ uid: newUser.id, email: newUser.email, displayName: newUser.name });
    return { success: true };
  };

const logout = async () => {
  try {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    
    router.replace('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
  return { 
    user, 
    loading, 
    login, 
    register, 
    logout,
    isEmulator 
  };
}