import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";

export interface IPopupState {
  statusPopup: IPopupPopupState;
  changeChildrenPopup: IPopupPopupState;
}

interface IPopupPopupState {
  data: any | null;
  loading: boolean;
  successful: boolean;
  error: ScheduleFailure | null; 
}

export const initialState: IPopupState = {
  statusPopup: {
    data: false,
    loading: false,
    successful: false,
    error: null,
  },
  changeChildrenPopup: {
    data: {
      component: {},
      title: "",
    },
    loading: false,
    successful: false,
    error: null,
  }
}