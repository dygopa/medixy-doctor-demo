import { IDiagnosis } from "domain/core/entities/diagnosis";

export function fromDiagnosisSupabaseDocumentData (diagnosis: IDiagnosis) {
    const documentData = {
        descripcion: diagnosis.description,
        cie10Id: diagnosis.cie10Id,
        consultaMedicaId: diagnosis.medicalConsultyId,
    } as any;

    return documentData;
}