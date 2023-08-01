import { IUser } from '../../../../domain/core/entities/userEntity';
import { UserFailure } from "domain/core/failures/user/userFailure";
import { ICountriesISO } from 'domain/core/entities/countryEntity';
import { CountryFailure} from 'domain/core/failures/country/countryFailure';
import { SpecialtyFailure } from 'domain/core/failures/specialty/specialtyFailure';

export interface IUserState {
  updateUserData: IUserUserState;
  medicalSpecialities: IMedicalSpecialitiesState;
  getUserMedicalSpecialities: IUserUserState;
  createMedicalSpeciality: IUserUserState;
  updateMedicalSpeciality: IUserUserState;
  deleteMedicalSpeciality: IUserUserState;
  updateAvatar: IUserUserState;
  getCountriesISO: IGetCountriesISOState;
  createSpecialty: ICreateSpecialtyState;
}

interface IGetCountriesISOState {
  data: Array<ICountriesISO>;
  loading: boolean;
  successful: boolean;
  error: CountryFailure| null;
}
interface IUserUserState {
  data: string | null | Object | Array<any>;
  loading: boolean;
  successful: boolean;
  error: UserFailure | null; 
}

interface IMedicalSpecialitiesState {
  data: Array<any>;
  loading: boolean;
  successful: boolean;
  error: UserFailure | null; 
}

interface ICreateSpecialtyState {
  loading: boolean;
  successful: boolean;
  error: SpecialtyFailure | null; 
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
  getCountriesISO: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  createSpecialty: {
    loading: false,
    successful: false,
    error: null,
  },
}