import { Suppress, TTY, Language } from "../../infraestructure/interfaces/medicinasInterfaces";


export interface Medicinas {
    rxcui:    string;
    name:     string;
    synonym:  string;
    tty:      TTY;
    language: Language;
    suppress: Suppress;
    umlscui:  string;
}