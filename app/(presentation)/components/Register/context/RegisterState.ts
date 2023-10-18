import { RegisterFailure } from "domain/core/failures/register/registerFailure";
import { IFederalEntity } from 'domain/core/entities/federalEntitiesEntity';
import { FederalEntityFailure } from 'domain/core/failures/federalEntity/federalEntityFailure';
import { IGetMunicipalitiesResponse } from 'domain/core/response/municipalityResponse';
import { MunicipalityFailure } from 'domain/core/failures/municipality/municipalityFailure';
import { IUser } from "domain/core/entities/userEntity";
import { AuthFailure } from "domain/core/failures/auth/authFailure";

export interface IRegisterState {
  getUserAuthenticated: IAuthAuthState;
  registerUser: IRegisterUserState;
  searchCURP: IRegisterUserState;
  registerData: IRegisterUserState;
  medicalSpecialities: IRegisterUserState;
  getUserMedicalSpecialities: IRegisterUserState;
  getFederalEntities: IEditSubjectEditSubjectState;
  municipalities: IGetMunicipalitiesState;
  updatePassword: IRegisterUserState;
}

interface IRegisterUserState {
  data: string | null | Object | any;
  loading: boolean;
  successful: boolean;
  error: RegisterFailure | null; 
}

interface IEditSubjectEditSubjectState {
  data: Array<IFederalEntity>;
  loading: boolean;
  successful: boolean;
  error: FederalEntityFailure | null; 
}

interface IGetMunicipalitiesState {
  data: IGetMunicipalitiesResponse;
  loading: boolean;
  successful: boolean;
  error: MunicipalityFailure | null; 
}

interface IAuthAuthState {
  data: IUser;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IRegisterState = {
  registerUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  getUserAuthenticated: {
    data: {} as IUser,
    loading: false,
    successful: false,
    error: null,
  },
  updatePassword: {
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
  getFederalEntities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  municipalities: {
      data: {} as IGetMunicipalitiesResponse,
      loading: false,
      successful: false,
      error: null,
  },
}