import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { IUser } from "domain/core/entities/userEntity";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import CountriesUseCase from "domain/useCases/country/countryUseCase";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import MunicipalitiesUseCase from "domain/useCases/municipality/municipalityUseCases";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import UserUseCase from "domain/useCases/user/userUseCase";
import { Dispatch } from "react";

export interface IDoctorViewActions {
    getDoctorById: (subjectId: number) => (dispatch: Dispatch<any>) => {};
    getUserMedicalSpecialities: Function;
}

const getDoctorById = (doctorId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_DOCTOR_LOADING" });

        const res: IUser = await new UserUseCase().getDoctorById(doctorId);

        dispatch({ type: "GET_DOCTOR_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_DOCTOR_ERROR", payload: { error: error } });
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

export const actions: IDoctorViewActions = {
    getDoctorById,
    getUserMedicalSpecialities,
}