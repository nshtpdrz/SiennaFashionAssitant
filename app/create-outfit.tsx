// app/create-outfit.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Define el tipo para los items
type ClothingItem = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export default function CreateOutfitScreen() {
  const [outfitName, setOutfitName] = useState('');
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);

  const items: ClothingItem[] = [
    { id: '1', name: 'Camiseta', category: 'Tops', image: 'https://via.placeholder.com/100x150' },
    { id: '2', name: 'Jeans', category: 'Bottoms', image: 'https://via.placeholder.com/100x150' },
    { id: '3', name: 'Zapatillas', category: 'Shoes', image: 'https://via.placeholder.com/100x150' },
  ];

  const toggleItem = (item: ClothingItem) => {
    const isSelected = selectedItems.some(i => i.id === item.id);
    
    if (isSelected) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const saveOutfit = () => {
    console.log('Outfit guardado:', { name: outfitName, items: selectedItems });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Crear Outfit</Text>
        <TouchableOpacity onPress={saveOutfit}>
          <Text style={styles.saveButton}>Listo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.nameInput}
          placeholder="Nombre del outfit"
          value={outfitName}
          onChangeText={setOutfitName}
        />

        <Text style={styles.sectionTitle}>Seleccionar Prendas</Text>
        
        <View style={styles.itemsGrid}>
          {items.map((item) => {
            const isSelected = selectedItems.some(i => i.id === item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemCard,
                  isSelected && styles.itemCardSelected
                ]}
                onPress={() => toggleItem(item)}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
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
  backButton: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  nameInput: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  itemCardSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#007AFF',
    color: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
});