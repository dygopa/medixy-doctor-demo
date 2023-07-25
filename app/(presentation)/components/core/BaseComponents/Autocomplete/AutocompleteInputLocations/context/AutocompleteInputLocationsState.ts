import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { IGetCountryLocationResponse, IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalityResponse } from "domain/core/response/municipalityResponse";

export interface IAutocompleteInputLocationsState {
    countryLocations: IGetCountryLocationsState;
    countryLocation: IGetCountryLocationState;
    municipality: IGetMunicipalityState;
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
interface IGetMunicipalityState {
    data: IGetMunicipalityResponse;
    loading: boolean;
    successful: boolean;
    error: MunicipalityFailure | null; 
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
    municipality: {
        data: {} as IGetMunicipalityResponse,
        loading: false,
        successful: false,
        error: null,
    },
}