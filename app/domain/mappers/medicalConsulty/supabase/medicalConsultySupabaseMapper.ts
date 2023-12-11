import { IMedicalConsulty, IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { getDateFormatUTC } from "infrastructure/utils/dates/datesUtils";
import moment from "moment";

export function medicalConsultySupabaseToMap(data: any): IMedicalConsulty {
  console.log(data)
  return {
    id: data?.id ?? 0,
    doctorId: data?.doctorId ?? 0,
    subjectId: data?.sujetoId ?? 0,
    subject: {} as ISubject,
    consultationDate: data?.fechaConsulta ? moment(data.fechaConsulta) : new Date(),
    consultationReason: data?.motivoConsulta ?? "",
    referrerBy: data?.referidoPor,
    sufferingDate: data?.inicioPadecimiento ? moment(data.fechaConsulta) : null,
    generalInspection: data?.inspeccionGeneral,
    respiratorySystem: data?.aparatoRespiratorio,
    digestiveSystem: data?.aparatoDigestivo,
    cardiovascularSystem: data?.aparatoCardioVascular,
    reproductiveSystem: data?.aparatoReproductor,
    urinarySystem: data?.aparatoUrinario,
    ophthalmologicalSystem: data?.inspeccionOftalmologica,
    locomotorSystem: data?.aparatoLocomotor,
    earInspection: data?.inspeccionOidos,
    neurologicalInspection: data?.aparatoNeurologico,
    skinInspection: data?.inspeccionPiel,
    diagnose: [],
    observations: data?.observaciones,
    medicalMeasures: [],
    medicalRecords: [],
    treatments: [],
    medicalConsultyImages: [],
    createdOn: data?.fechaConsulta ? new Date(new Date(data.fechaConsulta).getFullYear(), new Date(data.fechaConsulta).getMonth() + 1, new Date(data.fechaConsulta).getDate()) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : null,
  } as IMedicalConsulty;
}

export function fromMedicalConsultySupabaseDocumentData(medicalConsulty: IMedicalConsulty): any {
  const documentData = {
    sujetoId: medicalConsulty.subjectId,
    doctorId: medicalConsulty.doctorId,
    fechaConsulta: medicalConsulty.consultationDate,
    motivoConsulta: medicalConsulty.consultationReason,
    referidoPor: medicalConsulty.referrerBy,
    inicioPadecimiento: medicalConsulty.sufferingDate,
    inspeccionGeneral: medicalConsulty.generalInspection,
    aparatoRespiratorio: medicalConsulty.reproductiveSystem,
    aparatoDigestivo: medicalConsulty.digestiveSystem,
    aparatoCardioVascular: medicalConsulty.cardiovascularSystem,
    aparatoReproductor: medicalConsulty.reproductiveSystem,
    aparatoUrinario: medicalConsulty.urinarySystem,
    inspeccionOftalmologica: medicalConsulty.ophthalmologicalSystem,
    aparatoLocomotor: medicalConsulty.locomotorSystem,
    inspeccionOidos: medicalConsulty.earInspection,
    aparatoNeurologico: medicalConsulty.neurologicalInspection,
    inspeccionPiel: medicalConsulty.skinInspection,
    diagnostico: null,
    observaciones: medicalConsulty.observations,
  } as any;

  return documentData;
}

export function medicalConsultyImageSupabaseToMap(data: any): IMedicalConsultyImage {
  return {
    id: data?.id ?? 0,
    url: data?.url ?? "",
    description: data?.descripcion,
    medicalConsultyId: data?.consultaMedicaId ?? 0,
  } as IMedicalConsultyImage;
}

export function fromMedicalConsultyImageSupabaseDocumentData(medicalConsultyImage: IMedicalConsultyImage): any {
  const documentData = {
    url: medicalConsultyImage.url,
    descripcion: medicalConsultyImage.description,
    consultaMedicaId: medicalConsultyImage.medicalConsultyId,
  } as any;

  return documentData;
}
