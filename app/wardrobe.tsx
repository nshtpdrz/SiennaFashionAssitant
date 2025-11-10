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
import AddItemModal from '../components/AddItemModal';
import CameraModal from '../components/CameraModal';

// Datos con favoritos
const initialItems = [
  { id: '1', name: 'Camiseta Blanca', category: 'Tops', image: 'https://via.placeholder.com/150x200/4A90E2/FFFFFF?text=Camiseta', isFavorite: true },
  { id: '2', name: 'Jeans Azul', category: 'Bottoms', image: 'https://via.placeholder.com/150x200/357ABD/FFFFFF?text=Jeans', isFavorite: false },
  { id: '3', name: 'Zapatillas', category: 'Shoes', image: 'https://via.placeholder.com/150x200/2C3E50/FFFFFF?text=Zapatillas', isFavorite: true },
  { id: '4', name: 'Vestido Negro', category: 'Dresses', image: 'https://via.placeholder.com/150x200/8E44AD/FFFFFF?text=Vestido', isFavorite: false },
];

export default function WardrobeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [wardrobeItems, setWardrobeItems] = useState(initialItems);
  
  const [cameraVisible, setCameraVisible] = useState(false);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // <- CORREGIDO AQUÍ

  const categories = [
    { name: 'Todos', icon: '👕' },
    { name: 'Tops', icon: '👕' },
    { name: 'Bottoms', icon: '👖' },
    { name: 'Shoes', icon: '👟' },
    { name: 'Dresses', icon: '👗' },
  ];

  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteItems = wardrobeItems.filter(item => item.isFavorite);

  const toggleFavorite = (itemId: string) => {
    setWardrobeItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, isFavorite: !item.isFavorite } 
          : item
      )
    );
  };

  const handleAddItemPress = () => {
    setCameraVisible(true);
  };

  const handlePhotoTaken = (imageUri: string) => {
    setCapturedImage(imageUri); // <- AHORA SÍ FUNCIONA
    setCameraVisible(false);
    setAddItemVisible(true);
  };

  const handleAddItem = (newItem: any) => {
    const itemWithImage = {
      ...newItem,
      image: capturedImage || 'https://via.placeholder.com/150x200/CCCCCC/FFFFFF?text=Prenda', // <- FALLBACK SI ES NULL
      id: Date.now().toString(),
      isFavorite: false,
    };
    
    setWardrobeItems([...wardrobeItems, itemWithImage]);
    setCapturedImage(null);
    setAddItemVisible(false);
    Alert.alert('¡Éxito!', 'Prenda agregada al armario');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Armario</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItemPress}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar prendas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favoriteItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❤️ Favoritos</Text>
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
        )}

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

        <View style={styles.bottomSpace} />
      </ScrollView>

      <CameraModal
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onPhotoTaken={handlePhotoTaken}
      />

      <AddItemModal
        visible={addItemVisible}
        onClose={() => {
          setAddItemVisible(false);
          setCapturedImage(null);
        }}
        onAddItem={handleAddItem}
        capturedImage={capturedImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  favoriteCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 4,
  },
  heartText: {
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsCount: {
    color: '#888888',
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  emptySubtext: {
    color: '#999999',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  itemImage: {
    width: '100%',
    height: 180,
  },
  itemInfo: {
    padding: 8,
  },
  itemName: {
    fontWeight: '600',
  },
  itemCategory: {
    color: '#777777',
    fontSize: 12,
  },
  categoryCard: {
    padding: 8,
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  categoryCardSelected: {
    backgroundColor: '#4A90E2',
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    marginTop: 4,
    fontSize: 12,
  },
  bottomSpace: {
    height: 80,
  },
});