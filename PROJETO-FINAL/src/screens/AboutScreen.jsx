import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';

// Importa a foto local da Belinha
import belinhaImg from '../../assets/belinha.jpg'; // ajuste o caminho conforme a estrutura do seu projeto

const screenWidth = Dimensions.get('window').width;

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={belinhaImg}
        style={styles.foto}
        resizeMode="contain"
      />

      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="📱 Sobre o App"
          titleStyle={styles.title}
        />
        <Card.Content>
          <Text style={styles.text}>
            Este aplicativo foi desenvolvido para ajudar você a cuidar melhor dos seus pets,
            organizando vacinas, aniversários e informações importantes com carinho.{'\n\n'}
            Ele foi inspirado na minha cachorrinha Belinha, que é uma grande companheira e fonte de alegria!
          </Text>

          <Text style={styles.info}>Versão: <Text style={styles.bold}>1.0.0</Text></Text>
          <Text style={styles.info}>Desenvolvido por: <Text style={styles.bold}>Raylanne Almeida</Text></Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBD6FB',
    padding: 16,
    alignItems: 'center',
  },
  foto: {
    width: screenWidth - 32,
    height: 250,
    marginBottom: 24,
    borderRadius: 16,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4A148C',
  },
  bold: {
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
});
