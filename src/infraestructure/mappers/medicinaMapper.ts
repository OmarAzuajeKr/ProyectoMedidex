import { Medicinas2 } from "../../domain/entities/medicinas2";
import { TermType, MinConcept } from '../interfaces/medicinaTerminoInterface';

export class MedicinaMapper{

    static medicinasToEntityTwo (data:Medicinas2){
        return{
          fullname: data.fullName,
          rxcui: data.rxcui,
          termType: data.termType
        };
    }
}
