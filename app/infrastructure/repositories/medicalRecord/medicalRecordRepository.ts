import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from 'domain/core/entities/medicalRecordEntity';
import { IUser } from 'domain/core/entities/userEntity';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalRecordResponse, IGetMedicalRecordPDFResponse, IGetMedicalRecordsResponse } from 'domain/core/response/medicalRecordResponse';
import { medicalConsultySupabaseToMap } from 'domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper';
import { fromMedicalRecordSupabaseDocumentData, fromMedicalRecordValueSupabaseDocumentData, medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap, medicalRecordValueTypeSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import jsPDF from "jspdf";
import * as QRCode from "qrcode";

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
        ConsultasMedicas (*),
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
      if (obj.medicalRecord.medicalRecordValues?.length === 0) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);

      if (obj.doctor.pwaProfressionId) {
        const res = await supabase.from("ProfesionesPQA").select("*").eq("id", obj.doctor.pwaProfressionId).limit(1);

        if (res.data && res.data.length > 0) obj.doctor.pwaProfression = res.data[0].nombre;
      }

      const doc = new jsPDF();

      doc.setProperties({
        title: `Orden de estudio diagnóstico - ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-blue-1.png";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(33, 106, 217);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 115, 10);
      doc.setTextColor(0,0,0);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.doctor.pwaProfression.toUpperCase()}`, 115, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Licencia de médico: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 105, 20);

        if (obj.doctor.address.length > 0) doc.text(`direccion: ${obj.doctor.address}`, 95, 27);
      } else {
        doc.text(`Licencia de médico: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 105, 15);

        if (obj.doctor.address.length > 0) doc.text(`direccion: ${obj.doctor.address}`, 95, 22);
      }

      doc.text(`Orden #: ${obj.medicalRecord.id}`, 10, 40);
      doc.text(`Fecha: ${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getDate()}-${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getMonth()}-${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getFullYear()}`, 10, 47);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`ORDEN MEDICA PARA`, 45, 57);

      doc.setTextColor(33, 106, 217);
      doc.text(`${obj.medicalRecord.medicalRecordValues[0].value}`, 93, 57);

      doc.setTextColor(0,0,0);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Datos del paciente`, 10, 70);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Nombre:`, 10, 77);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 26, 77);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Sexo:`, 10, 83);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`${obj.medicalRecord.subject.sex === 0 ? "F" : "M"}`, 21, 83);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Identificación:`, 10, 89);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`CURP, ${obj.medicalRecord.subject.curp}`, 35, 89);

      if (obj.medicalRecord.subject.birthDate) {
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Fecha de nacimiento:`, 10, 95);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`${new Date(obj.medicalRecord.subject.birthDate).getDate()}-${new Date(obj.medicalRecord.subject.birthDate).getMonth()}-${new Date(obj.medicalRecord.subject.birthDate).getFullYear()}`, 49, 95);
      }

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Se refiere al mencionado paciente para realizar los siguientes exámenes:`, 10, 105);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`${obj.medicalRecord.medicalRecordValues[0].value}`, 10, 118);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 75, 130, 45, 45);
      });

      doc.output('dataurlnewwindow');

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
  