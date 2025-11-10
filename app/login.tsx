// app/login.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@fashion.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    
    // Simular proceso de login
    setTimeout(() => {
      if (email === 'demo@fashion.com' && password === '123456') {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        router.replace('/home');
      } else {
        Alert.alert('Error', 'Email o contraseña incorrectos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <View style={styles.demoBanner}>
        <Text style={styles.demoText}>🔧 Modo Demo Activado</Text>
        <Text style={styles.demoSubtext}>Usa: demo@fashion.com / 123456</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  demoBanner: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  demoText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  demoSubtext: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16,
  },
});