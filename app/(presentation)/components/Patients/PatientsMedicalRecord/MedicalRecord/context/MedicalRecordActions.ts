import { IPatient } from "domain/core/entities/patientEntity";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import MedicalMeasureUseCase from "domain/useCases/medicalMeasure/medicalMeasureUseCases";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordActions {
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
    getMedicalMeasures: (obj: { patientId: number; sort?: Object | null; }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsulties: (obj: { patientId: number, sort: Object; limit: number }) => (dispatch: Dispatch<any>) => {};
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

const getMedicalMeasures = (obj: { patientId: number; sort?: Object | null; }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_MEASURES_LOADING" });
        
        const res: IGetMedicalMeasuresResponse = await new MedicalMeasureUseCase().getMedicalMeasures({
          patientId: obj.patientId,
          sort: obj.sort,
        });
    
        dispatch({ type: "GET_MEDICAL_MEASURES_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_MEDICAL_MEASURES_ERROR", payload: { error: error } });
      }
}

const getMedicalConsulties = (obj: { patientId: number; sort?: Object | null; limit: number; }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_CONSULTIES_LOADING" });
        
        const res: IGetMedicalConsultiesResponse = await new MedicalConsultyUseCase().getMedicalConsulties({
          limit: obj.limit,
          patientId: obj.patientId,
          sort: obj.sort,
        });
    
        dispatch({ type: "GET_MEDICAL_CONSULTIES_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_MEDICAL_CONSULTIES_ERROR", payload: { error: error } });
      }
}

export const actions: IMedicalRecordActions = {
    getPatientById,
    getMedicalMeasures,
    getMedicalConsulties,
}