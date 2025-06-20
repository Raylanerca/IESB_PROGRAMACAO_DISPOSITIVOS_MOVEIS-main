import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, Image } from 'react-native';
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
      setPets(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
    }
  };

  const deletePet = (id) => {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir este pet?', [
      { text: 'Cancelar', style: 'cancel' },
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
    <Card style={styles.card} mode="elevated">
      <Card.Title
        titleStyle={styles.nome}
        subtitleStyle={styles.raca}
        title={item.nome}
        subtitle={item.raca}
        left={() =>
          item.fotoUri ? (
            <Image source={{ uri: item.fotoUri }} style={styles.avatar} />
          ) : null
        }
      />
      <Card.Content>
        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.value}>{item.idade} anos</Text>

        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{item.peso} kg</Text>

        {item.observacoes ? (
          <>
            <Text style={styles.label}>Observações:</Text>
            <Text style={styles.value}>{item.observacoes}</Text>
          </>
        ) : null}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="outlined"
          textColor="#6A1B9A"
          onPress={() => navigation.navigate('PetDetails', { pet: item })}
        >
          Detalhes
        </Button>
        <Button
          mode="outlined"
          textColor="#6A1B9A"
          onPress={() => navigation.navigate('PetForm', { pet: item })}
        >
          Editar
        </Button>
        <Button
          mode="outlined"
          textColor="red"
          onPress={() => deletePet(item.id)}
        >
          Excluir
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum pet cadastrado.</Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <FAB
        icon="plus"
        label="Novo Pet"
        style={styles.fab}
        onPress={() => navigation.navigate('PetForm')}
        color="#fff"
        customSize={60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  raca: {
    fontSize: 16,
    color: '#7B1FA2',
  },
  label: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#9C27B0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },
});
