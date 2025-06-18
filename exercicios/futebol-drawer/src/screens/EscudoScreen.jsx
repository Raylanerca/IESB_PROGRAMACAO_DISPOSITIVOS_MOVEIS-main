import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

const time = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
  fundacao: "15 de novembro de 1895",
  estadio: "Maracanã",
  mascote: "Urubu",
  cores: ["Vermelho", "Preto"]
};

export default function EscudoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: time.escudo }} />
        <Card.Title title={time.nome} subtitle={`Fundado em ${time.fundacao}`} />
        <Card.Content>
          <Text>Estádio: {time.estadio}</Text>
          <Text>Mascote: {time.mascote}</Text>
          <Text>Cores: {time.cores.join(' e ')}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Elenco')}
        style={styles.button}
      >
        Ver Elenco
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Títulos')}
        style={styles.button}
      >
        Ver Títulos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 12,
  },
});