import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { MedicalConsultyFailure, medicalConsultyFailuresEnum } from 'domain/core/failures/medicalConsulty/medicalConsultyFailure';
import { ICreateMedicalConsultyResponse } from 'domain/core/response/medicalConsultyResponse';
import { fromMedicalConsultySupabaseDocumentData } from "domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalConsultyRepository {
  createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure>;
}

export class MedicalConsultyRepository implements IMedicalConsultyRepository {
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
  