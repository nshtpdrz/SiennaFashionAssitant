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
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos iniciales
const initialItems = [
  { id: '1', name: 'Camiseta Blanca', category: 'Tops', image: 'https://via.placeholder.com/150x200/4A90E2/FFFFFF?text=Camiseta', isFavorite: true },
  { id: '2', name: 'Jeans Azul', category: 'Bottoms', image: 'https://via.placeholder.com/150x200/357ABD/FFFFFF?text=Jeans', isFavorite: false },
  { id: '3', name: 'Zapatillas', category: 'Shoes', image: 'https://via.placeholder.com/150x200/2C3E50/FFFFFF?text=Zapatillas', isFavorite: true },
];

export default function WardrobeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [wardrobeItems, setWardrobeItems] = useState(initialItems);

  const categories = [
    { name: 'Todos', icon: '👕', count: wardrobeItems.length },
    { name: 'Tops', icon: '👕', count: wardrobeItems.filter(item => item.category === 'Tops').length },
    { name: 'Bottoms', icon: '👖', count: wardrobeItems.filter(item => item.category === 'Bottoms').length },
    { name: 'Shoes', icon: '👟', count: wardrobeItems.filter(item => item.category === 'Shoes').length },
  ];

  // Filtrar items
  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Items favoritos
  const favoriteItems = wardrobeItems.filter(item => item.isFavorite);

  // Alternar favorito
  const toggleFavorite = (itemId: string) => {
  setWardrobeItems(prevItems => 
    prevItems.map(item => 
      item.id === itemId 
        ? { ...item, isFavorite: !item.isFavorite } 
        : item
    )
  );
};

  // Manejar agregar prenda
  const handleAddItemPress = () => {
    Alert.alert('Agregar Prenda', 'Funcionalidad de cámara próximamente');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mi Armario</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItemPress}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Favoritos */}
        {favoriteItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❤️ Favoritos</Text>
            <View style={styles.favoritesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {favoriteItems.map((item) => (
                  <View key={item.id} style={styles.favoriteCard}>
                    <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                    <TouchableOpacity 
                      style={styles.heartButton}
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <Text style={styles.heartText}>❤️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Categorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoriesContainer}>
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
                  <Text style={styles.categoryCount}>{category.count}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
                  <TouchableOpacity 
                    style={styles.heartButton}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text style={styles.heartText}>
                      {item.isFavorite ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
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
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: { 
    fontSize: 26,
    fontWeight: 'bold' 
  },
  addButton: { 
    backgroundColor: '#000', 
    width: 40,
    height: 40,
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold' 
  },
  searchContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 16,
    marginTop: 8,
  },
  searchInput: { 
    backgroundColor: '#f8f8f8', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 10, 
    fontSize: 16, 
  },
  content: { 
    flex: 1 
  },
  section: { 
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemsCount: { 
    fontSize: 14,
    color: '#666' 
  },
  favoritesContainer: {
    marginTop: 8,
  },
  categoriesContainer: {
    marginTop: 8,
  },
  favoriteCard: {
    marginRight: 16,
  },
  favoriteImage: {
    width: 110,
    height: 140,
    borderRadius: 10,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 80,
  },
  categoryCardSelected: {
    backgroundColor: '#000',
  },
  categoryIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    color: '#666',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  itemImage: {
    width: '100%',
    height: 150,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 14,
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
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
  bottomSpace: {
    height: 30,
  },
});