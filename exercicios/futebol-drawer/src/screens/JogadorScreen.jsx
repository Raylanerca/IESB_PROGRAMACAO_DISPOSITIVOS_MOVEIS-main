import { StyleSheet, FlatList, View, Image } from 'react-native'
import React from 'react'
import {Button, Text, Card} from 'react-native-paper'

const jogadores = [
{
nome: "Gabriel Barbosa",
numero: 9,
posicao: "Atacante",
idade: 27,
imagem: "https://i.pinimg.com/474x/1d/9f/5d/1d9f5de58831c9913f925a7155bdc7da.jpg"
},
{
nome: "Arrascaeta",
numero: 14,
posicao: "Meia",
idade: 29,
imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg"
},
{
nome: "Everton Ribeiro",
numero: 7,
posicao: "Meia",
idade: 33,
imagem: "https://i.pinimg.com/236x/39/1a/27/391a275fb7e0b018f2900f0f9fc9331b.jpg"
},
{
nome: "David Luiz",
numero: 23,
posicao: "Zagueiro",
idade: 35,
imagem: "https://i.pinimg.com/474x/98/79/9b/98799b86107a87b79dc9b15cf778fa4a.jpg"
},
{
nome: "Pedro",
numero: 21,
posicao: "Atacante",
idade: 26,
imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg"
}
];

export default function JogadorScreen({ navigation, route}) {
   return (
    <View style={styles.container}>
    <Text variant="titleLarge" style={styles.title}>Elenco</Text>

    <FlatList
      data={jogadores}
      keyExtractor={(item) => item.numero.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.imagem }} />
          <Card.Title title={item.nome} subtitle={`${item.posicao} • Nº ${item.numero}`} />
          <Card.Content>
            <Text>Idade: {item.idade} anos</Text>
          </Card.Content>
        </Card>
      )}
    />

    <Button
      mode='contained'
      onPress={() => navigation.openDrawer()}
      style={styles.button}
    >
      Abrir Drawer
    </Button>

    <Button
      mode='contained'
      onPress={() => {
        navigation.openDrawer();
        setTimeout(() => {
          navigation.closeDrawer();
        }, 3000);
      }}
    >
      Abrir Drawer e Fechar
    </Button>
  </View>
    )
    
  
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
  title: { marginBottom: 16 },
  button: { marginTop: 16 }
});