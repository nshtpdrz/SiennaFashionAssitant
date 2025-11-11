// app/outfits.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OutfitsScreen() {
  const outfits = [
    { id: '1', name: 'Outfit Casual', items: 3, image: 'https://via.placeholder.com/160x200' },
    { id: '2', name: 'Look Formal', items: 4, image: 'https://via.placeholder.com/160x200' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Outfits</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/create-outfit')}
        >
          <Text style={styles.createButtonText}>+ Crear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.outfitsGrid}>
          {outfits.map((outfit) => (
            <TouchableOpacity key={outfit.id} style={styles.outfitCard}>
              <Image source={{ uri: outfit.image }} style={styles.outfitImage} />
              <Text style={styles.outfitName}>{outfit.name}</Text>
              <Text style={styles.outfitItems}>{outfit.items} prendas</Text>
            </TouchableOpacity>
          ))}
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
  createButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 15,
  },
  outfitCard: {
    width: '47%',
  },
  outfitImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  outfitName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  outfitItems: {
    fontSize: 12,
    color: '#666',
  },
});