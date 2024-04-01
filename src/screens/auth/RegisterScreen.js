import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../themes/AppThemes';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../bd/FireBase';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';




export const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [identification, setIdentification] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const auth = FIREBASE_AUTH;


  

    const handleGoBack = () => {
        navigation.goBack();
    };

    const saveNewUser = async () => {
      setLoading(true); // Comienza la carga
      if (!name || !email || !password || !birthdate || !identification) {
        alert("Por favor rellene todos los campos");
      } else if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
      } else if (isNaN(identification.replace(/\./g, ''))) {
        alert("Solo puede ingresar números en el campo Cedula");
      } else if (isNaN(Date.parse(birthdate))) {
        alert("Ingrese una fecha válida en el campo Fecha de Nacimiento");
      } else {
        try {
          // Registra al usuario con Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Envía un correo de verificación al usuario
          await sendEmailVerification(user);

          // Almacena los datos adicionales del usuario en Firestore
          await setDoc(doc(FIREBASE_DB, "users", user.uid), {
            name,
            email,
            birthdate,
            identification
          });

          alert('Usuario creado correctamente. Por favor verifica tu correo electrónico.');
          navigation.goBack();
        } catch (e) {
          console.error('Error al crear el usuario: ', e);
          if (e.code === 'auth/email-already-in-use') {
            alert('El correo electrónico ya está en uso');
          } else if (e.code === 'auth/invalid-email') {
            alert('El correo electrónico proporcionado no es válido');
          } else if (e.code === 'auth/user-not-found') {
            alert('El correo electrónico no existe');
          } else {
            alert('Error al crear el usuario');
          }
        } finally {
          setLoading(false); // Termina la carga
        }
      }
    }
    const formatIdentification = (text) => {
      let formattedText = text.replace(/\D/g, '');
      formattedText = formattedText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setIdentification(formattedText);
    };
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
          {loading && <ActivityIndicator size="large" color="#c1121f" />}
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
            <TouchableOpacity style={{
              backgroundColor: '#c1121f',
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 5,
              alignItems: 'center'
            }} onPress={() => setShowDatePicker(true)}>
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold'
              }}>Seleccionar fecha de nacimiento</Text>
            </TouchableOpacity>
            {birthdate && (
              <Text>Fecha de nacimiento seleccionada: {birthdate.toLocaleDateString()}</Text>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={birthdate || new Date()} // Usa new Date() como valor predeterminado si birthdate es null
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || birthdate;
                  setBirthdate(currentDate);
                  setShowDatePicker(false); // Oculta el DateTimePicker después de seleccionar una fecha
                }}
                style={{backgroundColor: 'transparent'}} // Estiliza el DateTimePicker
                theme={{ colors: { primary: '#c1121f' } }} // Estiliza el DateTimePicker
              />
            )}
  <TextInput
    label="Cedula"
    value={identification}
    onChangeText={formatIdentification}
    style={{backgroundColor: 'transparent'}}
    theme={{ colors: { primary: '#c1121f' } }}
    keyboardType="numeric"
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