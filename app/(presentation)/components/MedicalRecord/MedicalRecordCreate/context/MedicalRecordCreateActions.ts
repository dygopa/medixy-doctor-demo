import { ISubject } from "domain/core/entities/subjectEntity";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";
import {  MedicalRecordTypesNumberEnum, MedicalRecordTypesOrdersEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse, IGetMedicalConsultyPDFResponse } from "domain/core/response/medicalConsultyResponse";
import { IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { IGetMedicalRecordPDFResponse, IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import { IGetTreatmentPDFResponse, IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import MedicalMeasureUseCase from "domain/useCases/medicalMeasure/medicalMeasureUseCases";
import MedicalRecordUseCase from "domain/useCases/medicalRecord/medicalRecordUseCases";
import TreatmentUseCase from "domain/useCases/treatments/treatmentsUseCase";
import { IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import SpecialtyUseCase from "domain/useCases/specialty/specialtyUseCases";
import { IGetSubjectRelationsResponse } from "domain/core/response/subjectsResponse";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import AppointmentUseCase from "domain/useCases/appointment/appointmentUseCases";
import { IUser } from "domain/core/entities/userEntity";
import { ITreatment } from "domain/core/entities/treatmentEntity";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

export interface IMedicalRecordCreateActions {
    getSubjectById: (subjectId: number) => (dispatch: Dispatch<any>) => {};
    getAppointmentById: (appointmentId: string) => (dispatch: Dispatch<any>) => {};
    getSpecialties: () => (dispatch: Dispatch<any>) => {};
    getMedicalMeasures: (obj: { subjectId: number; sort?: Object | null; }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsulties: (obj: { subjectId: number, sort: Object; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    getTreatments: (obj: { subjectId: number, sort?: Object; limit?: number | null }) => (dispatch: Dispatch<any>) => {};
    getAllergies: (obj: { subjectId: number; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    getMedicalRecords: (obj: { subjectId: number; medicalRecordCategoryId: number; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    getFederalEntities: () => (dispatch: Dispatch<any>) => {};
    editSubject: (subject: ISubject) => (dispatch: Dispatch<any>) => {};
    getCompanions: (obj: { patientId: number }) => (dispatch: Dispatch<any>) => {};
    createCompanion: (patientId:number, companion:ISubject) => (dispatch: Dispatch<any>) => {};
    getTreatmentPDF: (obj: { doctor: IUser; treatment: ITreatment }) => (dispatch: Dispatch<any>) => {};
    getMedicalConsultyPDF: (obj: { doctor: IUser; medicalConsulty: IMedicalConsulty }) => (dispatch: Dispatch<any>) => {};
    getMedicalRecordPDF: (obj: { doctor: IUser; medicalRecord: IMedicalRecord }) => (dispatch: Dispatch<any>) => {};
    createMedicalConsulty: (obj: { medicalConsulty: IMedicalConsulty; appointmentId?: string | null }) => (dispatch: Dispatch<any>) => {};
}

const getSubjectById = (subjectId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_SUBJECT_LOADING" });

        const res: ISubject = await new SubjectsUseCase().getSubjectById(subjectId);

        dispatch({ type: "GET_SUBJECT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_SUBJECT_ERROR", payload: { error: error } });
    }
}

const getAppointmentById = (appointmentId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_APPOINTMENT_LOADING" });

    const res: IGetAppointmentResponse = await new AppointmentUseCase().getAppointmentById(appointmentId);

    dispatch({ type: "GET_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_APPOINTMENT_ERROR", payload: { error: error } });
  }
}

const getSpecialties = () => async (dispatch: Dispatch<any>) => {
  try {
      dispatch({ type: "GET_SPECIALTIES_LOADING" });

      const res: IGetSpecialtiesResponse = await new SpecialtyUseCase().getSpecialties({});

      dispatch({ type: "GET_SPECIALTIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
      dispatch({ type: "GET_SPECIALTIES_ERROR", payload: { error: error } });
  }
}

const getMedicalMeasures = (obj: { subjectId: number; sort?: Object | null; }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_MEDICAL_MEASURES_LOADING" });
      
      const res: IGetMedicalMeasuresResponse = await new MedicalMeasureUseCase().getMedicalMeasures({
        subjectId: obj.subjectId,
        sort: obj.sort,
      });
  
      dispatch({ type: "GET_MEDICAL_MEASURES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "GET_MEDICAL_MEASURES_ERROR", payload: { error: error } });
    }
}

const getMedicalConsulties = (obj: { subjectId: number; sort?: Object | null; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_MEDICAL_CONSULTIES_LOADING" });
      
      const res: IGetMedicalConsultiesResponse = await new MedicalConsultyUseCase().getMedicalConsulties({
        limit: obj.limit,
        subjectId: obj.subjectId,
        sort: obj.sort,
      });
  
      dispatch({ type: "GET_MEDICAL_CONSULTIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "GET_MEDICAL_CONSULTIES_ERROR", payload: { error: error } });
    }
}

const getTreatments = (obj: { subjectId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_TREATMENTS_LOADING"});

      const sort: Object = {
        field: "estado",
        ascending: true,
      }

      const res: IGetTreatmentsResponse = await new TreatmentUseCase().getTreatments({
        limit: obj.limit,
        subjectId: obj.subjectId,
        sort: sort,
      });
  
      dispatch({ type: "GET_TREATMENTS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "GET_TREATMENTS_ERROR", payload: { error: error } });
    }
}

const getAllergies = (obj: { subjectId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_ALLERGIES_LOADING"});

    const res: IGetMedicalRecordsResponse = await new MedicalRecordUseCase().getMedicalRecords({
      limit: obj.limit,
      subjectId: obj.subjectId,
      medicalRecordType: MedicalRecordTypesNumberEnum.ALLERGIES,
    });

    dispatch({ type: "GET_ALLERGIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_ALLERGIES_ERROR", payload: { error: error } });
  }
}

const getMedicalRecords = (obj: { subjectId: number; medicalRecordCategoryId: number; limit?: number | null; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_RECORDS_LOADING"});

    const res: IGetMedicalRecordsResponse = await new MedicalRecordUseCase().getMedicalRecords({
      limit: obj.limit,
      subjectId: obj.subjectId,
      medicalRecordCategory: obj.medicalRecordCategoryId,
    });

    dispatch({ type: "GET_MEDICAL_RECORDS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_MEDICAL_RECORDS_ERROR", payload: { error: error } });
  }
}

const getFederalEntities = () => async (dispatch: Dispatch<any>) => {
  try {
      dispatch({ type: "GET_FEDERAL_ENTITIES_LOADING" });

      const res: Array<IFederalEntity> = await new FederalEntitiesUseCase().getFederalEntities({});

      dispatch({ type: "GET_FEDERAL_ENTITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
      dispatch({ type: "GET_FEDERAL_ENTITIES_ERROR", payload: { error: error } });
  }
}

const editSubject = (subject: ISubject) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "EDIT_SUBJECT_LOADING" });
    
    const res: boolean = await new SubjectsUseCase().editSubject(subject);

    dispatch({ type: "EDIT_SUBJECT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "EDIT_SUBJECT_ERROR", payload: { error: error } });
  }
}

const getCompanions = (obj: { patientId: number }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_COMPONIONS_LOADING" });
    
    const res: IGetSubjectRelationsResponse = await new SubjectsUseCase().getSubjectsCompanions({
      patientId: obj.patientId,
      typeRelation: 1,
    });

    dispatch({ type: "GET_COMPONIONS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_COMPONIONS_ERROR", payload: { error: error } });
  }
}

const createCompanion = (patientId:number, companion:ISubject) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_COMPANION_LOADING" });
    
    const res: ISubject = await new SubjectsUseCase().createSubject(companion);

    await new SubjectsUseCase().createSubjectRelations(patientId, res.subjectId);

    dispatch({ type: "CREATE_COMPANION_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CREATE_COMPANION_ERROR", payload: { error: error } });
  }
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

const createMedicalConsulty = (obj: { medicalConsulty: IMedicalConsulty; appointmentId?: string | null }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_MEDICAL_CONSULTY_LOADING" });
    
    const res: ICreateMedicalConsultyResponse = await new MedicalConsultyUseCase().createMedicalConsulty({ medicalConsulty: obj.medicalConsulty, appointmentId: obj.appointmentId });

    dispatch({ type: "CREATE_MEDICAL_CONSULTY_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CREATE_MEDICAL_CONSULTY_ERROR", payload: { error: error } });
  }
}

export const actions: IMedicalRecordCreateActions = {
    getSubjectById,
    getAppointmentById,
    getSpecialties,
    getMedicalMeasures,
    getMedicalConsulties,
    getTreatments,
    getAllergies,
    getMedicalRecords,
    getFederalEntities,
    editSubject,
    getCompanions,
    createCompanion,
    getTreatmentPDF,
    getMedicalConsultyPDF,
    getMedicalRecordPDF,
    createMedicalConsulty,
}