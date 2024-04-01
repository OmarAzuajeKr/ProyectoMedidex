import {  DrawerContent, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { View, Image } from 'react-native';
import { StackNavigatorAsistente } from './StackNavigatorAsistente';
import { getAuth, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../bd/FireBase';
import { DrawerItem } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../bd/FireBase';
import { useEffect, useState, useCallback} from 'react';
import { StackNavigatorPerfil } from './StackNavigatorPerfil';
import { onSnapshot } from 'firebase/firestore';






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
<Drawer.Screen 
  name="Inicio"  
  component={StackNavigator} 
  options={{
    drawerIcon: ({focused, size}) => (
      <Image 
        source={focused ? require('../Assets2/homeIconFocused.png') : require('../Assets2/homeIcon.png')}
        style={{ width: 30, height: 40, marginLeft:-20, marginRight:-20 }} 
      />
    ),
  }}
/>
<Drawer.Screen 
    name="Perfil" 
    component={StackNavigatorPerfil} 
    options={{
        drawerIcon: ({focused, size}) => (
            <Image 
        source={focused ? require('../Assets2/PersonIconFocused.png') : require('../Assets2/PersonIcon.png')}
                style={{ width: 30, height: 40, marginLeft:-20, marginRight:-20 }} 
            />
        ),
    }}
/>
<Drawer.Screen 
    name="Asistente" 
    component={StackNavigatorAsistente}  
    options={{
        drawerIcon: ({focused, size}) => (
            <Image 
        source={focused ? require('../Assets2/AssitsIconFocused.png') : require('../Assets2/AssitsIcon.png')}
                style={{ width: 30, height: 40, marginLeft:-20, marginRight:-20 }} 
            />
        ),
    }}
/> 


      
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(FIREBASE_DB, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            console.log('No such document!');
          }
        });

        // Devuelve una función de limpieza que desuscribe el snapshot al desmontar
        return unsubscribeSnapshot;
      }
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // Navega al usuario a la pantalla de inicio de sesión después de cerrar la sesión
      props.navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  return (
    <DrawerContentScrollView>
      <View style={{flex:1}}>
        <View style={{backgroundColor: '#c1121f', padding: 20}}>
          <Image
            source={require('../Assets2/Logotipo 2.png')}
            style={{width: 160, height: 160,
            backgroundColor: 'white',
            borderRadius: 20,
            marginLeft: 20,
            }}
            resizeMode="center"
          />
          {userData && <Text style={{color: 'white',
            fontSize: 20,
            marginLeft: 20,
            marginTop: 10,
          }}>Bienvenid@, {userData.name}</Text>}
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Cerrar sesión"
            onPress={signOutUser}
            labelStyle={{color: 'white', marginLeft:10}}
            style={{marginBottom: 60, marginTop: 280, marginLeft: 10, backgroundColor: '#c1121f'}}
            icon={({focused, size}) => (
              <Image 
                source={focused ? require('../Assets2/OutIconFocused.png') : require('../Assets2/OutIcon.png')}
                style={{ width: 50, height: 40, marginLeft:-10, marginRight:-50 }} 
              />
            )}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  )

}