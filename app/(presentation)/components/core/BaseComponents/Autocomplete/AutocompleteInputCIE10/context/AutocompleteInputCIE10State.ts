import { CIE10Failure } from "domain/core/failures/cie10/cie10Failure";
import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";

export interface IAutocompleteInputCIE10State {
    cie10: IGetCIE10State;
}

interface IGetCIE10State {
    data: IGetCIE10ListResponse;
    loading: boolean;
    successful: boolean;
    error: CIE10Failure| null; 
}

export const initialState: IAutocompleteInputCIE10State = {
    cie10: {
        data: {} as IGetCIE10ListResponse,
        loading: false,
        successful: false,
        error: null,
    },
}