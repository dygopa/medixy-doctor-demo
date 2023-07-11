import { IRegister } from './../../../../domain/core/entities/registerEntity';
import { RegisterFailure } from "domain/core/failures/register/registerFailure";
import { IFederalEntity } from 'domain/core/entities/federalEntitiesEntity';
import { FederalEntityFailure } from 'domain/core/failures/federalEntity/federalEntityFailure';
import { IGetMunicipalitiesResponse } from 'domain/core/response/municipalityResponse';
import { MunicipalityFailure } from 'domain/core/failures/municipality/municipalityFailure';

export interface IRegisterState {
  registerUser: IRegisterUserState;
  searchCURP: IRegisterUserState;
  registerData: IRegisterUserState;
  medicalSpecialities: IRegisterUserState;
  getUserMedicalSpecialities: IRegisterUserState;
  getFederalEntities: IEditSubjectEditSubjectState;
  municipalities: IGetMunicipalitiesState;
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