import { medicinasApi } from "../../api/medicinasApi";
import { MedicinasAPIPaginatedResponse, ConceptProperty } from "../../infraestructure/interfaces/medicinasInterfaces";

export const getMedicinaNamesWithId = async (limit: number = 150) => {

    const url = `medicina?limit=1000`; //url de la api
    const { data } = await medicinasApi.get<MedicinasAPIPaginatedResponse>(url); //peticion get a la api

    // Asegúrate de que la estructura de los datos coincide con la estructura de la API
    const medicinas: ConceptProperty[] = data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []);

    return medicinas.map((medicina) => ({
        id: medicina.rxcui,
        name: medicina.name,
    }));
}