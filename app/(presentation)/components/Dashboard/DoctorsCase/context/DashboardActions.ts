import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import DashboardUseCase from "domain/useCases/dashboard/DashboardUseCase";
import { Dispatch } from "react";

export interface IDashboardActions {
  getPendingAppointments: Function;
  getCompletedAppointments: Function;
  getLatestAppointment: Function;
  getSubject: Function;
}
 
const getPendingAppointments = (id:number, date?:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_PENDING_APPOINTMENTS_LOADING" });

    const res: Array<any> = await new DashboardUseCase().getPendingAppointments(id, date);

    dispatch({ type: "GET_PENDING_APPOINTMENTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_PENDING_APPOINTMENTS_ERROR", payload: { error: error } });
  }
}

const getCompletedAppointments = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_COMPLETED_APPOINTMENTS_LOADING" });

    const res: Array<any> = await new DashboardUseCase().getCompletedAppointments(id);

    dispatch({ type: "GET_COMPLETED_APPOINTMENTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_COMPLETED_APPOINTMENTS_ERROR", payload: { error: error } });
  }
}

const getLatestAppointment = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_LATEST_APPOINTMENT_LOADING" });

    const res: Object = await new DashboardUseCase().getLatestAppointment(id);

    dispatch({ type: "GET_LATEST_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_LATEST_APPOINTMENT_ERROR", payload: { error: error } });
  }
}

const getSubject = (obj:{ userId?: number | string | undefined; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_PATIENTS_LOADING" });

    const res: IGetSubjectsResponse = await new DashboardUseCase().getSubjects(obj);

    dispatch({ type: "GET_PATIENTS_SUCCESSFUL", payload: { data: res.data } });
  } catch (error) {
    dispatch({ type: "GET_PATIENTS_ERROR", payload: { error: error } });
  }
}

export const actions: IDashboardActions = {
  getPendingAppointments,
  getCompletedAppointments,
  getLatestAppointment,
  getSubject,
}
