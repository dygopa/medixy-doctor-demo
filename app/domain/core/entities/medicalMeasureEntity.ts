import { IMedicalConsulty } from "./medicalConsultyEntity";

export interface IMedicalMeasureType {
    id: number;
    type: string;
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
}

export interface IMedicalMeasure {
    id: number;
    value: number;
    medicalMeasureTypeId: number;
    medicalMeasureType: IMedicalMeasureType;
    medicalConsultyId?: number | null;
    medicalConsulty?: IMedicalConsulty | null;
    patientId: number;
    createdOn: Date;
}
