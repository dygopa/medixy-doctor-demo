import { IUser } from '../../../../domain/core/entities/userEntity';
import { UserFailure } from "domain/core/failures/user/userFailure";

export interface IUserState {
  updateUserData: IUserUserState;
  medicalSpecialities: IUserUserState;
  getUserMedicalSpecialities: IUserUserState;
  createMedicalSpeciality: IUserUserState;
  updateMedicalSpeciality: IUserUserState;
  deleteMedicalSpeciality: IUserUserState;
  updateAvatar: IUserUserState;
}

interface IUserUserState {
  data: string | null | Object | Array<any>;
  loading: boolean;
  successful: boolean;
  error: UserFailure | null; 
}

export const initialState: IUserState = {
  updateUserData: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  medicalSpecialities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getUserMedicalSpecialities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  createMedicalSpeciality: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  updateMedicalSpeciality: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  deleteMedicalSpeciality: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  updateAvatar: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
}