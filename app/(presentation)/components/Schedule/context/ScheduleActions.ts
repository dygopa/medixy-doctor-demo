import ScheduleUseCase from "domain/useCases/schedule/scheduleUseCase";
import { Dispatch } from "react";

export interface IScheduleActions {
  getCalendarEvents: Function;
  predifinedReservationData: Function;
  typeOfAppointmentCreation: Function;
  appointmentDetail: Function;
  activeLocality: Function;
  activeService: Function;
  activeDay: Function;
  changeTypePopup: Function;
  changeStatusPopup: Function;
  getAppointments: Function;
  getAttentionWindows: Function;
  createAppointment: Function;
  getAttentionWindowsByService: Function;
  createWindowAttention: Function;
  getServices: Function;
  getLocalities: Function;
  getPatients: Function;
}

const getCalendarEvents = (id:number, serviceId:number, sinceDate:any, untilDate:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_CALENDAR_EVENTS_LOADING" });
    
    const res: any = await new ScheduleUseCase().getCalendarEvents(id, serviceId, sinceDate, untilDate);

    dispatch({ type: "GET_CALENDAR_EVENTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_CALENDAR_EVENTS_ERROR", payload: { error: error } });
  }
}

const predifinedReservationData = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_PREDIFINED_RESERVATION", payload: { data: value } });
}

const typeOfAppointmentCreation = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_TYPE_OF_APPOINTMENT_CREATION", payload: { data: value } });
}

const appointmentDetail = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_APPOINTMENT_DETAIL", payload: { data: value } });
}

const activeLocality = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_ACTIVE_LOCALITY", payload: { data: value } });
}

const activeService = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_ACTIVE_SERVICE", payload: { data: value } });
}

const activeDay = (value:any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_ACTIVE_DAY", payload: { data: value } });
}

const changeTypePopup = (value:number) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_TYPE_ACTIVE_POPUP", payload: { data: value } });
}

const changeStatusPopup = (value:boolean) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_STATUS_POPUP", payload: { data: value } });
}

const getAppointments = (id:number, date?:string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_APPOINTMENTS_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAppointments(id, date);
  
      dispatch({ type: "GET_APPOINTMENTS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_APPOINTMENTS_ERROR", payload: { error: error } });
    }
}

const getAttentionWindows = (id:number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_ATTENTION_WINDOWS_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAttentionWindows(id);
  
      dispatch({ type: "GET_ATTENTION_WINDOWS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_ATTENTION_WINDOWS_ERROR", payload: { error: error } });
    }
}

const createAppointment = (obj:any, now?:boolean) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_APPOINTMENT_LOADING" });
      
      const res: any = await new ScheduleUseCase().createAppointment(obj, now);
  
      dispatch({ type: "CREATE_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_APPOINTMENT_ERROR", payload: { error: error } });
    }
}

const getAttentionWindowsByService = (id:number, date?:string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_LOADING" });
      
      const res: Array<any> = await new ScheduleUseCase().getAttentionWindowsByService(id, date);
  
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_ATTENTION_WINDOWS_BY_SERVICE_ERROR", payload: { error: error } });
    }
}

const createWindowAttention = (obj:any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "CREATE_WINDOW_ATTENTION_LOADING" });
      
      const res: any = await new ScheduleUseCase().createWindowAttention(obj);
  
      dispatch({ type: "CREATE_WINDOW_ATTENTION_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "CREATE_WINDOW_ATTENTION_ERROR", payload: { error: error } });
    }
}

const getServices = (id:number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_SERVICES_LOADING" });
      
      const res: any = await new ScheduleUseCase().getServices(id);
  
      dispatch({ type: "GET_SERVICES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_SERVICES_ERROR", payload: { error: error } });
    }
}

const getLocalities = (id:number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_LOCALITIES_LOADING" });
      
      const res: any = await new ScheduleUseCase().getLocalites(id);
  
      dispatch({ type: "GET_LOCALITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_LOCALITIES_ERROR", payload: { error: error } });
    }
}

const getPatients = () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "GET_PATIENTS_LOADING" });
      
      const res: any = await new ScheduleUseCase().getSubjects();
  
      dispatch({ type: "GET_PATIENTS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
      console.log("Error calling action", error)
      dispatch({ type: "GET_PATIENTS_ERROR", payload: { error: error } });
    }
}

export const actions: IScheduleActions = {
  getCalendarEvents,
  predifinedReservationData,
  typeOfAppointmentCreation,
  appointmentDetail,
  activeLocality,
  activeService,
  activeDay,
  changeTypePopup,
  changeStatusPopup,
  getAppointments,
  getAttentionWindows,
  createAppointment,
  getAttentionWindowsByService,
  createWindowAttention,
  getServices,
  getLocalities,
  getPatients
}
