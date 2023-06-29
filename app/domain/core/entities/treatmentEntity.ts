import { ISubject } from "./subjectEntity";

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
    subjectId: number;
    subject?: ISubject | null;
    reference: string;
    medicalConsultyId: number;
    treatmentMedicines: ITreatmentMedicine[];
}
