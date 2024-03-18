import axios from "axios";

export const medicinasApi = axios.create({
    baseURL: "https://rxnav.nlm.nih.gov/REST/drugs.json?name=amlodipine",
});

medicinasApi.get('/').then(response => {
    // La respuesta de la API estará disponible en response.data
    console.log(response.data);
}).catch(error => {
    // Aquí puedes manejar cualquier error que ocurra durante la solicitud
    console.error(error);
});