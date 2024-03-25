import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AsistenteScreen } from '../screens/AsistenteScreen';
//import { PerfilScreen } from '../screens/PerfilScreen';
import { ChatAsistenteScreen } from '../screens/ChatAsistenteScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { EditPerfilScreen } from '../screens/EditPerfilScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { StackNavigator3 } from './StackNavigatorLogin';


export type RootStackParams4 = {
  PerfilScreen: undefined,
EditPerfilScreen: undefined
StackNavigator3: undefined
}


const Stack4 = createStackNavigator<RootStackParams4>();


export const StackNavigatorPerfil = () => {
  return (
    <Stack4.Navigator 
    
    screenOptions={{
        headerShown: false,
        headerStyle:{
            elevation:0,
            shadowColor:'transparent',
            backgroundColor: '#EF233C'
        },
        cardStyle:{
            backgroundColor: "#FEFAE0"
        }
    }}
    
    >
      <Stack4.Screen name="PerfilScreen" component={PerfilScreen} />
      <Stack4.Screen name="EditPerfilScreen" component={EditPerfilScreen} />
      <Stack4.Screen name="StackNavigator3" component={StackNavigator3} />
    </Stack4.Navigator>
  );}