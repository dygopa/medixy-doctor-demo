import { ICountry } from "domain/core/entities/countryEntity";
import { CountryFailure, countryFailuresEnum } from "domain/core/failures/country/countryFailure";
import { countrySupabaseToMap } from "domain/mappers/country/supabase/countrySupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface ICountryRepository {
  getCountries(obj: { start?: string | undefined; isNext?: string | undefined; isPrevious?: string | undefined; limit?: number | undefined; startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<ICountry[] | CountryFailure>;
}

export class CountryRepository implements ICountryRepository {
  async getCountries(obj: { start?: string; isNext?: string; isPrevious?: string; limit?: number; startDate?: Date; endDate?: Date }): Promise<ICountry[] | CountryFailure> {
    try {
        let query = supabase.from("Ciudad").select();

        if (obj.start) {
          query = query.order('ciudadId');
        }

        if (obj.startDate || obj.endDate) {
          query = query.order("fechaCreacion");
        }

        if (obj.startDate) {
          query = query.gte("fechaCreacion", obj.startDate.toISOString());
        }

        if (obj.endDate) {
          query = query.lte("fechaCreacion", obj.endDate.toISOString());
        }

        if (obj.start) {
          query = query.rangeAdjacent("ciudadId", obj.start);
        }

        if (obj.limit) {
          query = query.limit(obj.limit ?? 10);
        }

        const snapshots = await query;

        const countries: ICountry[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
          await Promise.all(snapshots.data.map(async (snapshot: any) => {
            const countryMap: ICountry = countrySupabaseToMap(snapshot);

            if (countryMap.countryId.length > 0) countries.push(countryMap);
          }));
        }

        return countries;
    } catch (error) { 
      const exception = error as any;
      return new CountryFailure(countryFailuresEnum.serverError);
    }
  }
}
