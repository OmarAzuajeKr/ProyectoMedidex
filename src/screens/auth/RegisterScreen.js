import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../themes/AppThemes';
import  firebase  from '../../../bd/FireBase';
//import { db } from '../../../bd/FireBase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../bd/FireBase';




export const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [identification, setIdentification] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


  

    const handleGoBack = () => {
        navigation.goBack();
    };

    const saveNewUser = async () => {
      if (!name || !email || !password || !birthdate || !identification) {
        alert("Por favor rellene todos los campos");
      } else if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
      } else if (isNaN(identification)) {
        alert("Solo puede ingresar números en el campo Cedula");
      } else if (isNaN(Date.parse(birthdate))) {
        alert("Ingrese una fecha válida en el campo Fecha de Nacimiento");
      } else {
        try {
          // Registra al usuario con Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Almacena los datos adicionales del usuario en Firestore
          await setDoc(doc(FIREBASE_DB, "users", user.uid), {
            name,
            email,
            birthdate,
            identification
          });
    
          alert('Usuario creado correctamente');
          navigation.goBack();
        } catch (e) {
          console.error('Error al crear el usuario: ', e);
          if (e.code === 'auth/email-already-in-use') {
            alert('El correo electrónico ya está en uso');
          } else if (e.code === 'auth/invalid-email') {
            alert('El correo electrónico proporcionado no es válido');
          } else {
            alert('Error al crear el usuario');
          }
        }
      }
    }

      const handleRegister = () => {
        // Aquí puedes manejar la lógica de registro
        console.log(username);
      };

    return (
        <View style={{
            marginHorizontal: 20,
            marginVertical: 30,
            marginTop: '50%'
        }}>
<Text variant='displayMedium'>Registro</Text>
            <TextInput
                label="Nombre de usuario"
                value={name}
                onChangeText={text => setName(text)}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
          <TextInput
    label="Fecha de Nacimiento"
    value={birthdate}
    onChangeText={text => setBirthdate(text)}
    style={{backgroundColor: 'transparent'}}
    theme={{ colors: { primary: '#c1121f' } }}
    keyboardType="numeric" // Añade esta línea
/>
<TextInput
    label="Cedula"
    value={identification}
    onChangeText={text => setIdentification(text)}
    style={{backgroundColor: 'transparent'}}
    theme={{ colors: { primary: '#c1121f' } }}
    keyboardType="numeric" // Añade esta línea
/>
            <Button style={globalStyles.boton2} mode="contained" onPress={saveNewUser} >
                Registrarse
            </Button>
            <Button style={globalStyles.boton2} mode="contained" onPress={handleGoBack}>
                Volver
            </Button>
        </View>
    );
};