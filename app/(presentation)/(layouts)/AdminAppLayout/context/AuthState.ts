import { IAdmin } from 'domain/core/entities/adminEntity';
import { AuthFailure } from 'domain/core/failures/auth/authFailure';

export interface IAuthState {
  getUserAuthenticated: IAuthAuthState;
}

interface IAuthAuthState {
  data: IAdmin;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IAuthState = {
  getUserAuthenticated: {
    data: {} as IAdmin,
    loading: false,
    successful: false,
    error: null,
  }
}