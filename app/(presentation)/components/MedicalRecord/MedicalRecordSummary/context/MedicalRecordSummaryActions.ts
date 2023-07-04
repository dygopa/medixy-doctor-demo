import { MedicalRecordTypesOrdersEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { ITreatment } from "domain/core/entities/treatmentEntity";
import { IUser } from "domain/core/entities/userEntity";
import {  IGetMedicalConsultyPDFResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalRecordPDFResponse } from "domain/core/response/medicalRecordResponse";
import { IGetTreatmentPDFResponse } from "domain/core/response/treatmentResponses";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import MedicalRecordUseCase from "domain/useCases/medicalRecord/medicalRecordUseCases";
import TreatmentUseCase from "domain/useCases/treatments/treatmentsUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordSummaryActions {
    getTreatmentPDF: (obj: { doctor: IUser; treatment: ITreatment }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsultyPDF: (obj: { doctor: IUser; medicalConsulty: IMedicalConsulty }) => (dispatch: Dispatch<any>) => {};
    getMedicalRecordPDF: (obj: { doctor: IUser; medicalRecord: IMedicalRecord }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsultyById: (consultyId: number) => (dispatch: Dispatch<any>) => {};
}

const getTreatmentPDF = (obj: { doctor: IUser; treatment: ITreatment }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_TREATMENT_PDF_LOADING" });

    const res: IGetTreatmentPDFResponse = await new TreatmentUseCase().getTreatmentPDF({ doctor: obj.doctor, treatment: obj.treatment });

    dispatch({ type: "GET_TREATMENT_PDF_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_TREATMENT_PDF_ERROR", payload: { error: error } });
  }
}

const getMedicalConsultyPDF = (obj: { doctor: IUser; medicalConsulty: IMedicalConsulty }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CONSULTY_PDF_LOADING" });

    const res: IGetMedicalConsultyPDFResponse = await new MedicalConsultyUseCase().getMedicalConsultyPDF({ doctor: obj.doctor, medicalConsulty: obj.medicalConsulty });

    dispatch({ type: "GET_MEDICAL_CONSULTY_PDF_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_MEDICAL_CONSULTY_PDF_ERROR", payload: { error: error } });
  }
}

const getMedicalRecordPDF = (obj: { doctor: IUser; medicalRecord: IMedicalRecord }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_RECORD_PDF_LOADING" });

    let res: IGetMedicalRecordPDFResponse = {} as IGetMedicalRecordPDFResponse;

    switch (obj.medicalRecord.medicalRecordType.name) {
      case MedicalRecordTypesOrdersEnum.ORDER_DIAGNOSIS:
        res = await new MedicalRecordUseCase().getMedicalRecordDiagnosisPDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
      case MedicalRecordTypesOrdersEnum.ORDER_LABORATORY:
        res = await new MedicalRecordUseCase().getMedicalRecordDiagnosisPDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
      case MedicalRecordTypesOrdersEnum.ORDER_SPECIALTY:
        res = await new MedicalRecordUseCase().getMedicalRecordSpecialityPDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
      case MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_PROOF:
        res = await new MedicalRecordUseCase().getMedicalRecordJustificativePDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
      case MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_CERTIFICATE:
        res = await new MedicalRecordUseCase().getMedicalRecordCertificatePDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
      case MedicalRecordTypesOrdersEnum.ORDER_HOSPITALIZATION:
        res = await new MedicalRecordUseCase().getMedicalRecordHospitalizationPDF({ doctor: obj.doctor, medicalRecord: obj.medicalRecord });
        break;
    
      default:
        break;
    }

    dispatch({ type: "GET_MEDICAL_RECORD_PDF_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_MEDICAL_RECORD_PDF_ERROR", payload: { error: error } });
  }
}

const getMedicalConsultyById = (consultyId: number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CONSULTY_LOADING" });

    const res: IMedicalConsulty = await new MedicalConsultyUseCase().getMedicalConsultyById(consultyId);

    dispatch({ type: "GET_MEDICAL_CONSULTY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_MEDICAL_CONSULTY_ERROR", payload: { error: error } });
  }
}

export const actions: IMedicalRecordSummaryActions = {
    getTreatmentPDF,
    getMedicalConsultyPDF,
    getMedicalRecordPDF,
    getMedicalConsultyById,
}