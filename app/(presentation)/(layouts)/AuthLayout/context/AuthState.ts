import { IUser } from 'domain/core/entities/userEntity';
import { AuthFailure } from 'domain/core/failures/auth/authFailure';

export interface IAuthState {
  getUserAuthenticated: IAuthAuthState;
}

interface IAuthAuthState {
  data: IUser;
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
  }
}