import { IGetAppointmentResponse, IUpdateAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { ISubject } from "domain/core/entities/subjectEntity";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";

export interface IAttentionState {
    subject: IGetSubjectState;
    appointment: IGetAppointmentState;
    allergies: IGetAllergiesState;
    finishedAppointment: IFinishedAppointmentState;
    canceledAppointment: ICanceledAppointmentState;
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

interface IGetAllergiesState {
    data: IGetMedicalRecordsResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalRecordFailure | null; 
}

interface IFinishedAppointmentState {
    data: IUpdateAppointmentResponse;
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null; 
}

interface ICanceledAppointmentState {
    data: IUpdateAppointmentResponse;
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null; 
}

export const initialState: IAttentionState = {
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
    allergies: {
        data: {} as IGetMedicalRecordsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    finishedAppointment: {
        data: {} as IUpdateAppointmentResponse,
        loading: false,
        successful: false,
        error: null,
    },
    canceledAppointment: {
        data: {} as IUpdateAppointmentResponse,
        loading: false,
        successful: false,
        error: null,
    },
}