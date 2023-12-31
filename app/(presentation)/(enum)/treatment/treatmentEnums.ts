export enum TreatmentViaDosisEnum {
    ORAL = 1,
    SUBLINGUAL = 2,
    TOPICA = 3,
    TRANSDERMIC = 4,
    OPHTHALMOLOGICAL = 5,
    INHALATION = 6,
    RECTAL = 7,
    VAGINAL = 8,
    PARENTAL = 9,
}

export enum TreatmentViaDosisTextEnum {
    ORAL = "Oral",
    SUBLINGUAL = "Sublingual",
    TOPICA = "Tópica",
    TRANSDERMIC = "Transdérmica",
    OPHTHALMOLOGICAL = "Oftalmológica",
    INHALATION = "Inhalatoria",
    RECTAL = "Rectal",
    VAGINAL = "Vaginal",
    PARENTAL = "Parental",
}

type TTreatmentViaDosisEnum = {
    [key: number]: string
}

export const treatmentViaDosisEnum: TTreatmentViaDosisEnum = {
    1: "Oral",
    2: "Sublingual",
    3: "Topica",
    4: "Transdermica",
    5: "Oftalmologica",
    6: "Inhalación",
    7: "Rectal",
    8: "Vaginal",
    9: "Parental",
}

export enum TreatmentDosisTypeEnum {
    CAPSULE = 1,
    JARABE = 2,
    POLVOS = 3,
    SUSPENTION = 4,
    COMPRIMITE = 5,
    GRANULATE = 6,
    EMULSION = 7,
    INYECTABLE = 8,
}

export enum TreatmentDosisTypeTextEnum {
    CAPSULE = "Cápsula",
    JARABE = "Jarabe",
    POLVOS = "Polvos",
    SUSPENTION = "Suspensión",
    COMPRIMITE = "Comprimidos",
    GRANULATE = "Granulados",
    EMULSION = "Emulsión",
    INYECTABLE = "Inyectable",
}


type TTreatmentDosisTypeEnum = {
    [key: number]: string
}

export const treatmentDosisTypeEnum: TTreatmentDosisTypeEnum = {
    1: "Capsula",
    2: "Jarabe",
    3: "Polvos",
    4: "Suspensión",
    5: "Comprimido",
    6: "Granulado",
    7: "Emulsión",
    8: "Inyectable",
}
