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
import { getAuth, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../bd/FireBase';
import { DrawerItem } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const auth = FIREBASE_AUTH;


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
        drawerInactiveTintColor: 'white', 
        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 100,
          paddingHorizontal: 20,
        }
      }}
    >
      <Drawer.Screen name="Inicio"  component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Asistente" component={StackNavigatorAsistente} />    


      
    </Drawer.Navigator>
  );
}


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      props.navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  }

return (
  <DrawerContentScrollView>
    <View style={{backgroundColor: '#c1121f', padding: 20}}>
      <Image
        source={require('../Assets2/Logotipo 2.png')}
        style={{width: 160, height: 160,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 30,
        }}
        resizeMode="center"
      />
    </View>
    <DrawerItemList {...props} />
    <DrawerItem label="Cerrar sesión" onPress={signOutUser} labelStyle={{color: 'white'}} />
  </DrawerContentScrollView>
)

}