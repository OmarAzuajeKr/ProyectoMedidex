import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const translateText = async (text, to, from) => {
    const options = {
        baseURL: 'https://api.cognitive.microsofttranslator.com',
        url: '/translate',
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '29c79a326d294059a464d337997af8ad',
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            from,
            to
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    };

    try {
        const response = await axios.request(options);
        return response.data[0].translations[0].text;
    } catch (error) {
        console.error('Error during translation:', error);
    }
};

// Uso de la función
translateText('Hola mundo', 'en', 'es').then(translatedText => console.log(translatedText));
