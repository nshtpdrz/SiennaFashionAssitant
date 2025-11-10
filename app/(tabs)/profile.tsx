// app/profile.tsx
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {
  // Datos del usuario
  const userData = {
    name: 'Ana García',
    email: 'ana@fashion.com',
    age: '25',
    bio: 'Amante de la moda casual y sostenible 🍃',
    style: 'Casual',
    joinDate: 'Noviembre 2024'
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

  const stats = [
    { number: '42', label: 'Prendas' },
    { number: '18', label: 'Outfits' },
    { number: '7', label: 'Favoritos' }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica de logout
            Alert.alert('Sesión cerrada');
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/edit-profile')}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            <Text style={styles.userBio}>{userData.bio}</Text>
            <View style={styles.userMeta}>
              <Text style={styles.userMetaText}>{userData.age} años</Text>
              <Text style={styles.userMetaText}>•</Text>
              <Text style={styles.userMetaText}>Estilo {userData.style}</Text>
              <Text style={styles.userMetaText}>•</Text>
              <Text style={styles.userMetaText}>Miembro desde {userData.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas */}
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

        {/* Preferencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Preferencias</Text>
          <View style={styles.preferences}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>🎨 Colores favoritos</Text>
              <Text style={styles.preferenceValue}>Negro, Azul, Blanco</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>📏 Tallas</Text>
              <Text style={styles.preferenceValue}>M (Tops), 30 (Jeans)</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>🏷️ Marcas preferidas</Text>
              <Text style={styles.preferenceValue}>Zara, H&M, Nike</Text>
            </View>
          </View>
        </View>

        {/* Opciones de cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>⚙️ Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>🔔 Notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>🛡️ Privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>❓ Ayuda y Soporte</Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

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
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  userMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  userMetaText: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferences: {
    gap: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 16,
    flex: 1,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});