import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../themes/AppThemes';

export const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setbirthdate] = useState('');
    const [identification, setIdentification] = useState('');

    const handleRegister = () => {
        // Aquí puedes manejar la lógica de registro
        console.log(username, email, password);
    };

    const handleGoBack = () => {
        navigation.goBack();
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
                value={username}
                onChangeText={setUsername}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
              <TextInput
                label="Fecha de Nacimiento"
                value={birthdate}
                onChangeText={setbirthdate}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
              <TextInput
                label="Cedula"
                value={identification}
                onChangeText={setIdentification}
                style={{backgroundColor: 'transparent'}}
                theme={{ colors: { primary: '#c1121f' } }}
            />
            <Button style={globalStyles.boton2} mode="contained" onPress={handleRegister} >
                Registrarse
            </Button>
            <Button style={globalStyles.boton2} mode="contained" onPress={handleGoBack}>
                Volver a Iniciar Sesión
            </Button>
        </View>
    );
};