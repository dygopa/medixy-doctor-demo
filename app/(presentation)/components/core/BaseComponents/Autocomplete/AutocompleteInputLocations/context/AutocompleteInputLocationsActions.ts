import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import CountriesUseCase  from "domain/useCases/country/countryUseCase"
import { Dispatch } from "react";

export interface IAutocompleteInputLocationsActions {
    getCountryLocations: (obj: { searchQuery?: string | null; federalEntityId?: number | null; municipalityId?: number | null }) => (dispatch: Dispatch<any>) => {};
}

const getCountryLocations = (obj: { searchQuery?: string | null; federalEntityId?: number | null; municipalityId?: number | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_COUNTRY_LOCATIONS_LOADING" });

        const res: IGetCountryLocationsResponse = await new CountriesUseCase().getCountryLocations({ searchQuery: obj.searchQuery, limit: 200, federalEntityId: obj.federalEntityId, municipalityId: obj.municipalityId });

        dispatch({ type: "GET_COUNTRY_LOCATIONS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_COUNTRY_LOCATIONS_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputLocationsActions = {
    getCountryLocations,
}