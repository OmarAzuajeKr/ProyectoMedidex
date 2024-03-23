import { log } from "console";
import { medicinasApi } from "../../api/medicinasApi";
import { Medicinas2 } from "../../domain/entities/medicinas2";
import { MedicinaFormatter} from "../../infraestructure/mappers/medicinaFormatter";
import { MedicinaR } from "../../infraestructure/interfaces/interfacePrueba";
import { MedicinaTermino, MinConcept } from "../../infraestructure/interfaces/medicinaTerminoInterface";
import { MedicinaMapper } from "../../infraestructure/mappers/medicinaMapper";

export const getMedicinasByIdTwo = async ():Promise<Medicinas2> => {
 try{
    
    const url = `https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json`
    const {data} = await medicinasApi.get<MinConcept>(url, {
        headers: {
            Accept: '*/*',
        },
        });

    let medicinasTwo: Medicinas2 | null = MedicinaMapper.medicinasToEntityTwo(data);

    if (!medicinasTwo) {
        throw new Error('No se pudo mapear los datos de medicamentos');
    }

    return medicinasTwo;

 } catch (error) {
     throw new Error('Error en la petición')
 }
}