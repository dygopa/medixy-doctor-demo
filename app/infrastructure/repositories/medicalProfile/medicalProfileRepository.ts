import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";
import { MedicalProfileFailure, medicalProfileFailuresEnum } from "domain/core/failures/medicalProfile/medicalProfileFailure";
import { IGetMedicalProfilesResponse } from "domain/core/response/medicalProfileResponse";
import { medicalProfileSupabaseToMap } from "domain/mappers/medicalProfile/supabase/medicalProfileSupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IMedicalProfileRepository {
  getMedicalProfiles(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    searchQuery?: string | null;
  }): Promise<IGetMedicalProfilesResponse | MedicalProfileFailure>;
}

export class MedicalProfileRepository implements IMedicalProfileRepository {
  async getMedicalProfiles(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    searchQuery?: string | null;
  }): Promise<IGetMedicalProfilesResponse | MedicalProfileFailure> {
    try {
      let query = supabase.from("PerfilesMedicos").select(`
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

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const medicalProfiles: IMedicalProfile[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const medicalProfileMap: IMedicalProfile = medicalProfileSupabaseToMap(data);

              medicalProfiles.push(medicalProfileMap);
          }));
      }

      const response: IGetMedicalProfilesResponse = {
          data: medicalProfiles,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalProfileFailure(medicalProfileFailuresEnum.serverError);
    }
  }
}
  