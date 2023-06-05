import { ILocality } from "domain/core/entities/localityEntity";
import LocalitiesUseCase from "domain/useCases/localities/localitiesUseCase";
import { Dispatch } from "react";

export interface ILocalitiesActions {
  getMedicalCenters: Function;
  getCountryStates: Function;
  getUserLocalities: Function;
  createUserLocality: Function;
  updateUserLocality: Function;
  gettingUserLocality: Function;
  updateLocalityData: Function;
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

const createUserLocality = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_USER_LOCALITY_LOADING" });
    
    const res: string = await new LocalitiesUseCase().createUserLocality(obj);

    dispatch({ type: "CREATE_USER_LOCALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_USER_LOCALITY_ERROR", payload: { error: error } });
  }
}

const updateUserLocality = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_LOCALITY_LOADING" });
    
    const res: string = await new LocalitiesUseCase().updateUserLocality(obj);

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

const updateLocalityData = (obj:Object) => async (dispatch: Dispatch<any>) => dispatch({ type: "UPDATE_LOCALITY_DATA", payload: { data: obj } });

export const actions: ILocalitiesActions = {
  getMedicalCenters,
  getCountryStates,
  getUserLocalities,
  createUserLocality,
  updateUserLocality,
  gettingUserLocality,
  updateLocalityData
}