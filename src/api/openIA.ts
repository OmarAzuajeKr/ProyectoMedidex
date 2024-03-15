// Importamos la biblioteca axios para realizar solicitudes HTTP
import axios from 'axios';

// Importamos la clave de API de OpenAI desde un módulo de constantes
import { GEMINI_API_KEY } from '../constants';

// Creamos una instancia de axios con una configuración predeterminada
const instance = axios.create({
  // Establecemos la URL base de la API de OpenAI
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    // Añadimos la clave de API de OpenAI al encabezado de autorización
    'Authorization': `Bearer ${GEMINI_API_KEY}`,
    // Indicamos que los datos enviados y recibidos están en formato JSON
    'Content-Type': 'application/json'
  }
});

// Definimos la URL del punto final de la API de OpenAI para completar chats
const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions'

// Exportamos una función asíncrona llamada apiCall
export const apiCall = async (prompt: string, messages: Array<{role: string, content: string}>) => {
    try{
        // Realizamos una solicitud POST al punto final de chat de OpenAI
        const res = await instance.post(chatGptEndPoint, {
            // Especificamos el modelo de OpenAI a utilizar
            model: "gpt-3.5-turbo",
            // Enviamos los mensajes anteriores y el nuevo mensaje del usuario
            messages: [
                // Añadimos todos los mensajes anteriores
                ...messages,
                {
                  // Añadimos el nuevo mensaje del usuario
                  role: "user",
                  content: prompt
                }
              ]
        })
        // Imprimimos la respuesta de la API de OpenAI
        console.log('data:', res.data)

    }catch(error){
        // Imprimimos el error si la solicitud falla
        console.log('Error en la petición de OpenAI', error)
        // Devolvemos una promesa que se resuelve con un objeto que indica que la solicitud no tuvo éxito y contiene el mensaje de error
        return Promise.resolve({success: false, msg:error.message})
    }
}