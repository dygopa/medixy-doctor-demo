import { AuthFailure } from "domain/core/failures/auth/authFailure";

export interface IStepByStepState {
  getSteps: IStepsState;
  createUserSteps: IStepsState;
  openPopup: IPopupState;
}

interface IStepsState {
  data: any | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

interface IPopupState {
  data: boolean;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IStepByStepState = {
  getSteps: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  createUserSteps: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  openPopup: {
    data: false,
    loading: false,
    successful: false,
    error: null,
  },
}