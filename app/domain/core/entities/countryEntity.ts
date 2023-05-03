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

