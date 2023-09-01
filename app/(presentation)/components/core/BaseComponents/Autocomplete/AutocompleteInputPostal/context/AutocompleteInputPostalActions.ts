import { IGetPostalCodeResponse, IGetPostalCodesResponse } from "domain/core/response/postalCodeResponse";
import PostalCodesUseCase from "domain/useCases/postalCode/postalCodeUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputPostalActions {
    getPostalCodes: (obj: { searchQuery?: string | null }) => (dispatch: Dispatch<any>) => {};
    getPostalCodeByPostalCode: (obj: { postalCode: string }) => (dispatch: Dispatch<any>) => {};
}

const getPostalCodes = (obj: { searchQuery?: string | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_POSTAL_CODES_LOADING" });

        const res: IGetPostalCodesResponse = await new PostalCodesUseCase().getPostalCodes({ searchQuery: obj.searchQuery, limit: 25 })

        dispatch({ type: "GET_POSTAL_CODES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_POSTAL_CODES_ERROR", payload: { error: error } });
    }
}

const getPostalCodeByPostalCode = (obj: { postalCode: string }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_POSTAL_CODE_LOADING" });

        const res: IGetPostalCodeResponse = await new PostalCodesUseCase().getPostalCodeByPostalCode({ postalCode: obj.postalCode });

        dispatch({ type: "GET_POSTAL_CODE_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_POSTAL_CODE_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputPostalActions = {
    getPostalCodes,
    getPostalCodeByPostalCode
}