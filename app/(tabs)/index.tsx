// app/index.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      {/* Logo/Imagen de fashion */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/200x200' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Fashion Assistant</Text>
        <Text style={styles.subtitle}>Tu armario virtual inteligente</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.primaryButtonText}>Comenzar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});