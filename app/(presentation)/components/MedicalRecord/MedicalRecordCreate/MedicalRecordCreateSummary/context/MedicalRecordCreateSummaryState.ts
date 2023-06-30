import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";

export interface IMedicalRecordCreateSummaryState {
    subject: IGetSubjectState;
    appointment: IGetAppointmentState;
    getTreatmentPDF: IGetTratmentPDFState;
    getMedicalConsultyPDF: IGetMedicalConsultyPDFState;
    getMedicalRecordPDF: IGetMedicalRecordPDFState;
    getMedicalConsultyById: IGetMedicalConsultyByIdState;
}

interface IGetSubjectState {
    data: ISubject | null;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetAppointmentState {
    data: IGetAppointmentResponse;
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null; 
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

export const initialState: IMedicalRecordCreateSummaryState = {
    subject: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    appointment: {
        data: {} as IGetAppointmentResponse,
        loading: false,
        successful: false,
        error: null,
    },
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