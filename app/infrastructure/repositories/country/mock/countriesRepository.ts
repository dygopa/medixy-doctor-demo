import { ICountriesISO } from "domain/core/entities/countryEntity";
import { CountryFailure, countryFailuresEnum } from "domain/core/failures/country/countryFailure";
import { countriesToMap } from "domain/mappers/country/mock/countriesMockMapper";
import countriesJSON from "infrastructure/data/contries.json"

export default interface ICountriesRepository {
  getCountries(): Promise<ICountriesISO[] | CountryFailure>;
}

export class CountriesISORepository implements ICountriesRepository {
  async getCountries(): Promise<ICountriesISO[] | CountryFailure> {
    try {
      let snapshots = countriesJSON;
      
      const countries: ICountriesISO[] = [];

      if (snapshots.length > 0) {
        await Promise.all(snapshots.map(async (snapshot: any) => {
          const countriesMap: ICountriesISO = countriesToMap(snapshot);
  
          if (countriesMap.iso.length >= 0) countries.push(countriesMap);
        }));
      }
      return countries;

    } catch (error) {
      const exception = error as any;
      return new CountryFailure(countryFailuresEnum.serverError)
    }
  }
}