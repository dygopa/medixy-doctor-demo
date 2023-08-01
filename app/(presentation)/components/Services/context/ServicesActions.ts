import { ILocality, ILocalityService } from "domain/core/entities/localityEntity";
import { IService, IServiceCategory } from "domain/core/entities/serviceEntity";
import LocalitiesUseCase from "domain/useCases/localities/localitiesUseCase";
import ServiceUseCase from "domain/useCases/service/serviceUseCase";
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
  getLocalitiesToService: Function;
  getServiceByBase: Function;
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
    
    const res: Array<IService> = await new ServicesUseCase().getUserBaseServices(id);

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

const getServiceByBase = (id:number, userId:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICE_LOADING" });
    
    const res: IService = await new ServicesUseCase().getServiceByBase(id, userId);

    dispatch({ type: "GET_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SERVICE_ERROR", payload: { error: error } });
  }
}

const createUserService = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_USER_SERVICE_LOADING" });

    if (obj.service_category_id === 0) {
      const serviceCategory: IServiceCategory = {
        id: 0,
        name: obj.service_category_name,
        doctorId: obj.service_category_doctor_id 
      }

      const resServiceCategory = await new ServiceUseCase().createServiceCategory({ serviceCategory: serviceCategory });

      if (resServiceCategory.data.id) obj.service_category_id = resServiceCategory.data.id;
    }
    
    const res: string = await new ServicesUseCase().createUserService(obj);

    dispatch({ type: "CREATE_USER_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_USER_SERVICE_ERROR", payload: { error: error } });
  }
}

const updateService = (obj: {dataService: any; serviceId: number;}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_SERVICE_LOADING" });

    if (obj.dataService.service_category_id === 0) {
      const serviceCategory: IServiceCategory = {
        id: 0,
        name: obj.dataService.service_category_name,
        doctorId: obj.dataService.service_category_doctor_id 
      }

      const resServiceCategory = await new ServiceUseCase().createServiceCategory({ serviceCategory: serviceCategory });

      if (resServiceCategory.data.id) obj.dataService.service_category_id = resServiceCategory.data.id;
    }
    
    const res: number = await new ServicesUseCase().updateService(obj);

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

const getLocalitiesToService = (serviceId: number) => async (dispatch: Dispatch<any>) => {
  try {
      dispatch({ type: "GET_LOCALITIES_LOADING" });

      const res = await new ServiceUseCase().getLocalitiesToService(serviceId);

      dispatch({ type: "GET_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_LOCALITIES_ERROR", payload: { error: error } });
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
  getLocalitiesToService,
  getServiceByBase,
}
