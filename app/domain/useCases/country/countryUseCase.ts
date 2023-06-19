import { ICountriesISO, ICountry } from "domain/core/entities/countryEntity";
import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { IGetCountryLocationsResponse } from "domain/core/response/countryResponse";
import { CountryRepository } from "infrastructure/repositories/country/countryRepository";
import { CountriesISORepository } from "infrastructure/repositories/country/mock/countriesRepository";

export default class CountriesUseCase {
  private _repository: CountryRepository = new CountryRepository();
  private _countriesISORepository: CountriesISORepository = new CountriesISORepository();

  async getCountries(obj: { start?: string; isNext?: string; isPrevious?: string; limit?: number; startDate?: Date; endDate?: Date; }): Promise<ICountry[]> {
    try {
      const response = await this._repository.getCountries({start: obj.start, isNext: obj.isNext, isPrevious: obj.isPrevious, limit: obj.limit, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof CountryFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCountriesISO(): Promise<ICountriesISO[]> {
    try {
      const response = await this._countriesISORepository.getCountries();

      if (response instanceof CountryFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCountryLocations(obj: { limit?: number | null; federalEntityId?: number | null; municipalityId?: number | null }): Promise<IGetCountryLocationsResponse> {
    try {
        const response = await this._repository.getCountryLocations({ limit: obj.limit, federalEntityId: obj.federalEntityId, municipalityId: obj.municipalityId });

        if (response instanceof CountryFailure) throw response;

        return response;
    } catch (error) {
        throw error;
    }
  }
}
