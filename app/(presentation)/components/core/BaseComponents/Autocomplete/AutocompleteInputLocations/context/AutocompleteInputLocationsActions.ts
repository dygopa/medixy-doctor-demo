import { IGetCountryLocationResponse, IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalityResponse } from "domain/core/response/municipalityResponse";
import CountriesUseCase  from "domain/useCases/country/countryUseCase"
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputLocationsActions {
    getCountryLocations: (obj: { searchQuery?: string | null; federalEntityId?: number | null; municipalityId?: number | null }) => (dispatch: Dispatch<any>) => {};
    getCountryLocationById: (obj: { id: number }) => (dispatch: Dispatch<any>) => {};
    getMunicipalityById: (obj: { id: number }) => (dispatch: Dispatch<any>) => {};
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

const getCountryLocationById = (obj: { id: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_COUNTRY_LOCATION_LOADING" });

        const res: IGetCountryLocationResponse = await new CountriesUseCase().getCountryLocationById({ id: obj.id });

        dispatch({ type: "GET_COUNTRY_LOCATION_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_COUNTRY_LOCATION_ERROR", payload: { error: error } });
    }
}

const getMunicipalityById = (obj: { id: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MUNICIPALITY_LOADING" });

        const res: IGetMunicipalityResponse = await new MunicipalitiesUseCase().getMunicipalityById({ id: obj.id });

        dispatch({ type: "GET_MUNICIPALITY_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MUNICIPALITY_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputLocationsActions = {
    getCountryLocations,
    getCountryLocationById,
    getMunicipalityById,
}