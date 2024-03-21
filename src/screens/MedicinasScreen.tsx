import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import { RootStackParams } from '../navigator/StackNavigator'
import { useQuery } from '@tanstack/react-query'
import { getMedicinasById } from '../actions/medicinas/get-medicinas-by-id'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { Chip, Button } from 'react-native-paper'
import { Formatter } from '../helpers/formatter'
import { globalStyles } from '../themes/AppThemes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../components/context/ThemeContext'
import { MedicinaFormatter } from '../infraestructure/mappers/medicinaFormatter'
import { FlatList } from 'react-native-gesture-handler'
import { PastillaBG } from '../components/ui/pastillaBG'

interface Props extends StackScreenProps<RootStackParams, 'MedicinasScreen'> { }

export const MedicinasScreen = ({ navigation, route }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };


  console.log('penis2');
  
  const { MedicinasId } = route.params;
  const { isLoading, isError, data: medicina } = useQuery({
    queryKey: ['Medicinas', MedicinasId],
    queryFn: () => getMedicinasById(MedicinasId),
    staleTime: 1000 * 60 * 60
  })

  console.log(medicina);

  if (isLoading) {
    return (
      <FullScreenLoader />
    )
  }

  if (isError || !medicina) {
    return (
      <Text>Error al cargar los datos de la medicina</Text>
    )
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'red' }}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre de la Medicina */}
        <Text
          style={{
            ...styles.medicinaName,
            top: top + 20,
          }}>
          {(medicina.displayName) + '\n'}#{medicina.rxcui}
        </Text>
        <Image source={require('../Assets2/PastillaBGNegra.png')} style={styles.pastillaImage} />
        <View style={{
          marginTop: 60,
        }}>
        {/* Nombre Generico */}
        <Text style={globalStyles.tituloMedicinas}>Nombre Generico</Text>
        <Text style={globalStyles.Texto}>
        { medicina.fullGenericName}
        </Text>
        {/* Nombre Completo*/}
        <Text style={globalStyles.tituloMedicinas}>Nombre Completo</Text>
        <Text style={globalStyles.Texto}>
        { medicina.fullName}
        </Text>
        {/* Identificacion */}
        <Text style={globalStyles.tituloMedicinas}>Identificacion Generica</Text>
        <Text style={globalStyles.Texto}>
        { medicina.genericRxcui}
        </Text>
        {/* Cantidad de dosis */}
        <Text style={globalStyles.tituloMedicinas}>Cantidad de Dosis</Text>
        <Text style={globalStyles.Texto}>
        { medicina.rxtermsDoseForm}
        </Text>
        {/*Sinonimo*/}
        <Text style={globalStyles.tituloMedicinas}>Sinonimo Medico</Text>
        <Text style={globalStyles.Texto}>
        { medicina.synonym }
        </Text>
        {/* Ruta */}
        <Text style={globalStyles.tituloMedicinas}>Ruta de administracion</Text>
        <Text style={globalStyles.Texto}>
        {medicina.route}
        </Text>
        {/*Tipo de Dosis*/}
        <Text style={globalStyles.tituloMedicinas}>Tipo de dosis</Text>
        <Text style={globalStyles.Texto}>
        {medicina.rxnormDoseForm}
        </Text>
        {/*Dosis*/}
        <Text style={globalStyles.tituloMedicinas}>Dosificacion</Text>
        <Text style={globalStyles.Texto}>
        {medicina.strength}
        </Text>
        {/*Tipo de termino*/}
        <Text style={globalStyles.tituloMedicinas}>Tipo de Termino</Text>
        <Text style={globalStyles.Texto}>
        {medicina.termType}
        </Text>
        </View>
      </View>
    

      <View style={{ height: 400 }} />
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
  medicinaName: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'flex-start',
    left: 20,
  },
  medicinaImage: {
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
    width: 440,
    height: 440,
    position: 'absolute',
    bottom: -40,
    opacity: 0.3,
  }

});