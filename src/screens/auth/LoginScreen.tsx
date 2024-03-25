import React, { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { TextInput, Button,Text } from 'react-native-paper';
import { globalStyles } from '../../themes/AppThemes';
import { StackScreenProps} from '@react-navigation/stack';
import { RootStackParams3 } from '../../navigator/StackNavigatorLogin';
import { FIREBASE_AUTH } from '../../../bd/FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";





interface Props extends StackScreenProps<RootStackParams3, 'MenuLateral'> {}

export const LoginScreen = ({navigation}:Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleLogin = () => {
      // Aquí puedes manejar la lógica de inicio de sesión
      console.log(email, password);
    };

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
    
        // Navega a la pantalla de inicio después de un inicio de sesión exitoso
        navigation.navigate('MenuLateral');
      } catch (error) {
        console.error('Error al iniciar sesión: ', error);
        if (error.code === 'auth/user-not-found') {
          alert('No existe una cuenta con este correo electrónico');
          console.log(error.code)
        } else if (error.code === 'auth/wrong-password') {
          alert('La contraseña es incorrecta');
          console.log(error.code)
        } else if (error.code === 'auth/invalid-email') {
          alert('El correo electrónico proporcionado no es válido');
          console.log(error.code)
        } else {
          alert('Credenciales inválidas');
          console.log(error.code)
        }
      } finally {
        setLoading(false);
      }
    }


  return (
    <View>
      <View>
<Image 
    source={require('../../Assets2/Logotipo 2.png')} 
    style={{
        width: 300,
        height: 270,
        alignSelf: 'center',
        marginTop: 50
    }} 
    resizeMode="center"
/>    
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        style={{backgroundColor: 'transparent',
        marginHorizontal: 30,
            marginVertical: -5,
      
      }}
        theme={{ colors: { primary: '#c1121f' } }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={{backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginVertical: 30,
      }}
        theme={{ colors: { primary: '#c1121f' } }}
      />
      {loading ? <ActivityIndicator animating={true} color='red' size='large' /> : null}
      </View>
      <Button style={globalStyles.boton3} mode="contained" onPress={signIn}>
        Iniciar sesión
      </Button>

      <Button style={globalStyles.boton3} mode="contained" onPress={()=>{navigation.push('RegisterScreen')}}>
        Registrarse
      </Button>
      <Text variant='labelMedium' style={{
        textAlign: 'center',
        marginVertical: 20,
        color: '#c1121f'
      }}>Copyright © 2023-2024 Unimar A.C
      </Text>

    </View>
  );
};