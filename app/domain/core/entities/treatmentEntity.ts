export interface ITreatmentMedicine {
    id: number;
    viaDosis: number;
    medicine: string;
    dosisQuantity: number;
    dosisType: number;
    medicineId?: number | null;
    takeUntilMeasure: string;
    takeUntilValue: number;
    takeEachMeasure: string;
    takeEachValue: number;
    createdOn: Date;
    treatmentId: number;
    observations?: string | null;
    status: number;
}

export interface ITreatment {
    id: number;
    status: number;
    patientId: number;
    medicalConsultyId: number;
    treatmentMedicines: ITreatmentMedicine[];
}
