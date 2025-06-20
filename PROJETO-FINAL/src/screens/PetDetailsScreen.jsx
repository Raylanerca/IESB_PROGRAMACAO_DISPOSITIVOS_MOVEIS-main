import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PetDetails({ navigation, route }) {
  const { pet } = route.params;
  const [petData, setPetData] = useState(pet);

  useEffect(() => {
    async function loadPet() {
      const data = await AsyncStorage.getItem('pets');
      const pets = data ? JSON.parse(data) : [];
      const foundPet = pets.find(p => p.id === pet.id);
      if (foundPet) setPetData(foundPet);
    }
    loadPet();
  }, [pet]);

  if (!petData) {
    return (
      <View style={styles.container}>
        <Text>Pet não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {petData.fotoUri ? (
        <Image source={{ uri: petData.fotoUri }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>Nenhuma foto disponível</Text>
        </View>
      )}

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{petData.nome}</Text>

      <Text style={styles.label}>Raça:</Text>
      <Text style={styles.value}>{petData.raca}</Text>

      <Text style={styles.label}>Idade:</Text>
      <Text style={styles.value}>{petData.idade}</Text>

      <Text style={styles.label}>Peso (kg):</Text>
      <Text style={styles.value}>{petData.peso}</Text>

      <Text style={styles.label}>Observações:</Text>
      <Text style={styles.value}>{petData.observacoes || '-'}</Text>

      <Text style={styles.label}>Aniversário:</Text>
      <Text style={styles.value}>
        {new Date(petData.aniversario).toLocaleDateString()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    backgroundColor: '#471396',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
});
