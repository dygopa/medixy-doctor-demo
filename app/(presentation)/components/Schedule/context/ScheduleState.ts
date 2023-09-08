import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";

export interface IScheduleState {
  getCalendarEvents: IScheduleUserState;
  predifinedReservationData: IScheduleUserState;
  typeOfAppointmentCreation: IScheduleUserState;
  appointmentDetail: IScheduleUserState;
  cancelAppointment: IScheduleUserState;
  deleteAppointment: IScheduleUserState;
  activeLocality: IScheduleUserState;
  activePatient: IScheduleUserState;
  activeService: IScheduleUserState;
  activeDay: IScheduleUserState;
  actualDay: IScheduleUserState;
  statusPopup: IScheduleUserState;
  scheduleUser: IScheduleUserState;
  typePopupActive: IScheduleUserState;
  getAppointments: IScheduleUserState;
  getAttentionWindows: IScheduleUserState;
  getBaseAttentionWindowsByLocality: IScheduleUserState;
  createAppointment: IScheduleUserState;
  getAttentionWindowsByService: IScheduleUserState;
  createWindowAttention: IScheduleUserState;
  getServices: IScheduleUserState;
  getServicesByLocality: IScheduleUserState;
  getLocalities: IScheduleUserState;
  getLocalitiesWithServices: IScheduleUserState;
  getPatients: IScheduleUserState;
  listOfColors: IScheduleUserState;
  rescheduleAppointment: IScheduleUserState;
  slotsByAttentionWindow: IScheduleUserState;
  blockSlotInAttentionWindow: IScheduleUserState;
  unlockSlotInAttentionWindow: IScheduleUserState;
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
  activePatient: {
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
  actualDay: {
    data: new Date(),
    loading: false,
    successful: false,
    error: null,
  },
  cancelAppointment: {
    data: false,
    loading: false,
    successful: false,
    error: null,
  },
  deleteAppointment: {
    data: false,
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
  getBaseAttentionWindowsByLocality: {
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
  getLocalitiesWithServices: {
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
  listOfColors: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  rescheduleAppointment: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  slotsByAttentionWindow: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  blockSlotInAttentionWindow: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  unlockSlotInAttentionWindow: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
}