import {  MedicalRecordTypesNumberEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IPatient } from "domain/core/entities/patientEntity";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import MedicalMeasureUseCase from "domain/useCases/medicalMeasure/medicalMeasureUseCases";
import MedicalRecordUseCase from "domain/useCases/medicalRecord/medicalRecordUseCases";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import TreatmentUseCase from "domain/useCases/treatments/treatmentsUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordActions {
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
    getMedicalMeasures: (obj: { patientId: number; sort?: Object | null; }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsulties: (obj: { patientId: number, sort: Object; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    getTreatments: (obj: { patientId: number, sort?: Object; limit?: number | null }) => (dispatch: Dispatch<any>) => {};
    getAllergies: (obj: { patientId: number; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    getMedicalRecords: (obj: { patientId: number; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
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

const getMedicalConsulties = (obj: { patientId: number; sort?: Object | null; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
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

const getTreatments = (obj: { patientId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_TREATMENTS_LOADING"});

      const sort: Object = {
        field: "estado",
        ascending: true,
      }

      const res: IGetTreatmentsResponse = await new TreatmentUseCase().getTreatments({
        limit: obj.limit,
        patientId: obj.patientId,
        sort: sort,
      });
  
      dispatch({ type: "GET_TREATMENTS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "GET_TREATMENTS_ERROR", payload: { error: error } });
    }
}

const getAllergies = (obj: { patientId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_ALLERGIES_LOADING"});

    const res: IGetMedicalRecordsResponse = await new MedicalRecordUseCase().getMedicalRecords({
      limit: obj.limit,
      patientId: obj.patientId,
      medicalRecordType: MedicalRecordTypesNumberEnum.ALLERGIES,
    });

    dispatch({ type: "GET_ALLERGIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_ALLERGIES_ERROR", payload: { error: error } });
  }
}

const getMedicalRecords = (obj: { patientId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_RECORDS_LOADING"});

    const res: IGetMedicalRecordsResponse = await new MedicalRecordUseCase().getMedicalRecords({
      limit: obj.limit,
      patientId: obj.patientId,
    });

    dispatch({ type: "GET_MEDICAL_RECORDS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_MEDICAL_RECORDS_ERROR", payload: { error: error } });
  }
}

export const actions: IMedicalRecordActions = {
    getPatientById,
    getMedicalMeasures,
    getMedicalConsulties,
    getTreatments,
    getAllergies,
    getMedicalRecords,
}