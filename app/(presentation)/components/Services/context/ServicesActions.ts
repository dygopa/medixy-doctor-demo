import { ILocality } from "domain/core/entities/localityEntity";
import { IService } from "domain/core/entities/serviceEntity";
import LocalitiesUseCase from "domain/useCases/localities/localitiesUseCase";
import ServicesUseCase from "domain/useCases/service/serviceUseCase";
import { Dispatch } from "react";

export interface IServicesActions {
  getCategories: Function;
  getUserMedicalCenters: Function;
  getUserServices: Function;
  getService: Function;
  createUserService: Function;
  updateService: Function;
  deleteService: Function;
}

const getCategories = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_CATEGORIES_SERVICES_LOADING" });
    
    const res: Array<IService> = await new ServicesUseCase().getCategories();

    dispatch({ type: "GET_CATEGORIES_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_CATEGORIES_SERVICES_ERROR", payload: { error: error } });
  }
}

const getUserMedicalCenters = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CENTERS_LOADING" });
    
    const res: Array<ILocality> = await new LocalitiesUseCase().getUserLocalities(id);

    dispatch({ type: "GET_MEDICAL_CENTERS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_MEDICAL_CENTERS_ERROR", payload: { error: error } });
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

const getService = (id:number, userId:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICE_LOADING" });
    
    const res: IService = await new ServicesUseCase().getService(id, userId);

    dispatch({ type: "GET_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SERVICE_ERROR", payload: { error: error } });
  }
}

const createUserService = (obj:any, list:Array<any>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_USER_SERVICE_LOADING" });
    
    const res: string = await new ServicesUseCase().createUserService(obj, list);

    dispatch({ type: "CREATE_USER_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_USER_SERVICE_ERROR", payload: { error: error } });
  }
}

const updateService = (obj:any, id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_SERVICE_LOADING" });
    
    const res: number = await new ServicesUseCase().updateService(obj, id);

    dispatch({ type: "UPDATE_USER_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_USER_SERVICE_ERROR", payload: { error: error } });
  }
}

const deleteService = (id:number, userId:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "DELETE_USER_SERVICE_LOADING" });
    
    const res: number = await new ServicesUseCase().deleteService(id, userId);

    dispatch({ type: "DELETE_USER_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "DELETE_USER_SERVICE_ERROR", payload: { error: error } });
  }
}

export const actions: IServicesActions = {
  getCategories,
  getUserMedicalCenters,
  getUserServices,
  getService,
  createUserService,
  updateService,
  deleteService,
}
