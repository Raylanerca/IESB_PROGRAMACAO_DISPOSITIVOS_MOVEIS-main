import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EscudoScreen from './src/screens/EscudoScreen';
import JogadorScreen from './src/screens/JogadorScreen';
import TitulosScreen from './src/screens/TitulosScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Início">
          <Drawer.Screen
            name="Início"
            component={EscudoScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="shield" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="Elenco"
            component={JogadorScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="account-group" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="Títulos"
            component={TitulosScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="trophy" color={color} size={size} />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}