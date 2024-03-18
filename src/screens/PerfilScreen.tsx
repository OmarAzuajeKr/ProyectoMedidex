import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '../themes/AppThemes';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../bd/FireBase';

export const PerfilScreen = () => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
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

    return unsubscribe;
  }, []);

  return (
    <View>
      {user ? (
        <>
          <Text>Nombre de usuario: {user.name}</Text>
          <Text>Correo electrónico: {user.email}</Text>
          <Text>Fecha de nacimiento: {user.birthdate}</Text>
          <Text>Identificación: {user.identification}</Text>
        </>
      ) : (
        <Text>No hay usuario autenticado</Text>
      )}
    </View>
  );
};