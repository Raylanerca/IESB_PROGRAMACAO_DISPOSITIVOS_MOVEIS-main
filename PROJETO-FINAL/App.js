import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigation, { navigationRef } from './src/navigation/MainNavigation';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

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
        Alert.alert('Permissão para notificações foi negada.');
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

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Navega para BirthdayScreen quando a notificação for clicada
      if (navigationRef.current) {
        navigationRef.current.navigate('BirthdayScreen');
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}
