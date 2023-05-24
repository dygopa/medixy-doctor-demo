import { IMedicalMeasure } from 'domain/core/entities/medicalMeasureEntity';
import { MedicalMeasureFailure, medicalMeasureFailuresEnum } from 'domain/core/failures/medicalMeasure/medicalMeasureFailure';
import { ICreateMedicalMeasureResponse } from 'domain/core/response/medicalMeasureResponses';
import { fromMedicalMeasureSupabaseDocumentData } from "domain/mappers/medicalMeasure/supabase/medicalMeasureSupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalMeasureRepository {
  createMedicalMeasure(medicalMeasure: IMedicalMeasure): Promise<ICreateMedicalMeasureResponse | MedicalMeasureFailure>;
}

export class MedicalMeasureRepository implements IMedicalMeasureRepository {
    async createMedicalMeasure(medicalMeasure: IMedicalMeasure): Promise<ICreateMedicalMeasureResponse | MedicalMeasureFailure> {
      try {
        if (medicalMeasure.medicalMeasureTypeId === 0) {
          const res = await supabase.from("TipoMediciones").select().eq("tipo", medicalMeasure.medicalMeasureType.type).limit(1);

          if (res.data && res.data.length > 0) medicalMeasure.medicalMeasureTypeId = res.data[0].id;
        } 

        const res = await supabase.from("Mediciones").insert(fromMedicalMeasureSupabaseDocumentData(medicalMeasure)).select();

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
  