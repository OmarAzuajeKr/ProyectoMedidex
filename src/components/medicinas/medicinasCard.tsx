import React from 'react'
import { View, StyleSheet, Image, Pressable} from 'react-native';
//import { Pokemon } from '../../domain/entities/pokemon'
import { Card, Text } from 'react-native-paper'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';
//import { styles } from '../../themes/appThemes';



export const MedicinaCard = () => {

const navigation= useNavigation<NavigationProp<RootStackParams>>();



  return (
<Pressable
style={{flex:1}}
onPress={
  () => navigation.navigate('MedicinasScreen')
}
>
<Card>
   

{/* Imagen de la pokebola*/}

   {/* <View style={styles.pokeballContainer}>
    <Image source={require('../../assets/pokebola-blanca.png')} style={styles.pokeball} />        
    </View>

{/*Imagen del Pokemon*/}

    {/*<Image source={{uri: pokemon.avatar}} 
          style={styles.pokemonImage} />

{/* Tipos */}
{/*<Text style={[styles.name, {marginTop:35}]}>{pokemon.types[0]} </Text>*/}

</Card>
</Pressable>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      backgroundColor: '#c1121f',
      height: 120,
      flex: 0.5,
      marginBottom: 25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    name: {
      color: 'white',
      top: 10,
      left: 10,
    },
    pokeball: {
      width: 100,
      height: 100,
      right: -25,
      top: -25,
      opacity: 0.4,
    },
    pokemonImage: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: -25,
      top: 25,
    },
  
    pokeballContainer: {
      alignItems: 'flex-end',
      width: '100%',
      position: 'absolute',
  
      overflow: 'hidden',
      opacity: 0.5,
    },
  });