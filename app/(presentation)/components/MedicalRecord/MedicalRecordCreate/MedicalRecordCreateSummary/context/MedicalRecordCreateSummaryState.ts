import { ISubject } from "domain/core/entities/subjectEntity";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";

export interface IMedicalRecordCreateSummaryState {
    subject: IGetSubjectState;
    appointment: IGetAppointmentState;
    createMedicalConsulty: ICreateMedicalConsultyState;
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

interface ICreateMedicalConsultyState {
    data: ICreateMedicalConsultyResponse;
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
    createMedicalConsulty: {
        data: {} as ICreateMedicalConsultyResponse,
        loading: false,
        successful: false,
        error: null,
    },
}