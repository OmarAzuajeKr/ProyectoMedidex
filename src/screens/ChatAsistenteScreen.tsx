import React, { useEffect } from 'react'
import { useState } from 'react'
import { View , Text, Image, Button, TouchableOpacity} from 'react-native'
import { styles } from '../themes/AppThemes'
import { Features } from '../components/asistente/features'
import { StackScreenProps } from '@react-navigation/stack'
import { dummyMessage } from '../actions'
import { ScrollView } from 'react-native-gesture-handler'
import Voice from '@react-native-community/voice';



interface Props extends StackScreenProps<any, any> {}


export const ChatAsistenteScreen = ({navigation}:Props) => {

const [messages, setMessages] = useState(dummyMessage);
const [recording, setRecording] = useState(false);

const [speaking, setSpeaking] = useState(false);
const [results, setResults] = useState('');

const clear = () => {setMessages([]);}
const stopSpeaking = () => {setSpeaking(false);}

const speechStartHandler = (e: any) => {
console.log('Speech start handler');
}
const speechEndHandler = (e: any) => {
  setRecording(false);
  console.log('speech end handler');
  }

  const speechResultsHandler = (e: any) => {
    console.log('voice event:', e);
    const text = e.value[0];
    setResults(text);
  }

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('es-ES');
    } catch (error) {
      console.log ('Error:', error);
    }
  
  }
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      //fecha de la grabación
    } catch (error) {
      console.log ('Error:', error);
    }
  
  }
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;

    return() => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
    
  }, [])

  console.log('results:', results);


  return (
    <View>
      <View style={styles.avatarContainer}>
      <Image
    source={require('../Assets2/mascota.png')}
    style={styles.avatar}/>
    </View>

{/*Mensajes*/}
{
  messages.length>0?(
    <View style={styles.containerMensajes}>
      <Text style={styles.titleX}>
        Asistente
      </Text>
      <View style={styles.containerCompleto}>
        <ScrollView>
        {
  messages.map((message, index) => {
    if (message.role == 'assistant') {
      if (message.content.includes('https')) {
        return(
          <View key={index}>
        <View style={styles.containerMensajes3}>
          <Image
          source={{uri: message.content}}
          style={styles.avatar}
          />

        </View>
        </View>
        )
      } else {
        // Y aquí también
        return(
          <View key={index} style={styles.containerMensajes3}>
              <Text style={styles.subtitle}>
                {message.content}
             </Text>
         </View>
        )
      }
    } else {        
      return (
        <View key={index} style={styles.containerMensajes}>
            <View style={styles.containerMensajes2}>
                <Text style={styles.subtitle}>
                  {message.content}
               </Text>
           </View>
        </View>
      )
           }
  })
       }
        </ScrollView>

      </View>

    </View>
  ):(
    <Features/>
  )
}
{/*Buttoms*/}
<View style={styles.IconContainer}>
  {
    recording?(
      <TouchableOpacity onPress={stopRecording}>
        {/*Grabacion*/}
  <Image
    source={require('../Assets2/MicrofonoBlanco.png')}
    style={styles.Icon}
    />
    
  </TouchableOpacity>
    ):(
<TouchableOpacity onPress={startRecording}>
  {/*Inicio de la grabacion*/}
  <Image
    source={require('../Assets2/Microfono.png')}
    style={styles.Icon}
    />
    
  </TouchableOpacity>
    )
  }
  {
    messages.length>0&&(
      <TouchableOpacity 
      onPress={clear}
      >
<Text style={styles.subtitle}>
  Clear
</Text>
      </TouchableOpacity>
    )
  } 
  {
    speaking &&(
      <TouchableOpacity 
      onPress={stopSpeaking}
      >
<Text style={styles.subtitle}>
  Stop
</Text>
      </TouchableOpacity>
    )
  }
</View>


{/*<Button
title="Fatures"
onPress={()=>{navigation.navigate('features')}}

/>*/}

    </View>
  )
}
