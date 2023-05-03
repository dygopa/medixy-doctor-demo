import { ServiceFailure } from './../../../../domain/core/failures/service/serviceFailure';
import { IService } from '../../../../domain/core/entities/serviceEntity';

export interface IServicesState {
  getCategories: IServicesServicesState;
  getUserMedicalCenters: IServicesServicesState;
  getUserServices: IServicesServicesState;
  getService: IServicesServicesState;
  createUserService: IServicesServicesState;
  updateService: IServicesServicesState;
  deleteService: IServicesServicesState;
}

interface IServicesServicesState {
  data: Array<any> | string;
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
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
  createUserService: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
  updateService: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
  deleteService: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
}