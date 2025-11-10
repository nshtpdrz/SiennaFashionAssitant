// app/home.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  // Datos del usuario
  const userData = {
    name: 'Ana García'
  };

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {userData.name}! 👋</Text>
          <Text style={styles.subtitle}>¿Qué outfit llevarás hoy?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Outfit del día */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outfit del día</Text>
          <View style={styles.outfitCard}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=Outfit+Casual' }}
              style={styles.outfitImage}
            />
            <View style={styles.outfitInfo}>
              <Text style={styles.outfitName}>Estilo Casual</Text>
              <Text style={styles.outfitItems}>Camiseta blanca + Jeans + Zapatillas</Text>
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherText}>☀️ Perfecto para 25°C</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Outfits sugeridos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus outfits</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.suggestedOutfit}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150x200/FF6B6B/FFFFFF?text=Formal' }}
                style={styles.suggestedImage}
              />
              <Text style={styles.suggestedText}>Look Formal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestedOutfit}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150x200/4CD964/FFFFFF?text=Deportivo' }}
                style={styles.suggestedImage}
              />
              <Text style={styles.suggestedText}>Estilo Deportivo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestedOutfit}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150x200/FF9500/FFFFFF?text=Nocturno' }}
                style={styles.suggestedImage}
              />
              <Text style={styles.suggestedText}>Noche Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Navegación rápida */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones rápidas</Text>
          <View style={styles.quickNav}>
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => router.push('/wardrobe')}
            >
              <Text style={styles.navIcon}>👕</Text>
              <Text style={styles.navTitle}>Armario</Text>
              <Text style={styles.navDesc}>Gestiona tu ropa</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => router.push('/outfits')}
            >
              <Text style={styles.navIcon}>👗</Text>
              <Text style={styles.navTitle}>Outfits</Text>
              <Text style={styles.navDesc}>Crea combinaciones</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickNav}>
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => router.push('/create-outfit')}
            >
              <Text style={styles.navIcon}>✨</Text>
              <Text style={styles.navTitle}>Crear Outfit</Text>
              <Text style={styles.navDesc}>Nueva combinación</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => console.log('Estadísticas')}
            >
              <Text style={styles.navIcon}>📊</Text>
              <Text style={styles.navTitle}>Estadísticas</Text>
              <Text style={styles.navDesc}>Tus métricas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recordatorios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recordatorios</Text>
          <View style={styles.reminderCard}>
            <Text style={styles.reminderIcon}>🧽</Text>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderTitle}>Lavado pendiente</Text>
              <Text style={styles.reminderDesc}>3 prendas necesitan lavado</Text>
            </View>
            <TouchableOpacity style={styles.reminderButton}>
              <Text style={styles.reminderButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Espacio al final */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Mantenemos este padding para dispositivos normales
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  outfitCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: 300,
  },
  outfitInfo: {
    padding: 15,
  },
  outfitName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outfitItems: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  weatherInfo: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  weatherText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  suggestedOutfit: {
    marginRight: 15,
    alignItems: 'center',
  },
  suggestedImage: {
    width: 150,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  suggestedText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  quickNav: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  navCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  navDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  reminderDesc: {
    fontSize: 14,
    color: '#666',
  },
  reminderButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});