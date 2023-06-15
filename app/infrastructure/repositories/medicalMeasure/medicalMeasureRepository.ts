import { IMedicalMeasure, IMedicalMeasureType } from 'domain/core/entities/medicalMeasureEntity';
import { MedicalMeasureFailure, medicalMeasureFailuresEnum } from 'domain/core/failures/medicalMeasure/medicalMeasureFailure';
import { ICreateMedicalMeasureResponse, IGetMedicalMeasuresResponse } from 'domain/core/response/medicalMeasureResponses';
import { fromMedicalMeasureSupabaseDocumentData, medicalMeasureSupabaseToMap, medicalMeasureTypeSupabaseToMap } from "domain/mappers/medicalMeasure/supabase/medicalMeasureSupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalMeasureRepository {
  getMedicalMeasures(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetMedicalMeasuresResponse | MedicalMeasureFailure>;
  createMedicalMeasure(medicalMeasure: IMedicalMeasure): Promise<ICreateMedicalMeasureResponse | MedicalMeasureFailure>;
}

export class MedicalMeasureRepository implements IMedicalMeasureRepository {
  async getMedicalMeasures(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetMedicalMeasuresResponse | MedicalMeasureFailure> {
    try {
      let query = supabase.from("SignosVitales").select(`
        *,
        TiposSignosVitales (*)
      `,
      { count: "exact" });

      if (obj.sort) {
          query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
          });
      }

      if (obj.subjectId) {
        query = query.eq("sujetoId", obj.subjectId);
      }

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const medicalMeasures: IMedicalMeasure[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const medicalMeasureMap: IMedicalMeasure = medicalMeasureSupabaseToMap(data);

              if (data?.TiposSignosVitales) {
                const medicalMeasureType: IMedicalMeasureType = medicalMeasureTypeSupabaseToMap(data.TiposSignosVitales);
      
                if (medicalMeasureType.id >= 0) medicalMeasureMap.medicalMeasureType = medicalMeasureType;
              }

              medicalMeasures.push(medicalMeasureMap);
          }));
      }

      const response: IGetMedicalMeasuresResponse = {
          data: medicalMeasures,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalMeasureFailure(medicalMeasureFailuresEnum.serverError);
    }
  }

    async createMedicalMeasure(medicalMeasure: IMedicalMeasure): Promise<ICreateMedicalMeasureResponse | MedicalMeasureFailure> {
      try {
        if (medicalMeasure.medicalMeasureTypeId === 0) {
          const res = await supabase.from("TiposSignosVitales").select().eq("tipo", medicalMeasure.medicalMeasureType.type).limit(1);

          if (res.data && res.data.length > 0) medicalMeasure.medicalMeasureTypeId = res.data[0].id;
        } 

        const res = await supabase.from("SignosVitales").insert(fromMedicalMeasureSupabaseDocumentData(medicalMeasure)).select();

        if (res.error) return new MedicalMeasureFailure(medicalMeasureFailuresEnum.serverError);

        if (res.data && res.data.length > 0) medicalMeasure.id = res.data[0].id;

        const response: ICreateMedicalMeasureResponse = {
            data: medicalMeasure,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new MedicalMeasureFailure(medicalMeasureFailuresEnum.serverError);
      }
    }
}
  