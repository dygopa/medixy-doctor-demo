import { treatmentViaDosisEnum } from "(presentation)/(enum)/treatment/treatmentEnums";
import { ITreatment, ITreatmentMedicine } from "domain/core/entities/treatmentEntity";
import { IUser } from "domain/core/entities/userEntity";
import jsPDF from "jspdf";
import { get12HoursFormat, getFullDate } from "../dates/datesHelper";
import { getDosisTypeText, getDuringText, getFrequencyText } from "./recipesHelper";
import * as QRCode from "qrcode";
import { TreatmentFailure, treatmentFailuresEnum } from "domain/core/failures/treatment/treatmentFailure";

export function generatePDFTreatment(doc: jsPDF, obj: {doctor: IUser, treatment: ITreatment}) {
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
}