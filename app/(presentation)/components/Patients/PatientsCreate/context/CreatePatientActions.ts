import { Dispatch } from "react";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { IPatient } from "domain/core/entities/patientEntity";

export interface ICreatePatientActions {
    createPatient: Function,
}

const createPatient = (patient:IPatient) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_PATIENT_LOADING" });
      
      const res: boolean = await new PatientsUseCase().createPatient(patient);
  
      dispatch({ type: "CREATE_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: ICreatePatientActions = {
    createPatient,
}