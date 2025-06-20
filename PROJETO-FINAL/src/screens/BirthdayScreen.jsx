import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Button, TextInput, List, IconButton, SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BirthdayScreen() {
  const [vacina, setVacina] = useState('');
  const [vacinas, setVacinas] = useState([]);
  const [tipoDose, setTipoDose] = useState('primeira');
  const [aniversariantes, setAniversariantes] = useState([]);

  useEffect(() => {
    buscarAniversariantes();
  }, []);

  const buscarAniversariantes = async () => {
    try {
      const data = await AsyncStorage.getItem('pets');
      const pets = data ? JSON.parse(data) : [];
      const hoje = new Date();

      const petsHoje = pets.filter((pet) => {
        const aniversario = new Date(pet.aniversario);
        return (
          aniversario.getDate() === hoje.getDate() &&
          aniversario.getMonth() === hoje.getMonth()
        );
      });

      setAniversariantes(petsHoje);
    } catch (error) {
      console.log('Erro ao buscar aniversariantes:', error);
    }
  };

  const adicionarVacina = () => {
    if (vacina.trim() === '') return;
    setVacinas([...vacinas, { nome: vacina.trim(), tipo: tipoDose }]);
    setVacina('');
    setTipoDose('primeira');
  };

  const removerVacina = (index) => {
    Alert.alert('Remover vacina', 'Deseja remover essa vacina?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          const novaLista = [...vacinas];
          novaLista.splice(index, 1);
          setVacinas(novaLista);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="🎉 Aniversário dos Pets" titleStyle={styles.cardTitle} />
        <Card.Content>
          {aniversariantes.length > 0 ? (
            aniversariantes.map((pet, index) => (
              <Text key={index} style={styles.petText}>
                🐾 {pet.nome} - {pet.idade} anos!
              </Text>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum pet faz aniversário hoje.</Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => alert('Compartilhar!')}>
            Compartilhar 🎂
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="💉 Vacinas Pendentes" titleStyle={styles.cardTitle} />
        <Card.Content>
          <TextInput
            label="Nome da vacina"
            value={vacina}
            onChangeText={setVacina}
            mode="outlined"
            style={styles.input}
          />

          <SegmentedButtons
            value={tipoDose}
            onValueChange={setTipoDose}
            buttons={[
              { value: 'primeira', label: '1ª Dose' },
              { value: 'segunda', label: '2ª Dose' },
              { value: 'unica', label: 'Dose Única' },
            ]}
            style={styles.segmented}
          />

          <Button mode="contained" onPress={adicionarVacina}>
            Adicionar Vacina
          </Button>

          {vacinas.length > 0 ? (
            <FlatList
              data={vacinas}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <List.Item
                  title={item.nome}
                  description={`Tipo: ${
                    item.tipo === 'primeira'
                      ? '1ª Dose'
                      : item.tipo === 'segunda'
                      ? '2ª Dose'
                      : 'Dose Única'
                  }`}
                  left={(props) => (
                    <List.Icon {...props} icon="needle" color="#9C27B0" />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="delete"
                      color="red"
                      onPress={() => removerVacina(index)}
                    />
                  )}
                />
              )}
            />
          ) : (
            <Text style={styles.emptyText}>Nenhuma vacina cadastrada.</Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3E5F5', // Lilás claro
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A', // Roxo escuro
  },
  input: {
    marginBottom: 12,
    borderRadius: 12,
  },
  segmented: {
    marginBottom: 12,
  },
  petText: {
    fontSize: 16,
    marginBottom: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
  },
});
