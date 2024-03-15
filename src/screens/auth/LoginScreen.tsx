import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button,Text } from 'react-native-paper';
import { globalStyles } from '../../themes/AppThemes';
import { StackScreenProps} from '@react-navigation/stack';
import { RootStackParams3 } from '../../navigator/StackNavigatorLogin';




interface Props extends StackScreenProps<RootStackParams3, 'MenuLateral'> {}

export const LoginScreen = ({navigation}:Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log(username, password);
  };

  

  return (
    <View>
      <View>
<Image 
    source={require('../../Assets2/Medidex Logo.png')} 
    style={{
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginTop: 50
    }} 
    resizeMode="center"
/>    
      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={{backgroundColor: 'transparent',
        marginHorizontal: 30,
            marginVertical: -5,
      
      }}
        theme={{ colors: { primary: '#c1121f' } }}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginVertical: 30,
      }}
        theme={{ colors: { primary: '#c1121f' } }}
      />
      </View>
      <Button style={globalStyles.boton3} mode="contained" onPress={()=>{navigation.push('MenuLateral')}}>
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