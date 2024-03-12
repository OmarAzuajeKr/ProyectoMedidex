import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
//import { GEMINI_API_KEY } from "../constants";

const getGeminiModel = (): GenerativeModel => {
    try {
        const geminiApi = new GoogleGenerativeAI('AIzaSyDLhjtbv3jY17f22byWccqerfYTtYe_QPg')
        const geminiModel = geminiApi.getGenerativeModel({ model: 'gemini-pro' })

        return geminiModel
    } catch (e: any) {
        console.error(e)
    }
}

export default getGeminiModel