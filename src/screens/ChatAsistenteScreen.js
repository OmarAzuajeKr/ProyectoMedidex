import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {View,Text,TextInput,FlatList,StyleSheet,ActivityIndicator,TouchableOpacity} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "../themes/AppThemes";
import { Image } from "react-native";
import Voice from '@react-native-community/voice';


export const ChatAsistenteScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyDLhjtbv3jY17f22byWccqerfYTtYe_QPg";

/*   useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setUserInput(e.value[0]);
  };

  const toggleSpeech = async () => {
    if (isSpeaking) {
      await Voice.stop();
    } else {
      await Voice.start('es-ES');
    }
    setIsSpeaking(!isSpeaking);
  };
 */
  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "Te llamas EsculAPI. Eres un asistente experto en medicina. Extrictamente vas a responder preguntas sobre medicina y farmacologia general. Vas a comenzar las conversaciones diciendo Hola soy EsculAPI, en que puedo ayudarte?. Una vez que termine la respuesta, recuerdale al usuario que solo es una asesoria y lo ideal siempre es consultar con un especialista.";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    const newMessages = messages;
    newMessages.push(userMessage);
    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    newMessages.push({ text, user: false })
    setMessages(newMessages);
    setLoading(false);
    setUserInput("");

    /* if (text) {
      Speech.speak(text);
    } */
    console.log(messages,2);
  };



  const renderMessage = ({ item }) => (
    <View style={[globalStyles.messageContainer, item.user ? globalStyles.userMessageContainer : globalStyles.aiMessageContainer]}>
       {!item.user && <Image source={require('../Assets2/mascota.png')} style={globalStyles.aiImage}  resizeMode="center" />}
      
      <Text style={[globalStyles.messageText, item.user && globalStyles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container4}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.text}
      />
      <View style={globalStyles.inputContainer}>
        {/* microphone icon */}
        <TouchableOpacity style={globalStyles.micIcon}>
          <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Escribe un mensaje..."
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={globalStyles.input}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={globalStyles.sendIcon} onPress={sendMessage}> 
          <FontAwesome
            name="send"
            size={24}
            color="black"
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 50,
              padding: 10,
              marginLeft: 5,
            }}></FontAwesome>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="small" color="black" />}
      </View>
    </View>
  );
};


  