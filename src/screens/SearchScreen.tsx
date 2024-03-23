import React, { useMemo } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '../themes/AppThemes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput } from 'react-native-paper'
//import { Medicinas } from '../domain/entities/medicinas'
import { MedicinaCard } from '../components/medicinas/medicinasCard'
import { useQuery } from '@tanstack/react-query'
import { getMedicinaNamesWithId } from '../actions/medicinas/get-medicinas-with-name'
import { useState } from 'react'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { getMedicinasByIds } from '../actions/medicinas/get-medicinas-by-ids'
import { useDebouncedValue } from '../hooks/useDebounceValue'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/StackNavigator'
import { Medicinas2 } from '../domain/entities/medicinas2'
//import { getMedicinaNamesWithIdTwo } from '../actions/medicinas/get-medicinas-with-name-'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMedicinas } from '../actions/medicinas/get-medicinas'

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const SearchScreen = ({navigation}:Props) => {

    const {top} = useSafeAreaInsets();
    const [term, setTerm] = useState('');
    const debonceValue = useDebouncedValue(term);
    
    const {isLoading, data:MedicinaNameList = []} = useInfiniteQuery({
        queryKey: ['medicinas', 'infinite'],
        initialPageParam: 0,
        queryFn: (params) => getMedicinas(params.pageParam.toString()),
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 5
    })

    const MedicinaNameIdList = useMemo(() => {
        if (debonceValue.length === 0) return MedicinaNameList.pages.flat() ?? [];

        if (debonceValue.length < 3) return [];

        return MedicinaNameList.pages.flat().filter(medicina => 
            medicina.fullName.toLowerCase().includes(debonceValue.toLowerCase())) ?? [];

    }, [debonceValue, MedicinaNameList])

    if (isLoading){
        return (
            <FullScreenLoader/>
        )
    }

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
                theme={{ colors: { primary: '#c1121f' } }}
            />

            <FlatList
                data={MedicinaNameIdList}
                keyExtractor={(medicina,index) => `${medicina.rxcui}-${index}`}
                numColumns={2}
                style={{paddingTop: top + 20}}
                renderItem={({item})=> <MedicinaCard medicina={item}/>}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{height: 120}}/>}
            />
            <TouchableOpacity style={globalStyles.boton2} onPress={() => {navigation.navigate('HomeScreen')}}>
                <Text style={globalStyles.Texto}>
                    Volver
                </Text>
            </TouchableOpacity>
        </View>
    )
}