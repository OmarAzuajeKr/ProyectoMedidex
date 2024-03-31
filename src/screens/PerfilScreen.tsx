import React, { useState, useCallback } from 'react';
import { View, Text, Image} from 'react-native';
import { globalStyles } from '../themes/AppThemes';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../bd/FireBase';
import { Button } from 'react-native-paper';
import { RootStackParams4 } from '../navigator/StackNavigatorPerfil';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

interface Props extends StackScreenProps<RootStackParams4, 'EditPerfilScreen'> {}

export const PerfilScreen = ({navigation}:Props) => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(FIREBASE_DB, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            console.log('No se encontro el documento!');
          }
        } else {
          setUser(null);
        }
      });
      setIsLoading(false);
      return unsubscribe;
    }, [])
  );

  return (
    <View style={{
      backgroundColor: '#FEFAE0',
      flex: 1,
    }}>
    <Image
    source={require('../Assets2/Medidex Icon.png')}
    style={{
      width: 200,
      height: 100,
      alignSelf: 'center',
      marginTop: 50,
      marginBottom: -70,
    }}resizeMode="center"
    />
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 100,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      marginLeft: 50,
      marginRight: 50,
    }}>
      {
        isLoading ? <Text>Cargando...</Text> :
          user ? (
            <>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10
              }}>Nombre de usuario:</Text><Text>{user.name}</Text>
              <Text style={{
                     fontSize: 20,
                     fontWeight: 'bold',
                     marginBottom: 10
              }}>Correo electrónico:</Text><Text>{user.email}</Text>
              <Text style={{
                     fontSize: 20,
                     fontWeight: 'bold',
                     marginBottom: 10
              }}>Fecha de nacimiento:</Text><Text>{user.birthdate.toDate().toLocaleDateString()}</Text>
              <Text style={{
                     fontSize: 20,
                     fontWeight: 'bold',
                     marginBottom: 10}}
              >Identificación:</Text><Text>{user.identification}</Text>
                <Button style={globalStyles.boton4} mode="contained" onPress={()=>{navigation.push('EditPerfilScreen')}}> Editar </Button>
            </>
          ) : (
            <Text>Cargando...</Text>
          )
      }
    </View>
    
    </View>
  );
};