import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../themes/AppThemes'

export const Features = () => {
  return (
    <View>
        <Text style={styles.features}>Features</Text>
        <View style={styles.FondoCuadrado}>
            <Text style={styles.Texto}> ChatGPT </Text>
        <View>
            <Text style={styles.Texto}> CHATGPT ES UNA GENIAL </Text>
        </View>
        </View>
        <View style={styles.FondoCuadrado}>
        <Text style={styles.Texto}> DallE </Text>
        <View>
        <Text style={styles.Texto}> CHATGPT ES UNA GENIAL </Text>
        </View>
        </View>
        <View style={styles.FondoCuadrado}>
        <Text style={styles.Texto}> SmartIA </Text>
        <View>
        <Text style={styles.Texto}> CHATGPT ES  GENIAL </Text>
        </View>
        </View>
    </View>
  )
}
