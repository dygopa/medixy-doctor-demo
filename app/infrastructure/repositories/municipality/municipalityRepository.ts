import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { MunicipalityFailure, municipalityFailuresEnum } from "domain/core/failures/municipality/municipalityFailure";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import { municipalitySupabaseToMap } from "domain/mappers/municipality/supabase/municipalitySupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IMunicipalityRepository {
  getMunicipalities(obj: { limit?: number | null; federalEntityId?: number | null }): Promise<IGetMunicipalitiesResponse | MunicipalityFailure>;
}

export class MunicipalityRepository implements IMunicipalityRepository {
  async getMunicipalities(obj: { limit?: number | null; federalEntityId?: number | null }): Promise<IGetMunicipalitiesResponse | MunicipalityFailure > {
    try {
      let query = supabase.from("Municipios").select("*", { count: "exact" });

      if (obj.federalEntityId) {
        query = query.eq("entidadFederativaId", obj.federalEntityId);
      }

      if (obj.limit) {
        query = query.limit(obj.limit);
      }

      const res = await query;

      const municipalities: IMunicipality[] = [];

      if (res.data && res.data.length > 0) {
        await Promise.all(res.data.map(async (data: any) => {
          const municipalityMap: IMunicipality = municipalitySupabaseToMap(data);

          if (municipalityMap.id > 0) municipalities.push(municipalityMap);
        }));
      }

      const response: IGetMunicipalitiesResponse = {
        data: municipalities,
        metadata: {
          total: res.count ?? 0,
          limit: obj.limit ?? 0,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new MunicipalityFailure(municipalityFailuresEnum.serverError);
    }
  }
}