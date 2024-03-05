import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicinasScreen } from '../screens/MedicinasScreen';
import { AsistenteScreen } from '../screens/AsistenteScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { ChatAsistenteScreen } from '../screens/ChatAsistenteScreen';
import { features } from 'process';
import { Features } from '../components/asistente/features';

export type RootStackParams2 = {
  AsistenteScreen: undefined,
ChatAsistenteScreen: undefined
features: undefined
}


const Stack2 = createStackNavigator<RootStackParams2>();


export const StackNavigatorAsistente = () => {
  return (
    <Stack2.Navigator 
    
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
      <Stack2.Screen name="AsistenteScreen" component={AsistenteScreen} />
      <Stack2.Screen name="ChatAsistenteScreen" component={ChatAsistenteScreen} />
      <Stack2.Screen name="features" component={Features}/>
    </Stack2.Navigator>
  );}