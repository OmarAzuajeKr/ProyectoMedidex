import React from 'react'
import { View, StyleSheet, Image, Pressable} from 'react-native';
import { Pokemon } from '../../domain/entities/medicinas'
import { Card, Text } from 'react-native-paper'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';

//import { styles } from '../../themes/appThemes';


interface Props {
    pokemon: Pokemon
}

export const PokemonCard = ({pokemon}:Props) => {

const navigation= useNavigation<NavigationProp<RootStackParams>>();



  return (
<Pressable
style={{flex:1}}
onPress={
  () => navigation.navigate('MedicinasScreen',{PokemonId:pokemon.id})
}
>
<Card style={[styles.cardContainer,]}>
    <Text style={styles.name} variant='bodyLarge' lineBreakMode='middle'>
        {pokemon.name}
        {'\n#' + pokemon.id}
    </Text>

{/* Imagen de la pokebola*/}

    <View style={styles.pokeballContainer}>
    <Image source={require('../../Assets2/PastillaBlanca.png')} style={styles.pokeball} />        
    </View>

{/*Imagen del Pokemon*/}

    <Image source={{uri: pokemon.avatar}} 
          style={styles.pokemonImage} />

{/* Tipos */}
<Text style={[styles.name, {marginTop:35}]}>{pokemon.types[0]} </Text>

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
      width: 300,
      height: 300,
      right: -100,
      top: -100,
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