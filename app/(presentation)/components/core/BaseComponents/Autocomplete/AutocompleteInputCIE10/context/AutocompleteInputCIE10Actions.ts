import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";
import CIE10UseCase from "domain/useCases/cie10/cie10UseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputCIE10Actions {
    getCIE10: (obj: { searchQuery: string }) => (dispatch: Dispatch<any>) => {};
}

const getCIE10 = (obj: { searchQuery: string }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_CIE10_LOADING" });

        const res: IGetCIE10ListResponse = await new CIE10UseCase().getCIE10({ searchQuery: obj.searchQuery, limit: 100 });

        dispatch({ type: "GET_CIE10_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_CIE10_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputCIE10Actions = {
    getCIE10,
}