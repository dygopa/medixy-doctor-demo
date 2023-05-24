import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IPatient } from "domain/core/entities/patientEntity";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordCreateSummaryActions {
    createMedicalConsulty: (medicalConsulty: IMedicalConsulty) => (dispatch: Dispatch<any>) => {};
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
}

const createMedicalConsulty = (medicalConsulty: IMedicalConsulty) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_LOADING" });
      
      const res: ICreateMedicalConsultyResponse = await new MedicalConsultyUseCase().createMedicalConsulty(medicalConsulty);
  
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_ERROR", payload: { error: error } });
    }
}

const getPatientById = (patientId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENT_LOADING" });

        const res: IPatient = await new PatientsUseCase().getPatientById(patientId);

        dispatch({ type: "GET_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: IMedicalRecordCreateSummaryActions = {
    getPatientById,
    createMedicalConsulty,
}