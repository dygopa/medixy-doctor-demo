import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";

export interface IStepByStepAppointmentState {
  step: IStepState;
  localities: IListState;
  services: IListState;
  slots: IListState;
  patients: IPatientsState;
  appointmentCreation: IObjectState;
}

interface IListState {
  data: any[] | null;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

interface IObjectState {
  data: any | null;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

interface IPatientsState {
  data: IGetSubjectsResponse;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

interface IStepState {
  data: number;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

export const initialState: IStepByStepAppointmentState = {
  step: {
    data: 0,
    loading: false,
    successful: false,
    error: null,
  },
  localities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  services: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  slots: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  patients: {
    data: {} as IGetSubjectsResponse,
    loading: false,
    successful: false,
    error: null,
  },
  appointmentCreation: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
}