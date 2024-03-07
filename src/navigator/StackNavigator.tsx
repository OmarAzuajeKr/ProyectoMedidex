import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicinasScreen } from '../screens/MedicinasScreen';
import { AsistenteScreen } from '../screens/AsistenteScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { SearchScreen } from '../screens/SearchScreen';

export type RootStackParams = {
  HomeScreen: undefined,
  MedicinasScreen: {PokemonId:number} ,
  AsistenteScreen: undefined,
  PerfilScreen: undefined;
  SearchScreen: undefined;

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
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );}