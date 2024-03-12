import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '../themes/AppThemes';

export const PerfilScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log(username, password);
  };

  return (
    <View>
      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin}>
        Iniciar sesión
      </Button>
    </View>
  );
};