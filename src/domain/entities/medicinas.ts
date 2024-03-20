//import { Suppress, TTY, Language } from "../../infraestructure/interfaces/medicinasInterfaces";


export interface Medicinas {
    displayName: string,
    synonym: string,
    fullName: string, 
    fullGenericName: string,
    strength: string,
    rxtermsDoseForm: string, 
    route: string, 
    termType: string,
    rxcui: string,
    genericRxcui: string,
    rxnormDoseForm: string,
    suppress: string, }