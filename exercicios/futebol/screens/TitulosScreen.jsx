import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const titulos = [
  {
    nome: "Campeonato Brasileiro",
    anos: [1990, 1998, 1999, 2005, 2011, 2015, 2017]
  },
  {
    nome: "Copa Libertadores da América",
    anos: [2012]
  },
  {
    nome: "Copa do Brasil",
    anos: [1995, 2002, 2009]
  },
  {
    nome: "Supercopa do Brasil",
    anos: [0]
  },
]

export default function TitulosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={titulos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.anos}>Anos: {item.anos.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10
  },
  card: {
    backgroundColor: 'gray',
    padding: 35,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center'
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  anos: {
    fontSize: 16,
    color: 'white'
  }
})