import { AuthFailure } from "domain/core/failures/auth/authFailure";

export interface IFormularyState {
  signInUser: ISignInUserState;
}

interface ISignInUserState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IFormularyState = {
  signInUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}