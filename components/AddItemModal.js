// components/AddItemModal.js
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

export default function AddItemModal({ visible, onClose, onAddItem, capturedImage }) {
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Tops', 'Bottoms', 'Shoes', 'Dresses', 'Accessories', 'Outerwear'
  ];

  const colors = [
    'Negro', 'Blanco', 'Azul', 'Rojo', 'Verde', 'Amarillo', 'Rosa', 'Gris', 'Marrón'
  ];

  const handleSaveItem = () => {
    if (!itemName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la prenda');
      return;
    }

    if (!capturedImage) {
      Alert.alert('Error', 'Debes tomar o seleccionar una foto primero');
      return;
    }

    setLoading(true);

    // Simular guardado
    setTimeout(() => {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        category: selectedCategory,
        image: capturedImage,
        isFavorite: false,
        dateAdded: new Date(),
      };

      onAddItem(newItem);
      setItemName('');
      setLoading(false);
      Alert.alert('Éxito', 'Prenda agregada al armario');
    }, 1000);
  };

  const handleClose = () => {
    setItemName('');
    setSelectedCategory('Tops');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Agregar Prenda</Text>
          <TouchableOpacity onPress={handleSaveItem} disabled={loading}>
            <Text style={[styles.saveButton, loading && styles.saveButtonDisabled]}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Vista previa de la imagen */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Vista previa</Text>
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Sin imagen</Text>
              </View>
            )}
          </View>

          {/* Nombre de la prenda */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nombre de la prenda</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: Camiseta blanca, Jeans azul..."
              value={itemName}
              onChangeText={setItemName}
            />
          </View>

          {/* Categoría */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categoría</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.categoryButtonSelected
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Color (opcional) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color (opcional)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.colorsContainer}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={styles.colorOption}
                  >
                    <View style={[styles.colorCircle, { backgroundColor: getColorHex(color) }]} />
                    <Text style={styles.colorText}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// Función auxiliar para colores
const getColorHex = (color) => {
  const colorMap = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Azul': '#007AFF',
    'Rojo': '#FF3B30',
    'Verde': '#4CD964',
    'Amarillo': '#FFCC00',
    'Rosa': '#FF2D55',
    'Gris': '#8E8E93',
    'Marrón': '#A2845E',
  };
  return colorMap[color] || '#CCCCCC';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cancelButton: {
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  previewImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
  },
  placeholderImage: {
    width: 200,
    height: 250,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  textInput: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  colorsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  colorText: {
    fontSize: 12,
    color: '#666',
  },
});