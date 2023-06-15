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
    medicalMeasureTypeId: data?.tipoSignoVitalId ?? 0,
    medicalMeasureType: {} as IMedicalMeasureType,
    medicalConsultyId: data?.consultaMedicaId, 
    medicalConsulty: {} as IMedicalConsulty,
    subjectId: data?.sujetoId,
    createdOn: data?.fechaCreacion ? new Date(new Date(data.fechaCreacion).getFullYear(), new Date(data.fechaCreacion).getMonth() + 1, new Date(data.fechaCreacion).getDate() + 1) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : null,
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : null,
  } as IMedicalMeasure;
}

export function fromMedicalMeasureSupabaseDocumentData(medicalMeasure: IMedicalMeasure): any {
  const documentData = {
    valor: medicalMeasure.value,
    tipoSignoVitalId: medicalMeasure.medicalMeasureTypeId,
    consultaMedicaId: medicalMeasure.medicalConsultyId, 
    sujetoId: medicalMeasure.subjectId,
    fechaCreacion: medicalMeasure.createdOn,
  } as any;

  return documentData;
}

