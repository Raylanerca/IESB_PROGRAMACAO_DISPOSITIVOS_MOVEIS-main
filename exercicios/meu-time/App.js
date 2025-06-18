// Imports
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

// Função que representa o componente
export default function App() {
  // Lógica do componente
  const nome = "Flamengo"

  function alerta() {
    alert("GOL DO MENGÃO!!!!!")
  }

  // retorno dessa função com o template do que vai ser
  // renderizado na tela (JSX)
  return (
    // ScrollView permite que o conteudo vá até depois da barra de rolagem
    // não pode ser usado sozinho, tem que ter uma View dentro
    // // ele só envolve o conteudo
    <ScrollView>
      <View style={styles.container}>
        {/* comentário dentro do JSX */}
        {/*  */}
        {/* <StatusBar style="auto" /> */}
        {/* css inline */}
        <Text style={{ fontSize: 50, fontStyle: 'italic' }} >Mengo</Text>

        {/* css com StyleSheet */}
        <Text style={styles.textGrande}>FLAMENGO</Text>

        <Text>{nome}</Text>
        <Button title='CLIQUE AQUI' onPress={alerta}></Button>
        {/* Imagem de fora com link */}
        
        {/* Imagem de dentro do projeto */}
        <Image
          source={require('./images/fla1.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        <Image
          source={require('.//images/fla2.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        <Image
          source={require('.//images/fla3.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        <Image
          source={require('.//images/fla4.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
         <Image
          source={require('.//images/fla5.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGrande: {
    fontSize: 40,
    fontWeight: 900
  }
});