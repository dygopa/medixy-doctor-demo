import { treatmentViaDosisEnum } from '(presentation)/(enum)/treatment/treatmentEnums';
import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { getDosisTypeText, getDuringText, getFrequencyText } from '(presentation)/(helper)/medicalRecords/recipesHelper';
import { blobToBase64 } from '(presentation)/(utils)/blobToBase64';
import { ISubject } from 'domain/core/entities/subjectEntity';
import { ITreatment, ITreatmentMedicine } from 'domain/core/entities/treatmentEntity';
import { IUser } from 'domain/core/entities/userEntity';
import { TreatmentFailure, treatmentFailuresEnum } from 'domain/core/failures/treatment/treatmentFailure';
import { ICreateTreatmentResponse, IGetTreatmentPDFResponse, IGetTreatmentsResponse } from 'domain/core/response/treatmentResponses';
import { subjectSupabaseToMap } from 'domain/mappers/patient/supabase/subjectSupabaseMapper';
import { fromTreatmentMedicineSupabaseDocumentData, fromTreatmentSupabaseDocumentData, treatmentMedicineSupabaseToMap, treatmentSupabaseToMap } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { GET_TREATMENTS_REPORT_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import * as QRCode from "qrcode";
import nookies from 'nookies';

export default interface ITreatmentRepository {
  getTreatments(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetTreatmentsResponse | TreatmentFailure>;
  createTreatment(treatment: ITreatment): Promise<ICreateTreatmentResponse | TreatmentFailure>;
  getTreatmentPDF(obj: { 
    doctor: IUser;
    treatment: ITreatment;
  }): Promise<IGetTreatmentPDFResponse | TreatmentFailure>;
  getTreatmentPDFReturnURL(obj: { 
    doctor: IUser;
    treatment: ITreatment;
  }): Promise<any | TreatmentFailure>;
}

export class TreatmentRepository implements ITreatmentRepository {
  async getTreatments(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetTreatmentsResponse | TreatmentFailure> {
    try {
      let query = supabase.from("Tratamientos").select(`
        *,
        MedicamentosTratamiento (*),
        Sujetos (*)
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

      const treatments: ITreatment[] = [];

      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const treatmentMap: ITreatment = treatmentSupabaseToMap(data);

              if (data?.Sujetos) {
                const subject: ISubject = subjectSupabaseToMap(data.Sujetos);
  
                if (subject.subjectId >= 0) treatmentMap.subject = subject;
              }

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

  async getTreatmentPDF(obj: { 
    doctor: IUser;
    treatment: ITreatment;
  }): Promise<IGetTreatmentPDFResponse | TreatmentFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_TREATMENTS_REPORT_ENDPOINT(obj.treatment.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200 && res.body) {
        const data = await res.body.getReader().read();
        const decoder = new TextDecoder();

        if (!data.done && data.value) {
          const decodedChunk = decoder.decode(data.value, { stream: true });

          let blob = new Blob([decodedChunk], { type: 'application/pdf' });
          let url = window.URL.createObjectURL(blob)

          window.open(url, "_blank");
        } 
      }    

      const response: IGetTreatmentPDFResponse = {
          data: obj.treatment,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new TreatmentFailure(treatmentFailuresEnum.serverError);
    }
  }

  async getTreatmentPDFReturnURL(obj: { 
    doctor: IUser;
    treatment: ITreatment;
  }): Promise<any | TreatmentFailure> {
    try {
      const response = ""

      return response;
    } catch (error) {
      const exception = error as any;
      return new TreatmentFailure(treatmentFailuresEnum.serverError);
    }
  }
}
  