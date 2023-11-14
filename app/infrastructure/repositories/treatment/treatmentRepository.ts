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
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import jsPDF from "jspdf";
import * as QRCode from "qrcode";
import { parseString } from 'xml2js';

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
      if (obj.treatment.treatmentMedicines?.length === 0) return new TreatmentFailure(treatmentFailuresEnum.serverError);

      if (obj.doctor.pwaProfressionId) {
        const res = await supabase.from("ProfesionesPQA").select("*").eq("id", obj.doctor.pwaProfressionId).limit(1);

        if (res.data && res.data.length > 0) obj.doctor.pwaProfression = res.data[0].nombre;
      }

      const doc = new jsPDF();

      doc.setProperties({
        title: `Tratamiento - ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();

      if (obj.doctor.avatar?.length > 0) {
        img.src = obj.doctor.avatar;
        doc.addImage(img, "png", 10, 5, 25, 25);
      } else {
        img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
        doc.addImage(img, "png", 10, 0, 25, 30);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 42, 10);
      doc.setFontSize(10);
      doc.text(`Cedula Profesional: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 42, 15);

      doc.text(`${getFullDate(new Date(obj.treatment.treatmentMedicines[0].createdOn))}`, 160, 10);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`${obj.doctor.pwaProfression}`, 42, 20);
      } else {
        doc.text(`${obj.doctor.address}`, 42, 25);
      }

      doc.setFontSize(12);
      doc.text(`${obj.treatment.subject?.lastName} ${obj.treatment.subject?.name}`, 10, 40);
      doc.setFontSize(11);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Edad del paciente:`, 10, 45);
      doc.text(`${obj.treatment.subject?.age} ${obj.treatment.subject?.ageType === "years" ? "años" : obj.treatment.subject?.ageType === "days" ? "dias" : "meses"}`, 45, 45);

      doc.setLineWidth(0.1); 
      doc.line(10, 50, 200, 50);

      let y = 60;

      obj.treatment.treatmentMedicines?.forEach((treatmentMedicine: ITreatmentMedicine) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`${treatmentMedicine.medicine}`, 10, y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Vía ${treatmentViaDosisEnum[treatmentMedicine.viaDosis]}, ${getDosisTypeText(treatmentMedicine)} cada ${getFrequencyText(treatmentMedicine)} por ${getDuringText(treatmentMedicine)}`, 10, y + 5);

        y += 15;
      });

      y += 15;

      QRCode.toDataURL(obj.treatment.id.toString(),  (err, url) => {
        if (err) return new TreatmentFailure(treatmentFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, y, 45, 45);
       });

      y += 15;
      doc.setLineWidth(0.1); 
      doc.line(30, y, 70, y);

      y += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 32, y);

      y += 25;

      if (obj.doctor.address.length > 0) {
        doc.text(`${obj.doctor.address}`, 85, y);
      }

      y += 5;
      if (obj.doctor.phone.length > 0) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Tel: ${obj.doctor.phone}`, 90, y);
      }

      window.open(doc.output("bloburl"), "_blank");

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
      if (obj.treatment.treatmentMedicines?.length === 0) return new TreatmentFailure(treatmentFailuresEnum.serverError);

      if (obj.doctor.pwaProfressionId) {
        const res = await supabase.from("ProfesionesPQA").select("*").eq("id", obj.doctor.pwaProfressionId).limit(1);

        if (res.data && res.data.length > 0) obj.doctor.pwaProfression = res.data[0].nombre;
      }

      const doc = new jsPDF();

      doc.setProperties({
        title: `Tratamiento - ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();

      if (obj.doctor.avatar?.length > 0) {
        img.src = obj.doctor.avatar;
        doc.addImage(img, "png", 10, 5, 25, 25);
      } else {
        img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
        doc.addImage(img, "png", 10, 0, 25, 30);
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 42, 10);
      doc.setFontSize(10);
      doc.text(`Cedula Profesional: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 42, 15);

      doc.text(`${getFullDate(new Date(obj.treatment.treatmentMedicines[0].createdOn))}`, 160, 10);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`${obj.doctor.pwaProfression}`, 42, 20);
      } else {
        doc.text(`${obj.doctor.address}`, 42, 25);
      }

      doc.setFontSize(12);
      doc.text(`${obj.treatment.subject?.lastName} ${obj.treatment.subject?.name}`, 10, 40);
      doc.setFontSize(11);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Edad del paciente:`, 10, 45);
      doc.text(`${obj.treatment.subject?.age} ${obj.treatment.subject?.ageType === "years" ? "años" : obj.treatment.subject?.ageType === "days" ? "dias" : "meses"}`, 45, 45);

      doc.setLineWidth(0.1); 
      doc.line(10, 50, 200, 50);

      let y = 60;

      obj.treatment.treatmentMedicines?.forEach((treatmentMedicine: ITreatmentMedicine) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`${treatmentMedicine.medicine}`, 10, y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Vía ${treatmentViaDosisEnum[treatmentMedicine.viaDosis]}, ${getDosisTypeText(treatmentMedicine)} cada ${getFrequencyText(treatmentMedicine)} por ${getDuringText(treatmentMedicine)}`, 10, y + 5);

        y += 15;
      });

      y += 15;

      QRCode.toDataURL(obj.treatment.id.toString(),  (err, url) => {
        if (err) return new TreatmentFailure(treatmentFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, y, 45, 45);
       });

      y += 15;
      doc.setLineWidth(0.1); 
      doc.line(30, y, 70, y);

      y += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 32, y);

      y += 25;

      if (obj.doctor.address.length > 0) {
        doc.text(`${obj.doctor.address}`, 85, y);
      }

      y += 5;
      if (obj.doctor.phone.length > 0) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Tel: ${obj.doctor.phone}`, 90, y);
      }

      const pdf = doc.output("blob")

      const response = blobToBase64(pdf)

      return response;
    } catch (error) {
      const exception = error as any;
      return new TreatmentFailure(treatmentFailuresEnum.serverError);
    }
  }
}
  