import { ICIE10 } from "domain/core/entities/cie10Entity";
import { CIE10Failure, cie10FailuresEnum } from "domain/core/failures/cie10/cie10Failure";
import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";
import { cie10SupabaseToMap } from "domain/mappers/cie10/supabase/cie10SupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface ICIE10Repository {
  getCIE10(obj: { searchQuery: string; limit?: number | null }): Promise<IGetCIE10ListResponse | CIE10Failure>;
}

export class CIE10Repository implements ICIE10Repository {
  async getCIE10(obj: { searchQuery: string; limit?: number | null }): Promise<IGetCIE10ListResponse | CIE10Failure> {
    try {
      let query = supabase.from("CIE10").select("*", { count: "exact" });
      
      if (obj.searchQuery) {
        query = query.or(`or(codigo4.ilike.%${obj.searchQuery.trim().toLowerCase()}%,descripcion4.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(codigo4.ilike.%${obj.searchQuery.trim().toLowerCase()}%,descripcion4.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
      }

      if (obj.limit) {
        query = query.limit(obj.limit);
      }

      const res = await query;

      const cie10: ICIE10[] = [];

      if (res.data && res.data.length > 0) {
        await Promise.all(res.data.map(async (data: any) => {
          const cie10Map: ICIE10 = cie10SupabaseToMap(data);

          if (cie10Map.id >= 0) cie10.push(cie10Map);
        }));
      }

      const response: IGetCIE10ListResponse = {
        data: cie10,
        metadata: {
          total: res.count ?? 0,
          limit: null, 
        }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new CIE10Failure(cie10FailuresEnum.serverError);
    }
  }
  
}