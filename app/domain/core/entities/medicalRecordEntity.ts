import { IMedicalConsulty } from "./medicalConsultyEntity";
import { IPatient } from "./patientEntity";

export interface IMedicalRecordType {
    id: number;
    name: string;
}

export interface IMedicalRecordValueType {
    id: number;
    name: string;
    dataType: string;
    medicalRecordTypeId: number;
    medicalRecordType: IMedicalRecordType;
}

export interface IMedicalRecord {
    id: number;
    medicalRecordTypeId: number;
    medicalRecordType: IMedicalRecordType;
    medicalRecordValues: IMedicalRecordValue[];
    medicalConsultyId: number;
    medicalConsulty: IMedicalConsulty;
    patientId: number;
    patient: IPatient;
}

export interface IMedicalRecordValue {
    id: number;
    value: string;
    numberValue?: number | null;
    dateValue?: number | null;
    medicalRecordValueTypeId: number;
    medicalRecordValueType: IMedicalRecordValueType;
    medicalRecordId: number;
    medicalRecord: IMedicalRecord;
}