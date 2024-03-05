import React from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { styles } from '../themes/AppThemes'


interface Props extends StackScreenProps<any, any> {}

export const AsistenteScreen = ({navigation}:Props) => {
  return (
 <View style={styles.globalMargin}>
    <Text style={styles.title2}>
        Bienvenido a nuestro asistente Virtual!
    </Text>
    <Text style={styles.title3}>
      Te presentamos a Mediscul, nuestro asistente virtual quien te asistira en todas tus necesides
    </Text>
    <View style={{
        alignItems: 'center',
        marginTop: 20
    }}>
    <Image
    source={require('../Assets2/mascota.png')}
    style={styles.avatar}
/>
</View>
<TouchableOpacity 
    style={styles.boton2}
    onPress={() => {navigation.navigate('ChatAsistenteScreen')
    }}
>
    <Text style={{
        fontSize: 20,
        color: 'white'
    }}>
        Comenzar
    </Text>
</TouchableOpacity>
 </View>
  )
}
