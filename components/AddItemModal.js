// components/AddItemModal.js
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddItemModal({ visible, onClose, onAddItem }) {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Tops');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitas permitir el acceso a la galería');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitas permitir el acceso a la cámara');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddItem = () => {
    if (!image) {
      Alert.alert('Error', 'Selecciona una imagen primero');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      image,
      category,
      name: `Prenda ${Date.now()}`,
      dateAdded: new Date(),
    };

    onAddItem(newItem);
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Agregar Prenda</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Vista previa de imagen */}
        <View style={styles.imageSection}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Sin imagen</Text>
            </View>
          )}
        </View>

        {/* Botones de cámara/galería */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>📁 Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>📷 Cámara</Text>
          </TouchableOpacity>
        </View>

        {/* Selección de categoría */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categoría</Text>
          <View style={styles.categories}>
            {['Tops', 'Bottoms', 'Shoes', 'Dresses', 'Accessories'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonSelected
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botón agregar */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Agregar al Armario</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 250,
    borderRadius: 10,
  },
  placeholder: {
    width: 200,
    height: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  imageButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  categoryButtonSelected: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});