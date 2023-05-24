import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IMedicalMeasure, IMedicalMeasureType } from "domain/core/entities/medicalMeasureEntity";

export function medicalMeasureTypeSupabaseToMap(data: any): IMedicalMeasureType {
    return {
      id: data?.id ?? 0,
      type: data?.tipo ?? "",
    } as IMedicalMeasureType;
  }
  
  export function fromMedicalMeasureTypeSupabaseDocumentData(medicalMeasureType: IMedicalMeasureType): any {
    const documentData = {
        type: medicalMeasureType.type,
    } as any;
  
    return documentData;
  }

export function medicalMeasureSupabaseToMap(data: any): IMedicalMeasure {
  return {
    id: data?.id ?? 0,
    value: data?.valor ?? 0,
    medicalMeasureTypeId: data?.idTipoMedicion ?? 0,
    medicalMeasureType: {} as IMedicalMeasureType,
    medicalConsultyId: data?.idConsulta, 
    medicalConsulty: {} as IMedicalConsulty,
    patientId: data?.idPaciente,
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : null,
  } as IMedicalMeasure;
}

export function fromMedicalMeasureSupabaseDocumentData(medicalMeasure: IMedicalMeasure): any {
  const documentData = {
    valor: medicalMeasure.value,
    idTipoMedicion: medicalMeasure.medicalMeasureTypeId,
    idConsulta: medicalMeasure.medicalConsultyId, 
    idPaciente: medicalMeasure.patientId,
  } as any;

  return documentData;
}

