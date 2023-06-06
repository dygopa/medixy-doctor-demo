import { IMedicalRecord, IMedicalRecordValue } from 'domain/core/entities/medicalRecordEntity';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalRecordResponse } from 'domain/core/response/medicalRecordResponse';
import { fromMedicalRecordSupabaseDocumentData, fromMedicalRecordValueSupabaseDocumentData } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalRecordRepository {
  createMedicalRecord(medicalRecord: IMedicalRecord): Promise<ICreateMedicalRecordResponse | MedicalRecordFailure>;
}

export class MedicalRecordRepository implements IMedicalRecordRepository {
    async createMedicalRecord(medicalRecord: IMedicalRecord): Promise<ICreateMedicalRecordResponse | MedicalRecordFailure> {
      try {
        const resRecordTypes = await supabase.from("TiposAntecedentes").select("*").eq("nombre", medicalRecord.medicalRecordType.name).limit(1);

        if (resRecordTypes.error) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);

        if (resRecordTypes.data && resRecordTypes.data.length > 0) medicalRecord.medicalRecordTypeId = resRecordTypes.data[0].id;

        const res = await supabase.from("Antecedentes").insert(fromMedicalRecordSupabaseDocumentData(medicalRecord)).select();

        if (res.error) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);

        if (res.data && res.data.length > 0) medicalRecord.id = res.data[0].id;

        console.log(medicalRecord.medicalRecordValues.length)

        if (medicalRecord.medicalRecordValues.length > 0) {
            console.log("aca")
            await Promise.all((medicalRecord.medicalRecordValues.map(async (medicalRecordValue: IMedicalRecordValue) => {
                medicalRecordValue.medicalRecordId = medicalRecord.id;

                const res = await supabase.from("TiposValorAntecedentes").select("*").eq("nombre", medicalRecordValue.medicalRecordValueType.name).eq("tipoAntecedenteId", medicalRecord.medicalRecordTypeId).limit(1);

                if (res.data && res.data.length > 0) {
                    medicalRecordValue.medicalRecordValueTypeId = res.data[0].id;

                    console.log(medicalRecordValue)

                    await supabase.from("ValoresAntecedentes").insert(fromMedicalRecordValueSupabaseDocumentData(medicalRecordValue));
                }
            })));
        }

        const response: ICreateMedicalRecordResponse = {
            data: medicalRecord,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
      }
    }
}
  