import { info } from "console";
import { medicinasApi } from "../../api/medicinasApi";
import { MedicinaR } from "../../infraestructure/interfaces/interfacePrueba";
import { MedicinaTermino, MinConcept, MinConceptGroup } from '../../infraestructure/interfaces/medicinaTerminoInterface';

export const getMedicinaNamesWithId = async (limit: number = 150) => {
    const url = `https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json`; //url de la api
    const { data } = await medicinasApi.get<MedicinaTermino>(url); //peticion get a la api


return data.minConceptGroup.minConcept.map((info)=>({
    rxcui: info.rxcui,
    fullName: info.fullName
}
))

}

    // Mapea los datos para que cada objeto tenga las propiedades 'id' y 'name'
  /*   const medicinas = data.map(medicina => ({
        id: medicina.rxcui,
        name: medicina.fullName,
    }));

    return medicinas; */
