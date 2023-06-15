import { IPatient } from "domain/core/entities/subjectEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { PatientFailure } from "domain/core/failures/subject/subjectFailure";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";

export interface IMedicalRecordCreateSummaryState {
    patient: IGetPatientState;
    createMedicalConsulty: ICreateMedicalConsultyState;
}

interface IGetPatientState {
    data: IPatient | null;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null; 
}

interface ICreateMedicalConsultyState {
    data: ICreateMedicalConsultyResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null;
}

export const initialState: IMedicalRecordCreateSummaryState = {
    patient: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    createMedicalConsulty: {
        data: {} as ICreateMedicalConsultyResponse,
        loading: false,
        successful: false,
        error: null,
    },
}