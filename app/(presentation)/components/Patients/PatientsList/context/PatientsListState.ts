import { PatientFailure } from "domain/core/failures/patient/patientFailure";
import { IGetPatientsResponse } from "domain/core/response/patientsResponse";

export interface IPatientsListState {
    getPatients: IPatientsListPatientsListState;
}

interface IPatientsListPatientsListState {
    data: IGetPatientsResponse;
    loading: boolean;
    successful: boolean;
    error: PatientFailure | null; 
}

export const initialState: IPatientsListState= {
    getPatients: {
      data: {} as IGetPatientsResponse,
      loading: false,
      successful: false,
      error: null,
    },
}