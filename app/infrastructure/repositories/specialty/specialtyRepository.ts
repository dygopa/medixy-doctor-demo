import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { SpecialtyFailure, specialtyFailuresEnum } from "domain/core/failures/specialty/specialtyFailure";
import { IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import { specialtySupabaseToMap } from "domain/mappers/specialty/supabase/specialtySupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface ISpecialtyRepository {
  getSpecialties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
  }): Promise<IGetSpecialtiesResponse | SpecialtyFailure>;
}

export class SpecialtyRepository implements ISpecialtyRepository {
  async getSpecialties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
  }): Promise<IGetSpecialtiesResponse | SpecialtyFailure> {
    try {
      let query = supabase.from("Especialidades").select(`
        *
      `,
      { count: "exact" });

      if (obj.sort) {
        query = query.order(obj.sort.field, {
            ascending: obj.sort.ascending
        });
      }

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const specialties: ISpecialty[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const specialtyMap: ISpecialty = specialtySupabaseToMap(data);

              specialties.push(specialtyMap);
          }));
      }

      const response: IGetSpecialtiesResponse = {
          data: specialties,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }
}
  