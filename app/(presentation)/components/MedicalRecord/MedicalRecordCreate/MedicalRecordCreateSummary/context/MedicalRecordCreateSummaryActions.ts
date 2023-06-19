import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";
import AppointmentUseCase from "domain/useCases/appointment/appointmentUseCases";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordCreateSummaryActions {
    getSubjectById: (subjectId: number) => (dispatch: Dispatch<any>) => {};
    getAppointmentById: (appointmentId: string) => (dispatch: Dispatch<any>) => {};
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

const createMedicalConsulty = (obj: { medicalConsulty: IMedicalConsulty; appointmentId?: string | null }) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_LOADING" });
      
      const res: ICreateMedicalConsultyResponse = await new MedicalConsultyUseCase().createMedicalConsulty({ medicalConsulty: obj.medicalConsulty, appointmentId: obj.appointmentId });
  
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "CREATE_MEDICAL_CONSULTY_ERROR", payload: { error: error } });
    }
}

export const actions: IMedicalRecordCreateSummaryActions = {
    getSubjectById,
    getAppointmentById,
    createMedicalConsulty,
}