import { IMedicalRecord, IMedicalRecordCategory, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from "domain/core/entities/medicalRecordEntity";

export function medicalRecordTypeSupabaseToMap(data: any): IMedicalRecordType {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
      medicalRecordCategoryId: data?.categoriaRegistroMedicoId ?? 0,
      medicalRecordCategory: {} as IMedicalRecordCategory,
    } as IMedicalRecordType;
}

export function medicalRecordValueTypeSupabaseToMap(data: any): IMedicalRecordValueType {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
      dataType: data?.tipoDato ?? "",
      medicalRecordTypeId: data?.tipoRegistroMedicoId ?? 0,
      medicalRecordType: {} as IMedicalRecordType,
    } as IMedicalRecordValueType;
}

export function medicalRecordSupabaseToMap(data: any): IMedicalRecord {
    return {
      id: data?.id ?? 0,
      medicalRecordTypeId: data?.tipoRegistroMedicoId ?? 0,
      medicalConsultyId: data?.consultaMedicaId ?? 0,
      subjectId: data?.sujetoId ?? 0,
      medicalRecordType: {} as IMedicalRecordType,
      medicalRecordValues: [] as IMedicalRecordValue[],
    } as IMedicalRecord;
}

export function fromMedicalRecordSupabaseDocumentData(medicalRecord: IMedicalRecord): any {
    const documentData = {
      tipoRegistroMedicoId: medicalRecord.medicalRecordTypeId,
      consultaMedicaId: medicalRecord.medicalConsultyId === 0 ? null : medicalRecord.medicalConsultyId, 
      sujetoId: medicalRecord.subjectId,
    } as any;
  
    return documentData;
}

export function medicalRecordValueSupabaseToMap(data: any): IMedicalRecordValue {
    return {
      id: data?.id ?? 0,
      value: data?.valor ?? "",
      numberValue: data?.valorNumero ?? null,
      dateValue: data?.valorFecha ?? null,
      medicalRecordValueTypeId: data?.tipoValorRegistroMedicoId ?? 0,
      medicalRecordId: data?.registroMedicoId ?? 0,
    } as IMedicalRecordValue;
}

export function fromMedicalRecordValueSupabaseDocumentData(medicalRecordValue: IMedicalRecordValue): any {
    const documentData = {
      valor: medicalRecordValue.value,
      valorNumero: medicalRecordValue.numberValue, 
      valorFecha: medicalRecordValue.dateValue,
      tipoValorRegistroMedicoId: medicalRecordValue.medicalRecordValueTypeId,
      registroMedicoId: medicalRecordValue.medicalRecordId
    } as any;
  
    return documentData;
}
  

  