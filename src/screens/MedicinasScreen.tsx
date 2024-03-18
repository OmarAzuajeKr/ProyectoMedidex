import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParams } from '../navigator/StackNavigator'
import { useQuery } from '@tanstack/react-query'
import { getMedicinasById } from '../actions/medicinas/get-medicinas-by-id'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { Chip, Button, Text } from 'react-native-paper'
import { Formatter } from '../helpers/formatter'
import { globalStyles } from '../themes/AppThemes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../components/context/ThemeContext'
import { MedicinasMapper } from '../infraestructure/mappers/medicinasMappers'

interface Props extends StackScreenProps<RootStackParams, 'MedicinasScreen'> { }

export const MedicinasScreen = ({ navigation, route }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const { MedicinasId } = route.params;

  const { isLoading, data: medicinaData } = useQuery({
    queryKey: ['Medicina', MedicinasId],
    queryFn: () => getMedicinasById(MedicinasId),
    staleTime: 1000 * 60 * 60
  })

  if (isLoading || !medicinaData) {
    return (
      <FullScreenLoader />
    )
  }

  const medicina = MedicinasMapper.medicinasToEntity(medicinaData);

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
            top: top + 5,
          }}>
          {Formatter.capitalize(medicina.name) + '\n'}#{medicina.rxcui}
        </Text>
      </View>

{/* Sinonimos de la medicina*/}
<View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
  {medicina.synonym && medicina.synonym.split(',').map((type: string) => (
    <Chip
      key={type.trim()}
      mode="outlined"
      selectedColor="black"
      style={{ marginLeft: 10 }}>
      {type.trim()}
    </Chip>
  ))}
</View>

      <View style={{ height: 100 }} />
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
    fontSize: 40,
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
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  }

});