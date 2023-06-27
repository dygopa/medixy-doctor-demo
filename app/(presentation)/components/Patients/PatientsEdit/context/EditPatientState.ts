import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";

export interface IEditSubjectState {
    subject: IGetSubjectState;
    getFederalEntities: IEditSubjectEditSubjectState;
    municipalities: IGetMunicipalitiesState;
    countryLocations: IGetCountryLocationsState;
    editSubject: IUpdateSubjectState;
    updateAvatar: ISubjectAvatarState;
}

interface IGetSubjectState {
    data: ISubject | null;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure| null; 
}

interface IGetCountryLocationsState {
    data: IGetCountryLocationsResponse;
    loading: boolean;
    successful: boolean;
    error: CountryFailure | null; 
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

interface IUpdateSubjectState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

interface ISubjectAvatarState{
    data: string;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

export const initialState: IEditSubjectState = {
    subject: {
        data: null,
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
    editSubject: {
        data: false,
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
    updateAvatar: {
        data: "",
        loading: false,
        successful: false,
        error: null,
    },

}