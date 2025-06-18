import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Sobre o App" />
        <Card.Content>
          <Text>
            Este aplicativo foi desenvolvido para ajudar você a cuidar dos seus pets.
          </Text>
          <Text>Versão: 1.0.0</Text>
          <Text>Desenvolvido por: Raylanne Almeida </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
