import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordCreateSummaryActions {
    createMedicalConsulty: (medicalConsulty: IMedicalConsulty) => (dispatch: Dispatch<any>) => {};
    getSubjectById: (subjectId: number) => (dispatch: Dispatch<any>) => {};
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

const getSubjectById = (subjectId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_SUBJECT_LOADING" });

        const res: ISubject = await new SubjectsUseCase().getSubjectById(subjectId);

        dispatch({ type: "GET_SUBJECT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_SUBJECT_ERROR", payload: { error: error } });
    }
}

export const actions: IMedicalRecordCreateSummaryActions = {
    getSubjectById,
    createMedicalConsulty,
}