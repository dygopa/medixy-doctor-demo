import { IPatient } from "domain/core/entities/subjectEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalMeasureFailure } from "domain/core/failures/medicalMeasure/medicalMeasureFailure";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";

export interface IMedicalRecordState {
    patient: IGetPatientState;
    medicalMeasures: IGetMedicalMeasuresState;
    medicalConsulties: IGetMedicalConsultiesState;
    treatments: IGetTreatmentsState;
    allergies: IGetAllergiesState;
    medicalRecords: IGetMedicalRecordsState;
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

interface IGetTreatmentsState {
    data: IGetTreatmentsResponse;
    loading: boolean;
    successful: boolean;
    error: TreatmentFailure | null; 
}

interface IGetAllergiesState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
}

interface IGetMedicalRecordsState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
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
    treatments: {
        data: {} as IGetTreatmentsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    allergies: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    medicalRecords: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
}