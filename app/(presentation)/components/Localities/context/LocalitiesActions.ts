import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ILocality } from "domain/core/entities/localityEntity";
import { IService } from "domain/core/entities/serviceEntity";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import CountriesUseCase from "domain/useCases/country/countryUseCase";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import LocalitiesUseCase from "domain/useCases/localities/localitiesUseCase";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import { Dispatch } from "react";
import ServicesUseCase from "domain/useCases/service/serviceUseCase";

export interface ILocalitiesActions {
  getMedicalCenters: Function;
  getCountryStates: Function;
  getFederalEntities: Function;
  getMunicipalities: (obj: { federalEntityId?: number | null }) => (dispatch: Dispatch<any>) => {};
  getCountryLocations: (obj: { federalEntityId?: number | null; municipalityId?: number | null }) => (dispatch: Dispatch<any>) => {};
  getUserLocalities: Function;
  createUserLocality: Function;
  updateUserLocality: Function;
  gettingUserLocality: Function;
  updateLocalityData: Function;
  getUserServices: Function;
  getUserBaseServices: Function;
}

const getMedicalCenters = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CENTERS_LOADING" });
    
    const res: Array<ILocality> = await new LocalitiesUseCase().getMedicalCenters();

    dispatch({ type: "GET_MEDICAL_CENTERS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_MEDICAL_CENTERS_ERROR", payload: { error: error } });
  }
}

const getCountryStates = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_COUNTRY_STATES_LOADING" });
    
    const res: Array<any> = await new LocalitiesUseCase().getCountryStates();

    dispatch({ type: "GET_COUNTRY_STATES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_COUNTRY_STATES_ERROR", payload: { error: error } });
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

const getUserLocalities = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_LOCALITIES_LOADING" });
    
    const res: Array<ILocality> = await new LocalitiesUseCase().getUserLocalities(id);

    dispatch({ type: "GET_USER_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_LOCALITIES_ERROR", payload: { error: error } });
  }
}

const createUserLocality = (obj:any, services: any[]) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_USER_LOCALITY_LOADING" });
    
    const res: ILocality = await new LocalitiesUseCase().createUserLocality(obj, services);

    dispatch({ type: "CREATE_USER_LOCALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_USER_LOCALITY_ERROR", payload: { error: error } });
  }
}

const updateUserLocality = (obj:any, id:number, services: any[]) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_LOCALITY_LOADING" });
    
    const res: string = await new LocalitiesUseCase().updateUserLocality(obj, id, services);

    dispatch({ type: "UPDATE_USER_LOCALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_USER_LOCALITY_ERROR", payload: { error: error } });
  }
}

const gettingUserLocality = (id:number, userId:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GETTING_USER_LOCALITY_LOADING" });
    
    const res: ILocality = await new LocalitiesUseCase().gettingUserLocality(id, userId);

    dispatch({ type: "GETTING_USER_LOCALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GETTING_USER_LOCALITY_ERROR", payload: { error: error } });
  }
}

const getUserServices = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_SERVICES_LOADING" });
    
    const res: Array<IService> = await new ServicesUseCase().getUserServices(id);

    dispatch({ type: "GET_USER_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_SERVICES_ERROR", payload: { error: error } });
  }
}

const getUserBaseServices = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_BASE_SERVICES_LOADING" });
    
    const res: Array<IService> = await new ServicesUseCase().getUserBaseServices(id);

    dispatch({ type: "GET_USER_BASE_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_BASE_SERVICES_ERROR", payload: { error: error } });
  }
}

const updateLocalityData = (obj:Object) => async (dispatch: Dispatch<any>) => dispatch({ type: "UPDATE_LOCALITY_DATA", payload: { data: obj } });

export const actions: ILocalitiesActions = {
  getMedicalCenters,
  getCountryStates,
  getFederalEntities,
  getMunicipalities,
  getCountryLocations,
  getUserLocalities,
  createUserLocality,
  updateUserLocality,
  gettingUserLocality,
  updateLocalityData,
  getUserServices,
  getUserBaseServices
}