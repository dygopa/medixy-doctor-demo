import { AuthFailure } from "domain/core/failures/auth/authFailure";


export interface ISignOutState {
  signOutUserState: ISignOutUserState;
}

interface ISignOutUserState {
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null;
}

export const initialState = {
  signOutUserState: {
    loading: false,
    successful: false,
    error: null,
  },
};
