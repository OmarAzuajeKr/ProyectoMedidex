import 'react-native-gesture-handler';
import React from 'react'
//import { View, Text } from 'react-native'
//import { HomeScreen } from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
//import { StackNavigator } from './src/navigator/StackNavigator';
import { MenuLateral } from './src/navigator/MenuLateral';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
<NavigationContainer>
    <MenuLateral />
</NavigationContainer>
</QueryClientProvider>
  )
}

export default App;