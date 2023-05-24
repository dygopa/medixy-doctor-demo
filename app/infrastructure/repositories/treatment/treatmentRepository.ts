import { ITreatment } from 'domain/core/entities/treatmentEntity';
import { TreatmentFailure, treatmentFailuresEnum } from 'domain/core/failures/treatment/treatmentFailure';
import { ICreateTreatmentResponse } from 'domain/core/response/treatmentResponses';
import { fromTreatmentMedicineSupabaseDocumentData, fromTreatmentSupabaseDocumentData } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';

export default interface ITreatmentRepository {
  createTreatment(treatment: ITreatment): Promise<ICreateTreatmentResponse | TreatmentFailure>;
}

export class TreatmentRepository implements ITreatmentRepository {
    async createTreatment(treatment: ITreatment): Promise<ICreateTreatmentResponse | TreatmentFailure> {
      try {
        const res = await supabase.from("Tratamientos").insert(fromTreatmentSupabaseDocumentData(treatment)).select();

        if (res.error) return new TreatmentFailure(treatmentFailuresEnum.serverError);

        if (res.data && res.data.length > 0) treatment.id = res.data[0].id;

        if (treatment.treatmentMedicines?.length > 0) {
            await Promise.all(treatment.treatmentMedicines.map(async (treatmentMedicine) => {
                treatmentMedicine.treatmentId = treatment.id;

                await supabase.from("MedicamentoTratamientos").insert(fromTreatmentMedicineSupabaseDocumentData(treatmentMedicine)).select();
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
  