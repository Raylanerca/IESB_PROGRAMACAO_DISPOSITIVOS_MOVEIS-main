import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export default function App() {
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Permissão para notificações foi negada.');
        return;
      }
    };

    pedirPermissao();

    // Configura o comportamento das notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}
