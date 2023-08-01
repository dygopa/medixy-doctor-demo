import { ICountriesISO } from "domain/core/entities/countryEntity";
import { IUser } from "domain/core/entities/userEntity";
import UserUseCase from "domain/useCases/user/userUseCase";
import { Dispatch } from "react";
import CountriesUseCase from "domain/useCases/country/countryUseCase";
import { IServiceCategory } from "domain/core/entities/serviceEntity";
import ServiceUseCase from "domain/useCases/service/serviceUseCase";
import { ISpecialty } from "domain/core/entities/specialtyEntity";
import SpecialtyUseCase from "domain/useCases/specialty/specialtyUseCases";

export interface IUserActions {
  updateUserData: Function;
  getMedicalSpecialities: Function;
  createMedicalSpeciality: Function;
  updateMedicalSpeciality: Function;
  deleteMedicalSpeciality: Function;
  getUserMedicalSpecialities: Function;
  updateAvatar: Function;
  getCountriesISO: Function;
  createSpecialty: Function;
}

const updateUserData = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_LOADING" });

    const res: string = await new UserUseCase().editUser(obj);

    dispatch({ type: "UPDATE_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "UPDATE_USER_ERROR", payload: { error: error } });
  }
}

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

const createMedicalSpeciality = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_MEDICAL_SPECIALITY_LOADING" });
    
    const res: Array<any> = await new UserUseCase().createMedicalSpeciality(obj);

    dispatch({ type: "CREATE_MEDICAL_SPECIALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_MEDICAL_SPECIALITY_ERROR", payload: { error: error } });
  }
}

const updateMedicalSpeciality = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_MEDICAL_SPECIALITY_LOADING" });
    
    const res: Object = await new UserUseCase().updateMedicalSpeciality(obj);

    dispatch({ type: "UPDATE_MEDICAL_SPECIALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_MEDICAL_SPECIALITY_ERROR", payload: { error: error } });
  }
}

const deleteMedicalSpeciality = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "DELETE_MEDICAL_SPECIALITY_LOADING" });
    
    const res: Object = await new UserUseCase().deleteMedicalSpeciality(obj);

    dispatch({ type: "DELETE_MEDICAL_SPECIALITY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "DELETE_MEDICAL_SPECIALITY_ERROR", payload: { error: error } });
  }
}

const updateAvatar = (obj:any, doctorId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_AVATAR_LOADING" });
    
    const res: string = await new UserUseCase().updateAvatar(obj, doctorId);

    dispatch({ type: "UPDATE_AVATAR_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_AVATAR_ERROR", payload: { error: error } });
  }
}

const getCountriesISO = () => async (dispatch: Dispatch<any>) => {
  try {
      dispatch({ type: "GET_COUNTRIES_LOADING" });

      const res: Array<ICountriesISO> = await new CountriesUseCase().getCountriesISO();

      dispatch({ type: "GET_COUNTRIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_COUNTRIES_ERROR", payload: { error: error } });
  }
}

const createSpecialty = (specialty: ISpecialty) => async (dispatch: Dispatch<any>) => {
  try {
      dispatch({ type: "CREATE_SPECIALTY_LOADING" });

      const res = await new SpecialtyUseCase().createSpecialty({ specialty: specialty });

      dispatch({ type: "CREATE_SPECIALTY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
      dispatch({ type: "CREATE_SPECIALTY_ERROR", payload: { error: error } });
  }
}

export const actions: IUserActions = {
  updateUserData,
  getMedicalSpecialities,
  getUserMedicalSpecialities,
  createMedicalSpeciality,
  updateMedicalSpeciality,
  deleteMedicalSpeciality,
  updateAvatar,
  getCountriesISO,
  createSpecialty,
}
