import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'

const jogadores = [
  {
    nome: "Hugo Souza",
    numero: 22,
    imagem: "https://i.pinimg.com/736x/52/08/5c/52085c908d791f046dec2c1b3ed0a8bb.jpg"
  },
  {
    nome: "Félix Torres",
    numero: 2,
    imagem: "https://i.pinimg.com/736x/1e/ae/74/1eae74d2c2d52e72db8ffc13e1f69feb.jpg"
  },
  {
    nome: "Rodrigo Garro",
    numero: 23,
    imagem: "https://i.pinimg.com/736x/d9/f6/ca/d9f6ca001b22492c83b4daa62faf9c5f.jpg"
  },
  {
    nome: "Memphis Depay",
    numero: 10,
    imagem: "https://i.pinimg.com/736x/2b/8a/cf/2b8acffe3ad03586ed0fc7047a633e44.jpg"
  },
  {
    nome: "Yuri Alberto",
    numero: 22,
    imagem: "https://i.pinimg.com/736x/78/d7/f2/78d7f2cf6f71332d6dce4b2ba9d54f73.jpg"
  },
]

export default function JogadoresScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={jogadores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.numero}>Camisa: {item.numero}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: 100,
    height: 100
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  numero: {
    fontSize: 16,
    color: 'white'
  }
})