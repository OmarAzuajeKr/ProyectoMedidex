import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View, FlatList, ScrollView, StyleSheet, Image} from 'react-native'
import { RootStackParams } from '../navigator/StackNavigator'
import { useQuery } from '@tanstack/react-query'
import { getPokemonById } from '../actions/medicinas/get-medicinas-by-id'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { Chip, Button } from 'react-native-paper'
//import FadeInImage from '../components/ui/FadeInImage'
import { Formatter } from '../helpers/formatter'
import { globalStyles } from '../themes/AppThemes'
import { Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../components/context/ThemeContext'


interface Props extends StackScreenProps<RootStackParams, 'MedicinasScreen'>{}


export const MedicinasScreen = ({navigation,route}:Props) => {

  const {isDark}=useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

const medicinasImg = isDark ? require('../Assets2/PastillaBlanca.png') : 
                             require('../Assets2/PastillaNegra.png');

  const handleGoBack = () => {
        navigation.goBack();
    };


const {PokemonId} = route.params;

const {isLoading, data: pokemon} = useQuery({
queryKey: ['pokemon', PokemonId],
queryFn: () => getPokemonById(PokemonId),
staleTime: 1000 * 60 * 60

})

if (!pokemon){
  return (
    <FullScreenLoader/>
  )
}

  return (
<ScrollView
      style={{flex: 1, backgroundColor: 'red'}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={medicinasImg} style={styles.pokeball} />

        <Image source={{uri:pokemon.avatar}} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="black"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <Image
            source={{uri:item}}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>

      <FlatList
        data={pokemon.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={{height: 100}} />
      <Button style={globalStyles.boton3} mode="contained" onPress={handleGoBack}>
                Volver
            </Button>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 950,
    height: 250,
    bottom: 20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  pastillaImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  }
  
});