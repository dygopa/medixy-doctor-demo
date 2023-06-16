import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";

export interface IAutocompleteInputMunState {
    municipalities: IGetMunicipalitiesState;
}

interface IGetMunicipalitiesState {
    data: IGetMunicipalitiesResponse;
    loading: boolean;
    successful: boolean;
    error: MunicipalityFailure | null; 
}

export const initialState: IAutocompleteInputMunState = {
    municipalities: {
        data: {} as IGetMunicipalitiesResponse,
        loading: false,
        successful: false,
        error: null,
    },
}