import { IMedicalMeasure } from "./medicalMeasureEntity";

export interface IMedicalConsulty {
    id: number;
    patientId: number;
    consultationDate: Date;
    consultationReason: string;
    referrerBy?: string | null;
    sufferingDate?: Date | null;
    generalInspection?: string | null;
    respiratorySystem?: string | null;
    digestiveSystem?: string | null;
    cardiovascularSystem?: string | null;
    reproductiveSystem?: string | null;
    urinarySystem?: string | null;
    ophthalmologicalSystem?: string | null;
    locomotorSystem?: string | null;
    earInspection?: string | null;
    neurologicalInspection?: string | null;
    skinInspection?: string | null;
    diagnose: string;
    observations?: string | null;
    medicalMeasures?: IMedicalMeasure[];
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
}
