import { ICountriesISO } from "domain/core/entities/countryEntity";

export function countriesToMap(data:ICountriesISO) {
    return {
        iso: data?.iso ?? "",
        name: data?.name ?? "",
    } as ICountriesISO;
}