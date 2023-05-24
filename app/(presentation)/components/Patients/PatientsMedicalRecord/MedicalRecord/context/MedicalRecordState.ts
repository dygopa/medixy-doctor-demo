import { IPatient } from "domain/core/entities/patientEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalMeasureFailure } from "domain/core/failures/medicalMeasure/medicalMeasureFailure";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";

export interface IMedicalRecordState {
    patient: IGetPatientState;
    medicalMeasures: IGetMedicalMeasuresState;
    medicalConsulties: IGetMedicalConsultiesState;
}

interface IGetPatientState {
    data: IPatient | null;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null; 
}

interface IGetMedicalMeasuresState {
    data: IGetMedicalMeasuresResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalMeasureFailure | null; 
}

interface IGetMedicalConsultiesState {
    data: IGetMedicalConsultiesResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null; 
}

export const initialState: IMedicalRecordState = {
    patient: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    medicalMeasures: {
        data: {} as IGetMedicalMeasuresResponse,
        loading: false,
        successful: false,
        error: null,
    },
    medicalConsulties: {
        data: {} as IGetMedicalConsultiesResponse,
        loading: false,
        successful: false,
        error: null,
    },
}