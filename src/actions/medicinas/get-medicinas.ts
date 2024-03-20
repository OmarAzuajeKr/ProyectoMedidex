import type { Medicinas2 } from "../../domain/entities/medicinas2";
import { medicinasApi } from "../../api/medicinasApi";
import { MedicinaTermino } from '../../infraestructure/interfaces/medicinaTerminoInterface';

export const getMedicinas = async(id:string):Promise<Medicinas2[]> => {
    try {
        const url = `https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json`
        const response = await medicinasApi.get<MedicinaTermino>(url);

        const medicinas: Medicinas2[] = response.data.minConceptGroup.minConcept.map(property => ({
            fullName: property.fullName,
            rxcui: property.rxcui,
            termType: property.termType,
        }));

        return medicinas;

    } catch (error) {
        console.log(error);
        throw new Error('Error nos se pudo obtener las medicinas')
    }
}