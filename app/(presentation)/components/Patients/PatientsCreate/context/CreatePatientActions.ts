import { Dispatch } from "react";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { ISubject } from "domain/core/entities/subjectEntity";

export interface ICreateSubjectActions {
    createSubject: Function,
}

const createSubject = (subject:ISubject) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_PATIENT_LOADING" });
      
      const res = await new SubjectsUseCase().createSubject(subject);
  
      dispatch({ type: "CREATE_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: ICreateSubjectActions = {
    createSubject,
}