import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { MenuLateral } from './MenuLateral';
import { RecoverPasswordScreen } from '../screens/auth/RecoverPasswordScreen';

export type RootStackParams3 = {
  LoginScreen: undefined,
  RecoverPasswordScreen: undefined,
  RegisterScreen: undefined;
  MenuLateral: undefined;

}


const Stack = createStackNavigator<RootStackParams3>();


export const StackNavigator3 = () => {
  return (
    <Stack.Navigator 
    
    screenOptions={{
        headerShown: false,
        headerStyle:{
            elevation:0,
            shadowColor:'transparent',
            backgroundColor: '#c1121f'
        },
        cardStyle:{
            backgroundColor: "#FEFAE0"
        }
    }}
    
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} />
      <Stack.Screen name="MenuLateral" component={MenuLateral} />
    </Stack.Navigator>
  );}