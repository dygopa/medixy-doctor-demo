import { IMedicalConsulty } from "./medicalConsultyEntity";
import { ISubject } from "./subjectEntity";

export interface IMedicalRecordCategory {
    id: number;
    name: string;
}

export interface IMedicalRecordType {
    id: number;
    name: string;
    medicalRecordCategoryId: number;
    medicalRecordCategory: IMedicalRecordCategory;
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
    subjectId: number;
    subject: ISubject;
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