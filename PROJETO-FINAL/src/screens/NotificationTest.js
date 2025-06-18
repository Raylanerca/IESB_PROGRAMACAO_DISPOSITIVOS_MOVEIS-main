import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

export default function NotificationTest() {
  const agendarNotificacao = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🐶 Lembrete!',
        body: 'Essa é uma notificação de teste do seu app Pet.',
      },
      trigger: {
        seconds: 30, // envia após 30 segundos
      },
    });
    alert('Notificação agendada para daqui a 30 segundos!');
  };

  return (
    <View style={styles.container}>
      <Text>Pressione o botão para testar uma notificação:</Text>
      <Button mode="contained" onPress={agendarNotificacao} style={{ marginTop: 16 }}>
        Testar Notificação
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
