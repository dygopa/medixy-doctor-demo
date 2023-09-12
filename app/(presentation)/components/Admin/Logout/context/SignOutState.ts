import { AuthFailures } from 'domain/core/failures/auth/authFailures';

export interface ISignOutState {
  signOutUserState: ISignOutUserState;
}

interface ISignOutUserState {
  loading: boolean;
  successful: boolean;
  error: AuthFailures | null;
}

export const initialState = {
  signOutUserState: {
    loading: false,
    successful: false,
    error: null,
  },
};
