import React, { useMemo } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '../themes/AppThemes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { Medicinas } from '../domain/entities/medicinas'
import { MedicinaCard } from '../components/medicinas/medicinasCard'
import { useQuery } from '@tanstack/react-query'
import { getMedicinaNamesWithId } from '../actions/medicinas/get-medicinas-with-name'
import { useState } from 'react'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { getMedicinasByIds } from '../actions/medicinas/get-medicinas-by-ids'
import { useDebouncedValue } from '../hooks/useDebounceValue'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/StackNavigator'

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const SearchScreen = ({navigation}:Props) => {

    const {top} = useSafeAreaInsets();
    const [term, setTerm] = useState('');
    const debonceValue = useDebouncedValue(term);
    
    const {isLoading, data:MedicinaNameList = []} = useQuery ({
        queryKey: ['medicinas', 'search'],        
        queryFn: () => getMedicinaNamesWithId(0),
        staleTime: 1000 * 60 * 5
    })
    
    console.log(MedicinaNameList);

    const MedicinaNameIdList = useMemo(() => {
        if(!isNaN(Number(debonceValue))){
            const medicina = MedicinaNameList.find(medicina => medicina.id.includes(debonceValue));
            return medicina? [medicina]: []
        }

        if (debonceValue.length === 0) return [];

        if (debonceValue.length < 3) return [];

        return MedicinaNameList.filter(medicina => medicina.name.toLowerCase().includes(debonceValue.toLowerCase()));

    }, [debonceValue])

    const {isLoading:isLoadingMedicinas, data:medicinas = []} = useQuery({
        queryKey: ['medicinas', 'by', MedicinaNameIdList],
        queryFn: () => getMedicinasByIds(MedicinaNameIdList.map (medicina => medicina.id)),
        staleTime: 1000 * 60 * 5,
        enabled: debonceValue.length >= 3
    })

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
            />

            {isLoadingMedicinas && (
                <ActivityIndicator style={{marginTop: 20}} size={50} color='red'/>
            )}

            <FlatList
                data={medicinas}
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