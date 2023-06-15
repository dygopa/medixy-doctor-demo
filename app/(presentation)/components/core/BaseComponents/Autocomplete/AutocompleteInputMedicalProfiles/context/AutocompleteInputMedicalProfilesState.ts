
import { MedicalProfileFailure } from "domain/core/failures/medicalProfile/medicalProfileFailure";
import { IGetMedicalProfilesResponse } from "domain/core/response/medicalProfileResponse";

export interface IAutocompleteInputMedicalProfilesState {
    medicalProfiles: IGetMedicalProfilesState;
}

interface IGetMedicalProfilesState {
    data: IGetMedicalProfilesResponse;
    loading: boolean;
    successful: boolean;
    error: MedicalProfileFailure | null; 
}

export const initialState: IAutocompleteInputMedicalProfilesState = {
    medicalProfiles: {
        data: {} as IGetMedicalProfilesResponse,
        loading: false,
        successful: false,
        error: null,
    },
}