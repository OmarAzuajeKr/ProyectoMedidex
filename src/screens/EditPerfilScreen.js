import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../bd/FireBase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { globalStyles } from '../themes/AppThemes';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';

export const EditPerfilScreen = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [identification, setIdentification] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

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
          if (userData.birthdate) {
            setBirthdate(userData.birthdate.toDate());
          }
          setIdentification(userData.identification);
        }
      }
    };
    loadUserData();
  }, []);

  const formatIdentification = (text) => {
    let formattedText = text.replace(/\D/g, '');
    formattedText = formattedText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setIdentification(formattedText);
  };

  const handleSave = async () => {
    let user = FIREBASE_AUTH.currentUser;
  
    if (!name || !birthdate || !identification) {
      alert("Por favor rellene todos los campos");
    } else if (isNaN(identification.replace(/\./g, ''))) {
      alert("Solo puede ingresar números en el campo Cedula");
    } else if (isNaN(Date.parse(birthdate))) {
      alert("Ingrese una fecha válida en el campo Fecha de Nacimiento");
    } else if (user) {
      setLoading(true); // Comienza la carga
      try {
        await updateProfile(user, {
          displayName: name,
        });
  
        // Guardar birthdate e identification en Firestore
        const userDoc = doc(FIREBASE_DB, 'users', user.uid);
        await setDoc(userDoc, {name, birthdate: Timestamp.fromDate(birthdate), identification }, { merge: true });
  
        Alert.alert('Perfil actualizado exitosamente');
        navigation.goBack();
      } catch (error) {
        console.error("Error al actualizar el perfil: ", error);
      } finally {
        setLoading(false); // Termina la carga
      }
    }
  };

  return (
    <View style={styles.container}>    
  
     <Title style={styles.title}>Editar Usuario</Title>

      <TextInput
        label='Nombre'
        value={name}
        onChangeText={setName}
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
          value={birthdate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || birthdate;
            setBirthdate(currentDate);
            setShowDatePicker(false);
          }}
        />
      )}
      <TextInput
        label='Identificación'
        value={identification}
        onChangeText={formatIdentification}
        style={{backgroundColor: 'transparent'}}
        theme={{ colors: { primary: '#c1121f' } }}
        keyboardType="numeric"
      />
      <Button style= {globalStyles.botonEdit} mode='contained' onPress={handleSave}>
        Actualizar
      </Button>
      <Button style= {globalStyles.botonEdit} mode='contained' onPress={() => navigation.goBack()}>Volver</Button>
      {loading && <ActivityIndicator size="large" color="red" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#FEFAE0',
      marginTop: 5,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },});