import { IUser } from 'domain/core/entities/userEntity';
import { AuthFailure } from 'domain/core/failures/auth/authFailure';

export interface IAuthState {
  getUserAuthenticated: IAuthAuthState;
  userFCMToken: IAuthFCMTokenState;
}

interface IAuthAuthState {
  data: IUser;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

interface IAuthFCMTokenState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IAuthState = {
  getUserAuthenticated: {
    data: {} as IUser,
    loading: false,
    successful: false,
    error: null,
  },
  userFCMToken: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
}