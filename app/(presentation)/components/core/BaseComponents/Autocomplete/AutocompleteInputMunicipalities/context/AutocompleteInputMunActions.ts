import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputMunActions {
    getMunicipalities: (obj: { searchQuery?: string | null; federalEntityId?: number | null }) => (dispatch: Dispatch<any>) => {};
}

const getMunicipalities = (obj: { searchQuery?: string | null; federalEntityId?: number | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MUNICIPALITIES_LOADING" });

        const res: IGetMunicipalitiesResponse = await new MunicipalitiesUseCase().getMunicipalities({ searchQuery: obj.searchQuery, limit: 200, federalEntityId: obj.federalEntityId });

        dispatch({ type: "GET_MUNICIPALITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MUNICIPALITIES_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputMunActions = {
    getMunicipalities,
}