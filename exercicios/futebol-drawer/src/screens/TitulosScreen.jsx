
import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

const titulos = [
  {
  nome: "Campeonato Brasileiro",
  anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020]
  },
  {
  nome: "Copa Libertadores da América",
  anos: [1981, 2019, 2022]
  },
  {
  nome: "Copa do Brasil",
  anos: [1990, 2006, 2013, 2022, 2024]
  },
  {
  nome: "Supercopa do Brasil",
  anos: [2020, 2021, 2025]
  }
  ];

  
export default function TitulosScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Títulos</Text>
      <FlatList
        data={titulos}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.nome} />
            <Card.Content>
              <Text>Anos: {item.anos.join(', ')}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );

}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
  title: { marginBottom: 16 }
});
