import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { IGetCountryLocationResponse, IGetCountryLocationsResponse } from "domain/core/response/countryResponse";

export interface IAutocompleteInputLocationsState {
    countryLocations: IGetCountryLocationsState;
    countryLocation: IGetCountryLocationState;
}

interface IGetCountryLocationsState {
    data: IGetCountryLocationsResponse;
    loading: boolean;
    successful: boolean;
    error: CountryFailure | null; 
}

interface IGetCountryLocationState {
    data: IGetCountryLocationResponse;
    loading: boolean;
    successful: boolean;
    error: CountryFailure | null; 
}

export const initialState: IAutocompleteInputLocationsState = {
    countryLocations: {
        data: {} as IGetCountryLocationsResponse,
        loading: false,
        successful: false,
        error: null,
    },
    countryLocation: {
        data: {} as IGetCountryLocationResponse,
        loading: false,
        successful: false,
        error: null,
    },
}