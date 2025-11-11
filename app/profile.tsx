// app/profile.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, userData, logout } = useAuth();
  const [stats, setStats] = useState([ 
    { number: '0', label: 'Prendas' }, 
    { number: '0', label: 'Outfits' }, 
    { number: '0', label: 'Favoritos' } 
  ]);

  /* useEffect(() => {
    loadStats();
  }, []);

 const loadStats = async () => {
  try {
    const clothingItems = await wardrobeService.getClothingItems();
    // const outfits = await outfitsService.getOutfits(); // COMENTA TEMPORALMENTE
    const favorites = clothingItems.filter(item => item.isFavorite);

    setStats([
      { number: clothingItems.length.toString(), label: 'Prendas' },
      { number: '0', label: 'Outfits' }, // TEMPORAL: outfits.length.toString()
      { number: favorites.length.toString(), label: 'Favoritos' }
    ]);
  } catch (error) {
    console.error('Error loading stats:', error);
    // Fallback
    setStats([
      { number: '0', label: 'Prendas' },
      { number: '0', label: 'Outfits' },
      { number: '0', label: 'Favoritos' }
    ]);
  }
};*/

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

// app/profile.tsx
const handleLogout = () => {
  console.log('🟡 Botón de logout presionado');
  Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
    { text: 'Cancelar', style: 'cancel', onPress: () => console.log('🟡 Logout cancelado') },
    { 
      text: 'Cerrar Sesión', 
      style: 'destructive', 
      onPress: () => {
        console.log('🟡 Confirmación de logout aceptada');
        logout();
      }
    }
  ]);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => router.push('/edit-profile')}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {getInitials(userData?.name || user?.email || 'Usuario')}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData?.name || user?.email}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userBio}>{userData?.bio || 'Sin descripción'}</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Mis Estadísticas</Text>
          <View style={styles.stats}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  title: { fontSize: 28, fontWeight: 'bold' },
  editButton: { backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  editButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  content: { flex: 1 },
  userInfo: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userDetails: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  userEmail: { fontSize: 16, color: '#666', marginBottom: 8 },
  userBio: { fontSize: 14, color: '#333' },
  statsSection: { paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  stats: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 14, color: '#666' },
  logoutButton: { margin: 20, backgroundColor: '#FF3B30', padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bottomSpace: { height: 20 },
});