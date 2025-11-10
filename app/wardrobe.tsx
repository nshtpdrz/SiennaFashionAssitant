// app/wardrobe.tsx
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Datos de ejemplo
const initialItems = [
  { 
    id: '1', 
    name: 'Camiseta Blanca', 
    category: 'Tops', 
    image: 'https://via.placeholder.com/150x200/4A90E2/FFFFFF?text=Camiseta' 
  },
  { 
    id: '2', 
    name: 'Jeans Azul', 
    category: 'Bottoms', 
    image: 'https://via.placeholder.com/150x200/357ABD/FFFFFF?text=Jeans' 
  },
  { 
    id: '3', 
    name: 'Zapatillas', 
    category: 'Shoes', 
    image: 'https://via.placeholder.com/150x200/2C3E50/FFFFFF?text=Zapatillas' 
  },
];

export default function WardrobeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [wardrobeItems, setWardrobeItems] = useState(initialItems);

  const categories = [
    { name: 'Todos', icon: '👕' },
    { name: 'Tops', icon: '👕' },
    { name: 'Bottoms', icon: '👖' },
    { name: 'Shoes', icon: '👟' },
    { name: 'Dresses', icon: '👗' },
    { name: 'Accessories', icon: '🕶️' },
  ];

  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    Alert.alert(
      'Agregar Prenda',
      '¿Cómo quieres agregar la prenda?',
      [
        {
          text: 'Tomar Foto',
          onPress: () => Alert.alert('Cámara', 'Funcionalidad de cámara próximamente')
        },
        {
          text: 'Desde Galería', 
          onPress: () => Alert.alert('Galería', 'Funcionalidad de galería próximamente')
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mi Armario</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar prendas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Categorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Prendas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'Todos' ? 'Todas las prendas' : selectedCategory}
            </Text>
            <Text style={styles.itemsCount}>{filteredItems.length} items</Text>
          </View>
          
          {filteredItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay prendas en esta categoría</Text>
              <Text style={styles.emptySubtext}>Agrega una nueva prenda tocando el botón +</Text>
            </View>
          ) : (
            <View style={styles.itemsGrid}>
              {filteredItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
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
  addButton: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemsCount: {
    fontSize: 14,
    color: '#666',
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 20,
    minWidth: 80,
  },
  categoryCardSelected: {
    backgroundColor: '#000',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 10,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  itemImage: {
    width: '100%',
    height: 150,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});