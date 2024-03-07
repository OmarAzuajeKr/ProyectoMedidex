import React, { useMemo } from 'react'
import { View, FlatList, Button, Touchable, TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '../themes/AppThemes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput } from 'react-native-paper'
//import { Pokemon } from '../domain/entities/medicinas'
import { PokemonCard } from '../components/medicinas/medicinasCard'
import { useQuery } from '@tanstack/react-query'
import { getPokemonNamesWithId } from '../actions/medicinas/get-medicinas-with-name'
import { useState } from 'react'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { getPokemonByIds } from '../actions/medicinas/get-medicinas-by-ids'
import { useDebouncedValue } from '../hooks/useDebounceValue'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/StackNavigator'


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}


export const SearchScreen = ({navigation}:Props) => {

const {top} = useSafeAreaInsets();
const [term, setTerm] = useState('');
const debonceValue = useDebouncedValue(term);

const {isLoading, data:PokemonNameList = []} = useQuery ({
    queryKey: ['medicinas', 'search'],
    queryFn: () => getPokemonNamesWithId(0),
    staleTime: 1000 * 60 * 5
})

//Apliacar Debouncer

const PokemonNameIdList = useMemo(() => {
    if(!isNaN(Number(debonceValue))){
        const pokemon = PokemonNameList.find(pokemon => pokemon.id === Number(debonceValue));
        return pokemon? [pokemon]: []
    }

    if (debonceValue.length === 0) return [];

    if (debonceValue.length < 3) return [];

    return PokemonNameList.filter(pokemon => pokemon.name.includes(debonceValue.toLocaleLowerCase()));

}, [debonceValue]) // Added an empty array as the second argument to useMemo


const {isLoading:isLoadingPokemons, data:pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', PokemonNameIdList],
    queryFn: () => getPokemonByIds(PokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
    enabled: debonceValue.length >= 3
})



if (isLoading){
    return (
<FullScreenLoader/>
    )}



  return (
    <View style={[globalStyles.globalMargin, {paddingTop: top + 10}]}>
<TextInput
placeholder='Buscar Medicina'
mode='flat'
autoFocus
autoCorrect={false}
onChangeText={setTerm}
value={term}
style={{backgroundColor: 'transparent'}}
/>

{isLoadingPokemons && (
<ActivityIndicator style={{marginTop: 20}} size={50} color='red'/>
) }



<FlatList
 data={pokemons}
 keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
 numColumns={2}
 style={{paddingTop: top + 20}}
  renderItem={({item})=> <PokemonCard pokemon={item}/>}
  showsVerticalScrollIndicator={false}
  ListFooterComponent={<View style={{height: 120}}/>}
 />
 <TouchableOpacity style={globalStyles.boton2}     onPress={() => {navigation.navigate('HomeScreen')}}>
    <Text style={globalStyles.Texto}>
        Volver
    </Text>
 </TouchableOpacity>
    </View>
  )
}
