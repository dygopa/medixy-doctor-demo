import { IDiagnosis } from "domain/core/entities/diagnosis";

export function diagnosisSupabaseToMap(data: any): IDiagnosis {
    return {
      id: data?.id ?? 0,
      description: data?.descripcion ?? "",
      cie10Id: data?.cie10Id ?? 0,
      medicalConsultyId: data?.consultaMedicaId ?? 0,
      isPrincipal: data?.esPrincipal ?? false
    } as IDiagnosis;
  }

export function fromDiagnosisSupabaseDocumentData (diagnosis: IDiagnosis) {
    const documentData = {
        descripcion: diagnosis.description,
        cie10Id: diagnosis.cie10Id,
        consultaMedicaId: diagnosis.medicalConsultyId,
        esPrincipal: diagnosis.isPrincipal,
    } as any;

    return documentData;
}