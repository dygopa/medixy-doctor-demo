import { LocalityFailure } from './../../../../domain/core/failures/locality/localityFailure';
import { ILocality } from '../../../../domain/core/entities/localityEntity';

export interface ILocalitiesState {
  getMedicalCenters: ILocalitiesLocalitiesState;
  getCountryStates: ILocalitiesLocalitiesState;
  getUserLocalities: ILocalitiesLocalitiesState;
  createUserLocality: ILocalitiesLocalitiesState;
  updateUserLocality: ILocalitiesLocalitiesState;
  gettingUserLocality: ILocalitiesLocalitiesState;
  localityData: ILocalitiesLocalitiesState;
}

interface ILocalitiesLocalitiesState {
  data: Array<ILocality> | Array<any> | string | ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: ILocalitiesState = {
  getMedicalCenters: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getCountryStates: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getUserLocalities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  createUserLocality: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  updateUserLocality: {
    data: {} as ILocality,
    loading: false,
    successful: false,
    error: null,
  },
  gettingUserLocality: {
    data: {} as ILocality,
    loading: false,
    successful: false,
    error: null,
  },
  localityData: {
    data: {} as ILocality,
    loading: false,
    successful: false,
    error: null,
  },
}