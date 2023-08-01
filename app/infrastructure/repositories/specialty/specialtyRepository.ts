import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { SpecialtyFailure, specialtyFailuresEnum } from "domain/core/failures/specialty/specialtyFailure";
import { ICreateSpecialtyResponse, IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import { fromSpecialtySupabaseDocumentData, specialtySupabaseToMap } from "domain/mappers/specialty/supabase/specialtySupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface ISpecialtyRepository {
  getSpecialties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    doctorId?: number | null;
    generics?: boolean | null
    searchQuery?: string | null;
  }): Promise<IGetSpecialtiesResponse | SpecialtyFailure>;
  createSpecialty(specialty: ISpecialty): Promise<ICreateSpecialtyResponse | SpecialtyFailure>;
}

export class SpecialtyRepository implements ISpecialtyRepository {
  async getSpecialties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    doctorId?: number | null;
    generics?: boolean | null;
    searchQuery?: string | null;
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

      if (obj.searchQuery) {
        query = query.or(`or(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombre.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
      }

      if (obj.doctorId) {
        
      }

      if (typeof obj.generics !== "undefined" && !obj.doctorId) {
        query = query.or(`doctorId.is.null`)
      }

      if (typeof obj.generics !== "undefined" && obj.doctorId) {
        query = query.or(`doctorId.eq.${obj.doctorId},doctorId.is.null`)
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

  async createSpecialty(specialty: ISpecialty): Promise<ICreateSpecialtyResponse | SpecialtyFailure> {
    try {
      const res = await supabase.from("Especialidades").insert(fromSpecialtySupabaseDocumentData(specialty)).select();

      if (res.error) return new SpecialtyFailure(specialtyFailuresEnum.serverError);

      if (res.data && res.data.length > 0) specialty.id = res.data[0].id;

      const response: ICreateSpecialtyResponse = {
          data: specialty,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }
}
  