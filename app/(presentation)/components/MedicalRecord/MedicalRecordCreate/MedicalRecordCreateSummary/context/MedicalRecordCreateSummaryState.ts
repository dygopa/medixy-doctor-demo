import { ISubject } from "domain/core/entities/subjectEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";

export interface IMedicalRecordCreateSummaryState {
    subject: IGetSubjectState;
    createMedicalConsulty: ICreateMedicalConsultyState;
}

interface IGetSubjectState {
    data: ISubject | null;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
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
    createMedicalConsulty: {
        data: {} as ICreateMedicalConsultyResponse,
        loading: false,
        successful: false,
        error: null,
    },
}