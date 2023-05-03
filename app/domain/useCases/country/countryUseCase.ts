import { ICountry } from "domain/core/entities/countryEntity";
import { CountryFailure } from "domain/core/failures/country/countryFailure";
import { CountryRepository } from "infrastructure/repositories/country/countryRepository";

export default class CountriesUseCase {
  private _repository: CountryRepository = new CountryRepository();

  async getCountries(obj: { start?: string; isNext?: string; isPrevious?: string; limit?: number; startDate?: Date; endDate?: Date; }): Promise<ICountry[]> {
    try {
      const response = await this._repository.getCountries({start: obj.start, isNext: obj.isNext, isPrevious: obj.isPrevious, limit: obj.limit, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof CountryFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
