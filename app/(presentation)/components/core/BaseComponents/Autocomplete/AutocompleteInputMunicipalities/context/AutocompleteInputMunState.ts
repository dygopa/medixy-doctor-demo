import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { IGetMunicipalitiesResponse, IGetMunicipalityResponse } from "domain/core/response/municipalityResponse";

export interface IAutocompleteInputMunState {
    municipalities: IGetMunicipalitiesState;
    municipality: IGetMunicipalityState;
}

interface IGetMunicipalitiesState {
    data: IGetMunicipalitiesResponse;
    loading: boolean;
    successful: boolean;
    error: MunicipalityFailure | null; 
}

interface IGetMunicipalityState {
    data: IGetMunicipalityResponse;
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
    municipality: {
        data: {} as IGetMunicipalityResponse,
        loading: false,
        successful: false,
        error: null,
    },
}