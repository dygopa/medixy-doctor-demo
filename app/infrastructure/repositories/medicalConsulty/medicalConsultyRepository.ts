import { IDiagnosis } from 'domain/core/entities/diagnosis';
import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { MedicalConsultyFailure, medicalConsultyFailuresEnum } from 'domain/core/failures/medicalConsulty/medicalConsultyFailure';
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse } from 'domain/core/response/medicalConsultyResponse';
import { diagnosisSupabaseToMap } from 'domain/mappers/diagnosis/diagnosisSupabaseMapper';
import { fromMedicalConsultySupabaseDocumentData, medicalConsultySupabaseToMap } from "domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalConsultyRepository {
  getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure>;
  createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure>;
}

export class MedicalConsultyRepository implements IMedicalConsultyRepository {
  async getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure> {
    try {
      let query = supabase.from("ConsultasMedicas").select(`
      *,
      Diagnosticos (*)
    `,
    { count: "exact" });

      if (obj.sort) {
          query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
          });
      }

      if (obj.patientId) {
        query = query.eq("pacienteId", obj.patientId);
      }

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const medicalConsulties: IMedicalConsulty[] = [];
      

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const medicalConsultyMap: IMedicalConsulty = medicalConsultySupabaseToMap(data);

              if (data.Diagnosticos?.length > 0) {
                data.Diagnosticos.forEach((diagnosisData: any) => {
                  const diagnose: IDiagnosis = diagnosisSupabaseToMap(diagnosisData);
      
                  if (diagnose.id >= 0) medicalConsultyMap?.diagnose?.push(diagnose);
                });
              }

              medicalConsulties.push(medicalConsultyMap);
          }));
      }

      const response: IGetMedicalConsultiesResponse = {
          data: medicalConsulties,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }

    async createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure> {
      try {
        const res = await supabase.from("ConsultasMedicas").insert(fromMedicalConsultySupabaseDocumentData(medicalConsulty)).select();

        if (res.error) return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);

        if (res.data && res.data.length > 0) medicalConsulty.id = res.data[0].id;

        const response: ICreateMedicalConsultyResponse = {
            data: medicalConsulty,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
      }
    }
}
  