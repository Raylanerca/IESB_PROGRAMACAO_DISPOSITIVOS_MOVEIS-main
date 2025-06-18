import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import EscudoScreen from '../screens/EscudoScreen'
import JogadorScreen from '../screens/JogadorScreen'
import TitulosScreen from '../screens/TitulosScreen'



import { createDrawerNavigator } from '@react-navigation/drawer'


const Drawer = createDrawerNavigator()


export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen 
      name='EscudoScreen' 
      component={EscudoScreen}
      options={{
        title: 'Inicio',
        drawerIcon: ({color, size}) => <Ionicons name='nome' color={color} size={size}/>
      }}
      />

      <Drawer.Screen 
      name='JogadorScreen' 
      component={JogadorScreen}
      options={{ 

      }}
      />

      <Drawer.Screen 
      name='TitulosScreen' 
      component={TitulosScreen}
      options={{

      }}
      />

    </Drawer.Navigator>
  )
}