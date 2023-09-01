import { PostalCodeFailure } from "domain/core/failures/postalCode/postalCodeFailure";
import { IGetPostalCodeResponse, IGetPostalCodesResponse } from "domain/core/response/postalCodeResponse";

export interface IAutocompleteInputPostalState {
    postalCodes: IGetPostalCodesState;
    postalCode: IGetPostalCodeState;
}

interface IGetPostalCodesState {
    data: IGetPostalCodesResponse;
    loading: boolean;
    successful: boolean;
    error: PostalCodeFailure | null; 
}

interface IGetPostalCodeState {
    data: IGetPostalCodeResponse;
    loading: boolean;
    successful: boolean;
    error: PostalCodeFailure | null; 
}

export const initialState: IAutocompleteInputPostalState = {
    postalCodes: {
        data: {} as IGetPostalCodesResponse,
        loading: false,
        successful: false,
        error: null,
    },
    postalCode: {
        data: {} as IGetPostalCodeResponse,
        loading: false,
        successful: false,
        error: null,
    },
}