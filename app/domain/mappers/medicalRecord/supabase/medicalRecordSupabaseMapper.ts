import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from "domain/core/entities/medicalRecordEntity";

export function medicalRecordTypeSupabaseToMap(data: any): IMedicalRecordType {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
    } as IMedicalRecordType;
}

export function medicalRecordValueTypeSupabaseToMap(data: any): IMedicalRecordValueType {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
      dataType: data?.tipoDato ?? "",
      medicalRecordTypeId: data?.tipoAntecedenteId ?? 0,
    } as IMedicalRecordValueType;
}

export function medicalRecordSupabaseToMap(data: any): IMedicalRecord {
    return {
      id: data?.id ?? 0,
      medicalRecordTypeId: data?.tipoAntecedenteId ?? 0,
      medicalConsultyId: data?.consultaMedicaId ?? 0,
    } as IMedicalRecord;
}

export function fromMedicalRecordSupabaseDocumentData(medicalRecord: IMedicalRecord): any {
    const documentData = {
      tipoAntecedenteId: medicalRecord.medicalRecordTypeId,
      consultaMedicaId: medicalRecord.medicalConsultyId, 
    } as any;
  
    return documentData;
}

export function medicalRecordValueSupabaseToMap(data: any): IMedicalRecordValue {
    return {
      id: data?.id ?? 0,
      value: data?.valor ?? "",
      numberValue: data?.valorNumero ?? null,
      dateValue: data?.valorFecha ?? null,
      medicalRecordValueTypeId: data?.tipoValorAntecedenteId ?? 0,
      medicalRecordId: data?.antecedenteId ?? 0,
    } as IMedicalRecordValue;
}

export function fromMedicalRecordValueSupabaseDocumentData(medicalRecordValue: IMedicalRecordValue): any {
    const documentData = {
      valor: medicalRecordValue.value,
      valorNumero: medicalRecordValue.numberValue, 
      valorFecha: medicalRecordValue.dateValue,
      tipoValorAntecedenteId: medicalRecordValue.medicalRecordValueTypeId,
      antecedenteId: medicalRecordValue.medicalRecordId
    } as any;
  
    return documentData;
}
  

  