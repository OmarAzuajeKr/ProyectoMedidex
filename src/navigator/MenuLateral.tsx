import { DrawerContent, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { StackNavigator } from './StackNavigator';
import { AsistenteScreen } from '../screens/AsistenteScreen';
import { ConfiguracionScreen } from '../screens/ConfiguracionScreen';
import { View, Image } from 'react-native';
import { StackNavigatorAsistente } from './StackNavigatorAsistente';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { StackNavigator3 } from './StackNavigatorLogin';
import { ListaUsuariosScreen } from '../screens/ListaUsuariosScreen';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  return (
    <Drawer.Navigator

drawerContent={(props) => <CustomDrawerContent {...props}/>}



      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: '#c1121f',
        },
        drawerStyle: {
          backgroundColor: '#c1121f',
          width: 240,
        },
        headerTintColor: 'white',
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#c1121f',
        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 100,
          paddingHorizontal: 20,
        }
      }}
    >
      <Drawer.Screen name="Inicio" component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Asistente" component={StackNavigatorAsistente} />
      <Drawer.Screen name="Configuracion" component={ConfiguracionScreen} />
      <Drawer.Screen name="Lista de Usuarios" component={ListaUsuariosScreen} />


      
    </Drawer.Navigator>
  );
}


const CustomDrawerContent = (props: DrawerContentComponentProps) => {

return (
  <DrawerContentScrollView>
    <View style={{
    height: 200,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 100
    }}>

    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
)

}