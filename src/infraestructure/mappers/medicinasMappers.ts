import { Medicinas } from '../../domain/entities/medicinas';
import { ConceptProperty } from '../interfaces/medicinasInterfaces';

export class MedicinasMapper{

    static medicinasToEntity (data:ConceptProperty):Medicinas{
        return{
            rxcui: data.rxcui,
            name: data.name,
            synonym: data.synonym,
            tty: data.tty,
            language: data.language,
            suppress: data.suppress,
            umlscui: data.umlscui
        };
    }
}