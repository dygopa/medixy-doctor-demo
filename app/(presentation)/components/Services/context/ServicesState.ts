import { ServiceFailure } from './../../../../domain/core/failures/service/serviceFailure';
import { IService, IServiceCategory, IServiceToLocality } from '../../../../domain/core/entities/serviceEntity';

export interface IServicesState {
  getCategories: ICategoriesState;
  getUserMedicalCenters: IServicesServicesState;
  getUserServices: IServicesServicesState;
  getService: IServiceServicesState;
  createUserService: IServiceServicesState;
  updateService: IServiceServicesState;
  deleteService: IServiceServicesState;
  getLocalitiesToService: IGetLocalitiesToService;
}

interface IServicesServicesState {
  data: Array<any> | string;
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
}

interface ICategoriesState {
  data: Array<any>;
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
}

interface IServiceServicesState {
  data: IService;
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
}

interface IGetLocalitiesToService {
  data: IServiceToLocality[];
  loading: boolean;
  successful: boolean;
  error: ServiceFailure | null; 
}

export const initialState: IServicesState = {
  getCategories: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getUserMedicalCenters: {
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
  getService: {
    data: {} as IService,
    loading: false,
    successful: false,
    error: null,
  },
  createUserService: {
    data: {} as IService,
    loading: false,
    successful: false,
    error: null,
  },
  updateService: {
    data: {} as IService,
    loading: false,
    successful: false,
    error: null,
  },
  deleteService: {
    data: {} as IService,
    loading: false,
    successful: false,
    error: null,
  },
  getLocalitiesToService: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}