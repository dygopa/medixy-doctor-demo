import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";

export interface IMedicalRecordSummaryState {
    getTreatmentPDF: IGetTratmentPDFState;
    getMedicalConsultyPDF: IGetMedicalConsultyPDFState;
    getMedicalRecordPDF: IGetMedicalRecordPDFState;
    getMedicalConsultyById: IGetMedicalConsultyByIdState;
}

interface IGetTratmentPDFState {
    loading: boolean;
    successful: boolean;
    error: TreatmentFailure | null;
}

interface IGetMedicalConsultyPDFState {
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null;
}

interface IGetMedicalRecordPDFState {
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null;
}

interface IGetMedicalConsultyByIdState {
    data: IMedicalConsulty;
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null; 
}

export const initialState: IMedicalRecordSummaryState = {
    getTreatmentPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    getMedicalConsultyPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    getMedicalRecordPDF: {
        loading: false,
        successful: false,
        error: null,
    },
    getMedicalConsultyById: {
        data: {} as IMedicalConsulty,
        loading: false,
        successful: false,
        error: null,
    },
}