import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
//import { View, Text } from 'react-native'
//import { HomeScreen } from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
//import { StackNavigator } from './src/navigator/StackNavigator';
import { MenuLateral } from './src/navigator/MenuLateral';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { apiCall } from './src/api/openIA';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StackNavigator3 } from './src/navigator/StackNavigatorLogin';


const queryClient = new QueryClient()


export const App = () => {


  return (
    <QueryClientProvider client={queryClient}>
<NavigationContainer>
    <StackNavigator3/>
</NavigationContainer>
</QueryClientProvider>
  )
}

export default App;