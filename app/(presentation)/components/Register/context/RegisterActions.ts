import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import RegisterUseCase from "domain/useCases/register/registerUseCase";
import UserUseCase from "domain/useCases/user/userUseCase";
import { Dispatch } from "react";

export interface IRegisterActions {
  registerUser: Function;
  searchCURP: Function;
  updateRegisterData: Function;
  getMedicalSpecialities: Function;
  getUserMedicalSpecialities: Function;
  getFederalEntities: Function;
  getMunicipalities: (obj: { federalEntityId?: number | null }) => (dispatch: Dispatch<any>) => {};
}

const registerUser = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "REGISTER_USER_LOADING" });

    const res:string = await new RegisterUseCase().registerUser(obj);

    dispatch({ type: "REGISTER_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "REGISTER_USER_ERROR", payload: { error: error } });
  }
}

const searchCURP = (obj:{curp: string}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CURP_LOADING" });

    const res:string = ""

    dispatch({ type: "CURP_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CURP_ERROR", payload: { error: error } });
  }
}

const updateRegisterData = (obj:Object) => async (dispatch: Dispatch<any>) => dispatch({ type: "UPDATE_REGISTER_DATA", payload: { data: obj } });

const getMedicalSpecialities = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_SPECIALITIES_LOADING" });
    
    const res: Array<any> = await new UserUseCase().getMedicalSpecialities();

    dispatch({ type: "GET_MEDICAL_SPECIALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_MEDICAL_SPECIALITIES_ERROR", payload: { error: error } });
  }
}

const getUserMedicalSpecialities = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_MEDICAL_SPECIALITIES_LOADING" });
    
    const res: Array<any> = await new UserUseCase().getUserMedicalSpecialities(id);

    dispatch({ type: "GET_USER_MEDICAL_SPECIALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_MEDICAL_SPECIALITIES_ERROR", payload: { error: error } });
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

export const actions: IRegisterActions = {
  registerUser,
  searchCURP,
  updateRegisterData,
  getMedicalSpecialities,
  getUserMedicalSpecialities,
  getFederalEntities,
  getMunicipalities,
}
