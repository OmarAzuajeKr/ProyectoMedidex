import axios from 'axios';
import { apiKey } from '../actions'; // Asegúrate de que la ruta al archivo index.ts es correcta

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

// Luego puedes usar `instance` para hacer tus peticiones
const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions'

export const apiCall = async (prompt, messages) => {
    try{
        const res = await instance.post(chatGptEndPoint, {
            model: "gpt-3.5-turbo",
            // POsible error copiar similar al video
            messages:[
                {
                  role: "system",
                  content: "You are a helpful assistant."
                },
                {
                  role: "user",
                  content: "Hello!"
                }
              ]
        })
        console.log('data:', res.data)

    }catch(error){
        console.log('Error en la petición de OpenAI', error)
        return Promise.resolve({success: false, msg:error.message})
    }
}