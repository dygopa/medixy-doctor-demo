import { ITreatment, ITreatmentMedicine } from 'domain/core/entities/treatmentEntity';
import { TreatmentFailure, treatmentFailuresEnum } from 'domain/core/failures/treatment/treatmentFailure';
import { ICreateTreatmentResponse, IGetTreatmentsResponse } from 'domain/core/response/treatmentResponses';
import { fromTreatmentMedicineSupabaseDocumentData, fromTreatmentSupabaseDocumentData, treatmentMedicineSupabaseToMap, treatmentSupabaseToMap } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface ITreatmentRepository {
  getTreatments(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
  }): Promise<IGetTreatmentsResponse | TreatmentFailure>;
  createTreatment(treatment: ITreatment): Promise<ICreateTreatmentResponse | TreatmentFailure>;
}

export class TreatmentRepository implements ITreatmentRepository {
  async getTreatments(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    patientId?: number | null;
  }): Promise<IGetTreatmentsResponse | TreatmentFailure> {
    try {
      let query = supabase.from("Tratamientos").select(`
        *,
        MedicamentosTratamiento (*)
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

      const treatments: ITreatment[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const treatmentMap: ITreatment = treatmentSupabaseToMap(data);

              if (data?.MedicamentosTratamiento?.length > 0) {
                data.MedicamentosTratamiento.forEach((medicineData: any) => {
                  const medicines: ITreatmentMedicine = treatmentMedicineSupabaseToMap(medicineData);
                  
      
                  if (medicines.id >= 0) treatmentMap?.treatmentMedicines?.push(medicines);
                });
              }

              treatments.push(treatmentMap);
          }));
      }

      const response: IGetTreatmentsResponse = {
          data: treatments,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new TreatmentFailure(treatmentFailuresEnum.serverError);
    }
  }

    async createTreatment(treatment: ITreatment): Promise<ICreateTreatmentResponse | TreatmentFailure> {
      try {
        const res = await supabase.from("Tratamientos").insert(fromTreatmentSupabaseDocumentData(treatment)).select();

        if (res.error) return new TreatmentFailure(treatmentFailuresEnum.serverError);

        if (res.data && res.data.length > 0) treatment.id = res.data[0].id;

        if (treatment.treatmentMedicines?.length > 0) {
            await Promise.all(treatment.treatmentMedicines.map(async (treatmentMedicine) => {
                treatmentMedicine.treatmentId = treatment.id;

                await supabase.from("MedicamentosTratamiento").insert(fromTreatmentMedicineSupabaseDocumentData(treatmentMedicine)).select();
            }));
        }

        const response: ICreateTreatmentResponse = {
            data: treatment,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new TreatmentFailure(treatmentFailuresEnum.serverError);
      }
    }
}
  