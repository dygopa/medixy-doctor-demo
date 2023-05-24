import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IPatient } from "domain/core/entities/patientEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";

export interface IEditPatientState {
    patient: IGetPatientState;
    getFederalEntities: IEditPatientEditPatientState;
    editPatient: IUpdatePatientState;
}

interface IGetPatientState {
    data: IPatient | null;
    loading: boolean;
    successful: boolean;
    error: PatientFailure| null; 
}

interface IEditPatientEditPatientState {
    data: Array<IFederalEntity>;
    loading: boolean;
    successful: boolean;
    error: FederalEntityFailure| null; 
}

interface IUpdatePatientState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null;
}

export const initialState: IEditPatientState = {
    patient: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    getFederalEntities: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },
    editPatient: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    }
}