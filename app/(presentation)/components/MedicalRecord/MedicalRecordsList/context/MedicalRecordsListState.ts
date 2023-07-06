import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";

export interface IMedicalRecordsListState {
    medicalConsulties: IGetMedicalConsultiesState;
}

interface IGetMedicalConsultiesState {
    data: IGetMedicalConsultiesResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalConsultyFailure | null; 
}

export const initialState: IMedicalRecordsListState = {
    medicalConsulties: {
      data: {} as IGetMedicalConsultiesResponse,
      loading: false,
      successful: false,
      error: null,
    },
}