import { IMedicalRecord } from "../entities/medicalRecordEntity";

export interface IGetMedicalRecordsResponse {
    data: IMedicalRecord[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateMedicalRecordResponse {
    data: IMedicalRecord;
    metadata: {}
}

export interface IGetMedicalRecordPDFResponse {
    data: IMedicalRecord;
    metadata: {}
}