import ScheduleUseCase from "domain/useCases/schedule/scheduleUseCase";
import { Dispatch } from "react";

export interface IScheduleActions {
    changeTypePopup: Function;
    changeStatusPopup: Function;
    getAppointments: Function;
    getAttentionWindows: Function;
    createAppointment: Function;
    getAttentionWindowsByService: Function;
    createWindowAttention: Function;
}

const changeTypePopup = (value:number) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_TYPE_ACTIVE_POPUP", payload: { data: value } });
}
const changeStatusPopup = (value:boolean) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_STATUS_POPUP", payload: { data: value } });
}

const getAppointments = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_APPOINTMENTS_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAppointments();
  
      dispatch({ type: "GET_APPOINTMENTS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_APPOINTMENTS_ERROR", payload: { error: error } });
    }
}

const getAttentionWindows = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_ATTENTION_WINDOWS_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAttentionWindows();
  
      dispatch({ type: "GET_ATTENTION_WINDOWS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_ATTENTION_WINDOWS_ERROR", payload: { error: error } });
    }
}

const createAppointment = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_APPOINTMENT_LOADING" });
      
      const res: any = await new ScheduleUseCase().createAppointment();
  
      dispatch({ type: "CREATE_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_APPOINTMENT_ERROR", payload: { error: error } });
    }
}

const getAttentionWindowsByService = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAttentionWindowsByService();
  
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_ERROR", payload: { error: error } });
    }
}

const createWindowAttention = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_WINDOW_ATTENTION_LOADING" });
      
      const res: any = await new ScheduleUseCase().createWindowAttention();
  
      dispatch({ type: "CREATE_WINDOW_ATTENTION_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_WINDOW_ATTENTION_ERROR", payload: { error: error } });
    }
}

export const actions: IScheduleActions = {
    changeTypePopup,
    changeStatusPopup,
    getAppointments,
    getAttentionWindows,
    createAppointment,
    getAttentionWindowsByService,
    createWindowAttention,
}
