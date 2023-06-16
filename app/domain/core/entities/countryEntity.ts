import { IFederalEntity } from "./federalEntitiesEntity";

export interface ICountry {
    countryId: string;
    phoneCode: string;
    textCode: string;
    juridicPersonId: string[];
    naturalPersonId: string[];
    pointValue: string;
    currency: string;
    cities: string[];
    createdOn: any | null;
    updatedOn: any | null;
    deletedOn: any | null;
}

export interface ICountriesISO {
    iso: string;
    name: string;
}

export interface ICountryLocation {
    id: number;
    municipalityId: number;
    name: string;
    federalEntityId: number;
    federalEntity: IFederalEntity;
}