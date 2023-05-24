import { PatientFailure } from "domain/core/failures/patient/patientFailure";

export interface ICreatePatientState {
    createPatient: IPatientCreatePatientState;
}

interface IPatientCreatePatientState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null;
}

export const initialState: ICreatePatientState = {
    createPatient: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    }
}