import { IPatient } from "domain/core/entities/patientEntity";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";

export interface IMedicalRecordState {
    patient: IGetPatientState;
}

interface IGetPatientState {
    data: IPatient | null;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null; 
}

export const initialState: IMedicalRecordState = {
    patient: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
}