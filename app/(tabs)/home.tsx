// app/home.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user, userData } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header COMPACTO pero con todas las funciones */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>
            ¡Hola, {userData?.name || user?.email || 'Usuario'}! 👋
          </Text>
          <Text style={styles.subtitle}>¿Qué outfit llevarás hoy?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {getInitials(userData?.name || user?.email || 'US')}
            </Text>
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

        {/* Navegación rápida - TODAS las opciones */}
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
    </SafeAreaView>
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
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 80,
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  outfitCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: 250,
  },
  outfitInfo: {
    padding: 12,
  },
  outfitName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  outfitItems: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  weatherInfo: {
    backgroundColor: '#E3F2FD',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  weatherText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  suggestedOutfit: {
    marginRight: 12,
    alignItems: 'center',
  },
  suggestedImage: {
    width: 140,
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
  },
  suggestedText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  quickNav: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  navCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  navDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  reminderIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  reminderDesc: {
    fontSize: 12,
    color: '#666',
  },
  reminderButton: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});