import React, { useContext } from 'react'
import { ImageStyle, StyleProp  } from 'react-native'
import { ViewStyle, Image } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

interface Props{
  style:StyleProp<ImageStyle>
}

export const PastillaBG = ({style}: Props) => {


const {isDark} = useContext(ThemeContext);

const medicinaImg = isDark
? require('../../Assets2/PastillaBlanca.png')
: require('../../Assets2/PastillaNegra.png')

  return (
    <Image
    source={medicinaImg}
    style={{
      ...style as any,
      width: 300,
      height: 500,
      opacity: 0.3,
      position: 'absolute',
      bottom: 400,
      right: -100
    }}
    />
  )
}
