// Generated by https://quicktype.io

export interface MedicinaTermino {
    minConceptGroup: MinConceptGroup;
}

export interface MinConceptGroup {
    minConcept: MinConcept[];
}

export interface MinConcept {
    fullName: string;
    termType: TermType;
    rxcui:    string;
}

export enum TermType {
    Bpck = "BPCK",
    Gpck = "GPCK",
    Sbd = "SBD",
    Scd = "SCD",
}
