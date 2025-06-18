import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Bem-vindo ao App de Pets!" />
        <Card.Content>
          <Text>Gerencie seus pets, vacinas e acompanhe os aniversários!</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Pets')}>Ver Pets</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 8,
  },
});
