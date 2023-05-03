import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";

export interface IScheduleState {
  statusPopup: IScheduleUserState;
  scheduleUser: IScheduleUserState;
  typePopupActive: IScheduleUserState;
}

interface IScheduleUserState {
  data: any | null;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

export const initialState: IScheduleState = {
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
  }
}