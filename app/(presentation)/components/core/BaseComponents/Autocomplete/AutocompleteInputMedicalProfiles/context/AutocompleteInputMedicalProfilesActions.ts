import { IGetMedicalProfilesResponse } from "domain/core/response/medicalProfileResponse";
import MedicalProfileUseCase from "domain/useCases/medicalProfile/medicalProfileUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputMedicalProfilesActions {
    getMedicalProfiles: (obj: { searchQuery: string }) => (dispatch: Dispatch<any>) => {};
}

const getMedicalProfiles = (obj: { searchQuery: string }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_PROFILES_LOADING" });

        const res: IGetMedicalProfilesResponse = await new MedicalProfileUseCase().getMedicalProfiles({ searchQuery: obj.searchQuery, limit: 100 });

        dispatch({ type: "GET_MEDICAL_PROFILES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MEDICAL_PROFILES_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputMedicalProfilesActions = {
    getMedicalProfiles,
}