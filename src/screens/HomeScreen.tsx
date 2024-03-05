

import React from 'react'
import { Image, View , FlatList} from 'react-native'
import { ActivityIndicator, Button, Text, Props } from 'react-native-paper';
import { useQuery,useInfiniteQuery } from '@tanstack/react-query';
import { getPokemons } from '../actions/medicinas/get-medicinas';
import { PastillaBG } from '../components/ui/pastillaBG';
import { StyleSheet } from 'react-native';
import { Pokemon } from '../domain/entities/medicinas';
import { globalTheme } from '../themes/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/medicinas/medicinasCard';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
//import { styles } from '../themes/appThemes';


export const HomeScreen = () => {

  const {top} = useSafeAreaInsets();

// Esta es ala forma tradicional de una peticion http

// const {isLoading, data:pokemons = []} = useQuery({
  // queryKey: ['pokemons'],
  // queryFn: () => getPokemons(0),
  // staleTime: 1000 * 60 * 5,
// })

const {isLoading, data, fetchNextPage} = useInfiniteQuery({
   queryKey: ['pokemons', 'infinite'],
   initialPageParam: 0,
   queryFn: (params) => getPokemons(params.pageParam),
   getNextPageParam: (lastPage, pages) => pages.length,
 staleTime: 1000 * 60 * 60,}
 )


  return (
    <View style={globalTheme.globalMargin}>
 <PastillaBG style={styles.imgPosition}/>

 <FlatList
 data={data?.pages.flat()??[] }
 keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
 numColumns={2}
 style={{paddingTop: top + 20}}
 ListHeaderComponent={()=>(
  <Text variant='displayMedium'>Medicinas</Text>
 )}
  renderItem={({item})=> <PokemonCard pokemon={item}/>}
  onEndReachedThreshold={0.6}
  onEndReached={()=> fetchNextPage()}
  showsVerticalScrollIndicator={false}
 />
    </View>
  )
}



const styles = StyleSheet.create({
    imgPosition:{
      justifyContent: 'center',
      alignItems: 'center'
    }
})