import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IPatient } from "domain/core/entities/subjectEntity";
import { CIE10Failure } from "domain/core/failures/cie10/cie10Failure";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { PatientFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";

export interface IMedicalRecordCreateState {
    patient: IGetPatientState;
    cie10: IGetCIE10State;
}

interface IGetPatientState {
    data: IPatient | null;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null; 
}

interface IGetCIE10State {
    data: IGetCIE10ListResponse;
    loading: boolean;
    successful: boolean;
    error: CIE10Failure| null; 
}

export const initialState: IMedicalRecordCreateState = {
    patient: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    cie10: {
        data: {} as IGetCIE10ListResponse,
        loading: false,
        successful: false,
        error: null,
    },
}