import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

export default function MegaSenaScreen() {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  const gerarJogo = () => {
    const novoJogo = [];
    while (novoJogo.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!novoJogo.includes(numero)) {
        novoJogo.push(numero);
      }
    }
    novoJogo.sort((a, b) => a - b);
    setJogoGerado(novoJogo);
    setJogosMegaSena(prev => [novoJogo, ...prev]);
  };

  const resetarJogos = () => {
    setJogoGerado([]);
    setJogosMegaSena([]);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={gerarJogo}>
        Gerar Jogo
      </Button>

      <Button mode="outlined" onPress={resetarJogos} style={styles.resetBtn}>
        Resetar
      </Button>

      <Text style={styles.resultado}>
        Jogo Atual: {jogoGerado.length ? jogoGerado.join(' - ') : 'Nenhum'}
      </Text>

      <Text style={styles.titulo}>Histórico:</Text>
      <FlatList
        data={jogosMegaSena}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.join(' - ')}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  resultado: { marginVertical: 16, fontSize: 18 },
  titulo: { fontWeight: 'bold', marginTop: 16 },
  card: { marginVertical: 6 },
  resetBtn: { marginTop: 8 },
});