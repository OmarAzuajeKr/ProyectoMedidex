import { Medicinas } from '../../domain/entities/medicinas';
import { MedicinaR } from '../interfaces/interfacePrueba';
//import { ConceptProperty } from '../interfaces/medicinasInterfaces';


export class MedicinaFormatter{

    static medicinasToEntity (data:MedicinaR){
        return{
            displayName: data.rxtermsProperties.displayName,
            synonym: data.rxtermsProperties.synonym,
            fullName: data.rxtermsProperties.fullName,
            fullGenericName: data.rxtermsProperties.fullGenericName,
            strength: data.rxtermsProperties.strength,
            rxtermsDoseForm: data.rxtermsProperties.rxtermsDoseForm,
            route:  data.rxtermsProperties.route,
            termType: data.rxtermsProperties.termType,
            rxcui: data.rxtermsProperties.rxcui,
            genericRxcui: data.rxtermsProperties.genericRxcui,
            rxnormDoseForm: data.rxtermsProperties.rxnormDoseForm,
            suppress: data.rxtermsProperties.suppress
        };
    }
}

