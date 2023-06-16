import { ICountryLocation } from "../entities/countryEntity";

export interface IGetCountryLocationsResponse {
    data: ICountryLocation[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
