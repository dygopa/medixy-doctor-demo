import { LocalityFailure } from './../../../../domain/core/failures/locality/localityFailure';
import { ILocality } from '../../../../domain/core/entities/localityEntity';
import { IFederalEntity } from 'domain/core/entities/federalEntitiesEntity';
import { FederalEntityFailure } from 'domain/core/failures/federalEntity/federalEntityFailure';
import { IGetMunicipalitiesResponse } from 'domain/core/response/municipalityResponse';
import { MunicipalityFailure } from 'domain/core/failures/municipality/municipalityFailure';
import { IGetCountryLocationsResponse } from 'domain/core/response/countryResponse';
import { CountryFailure } from 'domain/core/failures/country/countryFailure';
import { ServiceFailure } from 'domain/core/failures/service/serviceFailure';

export interface ILocalitiesState {
  getMedicalCenters: ILocalitiesLocalitiesState;
  getFederalEntities: IEditSubjectEditSubjectState;
  municipalities: IGetMunicipalitiesState;
  countryLocations: IGetCountryLocationsState;
  getCountryStates: ILocalitiesLocalitiesState;
  getUserLocalities: ILocalitiesLocalitiesState;
  createUserLocality: ILocalitiesCreateState;
  updateUserLocality: ILocalitiesLocalityState;
  gettingUserLocality: ILocalitiesLocalityState;
  localityData: ILocalitiesLocalityState;
  getUserBaseServices: IServicesServicesState;
  getUserServices: IServicesServicesState;
}

interface IServicesServicesState {
  data: Array<any> | string;
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
}

interface ILocalitiesLocalitiesState {
  data: ILocality[] | ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface ILocalitiesCreateState {
  data: ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface ILocalitiesLocalityState {
  data: ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IEditSubjectEditSubjectState {
  data: Array<IFederalEntity>;
  loading: boolean;
  successful: boolean;
  error: FederalEntityFailure| null; 
}

interface IGetMunicipalitiesState {
  data: IGetMunicipalitiesResponse;
  loading: boolean;
  successful: boolean;
  error: MunicipalityFailure | null; 
}

interface IGetCountryLocationsState {
  data: IGetCountryLocationsResponse;
  loading: boolean;
  successful: boolean;
  error: CountryFailure | null; 
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
    data: {} as ILocality,
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
  countryLocations: {
      data: {} as IGetCountryLocationsResponse,
      loading: false,
      successful: false,
      error: null,
  },
  getUserBaseServices: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getUserServices: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}