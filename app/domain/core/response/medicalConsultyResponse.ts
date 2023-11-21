import { IMedicalConsulty, IMedicalConsultyImage } from "../entities/medicalConsultyEntity";

export interface IGetMedicalConsultiesResponse {
    data: IMedicalConsulty[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateMedicalConsultyResponse {
    data: IMedicalConsulty;
    metadata: {}
}

export interface IUpdateMedicalConsultyResponse {
    data: IMedicalConsulty;
    metadata: {}
}

export interface IGetMedicalConsultyPDFResponse {
    data: IMedicalConsulty;
    metadata: { }
}

export interface ICreateMedicalConsultyImageResponse {
    data: IMedicalConsultyImage;
    metadata: {}
}
