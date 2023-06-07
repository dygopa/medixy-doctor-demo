import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue } from 'domain/core/entities/medicalRecordEntity';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalRecordResponse, IGetMedicalRecordsResponse } from 'domain/core/response/medicalRecordResponse';
import { fromMedicalRecordSupabaseDocumentData, fromMedicalRecordValueSupabaseDocumentData, medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalRecordRepository {
  getMedicalRecords(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
    medicalRecordType?: number | null;
  }): Promise<IGetMedicalRecordsResponse | MedicalRecordFailure>;
  createMedicalRecord(medicalRecord: IMedicalRecord): Promise<ICreateMedicalRecordResponse | MedicalRecordFailure>;
}

export class MedicalRecordRepository implements IMedicalRecordRepository {
  async getMedicalRecords(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
    medicalRecordType?: number | null;
  }): Promise<IGetMedicalRecordsResponse | MedicalRecordFailure> {
    try {
      let query = supabase.from("Antecedentes").select(`
        *,
        ConsultasMedicas (*),
        TiposAntecedentes (*),
        ValoresAntecedentes (*)
      `,
      { count: "exact" });

      if (obj.sort) {
        query = query.order(obj.sort.field, {
            ascending: obj.sort.ascending
        });
      } else {
        query = query.order('fechaConsulta', { foreignTable: 'ConsultasMedicas', ascending: false });
      }

      if (obj.patientId) {
        query = query.eq("pacienteId", obj.patientId);
      }

      if (obj.medicalRecordType) {
        query = query.eq("tipoAntecedenteId", obj.medicalRecordType);
      }

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const medicalRecords: IMedicalRecord[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const medicalRecordMap: IMedicalRecord = medicalRecordSupabaseToMap(data);

              if (data?.TiposAntecedentes) {
                const medicalRecordType: IMedicalRecordType = medicalRecordTypeSupabaseToMap(data.TiposAntecedentes);

                medicalRecordMap.medicalRecordType = medicalRecordType;
              }

              if (data?.ValoresAntecedentes?.length > 0) {
                data.ValoresAntecedentes.forEach((medicalRecordValueData: any) => {
                  const medicalRecordValue: IMedicalRecordValue = medicalRecordValueSupabaseToMap(medicalRecordValueData);

                  if (medicalRecordValue.id >= 0) medicalRecordMap.medicalRecordValues.push(medicalRecordValue)
                })
              }

              medicalRecords.push(medicalRecordMap);
          }));
      }

      const response: IGetMedicalRecordsResponse = {
          data: medicalRecords,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }

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
  