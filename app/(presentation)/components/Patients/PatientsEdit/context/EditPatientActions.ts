import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import CountriesUseCase from "domain/useCases/country/countryUseCase";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface IEditSubjectActions {
    getSubjectById: (subjectId: number) => (dispatch: Dispatch<any>) => {};
    getFederalEntities: Function;
    getMunicipalities: (obj: { federalEntityId?: number | null }) => (dispatch: Dispatch<any>) => {};
    getCountryLocations: (obj: { federalEntityId?: number | null; municipalityId?: number | null }) => (dispatch: Dispatch<any>) => {};
    editSubject: (subject: ISubject) => (dispatch: Dispatch<any>) => {};
}

const getSubjectById = (subjectId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENT_LOADING" });

        const res: ISubject = await new SubjectsUseCase().getSubjectById(subjectId);

        dispatch({ type: "GET_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_PATIENT_ERROR", payload: { error: error } });
    }
}

const getFederalEntities = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_FEDERAL_ENTITIES_LOADING" });

        const res: Array<IFederalEntity> = await new FederalEntitiesUseCase().getFederalEntities({});

        dispatch({ type: "GET_FEDERAL_ENTITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_FEDERAL_ENTITIES_ERROR", payload: { error: error } });
    }
}

const getMunicipalities = (obj: { federalEntityId?: number | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MUNICIPALITIES_LOADING" });

        const res: IGetMunicipalitiesResponse = await new MunicipalitiesUseCase().getMunicipalities({ limit: 100, federalEntityId: obj.federalEntityId });

        dispatch({ type: "GET_MUNICIPALITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MUNICIPALITIES_ERROR", payload: { error: error } });
    }
}

const getCountryLocations = (obj: { federalEntityId?: number | null; municipalityId?: number | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_COUNTRY_LOCATIONS_LOADING" });

        const res: IGetCountryLocationsResponse = await new CountriesUseCase().getCountryLocations({ limit: 100, federalEntityId: obj.federalEntityId, municipalityId: obj.municipalityId });

        dispatch({ type: "GET_COUNTRY_LOCATIONS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_COUNTRY_LOCATIONS_ERROR", payload: { error: error } });
    }
}

const editSubject = (subject: ISubject) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "EDIT_PATIENT_LOADING" });

      const res: boolean = await new SubjectsUseCase().editSubject(subject);
  
      dispatch({ type: "EDIT_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "EDIT_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: IEditSubjectActions = {
    getSubjectById,
    getFederalEntities,
    getMunicipalities,
    getCountryLocations,
    editSubject,
}