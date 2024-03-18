import { medicinasApi } from "../../api/medicinasApi";
import { Medicinas } from "../../domain/entities/medicinas";
import { MedicinasAPIPaginatedResponse, ConceptProperty } from "../../infraestructure/interfaces/medicinasInterfaces"
import { MedicinasMapper } from "../../infraestructure/mappers/medicinasMappers";

export const getMedicinasById = async(id:string):Promise<Medicinas> => {
 try{
    const {data} = await medicinasApi.get<MedicinasAPIPaginatedResponse>(`/REST/rxcui/${id}.json`)

    let medicinas: Medicinas | null = null;

    data.drugGroup.conceptGroup.forEach(group => {
        group.conceptProperties?.forEach(property => {
            if (property.rxcui === id) {
                medicinas = MedicinasMapper.medicinasToEntity(property);
            }
        });
    });

    if (!medicinas) {
        throw new Error('No se encontró el medicamento con el id proporcionado');
    }

    return medicinas;

 } catch (error) {
     throw new Error('Error en la petición')
 }
}
