import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicinasScreen } from '../screens/MedicinasScreen';
import { AsistenteScreen } from '../screens/AsistenteScreen';
import { PerfilScreen } from '../screens/PerfilScreen';

export type RootStackParams = {
  HomeScreen: undefined,
  MedicinasScreen: undefined,
  AsistenteScreen: undefined,
  PerfilScreen: undefined;
}


const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {
  return (
    <Stack.Navigator 
    
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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MedicinasScreen" component={MedicinasScreen} />
      <Stack.Screen name="AsistenteScreen" component={AsistenteScreen} />
      <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
    </Stack.Navigator>
  );}