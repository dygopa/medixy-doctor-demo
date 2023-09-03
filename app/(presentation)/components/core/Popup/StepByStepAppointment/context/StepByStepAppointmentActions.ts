import ScheduleUseCase from "domain/useCases/schedule/scheduleUseCase";
import { Dispatch } from "react";

export interface IStepByStepAppointmentActions {
  setStep: Function;
  getLocalities: Function;
  getServices: Function;
  getSlots: Function;
  getPatients: Function;
  createAppointment: Function;
}

const setStep = (step: number) => async (dispatch: Dispatch<any>) => 
  dispatch({ type: "CHANGED_STEP", payload: { data: step } });

const getLocalities = (id: number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_LOCALITIES_LOADING" });

    const res: any = await new ScheduleUseCase().getLocalites(id);

    dispatch({ type: "GET_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_LOCALITIES_ERROR", payload: { error: error } });
  }
}

const getServices = ( obj:{ userId: number; localityId: number; } ) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICES_LOADING" });

    const res: any = await new ScheduleUseCase().getServicesByLocality(obj.userId, obj.localityId);

    dispatch({ type: "GET_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SERVICES_ERROR", payload: { error: error } });
  }
}

const getSlots = (obj: { serviceId: number; date: string; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SLOTS_LOADING" });

    const res: any = await new ScheduleUseCase().getAttentionWindowsByService(obj.serviceId, obj.date);

    dispatch({ type: "GET_SLOTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SLOTS_ERROR", payload: { error: error } });
  }
}

const getPatients = (obj: { userId?: number | string | undefined }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_PATIENTS_LOADING" });

    const res: any = await new ScheduleUseCase().getSubjects({
      userId: obj.userId
    });

    dispatch({ type: "GET_PATIENTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_PATIENTS_ERROR", payload: { error: error } });
  }
}

const createAppointment = (obj: any, now?: boolean) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_APPOINTMENT_LOADING" });

    const res: any = await new ScheduleUseCase().createAppointment(obj, now);

    dispatch({ type: "CREATE_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_APPOINTMENT_ERROR", payload: { error: error } });
  }
}

export const actions: IStepByStepAppointmentActions = {
  setStep,
  getLocalities,
  getServices,
  getSlots,
  getPatients,
  createAppointment,
}
