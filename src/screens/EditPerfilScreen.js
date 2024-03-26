import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../bd/FireBase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { globalStyles } from '../themes/AppThemes';
import { useNavigation } from '@react-navigation/native';

export const EditPerfilScreen = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [identification, setIdentification] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      let user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDoc = doc(FIREBASE_DB, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name);
          setBirthdate(userData.birthdate);
          setIdentification(userData.identification);
        }
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    let user = FIREBASE_AUTH.currentUser;

    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
        });

        // Guardar birthdate e identification en Firestore
        const userDoc = doc(FIREBASE_DB, 'users', user.uid);
        await setDoc(userDoc, {name, birthdate, identification }, { merge: true });

        Alert.alert('Perfil actualizado exitosamente');
        navigation.goBack();
      } catch (error) {
        console.error("Error al actualizar el perfil: ", error);
      }
    }
  };

  return (
    <View style={{
    marginHorizontal: 20,
    marginVertical: 30,
    marginTop: '50%'
  }}>
      <TextInput
        label='Nombre'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label='Fecha de nacimiento'
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        label='Identificación'
        value={identification}
        onChangeText={setIdentification}
      />
      <Button style= {globalStyles.boton4} mode='contained' onPress={handleSave}>
        Actualizar
      </Button>
    </View>
  );
};