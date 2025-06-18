import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importa suas telas
import HomeScreen from '../screens/HomeScreen';
import PetsScreen from '../screens/PetsScreen';
import PetForm from '../screens/PetForm';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import BirthdayScreen from '../screens/BirthdayScreen';
import AboutScreen from '../screens/AboutScreen';
import NotificationTest from '../screens/NotificationTest'; // ✅ Importado

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tabs (aba inferior) — Home e Pets
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={PetsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer (menu lateral) — Tabs, Aniversário e Sobre
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Início" component={Tabs} />
      <Drawer.Screen name="Aniversário" component={BirthdayScreen} />
      <Drawer.Screen name="Sobre" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

// Navegação principal
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Drawer que contém Tabs, Aniversário e Sobre */}
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        {/* Telas fora do Drawer */}
        <Stack.Screen
          name="PetForm"
          component={PetForm}
          options={{ title: 'Cadastro de Pet' }}
        />
        <Stack.Screen
          name="PetDetails"
          component={PetDetailsScreen}
          options={{ title: 'Detalhes do Pet' }}
        />
        <Stack.Screen
          name="NotificationTest"
          component={NotificationTest}
          options={{ title: 'Testar Notificação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
