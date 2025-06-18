import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export default function BirthdayScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="🎉 Aniversário dos Pets" />
        <Card.Content>
          <Text>Hoje é aniversário de:</Text>
          <Text>🐶 Rex - 5 anos!</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => alert('Compartilhar!')}>
            Compartilhar 🎂
          </Button>
        </Card.Actions>
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
