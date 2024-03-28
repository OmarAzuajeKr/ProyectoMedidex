import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { globalStyles } from '../../themes/AppThemes';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams3 } from '../../navigator/StackNavigatorLogin';

interface Props extends StackScreenProps<RootStackParams3, 'MenuLateral'> {}

export const RecoverPasswordScreen = ({navigation}:Props) => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Correo electrónico enviado.');
            })
            .catch((error) => {
                Alert.alert('Ocurrió un error:', error.message);
            });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Restablecer contraseña</Title>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                value={email}
            />
            <Button style={globalStyles.boton2} mode="contained" onPress={handlePasswordReset}>
                Restablecer contraseña
            </Button>
            <Button style={globalStyles.boton2} mode="contained" onPress={handleGoBack}>
                Volver
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FEFAE0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#c1121f',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
});