import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { MunicipalityFailure, municipalityFailuresEnum } from "domain/core/failures/municipality/municipalityFailure";
import { IGetMunicipalitiesResponse, IGetMunicipalityResponse } from "domain/core/response/municipalityResponse";
import { municipalitySupabaseToMap } from "domain/mappers/municipality/supabase/municipalitySupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IMunicipalityRepository {
  getMunicipalities(obj: {  searchQuery?: string | null; limit?: number | null; federalEntityId?: number | null }): Promise<IGetMunicipalitiesResponse | MunicipalityFailure>;
}

export class MunicipalityRepository implements IMunicipalityRepository {
  async getMunicipalities(obj: {  searchQuery?: string | null; limit?: number | null; federalEntityId?: number | null }): Promise<IGetMunicipalitiesResponse | MunicipalityFailure > {
    try {
      let query = supabase.from("Municipios").select("*", { count: "exact" }).order("nombre", {ascending: true});

      if (obj.searchQuery) {
        query = query.or(`or(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
      }

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

  async getMunicipalityById(obj: { id: number }): Promise<IGetMunicipalityResponse | MunicipalityFailure > {
    try {
      const res = await supabase.from("Municipios").select("*", { count: "exact" }).eq("id", obj.id);

      let municipality: IMunicipality = {} as IMunicipality;

      if (res.data && res.data.length > 0) municipality = municipalitySupabaseToMap(res.data[0]);

      const response: IGetMunicipalityResponse = {
        data: municipality,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new MunicipalityFailure(municipalityFailuresEnum.serverError);
    }
  }
}