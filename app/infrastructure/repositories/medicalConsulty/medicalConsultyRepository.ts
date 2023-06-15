import { IDiagnosis } from 'domain/core/entities/diagnosis';
import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { IMedicalMeasure, IMedicalMeasureType } from 'domain/core/entities/medicalMeasureEntity';
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue } from 'domain/core/entities/medicalRecordEntity';
import { ITreatment, ITreatmentMedicine } from 'domain/core/entities/treatmentEntity';
import { MedicalConsultyFailure, medicalConsultyFailuresEnum } from 'domain/core/failures/medicalConsulty/medicalConsultyFailure';
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse } from 'domain/core/response/medicalConsultyResponse';
import { diagnosisSupabaseToMap } from 'domain/mappers/diagnosis/diagnosisSupabaseMapper';
import { fromMedicalConsultySupabaseDocumentData, medicalConsultySupabaseToMap } from "domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper";
import { medicalMeasureSupabaseToMap, medicalMeasureTypeSupabaseToMap } from 'domain/mappers/medicalMeasure/supabase/medicalMeasureSupabaseMapper';
import { medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { treatmentMedicineSupabaseToMap, treatmentSupabaseToMap } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface IMedicalConsultyRepository {
  getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure>;
  createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure>;
}

export class MedicalConsultyRepository implements IMedicalConsultyRepository {
  async getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure> {
    try {
      let query = supabase.from("ConsultasMedicas").select(`
      *,
      Diagnosticos (*),
      RegistrosMedicos (
        *,
        TiposRegistrosMedicos (*),
        ValoresRegistrosMedicos (*)
      ),
      SignosVitales (
        *,
        TiposSignosVitales (*)
      ),
      Tratamientos (
        *,
        MedicamentosTratamiento (*)
      )
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

              if (data.RegistrosMedicos?.length > 0) {
                data.RegistrosMedicos.forEach((medicalRecordData: any) => {
                  const medicalRecord: IMedicalRecord = medicalRecordSupabaseToMap(medicalRecordData);

                  if (medicalRecordData?.TiposRegistrosMedicos) {
                    const medicalRecordType: IMedicalRecordType = medicalRecordTypeSupabaseToMap(medicalRecordData.TiposRegistrosMedicos);
    
                    medicalRecord.medicalRecordType = medicalRecordType;
                  }
    
                  if (medicalRecordData?.ValoresRegistrosMedicos?.length > 0) {
                    medicalRecordData.ValoresRegistrosMedicos.forEach((medicalRecordValueData: any) => {
                      const medicalRecordValue: IMedicalRecordValue = medicalRecordValueSupabaseToMap(medicalRecordValueData);
    
                      if (medicalRecordValue.id >= 0) medicalRecord.medicalRecordValues.push(medicalRecordValue)
                    })
                  }
      
                  if (medicalRecord.id >= 0) medicalConsultyMap?.medicalRecords?.push(medicalRecord);
                });
              }

              if (data.SignosVitales?.length > 0) {
                data.SignosVitales.map((medicalMeasureData: any) => {
                  const medicalMeasureMap: IMedicalMeasure = medicalMeasureSupabaseToMap(medicalMeasureData);

                  if (medicalMeasureData?.TiposSignosVitales) {
                    const medicalMeasureType: IMedicalMeasureType = medicalMeasureTypeSupabaseToMap(medicalMeasureData.TiposSignosVitales);
          
                    if (medicalMeasureType.id >= 0) medicalMeasureMap.medicalMeasureType = medicalMeasureType;
                  }

                  if (medicalMeasureMap.id > 0) medicalConsultyMap.medicalMeasures?.push(medicalMeasureMap)
                })
              }

              if (data.Tratamientos?.length > 0) {
                data.Tratamientos.forEach((treatmentData: any) => {
                  const treatmentMap: ITreatment = treatmentSupabaseToMap(treatmentData);

                  if (treatmentData?.MedicamentosTratamiento?.length > 0) {
                    treatmentData.MedicamentosTratamiento.forEach((medicineData: any) => {
                      const medicines: ITreatmentMedicine = treatmentMedicineSupabaseToMap(medicineData);
                      
          
                      if (medicines.id >= 0) treatmentMap?.treatmentMedicines?.push(medicines);
                    });
                  }

                  if (treatmentMap.id > 0) medicalConsultyMap.treatments?.push(treatmentMap);
                })
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
  