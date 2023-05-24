import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IPatient } from "domain/core/entities/patientEntity";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { Dispatch } from "react";

export interface IEditPatientActions {
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
    getFederalEntities: Function;
    editPatient: (patient: IPatient) => (dispatch: Dispatch<any>) => {};
}

const getPatientById = (patientId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENT_LOADING" });

        const res: IPatient = await new PatientsUseCase().getPatientById(patientId);

        dispatch({ type: "GET_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_PATIENT_ERROR", payload: { error: error } });
    }
}

const getFederalEntities = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_FEDERAL_ENTITIES_LOADING" });

        const res: Array<IFederalEntity> = await new FederalEntitiesUseCase().getFederalEntities();

        dispatch({ type: "GET_FEDERAL_ENTITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_FEDERAL_ENTITIES_ERROR", payload: { error: error } });
    }
}

const editPatient = (patient: IPatient) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "EDIT_PATIENT_LOADING" });
      
        console.log(patient)

      const res: boolean = await new PatientsUseCase().editPatient(patient);
  
      dispatch({ type: "EDIT_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "EDIT_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: IEditPatientActions = {
    getPatientById,
    getFederalEntities,
    editPatient,
}