import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from 'domain/core/entities/medicalRecordEntity';
import { ISubject } from 'domain/core/entities/subjectEntity';
import { IUser } from 'domain/core/entities/userEntity';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalRecordResponse, IGetMedicalRecordPDFResponse, IGetMedicalRecordsResponse } from 'domain/core/response/medicalRecordResponse';
import { medicalConsultySupabaseToMap } from 'domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper';
import { fromMedicalRecordSupabaseDocumentData, fromMedicalRecordValueSupabaseDocumentData, medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap, medicalRecordValueTypeSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { subjectSupabaseToMap } from 'domain/mappers/patient/supabase/subjectSupabaseMapper';
import { GET_MEDICAL_RECORDS_REPORT_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import * as QRCode from "qrcode";
import nookies from 'nookies';
import FileSaver from 'file-saver';

export default interface IMedicalRecordRepository {
  getMedicalRecords(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
    medicalConsulty?: number | null;
    medicalRecordType?: number | null;
    medicalRecordCategory?: number | null;
  }): Promise<IGetMedicalRecordsResponse | MedicalRecordFailure>;
  createMedicalRecord(medicalRecord: IMedicalRecord): Promise<ICreateMedicalRecordResponse | MedicalRecordFailure>;
  getMedicalRecordDiagnosisPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure>;
  getMedicalRecordSpecialityPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure>;
  getMedicalRecordJustificativePDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure>;
  getMedicalRecordCertificatePDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure>;
  getMedicalRecordHospitalizationPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure>;
}

export class MedicalRecordRepository implements IMedicalRecordRepository {
  async getMedicalRecords(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
    medicalConsulty?: number | null;
    medicalRecordType?: number | null;
    medicalRecordCategory?: number | null;
  }): Promise<IGetMedicalRecordsResponse | MedicalRecordFailure> {
    try {
      let query = supabase.from("RegistrosMedicos").select(`
        *,
        ConsultasMedicas (
          *,
          Sujetos (*)
        ),
        TiposRegistrosMedicos!inner(*),
        ValoresRegistrosMedicos (
          *,
          TiposValorRegistrosMedicos (*)
        )
      `,
      { count: "exact" });

      if (obj.sort) {
        query = query.order(obj.sort.field, {
            ascending: obj.sort.ascending
        });
      } else {
        query = query.order('fechaConsulta', { foreignTable: 'ConsultasMedicas', ascending: false });
      }

      if (obj.subjectId) {
        query = query.eq("sujetoId", obj.subjectId);
      }

      if (obj.medicalConsulty) {
        query = query.eq("consultaMedicaId", obj.medicalConsulty);
      }

      if (obj.medicalRecordType) {
        query = query.eq("tipoRegistroMedicoId", obj.medicalRecordType);
      }
      
      if (obj.medicalRecordCategory) {
        query = query.eq('TiposRegistrosMedicos.categoriaRegistroMedicoId', obj.medicalRecordCategory);
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

              if (data?.ConsultasMedicas) {
                const medicalConsulty: IMedicalConsulty = medicalConsultySupabaseToMap(data.ConsultasMedicas);

                if (data?.ConsultasMedicas?.Sujetos) {
                  const subject: ISubject = subjectSupabaseToMap(data.ConsultasMedicas.Sujetos);
      
                  medicalConsulty.subject = subject;
                  medicalRecordMap.subject = subject;
                }

                medicalRecordMap.medicalConsulty = medicalConsulty;
              }

              if (data?.TiposRegistrosMedicos) {
                const medicalRecordType: IMedicalRecordType = medicalRecordTypeSupabaseToMap(data.TiposRegistrosMedicos);

                medicalRecordMap.medicalRecordType = medicalRecordType;
              }

              if (data?.ValoresRegistrosMedicos?.length > 0) {
                data.ValoresRegistrosMedicos.forEach((medicalRecordValueData: any) => {
                  const medicalRecordValue: IMedicalRecordValue = medicalRecordValueSupabaseToMap(medicalRecordValueData);

                  if (medicalRecordValueData?.TiposValorRegistrosMedicos) {
                    const medicalRecordValueType: IMedicalRecordValueType = medicalRecordValueTypeSupabaseToMap(medicalRecordValueData.TiposValorRegistrosMedicos);

                    if (medicalRecordValueType.id > 0) medicalRecordValue.medicalRecordValueType = medicalRecordValueType;
                  }

                  if (medicalRecordValue.id >= 0) medicalRecordMap.medicalRecordValues.push(medicalRecordValue)
                })
              }

              if (medicalRecordMap.medicalRecordValues.length > 0) {
                medicalRecordMap.medicalRecordValues = medicalRecordMap.medicalRecordValues.sort((a, b) => a.medicalRecordValueTypeId - b.medicalRecordValueTypeId);
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
        const resRecordTypes = await supabase.from("TiposRegistrosMedicos").select("*").eq("nombre", medicalRecord.medicalRecordType.name).limit(1);

        if (resRecordTypes.error) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);

        if (resRecordTypes.data && resRecordTypes.data.length > 0) medicalRecord.medicalRecordTypeId = resRecordTypes.data[0].id;

        const res = await supabase.from("RegistrosMedicos").insert(fromMedicalRecordSupabaseDocumentData(medicalRecord)).select();

        if (res.error) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);

        if (res.data && res.data.length > 0) medicalRecord.id = res.data[0].id;

        if (medicalRecord.medicalRecordValues.length > 0) {
            await Promise.all((medicalRecord.medicalRecordValues.map(async (medicalRecordValue: IMedicalRecordValue) => {
                medicalRecordValue.medicalRecordId = medicalRecord.id;

                const res = await supabase.from("TiposValorRegistrosMedicos").select("*").eq("nombre", medicalRecordValue.medicalRecordValueType.name).eq("tipoRegistroMedicoId", medicalRecord.medicalRecordTypeId).limit(1);

                if (res.data && res.data.length > 0) {
                    medicalRecordValue.medicalRecordValueTypeId = res.data[0].id;

                    await supabase.from("ValoresRegistrosMedicos").insert(fromMedicalRecordValueSupabaseDocumentData(medicalRecordValue));
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

  async getMedicalRecordDiagnosisPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure> {
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

      let URL = GET_MEDICAL_RECORDS_REPORT_ENDPOINT(obj.medicalRecord.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Orden médica.pdf");
      }

      const response: IGetMedicalRecordPDFResponse = {
          data: obj.medicalRecord,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }

  async getMedicalRecordSpecialityPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure> {
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

      let URL = GET_MEDICAL_RECORDS_REPORT_ENDPOINT(obj.medicalRecord.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Orden médica.pdf");
      }

      const response: IGetMedicalRecordPDFResponse = {
          data: obj.medicalRecord,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }

  async getMedicalRecordJustificativePDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure> {
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

      let URL = GET_MEDICAL_RECORDS_REPORT_ENDPOINT(obj.medicalRecord.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Orden médica.pdf");
      }

      const response: IGetMedicalRecordPDFResponse = {
          data: obj.medicalRecord,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }

  async getMedicalRecordCertificatePDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure> {
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

      let URL = GET_MEDICAL_RECORDS_REPORT_ENDPOINT(obj.medicalRecord.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Orden médica.pdf");
      }

      const response: IGetMedicalRecordPDFResponse = {
          data: obj.medicalRecord,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }

  async getMedicalRecordHospitalizationPDF(obj: { 
    doctor: IUser;
    medicalRecord: IMedicalRecord;
  }): Promise<IGetMedicalRecordPDFResponse | MedicalRecordFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/octet-stream");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_MEDICAL_RECORDS_REPORT_ENDPOINT(obj.medicalRecord.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Orden médica.pdf");
      }    

      const response: IGetMedicalRecordPDFResponse = {
          data: obj.medicalRecord,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
    }
  }
}
  