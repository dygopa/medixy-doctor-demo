import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";

export interface IScheduleState {
  getCalendarEvents: IScheduleUserState;
  predifinedReservationData: IScheduleUserState;
  typeOfAppointmentCreation: IScheduleUserState;
  appointmentDetail: IScheduleUserState;
  activeLocality: IScheduleUserState;
  activeService: IScheduleUserState;
  activeDay: IScheduleUserState;
  statusPopup: IScheduleUserState;
  scheduleUser: IScheduleUserState;
  typePopupActive: IScheduleUserState;
  getAppointments: IScheduleUserState;
  getAttentionWindows: IScheduleUserState;
  createAppointment: IScheduleUserState;
  getAttentionWindowsByService: IScheduleUserState;
  createWindowAttention: IScheduleUserState;
  getServices: IScheduleUserState;
  getServicesByLocality: IScheduleUserState;
  getLocalities: IScheduleUserState;
  getPatients: IScheduleUserState;
}

interface IScheduleUserState {
  data: any | null;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

export const initialState: IScheduleState = {
  getCalendarEvents: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  typeOfAppointmentCreation: {
    data: 0,
    loading: false,
    successful: false,
    error: null,
  },
  predifinedReservationData: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  appointmentDetail: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  activeLocality: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  activeService: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  activeDay: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  statusPopup: {
    data: false,
    loading: false,
    successful: false,
    error: null,
  },
  scheduleUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  typePopupActive: {
    data: 0,
    loading: false,
    successful: false,
    error: null,
  },
  getAppointments: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getAttentionWindows: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  createAppointment: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  getAttentionWindowsByService: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  createWindowAttention: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  getServices: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getServicesByLocality: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getLocalities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getPatients: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}