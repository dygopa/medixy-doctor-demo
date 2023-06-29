import { treatmentViaDosisEnum } from '(presentation)/(enum)/treatment/treatmentEnums';
import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { getDosisTypeText, getDuringText, getFrequencyText } from '(presentation)/(helper)/medicalRecords/recipesHelper';
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
      img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
      doc.addImage(img, "jpg", 10, 0, 25, 30);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 112, 10);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Mx-Cedula Profesional: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 105, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`${obj.doctor.pwaProfression}`, 122, 20);
        doc.text(`Cert. 0000000`, 120, 25);
        doc.text(`${obj.doctor.address}`, 80, 30);
      } else {
        doc.text(`Cert. 0000000`, 120, 20);
        doc.text(`${obj.doctor.address}`, 80, 25);
      }

      doc.setLineWidth(0.1); 
      doc.line(10, 38, 200, 38);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`DATOS DEL PACIENTE`, 20, 45);
      doc.setFontSize(11);
      doc.text(`Apellidos y Nombres:`, 20, 53);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.treatment.subject?.lastName} ${obj.treatment.subject?.name}`, 65, 53);

      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Identificación:`, 20, 60);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`mx-CURP - ${obj.treatment.subject?.curp}`, 50, 60);

      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Sexo:`, 120, 60);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.treatment.subject?.sex === 0 ? "Femenino" : "Masculino"}`, 135, 60);

      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Fecha de nacimiento:`, 20, 67);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.treatment.subject?.birthDate ? `${new Date(obj.treatment.subject?.birthDate).getDate()}-${new Date(obj.treatment.subject?.birthDate).getMonth()}-${new Date(obj.treatment.subject?.birthDate).getFullYear()}` : ""} `, 65, 67);

      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Edad:`, 120, 67);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.treatment.subject?.age} ${obj.treatment.subject?.ageType === "years" ? "años" : "meses"}`, 135, 67);

      doc.setLineWidth(0.1); 
      doc.line(10, 72, 200, 72);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`RECETA DE MEDICAMENTOS:`, 25, 80);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${obj.treatment.id}`, 95, 80);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "bold");
      doc.text(`Fecha de Receta:`, 115, 80);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`${new Date(obj.treatment.treatmentMedicines[0].createdOn).getDate() - 1}-${new Date(obj.treatment.treatmentMedicines[0].createdOn).getMonth()}-${new Date(obj.treatment.treatmentMedicines[0].createdOn).getFullYear()}`, 150, 80);

      let y = 88;

      obj.treatment.treatmentMedicines?.forEach((treatmentMedicine: ITreatmentMedicine) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`${treatmentMedicine.medicine}`, 28, y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal", "normal");
        doc.text(`Vía ${treatmentViaDosisEnum[treatmentMedicine.viaDosis]}, ${getDosisTypeText(treatmentMedicine)} cada ${getFrequencyText(treatmentMedicine)} por ${getDuringText(treatmentMedicine)}`, 28, y + 5);

        y += 12;
      });

      doc.setLineWidth(0.1); 
      doc.line(125, 265, 180, 265);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 135, 270);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Mx-Cedula Profesional: ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 125, 275);

      QRCode.toDataURL(obj.treatment.reference,  (err, url) => {
       if (err) return new TreatmentFailure(treatmentFailuresEnum.serverError);

       var img = new Image();
       img.src = url;
       doc.addImage(img, "png", 15, 250, 35, 35);
      });

      doc.output('dataurlnewwindow');

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
}
  