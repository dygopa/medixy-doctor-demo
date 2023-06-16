import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";

export interface IAutocompleteInputLocationsState {
    countryLocations: IGetCountryLocationsState;
}

interface IGetCountryLocationsState {
    data: IGetCountryLocationsResponse;
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
}