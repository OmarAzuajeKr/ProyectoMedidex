import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


export const FullScreenLoader = () => {
  return (
<View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
}}>

<ActivityIndicator animating={true} color='red' size={50} />


</View>
  )
}
