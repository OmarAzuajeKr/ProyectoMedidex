import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { View , Text, Image, Button, TouchableOpacity} from 'react-native'
import Voice from '@react-native-community/voice';

import { globalStyles } from '../themes/AppThemes'
import { Features } from '../components/asistente/features'
import { dummyMessage } from '../actions'
import getGeminiModel from '../api/GeminiApi';
import { ChatSession, GenerativeModel } from '@google/generative-ai';

interface Props extends StackScreenProps<any, any> {}

export const ChatAsistenteScreen = ({navigation}:Props) => {

const [messages, setMessages] = useState<any[]>(dummyMessage);
const [recording, setRecording] = useState<boolean>(false);

const [speaking, setSpeaking] = useState<boolean>(false);
const [results, setResults] = useState<string>('');

const model = getGeminiModel()
const chat = useRef<ChatSession>()

const clear = () => {setMessages([]);}
const stopSpeaking = () => {setSpeaking(false);}

const speechStartHandler = (e) => {
console.log('Speech start handler');
}
const speechEndHandler = (e: any) => {
  setRecording(false);
  console.log('speech end handler');
  }

  const speechResultsHandler = (e) => {
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
      <View style={globalStyles.avatarContainer}>
      <Image
    source={require('../Assets2/mascota.png')}
    style={globalStyles.avatar}/>
    </View>

{/*Mensajes*/}
{
  messages.length>0?(
    <View style={globalStyles.containerMensajes}>
      <Text style={globalStyles.titleX}>
        Asistente
      </Text>
      <View style={globalStyles.containerCompleto}>
        <ScrollView>
        {
  messages.map((message, index) => {
    if (message.role == 'assistant') {
      if (message.content.includes('https')) {
        return(
          <View key={index}>
        <View style={globalStyles.containerMensajes3}>
          <Image
          source={{uri: message.content}}
          style={globalStyles.avatar}
          />

        </View>
        </View>
        )
      } else {
        // Y aquí también
        return(
          <View key={index} style={globalStyles.containerMensajes3}>
              <Text style={globalStyles.subtitle}>
                {message.content}
             </Text>
         </View>
        )
      }
    } else {        
      return (
        <View key={index} style={globalStyles.containerMensajes}>
            <View style={globalStyles.containerMensajes2}>
                <Text style={globalStyles.subtitle}>
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

<View style={globalStyles.IconContainer}>
  {
    recording?(
      <TouchableOpacity onPress={stopRecording}>
      
  <Image
    source={require('../Assets2/MicrofonoBlanco.png')}
    style={globalStyles.Icon}
    />
    
  </TouchableOpacity>
    ):(
<TouchableOpacity onPress={startRecording}>
 
  <Image
    source={require('../Assets2/Microfono.png')}
    style={globalStyles.Icon}
    />
    
  </TouchableOpacity>
    )
  }
  {
    messages.length>0&&(
      <TouchableOpacity 
      onPress={clear}
      >
<Text style={globalStyles.subtitle}>
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
<Text style={globalStyles.subtitle}>
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
