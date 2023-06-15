import { ITreatment, ITreatmentMedicine } from "domain/core/entities/treatmentEntity";

export function treatmentSupabaseToMap(data: any): ITreatment {
    return {
        id: data?.id ?? 0,
        status: data?.estado ?? 0,
        subjectId: data?.sujetoId ?? 0,
        medicalConsultyId: data?.consultaMedicaId ?? 0,
        treatmentMedicines: [],
    } as ITreatment;
  }
  
  export function fromTreatmentSupabaseDocumentData(treatment: ITreatment): any {
    const documentData = {
        estado: treatment.status,
        sujetoId: treatment.subjectId,
        consultaMedicaId: treatment.medicalConsultyId
    } as any;
  
    return documentData;
  }

export function treatmentMedicineSupabaseToMap(data: any): ITreatmentMedicine {
  return {
    id: data?.id ?? 0,
    viaDosis: data?.viaDosis ?? 0,
    medicine: data?.medicamento ?? "",
    dosisQuantity: data?.dosis ?? 0,
    dosisType: data?.tipoDosis ?? 0,
    medicineId: data?.medicamentoId,
    takeUntilMeasure: data?.tomarHastaMedida ?? "",
    takeUntilValue: data?.tomarHastaValor ?? 0,
    takeEachMeasure: data?.tomarCadaMedida ?? "",
    takeEachValue: data?.tomarCadaValor ?? 0,
    treatmentId: data?.tratamientoId ?? 0,
    observations: data?.observaciones,
    status: data?.estado ?? 0,
    createdOn: data?.fechaCreacion ? new Date(new Date(data.fechaCreacion).getFullYear(), new Date(data.fechaCreacion).getMonth() + 1, new Date(data.fechaCreacion).getDate() + 1) : new Date(),
  } as ITreatmentMedicine;
}

export function fromTreatmentMedicineSupabaseDocumentData(treatmentMedicine: ITreatmentMedicine): any {
  console.log(treatmentMedicine)
  const documentData = {
    viaDosis: treatmentMedicine.viaDosis,
    medicamento: treatmentMedicine.medicine,
    dosis: treatmentMedicine.dosisQuantity,
    tipoDosis: treatmentMedicine.dosisType,
    medicamentoId: treatmentMedicine.medicineId,
    tomarHastaMedida: treatmentMedicine.takeUntilMeasure,
    tomarHastaValor: treatmentMedicine.takeUntilValue,
    tomarCadaMedida: treatmentMedicine.takeEachMeasure,
    tomarCadaValor: treatmentMedicine.takeEachValue,
    tratamientoId: treatmentMedicine.treatmentId,
    observaciones: treatmentMedicine.observations,
    estado: treatmentMedicine.status,
    fechaCreacion: treatmentMedicine.createdOn,
  } as any;

  return documentData;
}

