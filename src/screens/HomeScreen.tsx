import React from 'react'
import { Image, View , FlatList} from 'react-native'
import { ActivityIndicator, Button, Text, } from 'react-native-paper';
import { useQuery,useInfiniteQuery } from '@tanstack/react-query';
import { getMedicinas } from '../actions/medicinas/get-medicinas';
import { PastillaBG } from '../components/ui/pastillaBG';
import { StyleSheet } from 'react-native';
import { Medicinas } from '../domain/entities/medicinas';
import { globalTheme } from '../themes/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MedicinaCard } from '../components/medicinas/medicinasCard';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { globalStyles } from '../themes/AppThemes';
import { FAB } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}


export const HomeScreen = ({navigation}:Props) => {

  const {top} = useSafeAreaInsets();

const {isLoading, data, fetchNextPage} = useInfiniteQuery({
   queryKey: ['medicinas', 'infinite'],
   initialPageParam: 0,
   queryFn: (params) => getMedicinas(params.pageParam),
   getNextPageParam: (lastPage, pages) => pages.length,
 staleTime: 1000 * 60 * 60,}
 )


  return (
    <View style={globalTheme.globalMargin}>
 <PastillaBG style={styles.imgPosition}/>

 <FlatList
 data={data?.pages.flat()??[] }
 keyExtractor={(medicina, index) => `${medicina.rxcui}-${index}`}
 numColumns={2}
 style={{paddingTop: top + 20}}
 ListHeaderComponent={()=>(
  <Text variant='displayMedium'>Medicinas</Text>
 )}
  renderItem={({item})=> <MedicinaCard medicina={item}/>}
  onEndReachedThreshold={0.6}
  onEndReached={()=> fetchNextPage()}
  showsVerticalScrollIndicator={false}
 />


<FAB
label='Buscar'
style={globalStyles.Fab}
mode='elevated'
color='white'
icon='magnify'
onPress={()=>{navigation.push('SearchScreen')}}
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