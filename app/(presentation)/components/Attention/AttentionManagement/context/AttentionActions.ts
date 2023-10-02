import { MedicalRecordTypesNumberEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { StatusEnum } from "(presentation)/(enum)/status/statusEnum";
import { IGetAppointmentResponse, IUpdateAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import AppointmentUseCase from "domain/useCases/appointment/appointmentUseCases";
import MedicalRecordUseCase from "domain/useCases/medicalRecord/medicalRecordUseCases";
import { Dispatch } from "react";

export interface IAttentionActions {
    getAppointmentById: (appointmentId: string) => (dispatch: Dispatch<any>) => {};
    getAllergies: (obj: { subjectId: number; limit?: number | null; }) => (dispatch: Dispatch<any>) => {};
    finishedAppointment: (appointmentId: string) => (dispatch: Dispatch<any>) => {};
    canceledAppointment: (appointmentId: string) => (dispatch: Dispatch<any>) => {};
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

const finishedAppointment = (appointmentId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "FINISHED_APPOINTMENT_LOADING" });
  
      const res: IUpdateAppointmentResponse = await new AppointmentUseCase().editAppointmentStatus({ appointmentId: appointmentId, status: StatusEnum.COMPLETE });

      dispatch({ type: "FINISHED_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "FINISHED_APPOINTMENT_ERROR", payload: { error: error } });
    }
}

const canceledAppointment = (appointmentId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CANCELED_APPOINTMENT_LOADING" });
  
      const res: IUpdateAppointmentResponse = await new AppointmentUseCase().editAppointmentStatus({ appointmentId: appointmentId, status: StatusEnum.CANCELED });

      dispatch({ type: "CANCELED_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      dispatch({ type: "CANCELED_APPOINTMENT_ERROR", payload: { error: error } });
    }
}

export const actions: IAttentionActions = {
    getAppointmentById,
    getAllergies,
    finishedAppointment,
    canceledAppointment
}