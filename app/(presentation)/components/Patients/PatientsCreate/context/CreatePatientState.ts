import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";

export interface ICreateSubjectState {
    createSubject: ISubjectCreateSubjectState;
    getFederalEntities: IEditSubjectEditSubjectState;
    municipalities: IGetMunicipalitiesState;
    countryLocations: IGetCountryLocationsState;
}

interface ISubjectCreateSubjectState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
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

export const initialState: ICreateSubjectState = {
    createSubject: {
        data: false,
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
}