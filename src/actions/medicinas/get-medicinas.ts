import type { Medicinas } from "../../domain/entities/medicinas";
import { medicinasApi } from "../../api/medicinasApi";
import type { MedicinasAPIPaginatedResponse, ConceptProperty } from '../../infraestructure/interfaces/medicinasInterfaces';
//import { PokemonMapper } from "../../infraestructure/mappers/medicinasMappers";

export const getMedicinas = async(page:number, limit:number = 20):Promise<Medicinas[]> => {
    try {
        const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=amlodipine`
        const response = await medicinasApi.get<MedicinasAPIPaginatedResponse>(url);

        const medicamentos: Medicinas[] = [];

        response.data.drugGroup.conceptGroup.forEach(group => {
            group.conceptProperties?.forEach(property => {
                const medicinas: Medicinas = {
                    rxcui: property.rxcui,
                    name: property.name,
                    synonym: property.synonym,
                    tty: property.tty,
                    language: property.language,
                    suppress: property.suppress,
                    umlscui: property.umlscui
                };
                medicamentos.push(medicinas);
            });
        });

        return medicamentos;

    } catch (error) {
        console.log(error);
        throw new Error('Error nos se pudo obtener las medicinas')
    }
}