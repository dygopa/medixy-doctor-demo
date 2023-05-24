import { AuthFailure } from "domain/core/failures/auth/authFailure";

export interface IFormularyState {
  step: ISignInUserState;
  checkOTP: ISignInUserState;
  updateUserOTP: ISignInUserState;
}

interface ISignInUserState {
  data: any | string | number | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IFormularyState = {
  step: {
    data: 0,
    loading: false,
    successful: false,
    error: null,
  },
  checkOTP: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  updateUserOTP: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
}