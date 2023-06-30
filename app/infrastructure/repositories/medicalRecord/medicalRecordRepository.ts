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
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 35, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 35, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 22);
      }

      doc.setFontSize(13);
      doc.text(`Orden # ${obj.medicalRecord.id}`, 160, 20);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`SOLICITUD DE ESTUDIOS`, 65, 40);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`FECHA DE IMPRESIÓN:`, 130, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`, 175, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 45, 200, 45);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Dr(a).`, 10, 51);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 21, 51);

      doc.setLineWidth(0.1); 
      doc.line(10, 55, 200, 55);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Especialidad:`, 10, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.pwaProfression}`, 34, 61);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Fecha de la orden:`, 140, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getDate()}-${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getMonth()}-${new Date(obj.medicalRecord.medicalConsulty.consultationDate).getFullYear()}`, 174, 61);

      doc.setLineWidth(0.1); 
      doc.line(10, 65, 200, 65);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Nombre del paciente:`, 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 10, 80);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Edad:`, 85, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject?.age} ${obj.medicalRecord.subject?.ageType === "years" ? "años" : "meses"}`, 85, 80);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`Favor de realizar`, 10, 90);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.medicalRecord.medicalRecordValues[0].value}`, 10, 97);
      doc.setFontSize(10);

      if (obj.medicalRecord.medicalRecordValues.length >= 1) doc.text(`${obj.medicalRecord.medicalRecordValues[1].value}`, 10, 102);

      
      doc.setLineWidth(0.1); 
      doc.line(10, 110, 200, 110);

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(30, 137, 60, 137);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, 143);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, 115, 45, 45);
      });

      doc.text(`${obj.doctor.address}​`, 50, 165);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, 170);

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

  async getMedicalRecordSpecialityPDF(obj: { 
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
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 35, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 35, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 22);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`ORDEN A ESPECIALIDAD`, 65, 40);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`FECHA DE IMPRESIÓN:`, 130, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`, 175, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 45, 200, 45);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Dr(a).`, 10, 51);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 21, 51);

      doc.setLineWidth(0.1); 
      doc.line(10, 55, 200, 55);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Especialidad:`, 10, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.pwaProfression}`, 34, 61);

      doc.setLineWidth(0.1); 
      doc.line(10, 65, 200, 65);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Nombre del paciente:`, 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 10, 80);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Edad:`, 85, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject?.age} ${obj.medicalRecord.subject?.ageType === "years" ? "años" : "meses"}`, 85, 80);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.medicalRecord.medicalRecordValues[0].value}`, 85, 97);
      doc.setFontSize(10);

      if (obj.medicalRecord.medicalRecordValues[1]) {
        doc.text(`${obj.medicalRecord.medicalRecordValues[1].value}`, 10, 97);
      }
      if (obj.medicalRecord.medicalRecordValues[2]) {
      doc.text(`${obj.medicalRecord.medicalRecordValues[2].value}`, 10, 102);
      }

      
      doc.setLineWidth(0.1); 
      doc.line(10, 110, 200, 110);

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(25, 137, 60, 137);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, 143);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, 115, 45, 45);
      });

      doc.text(`${obj.doctor.address}​`, 50, 165);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, 170);

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

  async getMedicalRecordJustificativePDF(obj: { 
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
        title: `Justificante Médico- ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 35, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 35, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 22);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`JUSTIFICANTE MÉDICO`, 65, 40);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`FECHA:`, 155, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`, 175, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 45, 200, 45);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Dr(a).`, 10, 51);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 21, 51);

      doc.setLineWidth(0.1); 
      doc.line(10, 55, 200, 55);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Especialidad:`, 10, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.pwaProfression}`, 34, 61);

      doc.setLineWidth(0.1); 
      doc.line(10, 65, 200, 65);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Nombre del paciente:`, 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 10, 80);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Edad:`, 85, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject?.age} ${obj.medicalRecord.subject?.ageType === "years" ? "años" : "meses"}`, 85, 80);

      doc.setLineWidth(0.1); 
      doc.line(10, 88, 200, 88);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      const split = doc.splitTextToSize(`${obj.medicalRecord.medicalRecordValues[0].value}`,190)
      doc.text(split, 10, 97);
      doc.setFontSize(10);

      
      doc.setLineWidth(0.1); 
      doc.line(10, 110, 200, 110);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal")
      doc.text(`De requerir mayor informacion quedo a sus ordenes`,10,120)
      doc.text(`Médico tratante: Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`,10,125)
      doc.text(`Especialidad: ${obj.doctor.pwaProfression}`, 10, 130);

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(25, 160, 60, 160);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, 165);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, 145, 45, 45);
      });

      doc.text(`${obj.doctor.address}​`, 50, 195);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, 200);

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

  async getMedicalRecordCertificatePDF(obj: { 
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
        title: `Certificado Médico- ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 35, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 35, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 22);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`CERTIFICADO MÉDICO`, 65, 40);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`FECHA:`, 155, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`, 175, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 45, 200, 45);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Dr(a).`, 10, 51);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 21, 51);

      doc.setLineWidth(0.1); 
      doc.line(10, 55, 200, 55);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Especialidad:`, 10, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.pwaProfression}`, 34, 61);

      doc.setLineWidth(0.1); 
      doc.line(10, 65, 200, 65);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Nombre del paciente:`, 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 10, 80);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Edad:`, 85, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject?.age} ${obj.medicalRecord.subject?.ageType === "years" ? "años" : "meses"}`, 85, 80);

      doc.setLineWidth(0.1); 
      doc.line(10, 88, 200, 88);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      const split = doc.splitTextToSize(`${obj.medicalRecord.medicalRecordValues[0].value}`,190)
      doc.text(split, 10, 97);
      doc.setFontSize(10);

      
      doc.setLineWidth(0.1); 
      doc.line(10, 110, 200, 110);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal")
      doc.text(`De requerir mayor informacion quedo a sus ordenes`,10,120)
      doc.text(`Médico tratante: Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`,10,125)
      doc.text(`Especialidad: ${obj.doctor.pwaProfression}`, 10, 130);

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(25, 160, 60, 160);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, 165);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, 145, 45, 45);
      });

      doc.text(`${obj.doctor.address}​`, 50, 195);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, 200);

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

  async getMedicalRecordHospitalizationPDF(obj: { 
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
        title: `Orden de Hospitalización- ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "png", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 35, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 35, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 35, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 35, 22);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`ORDEN DE HOSPITALIZACIÓN`, 65, 40);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`FECHA:`, 155, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`, 175, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 45, 200, 45);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Dr(a).`, 10, 51);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.names} ${obj.doctor.firstName}`, 21, 51);

      doc.setLineWidth(0.1); 
      doc.line(10, 55, 200, 55);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Especialidad:`, 10, 61);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.doctor.pwaProfression}`, 34, 61);

      doc.setLineWidth(0.1); 
      doc.line(10, 65, 200, 65);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Nombre del paciente:`, 10, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject.name} ${obj.medicalRecord.subject.lastName}`, 10, 80);

      doc.setFont("helvetica", "normal", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text(`Edad:`, 85, 75);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${obj.medicalRecord.subject?.age} ${obj.medicalRecord.subject?.ageType === "years" ? "años" : "meses"}`, 85, 80);

      doc.setLineWidth(0.1); 
      doc.line(10, 88, 200, 88);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      const split = doc.splitTextToSize(`${obj.medicalRecord.medicalRecordValues[0].value}`,190)
      doc.text(split, 10, 97);
      doc.text(`Se anexa informe médico y resultado de estudios`, 10, 125);
      doc.setFontSize(10);

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(25, 150, 60, 150);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, 155);

      QRCode.toDataURL(obj.medicalRecord.medicalConsultyId.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, 135, 45, 45);
      });

      doc.text(`${obj.doctor.address}​`, 50, 185);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, 190);

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
  