export enum OrdersTypesEnum {
    Laboratory = "Laboratorio",
    Diagnosis = "Estudios diagnósticos",
    Specialty = "Especialista",
    Justificative = "Justificante médico",
    Certificate = "Certificado médico",
    Hospitalitation = "Hospitalización",
    Opening = "Abierta",
}

type TOrdersTypeNumberEnum = {
    [key: number]: string
}

export const ordersTypeNumberEnum: TOrdersTypeNumberEnum = {
    1: "Laboratorio",
    2: "Estudios diagnósticos",
    3: "Especialista (interconsulta)",
    4: "Justificante médico",
    5: "Certificado médico",
    6: "Hospitalización",
    7: "Abierta",
}

type TOrdersTypeNumberEnEnum = {
    [key: number]: string
}

export const ordersTypeNumberEnEnum: TOrdersTypeNumberEnEnum = {
    1: "laboratory",
    2: "diagnosis",
    3: "specialty",
    4: "justificative",
    5: "certificate",
    6: "hospitalitation",
    7: "opening",
}

type TOrdersTypeEnToEsEnum = {
    [key: string]: string
}

export const ordersTypeEnToEsEnEnum: TOrdersTypeEnToEsEnum = {
    "laboratory": "Laboratorio",
    "diagnosis": "Estudios diagnósticos",
    "specialty": "Especialista",
    "justificative": "Justificante médico",
    "certificate": "Certificado médico",
    "hospitalitation": "Hospitalización",
    "opening": "Abierta",
}

type TOrdersTypeEnToNumberEnum = {
    [key: string]: number
}

export const ordersTypeEnToNumberEnum: TOrdersTypeEnToNumberEnum = {
    "laboratory": 1,
    "diagnosis": 2,
    "specialty": 3,
    "justificative": 4,
    "certificate": 5,
    "hospitalitation": 6,
    "opening": 7,
}