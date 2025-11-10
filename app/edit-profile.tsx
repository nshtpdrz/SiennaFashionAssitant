// app/edit-profile.tsx
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function EditProfileScreen() {
  // Datos del usuario (iniciales)
  const [userData, setUserData] = useState({
    name: 'Ana García',
    email: 'ana@fashion.com',
    age: '25',
    bio: 'Amante de la moda casual y sostenible 🍃',
    style: 'Casual'
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150x150');
  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  // Opciones de estilos
  const styleOptions = ['Casual', 'Formal', 'Deportivo', 'Bohemio', 'Vintage', 'Minimalista'];

  // Seleccionar imagen de galería
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitas permitir el acceso a la galería');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setImageModal(false);
  };

  // Tomar foto con cámara
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitas permitir el acceso a la cámara');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setImageModal(false);
  };

  // Guardar cambios
  const saveProfile = async () => {
    if (!userData.name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    setLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
        <TouchableOpacity onPress={saveProfile} disabled={loading}>
          <Text style={[styles.saveButton, loading && styles.saveButtonDisabled]}>
            {loading ? 'Guardando...' : 'Listo'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Foto de perfil */}
        <View style={styles.photoSection}>
          <TouchableOpacity onPress={() => setImageModal(true)}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.editPhotoButton}>
              <Text style={styles.editPhotoText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.photoLabel}>Toca para cambiar foto</Text>
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({...userData, name: text})}
              placeholder="Tu nombre"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={userData.email}
              editable={false}
              placeholder="Tu email"
            />
            <Text style={styles.helperText}>El email no se puede cambiar</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              value={userData.age}
              onChangeText={(text) => setUserData({...userData, age: text})}
              placeholder="Tu edad"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Sobre mí */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={userData.bio}
            onChangeText={(text) => setUserData({...userData, bio: text})}
            placeholder="Cuéntanos sobre tu estilo..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Estilo preferido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mi Estilo Preferido</Text>
          <View style={styles.styleGrid}>
            {styleOptions.map((style) => (
              <TouchableOpacity
                key={style}
                style={[
                  styles.styleOption,
                  userData.style === style && styles.styleOptionSelected
                ]}
                onPress={() => setUserData({...userData, style})}
              >
                <Text style={[
                  styles.styleText,
                  userData.style === style && styles.styleTextSelected
                ]}>
                  {style}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferencias adicionales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Gustos</Text>
          
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

          <TouchableOpacity style={styles.addPreferenceButton}>
            <Text style={styles.addPreferenceText}>+ Agregar más gustos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleccionar imagen */}
      <Modal visible={imageModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>
            
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <Text style={styles.modalOptionText}>📷 Tomar foto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Text style={styles.modalOptionText}>🖼️ Elegir de galería</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, styles.cancelOption]} 
              onPress={() => setImageModal(false)}
            >
              <Text style={styles.cancelOptionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  editPhotoText: {
    fontSize: 18,
  },
  photoLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  textArea: {
    minHeight: 80,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  styleOptionSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  styleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  styleTextSelected: {
    color: '#fff',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  addPreferenceButton: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginTop: 10,
  },
  addPreferenceText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  cancelOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});