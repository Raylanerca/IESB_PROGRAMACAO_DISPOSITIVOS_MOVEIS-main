import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Card } from 'react-native-paper'
import Jogador from "./Jogador"

export default function Time(props) {

  const { nome, anoFundacao, mascote, imagem, jogadores } = props

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={nome} />
      <Card.Content>
        <Text>Ano de Fundação: {anoFundacao}</Text>
      </Card.Content>
      <Card.Content>
        <Text>Mascote:{mascote}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: imagem }} />
      <Card.Actions>
        <FlatList
          horizontal
          data={jogadores}
          renderItem={({ item }) => (
            <Jogador
              nome={item.nome}
              numero={item.numero}
              imagem={item.imagem}
            />
          )}
        />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({})