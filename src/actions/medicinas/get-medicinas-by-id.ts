import { log } from "console";
import { medicinasApi } from "../../api/medicinasApi";
import { Medicinas } from "../../domain/entities/medicinas";
//import { MedicinasAPIPaginatedResponse, ConceptProperty } from "../../infraestructure/interfaces/medicinasInterfaces"
import { MedicinaFormatter} from "../../infraestructure/mappers/medicinaFormatter";
import { MedicinaR } from "../../infraestructure/interfaces/interfacePrueba";

export const getMedicinasById = async(id:string):Promise<Medicinas> => {
 try{
        
        const url = `https://rxnav.nlm.nih.gov/REST/RxTerms/rxcui/${id}/allinfo.json`
        const {data} = await medicinasApi.get<MedicinaR>(url, {
                headers: {
                    Accept: '*/*',
                },
            });

        let medicinas: Medicinas | null = MedicinaFormatter.medicinasToEntity(data);

        if (!medicinas) {
                throw new Error('No se encontró el medicamento con el id proporcionado');
        }

        return medicinas;

 } catch (error) {
         throw new Error('Error en la petición')
 }
}