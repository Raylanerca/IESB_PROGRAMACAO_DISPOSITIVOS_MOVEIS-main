import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Card, Text, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function PetsScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadPets();
    }
  }, [isFocused]);

  const loadPets = async () => {
    try {
      const data = await AsyncStorage.getItem('pets');
      if (data) {
        setPets(JSON.parse(data));
      } else {
        setPets([]);
      }
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
    }
  };

  const deletePet = (id) => {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este pet?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const newPets = pets.filter((pet) => pet.id !== id);
          setPets(newPets);
          await AsyncStorage.setItem('pets', JSON.stringify(newPets));
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.nome} subtitle={item.raca} />
      <Card.Content>
        <Text>Idade: {item.idade}</Text>
        <Text>Peso: {item.peso} kg</Text>
        {item.observacoes ? <Text>Obs: {item.observacoes}</Text> : null}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('PetDetails', { pet: item })}>
          Detalhes
        </Button>
        <Button onPress={() => navigation.navigate('PetForm', { pet: item })}>
          Editar
        </Button>
        <Button onPress={() => deletePet(item.id)}>Excluir</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum pet cadastrado.</Text>}
      />

      <FAB
        icon="plus"
        label="Novo Pet"
        style={styles.fab}
        onPress={() => navigation.navigate('PetForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
