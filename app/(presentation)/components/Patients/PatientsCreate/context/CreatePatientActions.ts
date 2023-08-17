import { Dispatch } from "react";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { ISubject } from "domain/core/entities/subjectEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import CountriesUseCase from "domain/useCases/country/countryUseCase";

export interface ICreateSubjectActions {
    createSubject: Function,
    getFederalEntities: Function;
    getMunicipalities: (obj: { federalEntityId?: number | null }) => (dispatch: Dispatch<any>) => {};
    getCountryLocations: (obj: { federalEntityId?: number | null; municipalityId?: number | null }) => (dispatch: Dispatch<any>) => {};
}

const createSubject = (subject:ISubject, userId:any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_PATIENT_LOADING" });
      
      const res = await new SubjectsUseCase().createSubject(subject, userId);
  
      dispatch({ type: "CREATE_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_PATIENT_ERROR", payload: { error: error } });
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

export const actions: ICreateSubjectActions = {
    createSubject,
    getFederalEntities,
    getMunicipalities,
    getCountryLocations,
}