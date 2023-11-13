import { IService } from "domain/core/entities/serviceEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";
import { ServiceFailure } from "domain/core/failures/service/serviceFailure";

export interface IStepByStepState {
  getSteps: IStepsState;
  getStepsMessages: IStepsState;
  createUserSteps: IStepsState;
  openPopup: IPopupState;
  openPopupText: IPopupTextState;
  openPopupDisabledButton: IPopupDisabledButtonState;
  // getService: IGetServiceState;
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

interface IPopupTextState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

interface IPopupDisabledButtonState {
  data: boolean;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

/* interface IGetServiceState {
  data: IService[];
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
} */

export const initialState: IStepByStepState = {
  getSteps: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getStepsMessages: {
    data: [],
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
  openPopupText: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  openPopupDisabledButton: {
    data: false,
    loading: false,
    successful: false,
    error: null,
  },
 /* getService: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  }, */
}