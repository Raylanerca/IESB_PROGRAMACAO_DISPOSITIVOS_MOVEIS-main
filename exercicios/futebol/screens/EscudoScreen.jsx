import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const time = {
  nome: "Corinthians",
  escudo: "https://i.pinimg.com/736x/75/c8/35/75c835a44ecb992523167373ff664789.jpg",
}

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{time.nome}</Text>
      <Image source={{ uri: time.escudo }} style={styles.escudo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 20
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  escudo: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})