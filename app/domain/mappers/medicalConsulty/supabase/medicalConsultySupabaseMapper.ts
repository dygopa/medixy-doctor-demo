import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";

export function medicalConsultySupabaseToMap(data: any): IMedicalConsulty {
  return {
    id: data?.id ?? 0,
    patientId: data?.idPaciente ?? 0,
    consultationDate: data?.fechaConsulta ? new Date(data.fechaConsulta) : new Date(),
    consultationReason: data?.motivoConsulta ?? "",
    referrerBy: data?.referidoPor,
    sufferingDate: data?.inicioPadecimiento ? new Date(data.inicioPadecimiento) : null,
    generalInspection: data?.inspeccionGeneral,
    respiratorySystem: data?.aparatoRespiratorio,
    digestiveSystem: data?.aparatoDigestivo,
    cardiovascularSystem: data?.aparatoCardiovascular,
    reproductiveSystem: data?.aparatoReproductor,
    urinarySystem: data?.aparatoUrinario,
    ophthalmologicalSystem: data?.inspeccionOftalmologica,
    locomotorSystem: data?.aparatoLocomotor,
    earInspection: data?.inspeccionOidos,
    neurologicalInspection: data?.aparatoNeurologico,
    skinInspection: data?.inspeccionPiel,
    diagnose: data?.diagnostico ?? "",
    observations: data?.observaciones,
    medicalMeasures: [],
    createdOn: data?.fechaConsulta ? new Date(data.fechaConsulta) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : null,
  } as IMedicalConsulty;
}

export function fromMedicalConsultySupabaseDocumentData(medicalConsulty: IMedicalConsulty): any {
  const documentData = {
    idPaciente: medicalConsulty.patientId,
    fechaConsulta: medicalConsulty.consultationDate,
    motivoConsulta: medicalConsulty.consultationReason,
    referidoPor: medicalConsulty.referrerBy,
    inicioPadecimiento: medicalConsulty.sufferingDate,
    inspeccionGeneral: medicalConsulty.generalInspection,
    aparatoRespiratorio: medicalConsulty.reproductiveSystem,
    aparatoDigestivo: medicalConsulty.digestiveSystem,
    aparatoCardiovascular: medicalConsulty.cardiovascularSystem,
    aparatoReproductor: medicalConsulty.reproductiveSystem,
    aparatoUrinario: medicalConsulty.urinarySystem,
    inspeccionOftalmologica: medicalConsulty.ophthalmologicalSystem,
    aparatoLocomotor: medicalConsulty.locomotorSystem,
    inspeccionOidos: medicalConsulty.earInspection,
    aparatoNeurologico: medicalConsulty.neurologicalInspection,
    inspeccionPiel: medicalConsulty.skinInspection,
    diagnostico: medicalConsulty.diagnose,
    observaciones: medicalConsulty.observations,
  } as any;

  console.log(documentData)

  return documentData;
}

