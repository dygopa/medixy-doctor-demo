import { IRegister } from './../../../../domain/core/entities/registerEntity';
import { RegisterFailure } from "domain/core/failures/register/registerFailure";

export interface IRegisterState {
  registerUser: IRegisterUserState;
  searchCURP: IRegisterUserState;
  registerData: IRegisterUserState;
}

interface IRegisterUserState {
  data: string | null | Object;
  loading: boolean;
  successful: boolean;
  error: RegisterFailure | null; 
}

export const initialState: IRegisterState = {
  registerUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  searchCURP: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  registerData: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
}