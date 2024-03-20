import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '../themes/AppThemes';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../bd/FireBase';

export const PerfilScreen = () => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(FIREBASE_DB, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        setUser(null);
      }
    });
    setIsLoading(false);
    return unsubscribe;
  }, []);

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
              }}>Fecha de nacimiento:</Text><Text>{user.birthdate}</Text>
              <Text style={{
                     fontSize: 20,
                     fontWeight: 'bold',
                     marginBottom: 10}}
              >Identificación:</Text><Text>{user.identification}</Text>
            </>
          ) : (
            <Text>Cargando...</Text>
          )
      }
    </View>
    </View>
  );
};