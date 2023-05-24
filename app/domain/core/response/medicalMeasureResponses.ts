import { IMedicalMeasure } from "../entities/medicalMeasureEntity";

export interface IGetMedicalMeasuresResponse {
    data: IMedicalMeasure[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateMedicalMeasureResponse {
    data: IMedicalMeasure;
    metadata: {}
}
